class FormValidator {
    constructor(data, popupSelector) {
        this._popupSelector = popupSelector;
        this._formSelector = data.formSelector;
        this._inputSelector = data.inputSelector;
        this._submitButtonSelector = data.submitButtonSelector;
        this._inactiveButtonClass = data.inactiveButtonClass;
        this._inputErrorClass = data.inputErrorClass;
        this._errorClass = data.errorClass;
        this._invalidInputClass = data.invalidInputClass;
    }

    // функция показа элемента ошибки
    _showInputError(inputElement, errorMessage) {
        const errorElement = this._popupSelector.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    };

    // функция скрытия элемента ошибки
    _hideInputError(inputElement) {
        const errorElement = this._popupSelector.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    };

    // функция проверки валидности поля
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
          this._showInputError(inputElement, inputElement.validationMessage);
          inputElement.classList.add(this._invalidInputClass);
          inputElement.invalid = false;
        } else {
          this._hideInputError(inputElement);
          inputElement.classList.remove(this._invalidInputClass);
          inputElement.invalid = true;
        }
    };

    // функция проверки невалидного поля
    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
          return !inputElement.validity.valid;
        });
    };

    // функция добавления слушателя всем полям формы
    _setEventListeners() {  
        const inputList = Array.from(this._popupSelector.querySelectorAll(this._inputSelector));
        const buttonElement = this._popupSelector.querySelector(this._submitButtonSelector);
        this._popupSelector.addEventListener('reset', () => {
          setTimeout(() => {
            this._toggleButtonState(inputList, buttonElement), 0})
        });
      
        inputList.forEach((inputElement) => {  
            inputElement.addEventListener('input', () => {  
                this._checkInputValidity(inputElement);
                this._toggleButtonState(inputList, buttonElement);
      
            });  
        }); 
    }; 
      
    // функция стилизации переключения кнопки
    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
        buttonElement.classList.add(this._inactiveButtonClass);
        buttonElement.disabled = true;
        } else {
        buttonElement.classList.remove(this._inactiveButtonClass);
        buttonElement.disabled = false;
        }
    }; 

    // функция валидации форм
    enableValidation() {
        const formList = Array.from(document.querySelectorAll(this._formSelector));
        formList.forEach((popupSelector) => {
          popupSelector.addEventListener('submit', (evt) => {
            evt.preventDefault();
          });
            this._setEventListeners();
        });
    };
}

export { FormValidator };
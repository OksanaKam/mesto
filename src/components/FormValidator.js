class FormValidator {
    constructor(data, form) {
      this._data = data;
      this._form = form;
      this._formSelector = data.formSelector;
      this._inputSelector = data.inputSelector;
      this._submitButtonSelector = data.submitButtonSelector;
      this._inactiveButtonClass = data.inactiveButtonClass;
      this._errorClass = data.errorClass;
      this._invalidInputClass = data.invalidInputClass;
      this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
      this._buttonElement = this._form.querySelector(this._submitButtonSelector);
    }

    // функция показа элемента ошибки
    _showInputError(inputElement, errorMessage) {
      const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.add(this._invalidInputClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._errorClass);
    };

    // функция скрытия элемента ошибки
    _hideInputError(inputElement) {
      const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove(this._invalidInputClass);
      errorElement.classList.remove(this._errorClass);
      errorElement.textContent = '';
    };

    // функция проверки валидности поля
    _checkInputValidity(inputElement) {
      if (!inputElement.validity.valid) {
        this._showInputError(inputElement, inputElement.validationMessage);
      } else {
        this._hideInputError(inputElement);
      }
    };

    // функция проверки невалидного поля
    _hasInvalidInput() {
      return this._inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      });
    };

    // функция добавления слушателя всем полям формы
    _setEventListeners() {
      this._form.addEventListener('reset', () => {
        this.disableSubmitButton();
      });
      
      this._inputList.forEach((inputElement) => {  
        inputElement.addEventListener('input', () => {  
          this._checkInputValidity(inputElement);
          this._toggleButtonState();
        });  
      }); 
    }; 
      
    // функция стилизации переключения кнопки
    _toggleButtonState() {
      if (this._hasInvalidInput()) {
      this.enableSubmitButton();
      } else {
      this.disableSubmitButton();
      }
    }; 

    enableSubmitButton() {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    }

    disableSubmitButton() {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }

    // функция валидации форм
    enableValidation() {
      this._setEventListeners();
    }
}

export { FormValidator };
// функция показа элемента ошибки
const showInputError = (params, formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(params.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(params.errorClass);
};

// функция скрытия элемента ошибки
const hideInputError = (params, formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(params.inputErrorClass);
    errorElement.classList.remove(params.errorClass);
    errorElement.textContent = '';
};

// функция проверки валидности поля
const checkInputValidity = (params, formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(params, formElement, inputElement, inputElement.validationMessage);
      inputElement.classList.add(params.invalidInputClass);
      inputElement.invalid = false;
    } else {
      hideInputError(params, formElement, inputElement);
      inputElement.classList.remove(params.invalidInputClass);
      inputElement.invalid = true;
    }
};

// функция проверки невалидного поля
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
};

// функция добавления слушателя всем полям формы
function setEventListeners (params, formElement) {  
  const inputList = Array.from(formElement.querySelectorAll(params.inputSelector));
  const buttonElement = formElement.querySelector(params.submitButtonSelector);
  formElement.addEventListener('reset', () => {
    setTimeout(() => {
      toggleButtonState(params, inputList, buttonElement), 0})
  });

  inputList.forEach((inputElement) => {  
      inputElement.addEventListener('input', function () {  
          checkInputValidity(params, formElement, inputElement);
          toggleButtonState(params, inputList, buttonElement);

      });  
  }); 
}; 

// функция стилизации переключения кнопки
const toggleButtonState = (params, inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(params.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(params.inactiveButtonClass);
      buttonElement.disabled = false;
    }
}; 

// функция валидации форм
const enableValidation = (params) => {
    const formList = Array.from(document.querySelectorAll(params.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
        setEventListeners(params, formElement);
    });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  invalidInputClass: 'popup__input_invalid'
});

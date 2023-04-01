import { Popup } from "./Popup.js"

class PopupWithForm extends Popup {
    constructor({ selectorPopup, handleFormSubmit }) {
        super(selectorPopup);
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = this._form.querySelectorAll('.popup__input');
        this._handleFormSubmit = handleFormSubmit;
        this._buttonSubmit = this._popup.querySelector('.popup__button');
        this._buttonSubmitText = this._buttonSubmit.textContent;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
          evt.preventDefault();
          this._handleFormSubmit(this._getInputValues());
          this.close();
        });
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach((input) => { 
            this._formValues[input.name] = input.value;
        });
        
        return this._formValues;
    }

    close() {
        super.close();
        this._form.reset();
    }

    renderLoading(isLoading) {
        if (isLoading) {
            this._buttonSubmit.textContent = 'Сохранение...';
        } else {
            this._buttonSubmit.textContent = this._buttonSubmitText;
        }
    }
}

export { PopupWithForm };
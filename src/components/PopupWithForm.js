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
            const initialText = this._buttonSubmit.textContent;
            this._buttonSubmit.textContent = 'Сохранение...';
            console.log(this._buttonSubmit.textContent);
            
            this._handleFormSubmit(this._getInputValues())
            .then(() => this.close())
            .finally(() => {
              this._buttonSubmit.textContent = initialText;
              console.log(this._buttonSubmit.textContent);
            });
        });
      }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach((input) => { 
            this._formValues[input.name] = input.value;
        });
        
        return this._formValues;
    }

    setInputValues(data) {
        this._inputList.forEach((input) => {
          input.value = data[input.name];
        });
    }

    close() {
        super.close();
        this._form.reset();
    }
}

export { PopupWithForm };
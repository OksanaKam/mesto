import { Popup } from "./Popup.js";

class PopupWithConfirmation extends Popup {
    constructor(selectorPopup) {
        super(selectorPopup)
        this._form = this._popup.querySelector('.popup__form');
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmit();
        })
    }

    setSubmitAction(action) {
        this._handleSubmit = action;
    }
}

export { PopupWithConfirmation };
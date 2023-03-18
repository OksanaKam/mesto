import { Popup } from "./Popup.js";

class PopupWithImage extends Popup {
    constructor(selectorPopup) {
        super(selectorPopup);
        this._placeImage = this._popup.querySelector('.popup__place-image');
        this._placeTitle = this._popup.querySelector('.popup__place-title');
    }
    
    open(name, link) {
        super.open();
        this._placeImage.src = link;
        this._placeImage.alt = name;
        this._placeTitle.textContent = name;
    }
}

export { PopupWithImage };
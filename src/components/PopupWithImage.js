import { Popup } from "./Popup.js";
import { placeImage, placeTitle } from "../utils/constants.js";

class PopupWithImage extends Popup {
    constructor(selectorPopup) {
        super(selectorPopup);
    }
    
    open(name, link) {
        super.open();
        placeImage.src = link;
        placeImage.alt = name;
        placeTitle.textContent = name;
    }
}

export { PopupWithImage };
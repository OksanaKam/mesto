class Popup {
    constructor(selectorPopup) {
        this._popup = document.querySelector(selectorPopup);
        this._handleEsc = this._handleEscClose.bind(this);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEsc);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEsc);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }
    
    setEventListeners() {
        this._popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened') 
            || evt.target.classList.contains('popup__close')) {
                this.close();
            }
        });
    }
}

export { Popup };
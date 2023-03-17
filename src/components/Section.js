class Section {
    constructor({ items, renderer }, selector) {
        this._inititalArray = items;
        this._renderer = renderer;
        this._container = document.querySelector(selector);
    }
    renderer() {
        this._inititalArray.forEach(item => {
            this._renderer(item);
        });
    }

    addItem(element) {
        this._container.append(element);
    }

    addPrependItem(element) {
        this._container.prepend(element);
    }
}

export { Section };
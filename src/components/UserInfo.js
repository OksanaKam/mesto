class UserInfo {
    constructor({ selectorName, selectorInfo, selectorAvatar }) {
        this._selectorName = document.querySelector(selectorName);
        this._selectorInfo = document.querySelector(selectorInfo);
        this._selectorAvatar = document.querySelector(selectorAvatar);
    }

    getUserInfo() {
        return {
            name: this._selectorName.textContent,
            about: this._selectorInfo.textContent,
        };
    }
    
    setUserInfo(userData) {
        this._selectorName.textContent = userData.name;
        this._selectorInfo.textContent = userData.about;
        this._selectorAvatar.src = userData.avatar;
    }
}

export { UserInfo };
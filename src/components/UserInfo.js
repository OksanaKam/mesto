class UserInfo {
    constructor({ selectorName, selectorInfo, selectorAvatar }) {
        this._selectorName = document.querySelector(selectorName);
        this._selectorInfo = document.querySelector(selectorInfo);
        this._selectorAvatar = document.querySelector(selectorAvatar);
    }

    getUserInfo() {
        return {
            title: this._selectorName.textContent,
            yourself: this._selectorInfo.textContent,
        };
    }
    
    setUserInfo(userData) {
        this._selectorName.textContent = userData.title;
        this._selectorInfo.textContent = userData.yourself;
        this._selectorAvatar.textContent = userData.link;
    }
}

export { UserInfo };
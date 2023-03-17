class UserInfo {
    constructor({ selectorName, selectorInfo }) {
        this._selectorName = document.querySelector(selectorName);
        this._selectorInfo = document.querySelector(selectorInfo);
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
    }
}

export { UserInfo };
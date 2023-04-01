class Card {
  constructor({
    data, 
    userId, 
    handleCardClick, 
    handleAddLike, 
    handleRemoveLike, 
    handleDeleteIconClick
  }, 
  templateSelector
  ) {
      this._data = data;  
      this._name = data.name;
      this._link = data.link;
      this._likes = data.likes;
      this._id = data._id;
      this._ownerId = data.owner._id;
      this._userId = userId;
      this._templateSelector = templateSelector;
      this._handleCardClick = handleCardClick;
      this._handleAddLike = handleAddLike;
      this._handleRemoveLike = handleRemoveLike;
      this._handleDeleteIconClick = handleDeleteIconClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
  }

  handleImageClick(data) {
    this._likes = data.likes;
    this.setLikes();
    this._likeButton.classList.toggle("element__like_active");
  }

  handleTrashClick() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._cardImage = this._element.querySelector('.element__image');
    this._likeButton = this._element.querySelector('.element__like');
    this._trashButton = this._element.querySelector('.element__trash');


    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    this._likeButton.addEventListener('click', () => {
      this._likeButton.classList.contains('element__like_active')
      ? this._handleRemoveLike(this._id)
      : this._handleAddLike(this._id);
      
    });

    this._trashButton.addEventListener('click', () => {
      this._handleDeleteIconClick(this._id);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
     
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name
    this._element.querySelector('.element__title').textContent = this._name;
    
    this._checkCardOwner();
    this.setLikes();
    this._checkLikeOwner();

    return this._element;
  }

  setLikes() {
    this._likeCount = this._element.querySelector('.element__like-count');
    this._likeCount.textContent = this._likes.length;
  }

  _checkCardOwner() {
    if (this._ownerId === this._userId) {
      this._trashButton.classList.add('element__trash_active');
    }
  }

  _checkLikeOwner() {
    this._likes.forEach((user) => {
      if (user._id === this._userId) {
        this._likeButton.classList.add('element__like_active');
      }
    });
  }
}

export { Card };
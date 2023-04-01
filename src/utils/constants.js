export const params = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  errorClass: 'popup__error_visible',
  invalidInputClass: 'popup__input_invalid'
});
  
// popups open buttons
export const buttonEditProfile = document.querySelector(".profile__edit-button");
export const buttonAddCard = document.querySelector(".profile__add-button");
export const buttonAvatar = document.querySelector('.profile__avatar-button');
  
// popups
export const popupEdit = document.querySelector(".popup_type_profile");
export const popupAdd = document.querySelector(".popup_type_card-add");
export const popupAvatar = document.querySelector(".popup_type_avatar-edit");
export const popupConfirm = document.querySelector(".popup_type_card-del");

export const containerEdit = document.querySelector("#popup__container-edit");
export const containerAdd = document.querySelector("#popup__container-add");
export const containerImg = document.querySelector("#popup__container-img");

// popup edit container
export const nameInput = containerEdit.querySelector(".popup__input_name_title");
export const jobInput = containerEdit.querySelector(".popup__input_name_yourself");

// profile info
export const profileAvatar = document.querySelector('.profile__avatar');
export const profileTitle = document.querySelector('.profile__title');
export const profileText = document.querySelector('.profile__text');
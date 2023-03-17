export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const params = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  invalidInputClass: 'popup__input_invalid'
});
  
// popups open buttons
export const buttonEditProfile = document.querySelector(".profile__edit-button");
export const buttonAddCard = document.querySelector(".profile__add-button");
  
// popups
export const popupEdit = document.querySelector(".popup_type_profile");
export const popupAdd = document.querySelector(".popup_type_card-add");

/*export const popupImage = document.querySelector(".popup_type_picture");*/
export const containerEdit = document.querySelector("#popup__container-edit");
export const containerAdd = document.querySelector("#popup__container-add");
export const containerImg = document.querySelector("#popup__container-img");

// popup edit container
export const nameInput = containerEdit.querySelector(".popup__input_name_title");
export const jobInput = containerEdit.querySelector(".popup__input_name_yourself");

// popup add container
export const placeInput = containerAdd.querySelector(".popup__input_name_place");
export const referenceInput = containerAdd.querySelector(".popup__input_name_reference");
  
// popup image container
export const placeImage = containerImg.querySelector(".popup__place-image");
export const placeTitle = containerImg.querySelector(".popup__place-title");
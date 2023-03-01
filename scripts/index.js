import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const params = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  invalidInputClass: 'popup__input_invalid'
});

// popups open buttons
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button");

// popups
const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector(".popup_type_profile");
const popupAdd = document.querySelector(".popup_type_card-add");
const popupImage = document.querySelector(".popup_type_picture");
const containerEdit = document.querySelector("#popup__container-edit");
const containerAdd = document.querySelector("#popup__container-add");
const containerImg = document.querySelector("#popup__container-img");

// popup edit container
const nameInput = containerEdit.querySelector(".popup__input_name_title");
const jobInput = containerEdit.querySelector(".popup__input_name_yourself");
const profileTitle = document.querySelector(".profile__title");
const profileText = document.querySelector(".profile__text");

// popup add container
const placeInput = containerAdd.querySelector(".popup__input_name_place");
const referenceInput = containerAdd.querySelector(".popup__input_name_reference");

// popup image container
const placeImage = containerImg.querySelector(".popup__place-image");
const placeTitle = containerImg.querySelector(".popup__place-title");

// elements container
const elements = document.querySelector(".elements");

// функция создания новой карточки
function createNewCard(item) {
  const card = new Card(item, '.element-template');
  return card.generateCard();
}

// отображение массива карточек
initialCards.forEach((item) => {
  document.querySelector('.elements').append(createNewCard(item)); 
});

// валидация форм
const profileFormValidator = new FormValidator(params, popupEdit);
const placeFormValidator = new FormValidator(params, popupAdd);

profileFormValidator.enableValidation();
placeFormValidator.enableValidation();

// открытие попапа Профиля
function openProfilePopup(event) {
    openPopup(popupEdit);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileText.textContent;
}

buttonEditProfile.addEventListener("click", openProfilePopup);

// открытие попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

// закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

// открытие попапа добавления карточки места
function openAddPopup(event) {
  openPopup(popupAdd); 
  placeFormValidator._enableSubmitButton();
}

// открытие попапа картинки места
function openPopupWithImage(link, name) {
  placeImage.src = link;
  placeImage.alt = name;
  placeTitle.textContent = name;
  openPopup(popupImage);
}

buttonAddCard.addEventListener("click", openAddPopup);

// закрытие попапа по крестику и оверлею
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  });
});

// закрытие попапа Профиля
function handleProfileFormSubmit (evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileText.textContent = jobInput.value;
    closePopup(popupEdit);
}

containerEdit.addEventListener('submit', handleProfileFormSubmit);

// функция добавления новой карточки
function addNewCard () {
  const placeName = placeInput.value;
  const placeLink = referenceInput.value;
  elements.prepend(createNewCard({ name: placeName, link: placeLink}));
}

// закрытие попапа добавления карточки места
function handlePlaceFormSave (evt) {
  evt.preventDefault();
  addNewCard()
  closePopup(popupAdd);
  evt.target.reset();
}

containerAdd.addEventListener('submit', handlePlaceFormSave);

// закрытие попапов по esc
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

export { openPopupWithImage };
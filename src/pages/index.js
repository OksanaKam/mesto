import './index.css';
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { initialCards, params, 
  buttonEditProfile, buttonAddCard, 
  popupEdit, popupAdd,
  nameInput, jobInput } from "../utils/constants.js";

const popupImage = new PopupWithImage('.popup_type_picture');

// функция создания новой карточки
const createNewCard = (data, templateSelector, 
  handleCardClick = (name, link) => {
    popupImage.open(name, link);
    popupImage.setEventListeners();
  }) => {
  const card = new Card(data, templateSelector, handleCardClick);
  return card.generateCard();
}

// функция создания массива карточек
const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createNewCard(item, '.element-template');
    cardsList.addItem(cardElement);
    },
  },
  ".elements"
);

// отображение массива карточек
cardsList.renderer();

// валидация форм
const profileFormValidator = new FormValidator(params, popupEdit);
const placeFormValidator = new FormValidator(params, popupAdd);

profileFormValidator.enableValidation();
placeFormValidator.enableValidation();

// открытие попапа Профиля

const profileUserInfo = new UserInfo({ 
  selectorName: '.profile__title', 
  selectorInfo: '.profile__text'
});

const openProfilePopup = new PopupWithForm({
  selectorPopup: '.popup_type_profile',
  handleFormSubmit: (userData) => {
    profileUserInfo.setUserInfo(userData);
  }
});

openProfilePopup.setEventListeners();

buttonEditProfile.addEventListener("click", () => {
  openProfilePopup.open();
  const userInfo = profileUserInfo.getUserInfo();
  nameInput.value = userInfo.title;
  jobInput.value = userInfo.yourself;
});

// открытие попапа добавления карточки места
const openAddPopup = new PopupWithForm({
  selectorPopup: '.popup_type_card-add',
  handleFormSubmit: (data) => {
    const addNewCard = createNewCard(data, '.element-template');
    cardsList.addPrependItem(addNewCard);
  }
});

openAddPopup.setEventListeners();

buttonAddCard.addEventListener("click", () => {
  openAddPopup.open();
  placeFormValidator.enableSubmitButton();
});
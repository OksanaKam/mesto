import './index.css';
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from '../components/Api.js';
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import { params, 
  buttonEditProfile, buttonAddCard, 
  popupEdit, popupAdd,
  nameInput, jobInput,
  buttonAvatar,
  popupAvatar, popupConfirm,
  profileAvatar, profileTitle, profileText } from "../utils/constants.js";

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63',
  headers: {
    authorization: 'efbd7842-cb39-4f91-8b5d-bbde0eb44413',
    'Content-Type': 'application/json'
  },
});

const popupImage = new PopupWithImage('.popup_type_picture');
const openConfirmPopup = new PopupWithConfirmation('.popup_type_card-del');
const profileUserInfo = new UserInfo({ 
  selectorName: '.profile__title', 
  selectorInfo: '.profile__text',
  selectorAvatar: '.profile__avatar'
});

let userId;

Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([profileUser, cardsArray]) => {
  userId = profileUser._id;
  profileUserInfo.setUserInfo(profileUser);
  cardsList.renderer(cardsArray);
})
.catch((err) => {
  console.log(err);
});

// функция создания новой карточки
const createNewCard = (item, templateSelector) => {
  const card = new Card({
    data: item, 
    userId: userId, 
    handleCardClick: (name, link) => {
      popupImage.open(name, link);
      popupImage.setEventListeners();
    },
    handleDeleteIconClick: (cardId) => {
      openConfirmPopup.open();
      confirmFormValidator.disableSubmitButton();
      openConfirmPopup.setSubmitAction(() => {
        api.deleteCard(cardId)
        .then(() => {
          openConfirmPopup.close();
          card.handleTrashClick();
        })
        .catch((err) => {
          console.log(err);
        });
      });
    },
    handleAddLike: (cardId) => {
      api.addLike(cardId)
      .then((data) => {
        card.handleImageClick(data);
      })
      .catch((err) => {
        console.log(err);
      })
    }, 
    handleRemoveLike: (cardId) => {
      api.removeLike(cardId)
      .then((data) => {
        card.handleImageClick(data);
      })
      .catch((err) => {
        console.log(err);
      })
    }
  },
  templateSelector,
  );
  return card.generateCard();
} 

openConfirmPopup.setEventListeners();

// функция создания массива карточек
const cardsList = new Section({
  renderer: (item) => {
    const cardElement = createNewCard(item, '.element-template');
    cardsList.addItem(cardElement);
    },
  },
  ".elements"
);

// валидация форм
const profileFormValidator = new FormValidator(params, popupEdit);
const placeFormValidator = new FormValidator(params, popupAdd);
const avatarFormValidator = new FormValidator(params, popupAvatar);
const confirmFormValidator = new FormValidator(params, popupConfirm);

profileFormValidator.enableValidation();
placeFormValidator.enableValidation();
avatarFormValidator.enableValidation();
confirmFormValidator.enableValidation();

// открытие попапа Профиля
const openProfilePopup = new PopupWithForm({
  selectorPopup: '.popup_type_profile',
  handleFormSubmit: (userData) => {
    openProfilePopup.renderLoading(true);
    api.postUserInfo(userData)
    .then(userData => {
      profileUserInfo.setUserInfo(userData);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      openProfilePopup.renderLoading(false);
    });
  }
});

openProfilePopup.setEventListeners();

buttonEditProfile.addEventListener("click", () => {
  openProfilePopup.open();
  const userInfo = profileUserInfo.getUserInfo();
  nameInput.value = userInfo.name;
  jobInput.value = userInfo.about;
});

// открытие попапа добавления карточки места
const openAddPopup = new PopupWithForm({
  selectorPopup: '.popup_type_card-add',
  handleFormSubmit: (data) => {
    openAddPopup.renderLoading(true);
    api.addNewCard(data)
    .then((data) => {
      const addNewCard = createNewCard(data, '.element-template');
      cardsList.addPrependItem(addNewCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      openAddPopup.renderLoading(false);
    });
  }
});

openAddPopup.setEventListeners();

buttonAddCard.addEventListener("click", () => {
  openAddPopup.open();
  placeFormValidator.enableSubmitButton();
});

// открытие попапа редактирования аватара
const openAvatarPopup = new PopupWithForm({
  selectorPopup: '.popup_type_avatar-edit',
  handleFormSubmit: (userData) => {
    openAvatarPopup.renderLoading(true);
    api.changeAvatar(userData)
    .then((userData) => {
      profileUserInfo.setUserInfo(userData);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      openAvatarPopup.renderLoading(false);
    });
  }
});

openAvatarPopup.setEventListeners();

buttonAvatar.addEventListener('click', () => {
  openAvatarPopup.open();
  avatarFormValidator.enableSubmitButton();
});

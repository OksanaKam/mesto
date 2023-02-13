const initialCards = [
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
// popups open buttons
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

// popups
const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector(".popup_edit");
const popupAdd = document.querySelector(".popup_add");
const popupImage = document.querySelector(".popup_image");
const containerEdit = document.querySelector("#popup__container-edit");
const containerAdd = document.querySelector("#popup__container-add");
const containerImg = document.querySelector("#popup__container-img");

// popups close buttons
const closeButtons = document.querySelectorAll('.popup__close');

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
const template = document.querySelector("#place").content.querySelector(".element");

// отображение массива карточек
function renderPlaces() {
  const cards = initialCards.map(createPlace);
  elements.append(...cards);
}

renderPlaces();

// создание карточки места, лайка, удаления карточки
function createPlace(item) {
  const placeElement = template.cloneNode(true);
  const cardImage = placeElement.querySelector(".element__image");
  const cardTitle = placeElement.querySelector(".element__title");
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;
    placeElement.querySelector(".element__like").addEventListener("click", function(evt) {
      evt.target.classList.toggle("element__like_active");
    });
    placeElement.querySelector(".element__trash").addEventListener("click", function(event) {
      placeElement.remove();
    });
    cardImage.addEventListener("click", function(evt) {
      openPopup(popupImage);
      placeImage.src = item.link;
      placeImage.alt = item.name;
      placeTitle.textContent = item.name;
    }) 

    return placeElement;
}

// открытие попапа Профиля
function openProfilePopup(event) {
    openPopup(popupEdit);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileText.textContent;
}

editButton.addEventListener("click", openProfilePopup);

// открытие попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// открытие попапа добавления карточки места
function openAddPopup(event) {
    openPopup(popupAdd); 
}

addButton.addEventListener("click", openAddPopup);

// кнопка закрытия
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

// закрытие попапа Профиля
function handleProfileFormSubmit (evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileText.textContent = jobInput.value;
    closePopup(popupEdit);
}

containerEdit.addEventListener('submit', handleProfileFormSubmit);

// закрытие попапа добавления карточки места
function handlePlaceFormSave (evt) {
  evt.preventDefault();
  const placeName = placeInput.value;
  const placeLink = referenceInput.value;

  const placeElement = createPlace( {name: placeName, link: placeLink});
  elements.prepend(placeElement);
  closePopup(popupAdd);
  evt.target.reset();
}

containerAdd.addEventListener('submit', handlePlaceFormSave);

// закрытие попапов по оверлею
popups.forEach((overlay) => {
  const popup = overlay.closest('.popup');
  overlay.addEventListener('click', (event) => {
    if (event.target !== event.currentTarget) {
      return;
    } 
    closePopup(popup);
  });
});

// закрытие попапов по esc
popups.forEach((esc) => {
  const popup = esc.closest('.popup');
  document.body.addEventListener('keydown', function (e) {
    var key = e.key;
    if (key == 'Escape') {
      closePopup(popup);
    };
  });
});
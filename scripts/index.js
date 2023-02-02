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
const popupEdit = document.querySelector(".popup_edit");
const popupAdd = document.querySelector(".popup_add");
const popupImage = document.querySelector(".popup_image");
const containerEdit = document.querySelector("#popup__container-edit");
const containerAdd = document.querySelector("#popup__container-add");
const containerImg = document.querySelector("#popup__container-img");

// popups close buttons
const closeButtons = document.querySelectorAll('.popup__close');

// popup edit container
let nameInput = containerEdit.querySelector(".popup__input_name_title");
let jobInput = containerEdit.querySelector(".popup__input_name_yourself");
let profileTitle = document.querySelector(".profile__title");
let profileText = document.querySelector(".profile__text");

// popup add container
let placeInput = containerAdd.querySelector(".popup__input_name_place");
let referenceInput = containerAdd.querySelector(".popup__input_name_reference");

// popup image container
let placeImage = containerImg.querySelector(".popup__place-image");
let placeTitle = containerImg.querySelector(".popup__place-title");

// elements container
const elements = document.querySelector(".elements");
const template = document.querySelector("#place").content.querySelector(".element");

function renderPlaces() {
  const cards = initialCards.map(createPlace);
  elements.append(...cards);
}

renderPlaces();

function createPlace(item) {
  const placeElement = template.cloneNode(true);
  let cardImage = placeElement.querySelector(".element__image");
  let cardTitle = placeElement.querySelector(".element__title");
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

function editButtonHandler(event) {
    openPopup(popupEdit);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileText.textContent;
}

editButton.addEventListener("click", editButtonHandler);

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function addButtonHandler(event) {
    openPopup(popupAdd); 
}

addButton.addEventListener("click", addButtonHandler);

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

function handleProfileFormSubmit (evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileText.textContent = jobInput.value;
    closePopup(popupEdit);
}

containerEdit.addEventListener('submit', handleProfileFormSubmit);

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
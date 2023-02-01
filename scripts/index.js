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
let editButton = document.querySelector(".profile__edit-button");
let addButton = document.querySelector(".profile__add-button");

// popups
let popupEdit = document.querySelector(".popup_edit");
let popupAdd = document.querySelector(".popup_add");
let popupImage = document.querySelector(".popup_image");
let containerEdit = document.querySelector("#popup__container-edit");
let containerAdd = document.querySelector("#popup__container-add");
let containerImg = document.querySelector("#popup__container-img");

// popups close buttons
let closePopupEdit = popupEdit.querySelector(".popup__close");
let closePopupAdd = popupAdd.querySelector(".popup__close");
let closePopupImg = popupImage.querySelector(".popup__close");

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
  const cards = initialCards.map((item) => {
    return createPlace(item);
  });
  elements.append(...cards);
}

renderPlaces();

function createPlace(item) {
  const placeElement = template.cloneNode(true);
    placeElement.querySelector(".element__image").src = item.link;
    placeElement.querySelector(".element__image").alt = item.name;
    placeElement.querySelector(".element__title").textContent = item.name;
    placeElement.querySelector(".element__like").addEventListener("click", function(evt) {
      evt.target.classList.toggle("element__like_active");
    });
    placeElement.querySelector(".element__trash").addEventListener("click", function(event) {
      placeElement.remove();
    });
    placeElement.querySelector(".element__image").addEventListener("click", function(evt) {
      popupImage.classList.add("popup_opened");
      placeImage.src = item.link;
      placeTitle.textContent = item.name;
    }) 

    return placeElement;
}

function editButtonHandler(event) {
    popupEdit.classList.add("popup_opened");
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileText.textContent;
}

editButton.addEventListener("click", editButtonHandler);

function addButtonHandler(event) {
    popupAdd.classList.add("popup_opened"); 
}

addButton.addEventListener("click", addButtonHandler);

function closeFormEdit() {
    popupEdit.classList.remove("popup_opened");
}

closePopupEdit.addEventListener("click", closeFormEdit);

function closeFormAdd() {
    popupAdd.classList.remove("popup_opened");
}

closePopupAdd.addEventListener("click", closeFormAdd);

function closeFormImg() {
    popupImage.classList.remove("popup_opened");
}

closePopupImg.addEventListener("click", closeFormImg);

function handleFormSubmit (evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileText.textContent = jobInput.value;
    closeFormEdit();
}

containerEdit.addEventListener('submit', handleFormSubmit);

function handleFormSave (evt) {
  evt.preventDefault();
  const placeName = placeInput.value;
  const placeLink = referenceInput.value;

  const placeElement = createPlace( {name: placeName, link: placeLink});
  elements.prepend(placeElement);
  closeFormAdd();
}

containerAdd.addEventListener('submit', handleFormSave);
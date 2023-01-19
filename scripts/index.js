let button = document.querySelector(".profile__edit-button");
let popup = document.querySelector(".popup");
let closePopup = document.querySelector(".popup__close");
let container = document.querySelector(".popup__container");
let nameInput = container.querySelector(".popup__input_name_title");
let jobInput = container.querySelector(".popup__input_name_yourself");
let profileTitle = document.querySelector(".profile__title");
let profileText = document.querySelector(".profile__text");

function buttonHandler(event) {
    popup.classList.add("popup_opened");
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileText.textContent;
}

button.addEventListener("click", buttonHandler);

function closeForm() {
    popup.classList.remove("popup_opened");
}

closePopup.addEventListener("click", closeForm);

function handleFormSubmit (evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileText.textContent = jobInput.value;
    closeForm();
}

container.addEventListener('submit', handleFormSubmit);
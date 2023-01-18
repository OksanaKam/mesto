let button = document.querySelector(".profile__edit-button");
let popup = document.querySelector(".popup");
let closePopup = document.querySelector(".popup__close");
let submitPopup = document.querySelector(".popup__submit-button");
let like = document.querySelector(".element__like");
let container = document.querySelector(".popup__container")
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

container.addEventListener('submit', handleFormSubmit);
closePopup.addEventListener("click", closeForm);

function handleFormSubmit (evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileText.textContent = jobInput.value;
    closeForm();
}

function clickLike(event) {
    event.preventDefault();
    like.classList.add("element__like_active");
}

like.addEventListener("click", clickLike);
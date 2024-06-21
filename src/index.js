import './pages/index.css'; 
import { initialCards } from './scripts/cards.js';
import { createCard } from './scripts/card.js';
import { openPopup, closePopup } from './scripts/modal.js';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const content = document.querySelector(".content");
const placesList = content.querySelector(".places__list");

const profileTitle = content.querySelector(".profile__title");
const profileDesc = content.querySelector(".profile__description");

// popup редактирование профиля
const editProfile = content.querySelector(".profile__edit-button");
const openProfile = document.querySelector(".popup_type_edit");
const nameProfile = openProfile.querySelector(".popup__input_type_name");
const descProfile = openProfile.querySelector(".popup__input_type_description");
const buttonSubmitEditProfileForm = openProfile.querySelector(".popup__form");
const closeProfile = openProfile.querySelector(".popup__close");

// popup Добавить новую карточку
const formAddCard = document.querySelector(".popup_type_new-card");
const buttonNewCard = document.querySelector(".profile__add-button");
const closeNewCard = formAddCard.querySelector(".popup__close");
const nameCard = formAddCard.querySelector('.popup__input_type_card-name');
const urlCard = formAddCard.querySelector('.popup__input_type_url');
const newCardData = new Object(); 

// popup открыть карточку
const popupImage = document.querySelector('.popup_type_image');
const popupImageContent = popupImage.querySelector('.popup__content_content_image');
const popupImageClose = popupImageContent.querySelector('.popup__close');
const popupImagePhoto = popupImageContent.querySelector('.popup__image');
const popupImageText = popupImageContent.querySelector('.popup__caption');

// @todo: Вывести карточки на страницу
function displayOnPage(cards) {
  cards.forEach(element => {
    const card = createCard(element, deleteCard, openImage, closePopup, popupImageClose);
    placesList.append(card);
  });
}

// Открытие ред. профиля
editProfile.addEventListener('click', function(e) {
  e.preventDefault();
  openPopup(openProfile);
  nameProfile.value = profileTitle.textContent;
  descProfile.value = profileDesc.textContent;
});

//сохранить профиль
buttonSubmitEditProfileForm.addEventListener('submit', function(e) {
  e.preventDefault();
  profileTitle.textContent = nameProfile.value;
  profileDesc.textContent = descProfile.value;
  closePopup(openProfile);
});

// Закрыть ред. профиля
closeProfile.addEventListener('click', function(e) {
  e.preventDefault();
  closePopup(openProfile);
});

// открыть окно добавление карточки
buttonNewCard.addEventListener('click', function(e) {
  e.preventDefault();
  openPopup(formAddCard);
  reset();
});

// Закрыть доб. карточек
closeNewCard.addEventListener('click', function(e) {
  e.preventDefault();
  closePopup(formAddCard);
});

// вывод новой карточки
formAddCard.addEventListener('submit', function(e) {
  e.preventDefault();
  newCardData.name = nameCard.value;
  newCardData.link = urlCard.value;
  placesList.prepend(createCard(newCardData));
  closePopup(formAddCard);
});

// функция открытия изображения карточки
function openImage(cardElement) {
  popupImagePhoto.src = cardElement.link;
  popupImageText.textContent = cardElement.name;
  popupImageText.alt = cardElement.name;

  openPopup(popupImage);
}

// закрыть фото
popupImageClose.addEventListener('click', function(e) {
  e.preventDefault();
  closePopup(popupImage);
});

// анимация окон
document.querySelectorAll(".popup").forEach((e) => {
  e.classList.add("popup_is-animated");
});

// @todo: Функция удаления карточки
function deleteCard(delCard) {
  delCard.remove();
}

function reset() {
  nameCard.value = '';
  urlCard.value = '';
}

// вывод карточек
displayOnPage(initialCards);
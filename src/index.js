import "./pages/index.css";
import { createCard } from "./scripts/card.js";
import { openPopup, closePopup } from "./scripts/modal.js";
import {
  enableValidation,
  clearValidation,
  validationConfig,
} from "./scripts/validation.js";
import {
  savePhoto,
  saveCard,
  saveUser,
  deleteCardServ,
  updateCards,
  updateUser,
} from "./scripts/api.js";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const content = document.querySelector(".content");
const placesList = content.querySelector(".places__list");

const profileTitle = content.querySelector(".profile__title");
const profileDesc = content.querySelector(".profile__description");
const profileImage = content.querySelector(".profile__image");

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
const nameCard = formAddCard.querySelector(".popup__input_type_card-name");
const urlCard = formAddCard.querySelector(".popup__input_type_url");

// popup открыть карточку
const popupImage = document.querySelector(".popup_type_image");
const popupImageContent = popupImage.querySelector(
  ".popup__content_content_image"
);
const popupImageClose = popupImageContent.querySelector(".popup__close");
const popupImagePhoto = popupImageContent.querySelector(".popup__image");
const popupImageText = popupImageContent.querySelector(".popup__caption");

// формы для валидации
const formNewCard = document.forms["new-place"];
const formProfile = document.forms["edit-profile"];
const formEditPhoto = document.forms["edit-photo"];

// редактирование фотографии профиля
const popupEditPhoto = document.querySelector(".popup_type_photo");
const popupEditPhotoClose = popupEditPhoto.querySelector(".popup__close");
const popupInputPhoto = formEditPhoto.querySelector(
  ".popup__input_type_url_photo"
);

// @todo: Вывести карточки на страницу
function displayOnPage(cards, userID) {
  cards.forEach((element) => {
    const card = createCard(
      element,
      deleteCard,
      openImage,
      userID,
      closePopup,
      popupImageClose
    );

    const cardLikeButton = card.querySelector(".card__like-button");
    for (let i = 0; i < element.likes.length; i++) {
      if (element.likes[i]._id === userID) {
        cardLikeButton.classList.add("card__like-button_is-active");
      }
    }

    placesList.append(card);
  });
}

// Открытие ред. профиля
editProfile.addEventListener("click", function (e) {
  e.preventDefault();
  clearValidation(formProfile, validationConfig);
  openPopup(openProfile);
  nameProfile.value = profileTitle.textContent;
  descProfile.value = profileDesc.textContent;
});

//сохранить профиль
buttonSubmitEditProfileForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const button = openProfile.querySelector(".popup__button");
  button.innerHTML = "Сохранение...";

  const newUserFromInput = {
    name: nameProfile.value,
    about: descProfile.value,
  };
  saveUser(newUserFromInput)
    .then((data) => {
      profileTitle.textContent = nameProfile.value;
      profileDesc.textContent = descProfile.value;

      closePopup(openProfile);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      button.innerHTML = "Сохранить";
    });
});

// Закрыть ред. профиля
closeProfile.addEventListener("click", function (e) {
  e.preventDefault();
  closePopup(openProfile);
});

// открыть окно добавление карточки
buttonNewCard.addEventListener("click", function (e) {
  e.preventDefault();
  clearValidation(formNewCard, validationConfig);
  openPopup(formAddCard);
  reset();
});

// Закрыть доб. карточек
closeNewCard.addEventListener("click", function (e) {
  e.preventDefault();
  closePopup(formAddCard);
});

// вывод новой карточки
formAddCard.addEventListener("submit", function (e) {
  e.preventDefault();
  const button = formNewCard.querySelector(".popup__button");
  const newCardFromInput = {
    name: nameCard.value,
    link: urlCard.value,
  };

  saveCard(newCardFromInput)
    .then((data) => {
      const cardDataFromServer = data;
      const userID = cardDataFromServer.owner._id;
      const card = createCard(
        cardDataFromServer,
        deleteCard,
        openImage,
        userID,
        closePopup,
        popupImageClose
      );

      placesList.prepend(card);
      closePopup(formAddCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      button.innerHTML = "Сохранить...";
      console.log(button);
    });
});

// функция открытия изображения карточки
function openImage(cardElement) {
  popupImagePhoto.src = cardElement.link;
  popupImageText.textContent = cardElement.name;
  popupImageText.alt = cardElement.name;

  openPopup(popupImage);
}

// закрыть фото
popupImageClose.addEventListener("click", function (e) {
  e.preventDefault();
  closePopup(popupImage);
});

// анимация окон
document.querySelectorAll(".popup").forEach((e) => {
  e.classList.add("popup_is-animated");
});

// @todo: Функция удаления карточки
function deleteCard(delCard, data) {
  console.log("Зашли в функцию в Index:" + delCard + " | " + data);
  deleteCardServ(data)
    .then((data) => {
      console.log(data);
      delCard.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

function reset() {
  nameCard.value = "";
  urlCard.value = "";
}

Promise.all([updateUser(), updateCards()])
  .then(([userData, cardData]) => {
    profileTitle.textContent = userData.name;
    profileDesc.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;

    const pageOwnerId = userData._id;

    cardData.forEach((card) => {
      const cardOwnerId = card.owner._id;
      const cardId = card._id;
    });

    displayOnPage(cardData, pageOwnerId);
  })
  .catch((error) => {
    console.log(error);
  });

profileImage.addEventListener("mouseenter", function (e) {
  e.preventDefault();
  const profilePen = document.getElementById("edit-pen");
  profilePen.style.display = "flex";
});

profileImage.addEventListener("mouseleave", function (e) {
  e.preventDefault();
  const profilePen = document.getElementById("edit-pen");
  profilePen.style.display = "none";
});

profileImage.addEventListener("click", function (e) {
  e.preventDefault();
  openPopup(popupEditPhoto);
});

popupEditPhotoClose.addEventListener("click", function (e) {
  e.preventDefault();
  closePopup(popupEditPhoto);
});

formEditPhoto.addEventListener("submit", function (e) {
  e.preventDefault();
  const button = formEditPhoto.querySelector(".popup__button");
  button.innerHTML = "Сохранение...";

  const newUserPhoto = {
    avatar: popupInputPhoto.value,
  };

  savePhoto(newUserPhoto)
    .then((data) => {
      profileImage.style.backgroundImage = `url(${data.avatar})`;
      closePopup(popupEditPhoto);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      button.innerHTML = "Сохранить";
      console.log(button);
    });
});

enableValidation(validationConfig);

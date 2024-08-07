export { createCard, deleteCard };
import { setLIke, removeLike } from "./api.js";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки
function createCard(element, deleteCard, openImage, userID) {
  const cardElement = getCardTemplate();
  const cardImage = cardElement.querySelector(".card__image");
  const delButton = cardElement.querySelector(".card__delete-button");
  const ownerID = element.owner._id;

  cardElement.querySelector(".card__title").textContent = element.name;
  cardImage.src = element.link;
  cardImage.alt = element.name;

  if (ownerID !== userID) {
    delButton.classList.add("hide");
  } else {
    delButton.classList.remove("hide");
  }

  const delCard = cardElement.querySelector(".card__delete-button");
  delCard.addEventListener("click", function () {
    deleteCard(cardElement, element);
  });

  const likesNumber = element.likes.length;
  const likeCount = cardElement.querySelector(".card__like-num");
  const likeCard = cardElement.querySelector(".card__like-button");
  likeCount.textContent = likesNumber;

  likeCard.addEventListener("click", () => {
    toggleLikeButton(likeCard, element, userID, likeCount);
  });

  cardImage.addEventListener("click", () => openImage(element));

  return cardElement;
}

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

function toggleLikeButton(likeButton, dataCard, user, count) {
  if (likeButton.classList.contains("card__like-button_is-active")) {
    removeLike(dataCard)
      .then((data) => {
        likeButton.classList.remove("card__like-button_is-active");
        const currentCount = parseInt(data.likes.length, 10);
        count.textContent = currentCount;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  else {
    setLIke(dataCard)
      .then((data) => {
        likeButton.classList.add("card__like-button_is-active");
        const currentCount = parseInt(data.likes.length, 10);
        count.textContent = currentCount;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function getCardTemplate() {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  return cardElement;
}

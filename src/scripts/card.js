export { createCard };

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки
function createCard(card, deleteCard, openImage) {
  const cardElement = getCardTemplate();
  const cardImage = cardElement.querySelector(".card__image");
  cardElement.querySelector(".card__title").textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;

  const delCard = cardElement.querySelector(".card__delete-button");
  delCard.addEventListener('click', function() {
    deleteCard(cardElement);
  });

  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', () => toggleLikeButton(likeButton));

  cardImage.addEventListener('click', () => openImage(card));

  return cardElement;
}

function toggleLikeButton(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}

function getCardTemplate() {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  return cardElement;
}
// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const content = document.querySelector(".content");
const placesList = content.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(card) {
  const createElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = createElement.querySelector(".card__image");

  createElement.querySelector(".card__title").textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;

  const delCard = createElement.querySelector(".card__delete-button");
  delCard.addEventListener('click', function() {
    deleteCard(createElement);
  });

  return createElement;
}
// @todo: Функция удаления карточки
function deleteCard(delCard) {
  delCard.remove();
}

// @todo: Вывести карточки на страницу
function displayOnPage(cards) {
  cards.forEach(element => {
    const card = createCard(element);
    placesList.append(card);
  });
}

displayOnPage(initialCards);
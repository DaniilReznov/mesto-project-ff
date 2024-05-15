// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const content = document.querySelector(".content");
const placesList = content.querySelector(".places__list");

// @todo: Функция создания карточки
function newCard(card) {
  const createElement = cardTemplate.querySelector(".card").cloneNode(true);

  createElement.querySelector(".card__title").textContent = card.name;
  createElement.querySelector(".card__image").src = card.link;
  createElement.querySelector(".card__image").alt = card.name;

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
function displayOnPage(content) {
  content.forEach(element => {
    const card = newCard(element);
    placesList.append(card);
  });
}

displayOnPage(initialCards);
export {
  savePhoto,
  saveCard,
  saveUser,
  deleteCardServ,
  setLIke,
  removeLike,
  updateCards,
  updateUser,
};

const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-16",
  headers: {
    authorization: "970a184a-b58a-464e-9752-9637c2204b5a",
    "Content-Type": "application/json",
  },
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

function savePhoto(avatarLink) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(avatarLink),
  }).then(checkResponse);
}

function saveCard(newCard) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(newCard),
  }).then(checkResponse);
}

function saveUser(newUser) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(newUser),
  }).then(checkResponse);
}

function deleteCardServ(card) {
  const cardId = card._id;

  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
}

function setLIke(card) {
  const cardId = card._id;

  let url = `${config.baseUrl}/cards/likes/cardId`;
  url = url.replace("cardId", cardId);

  return fetch(url, {
    method: "PUT",
    headers: config.headers,
  }).then(checkResponse);
}

function removeLike(card) {
  const cardId = card._id;

  let url = `${config.baseUrl}/cards/likes/cardId`;
  url = url.replace("cardId", cardId);

  return fetch(url, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
}

function updateCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(checkResponse);
}

function updateUser() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(checkResponse);
}

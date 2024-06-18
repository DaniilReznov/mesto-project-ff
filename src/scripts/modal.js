export { openPopup, closePopup };

// открыть модальное окно
function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  popup.addEventListener('click', closePopupOverlay);
  document.addEventListener('keydown', closePopupEsc);
}

// закрыть модальное окно
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  popup.removeEventListener('click', closePopupOverlay);
  document.removeEventListener('keydown', closePopupEsc);
}

// закрытие на оверлей
function closePopupOverlay(e) {
  if (e.target === e.currentTarget) {
    const popupWindow = document.querySelector('.popup_is-opened');
    closePopup(popupWindow);
  }
}

// закрытие на esc
function closePopupEsc(e) {
  if (e.key === 'Escape') {
    const popupWindow = document.querySelector('.popup_is-opened');
    closePopup(popupWindow);
  }
}
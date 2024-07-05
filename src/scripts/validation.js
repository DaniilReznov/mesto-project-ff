export { enableValidation, clearValidation, validationConfig };

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "popup__input-error",
};

function showError(
  formSelector,
  inputSelector,
  errorMessage,
  validationConfig
) {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);

  inputSelector.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
}

function hideError(formSelector, inputSelector, validationConfig) {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);

  inputSelector.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = "";
}

function checkValidity(formSelector, inputSelector) {
  if (inputSelector.validity.patternMismatch) {
    inputSelector.setCustomValidity(inputSelector.dataset.errorMessage);
  } else {
    inputSelector.setCustomValidity("");
  }
  if (!inputSelector.validity.valid) {
    showError(
      formSelector,
      inputSelector,
      inputSelector.validationMessage,
      validationConfig
    );
  } else {
    hideError(formSelector, inputSelector, validationConfig);
  }
}

function invalidInput(inputList) {
  return inputList.some((inputSelector) => {
    return !inputSelector.validity.valid;
  });
}

function toggleButtonState(inputList, button) {
  if (invalidInput(inputList)) {
    button.disabled = true;
    button.classList.add(validationConfig.inactiveButtonClass);
  } else {
    button.disabled = false;
    button.classList.remove(validationConfig.inactiveButtonClass);
  }
}

function setEventListeners(formSelector, validationConfig) {
  const inputList = Array.from(
    formSelector.querySelectorAll(validationConfig.inputSelector)
  );
  const button = formSelector.querySelector(
    validationConfig.submitButtonSelector
  );

  toggleButtonState(inputList, button);
  inputList.forEach((inputSelector) => {
    inputSelector.addEventListener("input", function () {
      checkValidity(formSelector, inputSelector);
      toggleButtonState(inputList, button);
    });
  });
}

function enableValidation(validationConfig) {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((formSelector) => {
    setEventListeners(formSelector, validationConfig);
  });
}

function clearValidation(formToClear, validationConfig) {
  const clearInput = Array.from(
    formToClear.querySelectorAll(validationConfig.inputSelector)
  );
  clearInput.forEach((inputToClear) => {
    hideError(formToClear, inputToClear, validationConfig);
  });
}

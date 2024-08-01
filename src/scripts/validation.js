export { enableValidation, clearValidation};

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

function checkValidity(formSelector, inputSelector, validationConfig) {
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

function toggleButtonState(inputList, button, validationConfig) {
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

  toggleButtonState(inputList, button, validationConfig);
  inputList.forEach((inputSelector) => {
    inputSelector.addEventListener("input", function () {
      checkValidity(formSelector, inputSelector, validationConfig);
      toggleButtonState(inputList, button, validationConfig);
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
  const inputList = Array.from(
    formToClear.querySelectorAll(validationConfig.inputSelector)
  );
  const button = formToClear.querySelector(
    validationConfig.submitButtonSelector
  );
  inputList.forEach((inputToClear) => {
    hideError(formToClear, inputToClear, validationConfig);
  });
  console.log(inputList);
  console.log(button);
  console.log(validationConfig);
  toggleButtonState(inputList, button, validationConfig);
}

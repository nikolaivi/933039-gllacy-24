var buttonFeedbackPopup = document.querySelector(".our-contacts-button");
var popupFeedbackWindow = document.querySelector(".popup-feedback");
var popupOverlay = document.querySelector(".overlay");
var popupFeedbackForm = popupFeedbackWindow.querySelector(".feedback-form");
var popupFeedbackClose = popupFeedbackForm.querySelector(".popup-close");

var popupFeedbackName = popupFeedbackForm.querySelector("[name=customer-name]");
var popupFeedbackEmail = popupFeedbackForm.querySelector("[name=customer-email]");
var popupFeedbackMessage = popupFeedbackWindow.querySelector("[name=customer-feedback]");

var hasStorageSupport = true;
var storageName = "";
var storageEmail = "";

try {
  storageName = localStorage.getItem(name);
  storageEmail = localStorage.getItem(email);
} catch (err) {
  hasStorageSupport = false;
}

buttonFeedbackPopup.addEventListener("click", function (evt) {
  evt.preventDefault();
  popupFeedbackWindow.classList.add("popup-show");
  popupOverlay.classList.add("overlay-show");
  if (storageName && storageEmail) {
    popupFeedbackName.value = storageName;
    popupFeedbackEmail.value = storageEmail;
    popupFeedbackMessage.focus();
  } else {
    popupFeedbackName.focus();
  }
});

popupFeedbackClose.addEventListener("click", function (evt) {
  evt.preventDefault();
  popupFeedbackWindow.classList.remove("popup-show");
  popupFeedbackWindow.classList.remove("popup-error");
  popupOverlay.classList.remove("overlay-show");
});

popupFeedbackForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  if (!popupFeedbackName.value || !popupFeedbackEmail.value || !popupFeedbackMessage.value) {
    evt.preventDefault();
    popupFeedbackWindow.classList.remove("popup-error");
    popupFeedbackWindow.offsetWidth = popupFeedbackWindow.offsetWidth;
    popupFeedbackWindow.classList.add("popup-error");
  } else {
    if (hasStorageSupport) {
      localStorage.setItem("name", popupFeedbackName.value);
      localStorage.setItem("email", popupFeedbackEmail.value);
    }
    popupFeedbackForm.submit();
  }
})

document.addEventListener("keydown", function(evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (popupFeedbackWindow.classList.contains("popup-show")) {
      popupFeedbackWindow.classList.remove("popup-show");
      popupFeedbackWindow.classList.remove("popup-error");
      popupOverlay.classList.remove("overlay-show");
    }
  }
})

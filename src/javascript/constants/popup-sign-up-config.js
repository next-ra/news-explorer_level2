const popup = document.querySelector('#popup-sign-up');

const POPUP_SIGN_UP_CONFIG = {
  popup,
  form: document.querySelector('#form-sign-up'),
  button: document.querySelector('#button-sign-up'),
  popupProps: [{
    element: popup,
    className: ('popup_active'),
  }],
};
export default POPUP_SIGN_UP_CONFIG;

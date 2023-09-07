import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';
const LS = localStorage;
let formData = {};

form.addEventListener('input', throttle(onTextInput, 500))
function onTextInput(e) {
  formData[e.target.name] = e.target.value;
  LS.setItem(STORAGE_KEY, JSON.stringify(formData));
};
    
if (LS.getItem(STORAGE_KEY)) {
  formData = JSON.parse(LS.getItem(STORAGE_KEY));
    for (let key in formData) {
    form.elements[key].value = formData[key];
  }
};

form.addEventListener('submit', onFormSubmit);
function onFormSubmit(evt) {
  evt.preventDefault();
  const { email, message } = evt.target.elements;
    if (email.value === "" || message.value.trim() === "") {
       return alert("Всі поля повинні бути заповнені");
    }
    const text = {
    email: email.value,
    message: message.value
    }
  console.log(text);
  evt.currentTarget.reset();
  LS.removeItem(STORAGE_KEY);
}

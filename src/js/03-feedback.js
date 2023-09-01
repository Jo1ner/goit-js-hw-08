import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[type="email"]')
const messageInput = form.querySelector('textarea');

const STORAGE_KEY = 'feedback-form-state';
const formData = {};

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', e => {
    formData[e.target.name] = e.target.value;
    });

form.addEventListener('input', throttle(onTextInput, 500));

populateMessageOutput();

function onFormSubmit(evt) {
  evt.preventDefault();
  const { email, message } = evt.currentTarget.elements;
    if (email.value === "" || message.value.trim() === "") {
       return alert("Всі поля повинні бути заповнені");
    }
  localStorage.removeItem(STORAGE_KEY);
    const text = {
    email: email.value,
    message: message.value
    }
  console.log(text);
   evt.currentTarget.reset();
}
 

function onTextInput(evt) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateMessageOutput() {
    const savedMessage = localStorage.getItem(STORAGE_KEY);
    if (savedMessage) {
        messageInput.value = JSON.parse(savedMessage).message;
        emailInput.value = JSON.parse(savedMessage).email;
    }
}

import {clearFormFields} from './common_functions.js'

document.getElementById('btn_accept-book').addEventListener('click', (event) => {
  event.preventDefault();
  const isbn = document.getElementById('isbn').value;
  fetch('/book_returned', {
    method:'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify({isbn})
  })
  .then(() => {
    alert('Book Accepted!');
    clearFormFields(Array.from(document.querySelector('.form_accept-book').elements))
  })
  .catch((err) => {
    throw err;
  })
})
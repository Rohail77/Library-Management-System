import {clearFormFields} from './common_functions.js'

document.getElementById('btn_rem-book').addEventListener('click', (event) => {
  event.preventDefault();
  const isbn = document.getElementById('isbn').value;
  fetch('/remove_book', {
    method:'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify({isbn})
  })
  .then(() => {
    alert('Book Removed Successfully!');
    clearFormFields(Array.from(document.querySelector('.form_rem-book').elements))
  })
  .catch((err) => {
    throw err;
  })
})
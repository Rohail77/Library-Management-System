import {clearFormFields} from './common_functions.js'

document.getElementById('btn_add-book').addEventListener('click', (event)=> {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const edition = document.getElementById('edition').value;
  const publisher = document.getElementById('publisher').value;
  const category = document.getElementById('category').value;
  const isbn = document.getElementById('isbn').value;
  const quantity = document.getElementById('quantity').value;
  console.log(publisher);
  const book = {
    title, author, edition, publisher, category, isbn, quantity
  }
  fetch('/add_book', {
    method:'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(book)
  })
  .then(() => {
    alert('Book Added successfully')
    clearFormFields(Array.from(document.querySelector('.form_add-book').elements))
  })
  .catch((err) => {
    throw err;
  })
})
import { clearFormFields } from './common_functions.js'

document.getElementById('btn_issue-book').addEventListener('click', event => {
  event.preventDefault()
  const first_name = document.getElementById('fname').value
  const last_name = document.getElementById('lname').value
  const email = document.getElementById('email').value
  let due_date = document.getElementById('due-date').value
  const isbn = document.getElementById('isbn').value
  // Change Date to " YYYY-MM-DD HH:MM:SS " format
  const d = new Date(due_date)
  due_date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
  console.log(due_date)
  const data = {
    first_name,
    last_name,
    email,
    due_date,
    isbn,
  }
  fetch('/issue_book', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(() => {
      alert('Book Issued To member!')
      clearFormFields(
        Array.from(document.querySelector('.form_issue-book').elements)
      )
    })
    .catch(err => {
      throw err
    })
})

import {clearFormFields} from './common_functions.js'

// Add event listener to LOGIN button
document.querySelector('.login-btn').addEventListener('click', event => {
  event.preventDefault()
  const formDiv = document.querySelector('.login-form-div')
  formDiv.style.display = 'grid'
})

// Add event listener to login form CLOSE BUTTON
document.querySelector('.exit-login-form').addEventListener('click', () => {
  const formDiv = document.querySelector('.login-form-div')
  formDiv.style.display = 'none'
})

// const loginForm = document.getElementById('login-form')
// Send the LOGIN data to server
/*
document.getElementById('login-btn').addEventListener('click', event => {
  event.preventDefault()
  const formData = new FormData(loginForm)
  fetch('/login', {
    method: 'POST',
    body: formData,
  })
    .then((res) => {
      clearFormFields(Array.from(loginForm.elements))
      console.log(res)
      window.location.href = res.url
    })
    .catch(err => {
      throw err
    })
})
*/






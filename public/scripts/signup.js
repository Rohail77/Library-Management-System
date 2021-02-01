import { clearFormFields } from './common_functions.js'

const signupForm = document.getElementById('signup-form')
// Send the Signup Data to Server
document.getElementById('signup-btn').addEventListener('click', event => {
  event.preventDefault()
  const formData = new FormData(signupForm)
  console.log('yes')
  fetch('/signup', {
    method: 'POST',
    body: formData,
  })
    .then(() => {
      clearFormFields(Array.from(signupForm.elements))
      alert("Sign up Successfull")
      // Back to Login Page
      window.location.href = '/';
    })
    .catch(err => {
      throw err
    })
})

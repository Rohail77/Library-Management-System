import {clearFormFields} from './common_functions.js'


document.getElementById('btn_rem-member').addEventListener('click', (event)=> {
  event.preventDefault();
  const first_name = document.getElementById('fname').value;
  const last_name = document.getElementById('lname').value;
  const email = document.getElementById('email').value;
  const member = {first_name, last_name, email};
  validate(member);
  fetch('/remove_member', {
    method:'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(member)
  })
  .then(() => {
    clearFormFields(Array.from(document.querySelector('.form_rem-member').elements))
    alert('Removed Member!');
  })
  .catch((err) => {
    throw err;
  })
})
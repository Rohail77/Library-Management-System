import {
  clearFormFields,
  setAttributes,
  removeChildNodes,
} from './common_functions.js'

document.querySelector('.search-btn').addEventListener('click', event => {
  event.preventDefault()
  const memberName = document.getElementById('member-name').value
  fetch('/librarian_home', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ memberName }),
  })
    .then(res => res.json())
    .then(members => {
      console.log(members)
      renderMembers(members)
      clearFormFields(
        Array.from(document.querySelector('.search-members').elements)
      )
    })
    .catch(err => {
      throw err
    })
})

const renderMembers = members => {
  // remove all the books if any in the list
  const list = document.querySelector('.member-list')
  removeChildNodes(list)
  members.forEach(member => {
    const member_li = document.createElement('li')
    const memberImg = document.createElement('img')
    const memberInfo = document.createElement('div')
    const name = document.createElement('p')
    const username = document.createElement('p')
    const email = document.createElement('p')
    const phone = document.createElement('p')
    const address = document.createElement('p')
    // const dateJoined = document.createElement('p')

    const name_txt = document.createTextNode(`Name: ${member.name}`)
    const username_txt = document.createTextNode(`Username: ${member.username}`)
    const email_txt = document.createTextNode(`Email: ${member.email}`)
    const phone_txt = document.createTextNode(`Phone: ${member.phone_number}`)
    const address_txt = document.createTextNode(`Address: ${member.address}`)
    // const dateJoined_txt = document.createTextNode(`Date Joined: ${member.dateJoined}`)

    name.appendChild(name_txt)
    username.appendChild(username_txt)
    email.appendChild(email_txt)
    phone.appendChild(phone_txt)
    address.appendChild(address_txt)
    // dateJoined.appendChild(dateJoined_txt)

    memberInfo.appendChild(name)
    memberInfo.appendChild(username)
    memberInfo.appendChild(email)
    memberInfo.appendChild(phone)
    memberInfo.appendChild(address)
    // memberInfo.appendChild(dateJoined)

    member_li.appendChild(memberImg)
    member_li.appendChild(memberInfo)

    list.appendChild(member_li)

    /* <li class="member">
    <img src="" alt="member's picture">
    <div class="member-info">
      <p>Name: Rohail Taha</p>
      <p>Username: taha678</p>
      <p>Email: taha@gmail.com</p> 
      <p>Phone: 03238904769</p>
      <p>Address: Toba</p>
      <p>Date Joined: 21-10-2020</p>
    </div>
  </li> */

    setAttributes(member_li, { class: 'member' })
    setAttributes(memberImg, { src: '', alt: `member's picture` })
    setAttributes(memberInfo, { class: 'member-info' })
  })
}

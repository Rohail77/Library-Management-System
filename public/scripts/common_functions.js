const registerEventListener = (linkWithIsbn, post_route, cb) => {
  linkWithIsbn.addEventListener('click', event => {
    event.preventDefault()
    // get the isbn of the book that is to be held. The isbn is an attribute of the link.
    const isbn = linkWithIsbn.getAttribute('isbn')
    fetch(`${post_route}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isbn }),
    })
    .then(() => {
      if(cb) cb()
    })
    .catch(err => {
      throw err
    })
  })
}

// document.getElementById('held-book-list').addEventListener('click', event => {
//   event.preventDefault()
//   const isbn = document.getElementById('remove-held-book').getAttribute('isbn')
//   fetch('/held_books', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ isbn }),
//   })
//     .then(() => {
//       removeChildNodes(
//         document.getElementById('remove-held-book').parentNode.parentNode
//           .parentNode
//       )
//     })
//     .catch(err => {
//       throw err
//     })
// })

// Set attributes of a DOM element
const setAttributes = (ele, attributes) => {
  Object.keys(attributes).forEach(key => ele.setAttribute(key, attributes[key]))
}

// Remove all child nodes of an element
const removeChildNodes = parent => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild)
  }
}

// Clear all input fields of a form.
const clearFormFields = formElements => {
  formElements.forEach(element => {
    if (element.type != 'submit') element.value = ''
  })
}

export {registerEventListener, setAttributes, removeChildNodes, clearFormFields}

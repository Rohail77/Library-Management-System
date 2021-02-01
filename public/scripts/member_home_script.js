import {registerEventListener, setAttributes, removeChildNodes} from './common_functions.js'

// Add Event Listener to the Search Book Button
document.querySelector('.search-btn').addEventListener('click', event => {
  event.preventDefault()
  // Get the title of the book from the search input field.
  const title = document.getElementById('search-books').value
  fetch('/home', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title: title }),
  })
    .then(res => res.json())
    .then(books => renderBooks(books))
    .catch(err => {
      console.log('Error occurred in fetch')
      throw err
    })
})

// Method to display all the books.
const renderBooks = books => {
  // remove all the books if any in the list
  const list = document.getElementById('searched-book-list')
  removeChildNodes(list)
  books.forEach(book => {
    const bookDetails = document.createElement('li')
    const bookCover = document.createElement('img')
    const bookInfo = document.createElement('div')
    const title = document.createElement('p')
    const edition = document.createElement('p')
    const author = document.createElement('p')
    const publisher = document.createElement('p')
    const category = document.createElement('p')
    const actionsBook = document.createElement('div')
    const available = document.createElement('p')
    const holdLink = document.createElement('a')

    const title_txt = document.createTextNode(book.title)
    const edition_txt = document.createTextNode(`Edition: ${book.edition}`)
    const author_txt = document.createTextNode(`Author: ${book.author}`)
    const publisher_txt = document.createTextNode(book.publisher_name)
    const category_txt = document.createTextNode(`Category: ${book.category}`)
    const available_txt = document.createTextNode('Available')
    const holdLink_txt = document.createTextNode('Place a hold')

    title.appendChild(title_txt)
    edition.appendChild(edition_txt)
    author.appendChild(author_txt)
    publisher.appendChild(publisher_txt)
    category.appendChild(category_txt)
    available.appendChild(available_txt)
    holdLink.appendChild(holdLink_txt)

    actionsBook.appendChild(available)
    actionsBook.appendChild(holdLink)

    bookInfo.appendChild(title)
    bookInfo.appendChild(edition)
    bookInfo.appendChild(author)
    bookInfo.appendChild(publisher)
    bookInfo.appendChild(category)
    bookInfo.appendChild(actionsBook)

    bookDetails.appendChild(bookCover)
    bookDetails.appendChild(bookInfo)

    list.appendChild(bookDetails)

    setAttributes(bookDetails, { class: 'book-details' })
    setAttributes(bookCover, { src: '', alt: 'book cover' })
    setAttributes(bookInfo, { class: 'book-info' })
    setAttributes(actionsBook, { class: 'actions_book' })
    setAttributes(holdLink, { href: '#', isbn: book.isbn })
    // Register Event Listener for each hold link corresponding to each book.
    registerEventListener(holdLink, '/place_hold')
  })
}


// module.exports = removeChildNodes;
// module.exports = removeEventListener;

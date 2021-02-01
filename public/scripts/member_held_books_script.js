import {
  registerEventListener,
  setAttributes,
  removeChildNodes,
} from './common_functions.js'

const removeHeldBooks = Array.from(
  document.querySelectorAll('.remove-held-book')
)

removeHeldBooks.forEach(link => {
  registerEventListener(link, '/books_held', () => {
    link.parentNode.parentNode.parentNode.remove()
  })
})

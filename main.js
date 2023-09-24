const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  console.log(myLibrary);
}

function displayBook(myLibrary) {
  
}


const bookModal = new bootstrap.Modal('#book-modal');
const bookForm = document.querySelector('#book-form');
bookForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const pages = document.querySelector('#pages').value;
  const read = document.querySelector('#read').checked;
  addBookToLibrary(title, author, pages, read);
  bookForm.reset();
  bookModal.hide();
});
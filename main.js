const myLibrary = [];

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

Book.prototype.changeStatus = function () {
    this.status = !this.status;
}

function addBookToLibrary(myLibrary, book) {
    myLibrary.push(book);
    // console.log(myLibrary);
}

function displayStatus(book, statusButton) {
    if (book.status) {
        statusButton.setAttribute('class', 'status-button btn btn-outline-success');
        statusButton.textContent = 'Finished';
    } else {
        statusButton.setAttribute('class', 'status-button btn btn-outline-warning');
        statusButton.textContent = 'Ongoing';
    }
}

function renderLibrary(myLibrary) {
    const bookContainer = document.querySelector('.book-container');
    bookContainer.innerHTML = '';

    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');


        const bookInformation = document.createElement('div');
        bookInformation.classList.add('book-information');

        const bookTitle = document.createElement('div');
        bookTitle.classList.add('book-title');
        bookTitle.textContent = book.title;
        bookInformation.appendChild(bookTitle);
        const bookAuthor = document.createElement('div');
        bookAuthor.classList.add('book-author');
        bookAuthor.textContent = `by ${book.author}`;
        bookInformation.appendChild(bookAuthor);
        const bookPages = document.createElement('div');
        bookPages.classList.add('book-pages');
        bookPages.textContent = `Pages: ${book.pages}`;
        bookInformation.appendChild(bookPages);

        bookCard.appendChild(bookInformation);


        const bookStatus = document.createElement('div');
        bookStatus.classList.add('book-status');

        const statusButton = document.createElement('button');
        displayStatus(book, statusButton);
        bookStatus.appendChild(statusButton);
        const removeButton = document.createElement('button');
        removeButton.setAttribute('class', 'remove-button btn-close');
        removeButton.setAttribute('data-index', index);
        removeButton.addEventListener('click', () => {
            const index = removeButton.getAttribute('data-index');
            myLibrary.splice(+index, 1);
            renderLibrary(myLibrary);
        });
        bookStatus.appendChild(removeButton);

        bookCard.appendChild(bookStatus);


        bookContainer.appendChild(bookCard);
    });
}

function toggleStatus(myLibrary) {
    const statusButton = document.querySelectorAll('.status-button');
    statusButton.forEach((button, index) => {
        button.addEventListener('click', () => {
            const book = myLibrary[index];
            book.changeStatus();
            displayStatus(book, button);
        });
    });
}

const bookModal = new bootstrap.Modal('#book-modal');
const bookForm = document.querySelector('#book-form');
bookForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const status = document.querySelector('#status').checked;

    const book = new Book(title, author, pages, status);
    addBookToLibrary(myLibrary, book);
    renderLibrary(myLibrary);
    toggleStatus(myLibrary);

    bookForm.reset();
    bookModal.hide();
});

let book = new Book('Hollow City', 'Ransom Riggs', '416', true);
addBookToLibrary(myLibrary, book);
renderLibrary(myLibrary);
toggleStatus(myLibrary);

book = new Book('The Daily Stoic', 'Ryan Holiday', '416', false);
addBookToLibrary(myLibrary, book);
renderLibrary(myLibrary);
toggleStatus(myLibrary);
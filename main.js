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
    displayBook(myLibrary);
    removeBook(myLibrary);
    console.log(myLibrary);
}

function displayBook(myLibrary) {
    const bookContainer = document.querySelector('#book-container');
    bookContainer.innerHTML = '';
    myLibrary.forEach((book) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');


        const bookInfo = document.createElement('div');
        bookInfo.classList.add('book-info');
        const bookTitle = document.createElement('div');
        bookTitle.classList.add('book-title');
        bookTitle.textContent = book.title;
        const bookAuthor = document.createElement('div');
        bookAuthor.classList.add('book-author');
        bookAuthor.textContent = `by ${book.author}`;
        const bookPages = document.createElement('div');
        bookPages.classList.add('book-pages');
        bookPages.textContent = `Pages: ${book.pages}`;
        bookInfo.appendChild(bookTitle);
        bookInfo.appendChild(bookAuthor);
        bookInfo.appendChild(bookPages);

        
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');
        const statusButton = document.createElement('button');
        if (book.read) {
            statusButton.setAttribute('class', 'status-button btn btn-outline-success');
            statusButton.textContent = 'Read';
        } else {
            statusButton.setAttribute('class', 'status-button btn btn-outline-warning');
            statusButton.textContent = 'Ongoing';
        }

        const removeButton = document.createElement('button');
        removeButton.setAttribute('class', 'remove-button btn-close');
        removeButton.setAttribute('data-index', myLibrary.indexOf(book));

        buttonContainer.appendChild(statusButton);
        buttonContainer.appendChild(removeButton);


        bookCard.appendChild(bookInfo);
        bookCard.appendChild(buttonContainer);

        bookContainer.appendChild(bookCard);
    });
}


function removeBook(myLibrary) {
    const removeButton = document.querySelectorAll('.remove-button');
    removeButton.forEach((button) => {
        button.addEventListener('click', () => {
            const index = button.getAttribute('data-index');
            myLibrary.splice(+index, 1);
            displayBook(myLibrary);
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
  const read = document.querySelector('#read').checked;
  addBookToLibrary(title, author, pages, read);
  bookForm.reset();
  bookModal.hide();
});




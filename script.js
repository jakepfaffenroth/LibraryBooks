const submitBtn = document.querySelector('#submitBtn');
const libraryArea = document.querySelector('#libraryArea');
const bookCardsAll = document.querySelectorAll('#bookCard');
const titleTxtBox = document.querySelector('#titleInput');
const authorTxtBox = document.querySelector('#authorInput');
const confirmationMsg = document.querySelector('#entryConfirmation');

let myLibrary = [];
myLibrary.push(new Book('The Hobbit', 'J.R.R. Tolkien'));
myLibrary.push(new Book('1984', 'George Orwell'));
myLibrary.push(new Book('Mediations', 'Marcus Aurelius'));
render();

function Book(title, author) {
    this.title = title;
    this.author = author;
    this.getInfo = function () {
        return `${this.title}, by ${this.author}`;
    };
}

// Book.prototype.add = function (x, y) {
//     var book = { title: x, author: y };
//     myLibrary.push(book);
//     console.log(`Added ${x} by ${y} to myLibrary`);
// };

// Book.prototype.getInfo = function () {
//     return `${this.title}, by ${this.author}`;
// };


// TODO: Create popup form for book entry instead of the text fields
function addBookToLibrary() {
    let titleInput = titleTxtBox.value;
    let authorInput = authorTxtBox.value;
    confirmationMsg.textContent = '';

    if (titleInput === '' || authorInput === '') {
        return;
    } else {
        confirmationMsg.textContent = `Added book: ${titleInput} by ${authorInput}`;
        myLibrary.push(new Book(titleInput, authorInput));
        // book.add(titleInput, authorInput);
        while (libraryArea.hasChildNodes()) {
            libraryArea.removeChild(libraryArea.firstChild);
        }
        render();
        console.table(myLibrary);
        console.log('FIN');
    }
}

// TODO: Create cards
function render() {
    myLibrary.forEach((book) => {
        var bookCard = document.createElement('P');
        bookCard.classList = 'bookCard';
        //  bookCard.textContent = 'Book Info';
        bookCard.textContent = book.getInfo();
        // console.log(book.getInfo())
        libraryArea.appendChild(bookCard);
        console.table(myLibrary);
    });
    titleTxtBox.value = '';
    authorTxtBox.value = '';
}

submitBtn.addEventListener('click', addBookToLibrary);

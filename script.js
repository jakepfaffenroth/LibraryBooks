const submitBtn = document.querySelector('#submitBtn');
const libraryArea = document.querySelector('#libraryArea');
let bookCardsAll = document.querySelectorAll('#bookCard');
let titleTxtBox = document.querySelector('#titleInput');
let authorTxtBox = document.querySelector('#authorInput');
let readCheckBox = document.querySelector('#readInput')
const confirmationMsg = document.querySelector('#entryConfirmation');

let myLibrary = [];
myLibrary.push(new Book('The Hobbit', 'J.R.R. Tolkien', true));
myLibrary.push(new Book('1984', 'George Orwell', true));
myLibrary.push(new Book('Meditations', 'Marcus Aurelius', false));
render();

function Book(title, author, read) {
    this.title = title;
    this.author = author;
    this.read = read;
    // this.getInfo = function () {
    //     return `${this.title}
    //     ${\n}
    //     ${this.author}`;
    // };
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
    let readInput = readCheckBox.checked;
    confirmationMsg.textContent = '';

    if (titleInput === '' || authorInput === '') {
        return;
    } else {
        confirmationMsg.textContent = `Added book: ${titleInput} by ${authorInput}`;
        myLibrary.push(new Book(titleInput, authorInput, readInput));
        // book.add(titleInput, authorInput);

        render();
        console.table(myLibrary);
    }
}

// TODO: Create cards
function render() {
    if (myLibrary.length === 0) {
        confirmationMsg.textContent = 'Read something!';
    }
    while (libraryArea.hasChildNodes()) {
        libraryArea.removeChild(libraryArea.firstChild);
    }
    myLibrary.forEach((book) => {
        var bookCard = document.createElement('p');
        var bookTitle = document.createElement('p');
        var bookAuthor = document.createElement('p');
        var readStatus = document.createElement('div')
        var deleteBtn = document.createElement('button');
        // var bookInfo = document.createElement('div');

        bookCard.classList.add('bookCard');
        // bookInfo.classList = 'bookInfo';
        bookTitle.classList.add('bookTitle')
        bookAuthor.classList.add('bookAuthor')
        readStatus.classList.add('bookRead', 'notRead')
        deleteBtn.classList.add('deleteBtn')

        bookTitle.textContent = book.title;
        bookAuthor.textContent = book.author;
        deleteBtn.textContent = 'Remove';
        deleteBtn.id = book.title;

        if (book.read == true) {
            readStatus.classList.remove('notRead')
            readStatus.classList.add('read')
        }

        // bookCard.appendChild(bookInfo);
        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(deleteBtn);
        bookCard.appendChild(readStatus)
        libraryArea.appendChild(bookCard);
        // console.table(myLibrary);
    });
    titleTxtBox.value = '';
    authorTxtBox.value = '';
    readCheckBox.checked=false
    activateBtns();
}

function deleteBook(index) {
    myLibrary.splice(index, 1);
    console.table(myLibrary);
    render();
}

submitBtn.addEventListener('click', addBookToLibrary);

function activateBtns() {
    let allDeleteBtns = document.querySelectorAll('.deleteBtn');
    allDeleteBtns.forEach((btn) => {
        btn.addEventListener('click', function (e) {
            let index = myLibrary.findIndex((book) => book.title == e.target.dataset.title);
            deleteBook(index);
        });
    });
}

const submitBtn = document.querySelector('#submitBtn');
const libraryArea = document.querySelector('#libraryArea');
let bookCardsAll = document.querySelectorAll('#bookCard');
let titleTxtBox = document.querySelector('#titleInput');
let authorTxtBox = document.querySelector('#authorInput');
let readCheckBox = document.querySelector('#readInput');
const confirmationMsg = document.querySelector('#entryConfirmation');
let allDeleteBtns = [];
let allReadBtns = [];

var firebaseDB = firebase.database().ref();
var booksDB = firebase.database().ref('books/');
let myLibrary = [];

// Makes sure these books are present when site loads
fillBooks()
function fillBooks() {
booksDB.child('1984').set({
    title: '1984',
    author: 'George Orwell',
    readStatus: true,
});
booksDB.child('Meditations').set({
    title: 'Meditations',
    author: 'Marcus Aurelius',
    readStatus: false,
});
booksDB.child('The Hobbit').set({
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    readStatus: true,
});}


booksDB.on('value', function (snapshot) {
    myLibrary = snapshotToArray(snapshot);
    console.log('mylibrary (outside):');
    console.table(myLibrary);
    render();
});

function snapshotToArray(snapshot) {
    var snapLibrary = [];
    snapshot.forEach(function (childSnapshot) {
        var object = childSnapshot.val();
        object.key = childSnapshot.key;

        snapLibrary.push(object);
    });

    return snapLibrary;
}

// ----- RENDER PAGE ----- //
function render() {
    // If Library is empty, display message
    if (myLibrary.length === 0) {
        confirmationMsg.textContent = 'Read something!';
    }
    while (libraryArea.hasChildNodes()) {
        libraryArea.removeChild(libraryArea.firstChild);
    }

    // Creates dom elements for each book in Library
    myLibrary.forEach((book) => {
        var bookCard = document.createElement('p');
        var bookTitle = document.createElement('p');
        var bookAuthor = document.createElement('p');
        var readStatus = document.createElement('div');
        var deleteBtn = document.createElement('button');
        var readBtn = document.createElement('button');

        bookCard.classList.add('bookCard');
        bookTitle.classList.add('bookTitle');
        bookAuthor.classList.add('bookAuthor');
        readStatus.classList.add('bookRead', 'notRead');
        deleteBtn.classList.add('deleteBtn');
        readBtn.classList.add('readBtn');

        bookTitle.textContent = book.title;
        bookAuthor.textContent = book.author;
        deleteBtn.textContent = 'Remove';
        deleteBtn.id = book.title;
        readBtn.id = book.title;

        if (book.readStatus == true) {
            readStatus.classList.remove('notRead');
            readStatus.classList.add('read');
        }

        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(deleteBtn);
        bookCard.appendChild(readBtn);
        bookCard.appendChild(readStatus);
        libraryArea.appendChild(bookCard);
    });
    titleTxtBox.value = '';
    authorTxtBox.value = '';
    readCheckBox.checked = false;

    allDeleteBtns = document.querySelectorAll('.deleteBtn');
    allReadButtons = document.querySelectorAll('.readBtn');

    // Reload button event listeners when new bookCards are rendered
    activateBtns();

    // Toggle readStatus
    Object.prototype.readToggle = function (book) {
        var bookRef = booksDB.child(book.title).child('readStatus');
        bookRef.transaction(function (readStatus) {
            return (readStatus = !readStatus);
        });
    };
}

// Object constructor for new books
// Feed in info and it assembles an object
function Book(title, author, readStatus) {
    this.title = title;
    this.author = author;
    this.readStatus = readStatus;
}

// Pushes book to myLibrary and displayed "added..." msg
function addBookToLibrary() {
    let titleInput = titleTxtBox.value;
    let authorInput = authorTxtBox.value;
    let readInput = readCheckBox.checked;

    confirmationMsg.textContent = '';

    if (titleInput === '' || authorInput === '') {
        return;
    } else {
        // myLibrary.push(new Book(titleInput, authorInput, readInput));

        addBookToDB(titleInput, authorInput, readInput);

        confirmationMsg.textContent = `Added book: ${titleInput} by ${authorInput}`;
        render();
        console.log('Added to library:');
        console.table(myLibrary);
    }
}

// Pushes book to Firebase (called from addBookToLibrary)
function addBookToDB(title, author, readStatus) {
    console.log('added: ' + title);
    booksDB.child(title).set({
        title: title,
        author: author,
        readStatus: readStatus,
    });
}

// Removes book from myLibrary
function deleteBook(index, x) {
    var bookToRemove = firebase.database().ref('books/' + x);

    bookToRemove.remove();
    // myLibrary.splice(index, 1);

    render();
}

// ----- BUTTONS ----- //
submitBtn.addEventListener('click', addBookToLibrary);

function activateBtns() {
    allReadButtons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const index = myLibrary.findIndex((book) => book.title === btn.id);
            let book = myLibrary[index];
            book.readToggle(book);
            render();
        });
    });

    allDeleteBtns.forEach(function (btn) {
        btn.addEventListener('click', (e) => {
            const index = myLibrary.findIndex((book) => book.title === btn.id);
            var x = myLibrary[index].title;
            deleteBook(index, x);
        });
    });
}

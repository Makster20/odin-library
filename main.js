const container = document.querySelector('main');
const addBookButton = document.querySelector('nav button');
const dialog = document.querySelector('dialog');
const closeDialogButton = document.querySelector('dialog .close');
const addBookDialogButton = document.querySelector('dialog button');
let bookReadButtons = document.querySelectorAll('.card button')

const myLibrary = [];

function Book(name, author, pages, read) {
    // Constructor
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
}


addBookToLibrary = (name, author, pages, read) => {
    let book = new Book(name, author, pages, read);
    myLibrary.push(book);
}

displayBooks = (library, name, author) => {
    for (let book of library){
        const card = document.createElement('div')
        card.classList.add('card');
        container.append(card)
        
        const h2 = document.createElement('h2');
        h2.innerText = book.name
        card.append(h2)
    
        const pAuthor = document.createElement('p');
        pAuthor.innerText = 'by '
        const span = document.createElement('span');
        span.innerText = book.author;
        pAuthor.append(span);
        card.append(pAuthor)
    
        const pPages = document.createElement('p');
        pPages.innerText = `${book.pages} Pages`;
        card.append(pPages);
    
    
        const readButton = document.createElement('button');
        readButton.innerText = 'Read';
        card.append(readButton);

        if(book.read == true){
            readButton.classList.add('read');
        }

    
        const delButton = document.createElement('button');
        delButton.classList.add('delete');
        delButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /> </svg>'
        card.append(delButton);

        let bookId = myLibrary.findIndex(book => {
            if(book.name == name && book.author == author){
                return true;
            }
            else{
                return false;
            }
          });
        
        delButton.classList.add(`${bookId}-book`)

        readButton.addEventListener('click', () => {
            readButton.classList.toggle('read');
        });

        delButton.addEventListener('click', () => {
            myLibrary.splice(bookId, 1);
            container.removeChild(card);
        });

    }
}


addBookButton.addEventListener("click", () => {
    dialog.showModal();
  });

closeDialogButton.addEventListener("click", (e) => {
    e.preventDefault();
    dialog.close();
  });

addBookDialogButton.addEventListener('click', (e) => {
    e.preventDefault();
    let nameInput = document.querySelector('#name');
    let authorInput = document.querySelector('#author');
    let pagesInput = document.querySelector('#pages');
    let readInput = document.querySelector('#read');

    // Use the `.value` of inputs for adding a book
    let name = nameInput.value;
    let author = authorInput.value;
    let pages = pagesInput.value;
    let read = readInput.checked;
    
    container.innerHTML = '';

    addBookToLibrary(name, author, Number(pages), read);

    displayBooks(myLibrary, name, author);

    // Clear the input fields by resetting their values
    nameInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
    readInput.checked = false;
    dialog.close();
    console.log(myLibrary);
    
    bookReadButtons = document.querySelectorAll('.card button')
});



bookReadButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.classList.toggle('read');
    })
})

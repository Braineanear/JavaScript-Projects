class Book {
  constructor ( title, author, isbn ) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  static displayBooks () {
    const books = Store.getBooks();

    books.forEach( ( book ) => UI.addBookToList( book ) );
  }

  static addBookToList ( book ) {
    const row = document.createElement( 'tr' );

    row.innerHTML = `
      <td>${ book.title }</td>
      <td>${ book.author }</td>
      <td>${ book.isbn }</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

    bookList.appendChild( row );
  }

  static deleteBook ( element ) {
    if ( element.classList.contains( 'delete' ) ) {
      element.parentElement.parentElement.remove();
    }
  }

  static showAlert ( message, className ) {
    const div = document.createElement( 'div' );
    const container = document.querySelector( '.container' );

    div.className = `alert alert-${ className }`;
    div.appendChild( document.createTextNode( message ) );
    container.insertBefore( div, bookForm );

    setTimeout( () => document.querySelector( '.alert' ).remove(), 3000 );
  }

  static clearFields () {
    document.querySelector( '#title' ).value = '';
    document.querySelector( '#author' ).value = '';
    document.querySelector( '#isbn' ).value = '';
  }
}

class Store {
  static getBooks () {
    let books = localStorage.getItem( 'books' );

    if ( books === null ) {
      books = [];
    } else {
      books = JSON.parse( books )
    }

    return books;
  }

  static addBook ( book ) {
    const books = Store.getBooks();

    books.push( book );
    localStorage.setItem( 'books', JSON.stringify( books ) );
  }

  static removeBook ( isbn ) {
    const books = Store.getBooks();

    books.forEach( ( book, index ) => {
      if ( book.isbn === isbn ) {
        books.splice( index, 1 );
      }
    } );

    localStorage.setItem( 'books', JSON.stringify( books ) );
  }
}

const bookForm = document.getElementById( 'book-form' );
const bookList = document.getElementById( 'book-list' );

window.addEventListener( 'DOMContentLoaded', UI.displayBooks() );

bookForm.addEventListener( 'submit', ( e ) => {
  e.preventDefault();

  const title = document.getElementById( 'title' ).value;
  const author = document.getElementById( 'author' ).value;
  const isbn = document.getElementById( 'isbn' ).value;

  if ( title === '' || author === '' || isbn === '' ) {
    UI.showAlert( 'Please fill in all fields', 'danger' );
  } else {
    const book = new Book( title, author, isbn );

    UI.addBookToList( book );

    Store.addBook( book );

    UI.showAlert( 'Book added successfully', 'success' );

    UI.clearFields();
  }
} );

bookList.addEventListener( 'click', ( e ) => {
  e.preventDefault();

  UI.deleteBook( e.target );
  Store.removeBook( e.target.parentElement.previousElementSibling.textContent );

  UI.showAlert( 'Book removed successfully', 'success' );
} );

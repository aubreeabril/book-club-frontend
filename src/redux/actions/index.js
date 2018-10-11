import { GOOGLE_BOOKS_API_KEY } from "../../keys";

export function getBooks(searchValue) {
  return dispatch => {
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${searchValue}&key=${GOOGLE_BOOKS_API_KEY}`
    )
      .then(r => r.json())
      .then(books => dispatch(setBooks(books)));
  };
}

export function setBooks(books) {
  return { type: "SET_BOOKS", books };
}

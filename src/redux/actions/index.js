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

export function makeOrGetUser(profile) {
  // let newProfile = {
  //   name: profile.nickname,
  //   email: profile.name,
  //   picture: profile.picture,
  //   auth0sub: profile.sub
  // };
  return dispatch => {
    fetch(`http://localhost:3001/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: profile.nickname,
        email: profile.name,
        picture: profile.picture,
        auth0sub: profile.sub
      })
    })
      .then(r => r.json())
      .then(dispatch(getUsers(profile.sub)));
  };
}

export function getUsers(auth0sub) {
  return dispatch => {
    fetch(`http://localhost:3001/users`)
      .then(r => r.json())
      .then(users => dispatch(setUser(users, auth0sub)));
  };
}

export function setUser(users, auth0sub) {
  return { type: "SET_USERS", users, auth0sub };
}

export function getGroups() {
  return dispatch => {
    fetch(`http://localhost:3001/groups`)
      .then(r => r.json())
      .then(groups => dispatch(setGroups(groups)));
  };
}

function setGroups(groups) {
  return { type: "SET_GROUPS", groups };
}

export function createGroup(name) {
  return dispatch => {
    fetch(`http://localhost:3001/groups`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name
      })
    })
      .then(r => r.json())
      .then(dispatch(getGroups()));
  };
}

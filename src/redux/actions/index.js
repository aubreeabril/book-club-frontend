import { GOOGLE_BOOKS_API_KEY } from "../../keys";

export function getBooks(searchValue) {
  return dispatch => {
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${searchValue}&key=${GOOGLE_BOOKS_API_KEY}`
    )
      .then(r => r.json())
      // .then(books => console.log(books));
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

export function createUserGroup(groupId, userId, auth0sub) {
  return dispatch => {
    fetch(`http://localhost:3001/user_groups`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        group_id: groupId,
        user_id: userId
      })
    })
      .then(r => r.json())
      .then(dispatch(getUsers(auth0sub)));
  };
}

export function saveUserBook(userId, book) {
  return dispatch => {
    fetch(`http://localhost:3001/user_books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: userId,
        isbn: book.volumeInfo.industryIdentifiers[0].identifier,
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors[0],
        image: book.volumeInfo.imageLinks.smallThumbnail
      })
    });
  };
}

export function fetchGroupBooks() {
  return dispatch => {
    fetch(`http://localhost:3001/group_books`)
      .then(r => r.json())
      .then(groupBooks => dispatch(setGroupBooks(groupBooks)));
  };
}

function setGroupBooks(groupBooks) {
  return {
    type: "SET_GROUP_BOOKS",
    groupBooks
  };
}

export function addGroupBook(groupId, book) {
  return dispatch => {
    fetch(`http://localhost:3001/group_books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        group_id: groupId,
        isbn: book.isbn,
        title: book.title,
        author: book.author,
        image: book.image
      })
    })
      .then(r => r.json())
      .then(groupBook => dispatch(setClubBook(groupId, groupBook.id)));
  };
}

function setClubBook(groupId, groupBookId) {
  return dispatch => {
    fetch(`http://localhost:3001/groups/${groupId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        current_book: groupBookId
      })
    });
  };
}

export function setMeeting(groupId, dateTime) {
  let meetingDate = dateTime.toString();
  return dispatch => {
    fetch(`http://localhost:3001/groups/${groupId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        next_meeting: meetingDate
      })
    })
      .then(r => r.json())
      .then(group => console.log(group));
  };
}

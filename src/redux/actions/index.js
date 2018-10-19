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
    })
      .then(r => r.json())
      .then(json => dispatch(clearSearchedBooks()));
  };
}

function clearSearchedBooks() {
  return {
    type: "CLEAR_SEARCHED_BOOKS"
  };
}

export function fetchGroupBooks() {
  return dispatch => {
    fetch(`http://localhost:3001/group_books`)
      .then(r => r.json())
      .then(groupBooks => {
        // console.log(groupBooks);
        dispatch(setGroupBooks(groupBooks));
      });
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
      .then(groupBook => {
        console.log(groupBook);
        dispatch(fetchGroupBooks());
      });
  };
}

export function setClubBook(groupId, groupBookId) {
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

export function setMeeting(groupId, dateTime, voteBy) {
  let meetingDate = dateTime.toString();
  return dispatch => {
    fetch(`http://localhost:3001/groups/${groupId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        next_meeting: meetingDate,
        vote_by: voteBy
      })
    }).then(r => r.json());
    // .then(group => console.log(group));
  };
}

export function deleteUserBook(userBookId, auth0sub) {
  return dispatch => {
    fetch(`http://localhost:3001/user_books/${userBookId}`, {
      method: "DELETE"
    })
      .then(r => r.json())
      .then(json => dispatch(getUsers(auth0sub)));
  };
}

export function createVote(userId, groupBookId) {
  return dispatch => {
    fetch(`http://localhost:3001/votes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: userId,
        group_book_id: groupBookId
      })
    })
      .then(r => r.json())
      .then(json => dispatch(fetchGroupBooks()));
  };
}

export function createMessage(userId, groupId, text) {
  return dispatch => {
    fetch(`http://localhost:3001/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: userId,
        group_id: groupId,
        text: text
      })
    })
      .then(r => r.json())
      .then(message => dispatch(fetchMessages(groupId)));
  };
}

export function fetchMessages(groupId) {
  return dispatch => {
    fetch(`http://localhost:3001/messages`)
      .then(r => r.json())
      .then(messages => dispatch(setChatMessages(messages, groupId)));
  };
}

function setChatMessages(messages, groupId) {
  return {
    type: "SET_CHAT_MESSAGES",
    messages,
    groupId
  };
}

export function setCurrentGroup(groupId) {
  return {
    type: "SET_CURRENT_GROUP",
    groupId
  };
}

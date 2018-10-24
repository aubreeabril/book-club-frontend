import { GOOGLE_BOOKS_API_KEY, NY_TIMES_API_KEY } from "../../keys";
const RAILS_API_URL = "http://localhost:3001";
const GOOGLE_BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes?q=";
const NYTIMES_API_URL =
  "https://api.nytimes.com/svc/books/v3/lists.json?api-key=";

export function getBooks(searchValue) {
  return dispatch => {
    fetch(`${GOOGLE_BOOKS_API_URL}${searchValue}&key=${GOOGLE_BOOKS_API_KEY}`)
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
    fetch(`${RAILS_API_URL}/users`, {
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
    fetch(`${RAILS_API_URL}/users`)
      .then(r => r.json())
      .then(users => dispatch(setUser(users, auth0sub)));
  };
}

export function setUser(users, auth0sub) {
  return { type: "SET_USERS", users, auth0sub };
}

export function getGroups() {
  return dispatch => {
    fetch(`${RAILS_API_URL}/groups`)
      .then(r => r.json())
      .then(groups => dispatch(setGroups(groups)));
  };
}

function setGroups(groups) {
  return { type: "SET_GROUPS", groups };
}

export function createGroup(name, userId, auth0sub) {
  return dispatch => {
    fetch(`${RAILS_API_URL}/groups`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name
      })
    })
      .then(r => r.json())
      .then(json => {
        dispatch(createUserGroup(json.id, userId, auth0sub));
        dispatch(getGroups());
      });
  };
}

export function createUserGroup(groupId, userId, auth0sub) {
  return dispatch => {
    fetch(`${RAILS_API_URL}/user_groups`, {
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
      .then(json => dispatch(getUsers(auth0sub)));
  };
}

export function saveUserBook(userId, book) {
  return dispatch => {
    fetch(`${RAILS_API_URL}/user_books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: userId,
        isbn: book.volumeInfo.industryIdentifiers[0].identifier,
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors[0],
        image: book.volumeInfo.imageLinks.smallThumbnail,
        link: book.volumeInfo.infoLink,
        description: book.volumeInfo.description
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
    fetch(`${RAILS_API_URL}/group_books`)
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
    fetch(`${RAILS_API_URL}/group_books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        group_id: groupId,
        isbn: book.isbn,
        title: book.title,
        author: book.author,
        image: book.image,
        link: book.link,
        description: book.description
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
    fetch(`${RAILS_API_URL}/groups/${groupId}`, {
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
    fetch(`${RAILS_API_URL}/groups/${groupId}`, {
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
    fetch(`${RAILS_API_URL}/user_books/${userBookId}`, {
      method: "DELETE"
    })
      .then(r => r.json())
      .then(json => dispatch(getUsers(auth0sub)));
  };
}

export function createVote(userId, groupBookId) {
  return dispatch => {
    fetch(`${RAILS_API_URL}/votes`, {
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
    fetch(`${RAILS_API_URL}/messages`, {
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
    fetch(`${RAILS_API_URL}/messages`)
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

export function fetchBestsellers() {
  return dispatch => {
    let lists = [
      "hardcover-fiction",
      "hardcover-nonfiction",
      "trade-fiction-paperback",
      "paperback-nonfiction",
      "young-adult"
    ];
    let obj = {};
    const promises = lists.map(list =>
      fetch(`${NYTIMES_API_URL}${NY_TIMES_API_KEY}&list=${list}`)
        .then(r => r.json())
        .then(json => (obj[list] = json.results))
    );
    Promise.all(promises).then(bestsellersJson =>
      dispatch(setBestsellers(obj))
    );
  };
}

// .then(r => r.json())
// .then(books => dispatch(setBestsellers(list, books.results)));

function setBestsellers(books) {
  return {
    type: "SET_BESTSELLERS",
    books
  };
}

export function fetchBestsellerFromGoogle(userId, isbn) {
  return dispatch => {
    fetch(`${GOOGLE_BOOKS_API_URL}${isbn}&key=${GOOGLE_BOOKS_API_KEY}`)
      .then(r => r.json())
      .then(books => {
        console.log(books.items[0]);
        dispatch(saveUserBook(userId, books.items[0]));
      });
  };
}

export function clearBestsellers() {
  return {
    type: "CLEAR_BESTSELLERS"
  };
}

export function clearBookClubDate(groupId) {
  return dispatch => {
    fetch(`${RAILS_API_URL}/groups/${groupId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        next_meeting: null,
        vote_by: null,
        current_book: null
      })
    });
  };
}

export function clearGroupVotes(groupId) {
  return dispatch => {
    fetch(`${RAILS_API_URL}/groups/${groupId}/votes`, {
      method: "DELETE"
    })
      .then(r => r.json())
      .then(json => console.log(json));
  };
}

export function removeNominatedBook(groupBookId) {
  return dispatch => {
    fetch(`${RAILS_API_URL}/group_books/${groupBookId}`, {
      method: "DELETE"
    })
      .then(r => r.json())
      .then(json => dispatch(fetchGroupBooks()));
  };
}

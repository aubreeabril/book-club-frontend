const initialState = {
  booksFromSearch: [],
  currentUser: {},
  groups: [],
  groupBooks: [],
  users: [],
  chatMessages: [],
  currentGroup: null,
  bestsellers: []
};

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_BOOKS":
      let valid = action.books.items.filter(
        book => !!book.volumeInfo.industryIdentifiers
      );
      return {
        ...state,
        booksFromSearch: valid
      };
    case "SET_USERS":
      let user = action.users.find(user => user.auth0sub === action.auth0sub);
      return {
        ...state,
        currentUser: user,
        users: action.users
      };
    case "SET_GROUPS":
      return {
        ...state,
        groups: action.groups
      };
    case "SET_GROUP_BOOKS":
      return {
        ...state,
        groupBooks: action.groupBooks
      };
    case "SET_CHAT_MESSAGES":
      let chatMessages = action.messages.filter(
        message => message.group_id === action.groupId
      );
      return {
        ...state,
        chatMessages: chatMessages
      };
    case "SET_CURRENT_GROUP":
      return {
        ...state,
        currentGroup: action.groupId
      };
    case "CLEAR_SEARCHED_BOOKS":
      return {
        ...state,
        booksFromSearch: []
      };
    case "SET_BESTSELLERS":
      return {
        ...state,
        bestsellers: action.books
      };

    default:
      return state;
  }
};

export default bookReducer;

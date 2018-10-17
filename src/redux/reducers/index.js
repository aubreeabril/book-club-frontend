const initialState = {
  booksFromSearch: [],
  currentUser: {},
  groups: [],
  groupBooks: [],
  users: [],
  chatMessages: [],
  currentGroup: null
};

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_BOOKS":
      console.log(action.books.items);
      return {
        ...state,
        booksFromSearch: action.books.items
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
    default:
      return state;
  }
};

export default bookReducer;

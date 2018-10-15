const initialState = {
  booksFromSearch: [],
  currentUser: {},
  groups: [],
  groupBooks: []
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
        currentUser: user
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
    default:
      return state;
  }
};

export default bookReducer;

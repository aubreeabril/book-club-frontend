const initialState = {
  booksFromSearch: []
};

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_BOOKS":
      return {
        ...state,
        booksFromSearch: action.books.items
      };
    default:
      return state;
  }
};

export default bookReducer;

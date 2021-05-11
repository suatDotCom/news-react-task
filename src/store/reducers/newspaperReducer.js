const newspaperReducer = (state, action) => {
  switch (action.type) {
    case "SET_NEWSPAPERS":
      return {
        ...state,
        newspapers: action.payload,
      };
    case "ADD_FAVORITE_NEWSPAPER":
      var favoriteNewspapers = state.favoriteNewspapers.concat(action.payload);
      localStorage.setItem("favoriteNewspapers", favoriteNewspapers);

      return {
        ...state,
        favoriteNewspapers,
      };
    case "REMOVE_FAVORITE_NEWSPAPER":
      var favoriteNewspapers = state.favoriteNewspapers.filter(
        (item) => item != action.payload
      );
      localStorage.setItem("favoriteNewspapers", favoriteNewspapers);
      return {
        ...state,
        favoriteNewspapers,
      };
    default:
      return state;
  }
};

export default newspaperReducer;

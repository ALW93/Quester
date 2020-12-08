const SET_CATEGORIES = "Quest/categories/SET_CATEGORIES";

export const setCategories = (payload) => ({ type: SET_CATEGORIES, payload });

// Get All Categories User Has
export const getCategories = (id) => async (dispatch) => {
  const response = await fetch(`/api/users/${id}/categories`);
  const data = await response.json();
  if (data) {
    dispatch(setCategories(data.cats));
  }
  return data.cats;
};

export const categoryReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case SET_CATEGORIES: {
      return { ...state, categories: action.payload };
    }
    default:
      return state;
  }
};

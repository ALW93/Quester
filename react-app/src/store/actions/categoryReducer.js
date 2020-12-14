const SET_CATEGORIES = "Quest/categories/SET_CATEGORIES";
const ADD_CATEGORY = "Quest/categories/ADD_CATEGORY";
const DELETE_CATEGORY = "Quest/categories/DELETE_CATEGORY";

export const setCategories = (payload) => ({ type: SET_CATEGORIES, payload });
export const addCategory = (payload) => ({ type: ADD_CATEGORY, payload });
export const deleteCategory = (payload) => ({ type: DELETE_CATEGORY, payload });

// Get All Categories User Has
export const getCategories = (id) => async (dispatch) => {
  const response = await fetch(`/api/users/${id}/categories`);
  const data = await response.json();
  if (data) {
    dispatch(setCategories(data.cats));
  }
  return data.cats;
};

// POST a new Category
export const newCategory = (id, payload) => async (dispatch) => {
  const response = await fetch(`/api/users/${id}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (data) {
    return dispatch(addCategory(payload));
  }
  return data;
};

export const removeCategory = (userId, catId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/categories/${catId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (data) {
    dispatch(deleteCategory(data));
    return data;
  }
};

export const categoryReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case SET_CATEGORIES: {
      return { ...state, categories: action.payload };
    }
    case ADD_CATEGORY: {
      const newCategories = [...state.categories, action.payload];
      return { ...state, categories: newCategories };
    }
    default:
      return state;
  }
};

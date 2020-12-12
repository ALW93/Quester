export const SET_AUTH = "Quester/auth/SET_AUTH";
export const SET_ID = "Quester/auth/SET_ID";
export const SET_USER = "Quester/auth/SET_USER";
export const UPDATE_USER = "Quester/aut/UPDATE_USER";

export const setAuth = (auth) => ({ type: SET_AUTH, auth });
export const setId = (id) => ({ type: SET_ID, id });
export const setUser = (data) => ({ type: SET_USER, data });
export const updateUser = (payload) => ({ type: UPDATE_USER, payload });

export const authenticate = () => async (dispatch) => {
  const response = await fetch("/api/auth/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const user = await response.json();
  if (user) {
    dispatch(setAuth(true));
    dispatch(setUser(user));
  }
  return user;
};

export const setUserInfo = () => async (dispatch) => {
  const response = await fetch("/api/auth/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const user = await response.json();
  if (user) {
    dispatch(setUser(user));
  }
  return user;
};

export const login = async (email, password) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  return await response.json();
};

export const logout = async () => {
  const response = await fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

export const signUp = async (username, email, password) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
  return await response.json();
};

export const authReducer = (
  state = { auth: false, userId: "", user: {} },
  action
) => {
  switch (action.type) {
    case SET_AUTH: {
      return { ...state, auth: action.auth };
    }
    case SET_ID: {
      return { ...state, userId: action.id };
    }
    case SET_USER: {
      return { ...state, user: action.data };
    }
    case UPDATE_USER: {
      return { ...state, user: action.payload };
    }
    default:
      return state;
  }
};

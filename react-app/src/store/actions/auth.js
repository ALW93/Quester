export const SET_AUTH = "Quester/auth/SET_AUTH";
export const SET_ID = "Quester/auth/SET_ID";
export const SET_USER = "Quester/auth/SET_USER";

export const setAuth = (auth) => ({ type: SET_AUTH, auth });
export const setId = (id) => ({ type: SET_ID, id });
export const setUser = (data) => ({ type: SET_USER, data });

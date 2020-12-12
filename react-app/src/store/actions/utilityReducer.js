export const SHOW_FORM = "Quester/utility/SHOW_FORM";
export const SET_UPDATE = "Quester/utility/SET_UPDATE";

export const showForm = (open) => ({ type: SHOW_FORM, open });
export const setUpdate = (payload) => ({ type: SET_UPDATE, payload });

export const updateTimer = () => async (dispatch) => {
  await dispatch(setUpdate(true));
};

export const closeUpdate = () => async (dispatch) => {
  await dispatch(setUpdate(false));
};

export const utilityReducer = (
  state = { visible: false, update: false },
  action
) => {
  switch (action.type) {
    case SHOW_FORM: {
      return { ...state, visible: action.open };
    }
    case SET_UPDATE: {
      return { ...state, update: action.payload };
    }
    default:
      return state;
  }
};

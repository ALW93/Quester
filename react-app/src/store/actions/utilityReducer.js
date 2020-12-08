export const SHOW_FORM = "Quester/utility/SHOW_FORM";

export const showForm = (open) => ({ type: SHOW_FORM, open });

export const utilityReducer = (state = { visible: false }, action) => {
  switch (action.type) {
    case SHOW_FORM: {
      return { ...state, visible: action.open };
    }
    default:
      return state;
  }
};

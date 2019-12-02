const actions = {
  TOGGLE_SELECTED_SERVICE: 'TOGGLE_SELECTED_SERVICE',
};

const INITIAL_STATE = {
  _id: '',
};

export default function service(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actions.TOGGLE_SELECTED_SERVICE:
      return {
        ...state,
        _id: action._id,
      };
    default:
      return state;
  }
}

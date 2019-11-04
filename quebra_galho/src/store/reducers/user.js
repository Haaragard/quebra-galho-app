const actions = {
  TOGGLE_STATUS_USER: 'TOGGLE_STATUS_USER',
};
const INITIAL_STATE = {
  status: {
    auth: false,
    token: null,
  },
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actions.TOGGLE_STATUS_USER:
      return {
        ...state,
        status: action.status,
      };
    default:
      return state;
  }
}

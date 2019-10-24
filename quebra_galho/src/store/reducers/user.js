const actions = {
  TOGGLE_STATUS_USER: 'TOGGLE_STATUS_USER',
};
const INITIAL_STATE = {
  status: {
    auth: false,
    token: {},
  },
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actions.TOGGLE_STATUS_USER:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
}

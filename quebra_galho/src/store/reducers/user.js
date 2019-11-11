const actions = {
  TOGGLE_STATUS_USER: 'TOGGLE_STATUS_USER',
  TOGGLE_USER: 'TOGGLE_USER',
  TOGGLE_LOCATION: 'TOGGLE_LOCATION',
};

const INITIAL_STATE = {
  status: {
    auth: false,
    token: null,
  },
  user: {},
  location: {},
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actions.TOGGLE_STATUS_USER:
      return {
        ...state,
        status: action.status,
      };
    case actions.TOGGLE_USER:
      return {
        ...state,
        user: action.user,
      };
    case actions.TOGGLE_LOCATION:
      return {
        ...state,
        location: action.location,
      };
    default:
      return state;
  }
}

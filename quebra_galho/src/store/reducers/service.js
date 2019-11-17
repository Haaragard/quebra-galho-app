import api from "../../api";

const actions = {
  REQUEST_SERVICES: 'REQUEST_SERVICES'
};

const INITIAL_STATE = {
  list: []
};

export default async function service(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actions.REQUEST_SERVICES:
      const list = await api.get("service/list")
      
      return {
        ...state,
        list
      };
    default:
      return state;
  }
}

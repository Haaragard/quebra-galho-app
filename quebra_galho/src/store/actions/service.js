export function toggleSelectedService(_id) {
  return {
    type: 'TOGGLE_SELECTED_SERVICE',
    _id,
  };
}

export function toggleStatusUser(status) {
  return {
    type: 'TOGGLE_STATUS_USER',
    status,
  };
}

export function toggleUser(user) {
  return {
    type: 'TOGGLE_USER',
    user,
  };
}

export function toggleLocation(location) {
  return {
    type: 'TOGGLE_LOCATION',
    location,
  };
}

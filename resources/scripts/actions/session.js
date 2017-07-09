export function checkUserCredebility() {
  return {
    type: '_SESSION_CHECK'
  }
}

export function loggedIn(user_data) {
  return {
    type: 'SESSION_LOGGED_IN',
    user_data
  }
}

export function logout() {
  return {
    type: 'SESSION_CLEAR'
  }
}

export function getUserData() {
  return {
    type: '_SESSION_GET_USER_DATA'
  }
}
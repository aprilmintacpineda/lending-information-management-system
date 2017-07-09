export function login(password) {
  if(!password.length) {
    return {
      type: 'LOGIN_CPW',
      value: password
    }
  }

  return {
    type: '_LOGIN',
    password
  }
}

export function changePassword(value) {
  return {
    type: 'LOGIN_CPW',
    value
  }
}

export function clearLogin() {
  return {
    type: 'LOGIN_CLEAR'
  }
}
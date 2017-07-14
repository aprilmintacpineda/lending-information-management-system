export function fetch(id) {
  return {
    type: '_BORROWER_PROFILE_FETCH',
    id
  }
}

export function reset() {
  return {
    type: 'BORROWER_PROFILE_RESET'
  }
}
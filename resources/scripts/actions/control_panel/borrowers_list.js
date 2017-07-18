export function fetch(id) {
  return {
    type: '_BORROWERS_LIST_FETCH',
    id
  }
}

export function reset() {
  return {
    type: 'BORROWERS_LIST_RESET'
  }
}
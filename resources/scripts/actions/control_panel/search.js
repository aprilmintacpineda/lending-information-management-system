export function changeSearchString(value) {
  return {
    type: 'SEARCH_CHANGE_STRING',
    value
  }
}

export function changeSearchType(value) {
  return {
    type: 'SEARCH_CHANGE_TYPE',
    value
  }
}

export function submit(data) {
  return {
    type: '_SEARCH_SUBMIT',
    ...data
  }
}

export function reset() {
  return {
    type: 'SEARCH_RESET'
  }
}
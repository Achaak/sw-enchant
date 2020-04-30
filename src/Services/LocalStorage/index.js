const setItem = (name, value) => {
  localStorage.setItem(name, JSON.stringify(value))
}

const getItem = (name) => {
  return JSON.parse(localStorage.getItem(name))
}

export default {
  setItem,
  getItem,
}
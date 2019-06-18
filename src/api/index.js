export function fetchItem (id) {
  console.log('call FETCH ITEM API')
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`items/${Math.random()}`)
    }, 1000)
  })
}

export function fetchUser (id) {
  console.log('call FETCH USER API')
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`users/${Math.random()}`)
    }, 1000)
  })
}

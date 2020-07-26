const config = {
  title: 'two-step-auth',
  colors: ['#F44336', '#00bcd4', '#4caf50'],
  password: {
    min: 4,
    max: 32
  },
  email: {
    min: 4,
    max: 32
  },
  fetch: {
    url: 'http://localhost:8080/api',
    data: {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      referrerPolicy: 'no-referrer'
    }
  }
}

Object.freeze(config);

export { config }

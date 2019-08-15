const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const location = search.value
  if (location) {
    messageOne.textContent = 'Loading...'
    fetch(`http://localhost:3000/weather?address=${encodeURIComponent(location)}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = 'Unable to find location. Try another search.'
      } else {
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast
      }
    })
  })
  } else {
    messageOne.textContent = 'Submit a location!'
  }
})
const request = require('request')


const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/64aa4306dc0cd72f9b21accb6ba7fef8/${latitude},${longitude}?units=si&lang=nl`

  request({ url, json: true }, (error, response) => {
    const { error:bodyError, code} = response.body
    const { summary } = response.body.daily.data[0]
    const { temperature, precipIntensity } = response.body.currently

    if (error) {
      callback('Unable to connect to weather service!', undefined)
    } else if (bodyError) {
        callback(code + ': ' + bodyError, undefined)
    } else {
      callback(undefined, summary + ' It is currently ' + temperature + ' Celcius out. There is a ' + precipIntensity + '% chance of rain.')
      }
  })
}
module.exports = forecast
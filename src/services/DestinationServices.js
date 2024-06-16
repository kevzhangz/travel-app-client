const API_NINJA_KEY = 'gYaoQzvr5sOJVvXUozzMdw==cYzKIHPiYmDy2gZo';

const searchAirport = async (inputValue) => {
    try {
      let response = await fetch(`https://api.api-ninjas.com/v1/airports?name=${inputValue}`, {
        method: 'GET',
        headers: {
            'X-Api-Key': API_NINJA_KEY
        },
      })
      return await response.json()
    } catch (err) {
      console.log(err)
    }
}



const searchAirline = async (inputValue) => {
  try {
    let response = await fetch(`https://api.api-ninjas.com/v1/airlines?iata=${inputValue}`, {
      method: 'GET',
      headers: {
          'X-Api-Key': API_NINJA_KEY
      },
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

export default {
    searchAirport,
    searchAirline
}
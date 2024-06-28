
const searchFlight = async (data) => {
    try {
      let response = await fetch(`${import.meta.env.VITE_API_URL}/api/flight/search`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      return await response.json()
    } catch (err) {
      console.log(err)
    }
}

const placeFlightOrder = async (data, token) => {
  try {
    let response = await fetch(`${import.meta.env.VITE_API_URL}/api/flight/order`, {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

const updateOrderStatus = async (orderId, token) => {
  try {
    let response = await fetch(`${import.meta.env.VITE_API_URL}/api/flight/orderStatus`, {
      method: 'PUT',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({orderId})
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

const listOrder = async (token) => {
  try {
    let response = await fetch(`${import.meta.env.VITE_API_URL}/api/flight/order`, {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      },
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}


export default {
    searchFlight,
    listOrder,
    placeFlightOrder,
    updateOrderStatus
}
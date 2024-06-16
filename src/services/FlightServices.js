
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
      console.log('wer')
      console.log(err)
    }
}


export default {
    searchFlight
}
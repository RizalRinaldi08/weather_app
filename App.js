import React, { useState } from 'react'
import { View, StyleSheet, ActivityIndicator,Text } from 'react-native'
import { BASE_URL} from './src/constant'
import WeatherSearch from './src/components/weatherSearch'
import WeatherInfo from './src/components/weatherInfo'
import axios from 'axios'
import { API_KEY } from 'react-native-dotenv';

const App = () => {
  const [weatherData, setWeatherData] = useState()
  const [status, setStaus] = useState('')
  const searchWeather = (location) => {
    setStaus('loading')
    axios
       .get(`${BASE_URL}?q=${location}&appid=${API_KEY}`)
       .then((response) => {
         const data = response.data
         data.visibility /= 1000
         data.visibility = data.visibility.toFixed(2)
         data.main.temp -= 273.15
         data.main.temp = data.main.temp.toFixed(2)
         setWeatherData(data)
         setStaus('success')
       })
       .catch((error) => {
         console.log(error)
         setStaus('error')
       })
  }

  const renderComponent = () => {
    switch (status){
      case 'loading':
        return <ActivityIndicator size="large"/>
      case 'success':
        return <WeatherInfo weatherData={weatherData}/>
      case 'error':
        return <Text>Something went wrong. Please try again with correct city name</Text>
      default:
        return
    }
  } 
  return (
    <View style={styles.container}>
      <WeatherSearch searchWeather={searchWeather}/>
      <View style={styles.marginTop20}>{renderComponent()}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
})

export default App
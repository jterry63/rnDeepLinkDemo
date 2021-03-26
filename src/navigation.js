import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import HomeScreen from './screens/HomeScreen'
import DeepLinkScreen from './screens/DeepLinkScreen'

const MainApp = createStackNavigator({
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        headerTitle: 'Home'
      },
      path: 'Home'
    },
    DeepLink: {
      screen: DeepLinkScreen,
      navigationOptions: {
        headerTitle: 'DeepLink'
      },
      path: 'rndeeplink'
    }
  })
  const AppContainer = createAppContainer(MainApp)

  export default () => {
    const prefix = 'myapp://'
    return <AppContainer uriPrefix={prefix} />
  }
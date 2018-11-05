import React from 'react';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import { createStackNavigator } from 'react-navigation'
import DecksList from './components/DecksList'
import Deck from './components/Deck'
import CreateDeck from './components/CreateDeck'
import CreateCard from './components/CreateCard'
import { fromTop } from 'react-navigation-transitions';
import {Easing, Animated} from 'react-native'
import { pink, white, purple, yellow, green,  eletricBlue} from './utils'

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 320,
      easing: Easing.out(Easing.poly(2)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
      const { position, layout, scene, index, scenes } = sceneProps

      const thisSceneIndex = scene.index
      const height = layout.initHeight
      const width = layout.initWidth

      // We can access our navigation params on the scene's 'route' property
      var thisSceneParams = scene.route.params || {}

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [width, 0, 0]
      })

      const translateY = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [height, 0, 0]
      })

      const opacity = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex - 0.5, thisSceneIndex],
        outputRange: [0, 1, 1],
      })

      const scale = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [4, 1, 1]
      })

      const slideFromRight = { transform: [{ translateX }] }
      const scaleWithOpacity = { opacity, transform: [{ scaleX: scale }, { scaleY: scale }] }
      const slideInFromBottom = { transform: [{ translateY }] }

      if (index < 5) return slideInFromBottom
      else return scaleWithOpacity
    },
  }
}

const headerStyles = {
  headerTintColor: white,
  headerStyle: {
    backgroundColor: purple,
  },
  gesturesEnabled: true
}

const MainNavigator = createStackNavigator({

  DeckList: {
    screen: DecksList,
    navigationOptions: {
      title: 'Decks',
      ...headerStyles
    },
  },

  Quiz: {
    screen: Deck,
    navigationOptions: {
      title: 'Decks',
      ...headerStyles
    },
  },

  CreateDeck : {
    screen: CreateDeck,
    navigationOptions: {
      title: 'Creating a Deck',
      ...headerStyles
    },
  },

  CreateCard: {
    screen: CreateCard,
    navigationOptions: {
      title: 'Creating a Card',
      ...headerStyles
    },
  },

},{
    initialRouteName: 'DeckList',
    transitionConfig,
  })

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
          <MainNavigator />
      </Provider>
    );
  }
}


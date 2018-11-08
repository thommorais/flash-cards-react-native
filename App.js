import React from 'react';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from './reducers'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import DecksList from './components/DecksList'
import Deck from './components/Deck'
import CardsList from './components/CardsList'
import Quiz from './components/Quiz'
import CreateDeck from './components/CreateDeck'
import CreateCard from './components/CreateCard'
import {Easing, Animated, StatusBar, View} from 'react-native'
import { white, purple, pink} from './utils'

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

const DecksTabs = createStackNavigator({

  DeckList: {
    screen: DecksList,
    navigationOptions: {
      title: 'Decks',
      ...headerStyles
    },
  },

  Deck: {
    screen: Deck,
    navigationOptions: {
      title: 'Deck',
      ...headerStyles
    },
  },

  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz',
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

const CardsTabs = createStackNavigator({

  Cards: {
    screen: CardsList,
    navigationOptions: {
      title: 'Cards',
      ...headerStyles
    },
  },

},{
    initialRouteName: 'Cards',
    transitionConfig,
})


const MainNavigator = createBottomTabNavigator({
  Decks: {
    screen: DecksTabs,
    navigationOptions: {
      tabBarLabel: 'Decks',
      // tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    },
  },
  Cards: {
    screen: CardsTabs,
    navigationOptions: {
      tabBarLabel: 'Cards',
      // tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    },
  }
},{
    initialRouteName: 'Decks',
    tabBarOptions: {
      activeTintColor: pink,
      inactiveTintColor: white,
      labelStyle: {
        fontSize: 20,
      },
      style: {
        backgroundColor: purple,
      }
    },
})

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware)
)

function FlasCardsStatusBar () {
  return (
    <View>
      <StatusBar translucent backgroundColor={purple} barStyle="light-content" />
    </View>
  )
}

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <FlasCardsStatusBar />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}


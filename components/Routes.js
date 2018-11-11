
import DecksList from './DecksList'
import Deck from './Deck'
import CardsList from './CardsList'
import Quiz from './Quiz'
import CreateDeck from './CreateDeck'
import CardCreate from './CardCreate'
import Finalization from './Finalization'
import { white, purple, pink } from '../utils'
import {Easing, Animated } from 'react-native'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 360,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
      const { position, layout, scene } = sceneProps

      const {index} = scene
      const height = layout.initHeight

      const translateY = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [height, 0, 0]
      })

      return { transform: [{ translateY }] }

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

const CreateCardNav = {
  CardCreate: {
    screen: CardCreate,
    navigationOptions: {
      title: 'Creating a Card',
      ...headerStyles
    },
  },
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

  Finalization :{
    screen: Finalization,
    navigationOptions: {
      title: 'Congrats',
      ...headerStyles
    },
  },

  ...CreateCardNav,

},{transitionConfig})

const CardsTabs = createStackNavigator({

  Cards: {
    screen: CardsList,
    navigationOptions: {
      title: 'Cards',
      ...headerStyles
    },
  },
  ...CreateCardNav,
},{transitionConfig})


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

export default MainNavigator
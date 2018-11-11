import { Notifications, Permissions } from 'expo'
import { AsyncStorage } from 'react-native'

// colors
export const purple = '#393099'
export const yellow = '#F6D548'
export const pink = '#EC0A42'
export const eletricBlue = '#001936'
export const white = '#EBEDF0'
export const green = '#23C965'


export function getCardsFromReduxByDeck(deckCards, cards){
      return deckCards.reduce( (prev, curr) => {
        const card = cards.find( item => item.id === curr.id)
        prev.push({...card, answered: curr.answered })
        return prev
    }, [])
}

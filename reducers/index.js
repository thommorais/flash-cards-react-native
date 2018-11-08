import {
        DELETE_CARD,
        DELETE_DECK,
        CREATE_DECK,
        EDIT_DECK,
        SET_CARD_AS_ANSWERED_ON_DECK
    } from '../actions'

import InitialState from './InitialState'

export default function cards(state = InitialState, action){

    switch(action.type){

        case CREATE_DECK : {
            const { deck } = action
            return {
                ...state,
                decks : [
                    ...state.decks,
                    {...deck, }
                ]
            }

        }

        case EDIT_DECK : {
            const { deck } = action
            const decks = [...state.decks].filter(({id}) => id !== deck.id)
            return {...state, decks: [...decks, deck]}
        }

        case DELETE_DECK : {
            return {...state, decks : [...state.decks].filter(deck => deck.id !== action.id)}
        }

        case DELETE_CARD : {
            return {...state, cards : [...state.cards].filter(card => card.id !== action.id)}
        }

        case SET_CARD_AS_ANSWERED_ON_DECK: {

            const {cardState} = action

            const stateCopy = [...state.decks]

            const deck = stateCopy.find(item => item.id === cardState.deck)
            const decks = stateCopy.filter(item => item.id !== cardState.deck)

            deck.cards = [...deck.cards].map(card => {
                if(card.id === cardState.card ){
                    card.answered = true
                    card.userAnswer = cardState.userAnswer
                }
                return card
            })

            deck.answered = ++deck.answered
            deck.score = cardState.userAnswer ? deck.score + (10 / deck.cards.length) : deck.score

            return {
                ...state,
                decks : [...decks, deck]
            }
        }

    }

    return state

}
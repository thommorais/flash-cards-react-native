import {
        CREATE_CARD,
        EDIT_CARD,
        DELETE_CARD,
        DELETE_DECK,
        CREATE_DECK,
        EDIT_DECK,
        RESET_DECK,
        FINISHED_DECK,
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
                     {...deck},
                    ...state.decks
                ]
            }
        }

        case EDIT_DECK : {
            const { deck } = action
            const decks = [...state.decks].filter(({id}) => id !== deck.id)
            return {...state, decks: [...decks, deck]}
        }

        case DELETE_DECK : {
            const decks = [...state.decks].filter(({id}) => id !== action.id)
            return {...state, decks}
        }

        case RESET_DECK : {
            const {deck} = action
            const decks = [...state.decks].filter( ({id}) => id !== deck.id )
            return {...state, decks: [...decks, deck]}
        }

        case FINISHED_DECK : {
            const {deck} = action
            const decks = [...state.decks].filter( ({id}) => id !== deck.id )
            return {...state, decks: [...decks, deck]}
        }

        case CREATE_CARD : {
            const { card } = action
            return {
                ...state,
                cards : [
                    {...card},
                    ...state.cards
                ]
            }
        }

        case EDIT_CARD : {
            const { card } = action
            const cards = [...state.cards].filter(({id}) => id !== card.id)
            return {...state, cards: [...cards, card]}
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
            deck.score = cardState.userAnswer ? (deck.score + cardState.points) : deck.score

            return {
                ...state,
                decks : [...decks, deck]
            }
        }

    }

    return state

}
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

    const {type,  payload} = action

    console.log(payload)

    switch(type){

        case CREATE_DECK : {
            return {
                ...state,
                decks : [
                     {...payload},
                    ...state.decks
                ]
            }
        }

        case EDIT_DECK : {
            const decks = [...state.decks].filter(({id}) => id !== payload.id)
            return {...state, decks: [...decks, payload]}
        }

        case DELETE_DECK : {
            const decks = [...state.decks].filter(({id}) => id !== payload)
            return {...state, decks}
        }

        case RESET_DECK : {
            const decks = [...state.decks].filter( ({id}) => id !== payload.id )
            return {...state, decks: [...decks, payload]}
        }

        case FINISHED_DECK : {
            const decks = [...state.decks].filter( ({id}) => id !== payload.id )
            return {...state, decks: [...decks, payload]}
        }

        case CREATE_CARD : {
            return {
                ...state,
                cards : [
                    {...payload},
                    ...state.cards
                ]
            }
        }

        case EDIT_CARD : {
            const cards = [...state.cards].filter(({id}) => id !== payload.id)
            return {...state, cards: [...cards, payload]}
        }

        case DELETE_CARD : {
            return {...state, cards : [...state.cards].filter(card => card.id !== payload)}
        }

        case SET_CARD_AS_ANSWERED_ON_DECK: {

            const stateCopy = [...state.decks]

            const deck = stateCopy.find(item => item.id === payload.deck)
            const decks = stateCopy.filter(item => item.id !== payload.deck)

            deck.cards = [...deck.cards].map(card => {
                if(card.id === payload.card ){
                    card.answered = true
                    card.userAnswer = payload.userAnswer
                }
                return card
            })

            deck.answered = ++deck.answered
            deck.score = payload.userAnswer ? (deck.score + payload.points) : deck.score

            return {
                ...state,
                decks : [...decks, deck]
            }
        }

    }

    return state

}
export const DELETE_CARD = 'DELETE_CARD'
export const DELETE_DECK = 'DELETE_DECK'
export const CREATE_DECK = 'CREATE_DECK'
export const EDIT_DECK = 'EDIT_DECK'

export const SET_CARD_AS_ANSWERED_ON_DECK = 'SET_CARD_AS_ANSWERED_ON_DECK'



/*** CARDS ***/
const setCardAsAnsweredOnDeckAction = cardState => {
  return {
    type: SET_CARD_AS_ANSWERED_ON_DECK,
    cardState
  }
}

export function setCardAsAnsweredOnDeck(cardState) {
    return dispatch => {
        dispatch(setCardAsAnsweredOnDeckAction(cardState))
    }
}


// delete
const deleteCardAction = id => {
  return {
    type: DELETE_CARD,
    id
  }
}


export function deleteCard(id) {
    return (dispatch) => {
        dispatch(deleteCardAction(id))
    }
}


/*** DECKS ***/

// create
const createDeckAction = deck => {
  return {
    type: CREATE_DECK,
    deck
  }
}

export function createDeck(deck) {
    return (dispatch) => {
        dispatch(createDeckAction(deck))
    }
}

// edit
const editDeckAction = deck => {
  return {
    type: EDIT_DECK,
    deck
  }
}

export function editDeck(deck) {
    return (dispatch) => {
        dispatch(editDeckAction(deck))
    }
}



// delete
const deleteDeckAction = id => {
  return {
    type: DELETE_DECK,
    id
  }
}

export function deleteDeck(id) {
    return (dispatch) => {
        dispatch(deleteDeckAction(id))
    }
}
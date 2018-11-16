export const CREATE_CARD = 'CREATE_CARD'
export const EDIT_CARD = 'EDIT_CARD'
export const DELETE_CARD = 'DELETE_CARD'

export const DELETE_DECK = 'DELETE_DECK'
export const CREATE_DECK = 'CREATE_DECK'
export const EDIT_DECK = 'EDIT_DECK'
export const RESET_DECK = 'RESET_DECK'
export const FINISHED_DECK = 'FINISHED_DECK'
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

// create
const createCardAction = card => {
  return {
    type: CREATE_CARD,
    card
  }
}

export function createCard(card) {
    return (dispatch) => {
        dispatch(createCardAction(card))
    }
}

// edit
const editCardAction = card => {
  return {
    type: EDIT_CARD,
    card
  }
}

export function editCard(card) {
    return (dispatch) => {
        dispatch(editCardAction(card))
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
const deckCreateAction = deck => {
  return {
    type: CREATE_DECK,
    deck
  }
}

export function deckCreate(deck) {
    return (dispatch) => {
        dispatch(deckCreateAction(deck))
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


// reset deck
const resetDeckAction = deck => {
  return {
    type: RESET_DECK,
    deck
  }
}

export function resetDeck(deck) {
    return (dispatch) => {
        dispatch(resetDeckAction(deck))
    }
}


// Mark deck as finished
const finishedDeckAction = deck => {
  return {
    type: FINISHED_DECK,
    deck
  }
}

export function finishedDeck(deck) {
    return (dispatch) => {
        dispatch(finishedDeckAction(deck))
    }
}
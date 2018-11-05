const initialState = {

    cards : [{
        question: 'In Harry Potter and the Goblet of Fire, Harry Potter finally kisses Hermione Granger after the Tri-Wizard Tournament.',
        answer: 'true',
        type: 'bolean',
        id: 2,
    }],

    decks: [{
        id: 1,
        cards: [{
            id: 2,
            answered: null
        }],
        subject: 'Harry Potter',
        answered: 1,
        points: 2
    }],

}

export default function cards(state = initialState, action){

    return state

}
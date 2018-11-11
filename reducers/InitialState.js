export default {

    cards : [{
        question: 'In Harry Potter and the Goblet of Fire, Harry Potter finally kisses Hermione Granger after the Tri-Wizard Tournament.',
        answer: false,
        type: 'boolean',
        id: 2,
        points: 10
    },{
        question: 'What is the symbol for Gryffindor house?',
        answer: 'A Lion',
        type: 'objective',
        id: 1,
        points: 10
    },{
        question: 'What is the name of the story Bilbo wrote about his adventures?',
        answer: 'The Hobbit by Bilbo Baggins',
        type: 'objective',
        id: 3,
        points: 10
    },{
        question: 'By what name do the Elves call Gandalf?',
        answer: 'Mithrandir',
        type: 'objective',
        id: 4,
        points: 10
    },{
        question: 'According to the Movies, in which film does Aragorn recieve Anduil?',
        answer: 'The Return of the King',
        type: 'objective',
        id: 5,
        points: 10
    },{
        question: 'Who becomes king of Rohan after Theoden dies on Pelennor Fields?',
        answer: 'Eowyn',
        type: 'objective',
        id: 6,
        points: 10
    },{
        question: 'What is the name of Aragorn\'s ring, the Ring of_______?',
        answer: 'Nenya',
        type: 'objective',
        id: 7,
        points: 10
    },{
        question: 'What three swords were found in the Trolls Cave in The Hobbit?',
        answer: 'Orcrist, Sting and Glamdring',
        type: 'objective',
        id: 8,
        points: 10
    },{
        question: 'What gift did Galadriel\'s gift to Legolas?',
        answer: 'Bow of the Galadhrim and Lorien Arrows',
        type: 'objective',
        id: 9,
        points: 10
    }],

    decks: [{
        id: 1,
        subject: 'Harry Potter',
        answered: 0,
        score: 0,
        theme: 'pink',
        finalized: false,
        cards: [{
            id: 2,
            answered: false,
            userAnswer: false,
        }],
    },{
        id: 2,
        subject: 'Lord Of the Rings',
        answered: 0,
        score: 0,
        theme: 'yellow',
        finalized: false,
        cards: [{
            id: 3,
            answered: false,
            userAnswer: false,
        },{
            id: 4,
            answered: false,
            userAnswer: false,
        },{
            id: 5,
            answered: false,
            userAnswer: false,
        },{
            id: 6,
            answered: false,
            userAnswer: false,
        },{
            id: 7,
            answered: false,
            userAnswer: false,
        },{
            id: 8,
            answered: false,
            userAnswer: false,
        },{
            id: 2,
            answered: false,
            userAnswer: false,
        },{
            id: 1,
            answered: false,
            userAnswer: false,
        }],
    }],

}
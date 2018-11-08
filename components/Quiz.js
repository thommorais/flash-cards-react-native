import React, {PureComponent} from 'react';
import { Text, StyleSheet, ScrollView, View } from 'react-native'
import {eletricBlue, pink, white, green} from '../utils'
import { connect } from 'react-redux'
import Card from './Card'
import ProgressBar from './ProgressBar'
import { sharedStyles } from '../style'

class Quiz extends PureComponent {

  state = {
    deck : null,
    deckCards: [],
    currentCard: false,
    finished: false
  }

  componentDidMount(){

    const { decks, navigation, cards } = this.props
    const deck = decks.find( deck => deck.id === navigation.state.params.data.id)

    const deckCards = deck.cards.reduce( (prev, curr) => {
        const card = cards.find( item => item.id === curr.id)
        prev.push({...card, answered: curr.answered })
        return prev
    }, [])

    this.setState( () => ({deck, deckCards}), this.defineCurrentCard)

  }

  defineCurrentCard = () => {
    const currentCard = [...this.state.deckCards].find(card => !card.answered)
    this.setState( () => ({
      currentCard,
      finished: currentCard ? false : true
    }))
  }

  setAnswered = id => {

    const deckCards = [...this.state.deckCards].map(card => {
      if(card.id === id){
        card.answered = true
      }
      return card
    })

    this.setState( () => ({deckCards}), this.defineCurrentCard)

  }

  render() {

    const {deck, currentCard, finished} = this.state

    if(!deck){
      return (
        <View style={[styles.header, sharedStyles.padding]}>
          <Text>
            Loading
          </Text>
        </View>
      )
    }

    return (
      <View style={{backgroundColor:eletricBlue, flex: 1 }}>

        <View style={[sharedStyles.header, sharedStyles.padding, {flexDirection : 'row', justifyContent:'space-between' }]}>
          <Text style={styles.title}>{deck.subject}</Text>
          <View style={styles.progressBar}>
            <ProgressBar theme={'pink'} size="half" data={{numerator: deck.answered, denominator: deck.cards.length}} />
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.container}>
          {currentCard && <Card data={{currentCard, deck}} callback={ () => this.setAnswered(currentCard.id)} />}
          {finished && <Text style={styles.title}>Finished {deck.score}</Text>}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    position: "relative",
    backgroundColor: eletricBlue,
    paddingTop: 15,
    paddingBottom: 15
  },

  progressBar: {
    width: '35%',
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: white
  },

});


function mapStateToProps({cards, decks}) {
  return { cards, decks }
}

export default connect(
  mapStateToProps
)(Quiz)
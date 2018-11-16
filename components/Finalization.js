import React, {PureComponent} from 'react';
import {Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import {eletricBlue, pink, white, green, getCardsFromReduxByDeck} from '../utils'
import { connect } from 'react-redux'
import {sharedStyles, buttonBgColor} from '../style'
import { FontAwesome  } from '@expo/vector-icons'
import {resetDeck} from '../actions'
import { withNavigation } from 'react-navigation'

class Finalization extends PureComponent {

  resetDeck(currentDeck){

    const deck = JSON.parse(JSON.stringify(currentDeck))

    deck.cards.forEach(card => {
        card.answered = false
        card.userAnswer = null
    })

    deck.answered = 0
    deck.score = 0

    const {resetDeck, navigation} = this.props

    resetDeck(deck)
    navigation.navigate('Deck')

  }

  goToDecksList = () => {
    this.props.navigation.navigate('DeckList')
  }

  render() {

    const {deck} = this.props.navigation.state.params
    const theme = 'purple'
    const deckCards = getCardsFromReduxByDeck(deck.cards, this.props.cards)
    const totalPoints = deckCards.reduce( (a, c) => a + parseInt(c.points), 0)

    return (
      <View style={[sharedStyles.padding, styles.container]}>

         <View style={styles.wrapper}>
            <Text style={styles.title}>Your score</Text>
            <Text style={styles.body}>{deck.score}/{totalPoints}</Text>
         </View>

         <View style={[styles.wrapper, {flexDirection: 'row', marginTop: 180}]}>

            <TouchableOpacity onPress={() => this.resetDeck(deck)} style={[sharedStyles.callToAction, {backgroundColor: buttonBgColor['yellow']}]}>
                <Text style={[sharedStyles.callToActionText, {color: buttonBgColor.text['pink'] }]}>
                   <FontAwesome name='refresh' size={30} color={white} />
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.goToDecksList}  style={[sharedStyles.callToAction, {backgroundColor: buttonBgColor[theme], marginLeft: 20}]}>
                <Text style={[sharedStyles.callToActionText, {color: buttonBgColor.text[theme], marginRight: 30 }]}>
                    Start Another Quiz
                </Text>
                <FontAwesome name='caret-right' size={30} color={theme === 'purple' ? pink : white} />
            </TouchableOpacity>
         </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({

  container : {
      backgroundColor:eletricBlue,
      flex: 1,
      justifyContent: 'center'
 },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: green
  },

  body: {
    marginTop: 15,
    fontSize: 60,
    fontWeight: 'bold',
    color: white
  },

  wrapper: {
      marginTop: 20
  }

});

function mapStateToProps({cards, decks}) {
  return { cards, decks }
}

const mapDispatchToProps = dispatch => {
  return {
      resetDeck : deck => dispatch(resetDeck(deck))
  }
}

export default withNavigation(connect(
  mapStateToProps,
  mapDispatchToProps
)(Finalization))
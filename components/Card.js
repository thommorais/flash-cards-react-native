import React, {PureComponent} from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native'
import { pink, white, green} from '../utils'
import {sharedStyles, buttonBgColor} from '../style'
import { connect } from 'react-redux'
import CardObjectiveAnswer from './CardObjectiveAnswer'

import {setCardAsAnsweredOnDeck} from '../actions'

class Card extends PureComponent {

  state = {
      showResponse: false
  }

  handleAnswer = userAnswer => {

      const {data, setCardAsAnsweredOnDeck} = this.props
      const {currentCard} = data

      setCardAsAnsweredOnDeck({
          card : currentCard.id,
          deck : data.deck.id,
          userAnswer : (currentCard.type === 'boolean') ? currentCard.answer === userAnswer : userAnswer
      })

      console.log((currentCard.type === 'boolean') ? (currentCard.answer === userAnswer) : userAnswer, userAnswer)

      this.setState( () => ({
        showResponse: false
      }), this.props.callback)

  }

  render() {

    const { currentCard } = this.props.data
    const { showResponse } = this.state

    const boolean = currentCard.type === 'boolean'
    const objective = currentCard.type === 'objective'

    return (
        <View style={[styles.cardWrapper]}>
           <View style={{zIndex: 2}}>

              {!showResponse && (
                <View style={[styles.card, sharedStyles.padding ]}>

                  <Text style={styles.bodyCopy}>{currentCard.question}</Text>

                    {objective && (
                      <View style={{flexDirection: 'row', marginTop: 40}}>
                        <TouchableOpacity onPress={() => this.setState({showResponse: true}) } style={[sharedStyles.callToAction, {backgroundColor: buttonBgColor['pink']}]}>
                          <Text style={[sharedStyles.callToActionText, {color: buttonBgColor.text['pink'], fontSize: 24}]}>
                            Check answer
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}

                    {boolean && (
                      <View style={{flexDirection: 'row', marginTop: 30, justifyContent: 'space-around'}}>
                        <TouchableOpacity onPress={ () => this.handleAnswer(true) } style={[sharedStyles.callToAction, {backgroundColor: green }]}>
                          <Text style={[sharedStyles.callToActionText, {fontSize: 24 }]}>
                            👍 True
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.handleAnswer(false)} style={[sharedStyles.callToAction]}>
                          <Text style={[sharedStyles.callToActionText, {color: buttonBgColor.text['pink'], fontSize: 24}]}>
                            👎 False
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}

                </View>
              )}

              {boolean && showResponse && <CardCommemoration /> }

              {objective && showResponse && <CardObjectiveAnswer answer={currentCard.answer} callback={this.handleAnswer}  />}

            </View>

            <View style={[sharedStyles.firstShadow, sharedStyles.shadow, styles.shadow]} />
            <View style={[sharedStyles.lastShadow, sharedStyles.shadow, styles.shadow]} />
          </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
    return {
        setCardAsAnsweredOnDeck : ids => dispatch(setCardAsAnsweredOnDeck(ids))
    }
}

function mapStateToProps({cards, decks}) {
  return { cards, decks }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Card)

const styles = StyleSheet.create({

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: white
  },

  cardWrapper: {
    position: "relative",
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },

  card: {
    position: "relative",
    top: 0,
    left: 0,
    borderRadius: 12,
    backgroundColor: white,
    minHeight: 150,
  },

  bodyCopy: {
    fontSize: 32
  },

  shadow: {
    backgroundColor: white,
    zIndex: 1
  },

});


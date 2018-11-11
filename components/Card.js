import React, {PureComponent} from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Animated } from 'react-native'
import { pink, white, green} from '../utils'
import {sharedStyles, buttonBgColor} from '../style'
import { connect } from 'react-redux'
import CardObjectiveAnswer from './CardObjectiveAnswer'
import CardCommemoration from './CardCommemoration'

import {setCardAsAnsweredOnDeck} from '../actions'

class Card extends PureComponent {

  state = {
      showResponse: false,
      gotItRight: null,
      showFeedback: false,
      scale: new Animated.Value(0.95),
      translateY: new Animated.Value(20),
  }

  handleAnswer = answer => {

      const {data, setCardAsAnsweredOnDeck} = this.props
      const {currentCard} = data

      const userAnswer = (currentCard.type === 'boolean') ? (currentCard.answer === answer) : answer

      this.setState( () => ({
        gotItRight: userAnswer,
        showFeedback: true
      }))

      setCardAsAnsweredOnDeck({
          card : currentCard.id,
          points: currentCard.points,
          deck : data.deck.id,
          userAnswer
      })

      setTimeout(() => {
        this.setState( prev => ({
          showResponse: false,
          showFeedback: !prev.showFeedback,
          scale: new Animated.Value(0.95),
        }), () => {
          this.props.callback()
          this.triggerAnimation(0)
        })

      }, 1000)

  }


  triggerAnimation(delay){

    const {scale, translateY} = this.state

    Animated.parallel([
      Animated.timing(scale, {duration: 200, toValue: 1, delay}),
      Animated.timing(translateY, {duration: 200, toValue: 0, delay})
    ]).start()

  }

  componentDidMount() {
    this.triggerAnimation(200)
  }

  render() {

    const { currentCard } = this.props.data
    const { showResponse, gotItRight, showFeedback, scale, translateY} = this.state

    const boolean = currentCard.type === 'boolean'
    const objective = currentCard.type === 'objective'

    return (
        <View style={[styles.cardWrapper]}>
           <View style={{zIndex: 2}}>

              {!showResponse && (
                <Animated.View style={[styles.card, sharedStyles.padding, {transform: [{scale}, {translateY} ]} ]}>
                  <Text style={styles.bodyCopy}>{currentCard.question.trim()}</Text>
                  {objective && (
                    <View style={{flexDirection: 'row', marginTop: 20, justifyContent: 'flex-start'}}>
                      <TouchableOpacity onPress={() => this.setState({showResponse: true}) } style={[sharedStyles.callToAction, {backgroundColor: buttonBgColor['pink']}]}>
                        <Text style={[sharedStyles.callToActionText, {color: buttonBgColor.text['pink'], fontSize: 24}]}>
                          Check answer
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  {boolean && (
                    <View style={{flexDirection: 'row', marginTop: 20, justifyContent: 'space-around'}}>
                      <TouchableOpacity onPress={ () => this.handleAnswer(true) } style={[sharedStyles.callToAction, {backgroundColor: green }]}>
                        <Text style={[sharedStyles.callToActionText, {fontSize: 18}]}>
                          👍 True
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => this.handleAnswer(false)} style={[sharedStyles.callToAction]}>
                        <Text style={[sharedStyles.callToActionText, {color: buttonBgColor.text['pink'],fontSize: 18}]}>
                          👎 False
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}

                </Animated.View>
              )}

              {objective && showResponse && (
                <Animated.View style={[styles.card, sharedStyles.padding, {transform: [{scale}, {translateY} ]} ]}>
                  <CardObjectiveAnswer answer={currentCard.answer} callback={this.handleAnswer} />
                </Animated.View>
              )}

              {showFeedback && <CardCommemoration answer={gotItRight} /> }

            </View>

            <View>
              <View style={[sharedStyles.firstShadow, sharedStyles.shadow, styles.shadow]} />
              <View style={[sharedStyles.lastShadow, sharedStyles.shadow, styles.shadow]} />
            </View>
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
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },

  card: {
    flex: 1,
    width: '100%',
    borderRadius: 12,
    minHeight: 280,
    justifyContent: 'space-between',
    backgroundColor: white,
  },

  bodyCopy: {
    fontSize: 32
  },

  shadow: {
    backgroundColor: white,
    zIndex: 1
  },

});


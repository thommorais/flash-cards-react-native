import React from 'react'
import { TouchableOpacity, Text, StyleSheet, ScrollView, View, TextInput } from 'react-native'
import { eletricBlue, pink, white, purple, yellow, green, getCardsFromReduxByDeck } from '../utils'
import { sharedStyles, buttonBgColor } from '../style'
import CarouselOfCards from './CarouselOfCards'
import { connect } from 'react-redux'
import { FontAwesome } from '@expo/vector-icons'
import { deckCreate, editDeck } from '../actions'

class DeckCreate extends React.PureComponent {
  state = {
    subject: '',
    chooseCard: false,
    cards: [],
    id: null,
  }

  saveDeck = () => {

    if (this.props.navigation.state.params.mode === 'edit') {
      this.props.editDeck({ ...this.state })
    } else {
      this.props.deckCreate({ ...this.state })
    }

    this.props.navigation.navigate('Deck', {data: { ...this.state } })
     this.setState( () => ({
          subject: '',
          chooseCard: false,
          cards: [],
          id: null,
        }
      ))
  }

  removeCardById = id => {
    const cards = [...this.state.cards].filter(card => card.id !== id)
    this.setState( () => ({cards}))
  }

  chooseCard = () => {
    this.setState(prevState => ({ chooseCard: !prevState.chooseCard }))
  }

  addCard = (id, points) => {
    this.setState(prevState => ({
      cards: [...prevState.cards, { id, points, answered: false }],
    }))
  }

  createNewCard = () => {
    this.props.navigation.navigate('CardCreate', { mode: 'create', callback: this.addCard })
  }

  editingMode() {
    const { id } = this.props.navigation.state.params
    const currentDeck = this.props.decks.find(deck => deck.id === id)

    this.setState(() => ({ ...currentDeck }))
  }

  componentDidMount() {
    if (this.props.navigation.state.params.mode === 'edit') {
      this.editingMode()
    } else {
      this.setState(() => ({
        id: Date.now(),
        theme: ['pink', 'purple', 'yellow'][Math.floor(Math.random() * 3)],
        answered: 0,
        score: 0,
      }))
    }
  }

  render() {
    const { chooseCard, cards, subject } = this.state
    const currentCards = getCardsFromReduxByDeck(cards, this.props.cards)

    return (
      <View style={{ flex: 1, backgroundColor: eletricBlue }}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={sharedStyles.padding}>
            <Text style={[sharedStyles.label, styles.label]}>Deck’s name:</Text>
            <TextInput
              multiline={true}
              style={styles.inputText}
              placeholder="Insert a good name here"
              placeholderTextColor={'#384B62'}
              onChangeText={subject => this.setState({ subject })}
              value={subject}
            />
          </View>

          <View style={[sharedStyles.padding]}>
            <Text style={[sharedStyles.label, styles.label]}>Cards:</Text>
          </View>

          {!!currentCards && (
            <View>
              {currentCards.map(card => (
                <View key={card.id} style={[styles.currentCard, {marginRight: 20, marginLeft: 20, paddingBottom: 15, paddingTop: 15, flexDirection: 'row',}]}>

                    <View style={{justifyContent: 'flex-end', flex:1}}>
                      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                          <Text style={[sharedStyles.callToActionText, {fontSize: 16, color: pink }]}>
                              Question: <Text style={[sharedStyles.callToActionText, { fontSize: 16, marginTop: 10 }]}>
                                  {card.question}
                              </Text>
                          </Text>
                      </View>
                      <View style={{paddingTop: 10, flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                          <Text style={[sharedStyles.callToActionText, {fontSize: 15, color: pink }]}>
                              Answer: <Text style={[sharedStyles.callToActionText, { fontSize: 15, marginTop: 10 }]}>
                                  {card.answer.toString()}
                              </Text>
                          </Text>
                      </View>
                    </View>

                    <View style={{width: 50, alignItems: 'center'}}>
                        <TouchableOpacity onPress={() => this.removeCardById(card.id)}  style={[sharedStyles.buttonTool, {borderColor: buttonBgColor['purple'], height: 30, width: 30}]}>
                            <Text style={[sharedStyles.callToActionText, { fontSize: 15}]}>
                              <FontAwesome name='times' size={12} color={yellow} />
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
              ))}
            </View>
          )}

          <View style={[sharedStyles.padding]}>
            <View style={{ flexDirection: 'row'}}>
              {cards.length !== this.props.cards.length && (
                <TouchableOpacity
                  onPress={this.chooseCard}
                  style={[
                    sharedStyles.callToAction,
                    { marginRight: 15},
                    chooseCard ? { backgroundColor: pink } : { backgroundColor: purple },
                  ]}
                >
                  <Text style={[sharedStyles.callToActionText, { fontSize: 16 }]}>
                    {chooseCard ? 'Close' : 'Add existing card'}
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={this.createNewCard}
                style={[sharedStyles.callToAction, {backgroundColor: purple }]}
              >
                <Text style={[sharedStyles.callToActionText, { fontSize: 16 }]}>Create Card</Text>
              </TouchableOpacity>
            </View>
          </View>

          {!!chooseCard && (
            <View style={{ minHeight: 150, marginTop: 20 }}>
              <CarouselOfCards
                purpose="selection"
                hide={cards}
                action={this.addCard}
                autoclose={this.chooseCard}
              />
            </View>
          )}

          {cards.length && subject && (
            <View style={[sharedStyles.padding, { alignItems: 'flex-start', marginTop: 30 }]}>
              <TouchableOpacity
                onPress={this.saveDeck}
                style={[sharedStyles.callToAction, { backgroundColor: yellow }]}
              >
                <Text style={[sharedStyles.callToActionText, { color: pink, marginRight: 30 }]}>
                  Save Deck
                </Text>
                <FontAwesome name="caret-right" size={30} color={pink} />
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    paddingTop: 15,
    paddingBottom: 15,
  },

  label: {
    color: yellow,
  },

  inputText: {
    fontWeight: 'bold',
    fontSize: 32,
    paddingTop: 5,
    paddingBottom: 5,
    color: white,
  },

  currentCard: {
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 1,
    borderColor: white,
  }
})

const mapDispatchToProps = dispatch => {
  return {
    deckCreate: deck => dispatch(deckCreate(deck)),
    editDeck: deck => dispatch(editDeck(deck)),
  }
}

function mapStateToProps({ decks, cards }) {
  return { decks, cards }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckCreate)

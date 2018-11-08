import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ScrollView, View, TextInput } from 'react-native'
import {eletricBlue, pink, white, purple, yellow, green} from '../utils'
import {sharedStyles, buttonBgColor } from '../style'
import CarouselOfCards from './CarouselOfCards'
import {connect} from 'react-redux'
import { FontAwesome  } from '@expo/vector-icons'
import { createDeck, editDeck } from '../actions'

class CreateDeck extends React.PureComponent {

 state ={
     subject: '',
     chooseCard: false,
     cards : [],
     id: null
 }

 saveDeck = () => {

    const {subject, cards, id, theme, answered, score} = this.state

    if(this.props.navigation.state.params.mode === 'edit'){
        this.props.editDeck({ subject, cards, theme, id, answered, score,})
    } else {
        this.props.createDeck({ subject, cards, theme, id, answered, score,})
    }

 }

 chooseCard = () => {
    this.setState( (prevState) => ({chooseCard: !prevState.chooseCard}))
 }

 addCard = id => {
    this.setState( (prevState) => ({
        cards: [
            ...prevState.cards,
            {id, answered: false}
        ]
   }))
 }

 editingMode() {

    const {id} = this.props.navigation.state.params
    const currentDeck = this.props.decks.find(deck => deck.id === id)

    this.setState( () => ({...currentDeck}))

 }

 componentDidMount(){

    if(this.props.navigation.state.params.mode === 'edit'){
        this.editingMode()

    }else{

        this.setState( () => ({
            id: Date.now(),
            theme : ['pink', 'purple', 'yellow'][Math.floor(Math.random() * 3)],
            answered: 0,
            score: 0
        }))

    }

 }

  render() {

    const {chooseCard, cards} = this.state
    const {navigation} = this.props

    return (
      <View style={{flex: 1, backgroundColor: eletricBlue}}>
        <ScrollView contentContainerStyle={styles.container}>
            <View style={sharedStyles.padding}>
                <Text style={[sharedStyles.label, styles.label]}>
                    Deck’s name:
                </Text>
                <TextInput
                    style={styles.inputText}
                    placeholder="Insert a good name here"
                    placeholderTextColor={'#384B62'}
                    onChangeText={(subject) => this.setState({subject})}
                    value={this.state.subject}
                />
            </View>

            <View style={[sharedStyles.padding]}>

                <Text style={[sharedStyles.label, styles.label]}>
                    Cards:
                </Text>

                <View style={{flexDirection: 'row', marginTop: 20}}>

                    <TouchableOpacity onPress={this.chooseCard} style={[sharedStyles.callToAction, chooseCard ? {backgroundColor: pink} : {backgroundColor: purple} ]} >
                        <Text style={[sharedStyles.callToActionText, {fontSize: 16 }]}>
                            {chooseCard ? 'Close' : 'Add existing card'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('CreateCard')} style={[sharedStyles.callToAction, {marginLeft: 15, backgroundColor: purple}]}>
                        <Text style={[sharedStyles.callToActionText, {fontSize: 16}]}>
                            Create Card
                        </Text>
                    </TouchableOpacity>

                </View>

            </View>

            {!!chooseCard && (
                <View style={{minHeight: 200, marginTop: 20}}>
                    <CarouselOfCards purpose="selection" hide={cards} action={this.addCard} autoclose={this.chooseCard} />
                </View>
            )}

            <View style={[sharedStyles.padding, {alignItems: 'flex-start', marginTop: 30}]}>
                <TouchableOpacity onPress={this.saveDeck} style={[sharedStyles.callToAction, {backgroundColor: yellow}]}>
                    <Text style={[sharedStyles.callToActionText, {color:pink, marginRight: 30 }]}>
                        Save Deck
                    </Text>
                    <FontAwesome name='caret-right' size={30} color={pink} />
                </TouchableOpacity>
            </View>

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    position: "relative",
    paddingTop: 15,
    paddingBottom: 15,
  },

  label: {
      color: yellow
  },

  inputText: {
      fontWeight: 'bold',
      fontSize: 32,
      paddingTop: 5,
      paddingBottom: 5,
      color: white,
  }


});


const mapDispatchToProps = dispatch => {
  return {
    createDeck: deck => dispatch(createDeck(deck)),
    editDeck: deck => dispatch(editDeck(deck))
  }
}

function mapStateToProps({decks, cards}) {
  return { decks, cards }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateDeck)
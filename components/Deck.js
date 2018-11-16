import React, {Component} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native'
import ProgressBar from './ProgressBar'
import { pink, white, eletricBlue, getCardsFromReduxByDeck} from '../utils'
import {sharedStyles, buttonBgColor} from '../style'
import { FontAwesome  } from '@expo/vector-icons'
import { withNavigation } from 'react-navigation'
import {deleteDeck, DeckCreate} from '../actions'
import {connect} from 'react-redux'

class Deck extends Component {

  state = {
      totalPoints:  0,
      deck : null
  }

  deleteDeckById = () => {
    const {id} = this.props.navigation.state.params.data
    this.props.navigation.navigate('DeckList')
    this.props.deleteDeckById(id)
  }

  editDeckById = () => {
    const {id} = this.props.navigation.state.params.data
    this.props.navigation.navigate('DeckCreate', {id, mode: 'edit'})
  }

  startQuiz = () => {
    const {data} = this.props.navigation.state.params
    this.props.navigation.navigate('Quiz', {data})
  }

  getDeckData(){
    const {navigation, cards, decks} = this.props
    const {data} = navigation.state.params

    const deck = decks.find(deck => deck.id === data.id)

    if(!deck) return false

    const deckCards = getCardsFromReduxByDeck(deck.cards, cards)
    const totalPoints = deckCards.reduce( (a, c) => a + parseInt(c.points), 0)

    return {
        totalPoints,
        deckCards,
        deck,
        theme: data.theme,
    }
  }

  render() {

    const {theme, deck, deckCards, totalPoints} = this.getDeckData()
    const TextColor = theme === 'yellow' ? eletricBlue : white

    if(!deck){
        return (
            <View>
                <Text style={{fontSize: 16,  fontWeight: 'bold',  color:TextColor}}>
                    Loading
                </Text>
            </View>
        )
    }

    return (
      <View style={{flex: 1, backgroundColor: eletricBlue}}>
        <ScrollView contentContainerStyle={styles.container}>
           <View style={[styles.wrapper, {position: 'relative'}]}>

             <View style={[styles.deckLink, sharedStyles[theme]]}>
                 <View style={sharedStyles.padding}>
                     <ProgressBar theme={theme} size="full" data={{numerator: deck.answered, denominator: deckCards.length}} />
                 </View>

                 <View style={sharedStyles.padding}>
                     <Text style={{fontSize: 16,  fontWeight: 'bold',  color:TextColor}}>
                         Subject:
                     </Text>
                     <Text style={{fontSize: 32, fontWeight: 'bold', color:TextColor}}>
                         {deck.subject}
                     </Text>
                 </View>

                 <View style={[sharedStyles.padding, {paddingTop: 10, flexDirection: 'row', justifyContent: 'flex-start'}]}>
                     <View>
                         <Text style={{fontSize: 16,  fontWeight: 'bold',  color:TextColor}}>
                             Number of cards:
                         </Text>
                         <Text style={{fontSize: 32, fontWeight: 'bold', color:TextColor}}>
                             {deckCards.length}
                         </Text>
                      </View>

                     <View style={{marginLeft: 40}}>
                         <Text style={{fontSize: 16,  fontWeight: 'bold',  color:TextColor}}>
                             Score:
                         </Text>
                         <Text style={{fontSize: 32, fontWeight: 'bold', color:TextColor}}>
                             {deck.score}/{totalPoints}
                         </Text>
                      </View>
                 </View>

                 <View style={[sharedStyles.padding, {flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}]}>

                     <TouchableOpacity onPress={this.startQuiz}  style={[sharedStyles.callToAction, {backgroundColor: buttonBgColor[theme]}]}>
                         <Text style={[sharedStyles.callToActionText, {color: buttonBgColor.text[theme], marginRight: 30 }]}>
                             Start Quiz
                         </Text>
                         <FontAwesome name='caret-right' size={30} color={theme === 'purple' ? pink : white} />
                     </TouchableOpacity>

                     <View style={{flexDirection: 'row'}}>
                         <TouchableOpacity onPress={this.deleteDeckById} style={[sharedStyles.buttonTool, {borderColor: buttonBgColor[theme]}]}>
                             <FontAwesome name='trash' size={20} color={buttonBgColor[theme]} />
                         </TouchableOpacity>
                         <TouchableOpacity onPress={this.editDeckById} style={[sharedStyles.buttonTool, {borderColor: buttonBgColor[theme], marginLeft: 16}]}>
                             <FontAwesome name='pencil' size={20} color={buttonBgColor[theme]} />
                         </TouchableOpacity>
                     </View>
                 </View>
             </View>

             <View style={[sharedStyles.firstShadow, sharedStyles.shadow, sharedStyles[theme]]} />
             <View style={[sharedStyles.lastShadow, sharedStyles.shadow, sharedStyles[theme]]} />

           </View>
        </ScrollView>
      </View>

    );
  }
}


const styles = StyleSheet.create({

    subject: {
        color: white,
    },

    container: {
        position: "relative",
        backgroundColor: eletricBlue,
        paddingTop: 15,
        paddingBottom: 15
    },

    wrapper: {
        position: 'relative',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        marginBottom: 20,
    },

    deckLink: {
        position: "relative",
        zIndex: 4,
        borderRadius: 12,
    },

});

const mapDispatchToProps = dispatch => {
  return {
    deleteDeckById: id => dispatch(deleteDeck(id))
  }
}

function mapStateToProps({decks, cards}) {
  return { decks, cards }
}

export default withNavigation(connect(
  mapStateToProps,
  mapDispatchToProps
)(Deck))




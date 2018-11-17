import React, {PureComponent} from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import ProgressBar from './ProgressBar'
import { FontAwesome  } from '@expo/vector-icons'
import { withNavigation } from 'react-navigation'
import {deleteDeck} from '../actions'
import {connect} from 'react-redux'
import { sharedStyles, buttonBgColor, pink, white, eletricBlue } from '../style'

class DeckLink extends PureComponent {

  deleteDeckById = () => {
    const {id} = this.props.data
    this.props.deleteDeckById(id)
  }

  editDeckById = () => {
    const {id} = this.props.data
    this.props.navigation.navigate('DeckCreate', {id, mode: 'edit'})
  }

  goToDeck = () => {
    const {data} = this.props
    this.props.navigation.navigate('Deck', {data})
  }

  render() {
    const { theme, data } = this.props
    const TextColor = theme === 'yellow' ? eletricBlue : white

    return (
      <View style={[styles.wrapper, {position: 'relative'}]}>

        <View style={[styles.deckLink, sharedStyles[theme]]}>
            <View style={sharedStyles.padding}>
              <ProgressBar theme={theme} size="full" data={{numerator: data.answered, denominator: data.cards.length}} />
            </View>

            <View style={sharedStyles.padding}>

                <Text style={{fontSize: 16,  fontWeight: 'bold',  color:TextColor}}>
                    Subject:
                </Text>

                <Text style={{fontSize: 32, fontWeight: 'bold', color:TextColor}}>
                    {data.subject}
                </Text>
            </View>

            {!data.finalized && (
              <View style={[sharedStyles.padding, {flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}]}>
                  <TouchableOpacity onPress={this.goToDeck}  style={[sharedStyles.callToAction, {backgroundColor: buttonBgColor[theme]}]}>
                      <Text style={[sharedStyles.callToActionText, {color: buttonBgColor.text[theme], marginRight: 30 }]}>
                          Go to the deck
                      </Text>
                      <FontAwesome name='caret-right' size={30} color={theme === 'purple' ? pink : white} />
                  </TouchableOpacity>
              </View>
            )}

        </View>

        <View style={[sharedStyles.firstShadow, sharedStyles.shadow, sharedStyles[theme]]} />
        <View style={[sharedStyles.lastShadow, sharedStyles.shadow, sharedStyles[theme]]} />

      </View>
    );
  }
}


const styles = StyleSheet.create({

    subject: {
        color: white,
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

function mapStateToProps({decks}) {
  return { decks }
}

export default withNavigation(connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckLink))




import React, {PureComponent} from 'react';
import { TouchableOpacity, Text, StyleSheet, ScrollView, View } from 'react-native'
import DeckLink from './DeckLink'
import { connect } from 'react-redux'
import { eletricBlue, pink, white } from '../utils'
import { sharedStyles } from '../style'

class DecksList extends PureComponent {

  render() {

    const {navigation, decks} = this.props

    return (
      <View style={{flex: 1, backgroundColor: eletricBlue}}>
        <View style={sharedStyles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('DeckCreate', {mode : 'create'})} style={[sharedStyles.callToAction, {backgroundColor: pink}]}>
            <Text style={styles.headerButtonText}>Create Deck</Text>
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.container}>
          { decks.map( deck => <DeckLink key={deck.id} theme={deck.theme} data={deck}  />)}
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

  headerTitle: {
    color: white,
    fontSize: 32,
    fontWeight: 'bold'
  },

  headerButtonText: {
    color: white,
    fontSize: 18,
    fontWeight: 'bold'
  },

});


function mapStateToProps({decks}) {
  return { decks }
}

export default connect(
  mapStateToProps
)(DecksList)


import React, {PureComponent} from 'react';
import { TouchableOpacity, Text, StyleSheet, ScrollView, View } from 'react-native'
import DeckLink from './DeckLink'
import { connect } from 'react-redux'
import { eletricBlue, pink, white, purple, yellow } from '../utils'
import { sharedStyles } from '../style'

class DecksList extends PureComponent {

  render() {

    const {navigation, cards} = this.props

    return (
      <View style={{flex: 1, backgroundColor: eletricBlue}}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('CreateDeck')} style={[sharedStyles.callToAction, {backgroundColor: pink}]}>
            <Text style={styles.headerButtonText}>Create Deck</Text>
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.container}>
          {
            cards.map( card => <DeckLink key={card.id} theme="pink" navigation={navigation} data={card} />)
          }
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

  header: {
    position: 'relative',
    zIndex: 3,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'flex-end',
    backgroundColor: purple,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: eletricBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
  }
});


function mapStateToProps({cards}) {
  return { cards }
}

export default connect(
  mapStateToProps
)(DecksList)
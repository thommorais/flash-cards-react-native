import React, {PureComponent} from 'react';
import { TouchableOpacity, Text, StyleSheet, ScrollView, View } from 'react-native'
import { connect } from 'react-redux'
import { eletricBlue, pink, white, purple, yellow } from '../utils'
import { sharedStyles, buttonBgColor } from '../style'
import { FontAwesome  } from '@expo/vector-icons'

class CardsList extends PureComponent {

  render() {

    const { navigation, cards } = this.props

    return (
      <View style={{flex: 1, backgroundColor: eletricBlue}}>
        <View style={sharedStyles.header}>
          <TouchableOpacity  style={[sharedStyles.callToAction, {backgroundColor: pink}]}>
            <Text style={sharedStyles.headerButtonText}>Create Card</Text>
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.container}>
            {cards.map( card => (
              <View key={card.id} style={[sharedStyles.padding,styles.cardWrapper, styles.card]}>
                <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <TouchableOpacity onPress={this.deleteCartById} style={[sharedStyles.buttonTool, {borderColor: buttonBgColor['pink']}]}>
                        <FontAwesome name='trash' size={20} color={buttonBgColor['pink']} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.editCartById} style={[sharedStyles.buttonTool, {borderColor: buttonBgColor['pink'], marginLeft: 16}]}>
                        <FontAwesome name='pencil' size={20} color={buttonBgColor['pink']} />
                    </TouchableOpacity>
                </View>
                <View style={{marginTop: 20, flex: 1}}>
                  <Text style={styles.bodyCopy}>{card.question}</Text>
                </View>
              </View>
            ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({

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



function mapStateToProps({cards}) {
  return { cards }
}

export default connect(
  mapStateToProps
)(CardsList)


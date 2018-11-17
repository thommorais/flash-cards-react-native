import React, { PureComponent } from 'react';
import { TouchableOpacity, Text, StyleSheet, ScrollView, View } from 'react-native'
import { connect } from 'react-redux'
import { FontAwesome  } from '@expo/vector-icons'
import { deleteCard } from '../actions'
import { sharedStyles, buttonBgColor, eletricBlue, pink, white } from '../style'

class CardsList extends PureComponent {

  editCardById = card => {
    this.props.navigation.navigate('CardCreate', {card, mode: 'edit'})
  }

  render() {

    const { navigation, cards } = this.props

    return (
      <View style={{flex: 1, backgroundColor: eletricBlue}}>
        <View style={sharedStyles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('CardCreate', { mode: 'create'})} style={[sharedStyles.callToAction, {backgroundColor: pink}]}>
            <Text style={sharedStyles.headerButtonText}>Create Card</Text>
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.container}>
            {cards.map( card => (
              <View key={card.id} style={[sharedStyles.padding,styles.cardWrapper, styles.card]}>

                <View style={{marginTop: 20, flex: 1}}>
                  <Text style={[sharedStyles.callToActionText, {color:pink, fontSize: 24}]}>
                    Question:
                  </Text>
                  <Text style={styles.bodyCopy}>{card.question}</Text>
                </View>

                <View style={{marginTop: 20, flex: 1}}>
                  <Text style={[sharedStyles.callToActionText, {color:pink, fontSize: 24}]}>
                    Answer:
                  </Text>
                  <Text style={{fontSize: 24}}>{card.answer.toString()}</Text>
                </View>

                <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
                    <TouchableOpacity onPress={ () => this.props.deleteCardById(card.id)} style={[sharedStyles.buttonTool, {borderColor: buttonBgColor['pink']}]}>
                        <FontAwesome name='trash' size={20} color={buttonBgColor['pink']} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.editCardById(card)} style={[sharedStyles.buttonTool, {borderColor: buttonBgColor['pink'], marginLeft: 16}]}>
                        <FontAwesome name='pencil' size={20} color={buttonBgColor['pink']} />
                    </TouchableOpacity>
                </View>

              </View>
            ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    paddingBottom: 40
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
    fontSize: 26
  },

  shadow: {
    backgroundColor: white,
    zIndex: 1
  },

});


const mapDispatchToProps = dispatch => {
  return {
    deleteCardById: id => dispatch(deleteCard(id)),
  }
}

function mapStateToProps({cards}) {
  return { cards }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardsList)


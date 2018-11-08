import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native'
import SideSwipe from 'react-native-sideswipe'
import {eletricBlue, pink, white, purple, yellow} from '../utils'
import {sharedStyles, buttonBgColor} from '../style'
import { FontAwesome  } from '@expo/vector-icons'
import {connect} from 'react-redux'
import {deleteCard} from '../actions'

class CarouselOfCards extends Component {

  state = {
    currentIndex: 0,
    selectedCards: [],
    filteredCards: []
  }

  deleteCardById = id => this.props.deleteCardById(id)

  selectCardById = id => {

    const { action, autoclose } = this.props

    action(id)

    if(this.state.currentIndex === (this.state.filteredCards.length - 1)){
      autoclose()
      return false
    }

    this.setState( (prevState) => ({
        selectedCards: [...prevState.selectedCards, id],
        currentIndex: prevState.currentIndex + 1
    }))

  }

  componentDidMount(){

    const { cards, hide } = this.props
    const filteredCards = cards.filter( ({id}) => !hide.find( x => x.id === id))
    this.setState( () => ({filteredCards}))

  }

  render(){

    const { purpose } = this.props
    const { selectedCards, currentIndex, filteredCards} = this.state
    const { width } = Dimensions.get('window')

    return (
        <SideSwipe
            index={currentIndex}
            itemWidth={width}
            style={{width}}
            data={filteredCards}
            contentOffset={1}
            useNativeDriver={true}
            onIndexChange={index => this.setState((prev) => ({ currentIndex: index })) }
            renderItem={({ itemIndex, currentIndex, item }) => (
            <View
                {...item}
                index={itemIndex}
                currentIndex={currentIndex}
                style={[styles.card, {width: width - 40}, selectedCards.includes(item.id) && {opacity: 0.5}]}
              >

                <View style={[styles.actions]}>
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity style={[sharedStyles.buttonTool, {borderColor: eletricBlue}]}>
                            <FontAwesome name='pencil' size={20} color={eletricBlue} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.deleteCardById(item.id)} style={[sharedStyles.buttonTool, {borderColor: pink, marginLeft: 10}]}>
                            <FontAwesome name='trash' size={20} color={pink} />
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={[sharedStyles.label, styles.label]}>Question:</Text>
                <Text style={[styles.bodyCopy]}>{item.question}</Text>
                <Text style={[sharedStyles.label, styles.label]}>Answer:</Text>
                <Text style={styles.bodyCopy}>{item.answer}</Text>

                {purpose === 'selection' && !selectedCards.includes(item.id) &&  (
                  <View style={{alignItems: 'flex-start', marginTop: 20}}>
                      <TouchableOpacity onPress={() => this.selectCardById(item.id)} style={[sharedStyles.callToAction, {backgroundColor: purple }]}>
                          <Text style={[sharedStyles.callToActionText, {color: white}]}>
                              Select Card {currentIndex}
                          </Text>
                      </TouchableOpacity>
                  </View>
                )}

              </View>

            )}
          />
    );
  };
}

const styles = StyleSheet.create({

  carouselWrapper: {
    backgroundColor: pink,
    alignItems: "flex-start"
  },

  card: {
    borderRadius: 12,
    backgroundColor: white,
    padding: 20,
    marginRight: 20,
    marginLeft: 20,
    alignSelf: "flex-start"
  },

  label: {
    color: pink
  },

  bodyCopy : {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20
  },

  actions: {
    marginBottom: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row'
  }
});


const mapDispatchToProps = dispatch => {
  return {
    deleteCardById: id => dispatch(deleteCard(id))
  }
}

function mapStateToProps({cards}) {
  return { cards }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CarouselOfCards)
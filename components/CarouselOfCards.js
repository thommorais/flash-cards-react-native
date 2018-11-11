import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native'
import SideSwipe from 'react-native-sideswipe'
import {eletricBlue, pink, white, purple, yellow} from '../utils'
import {sharedStyles, buttonBgColor} from '../style'
import { FontAwesome  } from '@expo/vector-icons'
import {connect} from 'react-redux'

class CarouselOfCards extends Component {

  state = {
    currentIndex: 0,
    selectedCards: [],
    filteredCards: []
  }

  selectCardById = (id, points) => {

    const { action, autoclose, cards } = this.props

    action(id, points)

    if(this.state.selectedCards.length === ( cards.length - 1)){
      autoclose()
      return false
    }

    this.setState( (prevState) => ({
        selectedCards: [...prevState.selectedCards, id]
    }))

  }

  componentDidMount(){
    this.setState( () => ({
        selectedCards: this.props.hide.map(x => x.id),
    }))
  }

  render(){

    const { cards } = this.props
    const { currentIndex, selectedCards } = this.state
    const filteredCards = cards.filter( ({id}) => !selectedCards.find( x => x === id) )

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
                <Text style={[sharedStyles.label, styles.label]}>Question:</Text>
                <Text style={[styles.bodyCopy]}>{item.question}</Text>
                <Text style={[sharedStyles.label, styles.label]}>Answer:</Text>
                <Text style={styles.bodyCopy}>{item.answer ? item.answer.toString() : ''}</Text>

                <View style={{alignItems: 'flex-start', marginTop: 20}}>
                    <TouchableOpacity onPress={() => this.selectCardById(item.id, item.points)} style={[sharedStyles.callToAction, {backgroundColor: purple }]}>
                        <Text style={[sharedStyles.callToActionText, {color: white}]}>
                            Select Card
                        </Text>
                    </TouchableOpacity>
                </View>

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
    alignSelf: "flex-start",
    minHeight: 140
  },

  label: {
    color: pink
  },

  bodyCopy : {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },

});


function mapStateToProps({cards}) {
  return { cards }
}

export default connect(
  mapStateToProps
)(CarouselOfCards)
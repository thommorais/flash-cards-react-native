import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native'
import SideSwipe from 'react-native-sideswipe'
import {eletricBlue, pink, white, purple, yellow} from '../utils'
import {sharedStyles } from '../style'
import { FontAwesome  } from '@expo/vector-icons'

export default class CarouselOfCards extends Component {

  state = {
    currentIndex: 0,
  }

  render(){
    // center items on screen
    const { width } = Dimensions.get('window');
    const data = [
      {
        key: 'a',
        question: 'What is the symbol for Gryffindor house?',
        answer: 'Lion'
      },
      {
        key: 'b',
        question: 'In Harry Potter and the Goblet of Fire, Harry Potter finally kisses Hermione Granger after the Tri-Wizard Tournament.',
        answer: 'True'
      }
    ]

    return (
        <SideSwipe
            index={this.state.currentIndex}
            itemWidth={width}
            style={{width}}
            data={data}
            contentOffset={0}
            useNativeDriver={true}
            onIndexChange={index => this.setState(() => ({ currentIndex: index })) }
            renderItem={({ itemIndex, currentIndex, item, animatedValue }) => (
            <View
                {...item}
                index={itemIndex}
                currentIndex={currentIndex}
                animatedValue={20}
                style={[styles.card, {width: width - 40}]}
              >

                <View style={[styles.actions]}>
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity style={[sharedStyles.buttonTool, {borderColor: eletricBlue}]}>
                            <FontAwesome name='pencil' size={20} color={eletricBlue} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[sharedStyles.buttonTool, {borderColor: pink, marginLeft: 10}]}>
                            <FontAwesome name='trash' size={20} color={pink} />
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={[sharedStyles.label, styles.label]}>Question:</Text>
                <Text style={[styles.bodyCopy]}>{item.question}</Text>
                <Text style={[sharedStyles.label, styles.label]}>Answer:</Text>
                <Text style={styles.bodyCopy}>{item.answer}</Text>
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
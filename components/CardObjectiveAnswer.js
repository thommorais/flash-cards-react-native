import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity} from 'react-native'
import { pink, white, green} from '../utils'
import {sharedStyles, buttonBgColor} from '../style'

export default function CardObjectiveAnswer(props){

    const {answer, callback} = props

    return (
        <View style={[styles.card, sharedStyles.padding]}>
            <View>
              <Text style={styles.answerLabel}>
                Answer:
              </Text>
              <Text style={styles.bodyCopy}>
                {answer}
              </Text>
            </View>
            <View style={{marginTop: 90}}>
            <Text style={styles.answerLabel}>
              And yout get it?
            </Text>
            <View style={{flexDirection: 'row', marginTop: 20}}>
              <TouchableOpacity onPress={() => callback(true)} style={[sharedStyles.callToAction, {backgroundColor: green }]}>
                <Text style={[sharedStyles.callToActionText, {fontSize: 24 }]}>
                  👍 Right
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => callback(false)} style={[sharedStyles.callToAction, {marginLeft: 15}]}>
                <Text style={[sharedStyles.callToActionText, {color: buttonBgColor.text['pink'], fontSize: 24}]}>
                  👎 Wrong
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
    );
}

const styles = StyleSheet.create({

  card: {
    position: "relative",
    top: 0,
    left: 0,
    borderRadius: 12,
    backgroundColor: white,
    minHeight: 150,
  },

  answerLabel: {
    color: pink,
    fontSize: 18,
    fontWeight: 'bold'
  },

  bodyCopy: {
    fontSize: 32
  },

});


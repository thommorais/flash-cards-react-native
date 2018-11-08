import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { pink, white, green} from '../utils'
import {sharedStyles} from '../style'

export default function CardCommemoration(){
    return (
        <View style={[styles.card, sharedStyles.padding, styles.congrats, {height: 320}]}>
            <Image source={require('../assets/comemoration.png')} />
        </View>
    );
}


const styles = StyleSheet.create({

  congrats : {
    backgroundColor: green,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  card: {
    position: "relative",
    top: 0,
    left: 0,
    borderRadius: 12,
    backgroundColor: white,
    minHeight: 150,
  },

});


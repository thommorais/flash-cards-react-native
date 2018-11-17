import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { white, purple, yellow, pink} from '../style'

export default function ProgressBar(props){

  const {theme, data} = props
  const textBarColor = theme === 'purple' ? pink : yellow
  const {numerator, denominator} = data

  const bar = ( numerator / denominator) * 100

  return (
    <View style={[styles.bar, {justifyContent: 'center'}]}>

      { bar <= 15 && <Text style={styles.center}>{parseInt(bar)}%</Text>}

      { bar > 15 && <View style={[styles.value, styles[theme], {width: `${bar}%`}]}>
            <Text style={[styles.textStyles, {color: textBarColor}]}>
                {parseInt(bar)}%
            </Text>
        </View>}

    </View>
  );

}

const styles = StyleSheet.create({

  bar: {
    flex: 1,
    borderRadius: 20,
    padding: 2,
    backgroundColor: white,
  },

  value: {
    borderRadius: 20,
    paddingTop: 2,
    paddingBottom: 2,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  pink : {
    backgroundColor: purple
  },

  yellow : {
    backgroundColor: pink
  },

  purple : {
    backgroundColor: yellow
  },

  center: {
    color: purple,
    alignSelf: 'center',
    fontWeight: 'bold'
  },

  textStyles: {

    fontWeight: 'bold'
  }

});

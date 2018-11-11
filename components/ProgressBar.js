import React, {PureComponent} from 'react';
import { Text, StyleSheet, View, Dimensions } from 'react-native'
import { white, purple, yellow, pink} from '../utils'

export default function ProgressBar(props){

  const {theme, data} = props
  const textBarColor = theme === 'purple' ? pink : yellow
  const {numerator, denominator} = data
  // x = 1143 ÷ 2540 = 0,45
  const bar = ( numerator / denominator) * 100

  return (
    <View style={[styles.bar,  {justifyContent: 'center'}]}>

      { bar <= 15 && <Text style={{color: purple, alignSelf: 'center', fontWeight: 'bold'}}>
            {parseInt(bar)}%
        </Text>}

      { bar > 15 && <View style={[styles.value, styles[theme], {width: `${bar}%`}]}>
            <Text style={{color: textBarColor, fontWeight: 'bold'}}>
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
  }

});

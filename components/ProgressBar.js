import React from 'react';
import { Text, StyleSheet, View, Dimensions } from 'react-native'
import { white, purple, yellow, pink} from '../utils'

export default class ProgressBar extends React.PureComponent {
  render() {

    const {theme, size} = this.props
    const textBarColor = theme === 'purple' ? pink : yellow

    return (
      <View style={[styles.bar]}>
        <View style={[styles.value, styles[theme], {width: '96%'}]}>
            <Text style={{color: textBarColor, fontWeight: 'bold'}}>
                65%
            </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  bar: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: white,
  },

  value: {
    borderRadius: 20,
    paddingTop: 2,
    paddingBottom: 2,
    paddingRight: 5,
    paddingLeft: 5,
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

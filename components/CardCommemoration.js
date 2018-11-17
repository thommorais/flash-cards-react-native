import React, { PureComponent } from 'react'
import { StyleSheet, Animated, Image } from 'react-native'
import { pink, green } from '../style'

export default class CardCommemoration extends PureComponent {

  state = {
    scale: new Animated.Value(1),
    radius: new Animated.Value(180),
    rotate: new Animated.Value(180),
  }

  componentDidMount(){
    const {scale, radius} = this.state

    Animated.parallel([

      Animated.sequence([
        Animated.timing(scale, {duration: 240, toValue: 1.05}),
        Animated.timing(scale, {delay: 300, duration: 240, toValue: 0}),
      ]),

      Animated.sequence([
        Animated.timing(radius, {duration: 240, toValue: 12}),
        Animated.timing(radius, {delay: 300, duration: 230, toValue: 180}),
      ]),

    ]).start()

  }

  render(){
    const {answer} = this.props
    const {scale, radius} = this.state

    return (
        <Animated.View style={[styles.congrats, answer ? styles.right : styles.wrong, {borderRadius: radius, transform: [{scale}] } ]}>

          {answer && (
              <Image
                  style={styles.image}
                  source={require('../assets/positive.png')}
                />
          )}

          {!answer && (
              <Image
                  style={styles.image}
                  source={require('../assets/negative.png')}
                />
          )}

        </Animated.View>
    );
  }

}


const styles = StyleSheet.create({

  congrats : {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: pink,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },

  image: {
    width: 180,
    height: 220
  },

  wrong: {
    backgroundColor: pink
  },

  right: {
    backgroundColor: green
  }

});


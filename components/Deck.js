import React, {PureComponent} from 'react';
import { TouchableOpacity, Text, StyleSheet, ScrollView, View, Image } from 'react-native'
import {eletricBlue, pink, white, green} from '../utils'
import {sharedStyles, buttonBgColor} from '../style'
import ProgressBar from './ProgressBar'
import { FontAwesome  } from '@expo/vector-icons'

export default class Deck extends PureComponent {

  render() {

    const { navigation } = this.props
    const { params } = navigation.state

    const theme = 'pink'

    return (
      <View style={{backgroundColor:eletricBlue, flex: 1 }}>
        <View style={[styles.header, sharedStyles.padding]}>
          <Text style={styles.title}>
              Harry Potter  { params.id }
          </Text>
          <View style={styles.progressBar}>
            <ProgressBar theme={theme} size="half" />
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.container}>

          <View style={[styles.cardWrapper]}>

            <View style={[styles.card, sharedStyles.padding, styles.congrats, {height: 320}]}>
              <Image
                source={require('../assets/comemoration.png')}
              />
            </View>

          </View>

          <View style={[styles.cardWrapper]}>

            <View style={[styles.card, sharedStyles.padding]}>
              <Text style={styles.bodyCopy}>
                In Harry Potter and the Goblet of Fire, Harry Potter finally kisses Hermione Granger after the Tri-Wizard Tournament.
              </Text>

              <View style={{flexDirection: 'row', marginTop: 40}}>
               <TouchableOpacity style={[sharedStyles.callToAction, {backgroundColor: buttonBgColor[theme]}]}>
                  <Text style={[sharedStyles.callToActionText, {color: buttonBgColor.text[theme], fontSize: 24, marginRight: 30 }]}>
                     Check
                  </Text>
                  <FontAwesome name='caret-right' size={30} color={theme === 'purple' ?  pink : white} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={[sharedStyles.firstShadow, sharedStyles.shadow, styles.shadow]} />
            <View style={[sharedStyles.lastShadow, sharedStyles.shadow, styles.shadow]} />
          </View>

          <View style={[styles.cardWrapper]}>

            <View style={[styles.card, sharedStyles.padding]}>
              <Text style={styles.bodyCopy}>
                In Harry Potter and the Goblet of Fire, Harry Potter finally kisses Hermione Granger after the Tri-Wizard Tournament.
              </Text>
              <View style={{flexDirection: 'row', marginTop: 30, justifyContent: 'space-around'}}>
                <TouchableOpacity style={[sharedStyles.callToAction, {backgroundColor: green }]}>
                  <Text style={[sharedStyles.callToActionText, {fontSize: 24 }]}>
                    👍 True
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={[sharedStyles.callToAction]}>
                  <Text style={[sharedStyles.callToActionText, {color: buttonBgColor.text[theme], fontSize: 24}]}>
                    👎 False
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>

          <View style={[styles.cardWrapper]}>
            <View style={[styles.card, sharedStyles.padding]}>

                <View>
                  <Text style={styles.answerLabel}>
                    Answer:
                  </Text>
                  <Text style={styles.bodyCopy}>
                    A Lion
                  </Text>
                </View>

              <View style={{marginTop: 90}}>
                <Text style={styles.answerLabel}>
                  And yout get it?
                </Text>

                <View style={{flexDirection: 'row', marginTop: 20}}>
                  <TouchableOpacity style={[sharedStyles.callToAction, {backgroundColor: green }]}>
                    <Text style={[sharedStyles.callToActionText, {fontSize: 24 }]}>
                      👍 Right
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={[sharedStyles.callToAction, {marginLeft: 15}]}>
                    <Text style={[sharedStyles.callToActionText, {color: buttonBgColor.text[theme], fontSize: 24}]}>
                      👎 Wrong
                    </Text>
                  </TouchableOpacity>

                </View>

              </View>

            </View>
          </View>

          </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    position: "relative",
    backgroundColor: eletricBlue,
    paddingTop: 15,
    paddingBottom: 15
  },

  congrats : {
    backgroundColor: green,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  answerLabel: {
    color: pink,
    fontSize: 18,
    fontWeight: 'bold'
  },

  progressBar: {
    width: '35%',
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: white
  },

  cardWrapper: {
    position: "relative",
    marginTop: 40,
    marginLeft: 20,
    marginRight: 20,
  },

  card: {
    position: "relative",
    zIndex:3,
    borderRadius: 12,
    backgroundColor: white,
    minHeight: 150
  },

  header: {
    position: 'relative',
    zIndex: 3,
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: 'space-between',
    backgroundColor: pink,
    flexDirection: 'row',
    alignItems: 'center',
  },

  body: {
    backgroundColor: white,
    borderBottomLeftRadius:12,
    borderBottomRightRadius:12,
  },

  bodyCopy: {
    fontSize: 32
  },

  shadow: {
    backgroundColor: white
  },

  wrapper: {
      position: 'relative',
      marginLeft: 20,
      marginRight: 20,
      marginTop: 10,
      marginBottom: 20,
  },

});

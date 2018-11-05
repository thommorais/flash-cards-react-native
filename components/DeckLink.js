import React, {PureComponent} from 'react';
import { connect } from 'react-redux'
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'
import ProgressBar from './ProgressBar'
import { pink, white, purple, yellow, green,  eletricBlue} from '../utils'
import {sharedStyles, buttonBgColor} from '../style'
import { FontAwesome  } from '@expo/vector-icons'

export default class DeckLink extends PureComponent {

  navigate = () => {
    const id = parseInt((Math.random() * 100) + 1)
    this.props.navigation.navigate('Quiz', {id})
  }

  render() {

    const { theme } = this.props

    const TextColor = theme === 'yellow' ? eletricBlue : white

    return (
      <View style={[styles.wrapper, {position: 'relative'}]}>

        <View style={[styles.deckLink, sharedStyles[theme]]}>
            <View style={sharedStyles.padding}>
                <ProgressBar theme={theme} size="full" />
            </View>

            <View style={sharedStyles.padding}>
                <Text style={{fontSize: 16,  fontWeight: 'bold',  color:TextColor}}>
                    Subject:
                </Text>

                <Text style={{fontSize: 32, fontWeight: 'bold', color:TextColor}}>
                    Harry Potter
                </Text>
            </View>

            <View style={[sharedStyles.padding, {flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}]}>

                <TouchableOpacity onPress={this.navigate.bind(this)}  style={[sharedStyles.callToAction, {backgroundColor: buttonBgColor[theme]}]}>
                    <Text style={[sharedStyles.callToActionText, {color: buttonBgColor.text[theme], marginRight: 30 }]}>
                        Start Quiz
                    </Text>
                    <FontAwesome name='caret-right' size={30} color={theme === 'purple' ? pink : white} />
                </TouchableOpacity>

                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={[sharedStyles.buttonTool, {borderColor: buttonBgColor[theme]}]}>
                        <FontAwesome name='trash' size={20} color={buttonBgColor[theme]} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[sharedStyles.buttonTool, {borderColor: buttonBgColor[theme], marginLeft: 16}]}>
                        <FontAwesome name='pencil' size={20} color={buttonBgColor[theme]} />
                    </TouchableOpacity>
                </View>

            </View>
        </View>

        <View style={[sharedStyles.firstShadow, sharedStyles.shadow, sharedStyles[theme]]} />
        <View style={[sharedStyles.lastShadow, sharedStyles.shadow, sharedStyles[theme]]} />

      </View>
    );
  }
}

const styles = StyleSheet.create({

    subject: {
        color: white,
    },

    wrapper: {
        position: 'relative',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        marginBottom: 20,
    },

    deckLink: {
        position: "relative",
        zIndex: 4,
        borderRadius: 12,
    },

});

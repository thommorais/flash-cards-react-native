import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ScrollView, View, TextInput, Dimensions} from 'react-native'
import {eletricBlue, pink, white, purple, yellow, green} from '../utils'
import {sharedStyles, buttonBgColor} from '../style'
import CarouselOfCards from './CarouselOfCards'

export default class CreateDeck extends React.PureComponent {

 state ={
     decksName: '',
     newCard: false,
     chooseCard: false
 }

 chooseCard = () => {
    this.setState( (prevState) => ({chooseCard: !prevState.chooseCard}))
 }

  render() {

    const {chooseCard } = this.state
    const {navigation} = this.props

    return (
      <View style={{flex: 1, backgroundColor: eletricBlue}}>
        <ScrollView contentContainerStyle={styles.container}>
            <View style={sharedStyles.padding}>
                <Text style={[sharedStyles.label, styles.label]}>
                    Deck’s name:
                </Text>
                <TextInput
                    style={styles.inputText}
                    placeholder="Insert a good name here"
                    placeholderTextColor={'#384B62'}
                    onChangeText={(decksName) => this.setState({decksName})}
                    value={this.state.decksName}
                />
            </View>

            <View style={[sharedStyles.padding]}>

                <Text style={[sharedStyles.label, styles.label]}>
                    Cards:
                </Text>

                { !chooseCard && <View style={{flexDirection: 'row', marginTop: 20}}>

                        <TouchableOpacity onPress={this.chooseCard} style={[sharedStyles.callToAction, {backgroundColor: purple}]}>
                            <Text style={[sharedStyles.callToActionText, {fontSize: 16 }]}>
                                Add existing card
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity  onPress={() => navigation.navigate('CreateCard')} style={[sharedStyles.callToAction, {marginLeft: 15, backgroundColor: purple}]}>
                            <Text style={[sharedStyles.callToActionText, {fontSize: 16}]}>
                                Create Card
                            </Text>
                        </TouchableOpacity>

                    </View>
                }
            </View>

            { !!chooseCard && <View style={{ minHeight: 200, marginTop: 20}}>
                <CarouselOfCards />
            </View>  }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    position: "relative",
    paddingTop: 15,
    paddingBottom: 15,
  },

  label: {
      color: yellow
  },

  inputText: {
      fontWeight: 'bold',
      fontSize: 32,
      paddingTop: 5,
      paddingBottom: 5,
      color: white,
  }


});

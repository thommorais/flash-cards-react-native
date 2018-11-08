import React, {PureComponent} from 'react';
import { TouchableOpacity, Text, StyleSheet, ScrollView, View, TextInput } from 'react-native'
import {eletricBlue, pink, white, yellow } from '../utils'
import CheckBox from 'react-native-checkbox'
import { sharedStyles } from '../style'
import { FontAwesome  } from '@expo/vector-icons'
import {connect} from 'react-redux'
import {deleteCard} from '../actions'

class CreateCard extends PureComponent {

 state = {
     question: '',
     answer: '',
     typeOfQuestion: 'objective',
     booleanAnswer: false,
     trueOrFalse: false,
     objective: true
 }

 setTypeOfQuestion = type => {
    this.setState( () => ({ typeOfQuestion : type}) )
 }

  render() {

    const {typeOfQuestion, answer, booleanAnswer} = this.state
    const {navigation} = this.props

    return (
      <View style={{flex: 1, backgroundColor: eletricBlue}}>

        <ScrollView contentContainerStyle={styles.container}>
            <View style={sharedStyles.padding}>
                <Text style={[sharedStyles.label, styles.label]}>
                    Type of the question:
                </Text>
                <View style={{marginTop: 20}}>
                    <CheckBox
                        label='true or false'
                        checked={typeOfQuestion === 'boolean'}
                        checkedImage={require('../assets/checked.png')}
                        checkboxStyle={[styles.checkBox]}
                        labelStyle={[sharedStyles.label, {color: white, fontSize:20}]}
                        onChange={ () => this.setTypeOfQuestion('boolean') }
                    />
                    <CheckBox
                        label='Objective'
                        checked={typeOfQuestion === 'objective'}
                        checkedImage={require('../assets/checked.png')}
                        checkboxStyle={[styles.checkBox, {marginTop: 10}]}
                        labelStyle={[sharedStyles.label, {color: white,fontSize:20, marginTop: 10}]}
                        onChange={ () => this.setTypeOfQuestion('objective') }
                    />
                </View>
            </View>

            <View style={sharedStyles.padding}>
                <Text style={[sharedStyles.label, styles.label]}>
                    Question:
                </Text>
                <TextInput
                    style={styles.inputText}
                    placeholder="Insert a good name here"
                    placeholderTextColor={'#384B62'}
                    onChangeText={(question) => this.setState({question})}
                    value={this.state.question}
                />
            </View>

            <View style={sharedStyles.padding}>
                <Text style={[sharedStyles.label, styles.label]}>
                    Answer:
                </Text>
                { typeOfQuestion === 'objective' &&  <TextInput
                    style={styles.inputText}
                    placeholder="Insert a good name here"
                    placeholderTextColor={'#384B62'}
                    onChangeText={(answer) => this.setState({answer})}
                    value={this.state.answer}
                />}
                { typeOfQuestion === 'boolean' && <View style={{marginTop: 20, flexDirection : 'row'}}>
                    <CheckBox
                        label='true'
                        checked={booleanAnswer}
                        checkedImage={require('../assets/checked.png')}
                        checkboxStyle={[styles.checkBox]}
                        labelStyle={[sharedStyles.label, {color: white, fontSize:20}]}
                        onChange={ () => this.setState({booleanAnswer: true}) }
                    />
                    <CheckBox
                        label='false'
                        checked={!booleanAnswer}
                        checkedImage={require('../assets/checked.png')}
                        checkboxStyle={[styles.checkBox, { marginLeft: 20}]}
                        labelStyle={[sharedStyles.label, {color: white,fontSize:20}]}
                        onChange={ () => this.setState({booleanAnswer: false}) }
                    />
                </View>}

            </View>

            <View style={[sharedStyles.padding, {flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}]}>
                <TouchableOpacity onPress={() => navigation.navigate('Quiz')} style={[sharedStyles.callToAction, {backgroundColor: pink}]}>
                    <Text style={[sharedStyles.callToActionText, {color: white, marginRight: 30 }]}>
                        Submit
                    </Text>
                    <FontAwesome name='caret-right' size={30} color={white} />
                </TouchableOpacity>
            </View>

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

  checkBox: {
      height: 40,
      width: 40,
      borderRadius: 20,
      shadowColor: white,
      borderWidth: 2,
      borderColor: white,
      resizeMode: 'contain'
  },

  inputText: {
      fontWeight: 'bold',
      fontSize: 32,
      paddingTop: 5,
      paddingBottom: 5,
      color: white,
  }


});


const mapDispatchToProps = dispatch => {
  return {
    deleteCardById: id => dispatch(deleteCard(id))
  }
}

function mapStateToProps({cards}) {
  return { cards }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateCard)
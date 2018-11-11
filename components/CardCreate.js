import React, {PureComponent} from 'react';
import { TouchableOpacity, Text, StyleSheet, ScrollView, View, TextInput, KeyboardAvoidingView } from 'react-native'
import {eletricBlue, pink, white, yellow } from '../utils'
import CheckBox from 'react-native-checkbox'
import { sharedStyles } from '../style'
import { FontAwesome  } from '@expo/vector-icons'
import {connect} from 'react-redux'
import {deleteCard, editCard, createCard} from '../actions'

class CardCreate extends PureComponent {

 state = {
     id: 0,
     question: '',
     answer: '',
     type: 'objective',
     booleanAnswer: null,
     objective: '',
     points: ''
 }

 settype = type => {
    this.setState( () => ({type}) )
 }

 saveCard = () =>{

    const {type, booleanAnswer} =  this.state
    const answer = (type === 'boolean') ? booleanAnswer : this.state.answer

    if(this.props.navigation.state.params.mode === 'edit'){
        this.props.editCard({...this.state, answer, points: parseInt(this.state.points)})
    } else {
       this.props.createCard({...this.state, answer, points: parseInt(this.state.points)})
    }

    if(this.props.navigation.state.params.callback){
        const {id, points} = this.state
        this.props.navigation.state.params.callback(id, parseInt(points))
    }

    this.props.navigation.goBack()

 }

 editMode(card){
     this.setState( () => ({...card, points: card.points}))
 }

 componentDidMount(){

     if(this.props.navigation.state.params.mode === 'edit'){
         this.editMode(this.props.navigation.state.params.card)
     }else{
         const id = Date.now()
        this.setState( () => ({id}))
     }

 }

  render() {

    const {type, answer, booleanAnswer, question, points} = this.state
    const hasAnswer = type === 'boolean' ? true : answer

    return (
      <View style={{flex: 1, backgroundColor: eletricBlue}}>

        <ScrollView>
            <KeyboardAvoidingView style={[styles.container, {paddingBottom: 80}]} behavior="position" enabled>

                <View style={sharedStyles.padding}>
                    <Text style={[sharedStyles.label, styles.label]}>
                        Type of the question:
                    </Text>
                    <View style={{marginTop: 20}}>
                        <CheckBox
                            label='true or false'
                            checked={type === 'boolean'}
                            checkedImage={require('../assets/checked.png')}
                            checkboxStyle={[styles.checkBox]}
                            labelStyle={[sharedStyles.label, {color: white, fontSize:20}]}
                            onChange={ () => this.settype('boolean') }
                        />
                        <CheckBox
                            label='Objective'
                            checked={type === 'objective'}
                            checkedImage={require('../assets/checked.png')}
                            checkboxStyle={[styles.checkBox, {marginTop: 10}]}
                            labelStyle={[sharedStyles.label, {color: white,fontSize:20, marginTop: 10}]}
                            onChange={ () => this.settype('objective') }
                        />
                    </View>
                </View>

                <View style={sharedStyles.padding}>
                    <Text style={[sharedStyles.label, styles.label]}>
                        Question:
                    </Text>
                    <TextInput
                        multiline={true}
                        style={styles.inputText}
                        placeholder="What is the name of doctor who?"
                        placeholderTextColor={'#384B62'}
                        onChangeText={(question) => this.setState({question})}
                        value={question}
                    />
                </View>

                <View style={sharedStyles.padding}>
                    <Text style={[sharedStyles.label, styles.label]}>
                        Answer:
                    </Text>
                    { type  === 'objective' &&  <TextInput
                        style={styles.inputText}
                        multiline={true}
                        placeholder="Mildred?"
                        placeholderTextColor={'#384B62'}
                        onChangeText={(answer) => this.setState({answer})}
                        value={(answer === true || answer === false) ? '' : answer}
                    />}
                    { type  === 'boolean' && <View style={{marginTop: 20, flexDirection : 'row'}}>
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

                <View style={sharedStyles.padding}>
                    <Text style={[sharedStyles.label, styles.label]}>
                        Points:
                    </Text>
                    <TextInput
                        style={styles.inputText}
                        placeholder="100"
                        placeholderTextColor={'#384B62'}
                        onChangeText={(points) => this.setState({points: points})}
                        value={`${points}`}
                        keyboardType='numeric'
                    />
                </View>

                {question && hasAnswer && points && (
                    <View style={[sharedStyles.padding, {flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}]}>
                        <TouchableOpacity onPress={this.saveCard} style={[sharedStyles.callToAction, {backgroundColor: pink}]}>
                            <Text style={[sharedStyles.callToActionText, {color: white, marginRight: 30 }]}>
                                Submit
                            </Text>
                            <FontAwesome name='caret-right' size={30} color={white} />
                        </TouchableOpacity>
                    </View>
                )}

            </KeyboardAvoidingView>

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
    deleteCardById: id => dispatch(deleteCard(id)),
    editCard: card => dispatch(editCard(card)),
    createCard: card => dispatch(createCard(card))
  }
}

function mapStateToProps({cards}) {
  return { cards }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardCreate)
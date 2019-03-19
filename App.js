/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, TextInput, Text, View, TouchableOpacity } from 'react-native';

export default class App extends Component {

  constructor() {
    super()
    this.state = {
      resultText: "",
      calculationText: "",
    }
    this.operators = ['DEL', '+', '-', '*', '/']
  }
  calculateResult() {
    const text = this.state.resultText
    this.setState({
      calculationText: eval(text)
    })
  }
  validate() {
    const text = String(this.state.resultText)

    switch (text.slice(-1)) {
      case '+':
      case '-':
      case '*':
      case '/':
        return false
        break;

    }
    return true
  }
  operate(operation) {
    let text = this.state.resultText
    switch (operation) {
      case 'DEL':
        text = text.slice(0, -1)
        this.setState({
          resultText: text
        })
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        const lastChar = this.state.resultText != '' ? '' : this.state.resultText.split('').pop()
        if (text == '' || this.operators.includes(lastChar)) {
         console.log('return');
          return
        }
        // else if (this.state.calculationText != '' && this.state.resultText == '') {
        //   const calculText=this.state.calculationText
        //   this.setState({
        //     resultText: calculText + operation
        //   })
        // }
        else {
          this.setState({
            resultText: text + operation
          })
        }
        break
      default:
        break;
    }
  }
  buttonPressed(text) {
    
    if (text == '=') {

      return this.validate() && this.calculateResult()
    }
    else {
      // if (this._clearResult == true && this._historyResult==true) {
      //   this.setState({
      //     resultText: text,
      //     historyText: this.state.resultText
      //   })
      //   this._clearResult = false
      // }
      // else {
        this.setState({
          resultText: this.state.resultText + text
        })
        // this._clearResult = false

      // }

    }
  }
  generateButtons(Nrows, Ncols) {
    let rows = []
    let nums = [[1, 2, 3], [4, 5, 6], [7, 8, 9], ['.', 0, '=']]
    for (let i = 0; i < Nrows; i++) {
      let elem = []

      for (let j = 0; j < Ncols; j++) {
        elem.push(
          <TouchableOpacity key={nums[i][j]} style={styles.btn} onPress={() => this.buttonPressed(nums[i][j])}>
            <Text style={styles.btnText}>{nums[i][j]}</Text>
          </TouchableOpacity>
        )
      }
      rows.push(<View key={i} style={styles.row}>{elem}</View>)
    }
    return rows;
  }
  generateOperationButtons(Nrows) {
    let rows = []

    for (let i = 0; i < this.operators.length; i++) {
      rows.push(
        <TouchableOpacity key={this.operators[i]} style={styles.btn} onPress={() => this.operate(this.operators[i])}>
          <Text style={[styles.btnText, styles.white]}>{this.operators[i]}</Text>
        </TouchableOpacity>
      )
    }
    return rows;
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.resultText}>{this.state.resultText}</Text>
        </View>
        <View style={styles.calculation}>
          <Text style={styles.calculationText}>{this.state.calculationText}</Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>
            {this.generateButtons(4, 3)}
          </View>
          <View style={styles.operations}>
            {this.generateOperationButtons()}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'stretch',

  },
  result: {
    flex: 2,
    // alignItems: 'center',
    backgroundColor: 'white',
    color: 'black',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  resultText: {
    fontSize: 30,
    color: 'black'
  },
  calculation: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  calculationText: {
    fontSize: 24,
    color: 'black',
  },
  operationBtnText: {
    fontSize: 24,
    color: 'white',
  },
  buttons: {
    flex: 7,
    // backgroundColor: 'red',
    flexDirection: 'row'
  },
  btn: {
    color: 'white',
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  white: {
    color: 'white'
  },
  btnText: {
    fontSize: 30,
    color:'white'
  },
  numbers: {
    flex: 4,
    backgroundColor: '#434343',
    color:'white'
  },
  operations: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-around',
    backgroundColor: '#636363'
  }

});

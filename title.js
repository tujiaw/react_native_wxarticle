import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Navigator,
} from 'react-native';
import TypeList from './typeList'

export default class Title extends Component {
  onReturn() {
    const {navigator} = this.props;
    if(navigator) {
      navigator.pop();
    }
  }

  onTypeList() {
    const {navigator} = this.props;
    if (navigator) {
      navigator.push({name: 'type list', component: TypeList})
    }
  }

  render() {
    return (
      <View style={styles.titleView}>
        <View style={styles.titleItems}>
          <TouchableOpacity onPress={this.onReturn.bind(this)}>
            <Text>{this.props.leftText}</Text>
          </TouchableOpacity>
          <Text>{this.props.centerText}</Text>
          <TouchableOpacity onPress={this.onTypeList.bind(this)}>
            <Text>{this.props.rightText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleView: {
    height: 20,
    marginLeft: 20,
  },
  titleItems: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 20,
  },
});

import React, { Component } from 'react';
import {
  AppRegistry,
  ListView,
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Navigator,
  TouchableOpacity,
} from 'react-native';
import Title from './title'
import ArticleList from './articleList'

export default class TypeList extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
    };

    fetch('https://route.showapi.com/582-1?showapi_appid=17262&showapi_sign=21b693f98bd64e71a9bdbb5f7c76659c&showapi_timestamp=20161026214440a')
    .then((response) => response.json())
    .then((json) => {
      let typeList = json.showapi_res_body.typeList;
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(typeList),
      });
    });
  }

  onMainPage(rowData) {
    const {navigator} = this.props;
    if (navigator) {
      const routes = navigator.getCurrentRoutes();
      for (let route of routes) {
        if (route.name === 'articleList') {
          route.params.typeName = rowData.name;
          route.params.typeId = rowData.id;
          navigator.resetTo(route);
          break;
        }
      }
    }

  }

  render() {
    return (
      <ListView style={{flex: 1, marginTop: 60}} dataSource={this.state.dataSource} renderRow={(rowData) => {
        return (
          <TouchableOpacity onPress={this.onMainPage.bind(this, rowData)}>
            <Text style={{height: 30, alignSelf: 'center'}}>{rowData.name}</Text>
          </TouchableOpacity>
        );
      }}/>
    )
  }
}

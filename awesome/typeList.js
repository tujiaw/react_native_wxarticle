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
import EventEmitter from "react-native-eventemitter";
import Title from './title'
import ArticleList from './articleList'

const g_typeList = [
      {
        "id":"0",
        "name":"热点"
      },{
        "id":"1",
        "name":"推荐"
      },{
        "id":"2",
        "name":"段子手"
      },{
      "id":"3",
      "name":"养生堂"
      },{
        "id":"4",
        "name":"私房话"
      },{
        "id":"5",
        "name":"八卦精"
      },{
        "id":"6",
        "name":"爱生活"
      },{
        "id":"7",
        "name":"财经迷"
      },{
        "id":"8",
        "name":"汽车迷"
      },{
        "id":"9",
        "name":"科技咖"
      },{
        "id":"10",
        "name":"潮人帮"
      },{
        "id":"11",
        "name":"辣妈帮"
      },{
        "id":"12",
        "name":"点赞党"
      },{
        "id":"13",
        "name":"旅行家"
      },{
        "id":"14",
        "name":"职场人"
      },{
        "id":"15",
        "name":"美食家"
      },{
        "id":"16",
        "name":"古今通"
      },{
        "id":"17",
        "name":"学霸族"
      },{
        "id":"18",
        "name":"星座控"
      },{
        "id":"19",
        "name":"体育迷"
      }
    ];

export default class TypeList extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(g_typeList),
    };
  }

  componentWillMount() {
  }

  onMainPage(rowData) {
    const {navigator} = this.props;
    if (navigator) {
      const routes = navigator.getCurrentRoutes();
      for (let route of routes) {
        if (route.name === 'articleList') {
          route.params.typeName = rowData.name;
          route.params.typeId = rowData.id;
          route.headerItems = {title: "message"};
          EventEmitter.emit('updateTypeId', rowData.id);
          navigator.resetTo(route);
          break;
        }
      }
    }

  }

  render() {
    return (
      <ListView
        style={{flex: 1, marginTop: 60}}
        dataSource={this.state.dataSource}
        enableEmptySections={true}
        renderRow={(rowData) => {
          return (
            <TouchableOpacity onPress={this.onMainPage.bind(this, rowData)}>
              <Text style={{fontSize: 18, height: 30, alignSelf: 'center'}}>{rowData.name}</Text>
              </TouchableOpacity>
            );
          }}
        />
    )
  }
}

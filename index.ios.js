import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  Text,
  TouchableHighlight,
} from 'react-native';
import ArticleList from './articleList';
import TypeList from './typeList'

class App extends Component {
  onTypeList(route, navigator) {
    navigator.push({name: 'typeList', component: TypeList, params: route.params})
  }

  render() {
    const typeName = "推荐";
    return (
      <Navigator
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={{
              LeftButton: (route, navigator, index, navState) => {
                if (index > 0) {
                  return (
                    <TouchableHighlight onPress={() => navigator.pop()}>
                      <Text>返回</Text>
                    </TouchableHighlight>
                  );
                }
                return null;
              },
              RightButton: (route, navigator, index, navState) => {
                return (
                  <TouchableHighlight onPress={() => this.onTypeList(route, navigator)}>
                    <Text>类别</Text>
                  </TouchableHighlight>
                )
              },
              Title: (route, navigator, index, navState) => {
                return (<Text>{route.params.typeName}</Text>);
              },
            }}
            />
          }

          initialRoute={{name: "articleList", component: ArticleList, params: {typeName: typeName}}}
          renderScene={(route, navigator) => {
            let Component = route.component;
            return <Component {...route.params} navigator={navigator} title={route.name}/>
          }}
        />
      );
    }
}

AppRegistry.registerComponent('awesome', () => App);

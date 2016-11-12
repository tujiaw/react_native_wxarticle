import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import ArticleList from './articleList';
import TypeList from './typeList'


class App extends Component {
  onTypeList(route, navigator) {
    const pageName = "typeList";
    const routes = navigator.getCurrentRoutes();
    for (let route of routes) {
      if (route.name == pageName) {
        navigator.jumpTo(route);
        return;
      }
    }
    navigator.push({name: pageName, component: TypeList, params: route.params})
  }

  initLeftButton(route, navigator, index, navState) {
    if (index > 0) {
      return (
        <TouchableHighlight underlayColor='#E1F6FF' onPress={() => navigator.pop()}>
          <Text>    返回    </Text>
        </TouchableHighlight>
      );
    }
    return null;
  }

  initRightButton(route, navigator, index, navState) {
    return (
      <TouchableHighlight underlayColor='#E1F6FF' onPress={() => this.onTypeList(route, navigator)}>
        <Text>    类别    </Text>
      </TouchableHighlight>
    )
  }

  initTitle(route, navigator, index, navState) {
    return (<Text>{route.params.typeName}</Text>);
  }

  render() {
    const typeName = "热点";
    return (
        <Navigator
          navigationBar={
            <Navigator.NavigationBar
              routeMapper={{
                LeftButton: this.initLeftButton.bind(this),
                RightButton: this.initRightButton.bind(this),
                Title: this.initTitle.bind(this),
              }}
              style={{margin:10}}
            />
          }

          initialRoute={{name: "articleList", component: ArticleList, params: {typeName: typeName}}}
          configureScene = {(route) => { return Navigator.SceneConfigs.FloatFromRight; }}
          renderScene={(route, navigator) => {
            let Component = route.component;
            return <Component {...route.params} navigator={navigator} title={route.name}/>
          }}
          />
      );
    }
}

AppRegistry.registerComponent('awesome', () => App);

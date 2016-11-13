import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  Text,
  TouchableHighlight,
  Alert,
} from 'react-native';
import ArticleList from './articleList';
import TypeList from './typeList'

var g_navigator = null;
class App extends Component {
  onTypeList(route, navigator) {
    navigator.push({name: 'typeList', component: TypeList, params: route.params})
  }

  initLeftButton(route, navigator, index, navState) {
    g_navigator = nativator;
    if (index > 0) {
      return (
        <TouchableHighlight onPress={() => navigator.pop()}>
          <Text>返回</Text>
        </TouchableHighlight>
      );
    }
    return null;
  }

  initRightButton(route, navigator, index, navState) {
    return (
      <TouchableHighlight underlayColor='transparent' onPress={() => this.onTypeList(route, navigator)}>
        <Text>类别</Text>
      </TouchableHighlight>
    )
  }

  initTitle(route, navigator, index, navState) {
    return (<Text>{route.params.typeName}</Text>);
  }

  render() {
    const typeName = "推荐";
    return (
      <View />
      <Navigator
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={{
              LeftButton: this.initLeftButton.bind(this),
              RightButton: this.initRightButton.bind(this),
              Title: this.initTitle.bind(this),
            }}
          />
        }

        initialRoute={{name: "articleList", component: ArticleList, params: {typeName: typeName}}}
        renderScene={(route, navigator) => {
          let Component = route.component;
          return <Component {...route.params} navigator={navigator} title={route.name}/>
        }}
        />
        </View>
      );
    }
}

BackAndroid.addEventListener('hardwareBackPress', function() {
  alert('dddd');
  return true;
    //  if (!this.onMainScreen()) {
    //    this.goBack();
    //    return true;
    //  }
    //  return false;
});

AppRegistry.registerComponent('awesome', () => App);

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  Text,
  TouchableHighlight,
  View,
  BackAndroid,
  ToastAndroid,
} from 'react-native';
import ArticleList from './articleList';
import TypeList from './typeList'

class App extends Component {
  constructor(props) {
      super(props);
      this.handleBack = this._handleBack.bind(this);
      this.backPressTime = [];
      this._navigator = null;
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack);
  }

  _handleBack() {
    if (this._navigator && this._navigator.getCurrentRoutes().length > 1) {
      this._navigator.pop();
      return true;
    }
    // 两秒钟之内按两次Back键退出程序
    this.backPressTime.push(new Date());
    const count = this.backPressTime.length;
    if (count >= 2) {
      const ms = this.backPressTime[count - 1] - this.backPressTime[count - 2];
      this.backPressTime = [];
      if (ms <= 2000) {
        return false;
      }
    }
    ToastAndroid.show('再按一次退出程序', ToastAndroid.SHORT);
    return true;
  }

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
        <TouchableHighlight underlayColor='#c2c2c2' onPress={() => navigator.pop()}>
          <Text>    返回    </Text>
        </TouchableHighlight>
      );
    }
    return null;
  }

  initRightButton(route, navigator, index, navState) {
    return (
      <TouchableHighlight underlayColor='#c2c2c2' onPress={() => this.onTypeList(route, navigator)}>
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
          ref={component => this._navigator = component}
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

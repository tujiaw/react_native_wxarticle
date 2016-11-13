import React, { Component } from 'react';
import {
  AppRegistry,
  ListView,
  Text,
  View,
  Image,
  StyleSheet,
  WebView,
  TouchableHighlight,
  Navigator,
  ToastAndroid,
} from 'react-native';
import EventEmitter from "react-native-eventemitter";
import ShowArticle from './showArticle';
import Title from './title';

let g_articleList = [];
class Article extends Component {
  constructor(props) {
    super(props);
  }

  handleClick() {
    if (this.props.navigator) {
      this.props.navigator.push({name: 'showArticle', component: ShowArticle, params: this.props})
    }
  }

  getShowDate(strDate) {
    return strDate.slice(5, 10);
  }

  render() {
    return (
      <TouchableHighlight underlayColor='#c2c2c2' onPress={() => this.handleClick()}>
        <View style={styles.article}>
          <Image style={styles.image} source={{uri: this.props.contentImg}} />
          <View style={styles.right}>
            <View style={styles.rightTop}>
              <Text style={styles.userName}>{this.props.userName}</Text>
              <Text style={styles.date}>{this.getShowDate(this.props.date)}</Text>
            </View>
            <Text style={styles.title}>{this.props.title}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

//////////////////////////////////////////////////////////////////
export default class ArticleList extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.props.typeId = 0;
    this.state = {
      dataSource: ds.cloneWithRows([]),
      typeId: 0,
      allPages: 0,
      currentPage: 0,
    };
  }

  componentWillMount() {
    this.updateArticleList(this.state.typeId, this.state.currentPage);
    EventEmitter.on('updateTypeId', (typeId) => {
      if (this.state.typeId != typeId) {
        this._listView.scrollTo({x: 0, y: 0, animated: false});
        g_articleList = [];
        this.updateArticleList(typeId, 0);
      }
    });
  }

  componentWillUnmount() {
    EventEmitter.removeListener("updateTypeId");
  }

  updateArticleList(typeId, page) {
    let url = 'https://route.showapi.com/582-2?showapi_appid=17262&showapi_sign=21b693f98bd64e71a9bdbb5f7c76659c&showapi_timestamp=20161026214440a';
    if (typeId >= 0) {
        url += ('&typeId=' + typeId);
    }
    if (page >= 0) {
      url += ('&page=' + page);
    }
    console.log(url);
    fetch(url)
    .then((response) => response.json())
    .then((json) => {
      if (json.showapi_res_code !== 0) {
        console.log('response error,url:' + url);
        return;
      }
      let pagebean = json.showapi_res_body.pagebean;
      this.setState({typeId: typeId, allPages: pagebean.allPages, currentPage: pagebean.currentPage});

      let contentList = pagebean.contentlist;
      for (let content of contentList) {
        let article = {
          url: content.url,
          contentImg: content.contentImg,
          date: content.date,
          typeName: content.typeName,
          title: content.title,
          userName: content.userName,
          navigator: this.props.navigator,
        }
        g_articleList.push(article);
      }
      this.setState({dataSource: this.state.dataSource.cloneWithRows(g_articleList)});
    });
  }

  _onEndReached() {
    ToastAndroid.show('加载更多文章', ToastAndroid.SHORT);
    this.updateArticleList(this.state.typeId, this.state.currentPage + 1);
  }

  render() {
    return (
      <ListView
        ref={component => this._listView = component}
        style={{flex: 1, marginTop: 40}}
        dataSource={this.state.dataSource}
        enableEmptySections={true}
        onEndReached={this._onEndReached.bind(this)}
        onEndReachedThreshold={10}
        renderRow={(rowData) => {
          return (<View><Article {...rowData} /></View>)
        }}
      />

    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
  },
  article: {
    flex: 1,
    flexDirection: 'row',
    margin: 6,
    marginRight: 20,
  },
  right: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 10,
    justifyContent: 'center',
  },
  rightTop: {
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
  }
});

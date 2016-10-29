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
} from 'react-native';
import ShowArticle from './showArticle';
import Title from './title';

class Article extends Component {
  constructor(props) {
    super(props);
  }

  handleClick() {
    if (this.props.navigator) {
      this.props.navigator.push({name: 'showArticle', component: ShowArticle, params: this.props})
    }
  }

  render() {
    return (
      <TouchableHighlight onPress={() => this.handleClick()}>
        <View style={styles.article}>
          <Image style={styles.image} source={{uri: this.props.contentImg}} />
          <View style={styles.right}>
            <Text style={styles.typeName}>{this.props.typeName}</Text>
            <Text style={styles.title}>{this.props.title}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

export default class ArticleList extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
      typeId: 0,
    };
    this.updateArticleList(this.state.typeId);
  }

  updateArticleList(typeId) {
    this.state.typeId = typeId;
    let url = 'https://route.showapi.com/582-2?showapi_appid=17262&showapi_sign=21b693f98bd64e71a9bdbb5f7c76659c&showapi_timestamp=20161026214440a';
    if (typeId && typeId >= 0) {
        url += ('&typeId=' + typeId);
    }

    fetch(url)
    .then((response) => response.json())
    .then((json) => {
      let contentList = json.showapi_res_body.pagebean.contentlist;
      let articleList = [];
      for (let content of contentList) {
        let article = {
          url: content.url,
          contentImg: content.contentImg,
          date: content.date,
          typeName: content.typeName,
          title: content.title,
          navigator: this.props.navigator,
        }
        articleList.push(article);
      }
      this.setState({dataSource: this.state.dataSource.cloneWithRows(articleList)});
    });
  }

  render() {
    if (this.state.typeId != this.props.typeId) {
      this.updateArticleList(this.props.typeId);
    }

    return (
      <ListView style={{flex: 1, marginTop: 40}} dataSource={this.state.dataSource} renderRow={(rowData) => {
        return (<View><Article {...rowData} /></View>)
      }}/>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
  },
  typeName: {
    fontSize: 20,
  },
  title: {
    fontSize: 18,
  },
  article: {
    flex: 1,
    flexDirection: 'row',
    margin: 6,
  },
  right: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 10,
    justifyContent: 'center',
  }
});

import React from 'react';
import {
    View,
    Navigator,
    Text,
    WebView,
    StyleSheet
} from 'react-native';
import Title from './title';

export default class ShowArticle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
      return (
        <WebView style={{flex: 1, marginTop: 40}} source={{uri: this.props.url}} />
      );
    }
}

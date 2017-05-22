import React, { Component } from 'react';
import { Text, View, ListView, StyleSheet } from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows('ABCDE'.split('')),
    };
  }

  renderRow(data) {
    return (
      <View style={styles.row}>
        <Text>{data}</Text>
      </View>
    );
  }

  render() {
    return (
      <ListView
        style={styles.list}
        contentContainerStyle={styles.contentContainer}
        dataSource={this.state.dataSource}
        renderRow={(row, sectionID, rowID) =>
          <PlayerCard {...row} id={rowID} />}
      />
    );
  }
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#aaa'
  },
  contentContainer: {
    borderWidth: 1,
    borderColor: 'black',
    margin: 30
  },
  row: {
    height: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class PlayerCard extends React.Component {
  constructor(props) {
    console.log('PlayerCard/constructor');
    super(props);
    this.state = props;
  }

  componentWillReceiveProps(nextProps: Props) {
    console.log('PlayerCard/componentWillReceiveProps');
    if (nextProps !== this.props) {
      //console.log('>> Properties changed, setState');
      this.setState({ ...nextProps });
    }
  }
  render() {
    console.log('PlayerCard/render, state: ' + JSON.stringify(this.state));
    return (
      <View style={styles.row}>
        <Text>{this.state["0"]}</Text>
      </View>
    );
  }
}

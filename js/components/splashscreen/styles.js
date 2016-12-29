
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;

module.exports = StyleSheet.create({
  title: {
    paddingTop: deviceHeight / 5,
    fontSize: 50,
    alignSelf: 'center',
  },
})

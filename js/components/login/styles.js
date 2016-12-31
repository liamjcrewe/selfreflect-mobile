
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const dimensions = Dimensions.get('window')
const deviceHeight = dimensions.height;
const deviceWidth = dimensions.width;

module.exports = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FBFAFA',
  },
  title: {
    paddingTop: deviceHeight / 5,
    fontSize: 50,
    alignSelf: 'center',
  },
  bg: {
    flex: 1,
    marginTop: deviceHeight / 3,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30,
    bottom: 0,
  },
  input: {
    marginBottom: 20,
  },
  btn: {
    marginTop: 20,
    alignSelf: 'center',
    width: deviceWidth / 4,
  },
  error: {
    color: 'red',
    alignSelf: 'center',
  },
  success: {
    color: '#5CB85C',
    alignSelf: 'center',
  }
});

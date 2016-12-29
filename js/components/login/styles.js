
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;

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
  },
  error: {
    color: 'red',
    alignSelf: 'center',
  },
  success: {
    color: 'green',
    alignSelf: 'center',
  }
});

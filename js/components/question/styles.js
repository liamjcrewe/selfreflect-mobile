const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const dimensions = Dimensions.get('window')
const deviceWidth = dimensions.width;
const deviceHeight = dimensions.height;

module.exports = StyleSheet.create({
  grid: {
    marginTop: 30,
    marginBottom: 30,
  },
  questionRow: {
    height: 50,
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#9EA7AF',
  },
  questionText: {
    fontSize: 18,
    width: deviceWidth,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btnContainer: {
    marginTop: deviceHeight / 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    marginLeft: 10,
    marginRight: 10,
    width: deviceWidth / 4,
    alignSelf: 'center',
  },
  disabledBtn: {
    backgroundColor: '#B5B5B5',
  },
  selected: {
    height: deviceHeight / 10,
    borderBottomWidth: 1,
    borderBottomColor: '#9EA7AF',
    backgroundColor: '#5CB85C',
  },
  unselected: {
    height: deviceHeight / 10,
    borderBottomWidth: 1,
    borderBottomColor: '#9EA7AF',
    backgroundColor: '#FFFFFF'
  },
  answerRow: {
    justifyContent: 'center',
  },
  answerText: {
    fontSize: 14,
    width: deviceWidth,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    alignSelf: 'center',
  },
  success: {
    color: '#5CB85C',
    alignSelf: 'center',
  }
})

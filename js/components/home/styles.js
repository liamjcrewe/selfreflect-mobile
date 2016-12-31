
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;

module.exports = StyleSheet.create({
  container: {
    backgroundColor: '#FBFAFA',
  },
  headerRow: {
    alignSelf: 'center',
  },
  headerText: {
    fontSize: 20,
    paddingBottom: 15,
    alignItems: 'center',
    fontWeight: 'bold',
  },
  tableHeaderRow: {
    backgroundColor: '#1B1E24',
    borderBottomWidth: 4,
    borderBottomColor: '#9EA7AF',
  },
  tableHeaderText: {
    fontSize: 18,
    color: '#FAFAFA',
    marginLeft: 5,
  },
  tableHeaderLeft: {
    borderRightColor: '#343A45',
    borderRightWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
  },
  tableHeaderRight: {
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
  },
  row: {
    backgroundColor: '#EBEBEB',
    borderBottomColor: '#C1C3D1',
    borderBottomWidth: 1,
  },
  leftCol: {
    borderRightColor: '#C1C3D1',
    borderRightWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
    justifyContent: 'center',
  },
  rightCol: {
    paddingTop: 5,
    paddingBottom: 5,
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    marginLeft: 5,
  },
  grid: {
    marginTop: 18,
    marginLeft: 10,
    marginRight: 10,
  },
  recordBtn: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: deviceHeight / 1.5,
  },
  error: {
    color: 'red',
    alignSelf: 'center',
  },
});

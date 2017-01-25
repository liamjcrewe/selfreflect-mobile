
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const windowDimensions = Dimensions.get('window')
const deviceHeight = windowDimensions.height;
const deviceWidth = windowDimensions.width;

module.exports = StyleSheet.create({
  container: {
    backgroundColor: '#FBFAFA',
  },
  headerRow: {
    height: 35,
    alignSelf: 'center',
  },
  headerText: {
    fontSize: 20,
    paddingBottom: 15,
    alignItems: 'center',
    fontWeight: 'bold',
  },
  tableHeaderRow: {
    height: 40,
    backgroundColor: '#1B1E24',
    borderBottomWidth: 4,
    borderBottomColor: '#9EA7AF',
  },
  tableHeaderText: {
    fontSize: 16,
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
    height: 40,
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
    fontSize: 14,
    marginLeft: 5,
  },
  grid: {
    marginTop: 18,
    marginLeft: 10,
    marginRight: 10,
  },
  btnsView: {
    // height - recordingsHeader - tableHeader - tablePadding - rows - header
    height: deviceHeight - 35 - 35 - 40 - (5 * 40) - 18 - 40,
  },
  fetchBtn: {
    position: 'absolute',
    bottom: 60,
    width: deviceWidth - 20,
    marginLeft: 10,
    marginRight: 10
  },
  recordBtn: {
    position: 'absolute',
    bottom: 0,
    width: deviceWidth - 20,
    marginLeft: 10,
    marginRight: 10,
  },
  error: {
    color: 'red',
    alignSelf: 'center',
  },
});

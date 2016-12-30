
import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Text, Button, Icon } from 'native-base';
import { Grid, Row, Col } from 'react-native-easy-grid';

import { setIndex } from '../../actions/list';
import myTheme from '../../themes/base-theme';
import styles from './styles';

const {
  reset,
  pushRoute,
} = actions;

class Home extends Component {

  static propTypes = {
    name: React.PropTypes.string,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    setIndex: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    reset: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  pushRoute(route, index) {
    this.props.setIndex(index);
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  render() {
    return (
      <Container theme={myTheme} style={styles.container}>
        <Header>
          <Button transparent onPress={() => this.props.reset(this.props.navigation.key)}>
            <Icon name="ios-power" />
          </Button>

          <Title>{(this.props.name) ? this.props.name : 'Home'}</Title>
        </Header>

        <Content>
        <Grid style={styles.grid}>
          <Row style={styles.headerRow}>
            <Text style={styles.headerText}>Recent recordings:</Text>
          </Row>
          <Row style={styles.tableHeaderRow}>
            <Col style={styles.tableHeaderLeft} size={3}>
              <Text style={styles.tableHeaderText}>Date recorded</Text>
            </Col>
            <Col style={styles.tableHeaderRight} size={1}>
              <Text style={styles.tableHeaderText}>Wellbeing</Text>
            </Col>
          </Row>
          {this.props.list.map((item, i) =>
            <Row key={i} style={styles.row}>
              <Col style={styles.leftCol} size={3}><Text style={styles.text}>{item}</Text></Col>
              <Col style={styles.rightCol} size={1}><Text style={styles.text}>{i}</Text></Col>
            </Row>
          )}
        </Grid>
        <Button style={styles.recordBtn}>
          Record wellbeing
        </Button>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    setIndex: index => dispatch(setIndex(index)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    reset: key => dispatch(reset([{ key: 'login' }], key, 0)),
  };
}

const mapStateToProps = state => ({
  name: state.user.name,
  list: state.list.list,
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(Home);

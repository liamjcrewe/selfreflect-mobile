
import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Text, Button, Icon } from 'native-base';
import { Grid, Row, Col } from 'react-native-easy-grid';
import { reverse } from 'ramda'

import { setIndex } from '../../actions/list';
import myTheme from '../../themes/base-theme';
import styles from './styles';

import { apiUrl } from '../../config/api'

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

  constructor(props) {
    super(props);
    this.state = {
      error: false,
      message: '',
      wellbeings: []
    };
  }

  pushRoute(route) {
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  fetchHistory(id, token) {
    return fetch(apiUrl + '/v1/users/' + id + '/wellbeings?limit=5', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
      .then(response => {
        if (response.status === 401) {
          // invalid email or password
          response.json()
            .then(json => {
              this.setState({ error: true, message: json.message })
            });

          return;
        }

        if (response.status !== 200) {
          // some other error
          this.setState({
            error: true,
            message: 'Something went wrong. Please try again later.'
          });

          return;
        }

        response.json()
          .then(json => {
            this.setState({
              wellbeings: reverse(json.results)
            })
          })
      })
      .catch(error => {
        this.setState({
          error: true,
          message: 'Something went wrong. Please try again later.'
        });
      })
  }

  formatDate(timestampString) {
    const date = new Date(timestampString);

    return date.toLocaleDateString('en-GB') + ' at ' + date.toLocaleTimeString();
  }

  componentDidMount() {
    this.fetchHistory(this.props.id, this.props.token)
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
          {this.state.wellbeings.map((wellbeing, i) =>
            <Row key={i} style={styles.row}>
              <Col style={styles.leftCol} size={3}><Text style={styles.text}>{this.formatDate(wellbeing.date_recorded)}</Text></Col>
              <Col style={styles.rightCol} size={1}><Text style={styles.text}>{wellbeing.wellbeing}</Text></Col>
            </Row>
          )}
        </Grid>
        <Text style={styles.error}>
          {this.state.message}
        </Text>
        <Button block success style={styles.recordBtn} onPress={() => this.pushRoute('qOne')}>
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
  id: state.user.id,
  token: state.user.token,
  list: state.list.list,
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(Home);


import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, InputGroup, Input, Button, Icon, View, Text } from 'native-base';

import { setUserId, setToken } from '../../actions/user';
import styles from './styles';
import isValidEmail from '../../util/email'
import { apiUrl } from '../../config/api'

const {
  replaceAt,
} = actions;

class Login extends Component {

  static propTypes = {
    setUserId: React.PropTypes.func,
    setToken: React.PropTypes.func,
    replaceAt: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: false,
      message: ''
    };
  }

  login(onSuccess) {
    return fetch(apiUrl + '/v1/tokens', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      })
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

        this.setState({
          error: false,
          message: 'Login successful'
        });

        response.json()
          .then(json => {
            this.props.setUserId(json.id);

            this.props.setToken(json.token);

            onSuccess();
          })
      })
      .catch(error => {
        this.setState({
          error: true,
          message: 'Something went wrong. Please try again later.'
        });
      })
  }

  replaceRoute(route) {
    this.props.replaceAt('login', { key: route }, this.props.navigation.key);
  }

  inputsValid() {
    return isValidEmail(this.state.email)
      && this.state.password
  }

  render() {
    return (
      <Container>
        <View style={styles.container}>
          <Content>
            <Text style={styles.title}>SelfReflect</Text>
            <View style={styles.bg}>
              <InputGroup style={styles.input}>
                <Icon name="ios-person" />
                <Input
                  placeholder="EMAIL"
                  onChangeText={email => this.setState({
                    email,
                    error: false,
                    message: ''
                  })}
                />
              </InputGroup>
              <InputGroup style={styles.input}>
                <Icon name="ios-unlock-outline" />
                <Input
                  placeholder="PASSWORD"
                  secureTextEntry
                  onChangeText={password => this.setState({
                    password,
                    error: false,
                    message: ''
                  })}
                />
              </InputGroup>
              <Text style={this.state.error ? styles.error : styles.success}>
                {this.state.message}
              </Text>
              <Button
                style={styles.btn}
                onPress={() => this.login(() => this.replaceRoute('home'))}
                disabled={!this.inputsValid()}
              >
                Login
              </Button>
              <Button
                style={styles.btn}
                onPress={() => this.replaceRoute('register')}
              >
                Register
              </Button>
            </View>
          </Content>
        </View>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    setUserId: id => dispatch(setUserId(id)),
    setToken: token => dispatch(setToken(token)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindActions)(Login);

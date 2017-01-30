
import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, InputGroup, Input, Button, Icon, View, Text } from 'native-base';

import styles from './styles';
import isValidEmail from '../../util/email'
import { apiUrl } from '../../config/api'

const {
  replaceAt,
} = actions;

class Register extends Component {

  static propTypes = {
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
      confirm: '',
      error: false,
      message: ''
    };
  }

  register(onSuccess) {
    return fetch(apiUrl + '/v1/users', {
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
        if (response.status === 409) {
          // duplicate email
          response.json()
            .then(json => {
              this.setState({ error: true, message: json.error })
            });

          return;
        }

        if (response.status !== 201) {
          // some other error
          this.setState({
            error: true,
            message: 'Something went wrong. Please try again later.'
          });

          return;
        }

        this.setState({
          error: false,
          message: 'Account created'
        });

        onSuccess();
      })
      .catch(error => {
        this.setState({
          error: true,
          message: 'Something went wrong. Please try again later.'
        });
      })
  }

  replaceRoute(route) {
    this.props.replaceAt('register', { key: route }, this.props.navigation.key);
  }

  inputsValid() {
    return isValidEmail(this.state.email)
      && this.state.password
      && (this.state.password === this.state.confirm);
  }

  getErrorMessage() {
    // Invalid email
    if (this.state.email && !isValidEmail(this.state.email)) {
      return (
        <Text style={styles.error}>
          Invalid email
        </Text>
      )
    }

    // No password or confirm
    if (!this.state.password || !this.state.confirm) {
      return
    }

    // Passwords do not match
    if (this.state.password !== this.state.confirm) {
      return (
        <Text style={styles.error}>
          Passwords do not match
        </Text>
      )
    }

    // Login (ajax/server) error
    if (this.state.error) {
      return (
        <Text style={styles.error}>
          {this.state.message}
        </Text>
      )
    }
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
              <InputGroup style={styles.input}>
                <Icon name="ios-unlock-outline" />
                <Input
                  placeholder="CONFIRM PASSWORD"
                  secureTextEntry
                  onChangeText={confirm => this.setState({
                    confirm,
                    error: false,
                    message: ''
                  })}
                />
              </InputGroup>
              {this.getErrorMessage()}
              <View style={styles.btnContainer}>
                <Button
                  info
                  style={styles.btn}
                  onPress={() => this.replaceRoute('login')}
                >
                  Back
                  <Icon name='ios-arrow-back' />
                </Button>
                <Button
                  success
                  style={[styles.btn, this.inputsValid() ? '' : styles.disabledBtn]}
                  onPress={() => this.register(() => this.replaceRoute('login'))}
                  disabled={!this.inputsValid()}
                >
                  Register
                </Button>
              </View>
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
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindActions)(Register);

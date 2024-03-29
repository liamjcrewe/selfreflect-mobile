import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native'
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Text, Button, Icon, View, Grid, Row } from 'native-base';
import { sum } from 'ramda'

import { updateScore, resetScores, updateHistory } from '../../actions/wellbeing';
import styles from './styles';
import { apiUrl } from '../../config/api';

const {
  reset,
  pushRoute,
  popRoute,
  replaceAt
} = actions;

const NUM_QUESTIONS = 7;

class Question extends Component {

  static propTypes = {
    name: React.PropTypes.string,
    next: React.PropTypes.string,
    pushRoute: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    reset: React.PropTypes.func,
    submitWellbeing: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);
    this.state = {
      error: false,
      message: ''
    };
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  pushRoute(route) {
    this.props.pushRoute({ key: route, index: 3 }, this.props.navigation.key);
  }

  submitWellbeing(id, token, scores, onSuccess) {
    const wellbeing = sum(scores);

    return fetch(apiUrl + '/v1/users/' + id + '/wellbeings', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        wellbeing
      })
    })
      .then(response => {
        if (response.status !== 201) {
          // error
          this.setState({
            error: true,
            message: 'Something went wrong. Please try again later.'
          });

          return;
        }

        this.setState({
          error: false,
          message: 'Wellbeing submitted'
        });

        response.json()
          .then(json => {
            this.props.updateHistory(json)

            onSuccess()
          })

      })
      .catch(error => {
        this.setState({
          error: true,
          message: error.message
        });
      })
  }

  isFirstQuestion() {
    return this.props.scoreIndex === 0;
  }

  isLastQuestion() {
    return this.props.scoreIndex === (NUM_QUESTIONS - 1);
  }

  isSelected(i) {
    return i == (this.props.scores[this.props.scoreIndex] - 1);
  }

  isAnswered() {
    return this.props.scores[this.props.scoreIndex] > 0;
  }

  updateScore(score) {
    this.props.updateScore(this.props.scoreIndex, score)
  }

  resetRoute() {
    this.props.resetScores()

    this.props.reset(this.props.navigation.key)
  }

  render() {
    const answers = [
      'None of the time',
      'Rarely',
      'Some of the time',
      'Often',
      'All of the time'
    ];

    return (
      <Container style={styles.container}>
        <Header>
          <Button
            transparent
            onPress={() => this.resetRoute()}
          >
            Cancel
          </Button>

          <Title>{(this.props.name)}</Title>
        </Header>

        <Content>
          <Grid style={styles.grid}>
            <Row style={styles.questionRow}>
              <Text style={styles.questionText}>{this.props.question}</Text>
            </Row>
            {answers.map((answer, i) =>
              <Row
                key={i}
                style={
                  this.isSelected(i) ? styles.selected : styles.unselected
                }
              >
                <TouchableOpacity
                  style={styles.answerRow}
                  onPress={() => this.updateScore(i + 1)}
                >
                  <Text style={styles.answerText}>{answer}</Text>
                </TouchableOpacity>
              </Row>
            )}
          </Grid>
          <View style={styles.btnContainer}>
            <Button info
              style={styles.btn}
              onPress={() => {
                this.isFirstQuestion() && this.props.resetScores()

                this.popRoute()
              }}
            >
              Back
              <Icon name='ios-arrow-back' />
            </Button>
            <Button success iconRight
              style={[styles.btn, this.isAnswered() ? '' : styles.disabledBtn]}
              onPress={
                this.isLastQuestion()
                ? () => {
                  this.submitWellbeing(
                    this.props.id,
                    this.props.token,
                    this.props.scores,
                    () => this.resetRoute()
                  )
                }
                : () => this.pushRoute(this.props.next)
              }
              disabled={!this.isAnswered()}
            >
              {this.isLastQuestion() ? 'Submit' : 'Next'}
              <Icon name='ios-arrow-forward' />
            </Button>
          </View>
          <Text style={this.state.error ? styles.error : styles.success}>
            {this.state.message}
          </Text>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    popRoute: key => dispatch(popRoute(key)),
    reset: key => dispatch(reset([{ key: 'home' }], key, 0)),
    updateScore: (index, score) => dispatch(updateScore(index, score)),
    resetScores: () => dispatch(resetScores()),
    updateHistory: newWellbeing => dispatch(updateHistory(newWellbeing))
  };
}

const mapStateToProps = (state, ownProps) => ({
  navigation: state.cardNavigation,
  id: state.user.id,
  token: state.user.token,
  scores: state.wellbeing.scores,
  name: ownProps.name,
  question: ownProps.question,
  next: ownProps.next,
  scoreIndex: ownProps.scoreIndex,
});

export default connect(mapStateToProps, bindAction)(Question);

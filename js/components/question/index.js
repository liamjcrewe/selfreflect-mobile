
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native'
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Text, Button, Icon, View, Grid, Row } from 'native-base';

import { updateScore } from '../../actions/wellbeing'
import styles from './styles';

const {
  reset,
  pushRoute,
  popRoute,
  replaceAt,
} = actions;

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

  submitWellbeing(onSuccess) {
    this.setState({
      message: JSON.stringify(this.props.scores)
    })

    //sum this.props.scores
    //submit sum
    //handle errors
    //call onSuccess

    // onSuccess()
  }

  isSelected(i) {
    return i == (this.props.scores[this.props.scoreIndex] - 1);
  }

  updateScore(score) {
    this.props.updateScore(this.props.scoreIndex, score)
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
          <Button transparent onPress={() => this.props.reset(this.props.navigation.key)}>
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
              onPress={() => this.popRoute()}
            >
              Back
              <Icon name='ios-arrow-back' />
            </Button>
            <Button success iconRight
              style={styles.btn}
              onPress={
                this.props.isLastQuestion
                ? () => this.submitWellbeing(() => this.props.reset(this.props.navigation.key))
                : () => this.pushRoute(this.props.next)
              }
            >
              {this.props.isLastQuestion ? 'Submit' : 'Next'}
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
    updateScore: (index, score) => dispatch(updateScore(index, score))
  };
}

const mapStateToProps = (state, ownProps) => ({
  navigation: state.cardNavigation,
  scores: state.wellbeing.scores,
  name: ownProps.name,
  question: ownProps.question,
  next: ownProps.next,
  scoreIndex: ownProps.scoreIndex,
  isLastQuestion: ownProps.isLastQuestion,
});

export default connect(mapStateToProps, bindAction)(Question);

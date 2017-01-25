
import React, { Component } from 'react';
import { BackAndroid, StatusBar, NavigationExperimental } from 'react-native';
import { connect } from 'react-redux';
import { Drawer } from 'native-base';
import { actions } from 'react-native-navigation-redux-helpers';

import { closeDrawer } from './actions/drawer';

import Login from './components/login/';
import Register from './components/register/';
import Home from './components/home/';
import BlankPage from './components/blankPage';
import SplashPage from './components/splashscreen/';
import SideBar from './components/sideBar';
import Question from './components/question';
import { statusBarColor } from './themes/base-theme';

const {
  popRoute,
} = actions;

const {
  CardStack: NavigationCardStack,
} = NavigationExperimental;

class AppNavigator extends Component {

  static propTypes = {
    drawerState: React.PropTypes.string,
    popRoute: React.PropTypes.func,
    closeDrawer: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
      routes: React.PropTypes.array,
    }),
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      const routes = this.props.navigation.routes;

      if (routes[routes.length - 1].key === 'home' || routes[routes.length - 1].key === 'login') {
        return false;
      }

      this.props.popRoute(this.props.navigation.key);
      return true;
    });
  }

  componentDidUpdate() {
    if (this.props.drawerState === 'opened') {
      this.openDrawer();
    }

    if (this.props.drawerState === 'closed') {
      this._drawer.close();
    }
  }

  popRoute() {
    this.props.popRoute();
  }

  openDrawer() {
    this._drawer.open();
  }

  closeDrawer() {
    if (this.props.drawerState === 'opened') {
      this.props.closeDrawer();
    }
  }

  _renderScene(props) { // eslint-disable-line class-methods-use-this
    switch (props.scene.route.key) {
      case 'splashscreen':
        return <SplashPage />;
      case 'login':
        return <Login />;
      case 'register':
        return <Register />;
      case 'home':
        return <Home />;
      case 'blankPage':
        return <BlankPage />;
      case 'qOne':
        return (
          <Question
            name={'Question One'}
            question={'I\'ve been feeling optimistic about the future'}
            next={'qTwo'}
            scoreIndex={0}
          />
        );
      case 'qTwo':
        return (
          <Question
            name={'Question Two'}
            question={'I\'ve been feeling useful'}
            next={'qThree'}
            scoreIndex={1}
          />
        );
      case 'qThree':
        return (
          <Question
            name={'Question Three'}
            question={'I\'ve been feeling relaxed'}
            next={'qFour'}
            scoreIndex={2}
          />
        );
      case 'qFour':
        return (
          <Question
            name={'Question Four'}
            question={'I\'ve been dealing with problems well'}
            next={'qFive'}
            scoreIndex={3}
          />
        );
      case 'qFive':
        return (
          <Question
            name={'Question Five'}
            question={'I\'ve been thinking clearly'}
            next={'qSix'}
            scoreIndex={4}
          />
        );
      case 'qSix':
        return (
          <Question
            name={'Question Six'}
            question={'I\'ve been feeling close to other people'}
            next={'qSeven'}
            scoreIndex={5}
          />
        );
      case 'qSeven':
        return (
          <Question
            name={'Question Seven'}
            question={'I\'ve been able to make up my own mind about things '}
            next={''}
            scoreIndex={6}
          />
        );
      default :
        return <Login />;
    }
  }

  render() {
    return (
      <Drawer
        ref={(ref) => { this._drawer = ref; }}
        type="overlay"
        tweenDuration={150}
        content={<SideBar />}
        tapToClose
        acceptPan={false}
        onClose={() => this.closeDrawer()}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        styles={{
          drawer: {
            shadowColor: '#000000',
            shadowOpacity: 0.8,
            shadowRadius: 3,
          },
        }}
        tweenHandler={(ratio) => {  //eslint-disable-line
          return {
            drawer: { shadowRadius: ratio < 0.2 ? ratio * 5 * 5 : 5 },
            main: {
              opacity: (2 - ratio) / 2,
            },
          };
        }}
        negotiatePan
      >
        <StatusBar
          backgroundColor={statusBarColor}
          barStyle="default"
        />
        <NavigationCardStack
          navigationState={this.props.navigation}
          renderOverlay={this._renderOverlay}
          renderScene={this._renderScene}
        />
      </Drawer>
    );
  }
}

function bindAction(dispatch) {
  return {
    closeDrawer: () => dispatch(closeDrawer()),
    popRoute: key => dispatch(popRoute(key)),
  };
}

const mapStateToProps = state => ({
  drawerState: state.drawer.drawerState,
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(AppNavigator);

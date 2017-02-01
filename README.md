# SelfReflect Mobile App
SelfReflect is a project developed as part of a final year BSc Computer Science project at the University of Bath. It is an application to allow users to record their mental health wellbeing, with the goal to allow them to map this wellbeing to other data about them (via external APIs). This will allow users to investigate the relationships between their mental health wellbeing, social media activity (Twitter), music listening habits (last.fm) and exercise information (Strava).

This specific project is a mobile app for recording wellbeing that communicates to a server via the [SelfReflect API](https://github.com/liamjcrewe/selfreflect-api). This app simply allows register, login and recording of wellbeing scores. The data can then be analysed by the user using [SelfReflect Web](https://github.com/liamjcrewe/selfreflect-web).

## Get Started

### 1. System Requirements

* Globally installed [node](https://nodejs.org/en/) >= 4.0

* Globally installed [npm](https://www.npmjs.org/) >= 3.0

* Globally installed [react-native CLI](https://facebook.github.io/react-native/docs/getting-started.html)

### 2. Installation

Clone the repository, then on the command prompt run the following commands

```sh
$ npm install
$ react-native link
```

### 3. Simulate for iOS

**Method One**

*	Open the project in XCode from **ios/NativeStarterKit.xcodeproj**

*	Hit the play button.


**Method Two**

*	Run the following command in your terminal

```sh
$ react-native run-ios
```

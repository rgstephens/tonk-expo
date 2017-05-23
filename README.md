#  TonkScorecard

Scorecard for [Tonk](https://en.wikipedia.org/wiki/Tonk_(card_game)).

* React Native App using [expo](https://expo.io)

## :arrow_up: How to Setup

**Step 1:** git clone this repo:

**Step 2:** cd to the cloned repo:

**Step 3:** Install the Application with `npm install`


## :arrow_forward: How to Run App on Desktop

1. cd to the repo
2. Run Build for either OS
  * for iOS
    * run `react-native run-ios`
  * for Android
    * Run Genymotion
    * run `react-native run-android`

## :arrow_forward: How to Run App on Device

Use the [React Native - Running On Device page](https://facebook.github.io/react-native/docs/running-on-device.html) instructions.

## :closed_lock_with_key: Secrets

This project uses [react-native-config](https://github.com/luggit/react-native-config) to expose config variables to your javascript code in React Native. You can store API keys
and other sensitive information in a `.env` file:

```
API_URL=https://myapi.com
```

and access them from React Native like so:

```
import Secrets from 'react-native-config'

Secrets.API_URL  // 'https://myapi.com'
```

The `.env` file is ignored by git keeping those secrets out of your repo.

## AppStore Info

### Short description

Scorecard for Tonk card game

### Full description

This is a score keeping app for the Tonk card game https://en.wikipedia.org/wiki/Tonk_(card_game)


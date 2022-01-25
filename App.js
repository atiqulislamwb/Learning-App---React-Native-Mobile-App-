import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import themeReducer from './stores/themeReducer.js';
import { MainLayout , CourseListing , CourseDetails } from './screens';


const Stack = createSharedElementStackNavigator();
const store = createStore(themeReducer, applyMiddleware(thunk));

const options = {
  gestureEnabled: false,
  transitionSpec: {
    open: {
      animation: 'timing',
      config: { duration: 400 },
    },
    close: {
      animation: 'timing',
      config: { duration: 400 },
    },
  },
  cardStyleInterpolate: ({ current: { progress } }) => {
    return {
      cardStyle: {
        opacity: progress,
      },
    };
  },
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            useNativeDriver: true,
            headerShown: false,
          }}
          initialRouteName={'Dashboard'}
          detachInactiveScreens={false}
          >
          <Stack.Screen name="Dashboard" component={MainLayout} />
          <Stack.Screen name="CourseListing"  component={CourseListing}  options ={() => options} />
            <Stack.Screen name="CourseDetails"  component={CourseDetails}   />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

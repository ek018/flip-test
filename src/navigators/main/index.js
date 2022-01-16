import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TransactionDetail from '../../screens/TransactionDetail';
import TransactionList from '../../screens/TransactionList';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TransactionList"
        component={TransactionList}
        options={({route}) => ({
          headerShown: true,
          title: ' ',
          headerBackTitle: '',
          headerTitleAlign: 'left',
          headerBackTitleStyle: {
            fontWeight: 'bold',
            marginLeft: 10,
          },
          headerTintColor: '#000',
          headerLeftContainerStyle: {left: 10},
        })}
      />
      <Stack.Screen
        name="TransactionDetail"
        component={TransactionDetail}
        options={({route}) => ({
          headerShown: true,
          title: ' ',
          headerBackTitle: '',
          headerTitleAlign: 'left',
          headerBackTitleStyle: {
            fontWeight: 'bold',
            marginLeft: 10,
          },
          headerTintColor: '#000',
          headerLeftContainerStyle: {left: 10},
        })}
      />
    </Stack.Navigator>
  );
};

export default MainStack;

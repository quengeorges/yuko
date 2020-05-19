import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { createStore } from "redux";
import productReducer from './store/reducer/ProductReducer';
import HomeScreen from './src/views/HomeScreen'
import ListScreen from './src/views/ListScreen'
import DetailsScreen from './src/views/DetailsScreen'
import FavoriteScreen from "./src/views/FavoriteScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const store = createStore(productReducer);

function HomeStack() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
  );
}

function ListStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="List" component={ListScreen} />
            <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
    )
}

function FavStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Favorite" component={FavoriteScreen} />
            <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
    )
}


export default function App() {
  return (
      <Provider store={store}>
          <NavigationContainer>
              <Tab.Navigator>
                  <Tab.Screen name="Home" component={HomeStack} />
                  <Tab.Screen name="List" component={ListStack} />
                  <Tab.Screen name="Favorite" component={FavStack} />
              </Tab.Navigator>
          </NavigationContainer>
      </Provider>
  );
}

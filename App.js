import * as React from 'react';
import {Dimensions, View, Text, StyleSheet, ScrollView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ListNews} from './components/ListNews';
import News from './News';

import Reactotron from 'reactotron-react-native';
import {HorizontalNews} from './components/HorizontalNews';
Reactotron.configure()
  .useReactNative() // add all built-in react native plugins
  .connect(); // let's connect!

function Tab1Screen(props) {
  return (
    <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
      <Text style={styles.listTitle}>World 24h</Text>
      <HorizontalNews uri="" {...props} />
      <Text style={styles.listTitle}>24/7 Middle Times</Text>
      <HorizontalNews uri="middle-east" {...props} />
      <Text style={styles.listTitle}>24/7 Asia Pacific</Text>
      <HorizontalNews uri="asia-pacific" {...props} />
      <Text style={styles.listTitle}>24/7 Africa</Text>
      <HorizontalNews uri="africa" {...props} />
    </ScrollView>
  );
}

function Tab2Screen(props) {
  return <ListNews uri="topics/regions/africa.html" {...props} />;
}

function Tab3Screen(props) {
  return <ListNews uri="topics/regions/asia-pacific.html" {...props} />;
}

function Tab4Screen(props) {
  return (
    <ListNews
      uri="topics/categories/weather.html"
      itemWidth={sWidth / 2 - 10}
      imgHeight={120}
      numColumns={2}
      {...props}
    />
  );
}

const Tab = createBottomTabNavigator();
const TabHomeStack = createStackNavigator();

function TabHomeNavigator() {
  return (
    <TabHomeStack.Navigator
      screenOptions={{
        title: 'World News',
        headerStyle: {backgroundColor: '#ffca02'},
      }}>
      <TabHomeStack.Screen name="Tab1Screen" component={Tab1Screen} />
    </TabHomeStack.Navigator>
  );
}

const Tab2Stack = createStackNavigator();
function Tab2Navigator() {
  return (
    <Tab2Stack.Navigator
      screenOptions={{
        title: "Africa's Life",
        headerStyle: {backgroundColor: '#1abc9c'},
      }}>
      <Tab2Stack.Screen name="Tab2Screen" component={Tab2Screen} />
    </Tab2Stack.Navigator>
  );
}

const Tab3Stack = createStackNavigator();
function Tab3Navigator() {
  return (
    <Tab3Stack.Navigator
      screenOptions={{
        title: 'Asia Pacific News',
        headerStyle: {backgroundColor: '#ffca02'},
      }}>
      <Tab3Stack.Screen name="Tab3Screen" component={Tab3Screen} />
    </Tab3Stack.Navigator>
  );
}

const Tab4Stack = createStackNavigator();
function Tab4Navigator() {
  return (
    <Tab4Stack.Navigator
      screenOptions={{
        title: 'Weather News',
        headerStyle: {backgroundColor: '#b2bec3'},
      }}>
      <Tab4Stack.Screen name="Tab4Screen" component={Tab4Screen} />
    </Tab4Stack.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}>
      <Tab.Screen
        name="Feed"
        component={TabHomeNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Icon
              type="MaterialCommunityIcons"
              name="home"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Tab2Navigator}
        options={{
          tabBarLabel: "Africa's Life",
          tabBarIcon: ({color, size}) => (
            <Icon
              type="MaterialCommunityIcons"
              name="credit-card-settings"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Community"
        component={Tab3Navigator}
        options={{
          tabBarLabel: 'Greater Asia',
          tabBarIcon: ({color, size}) => (
            <Icon
              type="MaterialCommunityIcons"
              name="bank-plus"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Nasa"
        component={Tab4Navigator}
        options={{
          tabBarLabel: 'Weather',
          tabBarIcon: ({color, size}) => (
            <Icon
              type="MaterialCommunityIcons"
              name="chart-bubble"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const AppStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <AppStack.Navigator>
        <AppStack.Screen
          options={{headerShown: false}}
          name="Root"
          component={MyTabs}
        />
        <AppStack.Screen
          options={{title: 'Read News', headerBackTitle: 'Back'}}
          name="News"
          component={News}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}

const sWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  listTitle: {marginTop: 15, fontWeight: '600', marginLeft: 5},
});

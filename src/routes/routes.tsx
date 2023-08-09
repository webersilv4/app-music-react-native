import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { propsNavigationStack } from '../../@types';

import { NavMusicProvider } from '../Components/NavMusicProvider';
import Navigation from '../Components/Navigation';
import HomeScreen from '../app/Home';
import MusicScreen from '../app/Search';
import Playlists from '../app/Playlists';
import Favorites from '../app/Favorites';
import Albums from '../app/Albums';


export default function Router () {

  const { 
      Navigator, Screen
    } = createNativeStackNavigator<propsNavigationStack>();
  
  return (
    
    <NavigationContainer>
      <NavMusicProvider>
            
            <Navigator 
              initialRouteName='Home' 
              screenOptions={{ 
                headerShown: false,
                statusBarColor: '#C7AF9E',
                navigationBarColor: '#C7AF9E',
              }}>
                <Screen 
                    name="Home" 
                    component={HomeScreen}
                />
                
                <Screen 
                    name="Playlists" 
                    component={Playlists}
                />

                <Screen 
                    name="Favorites" 
                    component={Favorites}
                />

                <Screen 
                    name="Search" 
                    component={MusicScreen}
                />

                <Screen 
                    name="Albums" 
                    component={Albums}
                />

            </Navigator>

      </NavMusicProvider>
      <Navigation />
    </NavigationContainer>
  );
}
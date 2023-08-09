import React from 'react';
import IconAnt from 'react-native-vector-icons/AntDesign';

import { TouchableHighlight, View, Text } from 'react-native';
import styles from '../styles/style';
import { useNavigation } from '@react-navigation/native';
import { propsStack } from '../../@types';


const Navigation = () => {

    const navigation = useNavigation<propsStack>();

    return (
        <View style={styles.navigation}>

            <TouchableHighlight>
                <>
                    <IconAnt 
                        name='home' 
                        size={25} 
                        color={'#000'}
                        style={{ marginLeft: 10 }} 
                        onPress={() => navigation.navigate('Home')} />
                        <Text style={{ marginLeft: 'auto' }}>Inicio</Text>
                </>
            </TouchableHighlight>

            <TouchableHighlight>
                <>
                    <IconAnt 
                        name='menufold' 
                        size={25} 
                        color={'#000'}
                        style={{ marginLeft: 10 }} 
                        onPress={() => navigation.navigate('Playlists')} />
                        <Text>Playlists</Text>
                </>
            </TouchableHighlight>

            <TouchableHighlight>
                <>
                    <IconAnt 
                        name='hearto' 
                        size={25} 
                        color={'#000'}
                        style={{ marginLeft: 10 }} 
                        onPress={() => navigation.navigate('Favorites')} />
                        <Text>Favoritos</Text>
                </>
            </TouchableHighlight>

             <TouchableHighlight>
                <>
                    <IconAnt 
                        name='search1' 
                        size={25} 
                        color={'#000'}
                        style={{ marginLeft: 10 }} 
                        onPress={() => navigation.navigate('Search')} />
                        <Text style={{ marginLeft: 'auto' }}>Busca</Text>
                </>
            </TouchableHighlight>

        </View>
    )
};

export default Navigation;
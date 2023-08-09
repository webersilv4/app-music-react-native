import React, { useState, useEffect, useRef } from 'react';
import { Button, View, StyleSheet, Text, Image, SafeAreaView, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconAnt from 'react-native-vector-icons/AntDesign'

import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import { TouchableHighlight } from 'react-native';

import axios from 'axios';
import { propsDataApi } from '../../@types';


const Search = () => {

    const [ search, setSearch ] = useState({ search: '' });

    
    return (
        <View style={{ 
            height: '100%',
            width: '100%', 
            paddingTop: 100, 
            backgroundColor: '#C7AF9E' 
        }}>
            

            <SafeAreaView style={styles.containerForm}>
                <Text  
                style={{
                    fontSize: 30,
                    fontWeight: 'bold',
                    marginRight: 'auto',
                    marginBottom: 20
                }}>
                    Pesquisa
                </Text>
                <TextInput 
                    placeholder='Pesquisar'
                    style={{
                        borderColor: '#000',
                        width: '80%',
                        height: 50,
                        borderWidth: 1,
                        paddingLeft: 15,
                        fontSize: 18,
                        borderRadius: 10
                    }}
                    cursorColor={'black'}
                    onChangeText={(e)=>setSearch({ search: e })}
                />
                <TouchableHighlight style={styles.buttonForm} >
                    <IconAnt name='search1' size={25} color={'white'} />
                </TouchableHighlight>
            </SafeAreaView>
            

            
        </View>
    );
  }


  const styles = StyleSheet.create({
    containerForm: {
        width: '90%',
        flexDirection:'row', 
        flexWrap:'wrap', 
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    buttonForm: {
        backgroundColor: '#000',
        color: 'white',
        shadowOpacity: 0,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 10,
        justifyContent: 'center',
        width: '15%',
        alignItems: 'center'
    }
  });


export default Search;
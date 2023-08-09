import React, { createContext, useState, useRef, useEffect } from 'react';

import { Button, View, StyleSheet, Text, Image, Modal, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Foundation';
import IconAnt from 'react-native-vector-icons/AntDesign';
import styles from '../styles/style';
import Slider from '@react-native-community/slider';


import axios from 'axios';
import { propsDataApi } from '../../@types';

import { Audio } from 'expo-av';

export const NavMusicContext = createContext({});

export const NavMusicProvider = ({ children }: any) => {

    const [atualMusic, setAtualMusic ] = useState(0);
    const [numberOfMusicsInAlbum, setNumberOfMusicsInAlbum ] = useState(0);
    const [totalTimeAudio, setTotalTimeAudio] = useState<any>();
    const [atualTimeAudio, setAtualTimeAudio] = useState<number>(0);
    const [ visibleModal, setVisibleModal ] = useState<boolean>(false);
    const [ dataApi, setDataApi ] = useState<propsDataApi>();
    const [Status, SetStatus] = useState(false);
    const sound = useRef(new Audio.Sound());

    
    const handleOneMusicApi = async (id?: string, indiceOfMusic?: number) => {
        if (indiceOfMusic != undefined) setAtualMusic(indiceOfMusic);
        
        console.log(indiceOfMusic)

        if (id) return await axios.get(`https://music-app-backend-nine.vercel.app/listen-to-music/${id}`)
            .then((response)=> {
                    ClearAndSetNewAudio()
                    setDataApi(response.data)
                    GetNumberOfMusics(response.data);
                }).catch(err=>console.log('erro da api'));
    };

    function GetNumberOfMusics(params:any) { setNumberOfMusicsInAlbum(params[0].musics.length - 1); }

    function NextAudio() {
        ClearAndSetNewAudio();
        if (atualMusic < numberOfMusicsInAlbum)
            setAtualMusic(atualMusic + 1);
        return;
    }

    function PrevAudio() {
        ClearAndSetNewAudio();
        if (atualMusic >= 1)
           setAtualMusic(atualMusic - 1);
        return;
    }

    // FUNÇÃO INICIA AUDIO AUTOMATICAMENTE.
    const LoadAudio = async () => {
            await sound.current.loadAsync({ 
            uri: dataApi?.[0].musics[atualMusic].songLink ? dataApi?.[0].musics[atualMusic].songLink : '' }, 
            { volume: 1 }, true)
            .then((r => {
                if (r.isLoaded === false) {
                    console.log('Error in Loading Audio')
                }else{ 
                    PlayAudio();
                }
            })).catch(err=>'ola');

    }

    useEffect(()=> {
        handleOneMusicApi();

        try {
        Audio.setAudioModeAsync({staysActiveInBackground:true});
        } catch (e) {
        console.log(e);
        }
    }, []);
    
    
    LoadAudio();


    // PASSANDO PARA DOIS DIGITOS
    const padToTwoDigits = (num:number) => {
        return num.toString().padStart(2, '0');
    }

    const convertMsToTime = (milliseconds:number) => {
        let seconds = Math.floor(milliseconds / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);

        seconds = seconds % 60;
        minutes = minutes % 60;

        hours = hours % 24;

        if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) return '00:00:00'
        else return `${padToTwoDigits(hours)}:${padToTwoDigits(minutes)}:${padToTwoDigits(seconds)}`;

    }

    // FUNÇÃO DE INICIAR O AUDIO CASO ESTEJA PAUSADO
    const PlayAudio = async () => {
        try {
        
        const result = await sound.current.getStatusAsync();
        if (result.isLoaded) {
            if (result.isPlaying === false) {
                sound.current.playAsync();
                // sound.current.setProgressUpdateIntervalAsync()
                SetStatus(true);
            }
        }
        } catch (error) {
            SetStatus(false);
        }
    };

    const ClearAndSetNewAudio = async () => {
        try {
            SetStatus(false);
            await sound.current.stopAsync();
            await sound.current.unloadAsync();
        } catch (error) {
            SetStatus(false);
        }
    };
    
    // FUNÇÃO DE PAUSAR O AUDIO CASO ESTEJA INICIADO
    const PauseAudio = async () => {
        try {
        const result = await sound.current.getStatusAsync();
        if (result.isLoaded) {
            if (result.isPlaying === true) {
            sound.current.pauseAsync();
            SetStatus(false);
            }
        }
        } catch (error) {
        SetStatus(false);
        }
    };

    // RESPONSAVEL PELO USUARIO SETAR O VALOR QUE ELE DESEJA DO TEMPO DE AUDIO
    const SetTimeAudio = async (time:number) => {

        await sound.current.playFromPositionAsync(time)
        .then(e=>{ SetStatus(true); console.log(e)})
        .catch(err=>console.log(err))
    }

    setTimeout(() => {
        sound.current.getStatusAsync()
        .then((e:any)=>{
            setAtualTimeAudio(e.positionMillis);
            setTotalTimeAudio(e.durationMillis);
        }).catch(err=> console.log(err));
    }, 1000);

    return (
        <NavMusicContext.Provider value={{dataApi, handleOneMusicApi}}>
            {children}
            <TouchableHighlight onPress={()=> 
                    setVisibleModal(true)}>
                
                <View style={{ 
                    width: '100%',  
                    backgroundColor: '#000',
                    paddingTop: 10,
                    paddingBottom: 10
                }}>
                
                    <View 
                        style={{ width: '80%', 
                            marginLeft: 'auto', 
                            marginRight: 'auto' }}>

                        {/* BOTOES CONTROL MUSIC */}
                        <View style={styles.displayFlexStart}>

                            {Status === false ? 
                                
                                <TouchableHighlight onPress={() => PlayAudio()}>
                                    <Icon name='play' size={45} color={'#fff'}/>
                                </TouchableHighlight> 
                                :
                                <TouchableHighlight onPress={() => PauseAudio()}>
                                    <Icon name='pause' size={45} color={'#fff'}/>
                                </TouchableHighlight>
                            }

                            <View style={{ flexDirection: 'column', marginLeft: 20 }}>
                                <Text style={{ 
                                    color: 'white', 
                                    fontWeight: 'bold', 
                                    fontSize: 15 
                                }}>
                                    {dataApi?.[0].musics[atualMusic].songTitle}
                                </Text>
                                <Text style={{ 
                                    color: '#d8d8d8' 
                                    }}
                                >
                                    {dataApi?.[0].artist}
                                </Text>
                            </View>
                            
                            
                            <Modal
                                visible={visibleModal}
                                animationType='slide'
                                transparent={false}
                                onRequestClose={()=>setVisibleModal(false)} 
                                >
                                
                                <View style={{ 
                                    height: '100%',
                                    width: '100%', 
                                    paddingTop: 10, 
                                    backgroundColor: '#C7AF9E' 
                                }}>

                                    <TouchableHighlight 
                                        onPress={()=> setVisibleModal(false)}
                                        underlayColor=''
                                    >   
                                        <IconAnt 
                                            name='down' 
                                            size={35} 
                                        />
                                    </TouchableHighlight>

                                    <View 
                                        style={{ width: '80%', 
                                            marginLeft: 'auto', 
                                            marginRight: 'auto', marginTop: 50 }}>

                                        {/* IMAGEM DO ALBUM NOME E DEMAIS INFO */}
                                        <View style={{ marginBottom: 50 }}>
                                            <Image
                                                style={styles.imageAlbum} 
                                                source={{
                                                    uri: dataApi?.[0].albumImage 
                                                    }} />
                                            
                                            <Text style={styles.title}>
                                                {dataApi?.[0].musics[atualMusic].songTitle}
                                            </Text>
                                            <Text style={styles.subTitle}>
                                                {dataApi?.[0].artist}
                                            </Text>
                                        </View>

                                        {/* SCROLL E TEMPO DO AUDIO */}
                                        <View style={{ marginBottom: 50 }}>

                                            <View style={styles.displayFlexEnd}>
                                                <Text style={{color: '#000'}}>
                                                    {convertMsToTime(atualTimeAudio)}
                                                </Text>
                                                <Text style={{color: '#000'}}>
                                                    /
                                                </Text>
                                                <Text style={{color: '#000'}}>
                                                    {convertMsToTime(totalTimeAudio)}
                                                </Text>
                                            </View>

                                            <Slider
                                                style={{width: 300, height: 40}}
                                                value={atualTimeAudio}
                                                minimumValue={0}
                                                maximumValue={totalTimeAudio}
                                                minimumTrackTintColor={'#000'}
                                                maximumTrackTintColor={'#D9D9D9'}
                                                thumbTintColor='#000'
                                                onValueChange={(value:any)=>{ SetTimeAudio(value), setAtualTimeAudio(value)} }
                                                // onSlidingComplete={(e)=>console.log(e)}
                                            /> 
                                        </View>

                                        {/* BOTOES CONTROL MUSIC */}
                                        <View style={styles.displayFlexBetween}>


                                            { atualMusic >= 1  ? 
                                                <TouchableHighlight 
                                                onPress={() => PrevAudio()}
                                                underlayColor=''
                                            >
                                                <Icon 
                                                    name='previous' 
                                                    size={40} 
                                                    color={'#000'}  
                                                    style={{ 
                                                        marginTop: 'auto', 
                                                        marginBottom: 'auto' 
                                                    }} 
                                                />
                                            </TouchableHighlight>
                                                : 
                                                
                                            <TouchableHighlight 
                                                onPress={() => PrevAudio()}
                                                underlayColor=''
                                            >
                                                <Icon 
                                                    name='previous' 
                                                    size={40} 
                                                    color={'#000'}  
                                                    style={{ 
                                                        marginTop: 'auto', 
                                                        marginBottom: 'auto' 
                                                    }} 
                                                />
                                            </TouchableHighlight> 
                                            }

                                            

                                            {Status === false ? 
                                                
                                                <TouchableHighlight 
                                                    onPress={() => PlayAudio()} 
                                                    underlayColor=''
                                                >
                                                    <Icon name='play' size={80} color={'#000'}/>
                                                </TouchableHighlight> 
                                                :
                                                <TouchableHighlight 
                                                    onPress={() => PauseAudio()}
                                                    underlayColor=''
                                                >
                                                    <Icon name='pause' size={80} color={'#000'}/>
                                                </TouchableHighlight>
                                            }
                                            
                                            { atualMusic < numberOfMusicsInAlbum  ? 
                                                <TouchableHighlight 
                                                onPress={() => NextAudio()}
                                                underlayColor=''
                                                >
                                                    <Icon name='next' 
                                                        size={40}
                                                        color={'#000'}  
                                                        style={{ 
                                                            marginTop: 'auto', 
                                                            marginBottom: 'auto' 
                                                        }} 
                                                    />
                                                </TouchableHighlight> : 
                                                <TouchableHighlight
                                                underlayColor=''
                                                >
                                                    <Icon name='next' 
                                                        size={40}
                                                        color={'#000'}  
                                                        style={{ 
                                                            marginTop: 'auto', 
                                                            marginBottom: 'auto' 
                                                        }} 
                                                    />
                                                </TouchableHighlight> 
                                            }

                                        </View>
                                    </View>
                                </View>
                            
                            </Modal>
                        </View>

                    </View>
                </View>
            </TouchableHighlight>
        </NavMusicContext.Provider>
    )
};


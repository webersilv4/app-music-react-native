import axios from 'axios';
import { Audio } from 'expo-av';
import { NavMusicContext } from '../Components/NavMusicProvider';
import { useNavigation } from '@react-navigation/native';

import React, { 
    useState, 
    useEffect,
    useContext
} from 'react';

import { 
    View, 
    Text, 
    Image, 
    ScrollView, 
    StyleSheet,
    TouchableHighlight 
} from 'react-native';

import { 
    propsDataApi, 
    propsStack 
} from '../../@types';


const HomeScreen = () => {

    const navigation = useNavigation<propsStack>();
    const {handleOneMusicApi}: any  = useContext(NavMusicContext);
    const [ data, setData ] = useState<propsDataApi>();

    const fetchData = async () => {
        await axios.get('https://music-app-backend-nine.vercel.app/list-musics')
        .then(r=> {
            setData(r.data)
        }).catch(err=>console.log(err))
    };

    useEffect(()=> {
        fetchData();
    }, []);
    
    return (
        <View style={{ backgroundColor: '#C7AF9E', height: '100%' }}>
            <Text style={{ 
                fontSize: 35,
                marginTop: 100,
                marginLeft: 10,
                color: '#fff'
            }}>
                Músicas
            </Text>

            {/* Musics */}
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={styless.viewpic}>
                    { data?.map((response, key)=>(
                        <View key={key}>
                            <TouchableHighlight 
                                onPress={
                                    ()=>handleOneMusicApi(response._id)
                                } 
                                style={{ 
                                    width: 100, 
                                    justifyContent: 'center',
                                    margin: 5,
                                    backfaceVisibility: 'visible'
                                }}
                                underlayColor={'transparent'}
                            >
                                <>
                                    <Image
                                        style={styless.image} 
                                        source={{
                                            uri: response.albumImage
                                    }} /> 
                                    <Text style={{
                                        width: '100%',
                                        padding: 0,
                                        margin: 0,
                                        letterSpacing: 0,
                                        color: 'white'
                                    }}>
                                        {response.musics[0].songTitle}
                                    </Text>
                                    <Text style={{
                                        width: '100%',
                                        padding: 0,
                                        margin: 0,
                                        letterSpacing: 0,
                                        color: '#d8d8d8',
                                        fontSize: 10, 
                                        marginTop: 3
                                    }}>
                                        {response.artist}
                                    </Text>
                                </>
                            </TouchableHighlight>
                        </View>
                    )) }
                </View>
            </ScrollView>



            <Text style={{ 
                fontSize: 35,
                marginLeft: 10,
                color: '#fff'
            }}>
                Albums
            </Text>
            
            {/* Albums */}
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={styless.viewpic}>
                    { data?.map((response, key)=>(
                        <View key={key}>
                            <TouchableHighlight 
                                onPress={() => navigation.navigate('Albums', { albumId: response._id })} 
                                style={{ 
                                    width: 100, 
                                    justifyContent: 'center',
                                    margin: 5,
                                    backfaceVisibility: 'visible'
                                }}
                                underlayColor={'transparent'}
                            >
                                <>
                                    <Image
                                        style={styless.image} 
                                        source={{
                                            uri: response.albumImage
                                    }} /> 
                                    <Text style={{
                                        width: '100%',
                                        padding: 0,
                                        margin: 0,
                                        letterSpacing: 0,
                                        color: 'white'
                                    }}>
                                        {response.albumTitle}
                                    </Text>
                                    <Text style={{
                                        width: '100%',
                                        padding: 0,
                                        margin: 0,
                                        letterSpacing: 0,
                                        color: '#d8d8d8',
                                        fontSize: 10, 
                                        marginTop: 3
                                    }}>
                                        {response.artist}
                                    </Text>
                                </>
                            </TouchableHighlight>
                        </View>
                    )) }
                </View>
            </ScrollView>

        </View>
    );
  }


  const styless = StyleSheet.create({
    viewpic: {
        flexWrap:'wrap',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        backgroundColor: '#C7AF9E',
        marginLeft: 10
    },
    image: {
        height: 100,
        width: 100,
        margin: 'auto',
        marginTop: 15,
        backgroundColor: '#C7AF9E',
        borderRadius: 10
    }
  })


export default HomeScreen;
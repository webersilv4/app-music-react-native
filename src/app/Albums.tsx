import axios from 'axios';
import { 
    View, Text, 
    Image, 
    TouchableHighlight 
} from 'react-native';

import React, { 
    useState, 
    useEffect, 
    useContext 
} from 'react';

import IconAnt from 'react-native-vector-icons/AntDesign';
import { NavMusicContext } from '../Components/NavMusicProvider';
import { useNavigation, useRoute } from '@react-navigation/native';
import { propsDataApi, propsStack } from '../../@types';

const Albums = () => {
    
    const {handleOneMusicApi}: any  = useContext(NavMusicContext);
    const navigation = useNavigation<propsStack>();
    const [ dataApi, setDataApi ] = useState<propsDataApi>();
    const { albumId }: any = useRoute().params;
    
    const fetchData = async () => {
        await axios.get(`https://music-app-backend-nine.vercel.app/listen-to-music/${albumId}`)
        .then(r=> setDataApi(r.data))
        .catch(err=>console.log(err))
    };

    useEffect(()=> {fetchData();}, []);

    return (
        <View style={{ 
            height: '100%',
            width: '100%', 
            paddingTop: 50, 
            backgroundColor: '#C7AF9E' 
        }}>

             <TouchableHighlight onPress={()=> navigation.goBack()} underlayColor=''>
                <View style={{ flexDirection: 'row' }}>
                    <IconAnt name='left' size={35}/>
                    <Text style={{ 
                        marginTop: 'auto', 
                        marginBottom: 'auto', 
                        fontWeight: 'bold',
                        fontSize: 16 
                    }}>
                            Voltar
                    </Text>
                </View>
             </TouchableHighlight>

             <View>
                    {dataApi?.map((response, key)=> (
                        <View key={key}>
                            
                            <View style={{
                                width: '95%',
                                alignSelf: 'center'
                            }}>
                                <Text style={{ 
                                    fontSize: 25, 
                                    fontWeight: 'bold', 
                                    width: '100%',
                                    marginTop: 50,
                                    marginBottom: 50 
                                }}>
                                    {response.albumTitle}
                                </Text>


                                {response.musics?.map((responseTwo, key)=> (
                                    <TouchableHighlight onPress={
                                        ()=> handleOneMusicApi(response._id, key)} 
                                    underlayColor='' key={key}>
                                        <View>
                                                <View style={{ 
                                                    marginBottom: 10,
                                                    paddingBottom: 10,
                                                    width: '100%',
                                                    flexDirection: 'row',
                                                    borderBottomColor: '#000',
                                                    borderBottomWidth: 1 
                                                }}>
                                                    <Image
                                                        style={{ 
                                                            width: 60, 
                                                            height: 60, 
                                                            borderRadius: 10 
                                                        }} 
                                                        source={{
                                                            uri: response.albumImage
                                                    }} />
                                                    <View style={{ 
                                                        flexDirection: 'column',
                                                        marginLeft: 15,
                                                        marginTop: 'auto', 
                                                        marginBottom: 'auto', 
                                                    }}>
                                                        <Text
                                                            style={{
                                                                fontSize: 20,
                                                                fontWeight: 'bold'
                                                            }}
                                                        >{responseTwo.songTitle}</Text>
                                                        <Text
                                                            style={{
                                                                fontSize: 15
                                                            }}
                                                        >{response.albumTitle}</Text>
                                                    </View>
                                                </View>
                                        </View>
                                    </TouchableHighlight>
                                ))}
                            </View>


                        </View>
                    ))}
                    
             </View>

        </View>
    );
  }

export default Albums;
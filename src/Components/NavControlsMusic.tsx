import React, { useState, useEffect, useRef } from 'react';
import { Button, View, StyleSheet, Text, Image } from 'react-native';

import { Audio } from 'expo-av';
import Icon from 'react-native-vector-icons/Foundation';
import Slider from '@react-native-community/slider';
import { TouchableHighlight } from 'react-native';

import styles from '../styles/style';



export const NavControlMusic = () => {

    const sound = useRef(new Audio.Sound());
    const [Status, SetStatus] = useState(false);
    const [totalTimeAudio, setTotalTimeAudio] = useState<any>();
    const [atualTimeAudio, setAtualTimeAudio] = useState<number>(0);
    
    // FUNÇÃO INICIA AUDIO AUTOMATICAMENTE.
    (async ()=>{
        await sound.current.loadAsync({ 
            uri: 'https://dcs.megaphone.fm/ROOSTER2214960577.mp3?key=2c02f49702ffbbbe2d05de4c90cc1ef5&request_event_id=9ca20d20-ad48-4a0a-b235-34815362c1bf' }, 
            { volume: 1 }, true)
            .then(( async (r) => {
                if (r.isLoaded === false) {
                    console.log('Error in Loading Audio')
                }else{ 
                    PlayAudio();
                }


            })).catch(err=>'');
    })();

    // PASSANDO PARA DOIS DIGITOS
    const padToTwoDigits = (num:number) => {
        return num.toString().padStart(2, '0');
    }

    // CONVERTE MILISEGUNDOS EM MINUTOS E HORAS
    const convertMsToTime = (milliseconds:number) => {
        let seconds = Math.floor(milliseconds / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);

        seconds = seconds % 60;
        minutes = minutes % 60;

        hours = hours % 24;

        return `${padToTwoDigits(hours)}:${padToTwoDigits(minutes)}:${padToTwoDigits(
            seconds,
        )}`;
    }
  
    // FUNÇÃO DE INICIAR O AUDIO CASO ESTEJA PAUSADO
    const PlayAudio = async () => {
        try {
        
        const result = await sound.current.getStatusAsync();
        if (result.isLoaded) {
            if (result.isPlaying === false) {
            sound.current.playAsync();
            SetStatus(true);
            }
        }
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

    // VERIFICA O STATUS DO AUDIO COMO (TEMPO E VOLUME ETC...)
    setTimeout(() => {
        sound.current.getStatusAsync()
        .then((e:any)=>{
            setAtualTimeAudio(e.positionMillis);
            setTotalTimeAudio(e.durationMillis);
        }).catch(err=> console.log(err));
    }, 1000);


    return (
        <View style={{ marginTop: 'auto', marginBottom: 50 }}>
            
            {/* IMAGEM DO ALBUM NOME E DEMAIS INFO */}
            <View style={{ marginBottom: 50 }}>
                <Image
                    style={styles.imageAlbum} 
                    source={{
                        uri: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUVFBcUFBUYFxcXGhwZGxoaGSAiGhkjIiAgHCMkIBwgIywjIxwoIRwaJDUkKC0vMzIyISI4PTgxPCwxMi8BCwsLDw4PHBERHTEpIigxMTIxMTMzMzExMTIxMTExMTExMTMxMTExMS8xMTExLzExMTEvMTExMTExMTExMTExMf/AABEIAOEA4QMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAGAAIDBAUBB//EAEIQAAIBAwIEBQIDBgUBCAIDAAECEQADIRIxBAVBUQYTImFxMoFCkaEjUrHB0fAHFDNi4XIVFkOCkqKy8bPTJFNz/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAECAwQF/8QAKhEAAgICAgIBAwMFAQAAAAAAAAECEQMhEjEEQWETUXEUIoEyQpGh0QX/2gAMAwEAAhEDEQA/AN8pXK6aQFYGgop0VxTTkWNqAOxXQtdApwqhHFFPUVX4tHKjyzDa0PtGoFpyJETic1XuW7vkxJNzXMgwSvmTj1D8HTUO00xF9kqGa5xNm6Vt+WYZTJDHf0H0sZO5gSCYOcxmpxvC3Xs2vLY6wAWIbf8AZt1Bz69PcTviaKA0VHauBfV9h/OoYbzEOdIVtWep0xI/9VQ2UueeJDwWeWmbemDoULMqwxmBMHJkUUFmiFrumq1u3d8zM6NTNMiCCqgLEzIbUciPfNP4W1cFy6X1aSRoz6YgYA1nrP4R8mnQWTaa5FR8ztXCgFvVOoE6TBjM/iX2/EKtqmKKAh8uuFKhe3dNu7Eq7FvLlsj0gDIJj1An71G6XDbukBldtRRSw1L6QAJB0jIJ360UFlmK4RTbyO2gqCvqBYEiQIODBI3jYmoHS75wYf6QGmNW8gktEd9K7zhsZooLJylROD2qM2L3myDNouMTkAW4x7FzkewI61x7F3zJGqNSwdQ0BdPqBWZLEzBg7jIiKVBZLBFSq01KFrkUFEDrOO9cFuOtSutMK+9IDoNNJppNdFIBZpUtNKkAwilFOBrtAEYAqWm6akWqAcBXQtJaSdV0wBEbQfj4pkjwtdVaeq04JQBxPepBbHauqlC3iHnV23e8u0/lqoGo6VMkwc6gcAEfrQ5KKtkSkoq2EXE21UFmIUDqTArEXxHwqPoa+hYmMEnIwdhjOKDOLu8ZzByUM2l9AZoVTkyYHU4mO1IeALpz56Kfa2f61cuEf6ns2WOTV0epcNcVxKMD8Hb57bGptFeR27vGcDft3brl01jUyn0uIK6WwIMHAOJgjNexW4IBGxE0UqtEyi46ZF5dIpVgp9q4yxmgkrFajidq808QNxvHklJtWQSqqXYeYu0lBvscn7UPN4d4zhpKEsp38p2BxkEjHX5qXKKdN7LWObV0e2FabooH8I+Mi2mxxBLPJGs4I7BhEz7+4o6JHffb+/zqmqJaobFIilO/tXQKkEMIimmpGFRk0hkTio2NSMurA7GmNwx70DIQ04qUinpZET3+36UmWkBH9qVP0/FcpARRThTVangUgOzTkBjNJRUirVIRxT/z7VMFpKlOYQJJgDM/30qhM6qVMqe9NsgywPQ/yB/nU9m2dTEtIMQuPTAg56yaBDlShbxnyQG3e4lWhktMzqR9QVTkHoYEUU8NxKtb8zKqNWT2UkT8GJ+9Y/PeJF/grjWw2jVodWxqUjTmJhfUrH2BpadWJKM2kwB5Txb2bFsLo/aDzCXLBQG2AChmZoicQO9EPB81Y2rrFE1249IunSwxksUDLGcFf41ByfiuHXhbbuyqqIiknuFiMZnBwKq8Nz22rMpsuQx+oI8GdyfR9IEd+nyJyrlJ6PSS12Vebceb/D3lZbZ0jVNq6XKFTqhwyqRsYO0iN4r0X/Mi3btzvCCOuwn9J/ShXiTYu8Pf8twVFt1Mfhlc9JB9jRWeGF+yjqYYLExgxg/+WaqDXGqo5c+mtjhzS2dJmATBBGRIMH4x71Jx160LTlyGXSQQDJacQI6mYxWC9vv+fv8AFIWFYMtwAhlIM7ZxHxE1fRhFW6KdnjVNt38u4ChjRpWT/wBMHSR9+lVrPGLcYLpe2W+nWBBxtKkifb57Gm3RbQKLaelTEABV9IwAdu36iricqsqwe2qgnMqAD07b/wDFcqSc9o9DaXZ53zrgmF0vBS4r5+xx87CCB/Gj/lt2+ypo1EABtJMgSIgk/J/jVDxNYt+ajPgPKD3YCY/IAT70QcBxtu3aEAliASO5+ewrtk10ceROuRqW1OkSIPXM/wB964obrBydsQOnyYpvD8UtxC2wE6gen9RFU14+0xW4XKiSuk7A5yY6R9qgzL5FMZKj4bjEuEhDJG+DVgipGiBUjPzTtdJjJj2NQ8RcCwACxJjHT3J6Dekxkk1E1wCkpyck/l/c10gUhkev2pVJH9xSoArslOtiKnFIJkf3+v59KAOKAanRajFuKltg/wB/3vEU0IczQCRmNwN+8DO9CnOueXVd7aSg91htJAxpaeur1Dofat3iWa1cNwJNp9IukH1KcjXEbAaQc7QehqfmvApfRkMB1XUhPXsQR+EwQf8A6qZ21SMMltUuzL8GcISpuM7MJ0qNTQsbyJgyCsUUWr6MSquuoY9LBmG0nSO0j9KBrHM34fhToVh6mdrhB0hQonAzqgE9IxmhHlHiO49xSn7JEn9pqypIiSABqgEegY708abSSQoSfFJL8hvxHGXb+lWKsVkDSIkHecxGKxed+Lm4W2eGtNbc3PqIzpJhTuM4EUO878Tkjy+H0hQNJuafWw2hZyqx9z3oVNwzqmSDOc7ZrfHg4/ul2OEadvs3uD442LjW7lsOFcgg9xIkfbrRnwnP7YcIGXytMmSwYY2IkiqfiDw7/mAl+2pW4QquNwcDQTHdYEj2rH4bwbxLM06ViJknM/bPWpnwltumd8XKurLfA8YeIu+TYt6Rcuq5AaQVQKPUe5g5969E8PXHDtanSHB6GVjeM4MahPeDmgI8iNi1ea2xd7Xlu5Aj0g6nVZ66CpzvRx4W49L5a8hFxgvqCn467dBg9e0VLinTic+ZS5Jk/O0FhXutItiCOpO0KAcydoNCSc9uglrotpbJAQCdTmAxCjqqqWlsZjEzVrxMOI4niTw9sMVtE5JOlSxJ1Odgc6QCdhjeKx/EKqwIQ+m2NCED8Ix/7j6j7k030GNbN23wVrypUwjZBKod8xqZSYzAziIqhf51bQi3bIGjH65/iayU5Bf8vQpZlKggF3BWRMQCBg4rO/7tvb0tdOAfp9t8ntP86xVOXZ1266CY8zW5fsIFF0sx1kj0op6ht9Rhft81zj/EVxbz2nsW/SWB0krtJBnaCPaqnhqGu+Y8BFmMQAFGpj/8fyNafiDw2/E2xxPDNpukajbc+lsYgz6XiB+6Y6ZNb9nNkK/DeJbZBTK6iZAM7dzgmOsCrqMrDUhDL0Iz/WgTld68t0LeKW9Lf6jMAbRgiW0y3cRHU9K2OE4m2oLWbjtdLevUyG0wzlcLPqOSdgD7mgyPReT2VW2CBBbJJ69o/wBucV3m1tmtME37DqNyKxeB8QeZa9C6GEAgzqT2g7jeCf4g1Wv8xuCZuMewmC2JgUqGRcBfFu8PMBUCZBBgYxjvP8aKOHdbii4ux/8ArNB1xpO3zP51v8k4pTaC9VJH5yf4EipY0aRfJzVd7wqK9dO1csJUsok872NcqTy6VICwtSpUYWo7/F27f+o6pjVkxI9p36YHcd6Ym6Lq0/WgwWUYnJG0xt2mB8mg/i/Fvlkrb0XZ+l4ZdJzgqR6ojcEfnWI/GXbjs9xmllCmDA0nMaf3Z6e896h5UujnnniuthHzzxDkLYdgB9TaRpb8xq3/AD96xeE417JFxWA9DIAQZKj1HG8eken852quWwZUHBxPsfzG4/OszmvHMkhsalgKGwsht+sj07gTgCM0scZZJGKcpysq+JvEd69eUC4baWhpti2SqgjBYQd+nx95xOJ4q5cjWZ0zEKq77/SBJPeldUEKAZPfqP8Aiu28ypGV/wCa9qOOMVRtKT6RSINORY9QOx/KKmv2YYqcbH881LatDT0ms3SY0er+EuO8zhrDswYlfLaVAEqTjSBERIHsKLTwtqNRUARJgkRHsDXk3gHmB/acOx9Mh0/2memOp/ia9JW8WstPVJ/TNcE4JyZ0c2lozOXj/VgRr1EiZgkkDffAUfavO+C5g/BcTdRMKGZI6FCcA9wVivR+AgavsK8o53fD8Zf7ea4+ynT/ACqoR9ImUm9s9CTxXbvW3X/Tu4iWADHuCYg+1Y97hydSAGSCIzMx/ChjldlTdUXCBbBknt1EiR+lENvmKnU5XcE9x/LHT4q5xS6Y4y4o9C4a/bNkXXCiFltjnrnrJ/OvPvEvM2ut6VALHSij32Hydqv3uObyXUGBrWcACNJIIAJwxV+301k8m4c3bhvNJVML7n/j+J9qz4qyozovcFwmbfDrsYDwfqEgt7wTJ+9F3NHNtC1s6WwAdwM9jiKz/DfDhrly70HpX+J/jWnza3qthRuzqB7ZoomU7MXiOT2eJBu8RbV3aFLKXQtH/Sc9vUW2qLgfAFpLqsl655eloUkSrbgyAJEzIwds9t28FUgdFH5dv4H8qtpegB9BMmJEemepG8bbTVENgjxlxU0QgW7afyrmjSLTqRKlVERO+qN8nEAWXZSARkEAj7j+dS+KeXj9lcdSJby2mRrmCB9ofOcE4rI4Z/QyZBDMik/VAkgkiR199utJgh95o/v5q14ctnVchiAAJ7ddyfvt/KqRAeBbBJACmCWkg6SfY4z70Scm5cbSHV9T5PtHSfualjJktGfarCIal8uuoDicf33qShuj2pVLoFKkMYtY/inlV2+iC2oIQlo1QSYiBIjvmRW2g/4qwgoceSoicVJUzzG/ye9ZjzE0ztkGPmCc9u/2NOtgTpMTvA3z99zB/KtT/ErmNy01oW2jzEaQVUj0lSCCROrJG5EE4EmRTwnzhbXEAXtLW7npZ3DMyYgEZn22MUv0rq0zH9G65JmpzbjvKti4IYfhAG5OQS3QY/uKFuJ5ibuWEEz1EAdIwDvJkzvW7z2yOIuXbNt0UC4rLqOCSswD0MGDvOCckxQ/7m8SVALpjtJj7xTx5seF1JpMmLhDTezHUgEdfb+lTcMsXgCZBitAeEL/AFuLG/4q4/he6Gk3Vkf7T/WtVnT6ZanB6TKnF2R5hEk6RG9UnvESASCa2D4buCSbye5Ib+NMveFr8Ai5afUJw5kR3GnBq/qMuiv4d4sWuIR2MKZUntPX84r1uxxkr5agMXTedgcT/A/fevKbXhbjPURbDBRJIdMfZiP7iinkvM+JtBVPC3LlwSBJEbQANM4jMYE5qG7GGVizoEsTg795Pt02rxbmZC37kPr9bEnSVkkkn0kk717HwnNFurN30YAIggMYGqAZgSSBJ+9B3NPBYe+1xLui0/qAKM7Z3jSYjqM9aBAuL2zDaM+/WtG3xaSq4EiDnrk9faKKuWeELaiBZe5/vutpX/0Bgf0ogXk/DIoRuHtXGG37JWJ/ME479KY0eb2eOUWomSbYWB9X7N/LUd5Ktcb4rc4G4tq0oYMvpnKmT3OmJye9GfBeGCxLi3b4dWzCKuuPmIX7An3qc8n4K2wBdNTYJdgxJzMlpz7TSAo8jdbfCpcYj15+SxnA+9TW+MFy4o0MoUM4JIzEoIHbLdelTcPyO3clLd5hoclkAlRqyIDCV6xBgZHSoef8IbGlwwg2jaAE/h9Q6+5oA5wya5un1FjKzICr0j3OTPv2q/wT50nr2Bp62wqhRsoAH2EVy2IcTnpQmDPNed8/4i9dexdKTavqAADEqtxZyZMwGxtJq14cum7cfzFAHmKCDjJLSI2A/KJArc8bcvt2/wBoiAPdvIznEsBbZR7hQMYgb9Saoco4S5cu65AD3lZziR0wIjIIHtntFDAMBwqofSqrO8ACdzXESfUZhgAFgiCCfhs437e9SJxC+lHKa2EldiwIkEqTqHYzOab5zNGIBE7595BGwxmoKR0sP7/uaia57VGtrM52xP4R2AjAwD3/ACrvtUsY/wA2lTdPvSoGWEOQP7x/91Kz6VJzgThSxgbgAAkn2Ge1Mtz2x8/P/FS74BKyDkDIjqJBH5jNNCYGf4p37fkW7bqfM1hrbAjG4cETqAiOkHHavKrlFH+IHEh+L0hAvloFJBBLEyxLRsZaI6ULp6se9dKVRSNeoJfcMOWWrbcNbJIHpE53YbyNydQ6dafatIWU62t74DQDGPqBkD7fesrlNy6iFFQOQQwJEgexHUSJioOIu8Q1x2Nz1BskKNz6sY9/1rhyeO3J2zgfhZJzbr3oLf8AL3QP2d1/hodT99x+f2p3C277MA9sDvcX6R8jf8qGeC8Q3bekvFxFJBEaTJiDjBOTuMxRzyjmNttNxDqV8EqOu+QMggxuJ3xXB5ay4o8opfAl4zhlSmqXwWH5EhAKmT3O32FVn5dcUwikdx3qt4s5dfVH4ixefR9dy2HOnAiYGCsZI+T7UM8q5ozfQ7I4ydLET+ua7/8AyPBzeViWWOZP4a6f2Z25XCL41QZFdbNpthYyUEnR7mdh+naupcX06XhxJaWgLBwRAnas2zzhmxcP7QbXVw0bFWjBUiRtj3zVnglVNNxSpOrCnPQGSOqnb7V25MU8T4zW/jp/KMtejd4bltsqDcuyeqj85neKJeEa1bRUUqAqgfkKBLV0/UZKTE9FJE/Fby8Fc0g+kggbHuPcVmAQvxdsZLr9sn9JNU35iMlFCqN2b+n8z+VUuH5U7Za4AOyiY+5j+FWW4axbAa4Q2nOq4QQPthQfgUAUuJ41rg029VyewOgfJHpmqtzk19yrEIuk4ltv/SCKn4zxXaXYlgNgo/mYH5Gm8Pz645BFqB3Zsn7Rt7z+dAC4jl9zhj55YFTC3dJbUBPpIxsCc9/0rI5k1y/c033ItZ8pgQDpJ06wRgnUOvSO80T3eZ3CsQmR2P8AWsDn3FrctJbVQWQCD0GIKjvMfoO2ADQ4N7gw7Bh9MkQQfkbg94qxcdumkkZiJPwBO/8AYrIscRKo52cBW9zXeM4tkts6iSikiepAxNFDsyfGvM7cWrlxbUpIK3JkxDLoAIOfUJgxI6GaFG8bXGaza4S2V0vrKk+lz9RkAyPVqJbVJGDjFQcx5abztxF+4dIGn/cxBJj2GdhttiK1OQclFubnlkGD9IkoIxPWdixzH2yCDTknHq6aWJ81VAgxMdAGCidiu0womYmtK1bYH1EkAQJAnG5JHfeIG1B3JLxXi7eJW4pRuwghgfsQPzoyUCNAOPpEGCdMAzAEEEEY6VLQzoBOQBG8z/ID4qMJtIg9czH3gSPtVlJgz3xjp06mmutJjIv73pU6B7/maVICVYGcfP6CkYU68lsgKN2HYAmB0JIiYE1AwLJDBRiSTlVIyDmJggHp809zMW2fDAqwUQ5ldwQcRk4B6bb00DBTxl4cTiPOuKdN22oYtp0h9yFIj1enSA42wCcRXlvLRrcR3/ka9C8e+LbgD8JaEXNSt5lu7OlcyrCBDkjI7HNAHJPTcAYQQ4kHfKsP6VtBvSZSk+g28NctR/NLkADT+EE9epBj7VmcZwaB7mgY8wxHsAOlPtXmR2UEjWO5Gx9sn6qucl5Z5j3AS2H/AHj1VT/P9K580nzaR6XjRjGKnLoFePs6Uk9XzJPSfv0jp81BwXF3EYeWzIzQPT1nYR895oj8bcGtpLYBz5jg5J7xuT2obtKJnqMitccbhbOHyZKWTX2PQvCniBm/Y3mAfIBgabkCSCDs0bxE+1ZnPuR+Xc82wgADD9mpJ1AiZQH7jSJ6RvFYHLW9Y9UaSLmTg6SCc/YflR/xHELeL2mJt+r9jcH1I2w+x2jrMdaf7PCywyY9c1tfJxNSp30v9Apw/HKzDddxBHx1/OtrheIj0zjvVBeJRi/D8WBauqQNS4DaQdJn6Tq1btIGY0zXOK4W5aWWkptrjuBg9mBx2969XJNeR3pvr5/DFFtb7Ni9cBJCghd9Mkx/cnerVjxBdRAi6fTiSCfjrnFYi8UFW0yMwuNKtn0jp8iQfyrS5XoRyL1sFSBllmDuMRMGT+leU9No2NA8/d0zceZ+kQDPsFyR8mqX+Vv3TJtsPY4Hz6ok1sJzXh0wpVfZUI/kKt2OdWhlVdj3gf1pAVuXeE2JBuMs9t4+ff2n86JLPJ7a7lifsJrL/wC3XOEtx7tn+lO/7Suncx8R/ITQBQ/xAL2bNo8O3ls14KzQGOnQ52YEbgbCapeH0PEWXuMZZLv7oBI0qSNhnJYf9R71n+LeKvtctIsMsB5ZzAMlcAGdRDEewmqfKOIHm3Laq6xk5JkwgiRgsIOd4IHSgAj5yVtDUoi1AaQRgyBGTkElTjqayTz/AIfSwa9bMzKllk42CzWH4s4l/IvqScaRncL5iMPj8ND/AIb5P5ku43gDt3Ofcb+x98ABFyq2b5tu86FhUkfVGA5H2kDqZ9iSFPQA8sv1RGZlEMQehkzUCL5fpK4IiPdW9sREfpVlLWsO77w0LsBAPftGBQBiPchgoaCT9xgkfAnSftR9ytma2pYnzNA1Ezp1bGJydh+fua83uXvL4pWJGkiDPSQJP8vvRXwHOUGi29zQxcp/pz6SP34Kga43nYZyIGATK249z2x856/3FMg9cfFNscQpE6p+oj4BgzJ3n4+Ke8T7jv8AyqWUiOKVOn+4pVIyB1bQV16DEa8Y6AgNIOf3qzue2tfB8R5h0oLTZMQYGDMbyFMACCY+L44q23pKMApAypVREEQTAIkDAntQJ/iLx9vV5B+p7YuT51whXVjCi2F0gkSJMTMmCATcFbEwG4ew6wRPqRXMA/vMo/MdqsOWRrdxpkqYGZOhtUflWit8W+JNtATKIjDP4AVBOT+HSfvUXifiIHDsAJVrhgH/AKMb467hd9judX22NaL/ABstpddgRkdmx22yDWhwtw23gu8On4GZRKmCJWOjDbODVLgOIW5YNsDUQNPuVIkH5gx8iq5tMZDSWtnad++Jj1KcfPzWXkR2pL2d/jSUouD9b/6EFnwbe45Aystu3rlXdmZsek4kseu5FEVr/DjgbVoea1xmUeu55mgH3gtpUDaqvh/iw1pOFtufLunTFsHAf6jrX6d5Jkdd6zv8VeclntcHb+i3+0eNpMqi/YBj91qcbdUc3k253/ivsZPMOS2E4qza4K6vEC+CAge3ca220M6SNMEn4VpJAop47w3ft8OSdDXNBhFb1MQsmJABOCYmcVl/4S8tGu7xTZ0lbKf9TQzn7Jpz2Y0SWOff53jLQsMDZtNcaQMuQjJq+PVA9mnrhZ8ccqipf2u1/Jz+mvuBXOFHG2g2P81aQHG91Bv9xkx3+cY/KOdG0mltT2yCkHPlzvpkRt+E/pmtPiSw466vDmX84oh/3E6fyljNen8B4N4K2S5spcdjqZnGoau6oZVc9hPvXZh8j6cXCStPr4/BzQhJHnHDWrKpNvSy3TqUZIScQCc9sHrIrW4fkXmW1YXdQOVLAsQDkD6toijriuTcHcm01q1qCzChVdQdj6YIH6UK8dwx4M+SjsQBIJjKknf33GO1ccYvnKTfbOlvSRNa5SP3o+FAq3b5bbG7Ofv/AEFVuB4XirkFQ2k/iYBV/UZHxWta5LciXu/Olf5sVFaCG2uFtjZf1NWAUXoo+Y/nXbfKLf4nuN/5x/BRUPGcnRFNxCwIgQxwc9JAM5pWAFf4ocSUWzctvDaihAgiILfnNDHh3mTEO1xz6SYEKB6tyYE9B7UT+M+Hm2mtQYYkZHY0FcYBbACjTqEnET+W9MDa5nxaXrbW9UeYbaT76x/UVc4aytsqRJDEiJ6LA2jcyTPWaDbN6blrP/i2/wD5CvQlCrbOrAfyyrmPrOtyAN40gKT/AMwAWbNvGpjGDAnC9u+f4YqG/wASTIB9JMx/fyahHE6t5gZgfIB+9Zd3j3uP5XC2zdc9QPSvydj/AA/hTEUuc3VW4XZgNI0qNySdBwNzU3Dcd5l/zLgLW7YZiiwV1DKhokMshiV9+m9X/wDufpt3bt4+bdFtmH7ikKT7Ex9h7VHyrkTElxi3rUhZgMSGXQWMDTqx1MDbIoAOuS8eLlhGW4buFJYjSWg5MKMEEEaPbcjNXluhgDt1g7j7Vm8JaZFS2gGkgwU2WIIExpkgjGMTAqd7b7FT/X7/AJ4qGUizrHcUqq6X/dalUlFpLIG2BkwNsmZ+f6mvFOK5d5fFLBNwg63ys61GpgZkD1CIYdYzXtKkm5GgSqyGPv8Au7mMZ26b0Oc58Li/cF5Ha2zEC5Khl9JU6gAynJCk5OJ2NVB0/gcVF3yPOOCci7cdSBB0Ax0HpER7KMVF4gJbyxuQhY5G5Yg9JkaYgycdBCg4seGLVtcGVIABYEHsZA7mOvtvQfftKbjLd1W2UsM5GWZwYkGCHGfvmtlJA2qKvh3mHluAdhvv6l6gD94fUPuKJ+K4ST524ABI7rvI9xM++R2oK42z5bBkYHM4/CRRX4e5uHXy3gKT6h+4f/1sYP8AtJjYihbXFlQk01XYUeE+Ii5ddBKWrT3V7BjCgdyDqJBz19gM/wAScNcuW7lxDN0iDjNy2DOnf6x36xjc1KXNhbtu3b1Let6WGf2cGSwAyQROJwc+1V7XFKkeY5eY0PMn7Rsf9w36++Lg4OmaTbluJochuv8A9g3Tw6s90u6lUBL/ALRltkgLnCEwR+77VP4b4b/sjhH4viwRdvEKtqcqBlVP+4nLRsAOxoW5levWrhvcNdezcIhgjwrjJyB6dUkmNpJO80O8Zx9282u9ce44xLuSyz0E7fAoVMxljnHtB/8A4bcL53FPxDkHyg1126G5cLR9v9RvbFem8dzG3bsve1KyKDBBBBMxEj3x+dea+F73+U5U1wAm7xDs6jqR/pqI99BP/nHeiLguWvFiyylrfBIuIJF2+QGLTGVt6sHI1Mf3TQzO6JvDNk8PbuXuIJfirzBnEAGTlUGcQCScwMiYWsjnvNVucUzJBFllt74JX1N/7iw+1QeI73EWke6LdxTLJaYq3okaXuv+6xHpTUZ69MjPh4k61PQKf4g/yprexJ2ex8Bze1exbaWjUVIMr89Overl11UFmIAUEknoBWJ4S5f5drzGjVdgiDMLGB85P6Vr8TbR1KOpYHcQc9cxQUDPF+KBkhgiDr1j3JwKwrvjCxOWuOROdJI/M1a8X864XhbL6bFl7hJtoNKPpaD6nMELG8TqPtXj1y+s4XfqwEnGZPzNCEH/AIh5xavKBbadMn6Wx07YOaDOfv8A6ZEZ1bT/ALehpcvcMWk4AG42OAY9smJ/Q1zxGcWwFKwXEGOpU4g/b7UwL/IuVWntC7cdgwJgagACD6cRPatzj+ORuHteYVk5IEEn1XMBfb+dZHhhPTcEtqIUAAbepcy3p6jpXLAQXJl2fROdgCyYXtidu5NABDy7ll68UuXD5VnUIUfW+4z2z3/LrW1yO5Zteb9NpB9RJhfSzCST10lTPv7VftoFtATMOh/NwP61i8NeVReZ012/LFwKAJMO5YZ3llmPf8mBtcXz/hRbuq1wwEMtobSQwEQ0QR6lyO9R+G+dJd027cQWDadUM0iWIGnIxMBtj8ihy7xQBe4lv0G0CiSMGFIjBWQVGJj7Cn+EuFZWF90bUum6IVjCuWAEAZOmTO2APhAj0W4HkaQIOTJIIONiMRHSKTGTtBiZ3G+QDHsKS+zSM5mevxTUf0iZJ2JMTjBOw69qkpCilXdVKkMjRBjJMe+/zGDTL90i4oEABWJJBO5UAAAjJ9Wc7e9Rq5gzK7iTAjJ9Uglc+mBE9/aVSR6tKjfV3MDBBx+R79IykBk88/0LupA4VLgt6iHuSVIGBM6oBHtk+rFeMpxTPkxJ6xn869u4/hlu2rlsF7e1p2KwzoPUyqTJIKswDKDEtGRQze8J8CpN2COG8pQogszNcb0lWU6gVwPUDvnE1rCSXYRpPZ5tcaQQQINQAtbIZTBk57jsRsRvIO9FfiDw35IF0T5ZhSqrqYHpKHSyyoBPSZE5FYt+wBqxqWB9p6Ebgj9K0eRM1k1OndNG/wCHfECEaXx1K9Vj9z95QPw7jpNaV7l6lWu2yPVJK/hM7iOjTOffbrQB/luqGTuAv1L9tz8ia1+Wc/dCBcJicsBk9tS4DZ64O+TQ8kZLi+i4tra7Lt60yGHB9kPb/aev97bVD/lVumI9RgAfizgZ67/81tnm1q8F1QVGZWdI3GRuhid8DvVrk/LkfirRU+lf2g1ZEqpYEHtIXOaycF3Ep5eSqQSjlaf5nhOG1J5XDW0ZgSAbjKALcTv61Bgbx9ibzXjvii95l5/LBdNWIBMwIAgdsx/1UScnXintFeNvHyyI8k6JKx/4rkTEf+HMmQGgEgzT9nO4asNOA5hbvKXtnUkkBo9L9CVn6k3GoYPQmvK+eC3w3NWtW1hboVQo+kM4UwB0zpMdmxRze8QWuHsi630sB5Sfju9JHZMfVAEbdAfMOG4tG5hb4u+0nzluvkQuQBAjZQBA39IoRHFnsj3Bw9iT9NpM+8Dp7kx+dBd3mnEcRAZjDHCIMH7DJ+9FfPuCfiLIt2riKHZSWYFlKfVgKRJJC9R81m834yxyywHwXPoEn1uYO3tj2Hc92Sec+JuQrwvCn/M3QLzuDZtJmM+trjZn0k+kYBIyZoWPD+nTAn96PjrWzz3m54x2utb06Y/FqAifYZifasxV9XtP9/w/WmAzl1o6nEgEaZ985Az1/l81Lz6yfSxkgMwn3BHX7zVjhuFUF2JCn6ZMADb+Z/hiu8+ssxuXFRgob6f3NXeP4wKALPhWGa4mxKqS8mQNaRuNI65mfTVvhg4dCFEaIDSNWqBsO0AZ+1DnLGWVkSdQ+RsMHp9jWwecNaICoAUUEa8z76QR/GgD0Bx//FYgQfLQR/0w38zVb16GuJGp7VwLMGTGoAg406tYz7UFPzniXJR7um2Fz5WkDIBXu2dum3tVzlvLbTs3nXRcCicsz6cznWY79PtNMDQs8S5YXA6i6LXl+hFKq+llRNKyFYkrCnuBW5y/nS2V0caLiMpGq6CXtM0iBqWSh9StpMadQAxFU+XcpsrdYqy21ZYtqQFLlSoYq6+gCcQROcxRNw3DDQITV6SpLBZkxIwT9TQSZIgEHEVLGi9w1xLlstZZdDFirLBUk5J3g+ok5if1MgWABJPud6y15DaVhcsO9oxsh/Ztmc2z6Y+AKvWDc0/tAoYfuklT7iRI+KTGiWaVM1ClUjOKZxXTchdRUmDsBJ3icx0z2GcxmuA024zDPQEGAMkZnJIAyQfgHvhIB5tn0toSVHpOCbcwDB6CMY9ulZvMuKVR6rWoXTLMCNI06SzPrIGFUQVk9owTfZ8eY5hbYJOqQMTLTtpAJ/D79q8W8V+J34m4ywBZW4zIsZziSYHqiTtOYMxVIKNnieKN9P8AM3RosJdYK5Ytcu7CANJJUACZMA5ERpOSqLduF0bDMdSgQTOBGwI2IBAI+wrFTmVwW/K1ny9WrSQIB9sSPtVzheZIkkoGiN5gfYd9viapBKvRc4vgUQzbckjMbR2O/wA1HfcuJbJPUAAz7z6T9xPvRO3LE8gO5YHXp0mNNsMNUgAA5lDnfHfOdy42LrHh7jXLdwXD9KSSQIK5OkEFd+wPepasuE+IPKgDYYqfjb7g0Q+HLV1i5W7aVdLq0t6wGEFtCglhB3IjeSKf4h5AbFs3CoCfQwJlwSTpOBGlgVGMgkj3oUsXGD60LD4JEUqa9mv1FLXE9Efj/wDLkJZt6iVnz7p0L0BILEADIwpJzuYqlc8SKoYibxSNV0qfJtztpQgTkGC4AJH0neha/cldWos2katcEk+0QY3703gebXLVpkVF0O0sSoJmBoyRjQV1rHUmZGKtNmUpJ9BDxt1rlwG8t3zXz61YM24wPbOBttTfKUjXpfTpB1Q0d5mNoIz71Be4DiXe3ptpbfPEpoYxqZrctLsTOo28fSPsxpcLcv3DadLVv9q1y4iFf2ZVLflshXVIti2AAu5EGTvTsV/Jq8JxnE2EOi5ft2w0fiCAzEZEAzj5rN5jae5+1uB3LguXYkyF3bf6QOsQKjtO2hDcQP5gS2bmdbebce6E+rRl1Zi8YmOxrvNea3bYtXEsoior8Os51BSAwYaiIJVlyIYBx0oM2ynqCMg0wAC8ERqBXUDBiQQZHcEdKjt8UghSAT/fXvPeqPNOZ3Lri64AZlAJB7DRkdCY/XpUvJ+F8+8iXHhApZysArAxvH4io364oEaOiLnEOIUeTd0g+6g6h85E+1QJxql0RCw9Fv1Nt9Eme5IKj2jrTPEfBG0yoRIOFuMsY0gwSCR+PoT+tQcfyG/wyrcdZUsBmMbxs2xA6x0oA0OX8bbNq4ALbOCLhY2lVhkZVhkRA95I3mrT8qIBe2hc+mcgnOZyNsdJ6nFZvK7SM6hrYVT689B9Q9OsEjBj1CYg0dcq4WXtQ5tlzNpCpm4ugEzJ069EHTjKnLQwoADPDHKHucU+u3ce2pcOVnQjBW06tJhgDEAHaDtgm/E8oRYucMizCq6aCVcyDqHq1LoOoHUN1Ekb0Ucm4d0UjUmjdFVSGXJDFiYnUQGjSIJYZEVKeAtif2ajUzMYG5YQxx1YYJoAw+S2RptRqYEs7AIy20aSsAsAYBbY5IkjBoh4VYGkppCk6cyQOk9jkiJOAPgVQoR9Q1amj1MdUgQCTmYUD42Myatou+59ROfyxHSNv60hj9U5k/BFRau2enfbvnfpTmOPemM1SyjmaVNk0qQDGY9Nu85H2iDiTnttUoeogKdSGZ/iC2XsXE0kroY+ltMaRK7ZIncCcDYzXiTMCOhgfBOfn2Ne/IDO+O1ea3vBl65fur5bJbViUfUull3CqDBk43wIImizbFJbTAngeXNdfSmPnp0z961uG8PftvJZtTMojSQIkspBkHIjptXpvAeFOGSy6pbcF41hmMuUaVBgwF1CfTGDVPlnImsXrl27Lwqi2RqA1EAHckrsBBZgJwRsNFLRhJb0ZnFsTcurPoti04TGhtJRZcxOV079iMART35GnDtd41FNwqouaNfqYu41HbGGbAk7j3ra4HgI4tmIXQLt0TIINtkSJk7h1dYq/wAw03OJVLgUW0RmkgEPqgYM+nT6gQe46VMtOxx60C3OOOPFC2gC/t0dGUmSjsiMpIjOhlBB6kntNCXMODucOhtkggkE4E4nrv1PWifml+yts27TabutlRgs/wCnjcCPpjHUn5oM51xIONR1DfbP5DFUkmP6kode0UV4wA5AO+DStcUA2RI7TWjynwtxN4awpRCD6m3P/l37H3q3xPIuNtSPRcCwMZJBxgEDFMzKR8QXywYPpgaRCoJHo3hfVPlWwSZkKAZEg2RxnEkoEaVUI1tXKMECgIpVWBCmCowASYO4msu/yu4jQ4C5M5GP1++9T3jdUDTdBAXRIXSYx6Z3/CM/1qW3dI0jGNXK/wCCzxXMbwRWLR9O4RyWQkqRIJRl8xs7mevSpxnObl22yM7lS4ZVMQsaiIAwGOtpIAmTM1XJdlVJAjGlVAP4dziT9P5U2zy+8/pCtE7R85if1+aav2RLjf7eiLhfqM7aTOJP2nrMCela3hG2H4pLTlgt1WQ6SQfp1A4+KfwXI7iglkb8IMgiAQG2+RB36Ue+FPCSTavur67cjI0gyvVSJgBt1OSO1Mkw+ZW1D3OB0Hy0tefbZhJVkJJImZVwNJn37mtzhuBHEcL5bqoViGYWiA0E6lPswPqiINa3O/DIZ7vFLJdrItaQRpK6gzGI3gHr9utUPBNtmllOzKrA9QAsfdQDFMC1wPhhrLj1qyiQAbai2V1Bir59TGT6s7LAkUR8NwFpSNAUFBpgAenGACIwJJAM7jsIvoNpwYmKzls3LTmD5lkiQpy9ojPpP4rZ7HKnYkYWRlgLpk4Zu5EE7fVG+wzFODbCQOwAAkDpB7CNq7IYBlIIIkEGQR0yNxUbSKVjSE9vqN6iZf3gMiD1n79RvXL/ABGmDpZpYA6QDpnqQSDp22k52iSHF6Vjo5IqI7n+4p7GmE1LGckUq7NKgBorvzXBTXEwDO4ODG2enT2qQJwa6GquYjOdj/SnBjVAT3bpVSVUscADaZMZPQCZJ7A4O1SsJBByD/SoEapVNNCK3E2CWLw2F2U7wMRkAHBEe4od5yeJQBxbZkI6AllnoQGJ2iYET16ktFIEzvScUxqbR4xzPilZ0YlE03ZIOP8A+s9vZj96Z4N8J3OKvIxH7BG9bggTAnSvUtt0jfNezNwdplhraNmfUinMzMEbzmpEsoH1gANGkwIkTqz8EtHbU3erWkEpJ7ojfg1Pt2np0xPx+tV7vLlOrV6geke361oNdyAYzgDv1x74J+1NV8mBTMwe4jkSvugae4wcmJG86TscZ+aof90AXc6oBH1Y1L1HpiCQSTLYwoggmjQITXHB6ET8UFcnVAnw/hO2NlE7SVAZ8bggHSMxt1O21aVjw9bXETsGnJaNpO/Qbz1+a3ga7TJMvhuUIh1Z1Tuc9/0zH2A2AA0bagYAA3OBTppA0ARFGJdWjQRggnVkEMD26QZ6ntQx4R4RuGF23cH0XSoJ/EuhSre8gzjrI6UWGqvE2tQ7EbGgCZr51AacETq6bjH3mfsaRuVBawoB6VwvFSMa9vRLWxvJKdGMdMwpJjO2/UzUgeRkR7df0phaoycg5kVJQ8mmFq4rEjO9cJoGcY0012mkUgHUqbq/uKVIDvSo+9KlSARqVelKlTAeu9SpSpU0IeKR/rSpVQiUU2lSpiK3F/XY/wD9T/8Aiu1et7mlSpiJai612lQAqRpUqAOtXBSpUAcNMpUqAIF+pv76CuXKVKkyiulPO9KlUsY1P50u9KlSGdNRtSpUgO0qVKkM/9k='
                    }} />
                
                <Text style={styles.title}>
                    Henrique & juliano
                </Text>
                <Text style={styles.subTitle}>
                    Henrique & juliano
                </Text>
            </View>

            {/* NAV CONTROLE DE MUSICA */}
            <View>

                {/* SCROLL E TEMPO DO AUDIO */}
                <View style={{ marginBottom: 50 }}>

                    <View style={styles.displayFlexEnd}>
                        <Text style={{color: 'white'}}>
                            {convertMsToTime(atualTimeAudio)}
                        </Text>
                        <Text style={{color: 'white'}}>
                            /
                        </Text>
                        <Text style={{color: 'white'}}>
                            {convertMsToTime(totalTimeAudio)}
                        </Text>
                    </View>

                    <Slider
                        style={{width: 300, height: 40}}
                        value={atualTimeAudio}
                        minimumValue={0}
                        maximumValue={593528}
                        minimumTrackTintColor={'white'}
                        maximumTrackTintColor={'#D9D9D9'}
                        thumbTintColor='#fff'
                        onValueChange={(value)=>{ SetTimeAudio(value), setAtualTimeAudio(value)} }
                        // onSlidingComplete={(e)=>console.log(e)}
                    /> 
                </View>

                {/* BOTOES CONTROL MUSIC */}
                <View style={styles.displayFlexBetween}>
                    
                    <TouchableHighlight onPress={() => PauseAudio()}>
                        <Icon 
                            name='previous' 
                            size={40} 
                            color={'#fff'}  
                            style={{ 
                                marginTop: 'auto', 
                                marginBottom: 'auto' 
                            }} 
                        />
                    </TouchableHighlight>
                    

                        {Status === false ? 
                            
                            <TouchableHighlight onPress={() => PlayAudio()}>
                                <Icon name='play' size={80} color={'#fff'}/>
                            </TouchableHighlight> 
                            :
                            <TouchableHighlight onPress={() => PauseAudio()}>
                                <Icon name='pause' size={80} color={'#fff'}/>
                            </TouchableHighlight>
                        }
                    
                    <TouchableHighlight onPress={() => PauseAudio()}>

                        <Icon name='next' 
                            size={40}
                            color={'#fff'}  
                            style={{ 
                                marginTop: 'auto', 
                                marginBottom: 'auto' 
                            }} 
                        />


                    </TouchableHighlight>

                </View>
            
            </View>
            
            
        </View>
    );
    
} 
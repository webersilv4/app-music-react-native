import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface ITimeStamp {
	androidImplementation: string,
	audioPan: number,
	didJustFinish: boolean,
	durationMillis: number,
	isBuffering: boolean,
	isLoaded: true,
	isLooping: boolean,
	isMuted: boolean,
	isPlaying: boolean,
	playableDurationMillis: number,
	positionMillis: number,
	progressUpdateIntervalMillis: number,
	rate: number,
	shouldCorrectPitch: boolean,
	shouldPlay: boolean,
	uri: string,
	volume: number
}

export type propsDataApi = [{
	_id: string
	artist: string,
    albumTitle: string,
    albumImage: string
    musics: [{     
        songTitle: string, 
        songLink: string
        timeInMilliseconds?: number
    }],
    genre: string,
    type: string
}]

export type propsNavigationStack = {
	Home: undefined
	Search: undefined
	Favorites: undefined
	Playlists: undefined
	Play: undefined
	Albums: { albumId: string };
}

export type propsStack = NativeStackNavigationProp<propsNavigationStack>
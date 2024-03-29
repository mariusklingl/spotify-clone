import useSpotify from "hooks/useSpotify"
import {millisToMinAndSec} from '../lib/time'
import {currentTrackState, isPlayingState} from '../atoms/songAtom'
import {useRecoilState} from 'recoil'

export default function Song({order,track}){
    const spotifyApi = useSpotify()
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackState)
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)

    const playSong = () => {
        setCurrentTrackId(track.track.id)
        setIsPlaying(true)
        spotifyApi.play({
            uris: [track.track.uri]
        })
    }
    
    return(
        <div onClick={playSong} className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer">
            <div className="flex items-center space-x-4">
                <p>{order+1}</p>
                <img className="h-10 w-10" src={track.track.album.images[0].url}/>
                <div>
                    <p className="w-36 lg:w-64 truncate text-white">{track.track.name}</p>
                    <p className="w-40 ">{track.track.artists[0].name}</p>
                </div>
            </div>
            <div className="flex items-center justify-between ml-auto md:ml-0">
                <p className="hidden md:inline ">{track.track.album.name}</p>
                <p>{millisToMinAndSec(track.track.duration_ms)}</p>
            </div>
        </div>
    )
}
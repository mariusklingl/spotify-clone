import {useRecoilState} from 'recoil'
import useSpotify from "../hooks/useSpotify"
import {currentTrackState} from '../atoms/songAtom'
import { useEffect, useState } from 'react'



export default function useSongInfo(){
    const spotifyApi = useSpotify()
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackState)
    const [songInfo, setSongInfo] = useState()

    useEffect(()=>{
        const fetchSongInfo = async() => {
            if(currentTrackId){
                const trackInfo = await fetch(
                    `https://api.spotify.com/v1/tracks/${currentTrackId}`, {
                        headers: {
                            Authorization: 'Bearer '+spotifyApi.getAccessToken()
                        }
                    }
                ).then(res=>res.json())
                setSongInfo(trackInfo)
            }
        }
        fetchSongInfo()

    },[currentTrackId, spotifyApi])

    return songInfo

}
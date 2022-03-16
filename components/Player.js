import useSpotify from "../hooks/useSpotify"
import {useSession} from 'next-auth/react'
import {currentTrackState, isPlayingState} from '../atoms/songAtom'
import {useRecoilState} from 'recoil'
import { useEffect, useState } from "react"
import useSongInfo from "../hooks/useSongInfo"
import {SwitchHorizontalIcon, RewindIcon, FastForwardIcon, PauseIcon,PlayIcon,ReplyIcon,VolumeUpIcon, } from '@heroicons/react/solid'
import {HeartIcon, VolumeUpIcon as VolumeDownIcon} from '@heroicons/react/outline'


export default function Player() {
    const spotifyApi = useSpotify()
    const {data: session} = useSession()
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackState)
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
    const [volume, setVolume] = useState(50)

    const songInfo = useSongInfo()

    const fetchCurrentSong = async () => {
        if(!songInfo){
            spotifyApi.getMyCurrentPlayingTrack().then(data=>{
                console.log('Now Playing...')
                setCurrentTrackId(data?.body?.item?.id)
                spotifyApi.getMyCurrentPlaybackState().then(data=>{
                    setIsPlaying(data.body?.is_playing)
                })
            })
        }
    }

    const handlePlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState().then(data=>{
            if(data.body.is_playing){
                spotifyApi.pause()
                setIsPlaying(false)
            }else{
                spotifyApi.play()
                setIsPlaying(true)
            }
        })
    }

    useEffect(()=>{
        if(spotifyApi.getAccessToken() && !currentTrackId){
            fetchCurrentSong()
            setVolume(50)
        }

    },[currentTrackId, spotifyApi, session])

    return (
        <div className="bg-gradient-to-b from-black to-gray-900 h-24 text-xs md:text-base px-2 md:px-8 text-white grid grid-cols-3">
            
            <div className="flex items-center space-x-4">
                <img className="hidden md:inline h-10 w-10" src={songInfo?.album?.images[0].url} alt=''/>
                <div>
                <h3>{songInfo?.name}</h3>
                <p>{songInfo?.artists?.[0]?.name}</p>
                </div>
            </div>
            <div className="flex items-center justify-evenly">
                <SwitchHorizontalIcon className="button"/>
                <RewindIcon className="button"/>
                {isPlaying?(
                    <PauseIcon onClick={handlePlayPause} className="button w-12 h-12"/>
                )
                :(
                    <PlayIcon onClick={handlePlayPause} className="button h-12 w- 12"/>
                )
                }
                <FastForwardIcon className="button"/>
                <ReplyIcon className="button" />
            </div>
        </div>)
}
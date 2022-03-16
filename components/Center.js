import { ChevronDownIcon } from '@heroicons/react/outline'
import {useSession, signOut} from 'next-auth/react'
import { useEffect, useState } from 'react'
import {shuffle} from 'lodash'
import { playlistAtomState, playlistIdState } from 'atoms/playlistAtom'
import {useRecoilValue, useRecoilState} from 'recoil'
import useSpotify from 'hooks/useSpotify'
import Songs from '../components/Songs'

export default function Center() {

    const {data:session} = useSession()
    const [color, setColor] = useState(null)
    const playlistId = useRecoilValue(playlistIdState)
    const [playlist, setPlaylist] = useRecoilState(playlistAtomState)
    const spotifyApi = useSpotify()

    const colors = [
        "from-indigo-500",
        "from-blue-500",
        "from-green-500",
        "from-red-500",
        "from-yellow-500",
        "from-pink-500",
        "from-purple-500",
    ]

    useEffect(()=>{
        setColor(shuffle(colors).pop())
    },[playlistId])

    useEffect(()=>{
        spotifyApi.getPlaylist(playlistId).then(data=>{
            setPlaylist(data.body)
        }).catch(e=>{
            console.log('Sth went wrong requst playlisrt')
        })
    },[spotifyApi, playlistId])

    
    return (
    <div className="flex-grow bg-black h-screen overflow-scroll scrollbar-hide"> 
        <header className='absolute top-5 right-8'>
            <div onClick={signOut} className='flex items-center bg-black text-white space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-1'>
                <img className='rounded-full w-10 h-10' src={session?.user?.image} alt=""/>
                <h2>{session?.user.name}</h2>
                <ChevronDownIcon className='h-5 w-5'/>
            </div>
        </header>
        <section className={`flex items-end space-x-7 bg-gradient-to-b ${color} h-80 to-black text-white p-8`}>
                <img className='w-44 h-44 shadow-2xl' src={playlist?.images[0]?.url} alt='' />
                <div>
                    <p>PLAYLIST</p>
                    <h1 className='text2-xl md:text-3xl lg:text-4xl font-bold'>{playlist?.name}</h1>
                </div>
        </section>
        <div><Songs/></div>
    </div>
    )
}
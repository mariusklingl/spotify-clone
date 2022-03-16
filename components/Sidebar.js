import { HomeIcon, SearchIcon, LibraryIcon, PlusCircleIcon, HeartIcon, RssIcon } from '@heroicons/react/outline'
import { signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import useSpotify from '../hooks/useSpotify'
import { useRecoilState } from 'recoil'
import { playlistIdState } from '../atoms/playlistAtom'

export default function Sidebar() {
    const { data: session, status } = useSession()
    const [playlists, setPlaylists] = useState([])
    const spotifyApi = useSpotify()
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)

    useEffect(() => {
        console.log(spotifyApi.getAccessToken())
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then(data => {
                setPlaylists(data.body.items)
            })
        }
    }, [session, spotifyApi])

    console.log(playlistId)

    return (
        <div className='text-gray-500 p-5 text-xs lg:text-sm sm:max-w-[12rem] hidden md:inline-flex lg:max-w-[15rem]  border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen pb-36'>
            <div className='space-y-4'>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <HomeIcon className='w-5 h-5' />
                    <p>Home</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <SearchIcon className='w-5 h-5' />
                    <p>Search</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <LibraryIcon className='w-5 h-5' />
                    <p>Your Library</p>
                </button>

                <hr className='border-t-[0.1px] border-gray-900' />
                <button className='flex items-center space-x-2 hover:text-white'>
                    <PlusCircleIcon className='w-5 h-5' />
                    <p>Create Playlist</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <HeartIcon className='w-5 h-5' />
                    <p>Liked Songs</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <RssIcon className='w-5 h-5' />
                    <p>Your Episodes</p>
                </button>
                <hr className='border-t-[0.1px] border-gray-900' />

                {playlists.map((playlist) => (
                    <p key={playlist.id} onClick={() => setPlaylistId(playlist.id)} className='cursor-pointer hover:text-white'>
                        {playlist.name}
                    </p>
                ))
                }
            </div>
        </div>
    )
}
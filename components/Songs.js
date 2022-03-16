import {useRecoilValue} from 'recoil'
import { playlistAtomState } from '../atoms/playlistAtom'
import Song from './Song'

export default function Songs(){

    const playlist = useRecoilValue(playlistAtomState)

    return(
        <div className='flex flex-col text-white p-8 space-y-1 pb-28'>
            {playlist?.tracks.items.map((track,i)=>(
               <Song key={track.track.id} track={track} order={i}/>
            ))
            }
        </div>
    )
}
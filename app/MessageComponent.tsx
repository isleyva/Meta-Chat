import React from 'react'
import { Message } from '../typings'
import Image from 'next/image'

type Props = {
    message: Message
}

export default function MessageComponent({ message }: Props) {
    return (
        <div className='flex w-fit'>
            <div className='flex-shrink-0'>
                <Image src={message.profilePic} width={50} height={10} alt="image" className='rounded-full mx-2' />
            </div>
            <div>
                <div>
                    <p className='text-[0.65rem] px-[2px] pb-[2px]'>{message.username}</p>
                </div>
                <div className='flex items-end'>
                    <div className='px-3 py-2 rounded-lg w-fit text-white bg-red-400'>
                        <p >{message.message}</p>
                    </div>
                    <p className='text-[0.65rem] italic px-2 text-gray-400'>{new Date(message.created_at).toLocaleString()}</p>
                </div>
            </div>
        </div>
    )
}


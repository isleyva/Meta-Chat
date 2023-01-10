import React from 'react'
import { getProviders, signIn } from 'next-auth/react'
import Image from 'next/image'
import MessengerLogo from '/public/MessengerLogo.png';
import SignInComponent from './SignInComponent';

async function SignInPage() {
    const providers = await getProviders()
    return (
        <div className='grid justify-center'>
            <div>
                <Image src={MessengerLogo} alt={'logo'} width={300} height={300} className="rounded-full mx-2 object-cover"></Image>
            </div>

            <SignInComponent providers={providers} />

        </div>
    )
}

export default SignInPage

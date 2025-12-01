import { Metadata } from 'next';
import { SignIn } from '@/app/login/AuthButtons';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'FinTracker - Login'
}

export default async function Login () {
  return (
    <div className='container mx-auto'>
        <div className='grid grid-cols-1 gap-4'>
          <Suspense>
            <SignIn />
          </Suspense>
        </div>
    </div>
  )
};
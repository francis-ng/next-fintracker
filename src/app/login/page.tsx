import { Metadata } from 'next';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { SignIn } from '@/app/login/AuthButtons';

export const metadata: Metadata = {
  title: 'FinTracker - Login'
}

export default async function Login () {
  const session = await auth();

  if (session) {
    redirect('/ledger/list');
  }

  return (
    <div className='container'>
        <div className='grid grid-cols-1 gap-4'>
          <SignIn />
        </div>
    </div>
  )
};
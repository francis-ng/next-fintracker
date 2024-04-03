import { Metadata } from 'next';
import { auth } from '@/auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { SignIn } from '@/components/AuthButtons';

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
          {/* <Input label='User name' name='username' required />
          <Input label='Password' name='password' type='password' required /> */}
          <SignIn />
          {/* <Link href='/user/changepass'>Change password and login</Link>
          <Link href='/user/register'>Click here to register</Link> */}
        </div>
    </div>
  )
};
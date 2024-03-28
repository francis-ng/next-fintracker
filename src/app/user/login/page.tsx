import { Metadata } from 'next';
import Link from 'next/link';
import { Button, Input } from '@nextui-org/react';
import { submitLogin } from '@/app/api/user/login';

export const metadata: Metadata = {
  title: 'FinTracker - Login'
}

export default function Login () {
  return (
    <div className='container'>
      <form action={submitLogin}>
        <div className='grid grid-cols-1 gap-4'>
          <Input label='User name' name='username' required />
          <Input label='Password' name='password' type='password' required />
          <Button color='primary' type='submit'>Login</Button>
          <Link href='/user/changepass'>Change password and login</Link>
          <Link href='/user/register'>Click here to register</Link>
        </div>
      </form>
    </div>
  )
};
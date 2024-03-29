import Link from 'next/link';
import { Metadata } from "next";
import { Button, Input } from '@nextui-org/react';
import { submitRegister } from '@/util/user/register';

export const metadata: Metadata = {
  title: 'FinTracker - Register'
}

export default function Register() {
  return (
    <div className='container'>
      <form action={submitRegister}>
        <div className='grid grid-cols-1 gap-4'>
          <Input label="User name" name='username' required />
          <Input label="Password" name='password' type="password" required />
          <Input label="Verify password" name='passwordVerify' type="password" required />
          <Button color='primary' type='submit'>Login</Button>
          <Link href='/user/login'>Return to login</Link>
        </div>
      </form>
    </div>
  )
}
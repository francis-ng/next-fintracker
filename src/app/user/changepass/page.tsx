import Link from 'next/link';
import { Metadata } from "next";
import { Button, Input } from '@nextui-org/react';

export const metadata: Metadata = {
  title: 'FinTracker - Change Password'
}

export default function ChangePassword() {
  return (
    <div className='container'>
      <form>
        <div className='flex w-full flex-wrap md:flex-nowrap gap-4'>
          <Input label="User name" name='username' required />
          <Input label="Password" name='password' type="password" required />
          <Input label="New Password" name='newpass' type="password" required />
          <Input label="Verify new password" name='verifyPass' type="password" required />
          <Button color='primary' type='submit'>Update</Button>
          <Link href='/user/login'>Return to login</Link>
        </div>
      </form>
    </div>
  )
}
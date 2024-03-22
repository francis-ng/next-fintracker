'use client'
import { useState } from 'react';
import Link from 'next/link';
import Head from "next/head"

export default function ChangePassword() {
  const [UserName, setUserName] = useState('');
  const [Password, setPassword] = useState('');
  const [NewPassword, setNewPassword] = useState('');
  const [NewPasswordVerify, setNewPasswordVerify] = useState('');

  return (
    <>
      <Head>
        <title>FinTracker - Change Password</title>
      </Head>
      <div className='container px-4'>
          <Stack spacing={2} textAlign='center'>
            <TextField label="User name" value={UserName} onChange={(e) => setUserName(e.target.value)} required />
            <TextField label="Password" type="password" value={Password} onChange={(e) => setPassword(e.target.value)} required />
            <TextField label="New Password" type="password" value={NewPassword} onChange={(e) => setNewPassword(e.target.value)} required />
            <TextField label="Verify new password" type="password" value={NewPasswordVerify} onChange={(e) => setNewPasswordVerify(e.target.value)} required />
            <Button variant='contained' type='submit'>Update</Button>
            <Link href='/user/login'>Return to login</Link>
          </Stack>
      </div>
    </>
  )
}
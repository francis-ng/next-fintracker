'use client'
import { useState } from 'react';
import Header from "@/components/header";
import { Button, Link, Paper, Stack, TextField } from "@mui/material";
import NextLink from 'next/link';
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
      <Header />
      <Paper className='p-4'>
        <form>
          <Stack spacing={2} textAlign='center'>
            <TextField label="User name" value={UserName} onChange={(e) => setUserName(e.target.value)} required />
            <TextField label="Password" type="password" value={Password} onChange={(e) => setPassword(e.target.value)} required />
            <TextField label="New Password" type="password" value={NewPassword} onChange={(e) => setNewPassword(e.target.value)} required />
            <TextField label="Verify new password" type="password" value={NewPasswordVerify} onChange={(e) => setNewPasswordVerify(e.target.value)} required />
            <Button variant='contained' type='submit'>Update</Button>
            <Link component={NextLink} href='/user/login'>Return to login</Link>
          </Stack>
        </form>
      </Paper>
    </>
  )
}
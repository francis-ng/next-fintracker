import { useState } from 'react';
import Head from 'next/head'
import { Button, Link, Paper, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import NextLink from 'next/link';
import Header from '@/components/header';

export default () => {
  const [LoginUserName, setLoginUserName] = useState('');
  const [LoginPassword, setLoginPassword] = useState('');

  return (
    <>
      <Head>
        <title>FinTracker - Login</title>
      </Head>
      <Header />
      <Paper className='p-4'>
        <form>
          <Stack spacing={2} textAlign='center'>
            <TextField label='User name' value={LoginUserName} onChange={(e) => setLoginUserName(e.target.value)} required />
            <TextField label='Password' value={LoginPassword} onChange={(e) => setLoginPassword(e.target.value)} type='password' required />
            <Button variant='contained' type='submit'>Login</Button>
            <Link component={NextLink} href='/user/changepass'>Change password and login</Link>
            <Link component={NextLink} href='/user/register'>Click here to register</Link>
          </Stack>
        </form>
      </Paper>
    </>
  )
};
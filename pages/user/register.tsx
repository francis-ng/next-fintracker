import { useState } from 'react';
import Header from "@/components/header"
import { Button, Link, Paper, Stack, TextField } from "@mui/material"
import NextLink from 'next/link';
import Head from "next/head"

export default function Register() {
  const [RegUserName, setRegUserName] = useState('');
  const [RegPassword, setRegPassword] = useState('');
  const [RegPasswordVerify, setRegPasswordVerify] = useState('');

  return (
    <>
      <Head>
        <title>FinTracker - Register</title>
      </Head>
      <Header />
      <Paper className='p-4'>
        <form>
          <Stack spacing={2} textAlign='center'>
            <TextField label="User name" value={RegUserName} onChange={(e) => setRegUserName(e.target.value)} required />
            <TextField label="Password" type="password" value={RegPassword} onChange={(e) => setRegPassword(e.target.value)} required />
            <TextField label="Verify password" type="password" value={RegPasswordVerify} onChange={(e) => setRegPasswordVerify(e.target.value)} required />
            <Button variant='contained' type='submit'>Login</Button>
            <Link component={NextLink} href='/user/login'>Return to login</Link>
          </Stack>
        </form>
      </Paper>
    </>
  )
}
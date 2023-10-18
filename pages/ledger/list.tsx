
import { useState, useRef, useEffect } from 'react';
import Header from "@/components/header";
import { Button, Link, Paper, Stack, TextField } from "@mui/material";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import NextLink from 'next/link';
import Head from "next/head"
import { FixedSizeList, ListChildComponentProps } from 'react-window';

export default () => {
  const [VisibleItems, setVisibleItems] = useState(0);
  const [displayedLedgers, setDisplayedLedgers] = useState([]);
  const ledgers = useRef([]);

  useEffect(() => {

  }, [])

  const renderRow = (props: ListChildComponentProps) => {
    const { index, style } = props;

    return (
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemButton>
          <ListItemText primary={displayedLedgers[index]} />
        </ListItemButton>
      </ListItem>
    )
  }

  return (
    <>
      <Head>
        <title>FinTracker - Ledgers</title>
      </Head>
      <Header />
      <Paper className='p-4'>
        <FixedSizeList
          height={960}
          width={'80%'}
          itemSize={46}
          itemCount={VisibleItems}
          overscanCount={5}
        >
          {renderRow}
        </FixedSizeList>
      </Paper>
    </>
  )
}
'use client';
import * as React from 'react';
import { Alert as MUIAlert, Portal, Slide, AlertColor } from '@mui/material';

interface Props {
  message: string,
  severity: AlertColor,
  onTimeout: () => void,
}

export default function Alert(props: Props) {
  const {severity, message, onTimeout} = props;
  const [open, setOpen] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setOpen(false);
      onTimeout();
    }, 2000)
  }, [])

  return (
    <Portal container={() => document.getElementById('root')}>
      <Slide direction="left" in={open} mountOnEnter unmountOnExit>
        <MUIAlert severity={severity} sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          m: 5,
          width: 240
        }
        }
        >{message}</MUIAlert>
      </Slide>
    </Portal>
  )
}
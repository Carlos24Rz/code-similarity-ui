import * as React from 'react';
import { Toolbar, Typography, Button } from '@mui/material';
import { Add } from '@mui/icons-material';

interface Props {
    tableTitle: string;
    addMessage: string;
    onAddItem: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function TableToolbar(props: Props) {
    const { tableTitle, addMessage, onAddItem } = props;

    return (
        <Toolbar
          sx={{
            px: {
                xs: 0
            }
          }}
        >
            <Typography
              sx={{
                flexGrow: 1,
                fontWeight: 500,
              }}
              component='h3'
              variant='h5'
            >
                {tableTitle}
            </Typography>
            <Button
              variant='text'
              startIcon={<Add />}
              onClick={onAddItem}
            >
                {addMessage}
            </Button>
        </Toolbar>
    )
}
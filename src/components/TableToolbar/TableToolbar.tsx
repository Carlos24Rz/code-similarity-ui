import * as React from 'react';
import { Toolbar, Typography } from '@mui/material';

interface Props {
    tableTitle: string;
    addElement: React.ReactNode;
}

export default function TableToolbar(props: Props) {
    const { tableTitle, addElement } = props;

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
            {addElement}
        </Toolbar>
    )
}

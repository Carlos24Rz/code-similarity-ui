'use client';
import * as React from 'react';
import { CircularProgress, CircularProgressProps, Box, Typography } from "@mui/material"

interface LabelProps {
    labelSize: number;
}

export default function AnimatedCircularProgress(props: CircularProgressProps & LabelProps) {
    const { labelSize, ...circularProgressProps } = props;
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
          setProgress((prevProgress) => {
            if (prevProgress >= Math.floor((props.value as number))) {
                clearInterval(timer);
                return prevProgress;
            } else {
                return prevProgress + 1;
            }
          });
        }, 1);
    
        return () => {
          clearInterval(timer);
        };
      }, []);

    return (
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress
            {...circularProgressProps}
            variant="determinate"
            value={progress}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            component="div"
            fontSize={labelSize}
            color={circularProgressProps.color}
          >
            {`${progress}%`}
          </Typography>
      </Box>
    </Box>
        
    );
}




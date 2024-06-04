import { AppBar, Link, Toolbar } from '@mui/material';

export default function AppHeader() {
    return (
      <>
        <AppBar
          position="fixed"
          sx={{
            zIndex: 1201
          }}
        >
            <Toolbar
                sx={{
                    justifyContent: 'space-between'
                }}
            >
                <Link color='primary.contrastText' variant='h5' href='#' underline='none'>Pylens</Link>
            </Toolbar>
        </AppBar>
        <Toolbar />
      </>
    )
}

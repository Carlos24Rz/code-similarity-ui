import { AppBar, Link, Typography, Toolbar } from '@mui/material';
import AuthMenu from '../AuthMenu/AuthMenu';

export default function AppHeader() {
    return (
        <AppBar position='static'>
            <Toolbar
                sx={{
                    justifyContent: 'space-between'
                }}
            >
                <Link color='primary.contrastText' variant='h5' href='#' underline='none'>Pylens</Link>
                <AuthMenu />
            </Toolbar>
        </AppBar>
    )
}
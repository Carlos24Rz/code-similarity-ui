import { AppBar, Link, Typography, Toolbar } from '@mui/material';
import styles from './AppHeader.module.css';

export default function AppHeader() {
    return (
        <AppBar position='static'>
            <Toolbar>
                <Typography variant="h4" component="h1" color="var(--white)">
                    <Link className={styles.header_title} color="inherit" href="#" underline='none'>Pylens</Link>
                </Typography>
            </Toolbar>
        </AppBar>
    )
}
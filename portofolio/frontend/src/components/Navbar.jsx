import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const Navbar = () => {
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 1 }}>
                    <AutoAwesomeIcon/>
                </IconButton>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    My ML Projects
                </Typography>
                <Box>
                    <Button color="inherit" component={Link} to="/">
                        Home
                    </Button>
                    <Button color="inherit" component={Link} to="/projects">
                        Projects
                    </Button>
                    <Button color="inherit" component={Link} to="/contact">
                        Contact
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;

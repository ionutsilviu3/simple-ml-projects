import { AppBar, Toolbar, Typography, Link, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <AppBar position="static" color="primary" style={{ top: 'auto', bottom: 0 }}>
            <Toolbar style={{ justifyContent: 'center', minHeight: '64px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <Typography variant="body1" color="inherit">
                        &copy; {currentYear} Boanc Ionuț-Silviu
                    </Typography>
                    <Link href="https://github.com/ionutsilviu3" color="inherit" style={{ marginLeft: '20px' }}>
                        <IconButton color="inherit">
                            <GitHubIcon />
                        </IconButton>
                    </Link>
                    <Link href="https://www.linkedin.com/in/ionut-boanc/" color="inherit" style={{ marginLeft: '20px' }}>
                        <IconButton color="inherit">
                            <LinkedInIcon />
                        </IconButton>
                    </Link>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Footer;

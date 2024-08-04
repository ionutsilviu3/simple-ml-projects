import { Container, Typography, Box } from '@mui/material';
import Projects from '../components/Projects'
import Contact from '../components/Contact'
const Home = () => {
    return (
        <Container maxWidth="md" style={{ padding: '50px 0' }}>
            <Box textAlign="center">
                <Typography variant="h3" gutterBottom>
                    Welcome!
                </Typography>
                <Typography variant="body1">
                    My name is Ionuț, I&apos;m a software engineer and these are my ML projects, 
                    I wanted to make them more than just models I create and forget them on GitHub,
                    I wanted people to use them. This site was made primarly using Django and React. 
                </Typography>
            </Box>
            <Box>
                <Projects />
            </Box>
            <Box>
                <Contact />
            </Box>
        </Container>
    );
}

export default Home;

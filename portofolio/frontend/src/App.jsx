import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Summarizer from './pages/Summarizer';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import theme from './Theme';
import Home from './pages/Home';
import FakeNewsDetection from './pages/Fake-News-Detection';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/summarizer" element={<Summarizer />} />
                    <Route path="/fake-news-detection" element={<FakeNewsDetection />} />
                </Routes>
                <Footer />
            </Router>
        </ThemeProvider>
    );
}

export default App;

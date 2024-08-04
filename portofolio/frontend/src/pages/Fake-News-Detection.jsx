import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, Card, CardContent, CardActions, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { keyframes } from '@mui/system';
import { TypeAnimation } from 'react-type-animation';

const FakeNewsDetection = () => {
    const [text, setText] = useState('');
    const [detect, setDetect] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [isBlinking, setIsBlinking] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true); // Start with the button disabled
    const [isVerdictVisible, setIsVerdictVisible] = useState(false); // State to control verdict visibility

    // Define the keyframes for the blink effect (cursor)
    const blinkEffect = keyframes`
      50% { border-color: transparent; }
    `;

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsAnimating(true);
        setIsBlinking(false);
        setIsButtonDisabled(true); // Disable the button when clicked

        // Reset the verdict card content and state
        setShowMessage(true); // Show the typing animation immediately
        setDetect('');
        setIsVerdictVisible(false); // Hide verdict initially

        const response = await axios.post('http://localhost:8000/api/fake-news-detection/', { text });

        // Simulate typing animation duration
        setTimeout(() => {
            setDetect(response.data.detection);
            setIsAnimating(false);
            setIsBlinking(true); // Start blinking animation after typing animation
        }, 3000); // Typing animation duration
    };

    const handleClear = () => {
        setText('');
        setDetect('');
        setShowMessage(false);
        setIsBlinking(false);
        setIsButtonDisabled(true); // Ensure the button stays disabled when text is empty
        setIsVerdictVisible(false); // Hide verdict when clearing
    };

    useEffect(() => {
        if (text.trim() !== '') {
            setIsButtonDisabled(false); // Enable button if there is text
        } else {
            setIsButtonDisabled(true); // Disable button if text is empty
        }
    }, [text]);

    useEffect(() => {
        if (!isAnimating) {
            // Show the verdict once typing animation is done
            const timer = setTimeout(() => {
                setIsVerdictVisible(true);
            }, 3000); // Match this duration with the typing animation duration

            return () => clearTimeout(timer);
        }
    }, [isAnimating]);

    return (
        <Container maxWidth="md" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column' }}>
            <Box width="100%" maxWidth="600px">
                <Typography variant="h3" gutterBottom align="center" style={{ marginBottom: '10px', fontWeight: 'bold' }}>
                    Fake News Detection
                </Typography>
                <Typography variant="subtitle1" gutterBottom align="center" style={{ fontStyle: 'italic' }}>
                    This project was created using TF-IDF for measuring the importance of words and linear SVC for fake news detection.
                </Typography>

                <Card elevation={3} style={{ marginBottom: '20px' }}>
                    <CardContent>
                        <TextField
                            label="Enter text here"
                            multiline
                            rows={10}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </CardContent>
                    <CardActions style={{ justifyContent: 'center' }}>
                        <Button onClick={handleClear} color="bluee" variant="outlined" style={{ marginRight: '10px' }}>
                            <ClearIcon /> Clear
                        </Button>
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary" 
                            onClick={handleSubmit} 
                            disabled={isButtonDisabled} // Control button disabled state
                        >
                            🔎 Detect
                        </Button>
                    </CardActions>
                </Card>

                <Card elevation={0} style={{ marginBottom: '20px', minHeight: '100px' }}> {/* Fixed height or min-height */}
                    <CardContent>
                        {showMessage && (
                            <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center' }}>
                                <TypeAnimation
                                    sequence={[
                                        'The verdict is...',
                                        2000 // Show the text for 2 seconds before stopping
                                    ]}
                                    wrapper="span"
                                    speed={50}
                                    style={{ fontSize: '2em', display: 'inline-block', marginRight: '10px' }}
                                    repeat={0}
                                    onFinished={() => {
                                        setIsVerdictVisible(true); // Show verdict after typing animation
                                        setIsBlinking(true); // Start blinking after typing animation
                                    }}
                                />
                                {isVerdictVisible && (
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            color: detect === 'true' ? 'green' : 'red',
                                            animation: isBlinking ? `${blinkEffect} 1s step-end infinite` : 'none',
                                            minWidth: '50px',
                                            fontSize: '1.5rem',
                                            lineHeight: '1.2'
                                        }}
                                    >
                                        {detect === 'true' ? 'TRUTH' : 'FAKE'}
                                    </Typography>
                                )}
                            </Box>
                        )}
                    </CardContent>
                </Card>

                <Box mt={4} width="100%">
                    <Typography variant="h4" gutterBottom>
                        Machine Learning Techniques Used
                    </Typography>
                    <Accordion elevation={3} style={{ marginBottom: '10px' }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography style={{ fontWeight: 'bold' }}>
                                TF-IDF (Term Frequency-Inverse Document Frequency)
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                TF-IDF is used to measure the importance of words in a document relative to other documents. It helps in determining the significance of each word in the text.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion elevation={3} style={{ marginBottom: '10px' }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography style={{ fontWeight: 'bold'}} >
                                Linear SVC (SVM)
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography display="block">
                            Support Vector Machines (SVMs) classify data by finding a line or hyperplane that best separates the data into different classes.<br /><br />
                            Linear Support Vector Classification is a version of SVM that assumes a linear relationship between the features and the output classes. It tries to find the straight line (in 2D) or hyperplane (in higher dimensions) that best divides the data into two classes (in this case, REAL and FAKE).
                        </Typography>
                    </AccordionDetails>

                    </Accordion>
                </Box>
            </Box>
        </Container>
    );
};

export default FakeNewsDetection;

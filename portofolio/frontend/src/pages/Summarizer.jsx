import { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, Paper, Card, CardContent, CardActions, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ClearIcon from '@mui/icons-material/Clear';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Summarizer = () => {
    const [text, setText] = useState('');
    const [summary, setSummary] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.post('http://localhost:8000/api/summarize/', { text });
        setSummary(response.data.summary);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(summary);
    };

    const handleClear = () => {
        setText('');
        setSummary('');
    };

    return (
        <Container maxWidth="md" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column' }}>
            <Box width="100%" maxWidth="600px">
                <Typography variant="h3" gutterBottom align="center" style={{ marginBottom: '10px', fontWeight: 'bold' }}>
                    Summarizer
                </Typography>
                <Typography variant="subtitle1" gutterBottom align="center" style={{ fontStyle: 'italic' }}>
                This project was created using TF-IDF for measuring the importance of words and K-Means Clustering for grouping similar sentences together.
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
                        <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
                            ✨ Summarize
                        </Button>
                    </CardActions>
                </Card>

                {summary && (
                    <Card elevation={3}>
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                Summary
                            </Typography>
                            <Paper elevation={0} style={{ padding: '15px', backgroundColor: '#ffffff', position: 'relative' }}>
                                <Typography variant="body1">
                                    {summary}
                                </Typography>
                            </Paper>
                        </CardContent>
                        <CardActions style={{ justifyContent: 'flex-end' }}>
                            <Button onClick={handleCopy} variant="contained" size="small">
                                <ContentCopyIcon /> Copy
                            </Button>
                        </CardActions>
                    </Card>
                )}

                <Box mt={4} width="100%">
                    <Typography variant="h4" gutterBottom>
                        Machine Learning Techniques Used
                    </Typography>
                    <Accordion elevation={3} style={{ marginBottom: '10px' }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography style={{  fontWeight: 'bold' }}>
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
                            <Typography style={{  fontWeight: 'bold' }} >
                                K-Means Clustering
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                K-Means Clustering is used to group similar sentences together based on their TF-IDF representations, enabling the summarization of text by extracting key sentences.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Box>
            </Box>
        </Container>
    );
}

export default Summarizer;

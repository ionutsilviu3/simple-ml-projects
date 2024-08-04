import { Container, Typography, Box, TextField, Button, Grid } from '@mui/material';

const Contact = () => {
    return (
        <Container maxWidth="md" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
            <Box textAlign="center" sx={{boxShadow: 3, padding: '32px'}}>
                <Typography variant="h3" style={{ fontWeight: 'bold', marginBottom: '16px' }} gutterBottom>
                    Contact
                </Typography>
                <Typography variant="h6" style={{ marginBottom: '32px' }}>
                    Let&apos;s get in touch
                </Typography>
                <form style={{ width: '100%' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                name="Name"
                                autoComplete="name"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                multiline
                                rows={4}
                                id="message"
                                label="Message"
                                name="message"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '24px' }}
                    >
                        Send Message
                    </Button>
                </form>
            </Box>
        </Container>
    );
}

export default Contact;

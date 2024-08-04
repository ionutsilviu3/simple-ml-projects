import { useState } from 'react';
import { Container, Typography, Box, Card, CardActionArea, Chip, TextField, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const Projects = () => {
    // Example project data (you can replace this with your actual project data)
    const initialProjects = [
        { 
            id: 1, 
            title: 'Summarizer', 
            description: 'Description', 
            link: '/summarizer', 
            categories: ['NLP', 'Clustering'] 
        },
        { 
            id: 2, 
            title: 'Fake news detection', 
            description: 'Description', 
            link: '/fake-news-detection', 
            categories: ['NLP', 'SVM'] 
        },
        // Add more projects as needed
    ];

    const [projects] = useState(initialProjects);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);

    // Define categories with labels and colors
    const categories = [
        { value: 'NLP', label: 'Natural Language Processing (NLP)', color: '#1976d2' },
        { value: 'Clustering', label: 'Clustering', color: '#388e3c' },
        { value: 'SVM', label: 'Support Vector Machine (SVM)', color: '#f57c00' },
        // Add more categories as needed
    ];

    // Filter projects based on search term and selected categories
    const filteredProjects = projects.filter(project => {
        // Filter by search term
        const titleMatches = project.title.toLowerCase().includes(searchTerm.toLowerCase());
        const descriptionMatches = project.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSearchTerm = titleMatches || descriptionMatches;

        // Filter by selected categories
        const matchesCategories = selectedCategories.length === 0 || selectedCategories.some(category => project.categories.includes(category));

        return matchesSearchTerm && matchesCategories;
    });

    // Handle search term change
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Handle category selection change
    const handleCategorySelect = (categoryValue) => {
        if (selectedCategories.includes(categoryValue)) {
            setSelectedCategories(selectedCategories.filter(c => c !== categoryValue));
        } else {
            setSelectedCategories([...selectedCategories, categoryValue]);
        }
    };

    return (
        <Container maxWidth="md" style={{ padding: '50px 0' }}>
            <Box sx={{ boxShadow: 3, padding: '32px' }}>
                <Typography variant="h3" gutterBottom>
                    My Machine Learning Projects
                </Typography>
                <Box mb={4}>
                    <TextField
                        fullWidth
                        label="Search Projects"
                        variant="outlined"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </Box>
                <Box mb={4}>
                    <Typography variant="h6" gutterBottom>
                        Filter by Category:
                    </Typography>
                    <Grid container spacing={1}>
                        {categories.map(category => (
                            <Grid item key={category.value}>
                                <Chip
                                    label={category.label}
                                    clickable
                                    color="primary"
                                    variant={selectedCategories.includes(category.value) ? 'default' : 'outlined'}
                                    onClick={() => handleCategorySelect(category.value)}
                                    style={{ backgroundColor: selectedCategories.includes(category.value) ? category.color : 'transparent', color: selectedCategories.includes(category.value) ? 'white' : 'rgba(0, 0, 0, 0.87)', borderColor: selectedCategories.includes(category.value) ? category.color : 'rgba(0, 0, 0, 0.23)' }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                <Box mt={4} display="flex" justifyContent="space-around">
                    {filteredProjects.map(project => (
                        <Card key={project.id} style={{ maxWidth: 300, margin: '0 auto' }}>
                            <CardActionArea component={Link} to={project.link}>
                                <Box p={2}>
                                    <Typography variant="h5" component="h2" gutterBottom>
                                        {project.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" gutterBottom>
                                        {project.description}
                                    </Typography>
                                    <Box mt={2}>
                                        {project.categories.map(cat => (
                                            <Chip key={cat} label={categories.find(c => c.value === cat)?.label} style={{ backgroundColor: categories.find(c => c.value === cat)?.color, marginRight: 5, marginBottom: 5, color: 'white' }} />
                                        ))}
                                    </Box>
                                </Box>
                            </CardActionArea>
                        </Card>
                    ))}
                </Box>
            </Box>
        </Container>
    );
}

export default Projects;

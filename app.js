const express = require('express');
const path = require('path');
const app = express();

// Define the path for static files
const staticPath = path.join(__dirname, 'public');

// Serve static files from the 'public' directory
app.use(express.static(staticPath));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', { title: 'My Static Web App' });
});

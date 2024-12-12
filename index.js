const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/auth/facebook/callback', async (req, res) => {
    
    const accessToken = req.query.access_token;

    if (!accessToken) {
        return res.status(400).send('Missing access token');
    }

    try {
        // Fetch user data from Facebook
        const response = await axios.get(`https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,email`);
        const userData = response.data;

        res.redirect(`/public/success.html?name=${encodeURIComponent(userData.name)}&email=${encodeURIComponent(userData.email)}`);
    } catch (error) {
        console.error('Error fetching data from Facebook:', error);
        res.status(500).send('Error fetching data from Facebook');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

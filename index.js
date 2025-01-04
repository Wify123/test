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
        console.log('Missing access token');
        return res.status(400).send('Missing access token');
    }

    try {
        console.log('Fetching data from Facebook with access token:', accessToken);
        const response = await axios.get(`https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,email`);
        const userData = response.data;

        // Store user data in a session or database instead of localStorage
        // Example: req.session.userData = userData;

        console.log('User data fetched from Facebook:', userData);

        return res.send(`Login Successful, Welcome ${userData.name} with email: ${userData.email} userData: ${JSON.stringify(userData)}`);
    } catch (error) {
        console.error('Error fetching data from Facebook:', error);
        res.status(500).send('Error fetching data from Facebook');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

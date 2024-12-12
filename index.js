const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/login", async (req, res) => {
  const accessToken = req.body.accessToken;

  try {
    const response = await axios.get(
      `https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,email`
    );
    const userData = response.data;
    res.json(userData);
  } catch (error) {
    console.error("Error fetching Facebook data:", error);
    res.status(500).send("Error fetching data from Facebook");
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

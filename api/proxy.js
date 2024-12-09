const fetch = require('node-fetch'); 

module.exports = async (req, res) => {
  // Check the request method (only handle POST for now)
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests are allowed' });
  }

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbyjMzzdCxl5pXafT3v0T4LGAUHTYA0yBuCcjBwlhobVGAvn7mYE4ejb1LLa_DbMkwGV/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body), // Forward the request data from frontend
    });

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to forward the request' });
  }
};

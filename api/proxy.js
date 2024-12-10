const axios = require('axios');

export default async (req, res) => {
  const GAS_URL = 'https://script.google.com/macros/s/AKfycbzhV9KhuO7juYI2I7t2mmu-X7pkZWlmDwMVeATfFrNK8tpsggycK_GnT3hD0v-kQzTj/exec';

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(204).end(); // No Content
    return;
  }

  if (req.method === 'POST') {
    try {
      console.log('Request body:', req.body);

      const response = await axios.post(GAS_URL, req.body, {
        headers: {
          'Content-Type': 'application/json', // Ensure JSON format is used
        },
      });

      console.log('Response from GAS:', response.data);

      res.setHeader('Access-Control-Allow-Origin', '*');
      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error communicating with GAS:', error.message);
      if (error.response) {
        console.error('GAS Error Response:', error.response.data);
      }
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.status(500).json({ error: 'Error communicating with GAS', details: error.message });
    }
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

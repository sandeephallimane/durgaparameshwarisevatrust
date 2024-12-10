const axios = require('axios');

export default async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(204).end();
    return;
  }

  // Handle POST requests
  if (req.method === 'POST') {
    try {
      const { data } = req.body;

      const GAS_URL = 'https://script.google.com/macros/s/AKfycbwiH5SsvdffCNqOR4kb9dlhFor_Ps7jLTahHbm4qMBn_o5nZcD3QaDXQh-GejOiQd_I/exec';

      const response = await axios.post(GAS_URL, data);

      res.setHeader('Access-Control-Allow-Origin', '*'); 
      res.status(200).json(response.data);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Error communicating with GAS' });
    }
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

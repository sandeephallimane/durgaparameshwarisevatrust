export default async (req, res) => {
  const GAS_URL = 'https://script.google.com/macros/s/AKfycbzPZ03JPLM7SC0Bage_2lwAxZrIpZiWfP-iL_K6mW53mzWF0Xd20Mv7Hat6rX6Ja-Tl_w/exec';

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

      const response = await fetch(GAS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
      });

      const data = await response.json();

      console.log('Response from GAS:', data);

      res.setHeader('Access-Control-Allow-Origin', '*');
      res.status(200).json(data);
    } catch (error) {
      console.error('Error communicating with GAS:', error.message);
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.status(500).json({ error: 'Error communicating with GAS', details: error });
    }
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
export default async (req, res) => {
  const GAS_URL = 'https://script.google.com/macros/s/AKfycbzimeHZGpy_w-lwT55dvYKSMOBtCRSnKDNIdwHH3RzGwQSDH_79ggN5lM0tgUyk5LNuvw/exec';

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
      res.status(500).json({ error: 'Error communicating with GAS', details: error.message });
    }
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

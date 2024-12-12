export default async (req, res) => {
  const GAS_URL = 'https://script.google.com/macros/s/AKfycby4tHVcxWip0j9zS6URc365D3w42QgznCJP6JCmPxLjCHcZXsYxHUCViOzUrEcVpuNr0w/exec';

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

      // Check the Content-Type of the response from GAS
      const contentType = response.headers.get('Content-Type');

      let data;
      if (contentType && contentType.includes('application/json')) {
        // Handle JSON response
        data = await response.json();
        console.log('Response from GAS (JSON):', data);
      } else if (contentType && contentType.includes('text/html')) {
        // Handle HTML response
        data = await response.text();
        console.log('Response from GAS (HTML):', data);
      } else {
        throw new Error('Unexpected content type from GAS');
      }

      res.setHeader('Access-Control-Allow-Origin', '*');

      // If the response is JSON, return it as JSON. Otherwise, return it as plain text.
      if (contentType.includes('application/json')) {
        res.status(200).json(data);
      } else if (contentType.includes('text/html')) {
        res.status(200).send(data);
      } else {
        res.status(500).json({ error: 'Unsupported response format from GAS' });
      }

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

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const VISION_KEY = process.env.VISION_KEY;
  const VISION_ENDPOINT = process.env.VISION_ENDPOINT;

  if (!VISION_KEY || !VISION_ENDPOINT) {
    return res.status(500).json({ error: 'Azure credentials not configured' });
  }

  try {
    const { imageUrl, feature } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: 'No image URL provided' });
    }

    // Always include Description so we get caption text for context
    let visualFeatures = 'Description';
    if (feature === 'face') visualFeatures += ',Faces';
    else if (feature === 'landmark') visualFeatures += ',Categories';
    else if (feature === 'brand') visualFeatures += ',Brands,Objects';
    else visualFeatures += ',Faces,Brands,Categories';

    const endpoint = `${VISION_ENDPOINT}/vision/v3.2/analyze?visualFeatures=${visualFeatures}&details=Landmarks&language=en`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': VISION_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: imageUrl })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ 
        error: data.error?.message || 'Azure API error' 
      });
    }

    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
/**
 * Vercel Serverless Function - Gemini API Proxy
 * Endpoint: /api/chat
 * Method: POST
 * Body: { "message": "user message" }
 * Response: { "reply": "AI response" }
 */

export default async function handler(req, res) {
    // Enable CORS for all origins
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow POST method
    if (req.method !== 'POST') {
        return res.status(405).json({ 
            error: 'Method not allowed. Use POST.' 
        });
    }

    try {
        // Get message from request body
        const { message } = req.body;

        // Validate message
        if (!message || typeof message !== 'string') {
            return res.status(400).json({ 
                error: 'Missing or invalid "message" field in request body' 
            });
        }

        // Get API key from environment variable
        const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
        
        if (!GEMINI_API_KEY) {
            console.error('GEMINI_API_KEY not configured');
            return res.status(500).json({ 
                error: 'Server configuration error. API key not set.' 
            });
        }

        // Gemini API configuration
        const MODEL_NAME = 'gemini-2.0-flash';
        const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`;

        // Call Gemini API
        const response = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: message
                    }]
                }]
            }),
        });

        const data = await response.json();

        // Handle Gemini API errors
        if (!response.ok) {
            console.error('Gemini API error:', data);
            return res.status(response.status).json({ 
                error: data?.error?.message || 'Gemini API request failed' 
            });
        }

        // Extract reply from Gemini response
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!reply) {
            console.error('Invalid Gemini response format:', data);
            return res.status(500).json({ 
                error: 'Invalid response from Gemini API' 
            });
        }

        // Return successful response
        return res.status(200).json({ reply });

    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({ 
            error: 'Internal server error: ' + error.message 
        });
    }
}

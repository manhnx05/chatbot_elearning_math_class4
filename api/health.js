// Vercel Serverless Function để kiểm tra server
export default async function handler(req, res) {
    // Cấu hình CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Xử lý preflight request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const hasApiKey = !!process.env.GEMINI_API_KEY;
    const model = process.env.GEMINI_MODEL || 'gemini-1.5-flash';

    res.status(200).json({ 
        status: 'OK', 
        message: 'Server đang hoạt động trên Vercel',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'production',
        hasApiKey: hasApiKey,
        model: model,
        config: {
            apiKeyConfigured: hasApiKey ? '✅ Đã cấu hình' : '❌ Chưa cấu hình',
            modelName: model
        }
    });
}

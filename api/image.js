// Vercel Serverless Function cho phân tích hình ảnh
export default async function handler(req, res) {
    // Cấu hình CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Xử lý preflight request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Chỉ cho phép POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { image, mimeType } = req.body;
        
        if (!image) {
            return res.status(400).json({ error: 'Thiếu dữ liệu hình ảnh' });
        }

        // API key Gemini - Lấy từ biến môi trường Vercel
        const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
        const MODEL_NAME = process.env.GEMINI_MODEL || 'gemini-1.5-flash';

        if (!GEMINI_API_KEY) {
            console.error('GEMINI_API_KEY không được cấu hình');
            return res.status(500).json({ 
                error: 'Server chưa được cấu hình API key. Vui lòng thêm GEMINI_API_KEY vào Environment Variables trong Vercel.' 
            });
        }

        console.log('Nhận yêu cầu phân tích hình ảnh');

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: "Hãy phân tích và mô tả nội dung của hình ảnh này một cách chi tiết."
                                },
                                {
                                    inline_data: {
                                        mime_type: mimeType || 'image/jpeg',
                                        data: image
                                    }
                                }
                            ]
                        }
                    ]
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error('Lỗi Gemini API:', data);
            return res.status(500).json({ 
                error: data?.error?.message || 'Lỗi từ Gemini API' 
            });
        }

        if (!data.candidates || !data.candidates[0]?.content?.parts[0]?.text) {
            return res.status(500).json({ 
                error: 'Không nhận được phản hồi hợp lệ từ Gemini API' 
            });
        }

        const reply = data.candidates[0].content.parts[0].text;
        res.status(200).json({ reply });

    } catch (error) {
        console.error('Lỗi server:', error);
        res.status(500).json({ error: error.message });
    }
}

const express = require('express');
const cors = require('cors');

// Load biến môi trường từ file .env
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Cấu hình CORS
const corsOptions = {
    origin: process.env.ALLOWED_ORIGINS || '*',
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));

// API key Gemini - Lấy từ biến môi trường
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL_NAME = process.env.GEMINI_MODEL || 'gemini-1.5-flash';

// Kiểm tra API key khi khởi động
if (!GEMINI_API_KEY) {
    console.error('⚠️  CẢNH BÁO: Chưa cấu hình GEMINI_API_KEY trong file .env');
    console.error('Vui lòng tạo file .env và thêm GEMINI_API_KEY=your_api_key');
}

// Endpoint xử lý chat
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        
        if (!message) {
            return res.status(400).json({ error: 'Thiếu nội dung tin nhắn' });
        }

        if (!GEMINI_API_KEY) {
            return res.status(500).json({ error: 'Server chưa được cấu hình API key' });
        }

        console.log('Nhận tin nhắn:', message);

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
                                    text: message
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
        res.json({ reply });

    } catch (error) {
        console.error('Lỗi server:', error);
        res.status(500).json({ error: error.message });
    }
});

// Endpoint xử lý phân tích hình ảnh
app.post('/api/image', async (req, res) => {
    try {
        const { image, mimeType } = req.body;
        
        if (!image) {
            return res.status(400).json({ error: 'Thiếu dữ liệu hình ảnh' });
        }

        if (!GEMINI_API_KEY) {
            return res.status(500).json({ error: 'Server chưa được cấu hình API key' });
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
        res.json({ reply });

    } catch (error) {
        console.error('Lỗi server:', error);
        res.status(500).json({ error: error.message });
    }
});

// Endpoint kiểm tra server
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Server đang hoạt động',
        environment: process.env.NODE_ENV || 'development',
        hasApiKey: !!GEMINI_API_KEY,
        model: MODEL_NAME
    });
});

// Serve static files
app.use(express.static('.'));

app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔑 API Key: ${GEMINI_API_KEY ? '✅ Đã cấu hình' : '❌ Chưa cấu hình'}`);
    console.log(`🤖 Model: ${MODEL_NAME}`);
    console.log(`\n💡 Test server: http://localhost:${PORT}/api/health`);
    console.log(`🌐 Mở chatbot: http://localhost:${PORT}/index.html\n`);
});

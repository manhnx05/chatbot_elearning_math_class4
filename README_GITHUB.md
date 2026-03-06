# 🎓 Chatbot Trợ lý Học Toán Lớp 4

Chatbot AI hỗ trợ học sinh lớp 4 học toán với giáo viên **Nguyễn Thị Ngọc Điệp**.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/YOUR_REPO_NAME)

## ✨ Tính năng

- 💬 Chat với AI về kiến thức toán lớp 4
- 🎤 Nhập bằng giọng nói (Speech Recognition)
- 📷 Phân tích hình ảnh bài toán
- 💡 Câu hỏi gợi ý về đo lường (tấn, tạ, yến, kg)
- 🎨 Giao diện thân thiện, màu sắc vui nhộn cho học sinh tiểu học
- 🔒 API key được bảo mật trên server (không lộ ra client)

## 🚀 Demo

**Live Demo:** [https://your-project.vercel.app](https://your-project.vercel.app)

## 📸 Screenshots

![Chatbot Interface](screenshot.png)

## 🛠️ Công nghệ sử dụng

- **Frontend:** HTML, CSS, JavaScript (Vanilla)
- **Backend:** Node.js, Express.js
- **AI:** Google Gemini API (gemini-1.5-flash)
- **Deploy:** Vercel Serverless Functions
- **Speech Recognition:** Web Speech API

## 📦 Cài đặt Local

### Yêu cầu
- Node.js >= 18.x
- npm hoặc yarn
- Gemini API Key

### Các bước cài đặt

1. **Clone repository**
```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

2. **Cài đặt dependencies**
```bash
npm install
```

3. **Cấu hình biến môi trường**
```bash
cp .env.example .env
```

Mở file `.env` và thêm API key:
```env
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-1.5-flash
PORT=3000
NODE_ENV=development
ALLOWED_ORIGINS=*
```

4. **Lấy Gemini API Key**
- Truy cập: https://makersuite.google.com/app/apikey
- Đăng nhập bằng Google Account
- Tạo API key mới
- Copy và paste vào file `.env`

5. **Chạy server**
```bash
npm start
```

Server sẽ chạy tại: http://localhost:3000

6. **Mở chatbot**
- Truy cập: http://localhost:3000/index.html
- Hoặc mở file `index.html` trực tiếp trong trình duyệt

## 🌐 Deploy lên Vercel

### Cách 1: Deploy qua Vercel Dashboard (Khuyến nghị)

1. **Fork/Clone repository này**

2. **Đăng nhập Vercel**
   - Truy cập: https://vercel.com
   - Đăng nhập bằng GitHub

3. **Import Project**
   - Click "Add New" → "Project"
   - Chọn repository của bạn
   - Click "Import"

4. **Cấu hình Environment Variables**
   
   Thêm các biến sau:
   
   | Name | Value | Environment |
   |------|-------|-------------|
   | `GEMINI_API_KEY` | Your API Key | Production, Preview, Development |
   | `GEMINI_MODEL` | `gemini-1.5-flash` | Production, Preview, Development |

5. **Deploy**
   - Click "Deploy"
   - Đợi 1-2 phút
   - Nhận link: `https://your-project.vercel.app`

### Cách 2: Deploy bằng Vercel CLI

```bash
# Cài đặt Vercel CLI
npm install -g vercel

# Đăng nhập
vercel login

# Deploy
vercel

# Thêm environment variables
vercel env add GEMINI_API_KEY
vercel env add GEMINI_MODEL

# Deploy production
vercel --prod
```

### Cách 3: Deploy bằng nút Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/YOUR_REPO_NAME&env=GEMINI_API_KEY,GEMINI_MODEL&envDescription=API%20keys%20needed%20for%20Gemini%20AI&envLink=https://makersuite.google.com/app/apikey)

## 📁 Cấu trúc Project

```
├── api/                    # Vercel Serverless Functions
│   ├── chat.js            # API endpoint cho chat
│   ├── image.js           # API endpoint cho phân tích ảnh
│   └── health.js          # API endpoint kiểm tra server
├── index.html             # Giao diện chatbot
├── server.js              # Server local (development)
├── vercel.json            # Cấu hình Vercel
├── package.json           # Dependencies
├── .env.example           # Template biến môi trường
├── .gitignore             # Git ignore rules
├── README.md              # Tài liệu này
└── HUONG_DAN_DEPLOY.md    # Hướng dẫn deploy chi tiết
```

## 🔧 API Endpoints

### POST /api/chat
Chat với AI

**Request:**
```json
{
  "message": "1 tấn bằng bao nhiêu tạ?"
}
```

**Response:**
```json
{
  "reply": "1 tấn bằng 10 tạ nhé em!"
}
```

### POST /api/image
Phân tích hình ảnh

**Request:**
```json
{
  "image": "base64_encoded_image",
  "mimeType": "image/jpeg"
}
```

**Response:**
```json
{
  "reply": "Đây là bài toán về..."
}
```

### GET /api/health
Kiểm tra trạng thái server

**Response:**
```json
{
  "status": "OK",
  "message": "Server đang hoạt động",
  "hasApiKey": true,
  "model": "gemini-1.5-flash"
}
```

## 🎯 Sử dụng

### Chat thông thường
1. Nhập câu hỏi vào ô chat
2. Click "GỬI" hoặc nhấn Enter
3. Nhận câu trả lời từ AI

### Chat bằng giọng nói
1. Click nút "🎙️ Nói"
2. Cho phép trình duyệt truy cập microphone
3. Nói câu hỏi
4. Hệ thống tự động gửi và nhận câu trả lời

### Phân tích hình ảnh
1. Click nút "📷 Ảnh"
2. Chọn hình ảnh từ máy tính
3. AI sẽ phân tích và mô tả nội dung

### Câu hỏi gợi ý
- Click vào các câu hỏi gợi ý màu vàng
- Hệ thống tự động gửi câu hỏi đó

## 🔒 Bảo mật

- ✅ API key được lưu trữ an toàn trên server
- ✅ Không lộ API key ra client
- ✅ CORS được cấu hình đúng
- ✅ Environment variables được quản lý bởi Vercel
- ✅ File `.env` không được commit lên Git

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Vui lòng:

1. Fork repository
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 👥 Tác giả

**Giáo viên:** Nguyễn Thị Ngọc Điệp
**Developer:** [Your Name]
**Email:** [Your Email]

## 🙏 Cảm ơn

- [Google Gemini AI](https://ai.google.dev/) - AI API
- [Vercel](https://vercel.com) - Hosting platform
- [MathJax](https://www.mathjax.org/) - Hiển thị công thức toán

## 📞 Liên hệ

- 📧 Email: [email]
- 📱 Phone: 0363357745
- 🌐 Website: [website]

---

⭐ Nếu project này hữu ích, hãy cho một star nhé! ⭐

# Chatbot Trợ lý Học Toán Lớp 4

Chatbot hỗ trợ học sinh lớp 4 học toán với giáo viên Nguyễn Thị Ngọc Điệp.

## 🚀 Deploy lên Vercel

### Bước 1: Chuẩn bị

1. Tạo tài khoản Vercel tại: https://vercel.com
2. Cài đặt Vercel CLI (tùy chọn):
```bash
npm install -g vercel
```

### Bước 2: Deploy

**Cách 1: Deploy qua Vercel Dashboard (Đơn giản nhất)**

1. Đăng nhập vào https://vercel.com
2. Click "Add New" → "Project"
3. Import repository từ GitHub/GitLab hoặc upload thư mục
4. Vercel sẽ tự động phát hiện cấu hình
5. Thêm biến môi trường:
   - Key: `GEMINI_API_KEY`
   - Value: API key Gemini của bạn
6. Click "Deploy"

**Cách 2: Deploy qua CLI**

```bash
# Đăng nhập Vercel
vercel login

# Deploy
vercel

# Thêm biến môi trường
vercel env add GEMINI_API_KEY
```

### Bước 3: Cấu hình biến môi trường

Trong Vercel Dashboard:
1. Vào Project Settings
2. Chọn "Environment Variables"
3. Thêm:
   - Name: `GEMINI_API_KEY`
   - Value: [API key Gemini của bạn]
   - Environment: Production, Preview, Development

### Bước 4: Lấy Gemini API Key

1. Truy cập: https://makersuite.google.com/app/apikey
2. Tạo API key mới
3. Copy và paste vào Vercel Environment Variables

## 📦 Cài đặt Local

1. Cài đặt dependencies:
```bash
npm install
```

2. Tạo file `.env`:
```bash
cp .env.example .env
```

3. Thêm API key vào file `.env`:
```
GEMINI_API_KEY=your_api_key_here
```

4. Chạy server:
```bash
npm start
```

5. Mở `index.html` trong trình duyệt

## 📁 Cấu trúc thư mục

```
├── api/
│   ├── chat.js          # API endpoint cho chat
│   ├── image.js         # API endpoint cho phân tích ảnh
│   └── health.js        # API endpoint kiểm tra server
├── index.html           # Giao diện chatbot
├── server.js            # Server local (cho development)
├── vercel.json          # Cấu hình Vercel
├── package.json         # Dependencies
└── README.md            # Hướng dẫn
```

## ✨ Tính năng

- 💬 Chat với AI về kiến thức toán lớp 4
- 🎤 Nhập bằng giọng nói
- 📷 Phân tích hình ảnh
- 💡 Câu hỏi gợi ý về đo lường (tấn, tạ, yến)
- 🎨 Giao diện thân thiện với học sinh tiểu học
- 🔒 API key được bảo mật trên server

## 🌐 Sau khi deploy

URL của bạn sẽ có dạng: `https://your-project-name.vercel.app`

Chia sẻ link này để mọi người có thể sử dụng chatbot!

## 🔧 Troubleshooting

**Lỗi CORS:**
- Đã được cấu hình sẵn trong các API endpoints

**Lỗi API Key:**
- Kiểm tra biến môi trường `GEMINI_API_KEY` trong Vercel
- Đảm bảo API key còn hiệu lực

**Lỗi 404:**
- Kiểm tra file `vercel.json` đã được commit
- Redeploy project

## 📝 Lưu ý

- API key Gemini được lưu trữ an toàn trên server
- Không commit file `.env` lên Git
- Sử dụng `.env.example` làm template


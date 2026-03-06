# 🎓 Chatbot Trợ lý Học Toán Lớp 4

Chatbot AI hỗ trợ học sinh lớp 4 học toán với **Cô Nguyễn Thị Ngọc Điệp**.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/manhnx05/chatbot_elearning_math_class4)

## ✨ Tính năng

- 💬 Chat với AI về kiến thức toán lớp 4
- 🎤 Nhập bằng giọng nói (Speech Recognition)
- 📷 Phân tích hình ảnh bài toán
- 💡 Câu hỏi gợi ý về đo lường (tấn, tạ, yến, kg)
- 🎨 Giao diện thân thiện, màu sắc vui nhộn cho học sinh tiểu học
- 🔒 API key được bảo mật trên server

## 🚀 Sử dụng nhanh

### Cách 1: Chạy Local

```bash
# Clone repository
git clone https://github.com/manhnx05/chatbot_elearning_math_class4.git
cd chatbot_elearning_math_class4

# Cài đặt dependencies
npm install

# Tạo file .env
cp .env.example .env
# Thêm GEMINI_API_KEY vào file .env

# Chạy server
npm start

# Mở trình duyệt
# http://localhost:3000/index.html
```

### Cách 2: Deploy lên Vercel

1. Fork repository này
2. Vào https://vercel.com
3. Import project từ GitHub
4. Thêm Environment Variable: `GEMINI_API_KEY`
5. Deploy!

**Hoặc click nút này:**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/manhnx05/chatbot_elearning_math_class4&env=GEMINI_API_KEY&envDescription=Gemini%20API%20Key%20from%20Google%20AI%20Studio&envLink=https://makersuite.google.com/app/apikey)

## 📚 Tài liệu

- [📖 Hướng dẫn sử dụng](HUONG_DAN_SU_DUNG.md) - Chi tiết cách chạy và sử dụng
- [🔒 Bảo mật](SECURITY.md) - Hướng dẫn bảo mật API key
- [✅ Kiểm tra bảo mật](SECURITY_CHECK.md) - Báo cáo kiểm tra

## 🛠️ Công nghệ

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **AI:** Google Gemini API
- **Deploy:** Vercel Serverless Functions

## 📁 Cấu trúc

```
├── api/                    # Vercel Serverless Functions
│   ├── chat.js            # Chat endpoint
│   ├── image.js           # Image analysis endpoint
│   └── health.js          # Health check endpoint
├── index.html             # Giao diện chatbot
├── server.js              # Local development server
├── vercel.json            # Vercel configuration
├── package.json           # Dependencies
└── .env.example           # Environment variables template
```

## 🎯 Demo

**Live Demo:** Đang deploy...

## 📞 Liên hệ

- **Giáo viên:** Cô Nguyễn Thị Ngọc Điệp
- **Phone:** 0363357745
- **GitHub:** https://github.com/manhnx05/chatbot_elearning_math_class4

## 📝 License

MIT License

---

⭐ Nếu project hữu ích, hãy cho một star nhé! ⭐

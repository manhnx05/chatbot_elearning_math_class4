# 📖 HƯỚNG DẪN SỬ DỤNG

## 🚀 Cách chạy Chatbot

### Cách 1: Chạy với Server Local (Khuyến nghị)

**Bước 1: Cài đặt**
```bash
# Mở Terminal/CMD trong thư mục project
cd D:\Web\chat_bot_eln

# Cài đặt dependencies
npm install
```

**Bước 2: Chạy server**
```bash
npm start
```

Bạn sẽ thấy:
```
🚀 Server đang chạy tại http://localhost:3000
📊 Environment: development
🔑 API Key: ✅ Đã cấu hình
🤖 Model: gemini-1.5-flash

💡 Test server: http://localhost:3000/api/health
🌐 Mở chatbot: http://localhost:3000/index.html
```

**Bước 3: Mở chatbot**
- Truy cập: http://localhost:3000/index.html
- Hoặc mở trình duyệt và vào địa chỉ trên

### Cách 2: Mở file HTML trực tiếp (Giới hạn)

**Lưu ý:** Cách này chỉ hoạt động với các câu hỏi gợi ý có sẵn.

1. Double-click vào file `index.html`
2. Chatbot sẽ hiển thị thông báo cần chạy server
3. Bạn vẫn có thể dùng các câu hỏi gợi ý màu vàng

### Cách 3: Deploy lên Vercel (Cho mọi người dùng)

Xem hướng dẫn chi tiết trong file [HUONG_DAN_DEPLOY.md](HUONG_DAN_DEPLOY.md)

## 💬 Cách sử dụng Chatbot

### 1. Chat thông thường
- Nhập câu hỏi vào ô chat
- Nhấn "GỬI 📤" hoặc Enter
- Đợi AI trả lời

**Ví dụ:**
- "1 tấn bằng bao nhiêu tạ?"
- "Đổi 500 kg ra yến"
- "Giải thích cách đổi đơn vị khối lượng"

### 2. Chat bằng giọng nói 🎤
- Click nút "🎙️ Nói"
- Cho phép trình duyệt truy cập microphone
- Nói câu hỏi rõ ràng
- Hệ thống tự động gửi

**Lưu ý:** Chỉ hoạt động trên Chrome, Edge, Safari (không hỗ trợ Firefox)

### 3. Phân tích hình ảnh 📷
- Click nút "📷 Ảnh"
- Chọn hình ảnh bài toán từ máy tính
- AI sẽ phân tích và giải thích

**Hỗ trợ:** JPG, PNG, GIF (tối đa 10MB)

### 4. Câu hỏi gợi ý
- Click vào các nút màu vàng
- Hệ thống tự động gửi câu hỏi
- Nhận câu trả lời ngay lập tức

## 🔧 Xử lý lỗi thường gặp

### Lỗi: "Không thể kết nối đến server local"

**Nguyên nhân:** Server chưa chạy

**Giải pháp:**
```bash
# Mở Terminal/CMD
cd D:\Web\chat_bot_eln
npm start
```

### Lỗi: "Server chưa được cấu hình API key"

**Nguyên nhân:** Thiếu file .env

**Giải pháp:**
```bash
# Tạo file .env từ template
cp .env.example .env

# Mở file .env và thêm API key
# GEMINI_API_KEY=your_api_key_here
```

### Lỗi: "Failed to fetch"

**Nguyên nhân:** CORS hoặc server không chạy

**Giải pháp:**
1. Kiểm tra server đang chạy: http://localhost:3000/api/health
2. Nếu không chạy, chạy lại: `npm start`
3. Refresh lại trang chatbot

### Lỗi: "npm: command not found"

**Nguyên nhân:** Chưa cài Node.js

**Giải pháp:**
1. Download Node.js: https://nodejs.org/
2. Cài đặt (chọn LTS version)
3. Restart Terminal/CMD
4. Chạy lại: `npm install`

### Lỗi: Microphone không hoạt động

**Nguyên nhân:** Trình duyệt không hỗ trợ hoặc chưa cấp quyền

**Giải pháp:**
1. Dùng Chrome hoặc Edge (không dùng Firefox)
2. Cho phép truy cập microphone khi được hỏi
3. Kiểm tra Settings → Privacy → Microphone

## 📊 Kiểm tra Server

### Test API Health
```bash
# Mở trình duyệt hoặc dùng curl
curl http://localhost:3000/api/health
```

**Kết quả mong đợi:**
```json
{
  "status": "OK",
  "message": "Server đang hoạt động",
  "environment": "development",
  "hasApiKey": true,
  "model": "gemini-1.5-flash"
}
```

### Test Chat API
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"1 tấn bằng bao nhiêu tạ?"}'
```

## 🎯 Tips sử dụng

### Câu hỏi hiệu quả
✅ **TốT:**
- "1 tấn bằng bao nhiêu tạ?"
- "Giải thích cách đổi kg ra yến"
- "Bài toán: Một xe tải chở 3 tấn hàng..."

❌ **Không tốt:**
- "Tính" (quá ngắn, không rõ ràng)
- "???" (không có nội dung)
- Câu hỏi không liên quan đến toán

### Tối ưu hiệu suất
- Dùng câu hỏi gợi ý cho câu trả lời nhanh (không cần gọi API)
- Hình ảnh nên rõ nét, không quá lớn
- Đóng các tab không dùng để giảm tải

### Bảo mật
- Không chia sẻ file `.env` cho người khác
- Không commit file `.env` lên Git
- Khi deploy, dùng Environment Variables

## 📞 Hỗ trợ

**Gặp vấn đề?**
- Đọc file [SECURITY.md](SECURITY.md) cho vấn đề bảo mật
- Đọc file [HUONG_DAN_DEPLOY.md](HUONG_DAN_DEPLOY.md) cho deploy
- Liên hệ: 0363357745

**Báo lỗi:**
- Tạo issue trên GitHub: https://github.com/manhnx05/chatbot_elearning_math_class4/issues
- Mô tả chi tiết lỗi và các bước tái hiện

## 🎉 Chúc bạn học toán vui vẻ!

Nếu có thắc mắc, đừng ngại hỏi cô Ngọc Điệp nhé! 😊

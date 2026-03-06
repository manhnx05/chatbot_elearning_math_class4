# 🚀 HƯỚNG DẪN DEPLOY LÊN VERCEL

## Bước 1: Chuẩn bị

### 1.1. Tạo tài khoản Vercel
- Truy cập: https://vercel.com
- Đăng ký bằng GitHub, GitLab hoặc Email

### 1.2. Lấy Gemini API Key
- Truy cập: https://makersuite.google.com/app/apikey
- Đăng nhập bằng tài khoản Google
- Click "Create API Key"
- Copy API key (dạng: AIzaSy...)

## Bước 2: Deploy qua Vercel Dashboard (Khuyến nghị)

### 2.1. Upload Project
1. Đăng nhập vào https://vercel.com
2. Click "Add New" → "Project"
3. Chọn "Import Git Repository" hoặc "Upload"
4. Nếu upload: Nén thư mục project thành .zip và upload

### 2.2. Cấu hình Environment Variables
Trong màn hình deploy, tìm mục "Environment Variables":

**Biến bắt buộc:**
```
Name: GEMINI_API_KEY
Value: [Paste API key của bạn]
Environment: Production, Preview, Development (chọn tất cả)
```

**Biến tùy chọn:**
```
Name: GEMINI_MODEL
Value: gemini-1.5-flash
Environment: Production, Preview, Development

Name: NODE_ENV
Value: production
Environment: Production
```

### 2.3. Deploy
1. Click "Deploy"
2. Đợi 1-2 phút để Vercel build và deploy
3. Nhận được URL: `https://your-project-name.vercel.app`

## Bước 3: Deploy qua Vercel CLI (Nâng cao)

### 3.1. Cài đặt Vercel CLI
```bash
npm install -g vercel
```

### 3.2. Đăng nhập
```bash
vercel login
```

### 3.3. Deploy
```bash
# Deploy lần đầu
vercel

# Thêm environment variables
vercel env add GEMINI_API_KEY
# Nhập API key khi được hỏi
# Chọn: Production, Preview, Development

vercel env add GEMINI_MODEL
# Nhập: gemini-1.5-flash

# Deploy production
vercel --prod
```

## Bước 4: Kiểm tra sau khi deploy

### 4.1. Test API Health
Truy cập: `https://your-project-name.vercel.app/api/health`

Kết quả mong đợi:
```json
{
  "status": "OK",
  "message": "Server đang hoạt động trên Vercel",
  "hasApiKey": true,
  "model": "gemini-1.5-flash"
}
```

### 4.2. Test Chatbot
Truy cập: `https://your-project-name.vercel.app/index.html`

Thử chat: "xin chào" hoặc "1 tấn bằng bao nhiêu tạ?"

## Bước 5: Cập nhật Environment Variables (sau khi deploy)

### Qua Dashboard:
1. Vào project trong Vercel Dashboard
2. Settings → Environment Variables
3. Add hoặc Edit biến
4. Redeploy để áp dụng thay đổi

### Qua CLI:
```bash
# Xem tất cả biến
vercel env ls

# Thêm biến mới
vercel env add VARIABLE_NAME

# Xóa biến
vercel env rm VARIABLE_NAME

# Pull biến về local (để test)
vercel env pull
```

## Bước 6: Custom Domain (Tùy chọn)

1. Vào project → Settings → Domains
2. Add domain của bạn
3. Cấu hình DNS theo hướng dẫn của Vercel
4. Đợi DNS propagate (5-10 phút)

## 📋 Checklist Deploy

- [ ] Đã tạo tài khoản Vercel
- [ ] Đã có Gemini API Key
- [ ] Đã upload/import project
- [ ] Đã thêm GEMINI_API_KEY vào Environment Variables
- [ ] Deploy thành công
- [ ] Test /api/health trả về hasApiKey: true
- [ ] Test chatbot hoạt động bình thường
- [ ] Chia sẻ link cho người dùng

## 🔧 Troubleshooting

### Lỗi: "Server chưa được cấu hình API key"
**Nguyên nhân:** Chưa thêm GEMINI_API_KEY vào Environment Variables
**Giải pháp:** 
1. Vào Settings → Environment Variables
2. Add GEMINI_API_KEY
3. Redeploy

### Lỗi: "Failed to fetch"
**Nguyên nhân:** CORS hoặc API endpoint không đúng
**Giải pháp:** Đã được cấu hình sẵn trong code, redeploy

### Lỗi: Build failed
**Nguyên nhân:** Thiếu dependencies
**Giải pháp:** 
```bash
npm install
git add package.json package-lock.json
git commit -m "Update dependencies"
git push
```

### API Key bị lộ
**Giải pháp:**
1. Tạo API key mới tại Google AI Studio
2. Xóa API key cũ
3. Cập nhật GEMINI_API_KEY trong Vercel
4. Redeploy

## 📞 Hỗ trợ

- Vercel Docs: https://vercel.com/docs
- Gemini API Docs: https://ai.google.dev/docs
- GitHub Issues: [Link repository của bạn]

## 🎉 Hoàn thành!

Sau khi deploy thành công, chia sẻ link:
`https://your-project-name.vercel.app`

Mọi người có thể truy cập và sử dụng chatbot mà không cần cài đặt gì!

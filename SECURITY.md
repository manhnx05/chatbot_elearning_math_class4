# 🔒 Hướng dẫn Bảo mật

## ✅ Các biện pháp bảo mật đã áp dụng

### 1. API Key không bị lộ
- ✅ File `.env` chứa API key thật đã được thêm vào `.gitignore`
- ✅ Chỉ có `.env.example` (template không có API key) được commit
- ✅ API key được lưu trữ an toàn trên server và Vercel Environment Variables
- ✅ Client (index.html) không chứa bất kỳ API key nào

### 2. Kiến trúc bảo mật
```
Client (index.html)
    ↓ (không có API key)
Server/Vercel Functions (api/*.js)
    ↓ (có API key từ env variables)
Google Gemini API
```

### 3. Files được bảo vệ
- `.env` - Chứa API key thật (KHÔNG được commit)
- `.env.local` - Biến môi trường local (KHÔNG được commit)
- `node_modules/` - Dependencies (KHÔNG được commit)
- `.vercel/` - Vercel config (KHÔNG được commit)

## 🚨 Nếu API Key bị lộ

### Bước 1: Vô hiệu hóa API Key cũ
1. Truy cập: https://makersuite.google.com/app/apikey
2. Tìm API key bị lộ
3. Click "Delete" hoặc "Revoke"

### Bước 2: Tạo API Key mới
1. Click "Create API Key"
2. Copy API key mới

### Bước 3: Cập nhật API Key

**Local:**
```bash
# Cập nhật file .env
GEMINI_API_KEY=new_api_key_here
```

**Vercel:**
1. Vào project → Settings → Environment Variables
2. Edit `GEMINI_API_KEY`
3. Paste API key mới
4. Save
5. Redeploy project

### Bước 4: Xóa API Key khỏi Git History (nếu đã commit nhầm)

```bash
# Cài đặt git-filter-repo
pip install git-filter-repo

# Xóa file chứa API key khỏi history
git filter-repo --path .env --invert-paths

# Force push (cẩn thận!)
git push origin --force --all
```

**Hoặc dùng BFG Repo-Cleaner:**
```bash
# Download BFG
# https://rtyley.github.io/bfg-repo-cleaner/

# Xóa API key
bfg --replace-text passwords.txt

# Clean up
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Force push
git push origin --force --all
```

## 📋 Checklist Bảo mật

Trước khi commit:
- [ ] Kiểm tra không có API key trong code
- [ ] File `.env` đã được thêm vào `.gitignore`
- [ ] Chỉ commit `.env.example` (không có API key thật)
- [ ] Chạy `git status` để xem files sẽ được commit
- [ ] Chạy `git diff` để xem nội dung thay đổi

Trước khi push:
- [ ] Review lại commit: `git log -1 -p`
- [ ] Đảm bảo không có sensitive data
- [ ] API key được lưu trong Vercel Environment Variables

## 🔍 Kiểm tra API Key bị lộ

### Cách 1: Tìm kiếm trong Git
```bash
# Tìm trong working directory
git grep -i "AIzaSy"

# Tìm trong toàn bộ history
git log -p -S "AIzaSy"
```

### Cách 2: Dùng GitHub Secret Scanning
- GitHub tự động quét và cảnh báo nếu phát hiện API key
- Kiểm tra tab "Security" trong repository

### Cách 3: Dùng công cụ bên thứ 3
- [GitGuardian](https://www.gitguardian.com/)
- [TruffleHog](https://github.com/trufflesecurity/trufflehog)
- [Gitleaks](https://github.com/gitleaks/gitleaks)

## 🛡️ Best Practices

### 1. Luôn dùng Environment Variables
```javascript
// ❌ KHÔNG BAO GIỜ làm thế này
const API_KEY = "AIzaSyABC123...";

// ✅ Luôn dùng environment variables
const API_KEY = process.env.GEMINI_API_KEY;
```

### 2. Không hardcode secrets
```javascript
// ❌ SAI
const config = {
  apiKey: "AIzaSyABC123...",
  password: "mypassword123"
};

// ✅ ĐÚNG
const config = {
  apiKey: process.env.API_KEY,
  password: process.env.PASSWORD
};
```

### 3. Review code trước khi commit
```bash
# Xem những gì sẽ được commit
git diff --staged

# Xem chi tiết từng file
git diff --staged index.html
```

### 4. Sử dụng pre-commit hooks
Tạo file `.git/hooks/pre-commit`:
```bash
#!/bin/bash
if git diff --cached | grep -i "AIzaSy"; then
    echo "⚠️  CẢNH BÁO: Phát hiện API key trong code!"
    echo "Vui lòng xóa API key trước khi commit."
    exit 1
fi
```

## 📞 Báo cáo vấn đề bảo mật

Nếu phát hiện lỗ hổng bảo mật, vui lòng:
1. KHÔNG tạo public issue
2. Email trực tiếp: [your-email@example.com]
3. Mô tả chi tiết vấn đề
4. Chúng tôi sẽ phản hồi trong 48h

## 📚 Tài liệu tham khảo

- [GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning)
- [OWASP API Security](https://owasp.org/www-project-api-security/)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Google Cloud Security Best Practices](https://cloud.google.com/security/best-practices)

---

**Lưu ý:** Bảo mật là trách nhiệm của tất cả mọi người. Hãy luôn cẩn thận khi làm việc với API keys và sensitive data!

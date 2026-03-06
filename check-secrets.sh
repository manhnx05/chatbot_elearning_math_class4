#!/bin/bash

# Script kiểm tra API keys và secrets trước khi commit

echo "🔍 Đang kiểm tra API keys và secrets..."

# Patterns cần tìm
PATTERNS=(
    "AIzaSy[A-Za-z0-9_-]{33}"  # Google API Key
    "sk-[A-Za-z0-9]{48}"        # OpenAI API Key
    "ghp_[A-Za-z0-9]{36}"       # GitHub Personal Access Token
    "password\s*=\s*['\"][^'\"]+['\"]"  # Hardcoded passwords
)

FOUND=0

for pattern in "${PATTERNS[@]}"; do
    if git diff --cached | grep -E "$pattern" > /dev/null; then
        echo "⚠️  CẢNH BÁO: Phát hiện có thể là API key hoặc secret!"
        echo "Pattern: $pattern"
        FOUND=1
    fi
done

# Kiểm tra file .env
if git diff --cached --name-only | grep -E "^\.env$" > /dev/null; then
    echo "⚠️  CẢNH BÁO: File .env đang được commit!"
    echo "File .env chứa secrets không nên được commit."
    FOUND=1
fi

if [ $FOUND -eq 1 ]; then
    echo ""
    echo "❌ Commit bị hủy để bảo vệ secrets!"
    echo "Vui lòng:"
    echo "  1. Xóa API keys/secrets khỏi code"
    echo "  2. Sử dụng environment variables"
    echo "  3. Đảm bảo .env được thêm vào .gitignore"
    exit 1
fi

echo "✅ Không phát hiện API keys hoặc secrets"
echo "✅ An toàn để commit!"
exit 0

# 🤖 Gemini Chatbot Server

A minimal serverless backend proxy for Google Gemini API, deployable on Vercel. This server acts as a secure intermediary to hide your Gemini API key from public frontends.

## 📁 Project Structure

```
gemini-chatbot-server/
├── api/
│   └── chat.js          # Serverless function endpoint
├── package.json         # Project configuration
├── vercel.json          # Vercel deployment config
└── README.md            # This file
```

## 🚀 Deploy to Vercel

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to https://vercel.com
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Click "Deploy"

3. **Add Environment Variable**
   - Go to Project Settings → Environment Variables
   - Add new variable:
     - **Name:** `GEMINI_API_KEY`
     - **Value:** Your Gemini API key (get from https://makersuite.google.com/app/apikey)
     - **Environment:** Production, Preview, Development (select all)
   - Click "Save"

4. **Redeploy**
   - Go to Deployments tab
   - Click "Redeploy" on the latest deployment

### Method 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Add environment variable
vercel env add GEMINI_API_KEY

# Deploy to production
vercel --prod
```

### Method 3: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/YOUR_REPO&env=GEMINI_API_KEY&envDescription=Gemini%20API%20Key%20from%20Google%20AI%20Studio&envLink=https://makersuite.google.com/app/apikey)

## 🔑 Get Gemini API Key

1. Visit https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key (starts with `AIzaSy...`)

## 📡 API Endpoint

### POST /api/chat

**Request:**
```json
{
  "message": "What is 1 ton in kg?"
}
```

**Response:**
```json
{
  "reply": "1 ton is equal to 1000 kilograms."
}
```

**Error Response:**
```json
{
  "error": "Error message here"
}
```

## 💻 Frontend Integration

### Example: HTML + JavaScript

```html
<!DOCTYPE html>
<html>
<head>
    <title>Gemini Chatbot</title>
</head>
<body>
    <input type="text" id="userInput" placeholder="Ask a question...">
    <button onclick="sendMessage()">Send</button>
    <div id="response"></div>

    <script>
        // Replace with your deployed Vercel URL
        const API_URL = 'https://your-project.vercel.app/api/chat';

        async function sendMessage() {
            const message = document.getElementById('userInput').value;
            
            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message: message })
                });

                const data = await response.json();
                
                if (response.ok) {
                    document.getElementById('response').innerText = data.reply;
                } else {
                    document.getElementById('response').innerText = 'Error: ' + data.error;
                }
            } catch (error) {
                document.getElementById('response').innerText = 'Network error: ' + error.message;
            }
        }
    </script>
</body>
</html>
```

### Example: Using fetch() in JavaScript

```javascript
async function chatWithGemini(message) {
    const API_URL = 'https://your-project.vercel.app/api/chat';
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message })
        });

        const data = await response.json();
        
        if (response.ok) {
            return data.reply;
        } else {
            throw new Error(data.error);
        }
    } catch (error) {
        console.error('Chat error:', error);
        throw error;
    }
}

// Usage
chatWithGemini('Hello, how are you?')
    .then(reply => console.log('AI:', reply))
    .catch(error => console.error('Error:', error));
```

## 🧪 Test Locally

```bash
# Install Vercel CLI
npm install -g vercel

# Set environment variable locally
export GEMINI_API_KEY=your_api_key_here

# Run development server
vercel dev

# Test endpoint
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello"}'
```

## 🔒 Security Features

- ✅ API key stored securely in Vercel Environment Variables
- ✅ API key never exposed to frontend
- ✅ CORS enabled for public access
- ✅ Input validation
- ✅ Error handling
- ✅ No API key in source code

## 📝 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | Yes | Your Google Gemini API key |

## 🛠️ Troubleshooting

### Error: "Server configuration error. API key not set."
- Make sure you added `GEMINI_API_KEY` in Vercel Environment Variables
- Redeploy after adding the variable

### Error: "Method not allowed"
- Use POST method, not GET
- Check your fetch() request method

### Error: "Missing or invalid message field"
- Ensure request body contains `{ "message": "your text" }`
- Check Content-Type header is `application/json`

### CORS Error
- CORS is already enabled in the code
- If still having issues, check browser console for details

## 📄 License

MIT License - Feel free to use for any purpose

## 👥 Author

**Cô Nguyễn Thị Ngọc Điệp**
- GitHub: https://github.com/manhnx05/chatbot_elearning_math_class4

## 🙏 Acknowledgments

- [Google Gemini API](https://ai.google.dev/)
- [Vercel](https://vercel.com)

---

⭐ If this project helps you, please give it a star!

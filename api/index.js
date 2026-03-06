export default function handler(req, res) {
    res.status(200).json({
        status: "API is running",
        endpoints: {
            chat: "POST /api/chat"
        }
    });
}

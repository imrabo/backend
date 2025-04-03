import "dotenv/config";
import connectDB from './config/database.js';
import app from './app.js';
import { server } from "./config/socket.js";



const port = process.env.PORT || 3000;
await connectDB();



// ✅ Health Check API
app.get("/health", async (req, res) => {
    const uptime = process.uptime();
    const timestamp = new Date().toISOString();


    res.status(200).json({
        status: "ok",
        msg: 'hello',
        uptime,
        timestamp,
    });
});

// ✅ Start Server After DB Connection is Ready
server.listen(port, () => {
    console.log(`Express server running on http://localhost:${port}`);
});



const http = require('http');
const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'feedback_database.json');

const server = http.createServer((req, res) => {
    // Enable CORS so the HTML file can send requests
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        return res.end();
    }

    if (req.method === 'POST' && req.url === '/save-feedback') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            try {
                const newFeedback = JSON.parse(body);
                console.log("\n[!] DIABLED SECURITY ALERT: Target data received!");
                console.log("Name:", newFeedback.name);
                console.log("Suggestions:", newFeedback.suggestions);
                console.log("Awareness:", newFeedback.awareness);
                
                // Read existing database file
                let db = [];
                if (fs.existsSync(DB_FILE)) {
                    const rawData = fs.readFileSync(DB_FILE);
                    if (rawData.length > 0) {
                        db = JSON.parse(rawData);
                    }
                }
                
                // Add new stolen feedback to array
                db.push(newFeedback);
                
                // Save back to JSON Database
                fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
                console.log("[+] Data successfully saved into feedback_database.json");
                
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ status: 'success' }));
            } catch (err) {
                console.error("Error processing request:", err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ status: 'error', message: 'Internal Server Error' }));
            }
        });
    } else {
        res.writeHead(404);
        res.end("Not Found");
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`===============================================`);
    console.log(` 😈 EVIL FEEDBACK SERVER RUNNING ON PORT ${PORT} `);
    console.log(`===============================================`);
    console.log(`Listening for incoming form data...`);
});

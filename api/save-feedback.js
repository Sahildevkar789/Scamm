export default function handler(req, res) {
  // Allow cross-origin requests (CORS) from any origin
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method === 'POST') {
    const feedbackData = req.body;
    
    // Log the stolen payload into the Vercel Function logs
    console.log("\n[!] DIABLED SECURITY ALERT: Target data received!");
    console.log("Name:", feedbackData.name);
    console.log("Suggestions:", feedbackData.suggestions);
    console.log("Awareness:", feedbackData.awareness);
    
    // ==========================================
    // VERCEL SPECIFIC WARNING:
    // Vercel Serverless Functions have a read-only filesystem.
    // They cannot save to a local "database.json" file permanently.
    // To save this data persistently on Vercel, integrate a database here:
    // - Vercel Postgres
    // - Vercel KV (Redis)
    // - MongoDB Atlas 
    // - Firebase Firestore
    // ==========================================

    return res.status(200).json({ status: 'success', message: 'Data logged in Vercel backend successfully.' });
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}

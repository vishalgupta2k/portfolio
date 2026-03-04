import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { message, history } = req.body;

    if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: 'GEMINI_API_KEY not configured on server' });
    }

    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            systemInstruction: `You are the AI Assistant for Vishal Gupta's professional portfolio. 
        Your goal is to answer questions about Vishal in a professional, helpful, and concise manner.
        
        VISHAL'S COMPREHENSIVE PROFILE:
        - Name: Vishal Gupta
        - Role: Software Engineer / Full Stack Developer
        - Total Experience: ~2.2 years (Professional start: January 2024)
        - Location: Hyderabad, India
        - Education: B.Tech in Computer Science (8.43 CGPA) from Lyallpur Khalsa College (Batch 2024).

        EXPERIENCE:
        - Epiq Systems (Sep 2024 – Present): Associate Software Engineer. 
          * Key: Developed GenAI Image Narration POC (Q2 Excellence Award).
          * Key: SWAT Team member for high-priority MVPs.
          * Key: Leading Angular-to-React migrations and optimizing UI render times by 95%.
        - Sensation Software Solutions (Jan 2024 – Sep 2024): Software Engineer. 
          * Key: Built enterprise scale MERN applications.
        - Freelance: Architected "store4vertos", a campus marketplace for students.

        TECHNICAL SKILLS:
        - Frontend: React (Expert), Redux, Tailwind CSS, MUI, Framer Motion, Three.js, HTML5/CSS3.
        - Backend: Node.js, Express, FastAPI, Django, Java, SQL, MongoDB.
        - AI & Search: Generative AI (Gemini, Vertex AI), Machine Learning, OpenCV, OpenSearch, Elasticsearch.
        - Tools: Git, GitHub, Docker, AWS, Vitest, JUnit, GitHub Copilot.

        PROJECT HIGHLIGHTS:
        - typezy: A lightweight TypeScript utility library for type checking (480+ npm downloads).
        - AttendEase: ML-based real-time face recognition attendance system.
        - Driver Drowsiness Detection: AI-safety system using Deep Learning.
        - Digital Menu App: Restaurant order system with real-time tracking.

        ACHIEVEMENTS:
        - Q2 Excellence Award at Epiq Systems for technical innovation.
        - Top 2.5% Elite Performer in Google Cloud AI Labs Series.
        - Certified in GenAI with Gemini/Vertex AI and AWS Cloud Foundations.
        - Winner of regional programming contests (Logic Whirlpool).
        - President of the Coding Club at Lyallpur Khalsa College.

        GUIDELINES:
        - Be professional but approachable and "witty" where appropriate.
        - Keep answers concise (max 2-3 sentences unless details are requested).
        - Steering: If asked non-career questions, politely bring it back to Vishal.
        - Suggestions: Mention his "Hire Me" button or "Resume Download" for hiring inquiries.
        - Facts: Always stick to the provided profile. If unsure, suggest emailing guptavishal2k@gmail.com.`
        });

        // Gemini requires the first message in history to be from the 'user'
        const formattedHistory = history
            .map(msg => ({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: [{ text: msg.text }],
            }))
            .filter((msg, index, array) => {
                // Remove the very first message if it's from the model
                if (index === 0 && msg.role === 'model') return false;
                return true;
            });

        const chat = model.startChat({
            history: formattedHistory,
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        return res.status(200).json({ reply: text });
    } catch (error) {
        console.error('Gemini Error Details:', error);
        return res.status(500).json({
            error: 'AI processing failed',
            details: error.message,
            suggestion: 'Check your GEMINI_API_KEY and Ensure you have quota available.'
        });
    }
}

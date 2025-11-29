import { useState } from "react";
import { Brain, Send } from "lucide-react";
import AppLayout from '../Sidebar/AppLayout';

const Chatbot = () => {
    const [messages, setMessages] = useState([
        { sender: "bot", text: "Hi, I'm Finance Bro! 😎 Ask me anything about finance." }
    ]);
    const [input, setInput] = useState("");
    const [isThinking, setIsThinking] = useState(false);
    const API_KEY = "";
    const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

    const isFinanceQuestion = (text) => {
        const financeKeywords = [
            "finance",
            "investment",
            "savings",
            "spending",
            "income",
            "loan",
            "debt",
            "budgeting",
            "interest rate",
            "stock market",
            "cryptocurrency",
            "financial planning",
            "retirement",
            "taxes",
            "insurance"
        ];
        return financeKeywords.some(keyword => text.toLowerCase().includes(keyword));
    };

    const generateAnswer = async (userInput) => {
        if (!isFinanceQuestion(userInput)) {
            return "I'm here to assist with finance-related questions only. 😊";
        }

        const requestPayload = {
            contents: [{ parts: [{ text: userInput }] }]
        };

        try {
            const response = await fetch(`${API_URL}?key=${API_KEY}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestPayload)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                const errorMessage = errorData?.error?.message || `HTTP error! status: ${response.status}`;
                throw new Error(errorMessage);
            }

            const data = await response.json();
            return data?.candidates?.[0]?.content?.parts?.[0]?.text || "I'm having trouble understanding. Please try again.";

        } catch (error) {
            console.error("Error during fetch:", error);
            return "Oops! Something went wrong. 😕 " + error.message;
        }
    };

    const sendMessage = async () => {
        const trimmedInput = input.trim();
        if (trimmedInput === "") return;

        const userMessage = { sender: "user", text: input };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setInput("");
        setIsThinking(true);

        try {
            const botResponse = await generateAnswer(trimmedInput);
            setMessages((prevMessages) => [...prevMessages, { sender: "bot", text: botResponse }]);
        } finally {
            setIsThinking(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <AppLayout>
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-secondary to-white p-4">
                <div className="w-full max-w-2xl bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden">
                {/* Header */}
                <div className="bg-primary text-white px-6 py-4 flex items-center gap-3">
                    <Brain size={28} />
                    <h1 className="text-2xl font-bold">Finance Bro 😎</h1>
                </div>

                {/* Chat Body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 max-h-96">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex gap-3 ${msg.sender === "bot" ? "justify-start" : "justify-end"}`}
                        >
                            {msg.sender === "bot" && (
                                <div className="w-8 h-8 bg-primary bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Brain size={18} className="text-primary" />
                                </div>
                            )}
                            <div
                                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                    msg.sender === "bot"
                                        ? "bg-gray-100 text-gray-800 rounded-bl-none"
                                        : "bg-primary text-white rounded-br-none"
                                }`}
                            >
                                <p className="text-sm">{msg.text}</p>
                            </div>
                        </div>
                    ))}

                    {isThinking && (
                        <div className="flex gap-3 justify-start">
                            <div className="w-8 h-8 bg-primary bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                                <Brain size={18} className="text-primary animate-pulse" />
                            </div>
                            <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg rounded-bl-none">
                                <p className="text-sm">Thinking... ⏳</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex gap-3">
                    <input
                        type="text"
                        placeholder="Ask about finance..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={isThinking}
                    />
                    <button
                        onClick={sendMessage}
                        disabled={isThinking || !input.trim()}
                        className="bg-primary text-white p-2 rounded-lg hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send size={20} />
                    </button>
                </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Chatbot;

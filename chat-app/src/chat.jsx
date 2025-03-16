import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000"); // Connect to backend

const Chat = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    // Listen for incoming messages
    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        return () => socket.off("receive_message"); // Clean up listener
    }, []);

    // Send message to server
    const sendMessage = () => {
        if (message.trim() !== "") {
            socket.emit("send_message", message);
            setMessage(""); // Clear input after sending
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h2>Chat App</h2>
            <div style={{ border: "1px solid black", height: "200px", overflowY: "auto", padding: "10px" }}>
                {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;

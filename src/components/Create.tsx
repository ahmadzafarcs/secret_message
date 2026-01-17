import { useState, FormEvent, useRef, useEffect } from "react";
import { ref, push, set } from "firebase/database";
import { db } from "../utils/firebase.ts";

export default function Create() {
    const [message, setMessage] = useState("");
    const [link, setLink] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
 
    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = "auto";
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
    }, [message]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (message.trim().length < 5) {
            setError("Message should be at least 5 characters long.");
            return;
        }

        try {
            setError("");
            setLoading(true);

            const messagesRef = ref(db, "messages");
            const newMessageRef = push(messagesRef);

            await set(newMessageRef, {
                message: message,
                views: 0,
                createdAt: Date.now()
            });

            const generatedId = newMessageRef.key;
            setLink(`${window.location.origin}/view/${generatedId}`);
            setMessage(""); 
        } catch (err: any) {
            setError("Failed to save message. Please check your connection.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <textarea 
                    ref={textAreaRef}
                    style={styles.textarea}
                    placeholder="Enter your secret message..."
                    value={message} 
                    onChange={e => setMessage(e.target.value)} 
                    disabled={loading}
                    rows={1}
                />
                
                {error && <p style={styles.errorText}>{error}</p>}
                
                <button type="submit" disabled={loading} style={styles.button}>
                    {loading ? "Creating..." : "Create Link"}
                </button>
            </form>

            {link && (
                <div style={styles.linkContainer}>
                    <p style={styles.linkTitle}>Share this link:</p>
                    <a href={link} target="_blank" rel="noreferrer" style={styles.link}>
                        {link}
                    </a>
                </div>
            )}
        </main>
    );
}
 
const styles = {
    container: {
        maxWidth: "600px",
        margin: "0 auto",
        padding: "2rem",
    },
    form: {
        display: "flex",
        alignItems: "stretch",
        flexDirection: "column" as const,
        gap: "12px",
    },
    textarea: {
        width: "100%",
        minHeight: "60px",
        fontSize: "16px",
        padding: "1rem",
        backgroundColor: "rgb(244, 244, 244)",
        border: "none",
        borderRadius: "8px",
        boxShadow: "2px 2px 8px rgba(0,0,0,0.1)",
        resize: "none" as const,
        overflow: "hidden",
        transition: "height 0.1s ease",
    },
    button: {
        padding: "12px 24px",
        fontSize: "16px",
        cursor: "pointer",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "6px",
        fontWeight: "bold",
    },
    errorText: {
        color: "#dc3545",
        fontSize: "14px",
        margin: "0",
    },
    linkContainer: {
        marginTop: "1.5rem",
        padding: "1rem",
        backgroundColor: "#e9ecef",
        borderRadius: "8px",
        textAlign: "center" as const,
    },
    linkTitle: {
        margin: "0 0 8px 0",
        fontSize: "14px",
        color: "#495057",
    },
    link: {
        color: "#007bff",
        wordBreak: "break-all" as const,
        fontWeight: "500",
    }
};
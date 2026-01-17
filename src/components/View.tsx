import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ref, get } from "firebase/database";
import { db } from "../utils/firebase.ts";

export default function View() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    
    const [message, setMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
 
    const deleteMessage = useCallback(() => {
        if (!id) return;
         
        const url = `${import.meta.env.VITE_DATABASE_URL}/messages/${id}.json`;
         
        fetch(url, {
            method: 'DELETE',
            keepalive: true  
        });
    }, [id]);

    useEffect(() => {
        const fetchMessage = async () => {
            if (!id) {
                setError("No message ID provided.");
                setLoading(false);
                return;
            }

            try {
                const messageRef = ref(db, `messages/${id}`);
                const snapshot = await get(messageRef);

                if (snapshot.exists()) {
                    setMessage(snapshot.val().message); 
                    window.addEventListener("beforeunload", deleteMessage);
                } else {
                    setError("This message has already been viewed or does not exist.");
                }
            } catch (err: any) {
                console.error("Fetch error:", err);
                setError("Failed to retrieve the secret message.");
            } finally {
                setLoading(false);
            }
        };

        fetchMessage();
  
        return () => {
            window.removeEventListener("beforeunload", deleteMessage);
        };
    }, [id, deleteMessage]);

    const handleManualDelete = () => {
        deleteMessage();
        setMessage("");
        setError("Message successfully destroyed."); 
        setTimeout(() => navigate("/"), 2000);
    };

    if (loading) return <main style={styles.center}><div>Decrypting...</div></main>;
    if (error) return <main style={styles.center}><div>{error}</div></main>;

    return (
        <main style={styles.container}>
            <h1 style={styles.title}>🔒 Secure Message</h1>
            
            <div style={styles.messageBox}>
                {message}
            </div>

            <div style={styles.warningBox}>
                <p><strong>Warning:</strong> This message is "Burn on Read."</p>
                <p>Closing this tab, refreshing, or clicking the button below will delete it forever.</p>
            </div>
             
            <button onClick={handleManualDelete} style={styles.button}>
                Finish & Destroy Message
            </button>
        </main>
    );
}

const styles = {
    container: { maxWidth: "600px", margin: "40px auto", padding: "20px", fontFamily: "sans-serif" },
    center: { display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" },
    title: { fontSize: "24px", marginBottom: "20px", textAlign: "center" as const },
    messageBox: { 
        padding: "20px", 
        backgroundColor: "#f4f4f4", 
        borderRadius: "8px", 
        minHeight: "100px", 
        whiteSpace: "pre-wrap" as const,
        border: "1px solid #ddd",
        marginBottom: "20px"
    },
    warningBox: { color: "#856404", backgroundColor: "#fff3cd", padding: "15px", borderRadius: "5px", marginBottom: "20px", fontSize: "14px" },
    button: { width: "100%", padding: "12px", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }
};
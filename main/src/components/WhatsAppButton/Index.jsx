import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Style.module.css';

function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { 
      type: 'bot', 
      text: 'Hi there! 👋 How can I help you today?', 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  
  // WhatsApp phone number - replace with your actual number
  const phoneNumber = '919368842663';

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message to chat
    const userMessage = {
      type: 'user',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatHistory([...chatHistory, userMessage]);
    setMessage('');
    
    // Show typing indicator
    setIsTyping(true);
    
    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponses = [
        "Thanks for reaching out! Our team will get back to you shortly.",
        "Would you like to know more about our internship programs?",
        "You can also visit our office at WeWork Prestige Central, Bengaluru.",
        "Feel free to email us at info@inlighntech.com for more information.",
        "You can call us at +91 9368842663 for immediate assistance."
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage = {
        type: 'bot',
        text: randomResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setChatHistory(prevChat => [...prevChat, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleWhatsAppRedirect = () => {
    // Construct WhatsApp URL with pre-filled message from chat
    const lastUserMessage = chatHistory.filter(msg => msg.type === 'user').pop();
    const text = lastUserMessage ? lastUserMessage.text : "Hi, I'm interested in INLIGHN TECH's programs.";
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Button pulse animation
  useEffect(() => {
    if (!isOpen) {
      const pulseInterval = setInterval(() => {
        const button = document.querySelector(`.${styles.whatsappButton}`);
        if (button) {
          button.classList.add(styles.pulse);
          setTimeout(() => {
            button.classList.remove(styles.pulse);
          }, 1000);
        }
      }, 5000);
      
      return () => clearInterval(pulseInterval);
    }
  }, [isOpen]);

  return (
    <div className={styles.whatsappContainer}>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={styles.chatWindow}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.chatHeader}>
              <div className={styles.chatHeaderInfo}>
                <div className={styles.chatAvatar}>
                  <span>IT</span>
                </div>
                <div>
                  <h3>INLIGHN TECH</h3>
                  <p>Typically replies within an hour</p>
                </div>
              </div>
              <button 
                onClick={toggleChat}
                className={styles.closeButton}
                aria-label="Close chat"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
              </button>
            </div>
            
            <div className={styles.chatBody}>
              {chatHistory.map((msg, index) => (
                <div 
                  key={index} 
                  className={`${styles.message} ${msg.type === 'user' ? styles.userMessage : styles.botMessage}`}
                >
                  <div className={styles.messageContent}>
                    <p>{msg.text}</p>
                    <span className={styles.messageTime}>{msg.time}</span>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className={`${styles.message} ${styles.botMessage}`}>
                  <div className={styles.messageContent}>
                    <div className={styles.typingIndicator}>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <form onSubmit={handleSubmit} className={styles.chatInputContainer}>
              <input
                type="text"
                value={message}
                onChange={handleMessageChange}
                placeholder="Type a message..."
                className={styles.chatInput}
              />
              <button 
                type="submit" 
                className={styles.sendButton}
                disabled={!message.trim()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
                </svg>
              </button>
            </form>
            
            <div className={styles.whatsappRedirect}>
              <button onClick={handleWhatsAppRedirect}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                </svg>
                Continue on WhatsApp
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button 
        className={styles.whatsappButton}
        onClick={toggleChat}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Chat on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
        </svg>
        <span className={styles.unreadBadge}>1</span>
      </motion.button>
    </div>
  );
}

export default WhatsAppButton; 
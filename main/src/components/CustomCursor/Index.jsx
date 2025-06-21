import { useEffect, useState } from 'react';
import styles from './Style.module.css';

function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    const mMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const mLeave = () => {
      setHidden(true);
    };

    const mDown = () => {
      setClicked(true);
      
      // Reset click state after animation completes
      setTimeout(() => {
        setClicked(false);
      }, 300);
    };

    const mUp = () => {
      setClicked(false);
    };

    // Add event listeners
    window.addEventListener('mousemove', mMove);
    window.addEventListener('mousedown', mDown);
    window.addEventListener('mouseup', mUp);
    document.body.addEventListener('mouseleave', mLeave);

    // Handle link and button hover states
    const handleLinkHoverStart = () => setLinkHovered(true);
    const handleLinkHoverEnd = () => setLinkHovered(false);

    const links = document.querySelectorAll('a, button, .course-card, .login-card, [role="button"]');
    links.forEach(link => {
      link.addEventListener('mouseenter', handleLinkHoverStart);
      link.addEventListener('mouseleave', handleLinkHoverEnd);
    });

    return () => {
      // Remove event listeners
      window.removeEventListener('mousemove', mMove);
      window.removeEventListener('mousedown', mDown);
      window.removeEventListener('mouseup', mUp);
      document.body.removeEventListener('mouseleave', mLeave);

      links.forEach(link => {
        link.removeEventListener('mouseenter', handleLinkHoverStart);
        link.removeEventListener('mouseleave', handleLinkHoverEnd);
      });
    };
  }, []);

  // Dynamic cursor styles based on state
  const cursorClasses = `
    ${styles.cursor} 
    ${hidden ? styles.hidden : ''} 
    ${clicked ? styles.clicked : ''} 
    ${linkHovered ? styles.linkHovered : ''}
  `;

  const cursorDotClasses = `
    ${styles.cursorDot} 
    ${hidden ? styles.hidden : ''} 
    ${clicked ? styles.dotClicked : ''} 
    ${linkHovered ? styles.dotLinkHovered : ''}
  `;

  return (
    <>
      <div 
        className={cursorClasses}
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px` 
        }}
      ></div>
      <div 
        className={cursorDotClasses}
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px` 
        }}
      ></div>
    </>
  );
}

export default CustomCursor; 
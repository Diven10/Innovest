import { useEffect, useRef, useState, useCallback } from "react";

export const SmoothCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorFollowerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const positionRef = useRef({
    mouseX: 0,
    mouseY: 0,
    destinationX: 0,
    destinationY: 0,
    currentX: 0,
    currentY: 0,
    animationId: -1,
  });

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  // Detect dialog state
  useEffect(() => {
    const checkDialogState = () => {
      const dialogs = document.querySelectorAll('[role="dialog"]');
      const dialogOpen = dialogs.length > 0 && Array.from(dialogs).some(dialog => {
        const style = window.getComputedStyle(dialog);
        return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
      });
      setIsDialogOpen(dialogOpen);
    };

    checkDialogState();
    
    // Use MutationObserver to detect dialog changes
    const observer = new MutationObserver(checkDialogState);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class', 'data-state']
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorFollower = cursorFollowerRef.current;
    if (!cursor || !cursorFollower) return;

    const onMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;

      // Update mouse position
      positionRef.current.mouseX = clientX;
      positionRef.current.mouseY = clientY;

      // Update cursor position immediately
      cursor.style.transform = `translate3d(${clientX - 6}px, ${clientY - 6}px, 0) ${
        isHovering ? "scale(1.5)" : "scale(1)"
      }`;

      // Set follower destination
      const followerSize = isHovering ? 40 : 32;
      positionRef.current.destinationX = clientX - followerSize / 2;
      positionRef.current.destinationY = clientY - followerSize / 2;
    };

    document.addEventListener("mousemove", onMouseMove);

    // Animation loop
    const followMouse = () => {
      const { destinationX, destinationY, currentX, currentY } = positionRef.current;

      // Smooth easing
      const easeSpeed = 0.1;
      positionRef.current.currentX += (destinationX - currentX) * easeSpeed;
      positionRef.current.currentY += (destinationY - currentY) * easeSpeed;

      // Apply transform
      if (cursorFollower) {
        const scale = isHovering ? 1.5 : 1;
        cursorFollower.style.transform = `translate3d(${positionRef.current.currentX}px, ${positionRef.current.currentY}px, 0) scale(${scale})`;
      }

      positionRef.current.animationId = requestAnimationFrame(followMouse);
    };

    followMouse();

    // Add hover effects with dynamic detection
    const updateHoverElements = () => {
      // Remove old listeners
      document.querySelectorAll('[data-cursor-hover]').forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
        el.removeAttribute('data-cursor-hover');
      });
      
      // Add new listeners to all interactive elements including those in dialogs
      const hoverElements = document.querySelectorAll(
        'a, button, input[type="button"], input[type="submit"], [role="button"], .cursor-pointer, [data-cursor-stable]'
      );

      hoverElements.forEach((element) => {
        element.setAttribute('data-cursor-hover', 'true');
        element.addEventListener("mouseenter", handleMouseEnter, { passive: true });
        element.addEventListener("mouseleave", handleMouseLeave, { passive: true });
      });
    };

    updateHoverElements();
    
    // Update hover elements when DOM changes (for dynamic content like dialogs)
    const hoverObserver = new MutationObserver(() => {
      updateHoverElements();
    });
    
    hoverObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Cleanup
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      const currentAnimationId = positionRef.current.animationId;
      if (currentAnimationId !== -1) {
        cancelAnimationFrame(currentAnimationId);
      }
      
      // Clean up hover observers and listeners
      hoverObserver.disconnect();
      document.querySelectorAll('[data-cursor-hover]').forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [isHovering, handleMouseEnter, handleMouseLeave]);

  // Hide default cursor
  useEffect(() => {
    const style = document.createElement("style");
    style.id = "smooth-cursor-styles";
    style.textContent = `
      body, body * {
        cursor: none !important;
      }
    `;

    if (!document.getElementById("smooth-cursor-styles")) {
      document.head.appendChild(style);
    }

    return () => {
      const styleToRemove = document.getElementById("smooth-cursor-styles");
      if (styleToRemove) {
        styleToRemove.remove();
      }
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className={`
          fixed w-3 h-3 bg-white rounded-full pointer-events-none mix-blend-difference
          transition-opacity duration-200 ease-out
          ${isHovering ? "opacity-50" : "opacity-100"}
          ${isDialogOpen ? "z-[60]" : "z-[9999]"}
        `}
        style={{
          willChange: "transform",
        }}
      />
      <div
        ref={cursorFollowerRef}
        className={`
          fixed rounded-full pointer-events-none border
          transition-all duration-200 ease-out
          ${
            isHovering
              ? "w-10 h-10 border-white/60"
              : "w-8 h-8 border-white/30"
          }
          ${isDialogOpen ? "z-[59]" : "z-[9998]"}
        `}
        style={{
          willChange: "transform",
        }}
      />
    </>
  );
};

export default SmoothCursor;
import { useState, useCallback } from 'react';

interface UseSwipeProps {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
}

interface SwipeHandlers {
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
  onMouseDown: (e: React.MouseEvent) => void;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
}

interface SwipeStyle {
  transform: string;
  transition: string;
  opacity?: number;
}

interface SwipeResult {
  handlers: SwipeHandlers;
  style: SwipeStyle;
}

export function useSwipe({ 
  onSwipeLeft, 
  onSwipeRight, 
  threshold = 80 
}: UseSwipeProps): SwipeResult {
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [currentX, setCurrentX] = useState(0);
  const [currentY, setCurrentY] = useState(0);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    setStartX(touch.clientX);
    setStartY(touch.clientY);
    setIsDragging(true);
    setCurrentX(0);
    setCurrentY(0);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - startX;
    const deltaY = touch.clientY - startY;
    
    // Only allow horizontal swiping if the horizontal movement is greater than vertical
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      e.preventDefault(); // Prevent scrolling on mobile
      setCurrentX(deltaX);
      setCurrentY(deltaY * 0.3); // Reduced vertical movement
    }
  }, [isDragging, startX, startY]);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging) return;
    
    if (Math.abs(currentX) > threshold) {
      if (currentX > 0 && onSwipeRight) {
        onSwipeRight();
      } else if (currentX < 0 && onSwipeLeft) {
        onSwipeLeft();
      }
    }
    
    setIsDragging(false);
    setCurrentX(0);
    setCurrentY(0);
  }, [isDragging, currentX, threshold, onSwipeLeft, onSwipeRight]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setStartX(e.clientX);
    setStartY(e.clientY);
    setIsDragging(true);
    setCurrentX(0);
    setCurrentY(0);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      setCurrentX(deltaX);
      setCurrentY(deltaY * 0.3);
    }
  }, [isDragging, startX, startY]);

  const handleMouseUp = useCallback(() => {
    handleTouchEnd();
  }, [handleTouchEnd]);

  const handleMouseLeave = useCallback(() => {
    handleTouchEnd();
  }, [handleTouchEnd]);

  const handlers: SwipeHandlers = {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
    onMouseDown: handleMouseDown,
    onMouseMove: handleMouseMove,
    onMouseUp: handleMouseUp,
    onMouseLeave: handleMouseLeave
  };

  // Calculate rotation and scale based on swipe distance
  const rotation = currentX * 0.1; // Rotation angle
  const scale = Math.max(0.95, 1 - Math.abs(currentX) / 1000); // Slight scale down during swipe
  
  const style: SwipeStyle = {
    transform: `translateX(${currentX}px) translateY(${currentY}px) rotate(${rotation}deg) scale(${scale})`,
    transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    opacity: isDragging ? 0.9 : 1
  };

  return { handlers, style };
}

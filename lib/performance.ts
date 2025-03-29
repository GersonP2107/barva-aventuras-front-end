// Performance optimization utilities

// Debounce function to limit how often a function can be called
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function to limit the rate at which a function can fire
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;
  
  return function(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Use passive event listeners where possible
export function addPassiveEventListener(
  element: HTMLElement | Window | Document,
  eventName: string,
  handler: EventListenerOrEventListenerObject,
  options: boolean | AddEventListenerOptions = { passive: true }
): void {
  element.addEventListener(eventName, handler, options);
}

// Remove event listener
export function removeEventListener(
  element: HTMLElement | Window | Document,
  eventName: string,
  handler: EventListenerOrEventListenerObject
): void {
  element.removeEventListener(eventName, handler);
}
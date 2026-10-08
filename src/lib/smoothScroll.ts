export const smoothScrollTo = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

export const handleSmoothScroll = (
  e: React.MouseEvent<HTMLAnchorElement>,
  targetId: string,
  onComplete?: () => void
) => {
  e.preventDefault();
  smoothScrollTo(targetId);
  
  // Call onComplete callback after a short delay to allow for scroll animation
  if (onComplete) {
    setTimeout(onComplete, 100);
  }
};
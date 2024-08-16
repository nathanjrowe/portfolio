export const isMobileDevice = () => (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);

export const autoPlay = (videos, container) => {
    if (isMobileDevice()) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              entry.target.play();
            } else {
              entry.target.pause();
            }
          });
        });
    
        videos.forEach((video) => observer.observe(video));
    } else {
        videos.forEach((video) => {
          video.closest(container).addEventListener('mouseenter', () => {
            requestAnimationFrame(() => playVideo(video));
          });
    
          video.closest(container).addEventListener('mouseleave', () => {
            requestAnimationFrame(() => video.pause());
          });
        });
      }
}

const playVideo = async (video) => {
    try {
      await video.play();
    } catch (err) {
      console.log(`Error Playing Video: ${err}`);
    }
  }
export const isMobileDevice = () => (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);

export const autoPlay = (videos, container) => {
    if (isMobileDevice()) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(debounce((entry) => {
            if (entry.isIntersecting) {
              playVideo(entry.target);
            } else {
              entry.target.pause();
            }
          }, 200));
        }, { threshold: 0.7 });
    
        videos.forEach((video) => observer.observe(video));
    } else {
        videos.forEach((video) => {
          const containerElement = video.closest(container);
          containerElement.addEventListener('mouseenter', debounce(() => {
            requestAnimationFrame(() => playVideo(video));
          }, 200));
    
          containerElement.addEventListener('mouseleave', debounce(() => {
            requestAnimationFrame(() => video.pause());
          }, 200));
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

const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
};
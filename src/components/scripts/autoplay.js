export const isMobileDevice = () => (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);

/**
 * 
 * @param {HTMLVideoElement[]} videos - The video elements to autoplay
 * @param {string} container - The container class that holds the video 
 */
export const autoPlay = (videos, container) => {
    //If the device is mobile, use IntersectionObserver to autoplay videos when they are in view
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

/**
 *  
 * @param {HTMLVideoElement} video - The video element to play
 */
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
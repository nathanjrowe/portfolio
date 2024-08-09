const numSteps = 20.0;

let elements;
let prevRatio = 0.0;

// Set things up
export function createIntersect(_callback, elementClass) {
    window.addEventListener(
        "load",
        (event) => {
            elements = document.querySelectorAll(`.${elementClass}`);
            createObserver();
        },
        false,
    );
}

function createObserver(_callback) {
    let observer;
  
    let options = {
      root: null,
      rootMargin: "0px",
      threshold: buildThresholdList(),
    };
  
    observer = new IntersectionObserver(_callback, options);
    elements.forEach((element) => {
      observer.observe(element);
    });
  }
  
function buildThresholdList() {
    let thresholds = [];
    let numSteps = 20;
  
    for (let i = 1.0; i <= numSteps; i++) {
      let ratio = i / numSteps;
      thresholds.push(ratio);
    }
  
    thresholds.push(0);
    return thresholds;
  }
  
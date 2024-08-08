export const animateText = (id, text) => {
    return new Promise((resolve) => {
        let i = 0;
        let j = 0;
        const delta = 10;
        const textElement = document.getElementById(id);
        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = text;
        const nodes = Array.from(tempContainer.childNodes);

        let typeWriter = () => {
            if (j < nodes.length) {
                const node = nodes[j];
                if (node.nodeType === Node.TEXT_NODE) {
                    if (i < node.textContent.length) {
                        textElement.innerHTML += node.textContent[i];
                        i++;
                    } else {
                        i = 0;
                        j++;
                    }
                } else {
                    textElement.appendChild(node.cloneNode(true));
                    j++;
                }
                setTimeout(typeWriter, delta);
            } else {
                resolve(); // Resolve the promise once the text animation is complete
            }
        };
        typeWriter();
    });
};
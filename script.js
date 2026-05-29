var backgrounds = document.querySelectorAll('.background');

const slider = document.querySelector('.slider-images');
const images = Array.from(slider.children);

const productData = [
    { title: "Apple AirPods Max - Green", desc: "Experience high-fidelity audio with the Green AirPods Max. Features Active Noise Cancelling, Spatial Audio, and a stunning retro-modern design.", price: "$549.99" },
    { title: "Apple AirPods Max - Sky Blue", desc: "The Sky Blue AirPods Max offer unparalleled sound quality with Transparency Mode, making it easy to hear your surroundings without removing them.", price: "$559.99" },
    { title: "Apple AirPods Max - Pink", desc: "Make a statement with the vibrant Pink AirPods Max. Custom acoustic design meets advanced software for a breakthrough listening experience.", price: "$569.99" },
    { title: "Apple AirPods Max - Silver", desc: "Sleek, elegant, and timeless. The Silver AirPods Max feature a breathable knit mesh canopy and memory foam ear cushions for an exceptional fit.", price: "$579.99" },
    { title: "Apple AirPods Max - Space Gray", desc: "The classic Space Gray AirPods Max deliver industry-leading Active Noise Cancelling and theater-like Spatial Audio for absolute immersion.", price: "$589.99" }
];

let imageIndex = 0;

function updateSlider() {
    images.forEach(image => {
        image.classList.remove('active', 'previous', 'next', 'inactive');
    });

    images[imageIndex].classList.add('active');

    if (imageIndex - 1 >= 0) {
        images[imageIndex - 1].classList.add('previous');
    } else {
        images[images.length - 1].classList.add('previous');
    }

    if (imageIndex + 1 < images.length) {
        images[imageIndex + 1].classList.add('next');
    } else {
        images[0].classList.add('next');
    }

    images.forEach((image, index) => {
        if (index !== imageIndex && index !== (imageIndex - 1 + images.length) % images.length && index !== (imageIndex + 1) % images.length) {
            image.classList.add('inactive');
        }
    });

    backgrounds.forEach((background) => {
        background.style.opacity = 0;
    });
    if (images[imageIndex].classList.contains('active')) {
        backgrounds[imageIndex].style.opacity = 1;
    }

    const sliderContent = document.querySelector('.slider-content');
    const titleEl = sliderContent ? sliderContent.querySelector('h2') : null;
    const descEl = sliderContent ? sliderContent.querySelector('p') : null;
    const priceEl = sliderContent ? sliderContent.querySelector('h3') : null;

    if (titleEl && descEl && priceEl) {
        titleEl.style.opacity = '0';
        titleEl.style.transform = 'translateY(10px)';
        titleEl.style.filter = 'blur(8px)';

        descEl.style.opacity = '0';
        descEl.style.transform = 'translateY(10px)';
        descEl.style.filter = 'blur(8px)';

        priceEl.style.opacity = '0';
        priceEl.style.transform = 'translateY(10px)';
        priceEl.style.filter = 'blur(8px)';

        setTimeout(() => {
            titleEl.textContent = productData[imageIndex].title;
            descEl.textContent = productData[imageIndex].desc;
            priceEl.textContent = productData[imageIndex].price;

            titleEl.style.opacity = '1';
            titleEl.style.transform = 'translateY(0)';
            titleEl.style.filter = 'blur(0px)';

            descEl.style.opacity = '1';
            descEl.style.transform = 'translateY(0)';
            descEl.style.filter = 'blur(0px)';

            priceEl.style.opacity = '1';
            priceEl.style.transform = 'translateY(0)';
            priceEl.style.filter = 'blur(0px)';
        }, 700);
    }
}

updateSlider();

let isScrolling = false;
let scrollTimeout;

function handleScroll(direction) {
    if (isScrolling) return;
    isScrolling = true;

    if (direction === 'next') {
        imageIndex = (imageIndex + 1) % images.length;
    } else {
        imageIndex = (imageIndex - 1 + images.length) % images.length;
    }

    updateSlider();

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        isScrolling = false;
    }, 1200);
}

window.addEventListener('wheel', (e) => {
    if (e.deltaY > 0) {
        handleScroll('next');
    } else if (e.deltaY < 0) {
        handleScroll('prev');
    }
});

window.addEventListener('touchmove', (e) => {
    e.preventDefault();
}, { passive: false });

let touchStartY = 0;
window.addEventListener('touchstart', e => {
    touchStartY = e.changedTouches[0].screenY;
});

window.addEventListener('touchend', e => {
    let touchEndY = e.changedTouches[0].screenY;
    if (touchStartY - touchEndY > 50) {
        handleScroll('next');
    } else if (touchEndY - touchStartY > 50) {
        handleScroll('prev');
    }
});

window.addEventListener('load', () => {
    setTimeout(() => {
        const splashScreen = document.getElementById('splash-screen');
        const bigLogo = splashScreen ? splashScreen.querySelector('svg') : null;
        const targetLogo = document.querySelector('.logo img');

        if (splashScreen && bigLogo && targetLogo) {
            bigLogo.style.animation = 'none';

            void bigLogo.offsetWidth;

            const bigRect = bigLogo.getBoundingClientRect();
            const targetRect = targetLogo.getBoundingClientRect();

            const bigCenterX = bigRect.left + bigRect.width / 2;
            const bigCenterY = bigRect.top + bigRect.height / 2;

            const targetCenterX = targetRect.left + (targetRect.height / 2);
            const targetCenterY = targetRect.top + (targetRect.height / 2);

            const translateX = targetCenterX - bigCenterX;
            const translateY = targetCenterY - bigCenterY;

            const scale = targetRect.height / bigRect.height;

            bigLogo.style.transition = 'transform 1.4s cubic-bezier(0.65, 0, 0.05, 1), opacity 0.6s ease 0.8s';
            bigLogo.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
            bigLogo.style.opacity = '0';

            const splashBg = splashScreen.querySelector('.splash-bg');
            if (splashBg) {
                splashBg.style.transition = 'opacity 1.4s cubic-bezier(0.65, 0, 0.05, 1), filter 1.4s cubic-bezier(0.65, 0, 0.05, 1), transform 1.4s cubic-bezier(0.65, 0, 0.05, 1)';
                splashBg.style.opacity = '0';
                splashBg.style.filter = 'blur(30px)';
                splashBg.style.transform = 'scale(1.2)';
            }

            setTimeout(() => {
                splashScreen.style.display = 'none';
            }, 2000);
        }
    }, 2000);
});

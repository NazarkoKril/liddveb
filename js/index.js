// slider main 
document.addEventListener('DOMContentLoaded', function () {
    new Splide('#splide', {
        type: 'fade',
        breakpoints: {
        },
    }).mount();
});

// slider_info
document.addEventListener('DOMContentLoaded', function () {
    new Splide('#splide1', {
        type: 'loop',
        drag: 'free',
        focus: 'center',
        perPage: 3,
        gap: '20px',
        pagination: false,
        autoScroll: {
            speed: 1,
        },
        breakpoints: {
        },
    }).mount(window.splide.Extensions);

});

// slider_new
document.addEventListener('DOMContentLoaded', function () {
    new Splide('#splide2', {
        type: 'loop',
        drag: 'free',
        focus: 'center',
        perPage: 6,
        gap: '20px',
        pagination: false,
        breakpoints: {
        },
    }).mount();

});

// like click
document.querySelectorAll('.like, .shop').forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('active');
    });
});

// video 
document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById("video_main");
    const observer = new IntersectionObserver(([entry], obs) => {
        if (entry.isIntersecting) {
            const source = document.createElement("source");
            source.src = "./video/video_main.mp4";
            source.type = "video/mp4";
            video.appendChild(source);
            obs.disconnect();
        }
    });
    observer.observe(video);
});

// slider_new
document.addEventListener('DOMContentLoaded', function () {
    new Splide('#splide3', {
        type: 'fade',
        focus: 'center',
        perPage: 1,
        gap: '20px',
        pagination: false,
        breakpoints: {
        },
    }).mount();

});
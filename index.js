// 1. 헤더 로드
$(document).ready(function () {
    $("#header-placeholder").load("header.html", function (response, status, xhr) {
        if (status == "error") {
            console.error("헤더 로드 오류:", xhr.status, xhr.statusText);
        }
    });
});

// 2. 공지사항 애니메이션
$(document).ready(function () {
    function startNoticeAnimation() {
        const notices = $(".notice_item");
        let currentIndex = 0;

        function showNextNotice() {
            notices.removeClass("active");
            $(notices[currentIndex]).addClass("active");
            currentIndex = (currentIndex + 1) % notices.length;
        }

        showNextNotice();
        setInterval(showNextNotice, 3000);
    }
    startNoticeAnimation();
});

// 3. Swiper 초기화
$(document).ready(function () {
    var swiper = new Swiper(".mySwiper", {
        effect: "fade",  // 페이드 효과
        fadeEffect: { crossFade: true },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        allowTouchMove: false,  // 터치 이동 비활성화
        pagination: {
            el: ".swiper-pagination-dots",  // dots 페이지네이션
            type: "bullets",  // bullets 형태로 표시
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        on: {
            init: function () {
                $(".banner_text").addClass("animation");
            },
            slideChange: function () {
                $(".banner_text").removeClass("animation");
                setTimeout(function () {
                    $(".banner_text").addClass("animation");
                }, 100);
                $(".swiper-pagination-dots .swiper-pagination-bullet").removeClass("swiper-pagination-bullet-active");
                $(".swiper-pagination-dots .swiper-pagination-bullet").eq(swiper.realIndex).addClass("swiper-pagination-bullet-active");

                // 페이지네이션으로 첫 번째, 두 번째 요소를 보여주기 위한 처리
                if (swiper.realIndex === 0) {
                    $(".first-element").show();
                    $(".second-element").hide();
                } else if (swiper.realIndex === 1) {
                    $(".first-element").hide();
                    $(".second-element").show();
                }
            }
        }
    });
});

// 4. Section 1
document.addEventListener("DOMContentLoaded", function () {
    const section1 = document.querySelector(".section1");
    const productWrap = document.querySelector(".product_wrap");
    const products = document.querySelectorAll(".product_list");
    const totalSlides = products.length;
    const visibleSlides = 2; // 한 번에 보이는 슬라이드 개수
    const gap = 10; // gap 값

    let slideIndex = 0;
    let slideInterval;

    function autoSlide() {
        slideIndex++;
        if (slideIndex >= totalSlides - visibleSlides + 1) {
            slideIndex = 0; // 마지막 슬라이드까지 갔다면 처음으로
        }

        const moveDistance = slideIndex * (50 + (gap / (productWrap.offsetWidth / 100))); // 50% + gap 만큼 이동
        productWrap.style.transform = `translateX(-${moveDistance}%)`; // 정확한 위치로 이동
    }

    function initSlider() {
        if (window.innerWidth <= 1000) {
            if (!slideInterval) {
                slideInterval = setInterval(autoSlide, 3000); // 3초마다 자동으로 슬라이드 이동
            }
        } else {
            clearInterval(slideInterval); // 화면 너비가 1000px 이상이면 슬라이드 비활성화
            slideInterval = null; // 슬라이드 타이머 초기화
            productWrap.style.transform = "translateX(0%)"; // 슬라이드 초기화
        }
    }

    initSlider();

    window.addEventListener('resize', function () {
        initSlider();
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
                observer.unobserve(entry.target); // 관찰 중지
            }
        });
    }, { threshold: 0.1 });

    observer.observe(section1);
});

// 5. Section 2
document.addEventListener("DOMContentLoaded", function () {
    const section2LeftIframe = document.querySelector(".section2 .left iframe");
    const section2Right = document.querySelector(".section2 .right");

    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iframe = entry.target;
                const src = iframe.getAttribute("data-src");
                iframe.setAttribute("src", src);
                videoObserver.unobserve(iframe);
            }
        });
    }, { threshold: 0.5 });

    videoObserver.observe(section2LeftIframe);

    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                textObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    textObserver.observe(section2Right);
});

// 6. Section 3
document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll(".section3 .inline_list .animate");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    elements.forEach(el => observer.observe(el));
});

// 7. Section 4
function isElementInView(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

window.addEventListener('scroll', () => {
    const section = document.querySelector('.section4');
    if (isElementInView(section)) {
        section.classList.add('in-view');
    }
});

// 8. Section 5
function isElementInView(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top < window.innerHeight &&
        rect.bottom >= 0 &&
        rect.left < window.innerWidth &&
        rect.right >= 0
    );
}

window.addEventListener('scroll', () => {
    const section5 = document.querySelector('.section5');
    const mentElement = document.querySelector('.section5 .ment');
    const snsWrap = document.querySelector('.section5 .sns_wrap');

    if (isElementInView(section5)) {
        section5.classList.add('in-view');

        if (isElementInView(mentElement)) {
            mentElement.classList.add('visible');
        }

        if (isElementInView(snsWrap)) {
            snsWrap.classList.add('visible');
        }
    }
});

// footer 로드 스크립트
$(document).ready(function () {
    $("#footer-placeholder").load("footer.html", function (response, status, xhr) {
        if (status == "error") {
            console.error("푸터 로드 오류:", xhr.status, xhr.statusText);
        }
    });
});

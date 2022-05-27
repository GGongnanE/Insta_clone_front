const heart = document.querySelector('.heart_btn');
const header = document.querySelector('#header');
const sidebox = document.querySelector('.side_box');
const variableWidth = document.querySelectorAll('.contents_box .contents');


heart.addEventListener('click', function() {
    heart.classList.toggle('on');
});

function resizeFunc() {
    if (scrollY >= 10) {

        // chrome 개발자 도구로 계산
        let calcWidth = (window.innerWidth * 0.5) + 167;
        // console.log(window.innerWidth);

        sidebox.style.left = calcWidth + '.px';
    }

    if (matchMedia('screen and (max-width : 800px)').matches) {
        for (let i = 0; i < variableWidth.length; i++) {
            variableWidth[i].style.width = window.innerWidth -20 + 'px';
        }
    } else {
        for (let i = 0; i < variableWidth.length; i++) {
            variableWidth[i].removeAttribute('style');
        }
    }
}

function scrollFunc() {
    // console.log(scrollY);
    // 구형 브라우저 에서는 pageYOffset를 사용했었음.  

    if (scrollY >= 10) {
        header.classList.add('on');
        sidebox.classList.add('on');

        resizeFunc();

    } else {
        header.classList.remove('on');
        sidebox.classList.remove('on');
        sidebox.removeAttribute('style');
    }
}


window.addEventListener('resize', resizeFunc);
window.addEventListener('scroll', scrollFunc);
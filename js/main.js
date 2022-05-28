const heart = document.querySelector('.heart_btn');
const header = document.querySelector('#header');
const sidebox = document.querySelector('.side_box');
const variableWidth = document.querySelectorAll('.contents_box .contents');


/**
 *  이벤트 위임
 */
function delegationFunc(e) {

    let element = e.target;
    // console.log(element);

    // 'data-name'을 찾다가 없으면 그냥 종료
    while(!element.getAttribute('data-name')) {
        element = element.parentNode;
        
        if (element.nodeName === 'BODY') {
            element = null;
            return;
        }
    }

    if (element.matches('[data-name="heartbeat"]')) {
        console.log('하트비트~!');

    } else if (element.matches('[data-name="bookmark"]')) {
        console.log('북마크');

    }  else if (element.matches('[data-name="share"]')) {
        console.log('공유');

    } else if (element.matches('[data-name="more"]')) {
        console.log('더보기');
    }

    element.classList.toggle('on');
}

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


window.addEventListener('click', delegationFunc);
window.addEventListener('resize', resizeFunc);
window.addEventListener('scroll', scrollFunc);
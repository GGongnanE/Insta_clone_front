const header = document.querySelector('#header');
const sidebox = document.querySelector('.side_box');
const variableWidth = document.querySelectorAll('.contents_box .contents');
const delegation = document.querySelector('.contents_box');

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

        // ajax (jquery) -> TODO : JS fetch 
        $.ajax({
            type: 'GET',
            url: 'data/like.json',
            data: 37,
            dataType: 'json',
            success: function(response) {
                let likecount = document.querySelector('#like-count-37');
                likecount.innerHTML = '좋아요 ' + response.like_count + '개';
            },
            error: function(request, status, error) {
                // TODO : 에러 처리 구현 필요 
                alter('로그인이 필요합니다.')
                window.location.replace('https://www.naver.com');
            }
        });
    } else if (element.matches('[data-name="bookmark"]')) {
        
        let pk = element.getAttribute('name');

        $.ajax({
            type: 'GET',
            url: 'data/bookmark.json',
            data: {pk},
            dataType: 'json',
            success: function(response) {
                let bookmarkCount = document.querySelector('#bookmark-count-37');
                bookmarkCount.innerHTML = '북마크 ' + response.bookmark_count + '개';
            },
            error: function(request, status, error) {
                // TODO : 에러 처리 구현 필요 
                alter('로그인이 필요합니다.')
                window.location.replace('https://www.naver.com');
            }
        });

    } else if (element.matches('[data-name="comment"]')) {
        
        let content = document.querySelector('#add-comment-post-37 > input[type=text]').value;
        // console.log(content);

        if (content.length > 200) {
            alert('댓글은 최대 200자까지만 입력 가능합니다. 현재 글자수 : ' + content.length);
            return;
        }

        $.ajax({
            type: 'GET',
            url: './comments.html',
            data: {
                'pk':37,
                'content':content,
            },
            dataType: 'html',
            success: function(data) {
                document.querySelector('#comment-list-ajax-post37').insertAdjacentHTML('afterbegin', data);
            },
            error: function(request, status, error) {
                // TODO : 에러 처리 구현 필요 
                alter('에러가 발생했습니다. 관리자에게 문의하세요.')
            }
        });

        // 처리 완료 시, html 댓글 창 공백 처리 
        document.querySelector('#add-comment-post37 > input[type=text]').value = '';

    } else if (element.matches('[data-name="comment_delete"]')) {
        
        $.ajax({
            type: 'GET',
            url: 'data/delete.json',
            data: {
                'pk':37
            },
            dataType: 'json',
            success: function(response) {
                if (response.status === "1") {
                    let comment = document.querySelector('.comment-detail');
                    comment.remove();
                }
            },
            error: function(request, status, error) {
                // TODO : 에러 처리 구현 필요 
                alter('에러가 발생했습니다. 관리자에게 문의하세요.')
            }

        });


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

        if (sidebox) {
            sidebox.classList.add('on');
        }

        resizeFunc();

    } else {
        header.classList.remove('on');
        if (sidebox) {
            sidebox.classList.remove('on');
            sidebox.removeAttribute('style');
        }
    }
}

// 새로고침 시, 첫 스크롤로 돌아가도록 설정 
setTimeout(function() {
    scrollTo(0, 0)
}, 100)

if (delegation) {
    delegation.addEventListener('click', delegationFunc);
}
window.addEventListener('resize', resizeFunc);
window.addEventListener('scroll', scrollFunc);
        // Hammer.js로 이미지 슬라이드 터치 기능 만들기
        var image1 = document.querySelectorAll('.slide-box img')[0];
        
        var manager = new Hammer.Manager(image1);
        manager.add(new Hammer.Pan( { threshold: 0 } ));

        manager.on('pan', function (e) {
            // e.deltaX : (-)왼쪽 (+)오른쪽으로 이동한 거리를 알 수 있음
            console.log(e.deltaX);

            // 만약에 내가 왼쪽으로 그림을 슬라이드 했을 때...
            if (e.deltaX < -1) {
                $('.slide-container').css('transform', `translateX(${e.deltaX}vw)`);

                // 마우스를 떼면 이미지2가 쇽 변해야한다
                // 터치 중에는 transforming이 안돼야 하고
                // 터치가 끝나면 이미지2로 서서히 변경(transforming)이 돼야함
                
                // e.isFinal 터치가 끝났다

                if (e.isFinal) {
                    $('.slide-container').addClass('transforming');
                    $('.slide-container').css('transform', 'translateX(-100vw)');
                    
                    // 0.5s 이후에 transforming 클래스 제거
                    setTimeout(function () {
                        $('.slide-container').removeClass('transforming');
                    }, 500);
                }

            }
        });
        
        
        
        // 탭 기능 다시 만들기 - 이벤트 버블링 응용과 dataset
        // 이벤트 리스너를 적게 사용하면 메모리 절약이 가능하다!!!

        // 쌩 자바스크립트로 쓸 때 (HTML코드에 dataset 속성을 기입해야한다)
        $('.list').click(function (e) {
            // 만약에 내가 실제 누른 요소가 버튼 0이면 탭 0번째 열어줘라~

            // 여전히 코드가 긴 버전
            // if (e.target == document.querySelectorAll('.tab-button')[0]) {
            //     openTab(0);
            // }
            // if (e.target == document.querySelectorAll('.tab-button')[1]) {
            //     openTab(1);
            // }
            // if (e.target == document.querySelectorAll('.tab-button')[2]) {
            //     openTab(2);
            // }
            
            // dataset 활용한 버전
            // 탭열기(내가 누른 버튼에 숨겨져있던 숫자)
            openTab(e.target.dataset.id); 

        });

        // 제이쿼리로 쓸 때 (HTML코드에 몰래 정보를 넣지 않는 방법)
        // $('.list').data('작명', '값');
        // $('.list').data('작명');


        // 이벤트 버블링과 이벤트 함수
        $('.black-background').click(function (e) {

            e.target; // 지금 실제로 클릭한 HTML 요소
            e.currentTarget; // 지금 이벤트 리스너가 달린 곳
            $(this); // 지금 이벤트 리스너가 달린 곳
            e.preventDefault(); // 기본동작 막기
            e.stopPropagation(); // 내 상위요소로의 이벤트 버블링을 중단하기

            // 만약에 지금 실제로 클릭한 게 검은 배경일 때만 모달창 닫기
            // e.tartget == $('.black-background') 이거는 실행 안됨!!! 각각 다른 객체임(js객체, jq객체)
            if (e.target == e.currentTarget) {
                $('.black-background').removeClass('slide-down');
            }
        });


        // 탭 메뉴
        // $('.tab-button').eq(0).click(function () {
        //     $('.tab-button').removeClass('active');
        //     $('.tab-content').removeClass('show');
        //     $('.tab-button').eq(0).addClass('active');
        //     $('.tab-content').eq(0).addClass('show');
        // });
        // $('.tab-button').eq(1).click(function () {
        //     $('.tab-button').removeClass('active');
        //     $('.tab-content').removeClass('show');
        //     $('.tab-button').eq(1).addClass('active');
        //     $('.tab-content').eq(1).addClass('show');
        // });
        // $('.tab-button').eq(2).click(function () {
        //     $('.tab-button').removeClass('active');
        //     $('.tab-content').removeClass('show');
        //     $('.tab-button').eq(2).addClass('active');
        //     $('.tab-content').eq(2).addClass('show');
        // });

        // 확장성 있는 코드로 바꾸기 - 반복문 활용
        // for문 안에 var가 아닌 let을 써야한다!!!

        // 덜 확장성 있는 버전
        //for (let i = 0; i < 3; i++) { 

        // 더 확장성 있는 버전
        // var countTabBtn = $('.tab-button').length; // 특정 클래스 개수 카운팅
        // for (let i = 0; i < countTabBtn; i++) {
        //     $('.tab-button').eq(i).click(function () {
        //         openTab(i);
        //     });
        // }

        // 탭 열기 함수로 빼놓기
        function openTab(num) {
            $('.tab-button').removeClass('active');
            $('.tab-content').removeClass('show');
            $('.tab-button').eq(num).addClass('active');
            $('.tab-content').eq(num).addClass('show');
        }


        // 스크롤 애니메이션 - 스크롤 시 변하는 Navbar
        $(window).on('scroll', function () { // viewport가 스크롤 되었을 때~
            var nowScroll = $(window).scrollTop(); // 지금 스크롤 높이(px)
            //console.log(nowScroll);

            if (nowScroll > 100) {
                $('.nav-menu').addClass('nav-white'); // css를 변경하는 것보다 클래스를 추가하는 방식이 좋다
                $('.nav-menu h4').addClass('small-logo');
            } else {
                $('.nav-menu').removeClass('nav-white');
                $('.nav-menu h4').removeClass('small-logo');
            }
        });


        // Carousel(이미지 슬라이드)
        $('.slide-1').click(function () {
            $('.slide-container').css('transform', 'translateX(0vw)');
        });

        $('.slide-2').click(function () {
            $('.slide-container').css('transform', 'translateX(-100vw)');
        });

        $('.slide-3').click(function () {
            $('.slide-container').css('transform', 'translateX(-200vw)');
        });

        // Next, Prev 버튼으로 슬라이드 넘기기
        var nowImg = 1; // 지금 보이는 사진

        $('.slide-next').click(function () {
            // if (nowImg == 1) {
            //     $('.slide-container').css('transform', 'translateX(-100vw)');
            //     nowImg = nowImg + 1;
            // } else if (nowImg == 2) {
            //     $('.slide-container').css('transform', 'translateX(-200vw)');
            //     nowImg = nowImg + 1;
            // }

            // 확장성 있는 코드로 변경한 버전
            $('.slide-container').css('transform', 'translateX(-' + nowImg + '00vw)');
            if (nowImg < 2) {
                nowImg = nowImg + 1;
            }
        });

        $('.slide-prev').click(function () {
            $('.slide-container').css('transform', 'translateX(' + (1 - nowImg) + '00vw)');
            if (nowImg > 1) {
                nowImg = nowImg - 1;
            }
        });


        // 애니메이션 UI
        // $('#hi').click(function () {
        //     $('#hi').animate({ marginTop : '100px' }, 5000);
        //     // 자바스크립트에서는 CSS처럼 margin-left 이렇게 쓸 수 없다! (-)기호는 빼기 연산을 역할을 하기 때문에 카멜 문법을 사용한다.
        //     // $('#hi').animate({ marginTop : '100px', marginLeft : '100px' }); 여러개 CSS 쓰고 싶을 때
        //     // $('#hi').animate({ marginTop : '100px' }, 5000); 5초 동안 동작한다는 뜻
        // });

        $('#show-menu').click(function () {
            $('.left-menu').animate({
                marginLeft: '0px'
            }, 1000);
        });

        // 변수 - 같은 셀렉터 여러번 쓰지말고 변수에 담아쓰자
        // 선언(변수를 만들겠다), 할당(값을 집어넣는 것), 범위(변수가 쓰이는 범위, 일반적으로 function 내부)
        var emailAlert = $('#email-alert');
        var 이름 = 'John asdf asdfaa asdfsdf';

        // 원래 변수 문법
        // 범위가 function
        var 나이1 = 20;
        var 나이1;

        // 최신 자바스크립트 문법 (ES6)
        // 범위가 {}
        // let 재선언이 불가능한 변수를 만들 때
        let 나이2 = 20;
        //let 나이2; // 불가능

        // const 재선언이 불가능한 변수를 만들 때
        // 범위가 {}
        //       재할당이 불가능한 변수를 만들 때
        const 나이3 = 20;
        //나이3 = 21; // 불가능


        // if-else 조건문 사용법
        // 세트로 묶인 if 문은 위에서 아래로 내려가다 조건이 맞는 거 하나만 실행한다. 이후의 if / else는 해석하지 않는다.
        if (1 === '1') {
            // == 느슨비교, === 엄격비교(자료의 타입까지 동일해야 같다고 판단)
            console.log('안녕');
        } else if (1 == 1) {
            console.log('안녕2');
        } else {
            console.log('반가워');
        }

        if (1 == 2 && 2 == 3) {
            // && and, || or 
        }

        // 만약에 이메일 input에 입력된 값이 빈칸인 경우, 폼의 전송을 막음, 안내문 띄움
        // 만약에 패스워드 input에 입력된 값이 빈칸인 경우, 폼의 전송을 막음, 안내문 띄움
        $('form').on('submit', function (e) {
            // if ($('#email').val() == '') {
            //     e.preventDefault(); // 폼의 전송을 막는 코드
            //     $('#email-alert').show();
            // } else if ($('#password').val() == '') {
            //     e.preventDefault(); // 폼의 전송을 막는 코드
            //     $('#password-alert').show();
            // }

            // if를 2개 따로 쓰거나 else if를 쓰거나 약간의 차이만 있다.

            // 정규식으로 검사하기
            // 만약에 지금 이메일 input에 입력된 값이 정규식과 비교했을 때 false인 경우 폼 전송 막기, 안내창 띄우기
            // 이메일 형식 검증 & 공백 검사 동시에 하기
            // 패스워드에 대문자가 없으면 폼 전송 막기
            var userEmail = $('#email').val();
            var userPw = $('#password').val();
            if (/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/
                .test(userEmail) == false) {
                e.preventDefault();
                $('#email-alert').show();
            } else if (userEmail == '') {
                e.preventDefault();
            } else if (/[A-Z]/.test(userPw) == false) {
                e.preventDefault();
                $('#password-alert').show();
            }
        });


        // 정규식(문자를 검사하는 방법)으로 이메일 형식 검증하기
        // true, false로 나오니까 if문에서 사용하기 좋다!
        // 형태
        // /abc/.test('abcdefg'); // abcdefg 문자에 abc라는 글자가 있는가?
        // /[A-z]/.test('s'); // 대문자A부터 소문자z까지 s라는 글자가 있는가?
        // /\S@/.test('t@'); // \S는 특수문자 포함 모든 문자, 모든 문자 뒤에 @가 오는가?
        // /\S+@\S+\.\S+/.test('asdf@asdf.com'); // 간단한 이메일 정규식



        // form과 관련된 이벤트들
        // input(값이 변경될 때 실행) / change (값이 변경되고 focus를 잃을 때 실행)
        $('#email').on('input', function () {
            $('#email-alert').show();
        });


        // 369게임
        function game(num) {
            if (num % 9 == 0) {
                console.log("박수x2");
            } else if (num % 3 == 0) {
                console.log("박수");
            } else {
                console.log("통과");
            }
        }


        // 이자율 계산하기
        var deposit = 60000;
        var futureDeposit = 0;
        if (deposit < 50000) {
            futureDeposit = deposit * 1.15 * 1.15;
        } else {
            futureDeposit = deposit * 1.2 * 1.2;
        }
        console.log(futureDeposit);

        // 커피양 계산하기
        var firstCoffee = 360;
        var drinkedCoffee = 0;
        var refillCoffee = 0;
        var totalCoffee = 0;
        if (refillCoffee == 0) {
            totalCoffee = firstCoffee + (firstCoffee * 2 / 3);
            refillCoffee = 1;
        }
        if (refillCoffee == 1) {
            totalCoffee = totalCoffee + ((firstCoffee * 2 / 3) * 2 / 3);
            refillCoffee = 2;
        }
        console.log(totalCoffee);

        // input에 입력된 값이 '안녕'일 때만 모달창 오픈
        // $('#test-input').keyup(function () {
        //     //var text = $('#test-input').val();
        //     if ($('#test-input').val() == '안녕') {
        //         $('.black-background').fadeIn();
        //     }
        // });


        // 모달창 나타나기
        $('#login').on('click', function () {
            // input에 입력된 값이 '안녕'일 때만 모달창 오픈
            // if ($('#test-input').val() == '안녕') {
            //     $('.black-background').fadeIn();
            // }

            // fadeIn으로 나타나기
            // $('.black-background').fadeIn();

            // 위에서 아래로 애니메이션으로 나타나기
            // 함수를 연결해서 순서대로 실행할 수 있다.
            // $('.black-background').show().animate({ marginTop : '0px' }, 500);

            // 요즘 스타일 애니메이션은 CSS를 활용한다!!!
            // $('.black-background').css('transform', 'translateY(0px)');

            // CSS class를 부착하는 방향으로 시작화면/최종화면 만드는 편이 좋다! 복잡한 애니메이션이 있을 때 관리가 쉽다
            $('.black-background').addClass('slide-down');

        });

        // 네비게이션 메뉴 나타나기
        $('#nav-sub-btn').click(function () {
            $('.nav-sub').slideToggle();
        });

        // 모달창 사라지기
        $('.close-btn').click(function () {
            // $('.black-background').fadeOut();
            $('.black-background').removeClass('slide-down');
        });
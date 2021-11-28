// 화면 호출
const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");
const endPoint = 12;
const select = [];

// (5) calResult() : 선택한 결과값을 계산해 주는 함수 호출
// 유저가 질문을 선택했을 때의 type이 가장 많은 것을 호출 
function calResult(){
    // 결과를 계산할 배열
    var pointArray = [
        { name : 'mouse', value : 0, key : 0},
        { name : 'cow', value : 0, key : 1},
        { name : 'tiger', value : 0, key : 2},
        { name : 'rabbit', value : 0, key : 3},
        { name : 'dragon', value : 0, key : 4},
        { name : 'snake', value : 0, key : 5},
        { name : 'hourse', value : 0, key : 6},
        { name : 'sheep', value : 0, key : 7},
        { name : 'monkey', value : 0, key : 8},
        { name : 'chicken', value : 0, key : 9},
        { name : 'dog', value : 0, key : 10},
        { name : 'pig', value : 0, key : 11},
    ]

    // 
    for(let i = 0; i < endPoint; i++){
        var target = qnaList[i].a[select[i]];
        // type에 대한 반복문
        for(let j =0; j< target.type.length; j++)
        {
            // pointArray를 위한 반복문
            for(let k = 0; k < pointArray.length; k++)
            {
                // target.type의 값과 pointArray의 값이 일치하면 value를 1 증가시켜 준다.
                if(target.type[j] === pointArray[k].name){
                    pointArray[k].value += 1;
                }
            }
        }
    } 
    // pointArray의 value값이 큰 순으로 내림차순 정렬해 value값이 가장 큰 값 리턴
    var resultArray = pointArray.sort(function(a,b){
        if(a.value > b.value){
        // 내림차순 일경우 return 1;
            return -1;
        }
        if(a.value < b.value){
        // 내림차순 일경우 return -1;
            return 1;
        }
        // a must b equal to b
        return 0;
    });

    console.log(resultArray);
    let resultword = resultArray[0].key;
    return resultword;
}
// (4) goResult 함수 호출
function goResult(){
    qna.style.WebkitAnimation = "fadeOut 1s";
    qna.style.animation = "fadeOut 1s";
    setTimeout(() => {
        result.style.WebkitAnimation = "fadeIn 1s";
        result.style.animation = "fadeIn 1s"
        setTimeout(() => {
            qna.style.display = "none"; 
            result.style.display = "block"; 
        },450)})

        calResult();
}

// (3) 파라미터를 받아와 answerText를 선택했을 때의 결과
function addAnswer(answerText, qIdx, idx)
{
    var a = document.querySelector('.answerBox');
    var answer = document.createElement('button');
    answer.classList.add('answerList');
    answer.classList.add('my-5');
    answer.classList.add('py-5');
    answer.classList.add('mx-auto');
    answer.classList.add('fadeIn');
    
    a.appendChild(answer);
    answer.innerHTML = answerText;

    answer.addEventListener("click", function(){
        var children = document.querySelectorAll('.answerList');
        for(let i =0; i< children.length; i++)
        {
            children[i].disabled = true;
            children[i].style.WebkitAnimation = "fadeOut 0.5s";
            children[i].style.animation = "fadeOut 0.5s";
        }
        setTimeout(() => {
            select[qIdx] = idx;
            for(let i =0; i< children.length; i++)
            {
                children[i].style.display = 'none';
            }
            goNext(++qIdx);
        }, 450)
         
    }, false);
}

// (2) qBox div에 (data.js의) q를 순서대로 호출
function goNext(qIdx){
    if(qIdx === endPoint){
        goResult();
        return;
    }
    var q = document.querySelector('.qBox'); 
    q.innerHTML = qnaList[qIdx].q;
    for(let i in qnaList[qIdx].a)
    {
        addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
    }
    var status = document.querySelector('.statusBar');
    status.style.width = (100/endPoint) * (qIdx+1) + '%';

}

// (1) main화면에서 '시작하기' 버튼 누를시
function begin(){
    main.style.WebkitAnimation = "fadeOut 1s";
    main.style.animation = "fadeOut 1s";
    setTimeout(() => {
        qna.style.WebkitAnimation = "fadeIn 1s";
        qna.style.animation = "fadeIn 1s"
        setTimeout(() => {
            main.style.display = "none"; 
            qna.style.display = "block"; 
        },450)
        let qIdx = 0;
        goNext(qIdx);
    }, 450);



}
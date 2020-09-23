// 랜덤으로 당근과 버그 배치시키기!

const gamefield=document.querySelector('.game_field')
const Rect=gamefield.getBoundingClientRect();
const carrot_size=80
const carrot_count=25
const timer=document.querySelector('.timer');
const popuptext=document.querySelector('.pop_up_text');
const popup=document.querySelector('.pop_up');
const carrotsound =new Audio('./sound/carrot_pull.mp3');
const alertsound =new Audio('./sound/alert.wav');
const bgsound =new Audio('./sound/bg.mp3');
const bugsound =new Audio('./sound/bug_pull.mp3');
const gamewinsound =new Audio('./sound/game_win.mp3');








function initGame(){
    gamefield.innerHTML='';
addItem('carrot',carrot_count,'img/carrot.png');
addItem('bug',carrot_count,'img/bug.png');
count.innerHTML=carrot_count;
}

function addItem(className,count,imgpath){
    const x1=0;
    const y1=0;
    const x2=Rect.width-carrot_size;
    const y2=Rect.height-carrot_size;
    for(let i=0; i<count; i++){
    const item=document.createElement('img');    
    item.setAttribute('class',className);
    item.setAttribute('src',imgpath);
    item.style.position='absolute';
    const x=randomNumber(x1,x2);
    const y=randomNumber(y1,y2);
    item.style.left=`${x}px`;
    item.style.top=`${y}px`;
    gamefield.appendChild(item);    

    }
}

function randomNumber(min,max){
    return Math.random()*(max-min)+min;
}



// 재생버튼 클릭 하면 게임시작! 


let started=false;
let score=0;
let Gametimer=undefined;
const count=document.querySelector('.count')
const playBtn=document.querySelector('.play_Btn');
playBtn.addEventListener('click',()=>{
        if(started){
            Gamestop()
    }else{
        Gamestart()
    }
});

const retryy=document.querySelector('.retry')
retryy.addEventListener('click',()=>{
    Gamestart();
    hidepopupo();
    
});

function Gamestart(){
    started=true;
    const icon=playBtn.querySelector('.fas')
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
    const timer=document.querySelector('.timer');
    timer.style.visibility='visible';
    count.style.visibility='visible';
    timerstart() 
    initGame()
    playsound(bgsound);
}
function Gamestop(){
    started=false;
    const youwin=document.querySelector('you_win');
    clearInterval(Gametimer);
    ShowPopUpWithText('REPLAY?');
    hideGameButton();
    playsound(alertsound);
    stopsound(bgsound);
    }
 function finishGame(win){
      started=false;
      score=0;
        hideGameButton();
        if(win){
            playsound(gamewinsound);
        }else{
            playsound(bugsound);
        }
        clearInterval(Gametimer);
        stopsound(bgsound);
        ShowPopUpWithText(win ? 'YOU WIN' : 'YOU LOST');
    
  }
function hideGameButton(){
    playBtn.style.visibility='hidden';
}


function ShowPopUpWithText(text){
    popuptext.innerText=text;
    popup.classList.remove('you_win');
}

// 재생버튼눌리면 시간줄어들기.

function timerstart(){
    const Game_Time_Now=10;
    let time=Game_Time_Now
    settime(time);
    Gametimer=setInterval(()=>{
        if(time <=0){
            clearInterval(Gametimer);
            finishGame(carrot_count===score);
            return;
        }else{
            settime(--time)
        }
    },1000);
};

function settime(time){
    const minute=Math.floor(time/ 60);
    const second=time % 60;
    timer.innerHTML=`0${minute}:${second}`;
}



gamefield.addEventListener('click',(event)=>{
    const target=event.target;
    if(!started){
        return}
    if(target.matches('.carrot')){
        target.remove();
        score++;
        playsound(carrotsound);
        updateScoreBoard();
     if(score === carrot_count){
        finishGame(true);
     }   
    }
    else if(target.matches('.bug')){
        finishGame(false);
    }   
});
function updateScoreBoard(){
    count.innerText= carrot_count - score;
};

function hidepopupo(){
    popup.classList.add('you_win');
    playBtn.style.visibility='visible';
}

function playsound(sound){
    sound.currentTime=0;
    sound.play();
}

function stopsound(sound){
    sound.pause();
}
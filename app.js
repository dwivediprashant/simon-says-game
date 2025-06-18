// let startKey=document.createElement("k");
let level=0;
let gameStarted=false;
let gameSeq=[];
let userSeq=[];

let btnList=["btn1","btn2","btn3","btn4"];

function gameFlash(ranBtn){
    // ranBtn.classList.add("flashByGame");
    setTimeout(()=>{
        ranBtn.classList.add("flashByGame");
    },1100);

    setTimeout(()=>{
        ranBtn.classList.remove("flashByGame");
    },1500);
}
function ranBtnGen(){
    let ranIdx=Math.floor(Math.random()*4);
    let ranBtnId=btnList[ranIdx];
    gameSeq.push(ranBtnId);
    let ranBtn=document.querySelector(`#${ranBtnId}`);
    return ranBtn;
}

function gameUp(){
    level++;
    let h3=document.querySelector("h3");
    h3.innerText=`Level ${level}`;
    let ranBtn=ranBtnGen();
    gameFlash(ranBtn);
    // gameSeq.push()
}

function gameRestart(){
    let h3=document.querySelector("h3");
    h3.innerHTML=`GAME OVER!! You completed <b>${level-1} level </b><br>.Press any key to restart the game.`;

    level=0;
    gameStarted=false;
    gameSeq=[];
    userSeq=[];
    let container=document.querySelector(".container");
    container.classList.add("backgroundFlash");
    setTimeout(()=>{
        container.classList.remove("backgroundFlash");
    },500)
}

function checkPress() {
    let currentIdx = userSeq.length - 1; // Get the last pressed index

    // Step 1: Check if last pressed button matches game sequence
    if (userSeq[currentIdx] !== gameSeq[currentIdx]) {
        gameRestart(); // If mismatch, restart game
        return;
    }

    // Step 2: If full sequence is matched, go to next level
    if (userSeq.length === gameSeq.length) {
        userSeq=[];
        gameUp();
    }
}
function userPressFlash(idOfBtn){
    let btn=document.querySelector(`#${idOfBtn}`)
    btn.classList.add("flashByUser");
    setTimeout(()=>{
        btn.classList.remove("flashByUser");
    },300);
}
function btnPress(){
    // userSeq.push(this);
    let idOfBtn=this.getAttribute("id");
    userPressFlash(idOfBtn);
    userSeq.push(idOfBtn);

    checkPress();
    
}

// function btnPress(){
//     let classOfBtn = this.getAttribute("class").split(" ").find(cls => btnList.includes(cls));
//     userSeq.push(classOfBtn);
//     checkPress();
// }


let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

document.addEventListener("keypress",function(evt){
    if(gameStarted==false){
        gameStarted=true;
        gameUp();
    }
})
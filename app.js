const canvas = document.querySelector('#jsCanvas');
const range= document.querySelector('#jsRange');
let painting=false;
const ctx = canvas.getContext('2d');
const saveBtn = document.querySelector('#jsSave');
canvas.width = 700;
canvas.height = 700;
ctx.fillStyle = "white";
ctx.fillRect(0,0,700,700);
//색깔 변경
let colors= document.getElementsByClassName('jsColor');
/*여러 개의 item에 같은 event를 넣어주려면 class로 받기 */
//fill
let fill=false;
const fillbtn=document.querySelector('#jsMode');
function changeFill(event){
    if(fill){
        event.target.innerText="Fill";
        fill=false;    
    
        }else{
        event.target.innerText="Paint";
        fill=true;
    
    }
}

fillbtn.addEventListener('click',changeFill);
        

//이렇게 변수를 하나 넣는 거!
//그리고 innerText는 원래 있던 text를 변경해쥬는 거라는 거

ctx.strokeStyle='#2c2c2c';
ctx.lineWidth=2.5;

//이런 배열의 item에도 addEventListener가 붙을 수 있따는거..
function changeColor(event){
   const color= event.target.style.backgroundColor;
    ctx.strokeStyle=color;    
};

Array.from(colors).forEach((color)=>{color.addEventListener('click',changeColor)});
//이 객체 뭔지,, fetch 알아보는 김에 더

//브러쉬 두께 변경
function changeThickness(event){
    thickness=event.target.value;
    ctx.lineWidth=thickness;
}
range.addEventListener("input",changeThickness);

function startPainting(){
    painting=true;
}


function stopPainting(){
    painting=false;
}

function onMouseMove(event){
    const x=event.offsetX;
    const y=event.offsetY;
if(!painting){
    ctx.beginPath();
    ctx.moveTo(x, y);
}else{
    ctx.lineTo(x, y);
    ctx.stroke();
}
}

function filling(event){
    if(fill){
        ctx.fillStyle=ctx.strokeStyle;
        ctx.fillRect(0, 0, 700, 700);    
    }
    else{};
}
if(canvas){
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener('click', filling);
}

function save(){
    const image= canvas.toDataURL();
    //canvas에서 이미지를 만드는 api
    const link =document.createElement('a');
    const name=prompt('저장할 이름을 적으세요');
    link.download=name;
    link.href=image;
    link.click();
}


    saveBtn.addEventListener('click',save);


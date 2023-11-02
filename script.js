const keyword = document.getElementById("keyword");
const grid = document.getElementById("grid");
let round = 0;
let qtdKeys = 4;
let currentInput = null;
let selectedes=[]
let numbers = [2,5,9,1,0];

const confirm = document.getElementById("confirm")
//Adiciona os numeros no grid
function(){
  let allCheck = []
   selectedes.forEach((item,index) => {
     if(numbers[index] == item.num){
        document.getElementById(item.key).style.color = "blue"
        document.getElementById('key_'+item.key).style.color = "blue"
       allCheck.push(item.num)
     }else {
         if(numbers.some(num => num == item.num)){
             document.getElementById(item.key).style.color = "blue"
             document.getElementById('key_'+item.key).style.color = "green"
         }
     }
   })
  if(allCheck.legth === numbers.length){
     alert("Venceu")
  }
}
function addNumber(num) {
  if (currentInput) {
    currentInput.textContent = num;
    if(!selectedes.some(x => x.key === currentInput.id)){
       selectedes.push({
         key:currentInput.id,
         num
       }
    }else{
      const index = selectedes.findIndex(x => x.key === currentInput.id)
      selectedes[inde.num = num
    }
    if(currentInput.nextElementSibling){
      currentInput.nextElementSibling.focus()
    }
       
    if(selectedes.length === numbers.length){
      confirm.classList.add("show")
    }else {
      confirm.classList.remove("show")
    }
    
  }
}

function mountGame() {
  round++;
  qtdKeys++;
  grid.style.gridTemplateColumns = `repeat(${qtdKeys},1fr)`;
  grid.style.gridTemplateRows = `repeat(${qtdKeys},1fr)`;
  for (let num = 1; num <= qtdKeys * round; num++) {
    const input = document.createElement("p");
    input.name = "input_" + num;
    input.id = "input_" + num;
    input.classList.add("input");
    input.type = "text";
    input.inputMode = "number";
    input.addEventListener("focus", (e) => {
      currentInput = e.target;
    });
    input.tabIndex = num;

    if(num == 1){
       input.focus()
    }

    grid.appendChild(input);
  }
}

window.onload = mountGame();

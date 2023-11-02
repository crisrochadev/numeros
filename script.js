const keyword = document.getElementById("keyword");
const grid = document.getElementById("grid");
let round = 0;
let qtdKeys = 4;
let currentInput = null;
let selectedes=[]
//Adiciona os numeros no grid
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

    grid.appendChild(input);
  }
}

window.onload = mountGame();

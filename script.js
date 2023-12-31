const keyword = document.getElementById("keyword");
const grid = document.getElementById("grid");
let qtdKeys = 6;
let round = 1;
let currentInput = null;
let selectedes = [];
let numbers = [];
let digit = new Audio('./src_assets_sound_carrinho.wav');
let inputs = [];
let elements = document.querySelectorAll(".num");

const confirm = document.getElementById("confirm");

function backspace() {
  currentInput.textContent = "";
  let selEl = selectedes.findIndex((sel) => sel.key == currentInput.id);
  if (!confirm.disabled) {
    confirm.setAttribute("disabled", true);
  }
  selectedes.splice(selEl, 1);
  if (
    currentInput.previousElementSibling &&
    !currentInput.previousElementSibling.id.startsWith("disabled")
  ) {
    currentInput.previousElementSibling.focus();
  } else {
    currentInput.focus();
  }
}
//Adiciona os numeros no grid
function check() {
  const grids = document.querySelectorAll(".input")
 
  let allCheck = [];
  selectedes.forEach((item, index) => {
    if (numbers[index] == item.num) {
      document.getElementById(item.key).classList.add("done");
      document.getElementById("key_" + item.num).classList.add("done");
      allCheck.push(item.num);
    } else {
      if (numbers.some((num) => num == item.num)) {
        document.getElementById(item.key).classList.add("ok");
        document.getElementById("key_" + item.num).classList.add("ok");
      }
    }
    Array.from(elements).forEach((el) => el.classList.remove("selected"));
  });
  //alert(JSON.stringify(allCheck))
 // alert(JSON.stringify(selectedes))
  if (allCheck.length === numbers.length) {
    alert("Venceu");
    grid.innerHTML = ""
    selectedes = [];
    init();
  } else {
     
  if(Array.from(grids).length === (qtdKeys*qtdKeys)){
    // Array.from(grids).forEach((inp,index) => {
       //  if(index < qtdKeys){
        //grid.removeChild(inp)
       //  }
   //  })
    alert("Você perdeu");
    init();
    return;
    
  }
    Array.from(inputs).forEach((item, index) => {
      item.id = "disabled_" + (index + round);
      item.setAttribute("disabled", true);
    });
    selectedes = [];
    mountGame();
  }
}
function addNumber(element, num) {
  
  if (currentInput && !selectedes.some((x) => x.num === num)) {
    currentInput.textContent = num;
    if (!selectedes.some((x) => x.key === currentInput.id)) {
      selectedes.push({
        key: currentInput.id,
        num,
      });
    } else {
      const index = selectedes.findIndex((x) => x.key === currentInput.id);
      selectedes[index]= {
        key: currentInput.id,
        num,
      }
    }
alert(selectedes)
    if (currentInput.nextElementSibling) {
      currentInput.nextElementSibling.focus();
    }

    if (selectedes.length === numbers.length) {
      confirm.removeAttribute("disabled");
    } else {
      confirm.setAttribute("disabled", true);
    }
    if (inputs.some((i) => i == currentInput)) {
      let index = inputs.findIndex((i) => i == currentInput);
      inputs[index] = currentInput;
    } else {
      inputs.push(currentInput);
    }

    Array.from(elements).forEach((el) => {
      if (selectedes.some((sel) => sel.num == el.textContent)) {
        el.classList.add("selected");
      } else {
        el.classList.remove("selected");
      }
    });
  }
}
function gerarNumerosAleatorios() {
  const numeros = [];
  for (let i = 0; i < 6; i++) {
    const numeroAleatorio = Math.floor(Math.random() * 10);
    numeros.push(numeroAleatorio);
  }
   return numeros;
}
function mountGame() {
  
  grid.style.gridTemplateColumns = `repeat(${qtdKeys},1fr)`;
  grid.style.gridTemplateRows = `repeat(${qtdKeys},1fr)`;
  for (let num = 1; num <= qtdKeys * round; num++) {
    const input = document.createElement("p");
    input.name = "input_" + num;
    input.id = "input_" + num;
    input.classList.add("input");
    input.type = "text";
    input.inputMode = "number";
    input.removeAttribute("disabled");
    input.addEventListener("focus", (e) => {
      currentInput = e.target;
    });
    input.tabIndex = num;

    if (num == 1) {
      input.setAttribute("autofocus", true);
    }

    grid.appendChild(input);
    if (num == 1) {
      input.focus();
    }
  }
}
function init(){
  numbers = gerarNumerosAleatorios();
  alert(numbers)
  mountGame();
}
window.onload = init();

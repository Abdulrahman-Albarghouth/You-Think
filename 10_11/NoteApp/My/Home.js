const input = document.getElementById("input");
const List = document.getElementById("list");
const btns = document.getElementById("btns");
let add = document.getElementById("add");

add.addEventListener("click", () => {
  const li = document.createElement("li");
  const p = document.createElement("p");
  let divBtn = document.createElement("div");

  li.classList.add("text");
  
  divBtn.innerHTML = btns.innerHTML;
  p.innerHTML = input.value;

  li.appendChild(p);
  li.appendChild(divBtn);
  List.appendChild(li);
});

/****************************************************
const input = document.getElementById("input");
const List = document.getElementById("list");

let add = document.getElementById("add")

add.addEventListener("click", (e) => {
    const para = document.createElement("li");
    para.classList.add("text")
    const node = document.createTextNode(input.value);
    para.appendChild(node)
    List.appendChild(para)

  });
 
 
 
   li.innerHTML+=`<div id="btns">
  <button id="btn">
    <span class="material-icons-outlined"> task_alt </span>
  </button>
  <button id="btn">
    <span class="material-icons-outlined"> delete </span>
  </button>
</div>`;
  */

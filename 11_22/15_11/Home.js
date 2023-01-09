const input = document.getElementById("todo-input");
const btn = document.getElementById("todo-btn");
let todosArr = [];
const list = document.querySelector("ul");

const isLigth = (color) =>
  (color.red * 299 + color.green * 587 + color.blue * 114) / 1000 > 155;

const randomColor = () => {
  return {
    red: Math.random() * 256,
    green: Math.random() * 256,
    blue: Math.random() * 256,
  };
};

btn.addEventListener("click", () => {
  const inputText = input.value.trim();
  if (inputText) {
    //     const li = document.createElement("li");
    //     li.innerHTML = `
    //     <p>${inputText}</p>
    //     <div>
    //       <span class="material-icons-outlined"> task_alt </span>
    //       <span class="material-icons-outlined"> delete </span>
    //     </div>`;
    const newTodoObj = {
      id: todosArr.length,
      content: inputText,
      color: randomColor(),
      isDone: false,
    };
    todosArr.push(newTodoObj);
    display(todosArr);
  } else {
    window.alert("Please Enter the todo task!");
  }
  input.value = "";
});

const display = (todoes) => {
  list.innerHTML = "";
  todoes.map((todo) => {
    list.innerHTML += `
    <li id="${todo.id}" style="background-color: rgb(${todo.color.red}, ${
      todo.color.green
    }, ${todo.color.blue})">
    <p style="color: ${
      isLigth(todo.color) ? "black" : "white"
    }; text-decoration: ${todo.isDone ? "line-through" : "none"}">${
      todo.content
    }</p>
    <div style="color: ${isLigth(todo.color) ? "black" : "white"}" id="btns">
      <span class="material-icons-outlined" onclick="checToto(${todo.id})" style="color: ${todo.isDone ? "green" : "none"}" > task_alt </span>
      <span class="material-icons-outlined" onclick="deleteToto(${
        todo.id
      })" > delete </span>
    </div>
  </li>`;
  });
  setStorage(todosArr);
};

const deleteToto = (id) => {
  const index = todosArr.findIndex((item) => item.id == id);
  todosArr.splice(index, 1);
  display(todosArr);
};

const checToto = (id) => {
  const index = todosArr.findIndex((item) => item.id == id);
  todosArr[index].isDone = !todosArr[index].isDone;
  display(todosArr);
};
const refresh = () => {
  localStorage.clear();
  todosArr = [];
  display(todosArr);
};
const setStorage = (todoes) => {
  localStorage.setItem("todoes", JSON.stringify(todoes));
};

const getStorage = () => {
  if (localStorage.getItem("todoes") != null) {
    todosArr = JSON.parse(localStorage.getItem("todoes"));
    display(todosArr);
  }
};

getStorage();


// let user ={
//     name: "Abdulrahman",
//     last: "Albarghouth",
//     x() {
//         // return (this.name+" "+this.last);
//         return (`${this.name} ${this.last}`);
//     }
// }
// function name() {
//     // return (user.name+" "+user.last);
//     return (`${user.name} ${user.last}`);
// }
// console.log(name());
// console.log(user.x());

// var num=[1,2,3];
// var char=["x","z","v"];
// var total=[...num,...char];
// console.log(total);

// const power=({base, exp})=> base**exp;

// console.log(power({exp:2,base:3}));



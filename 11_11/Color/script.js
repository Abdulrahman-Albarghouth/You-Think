var selectsdPath = null;
var paths = document.querySelectorAll("path");
var usedColors = [];
var colors = {};

for (var i = 0; i < paths.length; i++) {
  paths[i].addEventListener("click", function (event) {
    if (selectsdPath) {
      selectsdPath.style.stroke = "#000";
    }
    selectsdPath = event.target;
    selectsdPath.style.stroke = "#F00";
  });
}
document.querySelector("#colorize").addEventListener("click", function () {
  if (!selectsdPath) {
    window.alert("Please select a path color.");
    return;
  }
  var color = document.querySelector("#color").value;
  // continue coloring
  selectsdPath.style.fill = color;
  if (!colors[`${color}`]) {
    colors[`${color}`] = 1;
  } else {
    colors[`${color}`] += 1;
  }
  if (usedColors.indexOf(color) == -1) {
    usedColors.push(color);
    displayUsedColors();
  }
});

function displayUsedColors() {
  var divs = "";
  for (let i = 0; i < usedColors.length; i++) {
    divs += `<div class="used-color" data-color=${usedColors[i]} style="background-color:${usedColors[i]};"></div>`;
  }
  document.querySelector("#used").innerHTML = divs;
  var usedColorDivs = document.querySelectorAll(".used-color");
  for (let i = 0; i < usedColorDivs.length; i++) {
    usedColorDivs[i].addEventListener("click", function (event) {
      document.getElementById("color").value =
        event.target.getAttribute("data-color");
    });
  }
}
document.querySelector("#remove-color").addEventListener("click", function () {
  if (selectsdPath) {
    var x = selectsdPath.style.fill;
    selectsdPath.style.fill = "transparent";
    
  }
});

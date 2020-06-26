var itemCount = 1
function addNewItem(){
   
    var outerDiv = document.getElementById("outerDiv")
    var newDiv = document.createElement("div");

    var newCheckbox = document.createElement("input");
    newCheckbox.type = "checkbox";
    newCheckbox.id = itemCount;   
    newCheckbox.addEventListener("click" ,checkboxListner);
    
    var newTextBox = document.createElement("input");
    newTextBox.type = "textbox"; 
    newTextBox.id = "text"+itemCount;
    newTextBox.className = "textbox"
   

    var trashImg = document.createElement("IMG");
    trashImg.setAttribute("src", "../Images/delete.png");
    trashImg.type = "IMG";
    trashImg.id = "deleteIMG"+itemCount;
    trashImg.className = "trashImg";
    trashImg.addEventListener("click", deleteItem);

    itemCount++;


    var brk = document.createElement("br");
    newDiv.appendChild(brk);

    newDiv.appendChild(newCheckbox);
    newDiv.appendChild(newTextBox);
    newDiv.appendChild(trashImg);
    outerDiv.appendChild(newDiv);  

}


function checkboxListner(){
    
    var checkBox = document.getElementById(this.id);
    var textBox = document.getElementById("text" + this.id);

    if(checkBox.checked == true){
        textBox.style.textDecoration = "line-through";
    }
    else{
        textBox.style.textDecoration = "none";
    }
}

function deleteItem() {
      this.parentNode.parentNode.removeChild(this.parentNode);
}


function submit(){
    alert("Your Task List Created!");
}










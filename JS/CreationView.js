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
    newTextBox.style = "width: 80%; height: 60%";
   

    var trashImg = document.createElement("IMG");
    trashImg.setAttribute("src", "../Images/delete.png");
    trashImg.setAttribute("width", "25");
    trashImg.setAttribute("height", "25");
    trashImg.type = "IMG";
    trashImg.id = "deleteIMG"+itemCount;
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
    // var elem = document.getElementById("deleteIMG" + this.id);
      this.parentNode.parentNode.removeChild(this.parentNode);


}













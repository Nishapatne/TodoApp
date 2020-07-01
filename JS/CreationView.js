var itemCount = 1;
var shouldAddItem = true;

var todoListArray = [];

function addNewItem(){
   
    if(!addItemValidation()){
        return;
    }
    var outerDiv = document.getElementById("outerDiv")
    var newDiv = document.createElement("div");

    var newCheckbox = document.createElement("input");
    newCheckbox.type = "checkbox";
    newCheckbox.id = itemCount;  
    newCheckbox.addEventListener("click" ,checkboxListner);
    
    var newTextBox = document.createElement("input");
    newTextBox.type = "textbox"; 
    newTextBox.id = "textbox"+itemCount;
    newTextBox.className = "textbox"
    newTextBox.addEventListener("change", textboxChangecolor)
   

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
    var textBox = document.getElementById("textbox" + this.id);

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
    var todoList = {
        title: "",
        items: []
    };
    
    var title =  document.getElementById("todoListTitle").value;

    if(title == ""){
        //add alert box
        alert("Title can not be empty");
        return;
    }
    else{
        document.getElementById("todoListTitle").value= "";
    }

    todoList.title = title
    for(i = 1;i<itemCount;i++){
        var elem = document.getElementById("textbox" + i);
        
        if(elem!=null){
           todoList.items.push(elem.value);
           elem.value = "";
        }
    } 
    todoListArray.push(todoList);


    // For Displaying lists
    var todoListsHtmlComponent = rendertodoList(todoListArray);
    document.getElementById("todoList").innerHTML = '';
    document.getElementById("todoList").append(todoListsHtmlComponent);

    //for console
    console.log(todoList);
    console.log(todoListArray);
}

function rendertodoList(todoListArray) {

    var todoListsHtmlComponent= document.createElement('div');

    todoListArray.forEach(todoList => {
        var todoListHtmlComponent= createListComponent(todoList)
        todoListsHtmlComponent.appendChild(todoListHtmlComponent);
    });

    return todoListsHtmlComponent;
}

function createListComponent(todoList) {

    var listDiv = document.createElement('div');
    var listTitle = document.createElement('h2');
    var title = document.createTextNode(todoList.title);  // Set Title of List 1
    listTitle.appendChild(title);  // Append Title to header
    listDiv.appendChild(listTitle);  //Append header to list div

    
    var itemsList = document.createElement('ul'); //create list for items
    todoList.items.forEach(item => {

        var itemHtmlElement = document.createElement('li');
        itemHtmlElement.appendChild(document.createTextNode(item));
        itemsList.appendChild(itemHtmlElement);
    });

    listDiv.appendChild(itemsList);  

    return listDiv;
}

function addItemValidation(){
    for(i = 1;i<itemCount;i++){
        var elem = document.getElementById("textbox" + i);
        
        if(elem!=null && elem.value==""){
            alert("Item can not be empty");
            elem.style.border = "1px solid red";
            return false;
        }
    }    
    return true;   
}

function textboxChangecolor(){
    var eltem = document.getElementById(this.id);
    eltem.style.border = "1px solid black";
}









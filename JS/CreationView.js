var itemCount = 1;
var listCount = 1;
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
    var todoList = new TodoList(listCount++);  
    var title =  document.getElementById("todoListTitle").value;

    if(title == ""){
        //add alert box
        alert("Title can not be empty");
        return;
    }
    else{
        document.getElementById("todoListTitle").value= "";
    }

    // todoList.title = title
    todoList.setTitle(title);
    todoList.setStatus("active");

    for(i = 1;i<itemCount;i++){
        var elem = document.getElementById("textbox" + i);
        var item = new Item("itemId"+i);
        item.setTitle(elem.vaue);
        item.setStatus("pending");

        if(elem!=null){
           todoList.items.push(elem.value);
           elem.value = "";
        }
    } 

    todoListArray.push(todoList);

    // For Displaying lists
    var todotitleListsHtmlComponent = rendertodoList(todoListArray);
    document.getElementById("todoList").innerHTML = '';
    document.getElementById("todoList").append(todotitleListsHtmlComponent);
}

function rendertodoList(todoListArray) {

    var todotitleListsHtmlComponent= document.createElement('div');

    todoListArray.forEach(todoList => {
        var todoitemListHtmlComponent= createListComponent(todoList)
        todotitleListsHtmlComponent.appendChild(todoitemListHtmlComponent);
    });

    return todotitleListsHtmlComponent;
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

class Item {
    constructor(id) {
      this.id = id;
      this.itemTitle = "";
      this.status = "pending";
    }

    setTitle(title){
        this.itemTitle = title;
    }

    setStatus(status){
        this.status = status;
    }
}


class TodoList {
    constructor(id) {
      this.id = id;
      this.listTitle = "";
      this.status = "active";
      this.itemList = [];
    }

    setTitle(title){
        this.itemTitle = title;
    }

    setStatus(status){
        this.status = status;
    }

    setItemList(list){
        this.ItemList  = list;
    }

    addItem(item){
        this.itemList.push(item);
    }
}
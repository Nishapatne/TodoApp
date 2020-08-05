var itemCount = 1;
var listCount = 1;
var shouldAddItem = true;
var isInEditMode = true;
var todoListArray = [];
var todoListjsonData = {};
todoListjsonData["lists"] = [];

function addNewItem(){
   
    if(!addItemValidation())
    {
        return;
    }
    // var outerDiv = document.getElementById("outerDiv")
    var outerdiv = $('#outerdiv');
    var newDiv = document.createElement("div");
    $(newDiv).addClass("newdivision");
    $(newDiv).attr("id","newdivision"+ itemCount);

    var newlabel = document.createElement("label");
    $(newlabel).attr("id","newlabel"+ itemCount);
    var indexCurrent = itemCount;
    var newCheckbox = document.createElement("input");
    newCheckbox.type = "checkbox";
    $(newCheckbox).addClass("checkbox");
    $(newCheckbox).attr("id","checkbox"+ itemCount);
    $(newCheckbox).on('click', function() 
        {
            checkboxevent(this,indexCurrent);
        }
    );

    if(isInEditMode)
    {
        var newTextBox = document.createElement("input");
        newTextBox.type = "textbox";
        $(newTextBox).addClass("textbox");
        $(newTextBox).attr("id","textbox"+ itemCount);
        $(newTextBox).on('change', function(){
        textboxchangecolor(this)})
    }

    else
    {
        // var textbox = document.createElement("label")
        var newTextBox =  document.createElement("Label");
        newTextBox.setAttribute("for",itemCount);
        newTextBox.innerHTML = "label Mode";
        $(newTextBox).addClass("labeltext");    
    }
    
    var trashImg = document.createElement("IMG");
    trashImg.setAttribute("src", "../Images/delete.png");
    trashImg.type = "IMG";
    $(trashImg).addClass("delImg")
    $(trashImg).attr("id","delImg"+itemCount);
    $(trashImg).on('click', function()
        {
            removediv(this);
        }
    )

    itemCount++;
    newlabel.appendChild(newCheckbox);
    newlabel.appendChild(newTextBox);
    newlabel.appendChild(trashImg);

    newDiv.appendChild(newlabel);
    outerDiv.appendChild(newDiv);
}


function checkboxevent(elem,indexCurrent)
{
    // var id = $(elem).attr("id");
    // var newcheckBox = $('#'+id);
    var newtextBox = $("#textbox"+indexCurrent);
    $(newtextBox).toggleClass("checkBoxaction");     
}

function removediv(elem)
{
    elem.parentNode.parentNode.removeChild(elem.parentNode);
}

function submit()
{
    var todoList = new TodoList(listCount++);  
    // var title =  document.getElementById("todoListTitle").value;
    var title =  $("#todoListTitle").val();

    if(title == "")
    {
        alert("Title can not be empty");
        return;
    }
    else
    {
        $("#todoListTitle").val("");
    }

    // todoList.title = title
    todoList.setTitle(title);

    var list = {"title":title,"items":[]};    
    todoList.setStatus("Active");

    for(i = 1;i<itemCount;i++){
        var elem1 = $("#" +i);
        var elem = $("#textbox" + i);
       
        if(elem!=null)
        {
            var item = new Item("itemId"+ i);
            var checkBox = $("#"+i);

            if(checkBox.is (":checked"))
            {
            // if(    $('#' + i).is(":checked")){ 
            item.setStatus("Completed");
            }
            else
            {
                item.setStatus("Pending");
            }

            item.setTitle(elem.val());
            list["items"].push({"item":item.getTitle(),
                                "status":item.getStatus()});


           todoList.addItem(item);
           elem1. prop("checked", false);
           elem.val("");
            //removediv($("#newdivision" + i));
            removediv(document.getElementById('newlabel'+i));
        }
    }

    todoListjsonData["lists"].push(list);
    todoListArray.push(todoList);

    // For Displaying lists
    var todotitleListsHtmlComponent = rendertodoListUsingTemplate(todoListArray);
    // document.getElementById("todoList").innerHTML = '';
    $("#todoList").val('');
    // document.getElementById("todoList").append(todotitleListsHtmlComponent);
    $("#todoList").append(todotitleListsHtmlComponent);
    itemCount = 1;
}

function rendertodoList(todoListArray) 
{
    var todotitleListsHtmlComponent= document.createElement('div');
    todoListArray.forEach(todoList => {
        var todoitemListHtmlComponent= createListComponent(todoList)
        todotitleListsHtmlComponent.appendChild(todoitemListHtmlComponent);
    });
    return todotitleListsHtmlComponent;
}

function rendertodoListUsingTemplate() {

  var template = document.getElementById('template').innerHTML;

  //Compile the template
  var compiled_template_funtion = Handlebars.compile(template);

  //Render the data into the template
  var htmlDynamicContent = compiled_template_funtion(todoListjsonData);

  //Overwrite the contents of #target with the renderer HTML
  document.getElementById('target').innerHTML = htmlDynamicContent;
}

function createListComponent(todoList) {

    var listDiv = document.createElement('div');
    var listTitle = document.createElement('h2');
    var title = document.createTextNode("( Status:"+todoList.getStatus()+") "+ todoList.getTitle());  // Set Title of List 1
    listTitle.appendChild(title);  // Append Title to header
    listDiv.appendChild(listTitle);  //Append header to list div

   
    var itemsList = document.createElement('ul'); //create list for items
    var list = todoList.getItemList();
    list.forEach(item => {

        var itemHtmlElement = document.createElement('li');
        //@nisha try to create seperate column for status
        itemHtmlElement.appendChild(document.createTextNode("( Status:"+item.getStatus()+") "+ item.getTitle()));
        itemsList.appendChild(itemHtmlElement);
    });

    listDiv.appendChild(itemsList);  

    return listDiv;
}

function addItemValidation()
{
    for(i = 1;i<itemCount;i++)
    {
        var elem = $("#textbox" + i);
       
        if(elem!=null && elem.val()=="")
        {
            alert("Item can not be empty");
            $(elem).addClass("textboxbordercolor") ;
            return false;
                
        }
        else
        {
            $(elem).addClass("textboxbordercolorNew") ;
        }
    }    
    return true;  
}

// $(newtextBox).toggleClass("checkBoxaction");  
// let design = {
//     border: "1px solid black"
// }

function textboxchangecolor(elem)
{
    var id = $(elem).attr("id");
    var textboxcolor = $('#' + id);
    $(textboxcolor).addClass("headboxbordercolor");
}

class Item 
{
    constructor(id) 
    {
      this.id = id;
      this.itemTitle = "";
      this.status = "Pending";
    }

    setTitle(title)
    {
        this.itemTitle = title;
    }

    setStatus(status)
    {
        this.status = status;
    }

    getTitle()
    {
       return  this.itemTitle;
    }

    getStatus()
    {
        return this.status;
    }
}


class TodoList 
{
    constructor(id) 
    {
      this.id = id;
      this.listTitle = "";
      this.status = "Active";
      this.itemList = [];
    }

    setTitle(title)
    {
        this.itemTitle = title;
    }

    setStatus(status)
    {
        this.status = status;
    }

    setItemList(list)
    {
        this.ItemList  = list;
    }

    addItem(item)
    {
        this.itemList.push(item);
    }

    getTitle()
    {
        return this.itemTitle;
    }

    getStatus()
    {
        return this.status;
    }

    getItemList()
    {
        return this.itemList;
    }
}
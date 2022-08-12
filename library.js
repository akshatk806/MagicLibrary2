add();
class Book{
    constructor(name,author,type){
        this.name=name;
        this.author=author;
        this.type=type;
    }
}

// Make the add function outside the class to solve the reloading problem
function add(){
    let data=localStorage.getItem('data');
    // console.log(data);
    if(data==null){
        dataObj=[]
    }
    else{
        dataObj=JSON.parse(data);
    }   
    let html="";
    dataObj.forEach((element,index) => {
        html+=`<tr>
                <td>${element.name}</td>
                <td>${element.author}</td>
                <td>${element.type}</td>
                <td><button type="button" id="${index}" onclick="deleteBook(this.id)" class="btn btn-danger" style="font-size:0.87rem; width:4.7rem">Remove</button></td>
            </tr>`;
    });
    let tableBody=document.getElementById('tableBody')
    if(dataObj.length!=0){
        tableBody.innerHTML=html;
    }else{
        tableBody.innerHTML="";
    }
}

class Display{
    clear(){
        let librayForm=document.getElementById('form');
        librayForm.reset();
    }
    validate(book){
        if(book.name.length<2 || book.author.length<2){
            return false;
        }
        else{
            return true;
        }
    }
    showMsg(type,displayMsg){
        let message = document.getElementById('message');
        message.innerHTML=`
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            <strong>Message:</strong>${displayMsg}.
            <button type="button" id="close" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>`;
    }
}

// Add submit event listener to libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(event){
    let name=document.getElementById('bookName').value;
    let author=document.getElementById('author').value;
    let type;
    let programming=document.getElementById('programming');
    let fiction=document.getElementById('fiction');
    let cooking=document.getElementById('cooking');

    if(programming.checked){
        type=programming.value;
    }
    else if(fiction.checked){
        type=fiction.value;
    }
    else if(cooking.checked){
        type=cooking.value;
    }

    let book=new Book(name,author,type)
    console.log(book);

    let display=new Display();

    let data=localStorage.getItem('data');
    if(data==null){
        dataObj=[];
    }
    else{
        dataObj=JSON.parse(data);
    }
    let myObj={
        name:name,
        author:author,
        type:type
    }
    dataObj.push(myObj);
    localStorage.setItem('data',JSON.stringify(dataObj));
    name.value="";
    author.value="";
    type.value="";

    if(display.validate(book)){
        add();
        localStorage.setItem('Entries',JSON.stringify(book))
        alert("Your book has been added Successfully")
        display.clear();
    }
    else{
        display.showMsg('danger','Sorry you cannot add this book')
    }
    event.preventDefault();
}

function deleteBook(index){
    let confirmDlt=confirm("Are you want to delete this book");
    if(confirmDlt){
        let data=localStorage.getItem('data');
        if(data==null){
            dataObj=[]
        }else{
            dataObj=JSON.parse(data);
        }
        dataObj.splice(index,1);
        localStorage.setItem('data',JSON.stringify(dataObj));
        add();
    }
}

const inputElement = document.querySelector('#item-input');
const formElement = document.querySelector('#item-form');
const itemLists = document.querySelector('#item-list');
const clearBtn = document.querySelector('#clear');
const filterDiv = document.querySelector('.filter');
const filterItem = document.querySelector('.form-input-filter');
let addBtn = document.querySelector('.btn');
let editMode = false;


const newBtn = () =>
{
    const btnElement = document.createElement('button');
    const iconElement = document.createElement('i');
    btnElement.className = 'remove-item btn-link text-red';
    iconElement.className = 'fa-solid fa-xmark';
     btnElement.appendChild(iconElement);
     return btnElement;

}


const createNewLi = (content) =>
{
    const newLiElement = document.createElement('li');
    newLiElement.innerText = content;
    const btn = newBtn()
    newLiElement.appendChild(btn);
    itemLists.appendChild(newLiElement);

}


const addNewLiToDom = (e)=>
{   const userInput = inputElement.value;
    if (editMode === false) {
  //creating new li and adding it to DOM
    e.preventDefault();
     if (userInput) {
    createNewLi(userInput);
    inputElement.value = '';
    filterDiv.style.display = 'block';

    //add to local storage
    addItemstoLocalStorage(userInput);
    }
    else { alert('Invalid Selection.Please try again'); }
    
    
}

else { 
    e.preventDefault();
    const editLi = itemLists.querySelector('.edit')
     delItemsFromLocalStorage(editLi.textContent.trim());
     editLi.innerHTML = `${userInput}<button class="remove-item btn-link text-red"><i class="fa-solid fa-xmark"></i> </button>`
    inputElement.value = '';
    editMode = false;
    addBtn.classList.remove('button')
    addBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item'
    itemLists.querySelector('.edit').classList.remove('edit')
    addItemstoLocalStorage(userInput.trim())
}
}

    

const editItems= (e) =>{
    editMode = true;
    const items = itemLists.querySelectorAll('li');
     let targetList = e.target;
        if (targetList.tagName.toLocaleLowerCase() === 'li')
        {   
            items.forEach
            (
                (el)=>
            {   
                
                if (el.textContent === targetList.textContent) 
                {
                    
                targetList.className = 'edit';
                inputElement.value = e.target.textContent.trim();
                addBtn.textContent = 'Update';
                addBtn.classList.add('button');
                }
                else {
                    el.classList.remove('edit')    
                }

            }
            )
            addBtn.textContent = 'Update';
            addBtn.classList.add('button');
        }
    }
    
  


const deleteItems = (e) => {
        if (e.target.parentElement.className === 'remove-item btn-link text-red'){
        console.log('inside if')
        const text = e.target.parentElement.parentElement.textContent;
        
        e.target.parentElement.parentElement.remove();
        const items = document.querySelectorAll('ul li');
        
        delItemsFromLocalStorage(text.trim());
        if (items.length === 0){
            filterDiv.style.display = 'none';
        }
    
    }
}

const deleteAll = (e)=> {
    const items = document.querySelectorAll('ul li');
    items.forEach((item)=> item.remove());
    filterDiv.style.display = 'none'   
    localStorage.clear()
    editMode = false;
    addBtn.classList.remove('button');
    addBtn.innerHTML= '<i class="fa-solid fa-plus"></i> Add Item'
    inputElement.value = ''
}


const filter = (e) => {
    const filterInput = e.target.value.toLowerCase();
    const items = document.querySelectorAll('ul li');
    console.log(filterInput, items)
    items.forEach((item) =>{
        const itemText = item.textContent.toLocaleLowerCase();
        if  (!(itemText.includes(filterInput)) ) {
            item.style.display = 'none';

        }
        else item.style.display = 'flex';
    })
    
}


const addItemstoLocalStorage = (item) =>
 {
    let items = getItemsFromLocalStorage()
     items.push(item);
    items = JSON.stringify(items)
    localStorage.setItem('list', items)

}

const delItemsFromLocalStorage = (item)=> {
   let items = getItemsFromLocalStorage();
   
   items= items.filter((el)=> el !== item)
   localStorage.clear();
   items.forEach((el)=>
   addItemstoLocalStorage(el))
   localStorage.getItem('list');
}

const getItemsFromLocalStorage = () =>
{
    let items; 
    if (localStorage.getItem('list') === null){
        items = []
    }
    else {
        items = JSON.parse(localStorage.getItem('list')) }
    
     return items;

}

const displayItemsToDom  = (item) =>  {
    const items = getItemsFromLocalStorage();
    items.forEach((i)=>{
        createNewLi(i);
    })

    const itemstodisplay = document.querySelectorAll('ul li');
       
        if (itemstodisplay.length === 0){
            filterDiv.style.display = 'none';
        }

        else filterDiv.style.display = 'flex'

}


formElement.addEventListener('submit', addNewLiToDom);
itemLists.addEventListener('click', deleteItems);
clearBtn.addEventListener('click', deleteAll);
filterItem.addEventListener('input', filter);
document.addEventListener('DOMContentLoaded', displayItemsToDom);
itemLists.addEventListener('dblclick', editItems);






const rootNode = document.getElementById('root');
const list = document.getElementById('TODO_list');
const addInput = document.getElementById('add_input_text');
const modifyInput = document.getElementById('modify_input_text');
//pages
const ToDoBlock = document.getElementById('to_do');
const ToAddBlock = document.getElementById('to_add');
const ToModifyBlock = document.getElementById('to_modify');
//buttons
const addBtn = document.getElementById('add_btn');
const addSaveBtn = document.getElementById('add_save_btn');
const modifySaveBtn = document.getElementById('modify_save_btn');
const addDelBtn = document.getElementById('add_del_btn');
const modifyDelBtn = document.getElementById('modify_del_btn');

let modifiedLi;
let modifiedId;
const zero = 0;
// counter for generating a unique object id 
let count;
if (localStorage.getItem('count') === null){
  count=zero;
}else{
  count = localStorage.getItem('count');
}

//insert list from localStorage
let insertList = () => {
  if(localStorage.getItem('savedData') === null){
    console.log('чисто');
    let emptyList = document.createElement('p');
    emptyList.innerHTML = 'TODO is empty';
    emptyList.id = 'empty_list';
    ToDoBlock.appendChild(emptyList);
  }else{
    if (document.getElementById('empty_list') !== null){
      document.getElementById('empty_list').remove();
    }
    let objectArr = JSON.parse(localStorage.getItem('savedData'));

    const todoItems = [];
    for(let i = list.childNodes.length-1; i>=zero; i--){
      list.childNodes[i].remove();  
    }
    for (let value of objectArr) {
      todoItems.push(value);
      console.log(value);

      let li = document.createElement('LI');
      li.className = 'list_li';
      li.id = 'key_'+ value.id;
      let newCheckBtn = document.createElement('button');
      newCheckBtn.className = 'check_btn';
      let newCheckBtnIcon = document.createElement('img');
      if(value.isDone){
        newCheckBtnIcon.src = './assets/img/done-s.png';
      }else{
        newCheckBtnIcon.src = './assets/img/todo-s.png';
      }
      newCheckBtn.appendChild(newCheckBtnIcon);
      li.appendChild(newCheckBtn);

      let newLiInnerText = document.createElement('p');
      newLiInnerText.innerHTML = value.description;
      if(value.isDone){
        newLiInnerText.style.background = 'grey';
      }
      li.appendChild(newLiInnerText);

      let newDelBtn = document.createElement('button');
      newDelBtn.className = 'del_btn';
      let newDelBtnIcon = document.createElement('img');
      newDelBtnIcon.src = './assets/img/remove-s.jpg';
      newDelBtn.appendChild(newDelBtnIcon);
      li.appendChild(newDelBtn);
      list.appendChild(li);

      //change text of the item when it clicked
      newLiInnerText.onclick = () => {
        modifiedLi = li;
        modifiedId = value.id;
        location.hash = '/modify/'+modifiedId;
        modifyInput.value = value.description;

      };
      //change view of the CHECK button when it clicked
      newCheckBtn.onclick = () => {
        let id = li.id.split('_')[1];
        let objectArr = JSON.parse(localStorage.getItem('savedData'));
        let indexForMove;
        for(let i = 0; i < objectArr.length; i++){
          if (objectArr[i].id === Number(id)){
            indexForMove = i;
            objectArr[i].isDone = true;                   
          }
        }
        objectArr.move(indexForMove, objectArr.length-1);

        localStorage.setItem('savedData', JSON.stringify(objectArr));
        insertList();
      };
      //delete list item when DELETE button clicked
      newDelBtn.onclick = () => {
        let id = li.id.split('_')[1];
        let objectArr = JSON.parse(localStorage.getItem('savedData'));
        for(let i = 0; i < objectArr.length; i++){
          if (objectArr[i].id === Number(id)){
            objectArr.splice(i, 1);                     
          }
        }
        localStorage.setItem('savedData', JSON.stringify(objectArr));
        li.remove();
      };
    }
  } 
} 
//clicking save button on to_add page
addSaveBtn.onclick = () => {
  if (addInput.value === ''){
    addInput.style.borderColor = 'red';
  }else{
    addInput.style.borderColor = 'black';
    let listObJ = {
      isDone: false, 
      id: count++, 
      description: addInput.value
    }
    localStorage.setItem('count', count);
    let objectArr = JSON.parse(localStorage.getItem('savedData'));
    if (objectArr === null){
      objectArr = [];
    }
    objectArr.push(listObJ);
    localStorage.setItem('savedData', JSON.stringify(objectArr));
    addInput.value = '';
    insertList();
    location.hash = '';     
  }
}

modifySaveBtn.onclick = () => {
  if (modifyInput.value === ''){
    modifyInput.style.borderColor = 'red';
  }else{
    modifyInput.style.borderColor = 'black';
    let id = modifiedLi.id.split('_')[1];
    let objectArr = JSON.parse(localStorage.getItem('savedData'));
    for(let i = 0; i < objectArr.length; i++){
      if (objectArr[i].id === Number(id)){
        objectArr[i].description = modifyInput.value;
        console.log(modifyInput.value);                     
      }
    }
    localStorage.setItem('savedData', JSON.stringify(objectArr));
    insertList();
    location.hash = '';
  }
}

//insert list from localStorage when page reload
insertList();

// redirecting behind 3 pages
location.hash = '';
window.onhashchange = function(){
    if (location.hash === '#/add') {
        ToDoBlock.style.display = 'none';
        ToAddBlock.style.display = 'block';
        ToModifyBlock.style.display = 'none';
    }
    if (location.hash === '') {
        ToDoBlock.style.display = 'block';
        ToAddBlock.style.display = 'none';
        ToModifyBlock.style.display = 'none';
    }
    if (location.hash === '#/modify/'+modifiedId) {
        ToDoBlock.style.display = 'none';
        ToAddBlock.style.display = 'none';
        ToModifyBlock.style.display = 'block';
    }
}

addBtn.onclick = () => {
  location.hash = '/add';
}
addDelBtn.onclick = () => {
  location.hash = '';
}
modifyDelBtn.onclick = () => {
  location.hash = '';
}

Array.prototype.move = function (old_index, new_index) {
  if (new_index >= this.length) {
    let k = new_index - this.length;
    while (k-- + 1) {
      this.push(undefined);
    }
  }
  this.splice(new_index, zero, this.splice(old_index, 1)[zero]);
  return this;
};
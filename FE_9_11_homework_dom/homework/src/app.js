let rootNode = document.getElementById('root');
let inputText = document.getElementById('input_text');
let addBtn = document.getElementById('add_btn');
let list = document.getElementById('TODO_list');
//add item to list when ADD button clicked
addBtn.onclick = () => {
	if (inputText.value === ''){
		inputText.style.borderColor = 'red';
	}else{
		inputText.style.borderColor = 'black';
		createNewListItem(inputText.value);
		inputText.value = '';			
	}
}
//create list item with text and 2 buttons
const createNewListItem = text => {
	let li = document.createElement('LI');
	li.draggable = true;
	addEvListener(li);
	li.className = 'list_li';
	let newCheckBtn = document.createElement('button');
	newCheckBtn.className = 'check_btn';
	let newCheckBtnIcon = document.createElement('i');
	newCheckBtnIcon.className = 'material-icons';
	newCheckBtnIcon.innerHTML = 'check_box_outline_blank';
	newCheckBtn.appendChild(newCheckBtnIcon);
	li.appendChild(newCheckBtn);
	let newLiInnerText = document.createElement('p');
	newLiInnerText.innerHTML = text;
	li.appendChild(newLiInnerText);
	let newDelBtn = document.createElement('button');
	newDelBtn.className = 'del_btn';
	let newDelBtnIcon = document.createElement('i');
	newDelBtnIcon.className = 'material-icons';
	newDelBtnIcon.innerHTML = 'delete';
	newDelBtn.appendChild(newDelBtnIcon);
	li.appendChild(newDelBtn);
	list.appendChild(li);
	//change view of the CHECK button when it clicked
	newCheckBtn.onclick = () => {
		newCheckBtnIcon.innerHTML = 'check_box';
	};
	//delete list item when DELETE button clicked
	newDelBtn.onclick = () => {
		li.remove();
	};
}
//disabled input fild when list items number is more then 10
const maxListSize = 10;
list.addEventListener('DOMSubtreeModified', event => {
	if(list.childNodes.length <= maxListSize){
		inputText.disabled = false;
		addBtn.disabled = false;
		if (document.getElementById('max-list-size-massage') !== null){
			document.getElementById('max-list-size-massage').remove();
		}
	}else{
		inputText.disabled = true;
		addBtn.disabled = true;
		let maxListSizeMassage = document.createElement('h3');
		maxListSizeMassage.innerHTML = 'Maximum item per list are created';
		maxListSizeMassage.id = 'max-list-size-massage';
		let beforeElem = document.getElementById('input-flex');
		rootNode.insertBefore(maxListSizeMassage, beforeElem);
	}
});
//drag and drop items
let dragged = null;
const dragStart = event => {
	dragged = event.target;
	event.target.style.opacity = 0.4;
}
const dragEnd = event => {
	event.target.style.opacity = '';
}
const dragOver = event => {
	event.preventDefault();
}
const dragEnter = event => {
	if ('list_li' === event.target.className) {
		event.target.style['border'] = '2px dashed gray';
	}
}
const dragLeave = event => {
	event.target.style['border'] = '';
}
const dragDrop = event => {
	if ('list_li' === event.target.className) {
		event.target.style['border'] = '';
		list.insertBefore(dragged, event.target);
	}
}
const addEvListener = element => {
	element.addEventListener('dragover', dragOver);
	element.addEventListener('dragstart', dragStart);
	element.addEventListener('dragenter', dragEnter);
	element.addEventListener('drop', dragDrop);
	element.addEventListener('dragleave', dragLeave);
	element.addEventListener('dragend', dragEnd);
}
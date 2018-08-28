function findType(element){
	return typeof element;
}

function forEach(arr, func){
	for(let i = 0; i < arr.length; i++){
		arr[i]=func(arr[i]);
	}
}

function map(arr, func){
	forEach(arr, func);
	return arr;
}

function filter(arr, func){
	let newArr = [];
	forEach(arr, function(el){
		if (func(el)){
			newArr.push(el);
		}
	});
	return newArr;
}

function getAdultAppleLovers(dataArray){
	let arr = filter(dataArray, function(el){ 
		return el.age > 18 && el.favoriteFruit === 'apple'
	});
	return map(arr, function(el){
		return el.name
	});
}

function keys(obj){
	return Object.keys(obj);
}

function values(obj){
	let valuesArr = [];
	for (let prop in obj){
		if(obj.hasOwnProperty(prop)) {
			valuesArr.push(obj[prop]);
		}
	}
	return valuesArr;
}

function showFormattedDate(date){
	const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	return `It is ${date.getDate()} of ${monthArr[date.getMonth()]}, ${date.getFullYear()}`;
}
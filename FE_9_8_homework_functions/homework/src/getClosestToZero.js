function getClosestToZero(){
	let min = arguments[0];
	for (let i = 1; i < arguments.length; i++) {
		if (Math.abs(arguments[i])<Math.abs(min)){
			min = arguments[i];
		}
	}
	return min;
}
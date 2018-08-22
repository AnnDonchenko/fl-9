function reverseNumber(number){
	let n = Math.abs(number);
	let str = number<0 ? '-' : '';
	const divider = 10; // prefer not to use this const but because of validation
	while(n!==0){
		str = str + n%divider;
		n = Math.floor(n/divider);
	}
	return Number(str);
}
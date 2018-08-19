let a = Number(prompt('First side a ='));
let b = Number(prompt('Second side b ='));
let angle = prompt('α-angle =');
let c, square, p, perimeter, consol;
const flatAngle = 180;
if(a>0 && b>0 && angle>0){
	c = Math.sqrt(a*a+b*b-2*a*b*Math.cos(angle*Math.PI/flatAngle));
	perimeter = a+b+c;
	p = perimeter/2;
	square = Math.sqrt(p*(p-a)*(p-b)*(p-c));
	c = c.toFixed(2);
	perimeter = perimeter.toFixed(2);
	square = square.toFixed(2);
	if(c<=0 || square<=0 || perimeter<=0){
		consol='Invalid data';
	}else{
		consol='c length: '+c
			+'\nTriangle square: '+square
			+'\nTriangle perimeter: '+perimeter;
	}
}else{
	consol='Invalid data';
}
console.log(consol);

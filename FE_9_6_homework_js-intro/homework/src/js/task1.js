let price = prompt('Price =');
let discount = prompt('Discount =');
let priceWithDiscount, saved, consol;
if(price>=0 && discount>=0 && discount<=100){
	priceWithDiscount = price-price*discount/100;
	saved = price - priceWithDiscount;
	priceWithDiscount = priceWithDiscount.toFixed(2);
	saved = saved.toFixed(2);

	consol='Price without discount: '+price
		+'\nDiscount: '+discount+'%'
		+'\nPrice with discount: '+priceWithDiscount
		+'\nSaved: '+saved;
}else{
	consol='Invalid data';
}
console.log(consol);
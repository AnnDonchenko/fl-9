let log = prompt('your login:');
let reaction = '';
if(log==='' || log===null){
	reaction='Canceled.';
}else{
	if(log.length<4){
		reaction='I don\'t know any users having name length less than 4 symbols';
	}else{
		if (log==='User'){
			let pass = prompt('your password:');
			if(pass==='' || pass===null){
				reaction='Canceled.';
			}else{
				if(pass==='SuperUser'){
					let hours = new Date().getHours();
					reaction = hours<20 ? 'Good day!' : 'Good evening!';
				}else{
					reaction='Wrong password';
				}
			}
		}else{
			reaction='I don’t know you';
		}
	}
}
alert(reaction);
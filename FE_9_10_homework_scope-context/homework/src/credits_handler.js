function userCard(userNumber){
	let key = userNumber,
		balance = 100,
		historyLogs = [],
		transactionLimit;

	function getCardOptions(){
		console.log({
			key: key,
			balance: balance,
			transactionLimit: transactionLimit,
			historyLogs
		});
	}

	function putCredits(credits){
		balance += credits;
		historyLogs.push({
			operationType: 'Resived credits',
			credits: credits,
			operationTime: new Date().toLocaleString('en-GB')
		});
	}

	function takeCredits(credits){
		if (balance >= credits && transactionLimit >= credits){
			balance -= credits;
			historyLogs.push({
				operationType: 'Withdrawal of credts',
				credits: credits,
				operationTime: new Date().toLocaleString('en-GB')
			});
		}else{
			console.log('Sorry, card balance or transaction limit is not enough to conduct "Take Credits" operation');
		}
	}

	function setTransactionLimit(credits){
		transactionLimit = credits;
		historyLogs.push({
			operationType: 'Transaction limit change',
			credits: credits,
			operationTime: new Date().toLocaleString('en-GB')
		});
	}

	function transferCredits(credits, card){
		const taxes = 0.5,
			persent100 = 100;
		let creditsWithTax = credits + credits*taxes/persent100;
		if (balance >= creditsWithTax && transactionLimit >= creditsWithTax){
			this.takeCredits(creditsWithTax);
			card.putCredits(credits);
		}else{
			console.log('Sorry, card balance or transaction limit is not enough to conduct "Transfer" operation');
		}
	}

	return{
		getCardOptions,
		putCredits,
		takeCredits,
		setTransactionLimit,
		transferCredits
	}
}

class UserAccount {
	constructor(name) {
		this.name = name;
		this.cards = [];
		this.maxNumberOfCards = 3;
	}

	addCard() {
		if (this.cards.length < this.maxNumberOfCards) {
			this.cards.push(userCard(this.cards.length + 1));
		} else {
			console.log('error');
		}
	}

	getCardByKey(key) {
		return this.cards[key - 1];
	}
}
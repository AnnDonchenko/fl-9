const gameTemplate = (maxRangeNumber, attemptsLeft, totalPrize, currentPrize) => `
	Enter a number from 0 to ${maxRangeNumber}
	Attempts left: ${attemptsLeft}
	Total prize: ${totalPrize}$
	Possible prize on current attempt: ${currentPrize}$`;

let continueGame = true;
let start = confirm('Do you want to play a game?');
const MaxAttempt = 3;
const constMaxRangeNumber = 5;
const constMaxPrizeForAttempt = 10;
const constPrize = 0;
let maxRangeNumber = constMaxRangeNumber;
let maxPrizeForAttempt = constMaxPrizeForAttempt;
let prize = constPrize;
const multiplierMaxRangeNumber = 2;
const multiplierMaxPrizeForAttempt = 3;
const one = 1;
if(!start){
		alert('You did not become a millionaire, but can.');
}else{
		let prizeForAttempt = maxPrizeForAttempt;
	while(continueGame){
		let guessingNumber = randomNumber(maxRangeNumber);
		let userNumber = 0;
		for (let attempt = 1; attempt<=MaxAttempt; attempt++){
			const userInput = prompt(
                gameTemplate(
                    maxRangeNumber,
                    MaxAttempt - attempt + one,
                    prize,
                    prizeForAttempt
                )
            );
			if(isNaN(userInput) || userInput===null){
				continueGame = false;
				maxRangeNumber = constMaxRangeNumber;
				maxPrizeForAttempt = constMaxPrizeForAttempt;				
				break;
			}else{
				userNumber = Number(userInput);
				if(userNumber === guessingNumber ){
					prize += prizeForAttempt;		
					continueGame = confirm('Congratulation! Your prize is: ' + prize + '\nDo you want to continue?');
					if(!continueGame) {					
						break;
					}
					maxRangeNumber *= multiplierMaxRangeNumber;
					maxPrizeForAttempt *= multiplierMaxPrizeForAttempt;
					prizeForAttempt = maxPrizeForAttempt;
					break;
				}else{
					continueGame = false;
					prizeForAttempt = Math.floor(prizeForAttempt/2)
				}
			}		
		}	
		if (prize === 0 || prizeForAttempt === 0 || !continueGame){			
			alert('Thank you for a game. Your prize is: ' + prize);
			continueGame = confirm('Do you want to play a game again?');
			maxRangeNumber = constMaxRangeNumber;
			maxPrizeForAttempt = constMaxPrizeForAttempt;
			prize = 0;
		}
	}
}
function randomNumber(maxRangeNumber) {
    return Math.floor(Math.random() * ++maxRangeNumber);
}
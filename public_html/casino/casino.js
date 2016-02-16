//$functions
function headOrTails(selection) {
	if (coin) return;
	var bet = parseInt(hotBet.value);

	console.log(casino.tokens-bet);
	if (!bet || bet < 1) {
		notification(translate('La apuesta mínima es de 1 ficha.|The minimum bet is 1 token.'));
		return;
	}
	if (casino.tokens < bet) {
		notification(translate('No tienes suficientes fichas.|You have no tokens available.'));
		hotText.innerHTML = msg;
		return 0;
	}
	casino.tokens -= bet;
	coin = true;
	var hot = setTimeout(function() {headOrTailsEnd(selection, bet)}, COIN_ANIMATION_TIME);
}
function headOrTailsEnd(selection, bet) {
	var win = 0;
	var flip = rand(0,1000);
	if (!flip) {
		hotCoin.innerHTML = '|';
		notification(translate('¡Ha caído de lado!|The coin is on the edge!'));
		win = 0;
	}
	else {
		if (flip > 500) {
			hotCoin.innerHTML = '(H)';
			var msg = translate('¡Cara!|Heads!');
			if (selection == 0) win = 1;
		}
		else {
			hotCoin.innerHTML = '(T)';
			var msg = translate('¡Cruz!|Tails!');
			if (selection == 1) win = 1;
		}
	}
	if (win == 1) {
		var bef = casino.tokens;
		casino.tokens = casino.tokens + (bet * 2);
		var bef = casino.tokens-bef;
		notification(translate('Has ganado |You win ')+bef+translate(' fichas| tokens'));
	}
	else {
		notification(translate('Has perdido...|You lose...'));
	}
	coin = false;
}

function upd() {
	var toks = translate('fichas|tokens');
	tokens.innerHTML = translate('Fichas|Tokens')+': '+shortNum(casino.tokens);
	moneys.innerHTML = translate('Dinero|Money')+': '+shortNum(casino.moneys)+'ç';
	
	doc('bank').style.display = (casino.bank) ? 'block' : 'none';
	doc('nobank').style.display = (casino.bank) ? 'none' : 'block';

	tokenPriceBuy.innerHTML = shortNum(Math.floor(tokenBuy.value) * 10)+'ç';
	tokenPriceSell.innerHTML = shortNum(Math.floor(tokenSell.value) * 10)+'ç';

	accountBalance.innerHTML = translate('Balance de la cuenta: <br>|Account balance: <br>')+' '+shortNum(casino.savings)+'ç';

	withdrawMessage.innerHTML = (casino.savings < parseInt(bankWithdraw.value)) ? 'No funds' : '';
	depositMessage.innerHTML = (casino.moneys < parseInt(bankDeposit.value)) ? 'No funds' : '';

	var irate = INTEREST_RATE_HOURLY/3600;
	var iratept = irate/1000;
	var gain = casino.savings * iratept;
	casino.interest += gain;
	if (casino.interest >= 1) {
		var amm = Math.floor(casino.interest);
		casino.savings += amm;
		casino.interest -= amm;
	}
	if (casino.banca <= 0) casino.banca = 1;

	accountInterest.innerHTML = casino.interest+'<br> ('+gain+'/s)';

	noloan.style.display = (casino.loan) ? 'none' : 'block';
	yesloan.style.display = (casino.loan) ? 'block' : 'none';

	//Loan related
	casino.loanSeconds -= 0.1;
	loanLeft.innerHTML = loanMessage();
	latePaymentLoan();
	loanInfo.innerHTML = translate('Puedes pedir un crédito máximo de |You can request a maximum credit of ')+shortNum(maxLoan())+'ç';

	//Lottery
	var l = translate('Tiempo para el próximo premio: |Time left until the next prize: ');
	l += (casino.lottery / 10)+'\n';

	l += translate('Tiempo para el MegaPremio: |Time left until the MegaPrize: ');
	l += duration(casino.lottery_big * 100)+'\n';

	l += translate('Tiempo para el GigaPremio: |Time left until the GigaPrize: ');
	l += duration(casino.lottery_huge * 100)+'\n';

	pastPrizes.innerHTML = l;

	var yht = '';
	yht += translate(STRINGS['yohave'])+' '+casino.lotteryTickets+' '+translate(STRINGS['lotickets'])+'<br>';
	yht += translate(STRINGS['yohave'])+' '+casino.lotteryTicketsBig+' '+translate(STRINGS['lotickets'])+' '+translate(STRINGS['mprize'])+'<br>';
	yht += translate(STRINGS['yohave'])+' '+casino.lotteryTicketsHuge+' '+translate(STRINGS['lotickets'])+' '+translate(STRINGS['gprize'])+'<br>';
	youHaveTickets.innerHTML = yht;

	banca.innerHTML = shortNum(casino.banca)+'ç';

	tickLottery();
	pastPrizes.innerHTML += '<br><br><b>'+translate('Fichas totales ganadas jugando a la lotería: '+shortNum(casino.records.lottery)+'|Total tokens won playing lottery: '+shortNum(casino.records.lottery))+'</b>';

	var prices = {
		'generic': PRICE_PER_LOTTERY_TICKET,
		'big': PRICE_PER_LOTTERY_TICKET_BIG,
		'huge': PRICE_PER_LOTTERY_TICKET_HUGE
	};
	var pricept = prices[getLotteryChoice()];
	var pric = translate('Precio|Price')+': '+shortNum(lottoAmt.value * pricept);
	lottoButton.value = translate('Comprar|Buy')+' ('+pric+' '+toks+')';
	if (!lottoAmt.value || lottoAmt.value < 1) lottoButton.value = 'Error';

	bancaGrowth();
	slotMachineUpdate();

	//Steal
	if (casino.ban <= 0) $('#banned').fadeOut(2000);
	if (casino.ban > 0) {
		timeleftgame.innerHTML = spree;
		timeleft.innerHTML = translate('Has sido expulsado del casino.<br>Por favor vuelve en |You are banned from the casino.<br>Please come back in ');
		timeleft.innerHTML += duration(casino.ban);

		casino.ban -= 100;
		//banned.style.display = 'block';
		if (banned.style.display != 'none') {
			$('#banned').fadeIn(2000);
		}
	}
	if (spree > 1) {
		spree -= 0.01;
		if (spree < 1) spree = 1;
	}
	if (casino.stealPenalty > 0) {
		$('#stealerPenalty').fadeIn();
		stealerPenalty.innerHTML = translate('Vuelve a intentarlo en |Try again in ')+shortNum(casino.stealPenalty)+'s';
		$('#stealButton').fadeOut();
		casino.stealPenalty -= 0.1;
	}
	else {
		$('#stealerPenalty').fadeOut();
		$('#stealButton').fadeIn();
	}

	translations();
	checkVersion();

	//Coin
	if (coin) {
		hotCoin.innerHTML = COINS[0];
		COINS[COINS.length-1] = COINS.splice(0, 1)[0];
	}

	//Cards
	var m = (52+16) - parseInt(cardDeck.length);
	hol_deck_firstcard.style.top = m+'px';
	holClickHi.value = translate(STRINGS['higher']);
	holClickLo.value = translate(STRINGS['lower']);
	holClickPlay.value = translate(STRINGS['playagain']);

	if (tonMode) {
		holBet.value = casino.tokens;
		hol_bet.style.display = 'none';
		hol_giveup.style.display = 'block';
	}
	if (!tonMode) {
		hol_bet.style.display = 'block';
		hol_giveup.style.display = 'none';
	}
	hol_giveup.innerHTML = translate('Abandonar|Give up');
	if (rand(1,100) == 1) {
		fortextBack.style.opacity = 1;
		var ftb = setTimeout(function() {fortextBack.style.opacity = 0;}, 1000);
	}
	updateWQ();
}
function repayLoan() {
	var qty = parseInt(loanRepay.value);
	if (casino.moneys < qty || !qty) {
		notification(translate('No tienes tanto dinero.|You don\'t have enough money.'));
		return;
	}
	if (qty > casino.loan) qty = casino.loan;
	changeMoneys(qty);
	casino.loan -= qty;
	if (!casino.loan) {
		notification(translate('¡Has salido de tu deuda con el banco!|You ran out of debt with the bank!'));
	}
}
function latePaymentLoan() {
	if (casino.loanSeconds <= 0) {
		casino.loanSeconds = 3600;
		casino.loan *= 1.01;
		var qty = shortNum(casino.loan);
		var es = 'La cantidad a pagar de tu pŕestamo ha aumentado a '+qty+' por impago.';
		var en = 'The ammount of your loan have increased to '+qty+' because of late payment.';
		notification(translate(es+'|'+en));
	}
}
function loanMessage() {
	var qty = shortNum(casino.loan);
	var days = duration(casino.loanSeconds * 1000);

	var msg = translate('Tienes '+qty+'ç por pagar de tu préstamo.|You still have to pay ç'+qty+' from your loan.');
	msg += '<br>';
	msg += translate('Tiempo restante: |Time left: ');
	msg += days;
	return msg;
}
function show(docm) {
	var docs = ['gameHot', 'gameBank', 'gameLottery', 'gameSlot', 'gameBlackJack', 'gameHoL'];
	for (var x in docs) document.getElementById(docs[x]).style.display = 'none';
	document.getElementById(docm).style.display = 'block';
}
function loadGame() {
	//Load Variables
	casino = JSON.parse(localStorage.getItem('casino'));
	//Empty Variables
	if (!casino) casino = {};
	if (!casino.tokens) casino.tokens = 1000;
	if (!casino.moneys) casino.moneys = 1000;
	if (!casino.savings) casino.savings = 0;
	if (!casino.interest) casino.interest = 0;
	if (!casino.loan) casino.loan = 0;
	if (!casino.lotteryTickets) casino.lotteryTickets = 0;
	if (!casino.lotteryTicketsBig) casino.lotteryTicketsBig = 0;
	if (!casino.lotteryTicketsHuge) casino.lotteryTicketsHuge = 0;

	if (!casino.lottery) casino.lottery = LOTTERY_TIME;
	if (!casino.lottery) casino.lottery_big = LOTTERY_TIME_BIG;
	if (!casino.lottery) casino.lottery_huge = LOTTERY_TIME_HUGE;

	if (!casino.banca) casino.banca = 10000;
	if (!casino.ban) casino.ban = 0;
	if (!casino.version) casino.version = '0';
	if (!casino.stealPenalty) casino.stealPenalty = 0;
	if (!casino.holPhase) casino.holPhase = 0;
	if (!casino.records) casino.records = {};
	if (!casino.records.lottery) casino.records.lottery = 0;
	if (!casino.records.moneyMade) casino.records.moneyMade = 0;

	if (!casino.wait) casino.wait = {};
	if (!casino.wait.money) casino.wait.money = 0;
	if (!casino.wait.character) {
		casino.wait.character = {
			'level': 1,
			'seconds': 0,
			'secondsx': 0,
			'experience': 0,
			'sec': rand(40,160),
			'atk': rand(40,160),
			'def': rand(40,160),
			'bonus_sec': 0,
			'bonus_atk': 0,
			'bonus_def': 0
		};
		casino.wait.character.seconds = getStats(casino.wait.character)[0];
	}
	if (!casino.wait.turn) casino.wait.turn = false;
	if (!casino.wait.nextHeal) casino.wait.nextHeal = 0;
}
function saveGame() {
	localStorage.setItem('casino', JSON.stringify(casino));
	notification('Game Saved');
}
function openAccount() {
	if (casino.moneys < ACCOUNT_OPENING_FEE) {
		notification(translate('Necesitas '+shortNum(ACCOUNT_OPENING_FEE)+'ç para abrir una cuenta de ahorros.|You need ç'+shortNum(ACCOUNT_OPENING_FEE)+' to open a savings account.'));
		return;
	}
	if (casino.bank) {
		notification(translate('Ya tienes una cuenta de ahorros|You already have a savings acconut'));
		return;
	}
	casino.bank = true;
	changeMoneys(ACCOUNT_OPENING_FEE);
	notification(translate('Has abierto tu caja de ahorros con éxito|You sucessfully opened a savings account'));
}
function buyTokens() {
	var qty = Math.floor(tokenBuy.value);
	var price = Math.floor(qty * 10);
	if (!price) {
		notification(translate('Error: Introduce un valor mayor que 1|Error: Insert a value higher than 1'));
		return;
	}
	if (casino.moneys < price) {
		notification(translate('Necesitas '+shortNum(price)+'ç para comprar esa cantidad de fichas.|You need '+shortNum(price)+'ç to buy such high ammount of tokens.'));
		return;
	}
	changeMoneys(price);
	casino.tokens += qty;
	var name = translate('ficha|token');
	if (qty != 1) name += 's';
	notification(translate('Has comprado '+shortNum(qty)+' '+name+'.|You have bought '+shortNum(qty)+' '+name+'.'));
}
function sellTokens() {
	var qty = Math.floor(tokenSell.value);
	var price = Math.floor(qty*10);
	if (!price) {
		notification(translate('Error: Introduce un valor mayor que 1|Error: Insert a value higher than 1'));
		return;
	}
	if (casino.tokens < qty) {
		notification(translate('No tienes suficientes fichas.|You don\' have enough tokens.'));
		return;
	}
	changeMoneys(price, 1);
	casino.tokens -= qty;
	var name = translate('ficha|token');
	if (qty != 1) name += 's';
	notification(translate('Has vendido '+shortNum(qty)+' '+name+'.|You have sold '+shortNum(qty)+' '+name+'.'));
}
function withdrawMoney() {
	var qty = parseInt(bankWithdraw.value);
	if (!casino.savings) {
		notification(translate('No hay fondos en la cuenta|There are no funds in your account'));
		return;
	}
	if (casino.savings < qty) {
		notification(translate('Introduce un importe igual o mayor a '+shortNum(casino.savings)+'ç|Introduce an ammount higher or equal than ç'+shortNum(casino.savings)));
		return;
	}
	if (!qty || qty <= 0) {
		notification(translate('Cantidad no válida.|Invalid amount.'));
		return;
	}
	casino.savings -= qty;
	casino.moneys += qty;
	notification(translate('Has retirado '+shortNum(qty)+'ç|You withdrew ç'+shortNum(qty)));
}
function depositMoney() {
	var qty = parseInt(bankDeposit.value);
	if (!casino.moneys) {
		notification(translate('No tienes dinero|You have no money'));
		return;
	}
	if (casino.moneys < qty) {
		notification(translate('Introduce un importe igual o mayor a '+shortNum(casino.moneys)+'ç|Introduce an ammount higher or equal than ç'+shortNum(casino.moneys)));
		return;
	}
	if (!qty || qty <= 0) {
		notification(translate('Cantidad no válida.|Invalid amount.'));
		return;
	}
	casino.savings += qty;
	casino.moneys -= qty;
	notification(translate('Has depositado '+shortNum(qty)+'ç|You deposit ç'+shortNum(qty)));
}
function shortNum(num) {
	//Short num variant v2.0
	var n = num;
	n = Math.floor(n*100)/100;
	return numPoints(n);
}
function numPoints(num) {
	//Numpoints Variant
	var n = String(num);
	var decs = "";
	if (n.match(/\./) != null) {
		var decs = n.split('.');
		decs = decs[decs.length-1];
		decs = '.'+decs;
	}
	n = Math.floor(Number(n));
	n = String(n);
	if (n.length > 3) {
		var zeros = 0;
		while (n.length % 3 != 0) {
			n = '0'+n;
			zeros++;
		}
		n = n.split("");
		var l = "";
		for (i = 0; i < n.length; i++) {
			l+=n[i];
			if ((i+1) % 3 == 0 && (i+1) != n.length) l+=',';
		}
		n = l.substring(zeros);
	}
	return n+decs;
}
function requestLoan(peek) {
	var qty = parseInt(loanAmount.value);
	var days = parseInt(maxTime.value);
	var interestPerHour = qty * 0.01;
	var due = Math.floor(qty + (days * interestPerHour));
	if (peek) {
		return shortNum(due);
	}


	if (qty < 1 || qty > maxLoan()) {
		notification(translate('Introduce un valor entre 1 y '+shortNum(maxLoan())+'|Introduce a value between 1 and '+shortNum(maxLoan())));
		return;
	}
	casino.loan = due;
	var realDays = days;
	casino.loanSeconds = 3600 * realDays;
	changeMoneys(qty, 1);
	notification(translate('Has pedido un préstamo. Tendrás que devolver '+shortNum(qty * days)+' en '+realDays+' horas.|You requested a loan. You have to return '+shortNum(qty * days)+' in '+realDays+' hours.'));
}
function lotteryNum(number) {
	var num = String(number);
	while (num.length < 5) num = '0'+num;
	return num;
}
function getLotteryChoice() {
	return $('input[name="lotteryType"]:checked').val();
}
function getLotteryTicket(qty) {
	var type = getLotteryChoice();
	var basePrice = PRICE_PER_LOTTERY_TICKET;
	if (type == 'big') basePrice = PRICE_PER_LOTTERY_TICKET_BIG;
	if (type == 'huge') basePrice = PRICE_PER_LOTTERY_TICKET_HUGE;

	var qty = qty || 1;
	if (qty == 'custom') qty = parseInt(lottoAmt.value);
	var price = basePrice * qty;
	if (!qty || qty < 1) {
		notification(translate('La cantidad no puede ser menor a cero.|The amount cannot be less than zero.'));
		return;
	}
	if (casino.tokens < price) {
		notification(translate('Necesitas '+price+' fichas para comprar un billete.|You need '+price+' tokens to buy a ticket.'));
		return;
	}
	casino.tokens -= price;

	if (type == 'generic') casino.lotteryTickets += qty;
	if (type == 'big') casino.lotteryTicketsBig += qty;
	if (type == 'huge') casino.lotteryTicketsHuge += qty;
}
function tickLottery() {
	casino.lottery -= 1;
	casino.lottery_big -= 1;
	casino.lottery_huge -= 1;


	if (casino.lottery_huge <= 0) {
		var lots = casino.lotteryTicketsHuge;
		casino.lottery_huge = LOTTERY_TIME_HUGE;
		var prizes = LOTTERY_PRIZES_HUGE;
		var chances = LOTTERY_CHANCES_HUGE;

		var name = [translate('Cuarto Premio|Fourth Prize'), 
		translate('Tercer Premio|Third Prize'), 
		translate('Segundo Premio|Second Prize'), 
		translate('Primer Premio|First Prize')];

		var myPrizes = [0, 0, 0, 0, 0, 0];
		var total = 0;
		for (var r = 3; r > 0; r--) {
			for (var c = 0; c < casino.lotteryTicketsHuge; c++) {
				if (!rand(0,chances[r])) {
					casino.lotteryTicketsHuge--;
					myPrizes[r]++;
				}
			}
			//Prizes
			if (myPrizes[r]) {
				var prize = myPrizes[r] * prizes[r];
				yourTicketsBig.innerHTML += '<br>'+translate('[GigaPremio] '+myPrizes[r]+' billetes fueron premiados con el '+name[r]+', por un total de '+shortNum(prize)+' fichas|[GigaPrize]'+myPrizes[r]+' tickets were prized with '+name[r]+' with a total of '+shortNum(prize)+' tokens.');
				casino.tokens += prize;
				total += prize;
			}
		}
		casino.records.lottery += total;
		var tokensBalance = shortNum(total)+' - '+shortNum((lots*1500))+' = '+shortNum((total-(lots*1500)));
		yourTicketsBig.innerHTML += '<br><br>'+translate('Fichas totales ganadas: '+tokensBalance+'|Total tokens won: '+tokensBalance);
		casino.lotteryTicketsHuge = 0;
	}
	if (casino.lottery_big <= 0) {
		var lots = casino.lotteryTicketsBig;
		casino.lottery_big = LOTTERY_TIME_BIG;
		var prizes = LOTTERY_PRIZES_BIG;
		var chances = LOTTERY_CHANCES_BIG;

		var name = [translate('Quinto Premio|Fifth Prize'), 
		translate('Cuarto Premio|Fourth Prize'), 
		translate('Tercer Premio|Third Prize'), 
		translate('Segundo Premio|Second Prize'), 
		translate('Primer Premio|First Prize')];

		var myPrizes = [0, 0, 0, 0, 0, 0];
		var total = 0;
		for (var r = 4; r > 0; r--) {
			for (var c = 0; c < casino.lotteryTicketsBig; c++) {
				if (!rand(0,chances[r])) {
					casino.lotteryTicketsBig--;
					myPrizes[r]++;
				}
			}
			//Prizes
			if (myPrizes[r]) {
				var prize = myPrizes[r] * prizes[r];
				yourTicketsBig.innerHTML += '<br>'+translate('[MegaPremio] '+myPrizes[r]+' billetes fueron premiados con el '+name[r]+', por un total de '+shortNum(prize)+' fichas|[MegaPrize]'+myPrizes[r]+' tickets were prized with '+name[r]+' with a total of '+shortNum(prize)+' tokens.');
				casino.tokens += prize;
				total += prize;
			}
		}
		casino.records.lottery += total;
		var tokensBalance = shortNum(total)+' - '+shortNum((lots*60))+' = '+shortNum((total-(lots*60)));
		yourTicketsBig.innerHTML += '<br><br>'+translate('Fichas totales ganadas: '+tokensBalance+'|Total tokens won: '+tokensBalance);
		casino.lotteryTicketsBig = 0;
	}
	if (casino.lottery <= 0) {
		var lots = casino.lotteryTickets;
		casino.lottery = LOTTERY_TIME;
		var prizes = LOTTERY_PRIZES;
		var chances = LOTTERY_CHANCES;

		var myPrizes = [0, 0, 0, 0, 0, 0];
		for (var r = 5; r > 0; r--) {
			for (var c = 0; c < casino.lotteryTickets; c++) {
				if (!rand(0,chances[r])) {
					casino.lotteryTickets--;
					myPrizes[r]++;
				}
			}
		}
		var total = 0;
		yourTickets.innerHTML = '';
		if (myPrizes[5]) {
			var prize = myPrizes[5] * prizes[5];
			notification(translate('¡JACKPOT! ¡Hay '+myPrizes[5]+' billetes premiados con un total de '+shortNum(prize)+' fichas!|JACKPOT! There are '+myPrizes[5]+' tickets prized with a total of '+shortNum(prize)+' tokens!'));
			yourTickets.innerHTML += '<br>'+translate(''+myPrizes[5]+' billetes fueron premiados con Jackpot, por un total de '+shortNum(prize)+' fichas|'+myPrizes[5]+' tickets were prized with Jackpot with a total of '+shortNum(prize)+' tokens.');
			casino.tokens += prize;
			total += prize;
		}
		if (myPrizes[4]) {
			var prize = myPrizes[4] * prizes[4];
			notification(translate('¡Premio Gordo! ¡Hay '+myPrizes[4]+' billetes premiados con un total de '+shortNum(prize)+' fichas!|Big Prize! There are '+myPrizes[4]+' tickets prized with a total of '+shortNum(prize)+' tokens!'));
			yourTickets.innerHTML += '<br>'+translate(''+myPrizes[4]+' billetes fueron premiados con el segundo premio (Premio Gordo), por un total de '+shortNum(prize)+' fichas|'+myPrizes[4]+' tickets were prized with second prize (Big Prize) with a total of '+shortNum(prize)+' tokens.');
			casino.tokens += prize;
			total += prize;
		}
		if (myPrizes[3]) {
			var prize = myPrizes[3] * prizes[3];
			yourTickets.innerHTML += '<br>'+translate(''+myPrizes[3]+' billetes fueron premiados con el tercer premio, por un total de '+shortNum(prize)+' fichas|'+myPrizes[3]+' tickets were prized with third prize with a total of '+shortNum(prize)+' tokens.');
			casino.tokens += prize;
			total += prize;
		}
		if (myPrizes[2]) {
			var prize = myPrizes[2] * prizes[2];
			yourTickets.innerHTML += '<br>'+translate(''+myPrizes[2]+' billetes fueron premiados con el cuarto premio, por un total de '+shortNum(prize)+' fichas|'+myPrizes[2]+' tickets were prized with fourth prize with a total of '+shortNum(prize)+' tokens.');
			casino.tokens += prize;
			total += prize;
		}
		if (myPrizes[1]) {
			var prize = myPrizes[1] * prizes[1];
			yourTickets.innerHTML += '<br>'+translate(''+myPrizes[1]+' billetes fueron premiados con el quinto premio, por un total de '+shortNum(prize)+' fichas|'+myPrizes[1]+' tickets were prized with fifth prize with a total of '+shortNum(prize)+' tokens.');
			casino.tokens += prize;
			total += prize;
		}
		if (myPrizes[0]) {
			yourTickets.innerHTML += '<br>'+translate(myPrizes[0]+' billetes no fueron premiados. ¡Sigue intentando!|'+myPrizes[1]+' tickets were not prized. Keep trying!');
		}
		casino.records.lottery += total;
		var tokensBalance = shortNum(total)+' - '+shortNum((lots*2))+' = '+shortNum((total-(lots*2)));
		yourTickets.innerHTML += '<br><br>'+translate('Fichas totales ganadas: '+tokensBalance+'|Total tokens won: '+tokensBalance);

		casino.lotteryTickets = 0;
	}
}
function lotteryEqual(num1, num2) {
	var num1 = String(num1);
	var num2 = String(num2);

	var nums = [];
	for (var x = 0; x <= 4; x++) {
		nums[x] = (num1.charAt(x) == num2.charAt(x));
	}
	console.log(nums);
	var one = nums[4];
	var two = one && nums[3];
	var three = two && nums[2];
	var four = three && nums[1];
	var five = four && nums[0];

	if (five) return 5;		//5 numbers match. 1,000,000 tokens prize
	if (four) return 4;		//4 numbers match. 160,000 tokens prize
	if (three) return 3;	//3 numbers match. 8,000 tokens prize
	if (two) return 2;		//2 numbers match. 400 tokens prize
	if (one) return 1;		//1 number match. 20 tokens prize
	return;
}
function donateToBanca() {
	var amt = parseInt(bancaDonation.value);
	if (amt < 1 || !amt) {
		notification(translate('La cantidad debe ser superior a cero|The ammount must be higher than zero'));
		return;
	}
	if (amt > casino.moneys) {
		var num = shortNum(casino.moneys);
		notification(translate('No dispones de tanto dinero (máximo: '+num+'ç)|You dont have enough money (max: '+num+'ç)'));
		return;
	}
	changeMoneys(amt);
	var amt = shortNum(amt);
	notification(translate('Has donado '+amt+'ç a La Banca|You just donated '+amt+'ç to The Bank'));
}
function changeMoneys(amt, operation) {
	//Default: Subtracts money. If operation==true, then adds money instead.
	if (operation) {
		casino.moneys += amt;
		casino.banca -= amt;

		casino.records.moneyMade += amt;
	}
	else {
		casino.moneys -= amt;
		casino.banca += amt;
	}
}
function bancaGrowth() {
	//Adds some money to the banca each tick. 5.55% chance. Min amount is 1ç, max amount is variable of current banca money.
	var mix = Math.ceil(Math.sqrt(casino.banca*casino.moneys));
	var fix = Math.log(casino.banca)+1;
	var mod = (Math.random() * 0.004) / fix;
	var amt = Math.ceil(casino.banca * mod);
	if (amt > mix) amt = mix;

	if (amt < 0) amt = 1;
	if (rand(1,18) == 1) casino.banca += amt;
}
function slotMachine(amt) {
	if (playing) {
		return;
	}
	if (casino.tokens < amt && !freeSpin) {
		notification(translate('No tienes suficientes fichas.|You don\'t have enough tokens.'));
		return;
	}
	casino.tokens -= amt;
	if (freeSpin) {
		casino.tokens += amt;
		freeSpin = false;
		notification(translate('¡Tirada gratis!|Free spin!'));
	}

	playing = true;
	var sm = setTimeout(function() {slotMachineEnd(amt)}, 1000);
}
function slotMachineEnd(amount) {
	console.log('Debug: slotMachineEnd parameter amount is '+amount);
	playing = false;
	if (reels[0] == reels[1] && reels[1] == reels[2] || reels[0] == 'C') {
		var fxd = SLOT_PRIZES[reels[0]];
		var prize = (amount * fxd);

		var cherries = 3;

		if (reels[0] == 'C' && !(reels[1] == 'C' && reels[2] == 'C')) {
			//If one cherry is in the first slot. The prize is 1/4 cherry prize.
			prize = Math.ceil(prize / 4);
			cherries = 1;
			if (reels[1] == 'C') {
				//If another cherry is in the middle slot. The prize is 1/2 the cherry prize.
				prize *= 2;
				cherries = 2;
			}
		}
		notification(translate('¡Has ganado un premio, '+shortNum(prize)+' fichas!|You won a prize, '+shortNum(prize)+' tokens!'));
		if (doubleSlot) {
			prize *= 2;
			doubleSlot = false;
			notification(translate('Gracias al bonus. El premio se convierte en '+shortNum(prize)+' fichas.|Thanks to the bonus, the prize is now '+shortNum(prize)+' tokens.'));
		}
		casino.tokens += prize;

		//Special slots
		if (reels[0] == '7') {
			//Jackpot
			var jackpot = softRound(Math.ceil(casino.banca/100)+amount*100);
			changeMoneys(jackpot, 1);
			notification(translate('¡JACKPOT! Además has ganado '+shortNum(jackpot)+'ç.|JACKPOT! You also win ç'+shortNum(jackpot)+'.'));
		}
		if (reels[0] == 'M') {
			//Dollar Sign. Doubles the next prize.
			doubleSlot = true;
			notification(translate('¡Moneda$$$, el próximo premio será doblado!|Ca$$$h, the next prize will be doubled!'));
		}
		if (reels[0] == 'R') {
			//Repeat. Gives a free spin.
			freeSpin = true;
			notification(translate('¡La próxima tirada es gratis!|You got a free spin!'));
		}
		var where = SLOT_HIGHLIGHT[reels[0]];
		if (reels[0] == 'C') {
			where = '#helpCherry3';
			if (cherries == 2) where = '#helpCherry2';
			if (cherries == 1) where = '#helpCherry1';
		}
		console.log('Effect to: '+where);
		$(where).effect('highlight', 500).effect('highlight', 500).effect('highlight', 500).effect('highlight', 500);
	}
}
function slotMachineUpdate() {
	if (playing) {
		for (var e in reels) reels[e] = read(SLOTS);
		slotResults.innerHTML = '['+reels[0]+']'+' '+'['+reels[1]+']'+' '+'['+reels[2]+']';
	}
}
function generateCards() {
	CARDS = [];
	var numbers = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 'T', 'J', 'Q', 'K'];
	var suits = ['C', 'D', 'H', 'S'];
	//(C)lubs, (D)iamonds, (H)earts, (S)pades
	for (var s in suits) {
		for (var n in numbers) {
			CARDS[CARDS.length] = new Card(numbers[n], suits[s]);
		}
	}
}
function Card(number, suit, id) {
	this.number = number;
	this.suit = suit;
}
function shuffleDeck(fromGame) {
	$('.spawned').animate({top: '16px', left: '16px'}, 500).css('transform', 'rotate(720deg)').addClass(DEFAULT_CARDBACK);
	$('.spawned').delay(700).animate({top: '16px', left: '16px'}, 700, function() {$('.spawned').remove()});
	$('#hol_deck').delay(200).animate({top: '70px', left: '16px'}, 500);
	if (fromGame) var gc = setTimeout(getCard, 2000);

	cardDeck = [];
	var tempCards = CARDS;
	var tempCards = JSON.parse(JSON.stringify(CARDS));
	for (var c in CARDS) {
		var r = rand(0, tempCards.length-1);
		cardDeck[c] = tempCards[r];
		console.log('Adding card to deck. Index: '+c+' card: '+tempCards[r]);
		tempCards.splice(r, 1);
	}
}
function steal() {
	var random = rand(1,100);
	var maxAmount = Math.floor(casino.banca/10);
	var amt = softRound(rand(1,maxAmount));

	casino.stealPenalty = 10;
	if (random <= 19) { //Sucess
		changeMoneys(amt, 1);
		notification(translate('¡El robo ha sido un éxito!. Has robado '+shortNum(amt)+'ç|Steal sucess!. '+shortNum(amt)+'ç stolen.'));
		console.log('');
		return;
	}
	else {              //Fail
		if (random <= 46) {
			var mix = (casino.moneys + casino.savings + casino.banca) / 3;
			var amt = softRound(rand(1,mix));
			if (casino.moneys < amt) {
				if (!casino.bank) casino.bank = true;
				casino.savings -= amt;
			}
			else {
				changeMoneys(amt);
			}
			notification(translate('Te han pillado robando y tienes que pagar una multa de '+shortNum(amt)+'ç.|You got caught stealing and have to pay a fine of ç'+shortNum(amt)+'.'));
			return;
		}
		if (random <= 73) {
			var toban = (amt * 10) + 10000;
			var tiem = duration(toban);
			notification(translate('Te han pillado robando y has sido expulsado del casino durante '+tiem+'|You got caught stealing and got kicked from the casino for '+tiem+'.'));
			$('#banned').fadeIn(2000);
			casino.ban = toban;
			return;
		}
		else {
			notification(translate('Has intentado robar dinero de la caja fuerte, sin resultados.|You try getting some money from the safe, without avail.'));
			return;
		}
	}
}
function gambleTime() {
	casino.ban -= spree;
	spree *= 1.02;
}
function translations() {
	stealButton.value = translate('Robar|Steal');
	hdsbtn.value = translate('¿Cara?|Heads?');
	tlsbtn.value = translate('¿Cruz?|Tails?');
	holtitle.innerHTML = translate(STRINGS['makebet']);
	if (tonMode) holtitle.innerHTML = translate(STRINGS['ton']);
	hol_minbet.innerHTML = translate(STRINGS['minbet']);
	if (tonMode) hol_minbet.innerHTML = translate(STRINGS['tonbet']);
}
function checkVersion() {
	if (casino.version != VERSION) {
		var btn = '<a href="changelog.txt" target="_blank">Link</a>';
		notification(translate('Nueva versión: '+VERSION+'. Consulta los últimos cambios aquí: '+btn+'|New version: '+VERSION+'. Check the last changes here: '+btn));
		casino.version = VERSION;
	}
}
function getCard(top, left) {
	if (cardDeck.length <= 0) {
		shuffleDeck(1);
		return;
	}

	var tp = hol_deck_firstcard.style.top;
	var el = $('<i class="card '+DEFAULT_CARDBACK+'" style="z-index: 10; top: '+tp+'; left: 16px; transform: rotate(0deg); transition: transform 1s, top 1s, left 1s"></i>')
	$('.table').append(el);

	var c = cardDeck[0];
	var cardValue = c.number;
	var cc = 'spawned card_'+c.suit+c.number;
	cardDeck.splice(0, 1);

	var rot = 720+(Math.random()*5)-(Math.random()*5);

	var cardLeft = left || 240;
	var cardTop = top || tp;
	el.animate({
	left: cardLeft+'px',
	top: cardTop+'px',
	}, 500, function() {el.css('transform', 'rotate('+rot+'deg)')}).switchClass(DEFAULT_CARDBACK, cc, 500);
	return cardValue;
}
function higherOrLower(what) {
	if (!what) {
		holCards[holCards.length] = getCardValueOf(getCard(250, 16));
		holSwitch('on');
		return;
	}
	var bet = parseInt(holBet.value);
	if (!bet || bet < 1 || casino.tokens < bet) {
		if (!bet || bet < 1) notification(translate(STRINGS['beterror']));
		if (casino.tokens < bet) notification(translate(STRINGS['notoks']));
		return;
	}
	var last = holCards[holCards.length-1];
	var phase = holCards.length;
	var where = (phase*84)+16;
	if (phase == 6) {
		where = 540;
	}
	var newCard = getCardValueOf(getCard(250, where));
	holCards[holCards.length] = newCard;
	console.log('Last card: '+last+' new card: '+newCard)

	var win = 0;
	if (what == 'higher' && newCard > last) win = 1;
	if (what == 'lower' && newCard < last) win = 1;

	if (win) {
		var holmsg = setTimeout(function() {
			if (tonMode) bet *= 2;
			var ex = (tonMode) ? translate(STRINGS['ton']) : '';
			notification(ex+translate(STRINGS['hol_winner'])+shortNum(bet)+translate(STRINGS['toks'])+'.');
			casino.tokens += bet
			if (phase == 5) tonMode = true;
	}, 1500);
	}
	if (!win) {
		var holmsg = setTimeout(function() {notification(translate(STRINGS['hol_loser'])); casino.tokens -= bet; holSwitch('off')}, 1500);	
	}
	if (phase == 5) {
		$('#hol_slot7').delay(1000).animate({opacity: 1},1000);
	}
	if (phase == 6) holSwitch('off');
}
function holSwitch(position) {
	if (position == 'on') {
		yeshol.style.display = 'block';
		nohol.style.display = 'none';
	}
	if (position == 'off') {
		yeshol.style.display = 'none';
		nohol.style.display = 'block';
	}
}
function resetHol() {
	$('#hol_slot7').delay(1000).delay(1000).animate({opacity: 0},1000);
	holCards = [];
	shuffleDeck();
	tonMode = false;
	fortellerMessage = 0;
	var rh = setTimeout(higherOrLower, 2000);
}
function getCardValueOf(number) {
	var replace = {
		'A': 1,
		'T': 10,
		'J': 11,
		'Q': 12,
		'K': 13
	}
	if (!parseInt(number)) number = replace[number];
	return number;
}
function upd2() {
	if (tonMode) {
		$('#holtable').addClass('highlight');
		doc('holtable').style.border = '3px solid white';
		var upt = setTimeout(function() {doc('holtable').style.border = '3px solid hsl(60, 80%, 60%)';}, 250);
	}
	else {
		doc('holtable').style.border = '3px solid transparent';
		$('#holtable').removeClass('highlight');
	}
}
function holChance(peek) {
	var price = value()/20;
	price = Math.ceil((price * holCards.length) + 1);

	if (peek == 'start' || fortellerMessage == 0) {
		fortellerMessage = 1;
		return translate(STRINGS['forteller'])+shortNum(price)+'ç.';
	}

	if (casino.moneys < price) {
		return translate('Mis poderes no son gratuitos. Si no eres capaz de pagarme '+shortNum(price)+'ç yo no puedo ayudarte.|My powers are not free of charge. If you cannot pay '+shortNum(price)+'ç, then forget it.');
	}
	changeMoneys(price);

	var lastCard = last(holCards);
	var nextCard = getCardValueOf(cardDeck[0].number);
	var result = 'none';
	if (nextCard > lastCard) result = 'higher';
	if (nextCard < lastCard) result = 'lower';
	var r = rand(1,5);
	if (r == 1) result = red('higher', 'lower', 'none');
	var msgs = {
		'higher': 'Veo un gran número...|I see a great number...',
		'lower': '¡Los astros revelan un número menor.|The stars reveal a lesser number.',
		'none': 'No te arriesgues. Veo la derrota en el futuro.|Do not risk, I see defeat in the future!',
	}
	return translate(msgs[result]);
}
function value() {
	var toks = (casino.tokens * 10);
	return casino.moneys + toks + casino.savings;
}
function canIBuyTickets() {
	var prices = {
		'generic': PRICE_PER_LOTTERY_TICKET,
		'big': PRICE_PER_LOTTERY_TICKET_BIG,
		'huge': PRICE_PER_LOTTERY_TICKET_HUGE
	};
	var pricept = casino.tokens / prices[getLotteryChoice()];
	return Math.floor(pricept);
}
function maxLoan() {
	var maxMoney = casino.records.moneyMade;
	maxMoney += 1000;
	maxMoney = softRound(maxMoney / 10);
	return maxMoney;
}

//Mini WaitQuest
function spawnMonster() {
	if (casino.wait.monster) return;
	var secs = (casino.ban / 10) + 20;
	casino.wait.monster = {
		'level': 1,
		'seconds': 0,
		'experience': 0,
		'sec': rand(1,320),
		'atk': rand(1,320),
		'def': rand(1,320),
		'bonus_sec': 0,
		'bonus_atk': 0,
		'bonus_def': 0,
		'monster': 1,
		'name': 'Monster',
	}

	casino.wait.monster.level = Math.floor(secs / casino.wait.monster.sec) + 1;
	if (casino.wait.monster.level > (casino.wait.character.level + 5)) casino.wait.monster.level = (casino.wait.character.level + 5);
	casino.wait.lastMessage = translate('Un monstruo apareció.|A wild monster appeared.');
	casino.wait.monster.seconds = getStats(casino.wait.monster)[0];
}
function getStats(from) {
	var seconds = ((from.level / 100) * from.sec) + from.bonus_sec + 20;
	var atk = ((from.level / 100) * from.atk) + from.bonus_atk + 5;
	var def = ((from.level / 100) * from.def) + from.bonus_def + 5;

	return [Math.floor(seconds), Math.floor(atk), Math.floor(def)];
}
function checkLevelUp(from) {
	var lev = from.level;
	var exp = from.experience;
	var target = Math.pow(lev, 3);
	if (exp > target) {
		from.level++;
		return 1;
	}
}
function outputWQ(what) {
	wq_debug.innerHTML = what;
}
function changeLastMessageWQ(what) {
	casino.wait.lastMessage = what;
}
function outputStats(from) {
	var osl = '';
	checkLevelUp(from);
	if (from.monster) osl += '<span class="red">' + translate('Características del Monstruo|Monster Stats') + '</span>';
	if (!from.monster) osl += '<span class="blue">' + translate('Tus Características|Your Stats') + '</span>';
	osl += '<br>';
	osl += translate('Nivel|Level')+': '+from.level + '<br>';
	osl += translate('SDV|SOL')+': '+ from.seconds + '/' + getStats(from)[0] + '<br>';
	osl += translate('Ataque|Attack')+': '+ getStats(from)[1] + '<br>';
	osl += translate('Defensa|Defense')+': '+ getStats(from)[2] + '<br>';
	osl += translate('Experiencia|Experience')+': '+from.experience + '<br>';

	return osl;
}
function updateWQ() {
	if (!casino.wait.monster) {
		outputWQ(translate(STRINGS['wq_start']));
		wq_debutton.value = translate('Ir|Go');
		wq_debutton.onclick = function() {spawnMonster()};
	}
	if (casino.wait.monster) {
		var wql = '';
		wql += casino.wait.lastMessage;
		wql += '<br><br>' + outputStats(casino.wait.monster);
		wql += '<br><br>' + outputStats(casino.wait.character);
		outputWQ(wql);
		wq_debutton.value = translate('Atacar|Attack');
		wq_debutton.onclick = function() {attackWQ()};
	}
	if (casino.wait.monster && !casino.wait.character.seconds) {
		var wql = '';

		wql += casino.wait.lastMessage + '<br>';
		if (!casino.wait.nextHeal) wql += translate('No puedes luchar en estas condiciones. Recupera un poco de SDV.|You can not fight in this conditions. Recover a bit of SOL.');
		if (casino.wait.nextHeal) wql += translate('Debes esperar '+casino.wait.nextHeal/10+' segundos antes de volver a curarte. |You must wait '+casino.wait.nextHeal/10+' seconds before healing again.');
		wql += '<br><br>' + outputStats(casino.wait.character);
		outputWQ(wql);
		wq_debutton.value = translate('Curar|Heal');
		wq_debutton.onclick = function() {healWQ()};
	}
	wq_upgradeText.innerHTML = 'Funds: '+shortNum(casino.moneys)+'ç<br>' + 'SOL: '+upgradeWQ(0, 1) + 'ç<br>' + 'ATK: '+upgradeWQ(1, 1) + 'ç<br>' + 'DEF: '+upgradeWQ(2, 1) + 'ç<br>' + 'Heal Your Character Instantly: '+instantHealWQ(1) + 'ç<br>';
	wq_upbt_0.value = translate('SDV |SOL ') + '(+)';
	wq_upbt_1.value = translate('Ataque |Attack ') + '(+)';
	wq_upbt_2.value = translate('Defensa |Defense ') + '(+)';
	wq_upbt_3.value = translate('Instant Heal |Instant Heal ') + '(+)';

	casino.wait.nextHeal -= 1;
	if (casino.wait.nextHeal <= 0) casino.wait.nextHeal = 0;
}
function upgradeWQ(what, peek) {
	if (what == 0) {
		var price = casino.wait.character.sec / 10;
		var pmod = Math.ceil(Math.pow(1.1, price) * 10);
		if (peek) return shortNum(pmod);
		if (casino.moneys < pmod) {
			changeLastMessageWQ('Insuficient funds.');
			return;
		}
		changeMoneys(pmod);

		var bef = getStats(casino.wait.character)[0];
		casino.wait.character.sec += 10;
		var aft = getStats(casino.wait.character)[0];
		changeLastMessageWQ(translate('SDV|SOL')+' '+bef+' => '+aft);
	}
	if (what == 1) {
		var price = casino.wait.character.atk / 10;
		var pmod = Math.ceil(Math.pow(1.1, price) * 10);
		if (peek) return shortNum(pmod);
		if (casino.moneys < pmod) {
			changeLastMessageWQ('Insuficient funds.');
			return;
		}
		changeMoneys(pmod);

		var bef = getStats(casino.wait.character)[1];
		casino.wait.character.atk += 10;
		var aft = getStats(casino.wait.character)[1];
		changeLastMessageWQ(translate('Ataque|Attack')+' '+bef+' => '+aft);
	}
	if (what == 2) {
		var price = casino.wait.character.def / 10;
		var pmod = Math.ceil(Math.pow(1.1, price) * 10);
		if (peek) return shortNum(pmod);
		if (casino.moneys < pmod) {
			changeLastMessageWQ('Insuficient funds.');
			return;
		}
		changeMoneys(pmod);

		var bef = getStats(casino.wait.character)[2];
		casino.wait.character.def += 10;
		var aft = getStats(casino.wait.character)[2];
		changeLastMessageWQ(translate('Defensa|Defense')+' '+bef+' => '+aft);
	}
}
function instantHealWQ(peek) {
	var thishp = getStats(casino.wait.character)[0] - casino.wait.character.seconds;
	var hp = Math.ceil(getStats(casino.wait.character)[0] * 60) + 24;
	if (peek) return shortNum(hp);
	if (thishp <= 0) {
		changeLastMessageWQ('Already Maxed SOL');
		return;
	}
	if (casino.moneys < hp) {
		changeLastMessageWQ('Insuficient funds.');
		return;
	}
	changeMoneys(hp);
	casino.wait.nextHeal = 0;
	healWQ();
}
function healWQ() {
	if (casino.wait.nextHeal) {
		return;
	}
	casino.wait.character.seconds = getStats(casino.wait.character)[0];
	casino.wait.nextHeal += casino.wait.character.seconds * 10;
}
function attackWQ() {
	if (!casino.wait.turn) {
		var fromy = casino.wait.character;
		var toy = casino.wait.monster;
	}
	if (casino.wait.turn) {
		var fromy = casino.wait.monster;
		var toy = casino.wait.character;
	}
	console.log('From: '+fromy+' To: '+toy);
	//Attack
	var damage = Math.floor(getStats(fromy)[1] / getStats(toy)[2]) + 1;
	toy.seconds -= damage;
	if (toy.seconds <= 0) toy.seconds = 0;
	var atqwl = fromy.name + translate(' ataca a | attacks ') + toy.name + translate(' causando | causing ') + damage + translate(' daño. SDV: | damage. SOL: ') + toy.seconds +'/' + getStats(toy)[0];
	if (toy.seconds <= 0) {
		atqwl += '<br>' + fromy.name + translate(' ha derrotado a | defeated ') + toy.name + '.';
		if (toy.monster) {
			var lef = getStats(toy)[0] * 1000;
			casino.ban -= lef;
			atqwl += '<br>' + translate('Se han perdonado |') + lef + translate(' segundos de la cuenta atrás.| seconds have been released from the countdown.');
			casino.wait.monster = undefined;
			var fromlev = fromy.level;
			var tolev = toy.level;
			var diff = tolev - fromlev;
			var emod = 1;
			if (diff > 0) emod = Math.pow(1.1, diff);
			if (diff < 0) emod = Math.pow(0.8, (diff * -1));

			var ebase = (1000/fromlev+10) * emod;
			console.log('From level: '+fromlev+' to level: '+tolev+' difference in levels: '+diff+' e modifier: '+emod+' exp base: '+ebase);
			casino.wait.character.experience += ebase;
		}
	}

	changeLastMessageWQ(atqwl);

	casino.wait.turn = !casino.wait.turn;
}

//$functions (end)
//$variables
var onCasino = true;
var casino;
casino = {};
var ACCOUNT_OPENING_FEE = 10000;
var INTEREST_RATE_HOURLY = 0.5;
var SLOTS = [
'7', 'D', 'M', 'R', 'L', 'B', 'C',

//Symbol, Name 			Payout			Special
//7 is Jackpot			600 			Jackpot. Gives a percent of Bank cash.
//D is Diamond			300
//M is Dollar Symbol	150 			Doubles next prize.
//R is Repeat 			75 				Gives a free spin.
//L is Lemon 			35				Accumulates 1 point per lemon. (TBA)
//B is Bell				15				
//C is Cherry 			10				Gives a prize even if you don't align 3. (TBA)

];
var SLOT_PRIZES = {
	'7': 600, 'D': 300, 'M': 150, 'R': 75, 'L': 35, 'B': 15, 'C': 10
}
var SLOT_HIGHLIGHT = {
	'7': '#helpSeven', 'D': '#helpDiamond', 'M': '#helpMoneybag',
	'R': '#helpRepeat', 'L': '#helpLemon', 'B': '#helpBell',
	'C': '#helpCherry'
}
var CARDS = [];
var VERSION = '0.20.2';
var cardDeck = [];
var reels = [7, 7, 7];
var doubleSlot = false;
var freeSpin = false;
var playing = false;
var coin = false;
var COINS = ['(H)', '|', '(T)', '|'];
var COIN_ANIMATION_TIME = 1920;
var STRINGS = {
	'higher': 'Mayor|Higher',
	'lower': 'Menor|Lower',
	'beterror': 'Apuesta no válida. La apuesta debe ser superior a cero.|Invalid bet. The bet must be higher than zero.',
	'notoks': 'No tienes suficientes fichas.|You do not have enough tokens.',
	'toks': 'Fichas|Tokens',
	'hol_winner': '¡Enhorabuena!, has ganado |Congratulations! you have won ',
	'hol_loser': '¡Oh, no! Has perdido la apuesta. |Oh, noes! you lost the bet.',
	'playagain': 'Volver a jugar|Play again',
	'makebet': 'Haga su apuesta|Make your bet',
	'ton': '¡TRIPLE O NADA!|TRIPLE OR NOTHING!',
	'minbet': "Apuesta mínima: 1 ficha|Minimum bet: 1 token",
	'tonbet': "¡Sólo por tiempo limitado. Gana el triple de lo apostado!|Limited time only, win three times your bet!",
	'forteller': "¿Necesitas ayuda? Yo puedo ayudarte por el precio de |Do you need help? I can help you for ",
	'agree': 'Aceptar|Agree',
	'yohave': 'Tienes|You have',
	'lotickets': 'billetes de lotería|lottery tickets',
	'mprize': '(MegaPremio)|(MegaPrize)',
	'gprize': '(GigaPremio)|(GigaPrize)',
	'wq_start': 'No hay ningún monstruo con el que combatir. ¡Vayamos de caza!|There are no monsters to fight on. Let\'s go hunting!',
};
var cardPrepared = true;
var DEFAULT_CARDBACK = 'card_backgray';
var holCards = [];
var tonMode = false;
var fortellerMessage = 0;
var spree = 1;
var LOTTERY_TIME = 600;
var LOTTERY_TIME_BIG = 6000;
var LOTTERY_TIME_HUGE = 36000;
var PRICE_PER_LOTTERY_TICKET = 2;
var PRICE_PER_LOTTERY_TICKET_BIG = 150;
var PRICE_PER_LOTTERY_TICKET_HUGE = 4000;

var LOTTERY_PRIZES_HUGE = [0, 20000, 300000, 10000000];
var LOTTERY_CHANCES_HUGE = [0, 20, 200, 2000];

var LOTTERY_PRIZES_BIG = [0, 250, 5000, 55000, 1000000];
var LOTTERY_CHANCES_BIG = [0, 15, 150, 1500, 15000];

var LOTTERY_PRIZES = [0, 3, 85, 1000, 15000, 230000];
var LOTTERY_CHANCES = [0, 10, 100, 1000, 10000, 100000];

//$variables (end)
//$flow
loadGame();
generateCards();
shuffleDeck();
higherOrLower();
var t = setInterval(upd, 100);
var tt = setInterval(upd2, 500);
var sg = setInterval(saveGame, 30000);
//$flow (end)
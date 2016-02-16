var lastTry = "";
var newPhrase = 'CryP7'
var solution = "";
var playing = false;
function animateCryptHeader() {
	if (playing) return;
	var h = animCrypt(newPhrase, lastTry);
	lastTry = h;
	echo('cryptAnim', h)
}
var rtPos = 0;
function randomTitle() {
	var s = 'CryP7';
	var n = randChar();
	var l = "";
	var ss = s.split("");
	for (i = 0; i < ss.length; i++) {
		if (i == rtPos) {
			l+=n;
		}
		else {
			l+=ss[i];
		}
	}
	rtPos = rand(0,s.length);
	
	document.title = l;
}
var helpShown = false;
function help() {
	if (helpShown) {
		newGame();
		return;
	}
	document.getElementById('playbtn').value = 'Jugar';
	echo('cryptGame', '<span style="font-size: 18px">Intenta descifrar la frase que aparece en pantalla.<br><br>\
	Cada letra corresponde a otra letra del abecedario (Sin repeticiones).<br>\
	Por ejemplo: [ t=z, g=h, a=w, o=a ]<br>\
	Si apareciese la palabra "HWZA", la respuesta sería "GATO".<br><br>\
	</span>');
	helpShown = true;
}
var abcd = [];
var guesses = [];
function newDictionary() {
	abcd = [];
	guesses = [];
	var n = 65;
	for (i = 0; i < 26; i++) {
		abcd[i] = String.fromCharCode(n++);
	}
	for (i = 0; i < 1000; i++) {
		var s1 = rand(0,(abcd.length-1));
		var s2 = rand(0,(abcd.length-1));
		var c = abcd[s1];
		abcd[s1] = abcd[s2];
		abcd[s2] = c;
	}
}
function letNo(num) {
	return String.fromCharCode(65+num).toLowerCase();
}
function cryptCrypt(text) {
	var tx = text.toLowerCase();
	for (i = 0; i < abcd.length; i++) {
		var rep = letNo(i);
		var torep = abcd[i];
		tx = tx.replace(new RegExp(rep, 'g'), torep);
	}
	return tx;
}
function newGame() {
	newDictionary();
	var len = cryptDataBase.length-1;
	solution = cryptDataBase[rand(0,len)];
	newPhrase = cryptCrypt(solution);
	var ll = 'Descifra la siguiente frase: ';
	echo('cryptGame', ll);
	document.getElementById('playbtn').style.display = 'none';

	document.getElementById('butHints').style.display = 'inline';
	document.getElementById('butGuess').style.display = 'inline';
	document.getElementById('butSolve').style.display = 'inline';

	document.getElementById('sup').style.display = 'table-row';
	document.getElementById('anim').style.display = 'table-cell';

	guessIt();
}
function checkWin(newP) {
	if (newP.toUpperCase() == solution.toUpperCase()) {
		cryptWin();
		return;
	}
	return newP;
}
function hints() {
	playing = true;
	var hh = false;
	do {
		var no = rand(0,25);
		var h1 = letNo(no);
		var patt = new RegExp(h1, 'g');
		hh = patt.test(solution);
		hh = ( hh && !isin(guesses, h1));
		console.log(hh+" "+isin(guesses,h1));
	} while (hh == false);

	var h2 = abcd[no];
	var ll = 'Pista: La letra '+h2+' es en realidad '+h1;
	guesses[no] = h1;
	echo('hints', ll);
	guessTable();
}
function cryptWin() {
	echo('cryptGame', 'Enhorabuena, has dado con la respuesta correcta.');
	if (clean(newPhrase, 'gi').toUpperCase() == solution.toUpperCase()) {
		newPhrase = solution;
		
	}
}
function guessTable() {
	var ll = "<caption>Tus suposiciones</caption> \
	<tr><th>Letra</th><th>Suposición</th></tr>";

	for (i = 0; i < 26; i++) {
		if (guesses[i] == undefined) continue;
		ll+='<tr><td>'+abcd[i]+'</td><td>'+guesses[i]+'</td></tr>'
	}
	echo('guesses', ll);
	guessIt();
}
function clean(text, i) { return text.replace(new RegExp('<\/*b>', i),""); }
function guessIt() {
	var str = newPhrase;
	str = clean(str, 'g');
	for (i = 0; i < 26; i++) {
		if (guesses[i] == undefined) continue;
		//str = str.replace(new RegExp(abcd[i], 'g'), "<B>"+guesses[i]+"</B>");
		str = str.replace(new RegExp(abcd[i], 'g'), guesses[i]);
	}
	checkWin(str);
	echo('cryptSolve', str);
}
var t = setInterval(animateCryptHeader, 10);
var t2 = setInterval(randomTitle, 100);
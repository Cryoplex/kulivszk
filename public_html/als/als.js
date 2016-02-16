function showGameList() {
	document.getElementById('gameList').style.display = 'block';
}
function hideGameList() {
	document.getElementById('gameList').style.display = 'none';
}
function showShitList() {
	document.getElementById('shitList').style.display = 'block';
}
function hideShitList() {
	document.getElementById('shitList').style.display = 'none';
}
function hideAll() {
	hideGameList();
	hideShitList();
}
function showDoc(what) {
	var front = document.getElementById(what).innerHTML;
	document.getElementById('front').innerHTML = front;
}
showDoc('home');
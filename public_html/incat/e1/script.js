var cats = 0;
//The game starts with 0 owned cats.
function getCat() {
    cats++;
    document.getElementById('cat_count').innerHTML = cats
}
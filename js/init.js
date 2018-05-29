function init2(){
    var start = document.getElementsByClassName('startgame')[0];
    var game2 = document.getElementsByClassName('box')[0];
    game2.style.display = 'none';
    start.style.display = 'flex';
    var click = start.getElementsByTagName('a')[0];
    click.addEventListener('click',function(){
        start.style.display = 'none';
        game2.style.display = 'flex';
        
map.start();
    });
}
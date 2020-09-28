// mobile 選單開關
function navopen (t) {
  document.body.classList.toggle("open-nav");
}

// 畫面至頂 btn
function gotop(){
  window.scrollTo(0,0);
}

// 畫面至頂 btn 控制
var st, $btn_top = document.querySelector("#js-gotop");
window.onscroll = function(){  
  if(document.documentElement.scrollTop>window.screen.height && !$btn_top.classList.contains('show')){
    $btn_top.classList.toggle('show');
    clearTimeout(st);
    st = setTimeout(function(){$btn_top.classList.toggle('fadein');}, 10);
  }
  else if(document.documentElement.scrollTop<window.screen.height && $btn_top.classList.contains('show')){
    $btn_top.classList.toggle('show');
    $btn_top.classList.toggle('fadein');
    clearTimeout(st);
  }    
}

// 錨點確認
function hashCheck(){
  var hash = window.location.hash;
  posHandler(hash);

}

//移至段落錨點
function posHandler(section){
  if(!section || section=='') return;

  var $target = document.querySelector(section);
  if(!$target) return;
  
  window.scrollTo({
    top: $target.offsetTop,
    behavior: 'smooth',
  });
}

window.onload = function(){
  hashCheck();

  // 子選單錨點設置
  var $pos_handler = document.querySelectorAll('.sub-menu a');
  for (var i = 0; i < $pos_handler.length; i++) {
    $pos_handler[i].addEventListener('click', function(event){
      event.preventDefault();

      var page = this.getAttribute("href").split('#')[0];
      var section = this.getAttribute("href").split('#')[1];
      
      var pathname = window.location.pathname;
      var path = pathname.split('/');
      var filename = path[path.length-1];

      if(filename=='') filename = 'index.html';

      if(page != filename){
        //非同頁
        window.location.href = this.getAttribute("href");
        return;
      }

      //移至段落錨點
      if(document.body.classList.contains("open-nav")){
        document.body.classList.toggle("open-nav");
      }
      posHandler('#'+section);

    });
  }
  
};
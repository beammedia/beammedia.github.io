// 畫面置頂 btn
function gotop(){
	window.scrollTo(0,0);
  }
  
  // 畫面置頂 btn 控制
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
  
  
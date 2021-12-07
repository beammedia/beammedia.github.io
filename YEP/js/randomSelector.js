function random1() {
   var options = [
    '套','票','房','協','榮','獲','獎','懲','罰','趣','前','途','經','理','想','必','備','戰','志','辦','法','線','願','鍵','環','貨','知','戰','團','家','炆','撿','帥','情','期','開','謹','信','突','詢','校','外','屋','購','刺','新','相','須','配','強','乾'
  ]
   document.getElementById('randomSelector1').innerHTML = options[getRndInteger(0,48)];}
function getRndInteger(min, max) { return Math.floor(Math.random() * (max - min)) + min;}


function random2() {
   var options = [
    'ㄅ','ㄆ','ㄇ','ㄈ','ㄉ','ㄊ','ㄋ','ㄌ','ㄍ','ㄎ','ㄏ','ㄐ','ㄑ','ㄒ','ㄓ','ㄔ','ㄕ','ㄖ','ㄗ','ㄘ','ㄧ','ㄨ','ㄩ','ㄚ','ㄛ','ㄜ','ㄟ','ㄠ','ㄡ','ㄤ','ㄣ','ㄥ','ㄦ','ㄝ','ㄞ','ㄢ','ㄙ'
  ]
   document.getElementById('randomSelector2').innerHTML = options[getRndInteger(0,37)];}
function getRndInteger(min, max) { return Math.floor(Math.random() * (max - min)) + min;}


function random3() {
   var options = [
    '街頭小吃','在家裡會做的事','捷運站名','動詞+名詞','女性歌手','好萊塢明星','整杯的飲料','哺乳類動物'
  ]
   document.getElementById('randomSelector3').innerHTML = options[getRndInteger(0,8)];}
function getRndInteger(min, max) { return Math.floor(Math.random() * (max - min)) + min;}

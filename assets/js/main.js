// Roboplanet v2 interactions: assembly entrance, menu, reveal, tabs, filters, lightbox, form validation -> WhatsApp
(function(){
  "use strict";
  var $=function(s,c){return (c||document).querySelector(s)};
  var $$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
  var reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // hero assembly
  $$(".asm, .asm-f").forEach(function(el){ el.classList.add("play"); });
  // mobile menu
  var burger=$("#burger");
  if(burger){burger.addEventListener("click",function(){var open=document.body.classList.toggle("menu-open");burger.setAttribute("aria-expanded",open?"true":"false")});
    $$(".mmenu a").forEach(function(a){a.addEventListener("click",function(){document.body.classList.remove("menu-open")})});
    document.addEventListener("keydown",function(e){if(e.key==="Escape")document.body.classList.remove("menu-open")});}
  // reveal
  if("IntersectionObserver" in window && !reduce){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.12,rootMargin:"0px 0px -40px 0px"});
    $$(".reveal").forEach(function(el){io.observe(el)});
  }else{$$(".reveal").forEach(function(el){el.classList.add("in")})}
  // faq smooth open
  $$(".faq details").forEach(function(d){
    d.addEventListener("toggle",function(){
      if(d.open){requestAnimationFrame(function(){d.classList.add("open-anim")})}
      else{d.classList.remove("open-anim")}
    });
    if(d.open)d.classList.add("open-anim");
  });
  // tabs
  $$('[role="tablist"]').forEach(function(list){
    var tabs=$$('[role="tab"]',list);
    tabs.forEach(function(t){t.addEventListener("click",function(){
      tabs.forEach(function(x){x.setAttribute("aria-selected","false")});t.setAttribute("aria-selected","true");
      $$(".prog").forEach(function(p){p.classList.remove("active")});
      var target=document.getElementById(t.getAttribute("data-panel"));if(target)target.classList.add("active");
    })});
  });
  // filters
  $$(".filters").forEach(function(f){
    var btns=$$("button",f);
    btns.forEach(function(b){b.addEventListener("click",function(){
      btns.forEach(function(x){x.classList.remove("active")});b.classList.add("active");
      var cat=b.getAttribute("data-filter");
      $$(".pcard").forEach(function(item){item.style.display=(cat==="all"||item.getAttribute("data-cat")===cat)?"":"none"});
    })});
  });
  // lightbox
  var lb=$("#lightbox");
  if(lb){
    var img=$("#lb-img"),cap=$("#lb-cap");
    var items=function(){return $$(".pcard").filter(function(el){return el.style.display!=="none"})};
    var idx=0;
    var open=function(i){var list=items();if(!list.length)return;idx=((i%list.length)+list.length)%list.length;
      var im=$("img",list[idx]);img.src=im.getAttribute("data-full")||im.src;img.alt=im.alt;cap.textContent=list[idx].getAttribute("data-title")||im.alt;
      lb.classList.add("open");document.body.style.overflow="hidden";$("#lb-close").focus()};
    var close=function(){lb.classList.remove("open");document.body.style.overflow=""};
    $$(".pcard").forEach(function(g){g.addEventListener("click",function(){open(items().indexOf(g))});
      g.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();open(items().indexOf(g))}})});
    $("#lb-close").addEventListener("click",close);
    $("#lb-prev").addEventListener("click",function(e){e.stopPropagation();open(idx-1)});
    $("#lb-next").addEventListener("click",function(e){e.stopPropagation();open(idx+1)});
    lb.addEventListener("click",function(e){if(e.target===lb)close()});
    document.addEventListener("keydown",function(e){if(!lb.classList.contains("open"))return;if(e.key==="Escape")close();if(e.key==="ArrowLeft")open(idx-1);if(e.key==="ArrowRight")open(idx+1)});
  }
  $$("[data-year]").forEach(function(el){el.textContent=new Date().getFullYear()});
})();

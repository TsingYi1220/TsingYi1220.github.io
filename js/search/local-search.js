window.addEventListener("load",()=>{let t=!1,n=[];const a=document.getElementById("search-mask"),e=()=>{var e=document.body.style;e.width="100%",e.overflow="hidden",btf.animateIn(a,"to_show 0.5s"),btf.animateIn(document.querySelector("#local-search .search-dialog"),"titleScale 0.5s"),setTimeout(()=>{document.querySelector("#local-search-input input").focus()},100),t||(o(),t=!0),document.addEventListener("keydown",function e(t){"Escape"===t.code&&(r(),document.removeEventListener("keydown",e))})},r=()=>{var e=document.body.style;e.width="",e.overflow="",btf.animateOut(document.querySelector("#local-search .search-dialog"),"search_close .5s"),btf.animateOut(a,"to_hide 0.5s")},l=()=>{document.querySelector("#search-button > .search").addEventListener("click",e)},c=async e=>{var t=await fetch(e),a=/\.json$/.test(e)?await t.json():(e=await t.text(),[...(await(new window.DOMParser).parseFromString(e,"text/xml")).querySelectorAll("entry")].map(e=>({title:e.querySelector("title").textContent,content:e.querySelector("content")&&e.querySelector("content").textContent,url:e.querySelector("url").textContent})));return t.ok&&((e=document.getElementById("loading-database")).nextElementSibling.style.display="block",e.remove()),a},o=()=>{GLOBAL_CONFIG.localSearch.preload||(n=c(GLOBAL_CONFIG.localSearch.path));var e=document.querySelector("#local-search-input input");const t=document.getElementById("local-search-results"),a=document.getElementById("loading-status");e.addEventListener("input",function(){const d=this.value.trim().toLowerCase().split(/[\s]+/);""!==d[0]&&(a.innerHTML='<i class="fas fa-spinner fa-pulse"></i>'),t.innerHTML="";let u='<div class="search-result-list">';if(!(d.length<=0)){let i=0;n.then(e=>{e.forEach(l=>{let a=!0,c=l.title?l.title.trim().toLowerCase():"";const o=l.content?l.content.trim().replace(/<[^>]+>/g,"").toLowerCase():"";l=l.url.startsWith("/")?l.url:GLOBAL_CONFIG.root+l.url;let n,r=-1,s=-1;if(""!==c||""!==o?d.forEach((e,t)=>{n=c.indexOf(e),r=o.indexOf(e),n<0&&r<0?a=!1:(r<0&&(r=0),0===t&&(s=r))}):a=!1,a){if(0<=s){let e=s-30,t=s+100,a="",n="",r=(0==(e=e<0?0:e)?t=100:a="...",t>o.length?t=o.length:n="...",o.substring(e,t));d.forEach(e=>{var t=new RegExp(e,"gi");r=r.replace(t,'<span class="search-keyword">'+e+"</span>"),c=c.replace(t,'<span class="search-keyword">'+e+"</span>")}),u+='<div class="local-search__hit-item"><a href="'+l+'" class="search-result-title">'+c+"</a>",i+=1,""!==o&&(u+='<p class="search-result">'+a+r+n+"</p>")}u+="</div>"}}),0===i&&(u+='<div id="local-search__hits-empty">'+GLOBAL_CONFIG.localSearch.languages.hits_empty.replace(/\$\{query}/,this.value.trim())+"</div>"),u+="</div>",t.innerHTML=u,""!==d[0]&&(a.innerHTML=""),window.pjax&&window.pjax.refresh(t)})}})};l(),document.querySelector("#local-search .search-close-button").addEventListener("click",r),a.addEventListener("click",r),GLOBAL_CONFIG.localSearch.preload&&(n=c(GLOBAL_CONFIG.localSearch.path)),window.addEventListener("pjax:complete",()=>{btf.isHidden(a)||r(),l()})});
(() => {
  if(parent===window)return;
  document.addEventListener('click',event=>{
    if(!parent.HYC_PREVIEW||event.defaultPrevented||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    const link=event.target.closest('a[href]');if(!link||link.target==='_blank')return;
    const href=link.getAttribute('href');
    if(href.startsWith('#')){
      const target=document.getElementById(decodeURIComponent(href.slice(1)));
      if(target){event.preventDefault();target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});}
      return;
    }
    const match=href.match(/^(index|communaute)\.html(?:#(.*))?$/);
    if(!match)return;
    event.preventDefault();parent.postMessage({type:'hyc-navigate',page:match[1]==='index'?'home':'community',hash:match[2]||''},'*');
  });
  addEventListener('keydown',event=>{if(event.key==='Escape'&&parent.HYC_PREVIEW)parent.postMessage({type:'hyc-exit-fullscreen'},'*');});
})();

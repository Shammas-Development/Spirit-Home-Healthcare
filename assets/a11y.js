/* Spirit Home Health Care — Accessibility widget (self-contained, no third party) */
(function(){
  var A=document.documentElement, KEY='shhc_a11y', FONT=[0.9,1,1.1,1.25,1.4];
  var state; try{state=JSON.parse(localStorage.getItem(KEY))||{};}catch(e){state={};}
  if(typeof state.font!=='number') state.font=1;

  var ICON='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="7" r="1.2" fill="currentColor" stroke="none"/><path d="M5.5 9c2 .8 4 1 6.5 1s4.5-.2 6.5-1"/><path d="M12 10v4l-2.2 4.6M12 14l2.2 4.6"/></svg>';
  function ic(p){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+p+'</svg>';}

  function save(){try{localStorage.setItem(KEY,JSON.stringify(state));}catch(e){}}
  function apply(){
    A.style.fontSize=(16*FONT[state.font])+'px';
    A.classList.toggle('acc-contrast',!!state.contrast);
    A.classList.toggle('acc-links',!!state.links);
    A.classList.toggle('acc-readable',!!state.readable);
    A.classList.toggle('acc-cursor',!!state.cursor);
    ['contrast','links','readable','cursor'].forEach(function(k){
      var b=panel.querySelector('[data-acc="'+k+'"]'); if(b) b.classList.toggle('active',!!state[k]);
    });
    save();
  }

  var btn=document.createElement('button');
  btn.className='acc-btn'; btn.type='button';
  btn.setAttribute('aria-label','Accessibility options'); btn.setAttribute('aria-expanded','false');
  btn.innerHTML=ICON;

  var panel=document.createElement('div');
  panel.className='acc-panel'; panel.setAttribute('role','dialog'); panel.setAttribute('aria-label','Accessibility options');
  panel.innerHTML=
    '<h3>'+ICON+' Accessibility</h3>'+
    '<div class="acc-grid">'+
      '<button class="acc-opt" type="button" data-acc="fontplus">'+ic('<path d="M4 20l5-14 5 14M6 15h6"/><path d="M18 9v8M14 13h8"/>')+'Bigger text</button>'+
      '<button class="acc-opt" type="button" data-acc="fontminus">'+ic('<path d="M4 20l5-14 5 14M6 15h6"/><path d="M14 13h8"/>')+'Smaller text</button>'+
      '<button class="acc-opt" type="button" data-acc="contrast">'+ic('<circle cx="12" cy="12" r="9"/><path d="M12 3v18a9 9 0 0 0 0-18z" fill="currentColor" stroke="none"/>')+'High contrast</button>'+
      '<button class="acc-opt" type="button" data-acc="links">'+ic('<path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1"/>')+'Highlight links</button>'+
      '<button class="acc-opt" type="button" data-acc="readable">'+ic('<path d="M4 7V5h16v2M9 5v14M7 19h4"/>')+'Readable font</button>'+
      '<button class="acc-opt" type="button" data-acc="cursor">'+ic('<path d="M5 3l14 8-6 1 3 7-3 1-3-7-5 4z"/>')+'Big cursor</button>'+
      '<button class="acc-reset" type="button" data-acc="reset">Reset all</button>'+
    '</div>';

  function open(v){panel.classList.toggle('open',v);btn.setAttribute('aria-expanded',v?'true':'false');}
  btn.addEventListener('click',function(){open(!panel.classList.contains('open'));});
  document.addEventListener('click',function(e){if(!panel.contains(e.target)&&!btn.contains(e.target))open(false);});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')open(false);});

  panel.addEventListener('click',function(e){
    var b=e.target.closest('[data-acc]'); if(!b)return;
    var k=b.getAttribute('data-acc');
    if(k==='fontplus') state.font=Math.min(FONT.length-1,state.font+1);
    else if(k==='fontminus') state.font=Math.max(0,state.font-1);
    else if(k==='reset'){state={font:1};A.style.fontSize='';}
    else state[k]=!state[k];
    apply();
  });

  function init(){document.body.appendChild(btn);document.body.appendChild(panel);apply();}
  if(document.body) init(); else document.addEventListener('DOMContentLoaded',init);
})();

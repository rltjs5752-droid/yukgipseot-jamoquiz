
const CONFIG={
  title:"윲깂섮의 자모퀴즈",adminPassword:"1234",maxTries:5,maxPuzzles:150,lockMinutes:10,
  keyRows:[[..."ㅂㅈㄷㄱㅅㅛㅕㅑ"],[..."ㅁㄴㅇㄹㅎㅗㅓㅏㅣ"],[..."ㅋㅌㅊㅍㅠㅜㅡ"]],
  winMessages:["오? 니가 짱머거라!","오? 쫌하는데?","흠, 아쉽다?","흠, 안쓰럽네;","ㄹㅇㅋㅋ;"],
  loseMessage:"^모^"
};
const ACH={
  firstClear:"드디어 시작이다.",
  streak3:"이제 시작임 ㅋ",
  streak5:"탄력 좀 받냐?",
  streak10:"이정돈 해야지.",
  streak20:"자모 좀 치네?",
  streak30:"사람이 맞나?",
  streak50:"뭘 바람?",
  streak100:"마지막을 향해 서두르세요.",
  clear150:"이 또한, 추억이다.",
  fail1:"ㅉㅉ",
  failStreak2:"음..",
  failStreak3:"집중 안 하냐?",
  failStreak5:"오늘 컨디션 안 좋은 듯?",
  failStreak10:"그냥 내일 다시 와.",
  speed5:"손보다 뇌가 빠르다.",
  speed3:"사람 맞음?",
  speed2:"검색했지?",
  speed1:"운영자 아니냐?",
  noHintSuccess:"감 좋네.",
  noHint10:"힌트가 필요 없는 남자.",
  hintSuccess:"그래도 맞췄네.",
  hintFail:"힌트도 울고 간다.",
  nearOne:"진짜 아깝다.",
  waitSuccess:"포기 안 했네.",
  revengeSuccess:"복수 성공.",
  firstTryStreak5:"감각 살아있네.",
  firstTryStreak10:"오늘 각성했다.",
  firstPuzzle8:"시작부터 하드모드.",
  lastPuzzle2:"허무한 엔딩.",
  firstVisit:"어서 와.",
  visit100:"거의 직원인데?",
  lateNight:"잠은?",
  commute:"일 안 하냐?",
  lunch:"밥은 먹고 해.",
  rainy:"오늘도 장마철.",
  christmas:"혼자냐?",
  birthday:"생일 축하한다.",
  allNoHint:"미쳤다.",
  allFirstTry:"제작자도 못 함.",
  perfect150:"자모의 신."
};

const ACH_META={
  firstClear:{label:"첫 문제 클리어",grade:"일반"},
  streak3:{label:"3연속 성공",grade:"일반"},
  streak5:{label:"5연속 성공",grade:"일반"},
  streak10:{label:"10연속 성공",grade:"희귀"},
  streak20:{label:"20연속 성공",grade:"희귀"},
  streak30:{label:"30연속 성공",grade:"희귀"},
  streak50:{label:"50연속 성공",grade:"영웅"},
  streak100:{label:"100연속 성공",grade:"영웅"},
  clear150:{label:"150문제 클리어",grade:"전설"},
  fail1:{label:"첫 실패",grade:"일반"},
  failStreak2:{label:"2연속 실패",grade:"일반"},
  failStreak3:{label:"3연속 실패",grade:"일반"},
  failStreak5:{label:"5연속 실패",grade:"희귀"},
  failStreak10:{label:"10연속 실패",grade:"영웅"},
  speed5:{label:"5초 안에 성공",grade:"희귀"},
  speed3:{label:"3초 안에 성공",grade:"희귀"},
  speed2:{label:"2초 안에 성공",grade:"영웅"},
  speed1:{label:"1초 안에 성공",grade:"전설"},
  noHintSuccess:{label:"힌트 없이 성공",grade:"일반"},
  noHint10:{label:"힌트 없이 10문제 연속",grade:"희귀"},
  hintSuccess:{label:"힌트 보고 성공",grade:"일반"},
  hintFail:{label:"힌트 보고도 실패",grade:"일반"},
  nearOne:{label:"한 글자 차이",grade:"일반"},
  waitSuccess:{label:"10분 대기 후 성공",grade:"일반"},
  revengeSuccess:{label:"실패 후 바로 성공",grade:"희귀"},
  firstTryStreak5:{label:"5문제 연속 첫 시도 성공",grade:"희귀"},
  firstTryStreak10:{label:"10문제 연속 첫 시도 성공",grade:"영웅"},
  firstPuzzle8:{label:"첫 문제가 8글자",grade:"일반"},
  lastPuzzle2:{label:"마지막 문제가 2글자",grade:"일반"},
  firstVisit:{label:"첫 접속",grade:"일반"},
  visit100:{label:"100번째 접속",grade:"희귀"},
  lateNight:{label:"새벽 2~5시 플레이",grade:"일반"},
  commute:{label:"출근시간 8~9시",grade:"일반"},
  lunch:{label:"점심시간",grade:"일반"},
  rainy:{label:"비 오는 날/장마 단어",grade:"일반"},
  christmas:{label:"크리스마스 접속",grade:"희귀"},
  birthday:{label:"생일 접속",grade:"희귀"},
  allNoHint:{label:"전 문제 힌트 없이 클리어",grade:"전설"},
  allFirstTry:{label:"150문제 전부 첫 시도 성공",grade:"전설"},
  perfect150:{label:"150문제 100% 성공",grade:"전설"}
};

const DEFAULT_PUZZLES=[
  {answer:"장마철",hint:"계절 관련 단어",no:"001",explain:"장마가 계속되는 시기."},
  {answer:"태양",hint:"하늘에 있음",no:"002",explain:"스스로 빛을 내는 항성."},
  {answer:"휴가철",hint:"여름 관련 단어",no:"003",explain:"휴가를 많이 가는 시기."}
];
const VOWEL_SPLIT={"ㅐ":["ㅏ","ㅣ"],"ㅒ":["ㅑ","ㅣ"],"ㅔ":["ㅓ","ㅣ"],"ㅖ":["ㅕ","ㅣ"],"ㅘ":["ㅗ","ㅏ"],"ㅙ":["ㅗ","ㅏ","ㅣ"],"ㅚ":["ㅗ","ㅣ"],"ㅝ":["ㅜ","ㅓ"],"ㅞ":["ㅜ","ㅓ","ㅣ"],"ㅟ":["ㅜ","ㅣ"],"ㅢ":["ㅡ","ㅣ"]};

const $=id=>document.getElementById(id);
const enc=s=>btoa(unescape(encodeURIComponent(s)));
const dec=s=>decodeURIComponent(escape(atob(s)));
function hashParams(){const p={};(location.hash||"").replace(/^#/,"").split("&").forEach(x=>{const i=x.indexOf("=");if(i>-1)p[x.slice(0,i)]=x.slice(i+1);else if(x)p[x]=true});return p}
function getHash(k){const v=hashParams()[k];if(!v||v===true)return null;try{return dec(decodeURIComponent(v))}catch(e){return null}}
function defaultSettings(){return {winMessages:[...CONFIG.winMessages], ach:{...ACH}}}
function loadSettings(){
  const hp=getHash("cfg");
  if(hp){
    try{
      const s=JSON.parse(hp);
      localStorage.setItem("jamoSettings",JSON.stringify(s));
      return s;
    }catch(e){}
  }
  try{
    const s=JSON.parse(localStorage.getItem("jamoSettings")||"null");
    if(s)return s;
  }catch(e){}
  return defaultSettings();
}
function applySettings(){
  const s=loadSettings();
  if(Array.isArray(s.winMessages)&&s.winMessages.length){
    for(let i=0;i<5;i++) CONFIG.winMessages[i]=s.winMessages[i]||CONFIG.winMessages[i];
  }
  if(s.ach && typeof s.ach==="object"){
    Object.keys(s.ach).forEach(k=>{ if(ACH[k]!==undefined && s.ach[k]) ACH[k]=s.ach[k]; });
  }
}
function getSettingsForLink(){
  return {
    winMessages:[...CONFIG.winMessages],
    ach:{...ACH}
  };
}
function achText(){
  return [
    `firstTry|${ACH.firstTry}`,
    `fail1|${ACH.fail1}`,
    `fail2|${ACH.fail2}`,
    `streak3|${ACH.streak3}`,
    `streak5|${ACH.streak5}`,
    `streak10|${ACH.streak10}`,
    `streak50|${ACH.streak50}`,
    `streak100|${ACH.streak100}`,
    `clear150|${ACH.clear150}`
  ].join("\\n");
}
function parseAchText(text){
  const out={};
  String(text||"").split(/\\n+/).forEach(line=>{
    const i=line.indexOf("|");
    if(i>-1){
      const k=line.slice(0,i).trim();
      const v=line.slice(i+1).trim();
      if(k && v) out[k]=v;
    }
  });
  return out;
}
function achLabels(){
  return Object.keys(ACH_META).map(key=>[key,ACH_META[key].label,ACH_META[key].grade]);
}
function renderAchievementEditor(){
  return achLabels().map(([key,label])=>`
    <div class="ach-edit-row">
      <label>${label}</label>
      <input id="ach_${key}" data-achkey="${key}" value="${esc(ACH[key]||"")}" />
    </div>
  `).join("");
}
function readAchievementEditor(){
  return {...ACH};
}

function achLabelByKey(key){
  const row=achLabels().find(x=>x[0]===key);
  return row ? row[1] : key;
}
function renderAchievementList(){
  const box=$("achEditor");
  if(!box) return;
  const entries=achLabels()
    .filter(([key])=>ACH[key])
    .map(([key,label,grade])=>({key,label,grade,msg:ACH[key]}));
  box.innerHTML=entries.length ? entries.map(({key,label,msg})=>`
    <div class="puzzle-item ach-list-item">
      <b>${esc(label)}</b>
      <div><b>${esc(msg)}</b><div class="puzzle-meta">${esc(grade||"일반")} · ${esc(key)}</div></div>
      <button data-achdel="${key}">삭제</button>
    </div>
  `).join("") : `<div class="small" style="padding:12px">등록된 업적 문구가 없음</div>`;
  box.querySelectorAll("button[data-achdel]").forEach(btn=>{
    btn.onclick=()=>{
      ACH[btn.dataset.achdel]="";
      renderAchievementList();
    };
  });
}
function addAchievementFromAdmin(){
  const key=$("achCond")?.value;
  const msg=$("achMsg")?.value.trim();
  if(!key){alert("업적 조건을 선택해줘.");return}
  if(!msg){alert("업적 문구를 입력해줘.");return}
  ACH[key]=msg;
  $("achMsg").value="";
  renderAchievementList();
}


function esc(s){return String(s||"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function hashString(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return(h>>>0).toString(36)}
function decompose(str){
  const CHO=["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
  const JUNG=["ㅏ","ㅐ","ㅑ","ㅒ","ㅓ","ㅔ","ㅕ","ㅖ","ㅗ","ㅘ","ㅙ","ㅚ","ㅛ","ㅜ","ㅝ","ㅞ","ㅟ","ㅠ","ㅡ","ㅢ","ㅣ"];
  const JONG=["","ㄱ","ㄲ","ㄳ","ㄴ","ㄵ","ㄶ","ㄷ","ㄹ","ㄺ","ㄻ","ㄼ","ㄽ","ㄾ","ㄿ","ㅀ","ㅁ","ㅂ","ㅄ","ㅅ","ㅆ","ㅇ","ㅈ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
  const FS={"ㄳ":["ㄱ","ㅅ"],"ㄵ":["ㄴ","ㅈ"],"ㄶ":["ㄴ","ㅎ"],"ㄺ":["ㄹ","ㄱ"],"ㄻ":["ㄹ","ㅁ"],"ㄼ":["ㄹ","ㅂ"],"ㄽ":["ㄹ","ㅅ"],"ㄾ":["ㄹ","ㅌ"],"ㄿ":["ㄹ","ㅍ"],"ㅀ":["ㄹ","ㅎ"],"ㅄ":["ㅂ","ㅅ"]};
  let out=[];
  for(const ch of String(str).trim()){
    const code=ch.charCodeAt(0);
    if(code>=0xAC00&&code<=0xD7A3){
      const n=code-0xAC00;
      out.push(CHO[Math.floor(n/588)]);
      const v=JUNG[Math.floor((n%588)/28)];
      out.push(...(VOWEL_SPLIT[v]||[v]));
      const j=JONG[n%28];
      if(j)out.push(...(FS[j]||[j]));
    }else if(ch!==" "){out.push(...(VOWEL_SPLIT[ch]||[ch]));}
  }
  return out;
}
function parsePack(text){
  return text.split(/\n+/).map(x=>x.trim()).filter(Boolean).slice(0,CONFIG.maxPuzzles).map((line,i)=>{
    const p=line.split("|").map(x=>x.trim());
    return {answer:p[0]||"",hint:p[1]||"",no:p[2]||String(i+1).padStart(3,"0"),explain:p[3]||""};
  }).filter(x=>x.answer);
}
function packText(pack){return pack.map((p,i)=>`${p.answer}|${p.hint||""}|${p.no||String(i+1).padStart(3,"0")}|${p.explain||""}`).join("\n")}
function loadPack(){
  const hp=getHash("pack");
  if(hp){try{const arr=JSON.parse(hp);if(Array.isArray(arr)&&arr.length){localStorage.setItem("jamoPack",JSON.stringify(arr));return arr.slice(0,CONFIG.maxPuzzles)}}catch(e){}}
  try{const arr=JSON.parse(localStorage.getItem("jamoPack")||"null");if(Array.isArray(arr)&&arr.length)return arr}catch(e){}
  return DEFAULT_PUZZLES;
}
applySettings();
let PACK=loadPack();
let ADMIN_DRAFT=[...PACK];
let PACK_ID=hashString(JSON.stringify(PACK));
let USER=null, SESSION_USER=null, round={guesses:[],results:[],current:[],keyStatus:{},gameOver:false,lastReveal:-1,hintJustOpened:false,startedAt:Date.now()};
function userKey(){return `jamoUser_${PACK_ID}_${hashString(USER.nick+"|"+USER.pw)}`}
function currentUser(){return SESSION_USER}
function saveCurrentUser(u){SESSION_USER={nick:u.nick,pw:u.pw}}
function defaultData(){return{nick:USER.nick,pw:USER.pw,index:0,success:0,fail:0,totalTries:0,streak:0,bestStreak:0,firstTry:0,firstTryStreak:0,failStreak:0,noHintStreak:0,ach:[],achKeys:[],lockUntil:0,history:[],visits:0,wasLocked:false,lastFailed:false,allNoHint:true,allFirstTry:true,allSuccess:true}}
function data(){
  let raw=localStorage.getItem(userKey());
  if(raw)try{
    let d=JSON.parse(raw);
    const def=defaultData();
    Object.keys(def).forEach(k=>{if(d[k]===undefined)d[k]=def[k];});
    return d;
  }catch(e){}
  let d=defaultData();saveData(d);return d;
}
function saveData(d){localStorage.setItem(userKey(),JSON.stringify(d));saveCurrentUser(d)}
function puzzle(){const d=data();return PACK[Math.min(d.index,PACK.length-1)]||PACK[0]}
function answer(){return decompose(puzzle().answer)}
function addAch(d,key){
  const msg=ACH[key];
  if(!msg)return null;
  if(!d.achKeys)d.achKeys=[];
  if(!d.ach)d.ach=[];
  if(!d.achKeys.includes(key)){
    d.achKeys.push(key);
    d.ach.push(msg);
    return msg;
  }
  return null;
}
function shouldShowHint(){return round.guesses.length>=3 || round.gameOver}
function render(){
  USER=currentUser();
  if(!USER){renderLogin();return}
  const d=data(),p=puzzle(),locked=Date.now()<d.lockUntil, showHint=shouldShowHint() && p.hint;
  document.getElementById("app").innerHTML=`<div class="screen">
    <header class="header"><span class="left">${esc(d.nick)}</span><span id="titleTap" class="title">${CONFIG.title}</span><span class="right">#${esc(p.no)}</span></header>
    <main class="main">
      <div class="progress">진행률 ${d.index+1} / ${PACK.length}</div>
      ${round.hintJustOpened?`<div class="hint-open">💡 힌트가 공개되었습니다!</div>`:""}
      ${showHint?`<div class="hint">💡 힌트: ${esc(p.hint)}</div>`:""}
      ${locked?`<div id="lockBox" class="ach"></div>`:""}
      <div id="board" class="board"></div>
      <div id="msg" class="msg"></div>
      <div id="achBox"></div>
      <div id="explainBox"></div>
      <div class="controls"><button id="shareBtn" style="display:none">결과공유</button><button id="nextBtn" class="next" style="display:none">다음 문제</button><button id="statsBtn">통계</button><button id="logoutBtn">로그아웃</button></div>
      <div id="sharebox" class="sharebox"></div>
    </main>
    ${locked?"":keyboardHtml()}
    ${adminHtml()}
    ${statsHtml()}
  </div>`;
  bind();
  drawBoard();
  if(!locked)drawKeyboard(); else startLock();
  if(round.hintJustOpened){setTimeout(()=>{round.hintJustOpened=false;render()},1200)}
}
function renderLogin(){
  document.getElementById("app").innerHTML=`<div class="screen"><header class="header"><span class="title">${CONFIG.title}</span></header>
  <main class="main"><div class="card"><h2>로그인</h2><input id="nick" placeholder="닉네임"/><input id="pw" type="password" placeholder="비밀번호"/><button id="loginBtn">시작하기</button><div class="small">다시 들어와도 같은 닉네임+비밀번호로 로그인하면 이어풀기와 통계가 유지됨.</div></div></main></div>`;
  $("loginBtn").onclick=()=>{const n=$("nick").value.trim(),p=$("pw").value.trim();if(!n||!p){alert("닉네임과 비밀번호를 입력해줘.");return}USER={nick:n,pw:p};saveCurrentUser(USER);let d=data();d.visits=(d.visits||0)+1;let a=[];if(d.visits===1)a.push(addAch(d,'firstVisit'));if(d.visits===100)a.push(addAch(d,'visit100'));saveData(d);resetRound();setTimeout(()=>showAch(a.filter(Boolean)),200);};
}
function keyboardHtml(){return `<section class="keyboard-wrap"><div id="inputbar" class="inputbar">글자를 입력하세요</div><div class="keyboard-area"><div id="keyboard" class="keyboard"></div><div class="action-col"><button id="backBtn" class="action">←</button><button id="enterBtn" class="action enter">입력</button></div></div></section>`}
function adminHtml(){return `<div id="adminModal" class="modal"><div class="card"><h2>관리자 설정</h2><input id="adminPw" type="password" placeholder="관리자 비밀번호"/>
  <div class="tabs"><button id="tabEasy" class="active">간편입력</button><button id="tabBulk">일괄입력</button><button id="tabSetting">멘트/업적</button></div>
  <div id="easyBox">
    <div class="admin-row"><input id="aNo" placeholder="번호 예: 001"/><input id="aAnswer" placeholder="정답 예: 장마철"/></div>
    <input id="aHint" placeholder="힌트 예: 계절 관련 단어"/>
    <textarea id="aExplain" placeholder="해설 예: 장마가 계속되는 시기."></textarea>
    <button id="addPuzzle" class="btn green">문제 추가</button>
    <div id="puzzleList" class="puzzle-list"></div>
  </div>
  <div id="bulkBox" style="display:none">
    <textarea id="packInput" placeholder="정답|힌트|문제번호|해설"></textarea>
    <div id="packPreview" class="small"></div>
  </div>
  <div id="settingBox" style="display:none">
    <div class="small">성공 멘트</div>
    <div class="ach-edit-row"><label>1트 성공</label><input id="win_0" /></div>
    <div class="ach-edit-row"><label>2트 성공</label><input id="win_1" /></div>
    <div class="ach-edit-row"><label>3트 성공</label><input id="win_2" /></div>
    <div class="ach-edit-row"><label>4트 성공</label><input id="win_3" /></div>
    <div class="ach-edit-row"><label>5트 성공</label><input id="win_4" /></div>
    <div class="small" style="margin-top:12px">업적 추가</div>
            <select id="achCond" class="admin-select">
      <option value="firstClear">[일반] 첫 문제 클리어</option>
      <option value="streak3">[일반] 3연속 성공</option>
      <option value="streak5">[일반] 5연속 성공</option>
      <option value="streak10">[희귀] 10연속 성공</option>
      <option value="streak20">[희귀] 20연속 성공</option>
      <option value="streak30">[희귀] 30연속 성공</option>
      <option value="streak50">[영웅] 50연속 성공</option>
      <option value="streak100">[영웅] 100연속 성공</option>
      <option value="clear150">[전설] 150문제 클리어</option>
      <option value="fail1">[일반] 첫 실패</option>
      <option value="failStreak2">[일반] 2연속 실패</option>
      <option value="failStreak3">[일반] 3연속 실패</option>
      <option value="failStreak5">[희귀] 5연속 실패</option>
      <option value="failStreak10">[영웅] 10연속 실패</option>
      <option value="speed5">[희귀] 5초 안에 성공</option>
      <option value="speed3">[희귀] 3초 안에 성공</option>
      <option value="speed2">[영웅] 2초 안에 성공</option>
      <option value="speed1">[전설] 1초 안에 성공</option>
      <option value="noHintSuccess">[일반] 힌트 없이 성공</option>
      <option value="noHint10">[희귀] 힌트 없이 10문제 연속</option>
      <option value="hintSuccess">[일반] 힌트 보고 성공</option>
      <option value="hintFail">[일반] 힌트 보고도 실패</option>
      <option value="nearOne">[일반] 한 글자 차이</option>
      <option value="waitSuccess">[일반] 10분 대기 후 성공</option>
      <option value="revengeSuccess">[희귀] 실패 후 바로 성공</option>
      <option value="firstTryStreak5">[희귀] 5문제 연속 첫 시도 성공</option>
      <option value="firstTryStreak10">[영웅] 10문제 연속 첫 시도 성공</option>
      <option value="firstPuzzle8">[일반] 첫 문제가 8글자</option>
      <option value="lastPuzzle2">[일반] 마지막 문제가 2글자</option>
      <option value="firstVisit">[일반] 첫 접속</option>
      <option value="visit100">[희귀] 100번째 접속</option>
      <option value="lateNight">[일반] 새벽 2~5시 플레이</option>
      <option value="commute">[일반] 출근시간 8~9시</option>
      <option value="lunch">[일반] 점심시간</option>
      <option value="rainy">[일반] 비 오는 날/장마 단어</option>
      <option value="christmas">[희귀] 크리스마스 접속</option>
      <option value="birthday">[희귀] 생일 접속</option>
      <option value="allNoHint">[전설] 전 문제 힌트 없이 클리어</option>
      <option value="allFirstTry">[전설] 150문제 전부 첫 시도 성공</option>
      <option value="perfect150">[전설] 150문제 100% 성공</option>
    </select>
    <input id="achMsg" placeholder="업적 문구 입력"/>
    <button id="addAchBtn" class="btn green">업적 추가</button>
    <div id="achEditor" class="puzzle-list"></div>
  </div>
    <button id="savePack">문제팩 저장</button>
  <button id="copyPack" class="btn blue">친구용 링크 복사</button>
  <button id="resetMe" class="btn red">내 로그인/통계 초기화</button>
  <button id="closeAdmin" class="btn light">닫기</button>
  <div class="small">간편입력에서 칸별로 넣거나, 일괄입력에서 기존처럼 붙여넣기 가능.<br>최대 150문제.</div>
  </div></div>`}
function statsHtml(){return `<div id="statsModal" class="modal"><div class="card"><h2>내 통계</h2><div id="statsText" class="small" style="white-space:pre-wrap;font-weight:800;line-height:1.8"></div><button id="closeStats" class="btn light">닫기</button></div></div>`}
function drawBoard(){
  const len=answer().length,b=$("board");b.innerHTML="";
  for(let r=0;r<CONFIG.maxTries;r++){
    const row=document.createElement("div");row.className="row";row.style.gridTemplateColumns=`repeat(${len},1fr)`;
    for(let c=0;c<len;c++){
      const t=document.createElement("div");t.className="tile";
      if(round.guesses[r]){t.textContent=round.guesses[r][c]||"";t.classList.add("filled",cls(round.results[r][c]));if(r===round.lastReveal)t.classList.add("reveal")}
      else if(r===round.guesses.length&&round.current[c]&&!round.gameOver){t.textContent=round.current[c];t.classList.add("pop")}
      row.appendChild(t);
    }
    b.appendChild(row);
  }
  const bar=$("inputbar");if(bar){bar.textContent=round.current.length?round.current.join(""):"글자를 입력하세요";bar.className="inputbar"+(round.current.length?" active":"")}
}
function drawKeyboard(){
  const kb=$("keyboard");kb.innerHTML="";
  CONFIG.keyRows.forEach(rowKeys=>{
    const row=document.createElement("div");row.className="keyrow";
    rowKeys.forEach(k=>{const b=document.createElement("button");b.className="key "+(round.keyStatus[k]||"");b.textContent=k;b.onclick=()=>press(k);row.appendChild(b)});
    kb.appendChild(row);
  });
}
function cls(x){return x==="green"?"green":x==="yellow"?"yellow":"gray"}
function rank(x){return x==="green"?3:x==="yellow"?2:x==="gray"?1:0}
function setKey(ch,s){if(rank(s)>rank(round.keyStatus[ch]))round.keyStatus[ch]=s}
function press(k){if(round.gameOver)return; if(round.current.length<answer().length){round.current.push(k);drawBoard()}}
function back(){if(round.gameOver)return; round.current.pop();drawBoard()}
function judge(g){
  const ans=answer();let res=Array(ans.length).fill("gray"),used=Array(ans.length).fill(false);
  for(let i=0;i<ans.length;i++)if(g[i]===ans[i]){res[i]="green";used[i]=true}
  for(let i=0;i<ans.length;i++){if(res[i]==="green")continue;for(let j=0;j<ans.length;j++)if(!used[j]&&g[i]===ans[j]){res[i]="yellow";used[j]=true;break}}
  return res;
}

function hammingDistance(a,b){
  if(a.length!==b.length)return 999;
  let n=0;
  for(let i=0;i<a.length;i++)if(a[i]!==b[i])n++;
  return n;
}
function checkTimeAchievements(d,a){
  const now=new Date();
  const h=now.getHours(), m=now.getMonth()+1, day=now.getDate();
  if(h>=2&&h<5)a.push(addAch(d,"lateNight"));
  if(h>=8&&h<9)a.push(addAch(d,"commute"));
  if(h>=12&&h<13)a.push(addAch(d,"lunch"));
  if(m===12&&day===25)a.push(addAch(d,"christmas"));
  if(String(d.nick||"").includes("생일"))a.push(addAch(d,"birthday"));
  const txt=(puzzle().answer+" "+(puzzle().hint||"")+" "+(puzzle().explain||""));
  if(/비|장마|우산|소나기/.test(txt))a.push(addAch(d,"rainy"));
}
function checkLengthAchievements(d,a){
  if(d.index===0 && answer().length>=8)a.push(addAch(d,"firstPuzzle8"));
  if(d.index===PACK.length-1 && answer().length<=2)a.push(addAch(d,"lastPuzzle2"));
}
function submit(){
  const d=data();if(Date.now()<d.lockUntil||round.gameOver)return;
  if(round.current.length!==answer().length){$("msg").textContent=`${answer().length}칸을 모두 입력해줘.`;shake();return}
  if(!round.startedAt)round.startedAt=Date.now();
  const beforeHint=shouldShowHint();
  const g=[...round.current],res=judge(g);
  round.guesses.push(g);round.results.push(res);round.lastReveal=round.guesses.length-1;g.forEach((ch,i)=>setKey(ch,res[i]));round.current=[];
  const ok=g.join("")===answer().join("");
  const elapsed=(Date.now()-(round.startedAt||Date.now()))/1000;
  const usedHint=round.guesses.length>3;
  let a=[];
  checkTimeAchievements(d,a);
  checkLengthAchievements(d,a);
  if(ok){
    round.gameOver=true;
    d.success++;d.totalTries+=round.guesses.length;d.streak++;d.failStreak=0;d.bestStreak=Math.max(d.bestStreak,d.streak);
    d.noHintStreak=usedHint?0:(d.noHintStreak+1);
    d.firstTryStreak=round.guesses.length===1?(d.firstTryStreak+1):0;
    d.history.push({no:puzzle().no,ok:true,tries:round.guesses.length,usedHint,elapsed,at:Date.now()});
    a.push(addAch(d,"firstClear"));
    if(round.guesses.length===1){d.firstTry++;a.push(addAch(d,"firstTry"))}
    if(d.streak===3)a.push(addAch(d,"streak3"));
    if(d.streak===5)a.push(addAch(d,"streak5"));
    if(d.streak===10)a.push(addAch(d,"streak10"));
    if(d.streak===20)a.push(addAch(d,"streak20"));
    if(d.streak===30)a.push(addAch(d,"streak30"));
    if(d.streak===50)a.push(addAch(d,"streak50"));
    if(d.streak===100)a.push(addAch(d,"streak100"));
    if(elapsed<=5)a.push(addAch(d,"speed5"));
    if(elapsed<=3)a.push(addAch(d,"speed3"));
    if(elapsed<=2)a.push(addAch(d,"speed2"));
    if(elapsed<=1)a.push(addAch(d,"speed1"));
    if(!usedHint)a.push(addAch(d,"noHintSuccess"));
    if(d.noHintStreak===10)a.push(addAch(d,"noHint10"));
    if(usedHint)a.push(addAch(d,"hintSuccess"));
    if(d.wasLocked)a.push(addAch(d,"waitSuccess"));
    if(d.lastFailed)a.push(addAch(d,"revengeSuccess"));
    if(d.firstTryStreak===5)a.push(addAch(d,"firstTryStreak5"));
    if(d.firstTryStreak===10)a.push(addAch(d,"firstTryStreak10"));
    if(usedHint)d.allNoHint=false;
    if(round.guesses.length!==1)d.allFirstTry=false;
    if(d.index===PACK.length-1){
      a.push(addAch(d,"clear150"));
      if(d.allNoHint)a.push(addAch(d,"allNoHint"));
      if(d.allFirstTry)a.push(addAch(d,"allFirstTry"));
      if(d.allSuccess)a.push(addAch(d,"perfect150"));
    }
    d.wasLocked=false;d.lastFailed=false;
    saveData(d);$("msg").textContent=`${round.guesses.length}/${CONFIG.maxTries} 성공 🎉\n${CONFIG.winMessages[round.guesses.length-1]}`;showAch(a.filter(Boolean));endButtons(true);
  }
  else if(round.guesses.length>=CONFIG.maxTries){
    round.gameOver=true;
    d.fail++;d.streak=0;d.firstTryStreak=0;d.noHintStreak=0;d.failStreak=(d.failStreak||0)+1;
    d.lockUntil=Date.now()+CONFIG.lockMinutes*60*1000;d.wasLocked=true;d.lastFailed=true;d.allSuccess=false;d.allNoHint=false;d.allFirstTry=false;
    const minDist=Math.min(...round.guesses.map(x=>hammingDistance(x,answer())));
    d.history.push({no:puzzle().no,ok:false,tries:CONFIG.maxTries,usedHint,near:minDist,at:Date.now()});
    a.push(addAch(d,"fail1"));
    if(d.failStreak===2)a.push(addAch(d,"failStreak2"));
    if(d.failStreak===3)a.push(addAch(d,"failStreak3"));
    if(d.failStreak===5)a.push(addAch(d,"failStreak5"));
    if(d.failStreak===10)a.push(addAch(d,"failStreak10"));
    if(usedHint)a.push(addAch(d,"hintFail"));
    if(minDist===1)a.push(addAch(d,"nearOne"));
    saveData(d);$("msg").textContent=CONFIG.loseMessage;showAch(a.filter(Boolean));$("explainBox").innerHTML=`<div class="explain">정답: ${esc(puzzle().answer)}<br>${esc(puzzle().explain||"해설이 등록되지 않았습니다.")}</div>`;endButtons(false);
  }
  else {$("msg").textContent=""; if(!beforeHint && shouldShowHint() && puzzle().hint) round.hintJustOpened=true;}
  if(round.hintJustOpened) render(); else {drawBoard();drawKeyboard();}
}
function showAch(arr){
  arr=arr.filter(Boolean);
  if(arr.length){
    $("achBox").innerHTML=arr.map(x=>`<div class="ach">업적 달성: ${esc(x)}</div>`).join("");
    const pop=document.createElement("div");
    pop.className="ach-popup";
    pop.innerHTML=`🏆 업적 달성!<b>${esc(arr[0])}</b>`;
    document.body.appendChild(pop);
    setTimeout(()=>pop.remove(),1900);
  }
}
function endButtons(ok){$("shareBtn").style.display="block";$("nextBtn").style.display="block";if(!ok){$("nextBtn").disabled=true;$("nextBtn").textContent="10분 대기 중"}else $("nextBtn").textContent=data().index>=PACK.length-1?"처음부터":"다음 문제"}
function startLock(){
  function tick(){const d=data();let left=d.lockUntil-Date.now();if(left<=0){d.lockUntil=0;saveData(d);resetRound();return}const m=Math.floor(left/60000),s=Math.floor((left%60000)/1000);$("lockBox").textContent=`실패! ${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")} 후 다음 문제 가능`;}
  tick();setInterval(tick,1000);
}
function nextPuzzle(){const d=data();if(Date.now()<d.lockUntil)return;d.index=d.index>=PACK.length-1?0:d.index+1;d.lockUntil=0;saveData(d);resetRound()}
function resetRound(){round={guesses:[],results:[],current:[],keyStatus:{},gameOver:false,lastReveal:-1,hintJustOpened:false,startedAt:Date.now()};render()}
function shareText(){
  const d=data(),ok=round.guesses.length&&round.guesses[round.guesses.length-1].join("")===answer().join("");
  return [`🎯 ${CONFIG.title} #${puzzle().no}`,`닉네임: ${d.nick}`,`진행률 ${d.index+1}/${PACK.length}`,"",new Date().toLocaleDateString("ko-KR"),"",...round.results.map(r=>r.map(x=>x==="green"?"🟩":x==="yellow"?"🟨":"⬜").join("")),"",ok?`${round.guesses.length}/5 성공 🎉`:"X/5 실패",ok?CONFIG.winMessages[round.guesses.length-1]:CONFIG.loseMessage,"",location.origin+location.pathname].join("\n");
}
function share(){const t=shareText();if(navigator.share)navigator.share({title:CONFIG.title,text:t}).catch(()=>copy(t));else copy(t)}
function copy(t){navigator.clipboard.writeText(t).then(()=>$("msg").textContent="복사 완료").catch(()=>{$("sharebox").style.display="block";$("sharebox").textContent=t})}

function achievementStats(d){
  const available=Object.keys(ACH_META).filter(k=>ACH[k]);
  const gotKeys=(d.achKeys&&d.achKeys.length)?d.achKeys.filter(k=>ACH[k]):available.filter(k=>(d.ach||[]).includes(ACH[k]));
  const result={};
  result["전체"]={got:gotKeys.length,total:available.length};
  ["일반","희귀","영웅","전설"].forEach(g=>{
    const total=available.filter(k=>ACH_META[k].grade===g).length;
    const got=gotKeys.filter(k=>ACH_META[k].grade===g).length;
    result[g]={got,total};
  });
  return result;
}
function openStats(){
  const d=data(),total=d.success+d.fail,avg=d.success?(d.totalTries/d.success).toFixed(2):"-";
  const s=achievementStats(d);
  const got=(d.achKeys&&d.achKeys.length)?d.achKeys.filter(k=>ACH[k]):[];
  $("statsText").textContent=`닉네임: ${d.nick}
진행률: ${d.index+1}/${PACK.length}
성공: ${d.success}
실패: ${d.fail}
성공률: ${total?Math.round(d.success/total*100):0}%
평균 시도횟수: ${avg}
현재 연속 성공: ${d.streak}
최고 연속 성공: ${d.bestStreak}
1트 성공: ${d.firstTry}

업적 통계: ${s["전체"].got} / ${s["전체"].total}
일반: ${s["일반"].got} / ${s["일반"].total}
희귀: ${s["희귀"].got} / ${s["희귀"].total}
영웅: ${s["영웅"].got} / ${s["영웅"].total}
전설: ${s["전설"].got} / ${s["전설"].total}

획득 업적
${got.length?got.map(k=>"・["+ACH_META[k].grade+"] "+ACH_META[k].label+" - "+ACH[k]).join("\\n"):(d.ach.length?d.ach.map(x=>"・"+x).join("\\n"):"없음")}`;
  $("statsModal").style.display="flex";
}
function openAdmin(){
  ADMIN_DRAFT=[...PACK];
  $("adminModal").style.display="flex";
  $("packInput").value=packText(ADMIN_DRAFT);
  for(let i=0;i<5;i++){ if($("win_"+i)) $("win_"+i).value=CONFIG.winMessages[i]||""; }
  renderAchievementList();
  renderPuzzleList();
  previewPack();
}
function previewPack(){$("packPreview").textContent=`등록 예정: ${parsePack($("packInput").value).length}문제 / 최대 ${CONFIG.maxPuzzles}문제`}
function renderPuzzleList(){
  const list=$("puzzleList"); if(!list)return;
  list.innerHTML=ADMIN_DRAFT.length?ADMIN_DRAFT.map((p,i)=>`<div class="puzzle-item"><b>#${esc(p.no)}</b><div><b>${esc(p.answer)}</b><div class="puzzle-meta">${esc(p.hint||"힌트 없음")}<br>${esc(p.explain||"해설 없음")}</div></div><button data-del="${i}">삭제</button></div>`).join(""):`<div class="small" style="padding:12px">등록된 문제가 없음</div>`;
  list.querySelectorAll("button[data-del]").forEach(btn=>btn.onclick=()=>{ADMIN_DRAFT.splice(Number(btn.dataset.del),1);syncBulkFromDraft();renderPuzzleList();previewPack();});
}
function syncBulkFromDraft(){$("packInput").value=packText(ADMIN_DRAFT)}
function checkAdmin(){if($("adminPw").value!==CONFIG.adminPassword){alert("비밀번호가 틀렸어.");return false}return true}
function addPuzzle(){
  const answer=$("aAnswer").value.trim();
  if(!answer){alert("정답을 입력해줘.");return}
  ADMIN_DRAFT.push({answer,hint:$("aHint").value.trim(),no:$("aNo").value.trim()||String(ADMIN_DRAFT.length+1).padStart(3,"0"),explain:$("aExplain").value.trim()});
  if(ADMIN_DRAFT.length>CONFIG.maxPuzzles){ADMIN_DRAFT=ADMIN_DRAFT.slice(0,CONFIG.maxPuzzles);alert("최대 150문제까지만 가능");}
  ["aNo","aAnswer","aHint","aExplain"].forEach(id=>$(id).value="");
  syncBulkFromDraft();renderPuzzleList();previewPack();
}
function savePack(){
  if(!checkAdmin())return;
  const activeBulk=$("bulkBox").style.display!=="none";
  const arr=activeBulk?parsePack($("packInput").value):ADMIN_DRAFT;
  if(!arr.length){alert("문제를 입력해줘.");return}
  const winLines=[0,1,2,3,4].map(i=>($("win_"+i)?.value||"").trim());
  const achMap=readAchievementEditor();
  const settings={winMessages:CONFIG.winMessages.map((x,i)=>winLines[i]||x), ach:{...ACH,...achMap}};
  localStorage.setItem("jamoSettings",JSON.stringify(settings));
  applySettings();
  PACK=arr.slice(0,CONFIG.maxPuzzles);PACK_ID=hashString(JSON.stringify(PACK));localStorage.setItem("jamoPack",JSON.stringify(PACK));
  const d=data();d.index=0;d.lockUntil=0;saveData(d);$("adminModal").style.display="none";resetRound();alert("저장 완료")
}
function copyPack(){
  if(!checkAdmin())return;
  const arr=($("bulkBox").style.display!=="none")?parsePack($("packInput").value):ADMIN_DRAFT;
  const winLines=[0,1,2,3,4].map(i=>($("win_"+i)?.value||"").trim());
  const achMap=readAchievementEditor();
  const settings={winMessages:CONFIG.winMessages.map((x,i)=>winLines[i]||x), ach:{...ACH,...achMap}};
  const link=`${location.origin+location.pathname}#pack=${encodeURIComponent(enc(JSON.stringify(arr)))}&cfg=${encodeURIComponent(enc(JSON.stringify(settings)))}`;
  copy(link)
}
function resetMe(){if(!checkAdmin())return;localStorage.clear();location.hash="";location.reload()}
function bind(){
  if($("backBtn"))$("backBtn").onclick=back;
  if($("enterBtn"))$("enterBtn").onclick=submit;
  $("shareBtn").onclick=share;$("nextBtn").onclick=nextPuzzle;$("statsBtn").onclick=openStats;$("logoutBtn").onclick=()=>{USER=null;SESSION_USER=null;renderLogin()};$("closeStats").onclick=()=>$("statsModal").style.display="none";
  $("closeAdmin").onclick=()=>$("adminModal").style.display="none";$("savePack").onclick=savePack;$("copyPack").onclick=copyPack;$("resetMe").onclick=resetMe;$("packInput").oninput=()=>{ADMIN_DRAFT=parsePack($("packInput").value);renderPuzzleList();previewPack();};
  $("addPuzzle").onclick=addPuzzle;
  $("addAchBtn").onclick=addAchievementFromAdmin;
  $("tabEasy").onclick=()=>{$("easyBox").style.display="block";$("bulkBox").style.display="none";$("settingBox").style.display="none";$("tabEasy").classList.add("active");$("tabBulk").classList.remove("active");$("tabSetting").classList.remove("active");};
  $("tabBulk").onclick=()=>{syncBulkFromDraft();$("easyBox").style.display="none";$("bulkBox").style.display="block";$("settingBox").style.display="none";$("tabBulk").classList.add("active");$("tabEasy").classList.remove("active");$("tabSetting").classList.remove("active");previewPack();};
  $("tabSetting").onclick=()=>{$("easyBox").style.display="none";$("bulkBox").style.display="none";$("settingBox").style.display="block";$("tabSetting").classList.add("active");$("tabEasy").classList.remove("active");$("tabBulk").classList.remove("active");};
  let taps=0,timer=null;$("titleTap").onclick=()=>{taps++;clearTimeout(timer);timer=setTimeout(()=>taps=0,1200);if(taps>=7){taps=0;openAdmin()}};
}
function shake(){const b=$("board");b.classList.remove("shake");void b.offsetWidth;b.classList.add("shake")}
document.addEventListener("keydown",e=>{if(e.key==="Enter")submit();else if(e.key==="Backspace")back();else if(e.key.length===1)press(e.key)});
render();

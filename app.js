
const CONFIG = {
  title: "윲깂섮의 자모퀴즈",
  defaultAnswer: "장마철",
  adminPassword: "1234",
  maxTries: 5,
  keyRows: [
    [..."ㅂㅈㄷㄱㅅㅛㅕㅑ"],
    [..."ㅁㄴㅇㄹㅎㅗㅓㅏㅣ"],
    [..."ㅋㅌㅊㅍㅠㅜㅡ"]
  ],
  winMessages: [
    "오? 니가 짱머거라!",
    "오? 쫌하는데?",
    "흠, 아쉽다?",
    "흠, 안쓰럽네;",
    "ㄹㅇㅋㅋ;"
  ],
  loseMessage: "^모^"
};

const VOWEL_SPLIT = {
  "ㅐ":["ㅏ","ㅣ"], "ㅒ":["ㅑ","ㅣ"], "ㅔ":["ㅓ","ㅣ"], "ㅖ":["ㅕ","ㅣ"],
  "ㅘ":["ㅗ","ㅏ"], "ㅙ":["ㅗ","ㅏ","ㅣ"], "ㅚ":["ㅗ","ㅣ"],
  "ㅝ":["ㅜ","ㅓ"], "ㅞ":["ㅜ","ㅓ","ㅣ"], "ㅟ":["ㅜ","ㅣ"],
  "ㅢ":["ㅡ","ㅣ"]
};

function b64EncodeUnicode(str){ return btoa(unescape(encodeURIComponent(str))); }
function b64DecodeUnicode(str){ return decodeURIComponent(escape(atob(str))); }
function readHashParams(){
  const raw = (location.hash || "").replace(/^#/, "");
  const params = {};
  raw.split("&").forEach(part => {
    const eq = part.indexOf("=");
    if(eq > -1) params[part.slice(0,eq)] = part.slice(eq+1);
    else if(part) params[part] = true;
  });
  return params;
}
function decodeHashValue(key){
  const v = readHashParams()[key];
  if(!v || v === true) return null;
  try { return b64DecodeUnicode(decodeURIComponent(v)); } catch(e){ return null; }
}
function pushVowel(out, v){ VOWEL_SPLIT[v] ? out.push(...VOWEL_SPLIT[v]) : out.push(v); }
function decomposeHangul(str){
  const CHO = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
  const JUNG = ["ㅏ","ㅐ","ㅑ","ㅒ","ㅓ","ㅔ","ㅕ","ㅖ","ㅗ","ㅘ","ㅙ","ㅚ","ㅛ","ㅜ","ㅝ","ㅞ","ㅟ","ㅠ","ㅡ","ㅢ","ㅣ"];
  const JONG = ["","ㄱ","ㄲ","ㄳ","ㄴ","ㄵ","ㄶ","ㄷ","ㄹ","ㄺ","ㄻ","ㄼ","ㄽ","ㄾ","ㄿ","ㅀ","ㅁ","ㅂ","ㅄ","ㅅ","ㅆ","ㅇ","ㅈ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
  const FINAL_SPLIT = {"ㄳ":["ㄱ","ㅅ"],"ㄵ":["ㄴ","ㅈ"],"ㄶ":["ㄴ","ㅎ"],"ㄺ":["ㄹ","ㄱ"],"ㄻ":["ㄹ","ㅁ"],"ㄼ":["ㄹ","ㅂ"],"ㄽ":["ㄹ","ㅅ"],"ㄾ":["ㄹ","ㅌ"],"ㄿ":["ㄹ","ㅍ"],"ㅀ":["ㄹ","ㅎ"],"ㅄ":["ㅂ","ㅅ"]};
  let out = [];
  for(const ch of String(str).trim()){
    const code = ch.charCodeAt(0);
    if(code >= 0xAC00 && code <= 0xD7A3){
      const n = code - 0xAC00;
      out.push(CHO[Math.floor(n/588)]);
      pushVowel(out, JUNG[Math.floor((n%588)/28)]);
      const jong = JONG[n%28];
      if(jong) out.push(...(FINAL_SPLIT[jong] || [jong]));
    }else if(ch !== " "){
      if(VOWEL_SPLIT[ch]) out.push(...VOWEL_SPLIT[ch]);
      else out.push(ch);
    }
  }
  return out;
}
function escapeHtml(str){
  return String(str).replace(/[&<>"']/g, m => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
}
function getRawAnswer(){ return decodeHashValue("q") || localStorage.getItem("jamoAnswer") || CONFIG.defaultAnswer; }
function getPuzzleNo(){ return decodeHashValue("no") || localStorage.getItem("puzzleNo") || ""; }
function getHint(){ return decodeHashValue("hint") || localStorage.getItem("jamoHint") || ""; }

const app = document.getElementById("app");
let ANSWER = decomposeHangul(getRawAnswer());
let guesses = [];
let results = [];
let current = [];
let keyStatus = {};
let gameOver = false;
let lastRevealRow = -1;

function rank(s){ return s==="green"?3:s==="yellow"?2:s==="gray"?1:0; }
function setKeyStatus(ch,s){ if(rank(s)>rank(keyStatus[ch])) keyStatus[ch]=s; }
function emojiRow(res){ return res.map(x=>x==="green"?"🟩":x==="yellow"?"🟨":"⬜").join(""); }
function vibrate(ms=20){ if(navigator.vibrate) navigator.vibrate(ms); }

function judge(guess){
  let res = Array(ANSWER.length).fill("gray");
  let used = Array(ANSWER.length).fill(false);
  for(let i=0;i<ANSWER.length;i++){
    if(guess[i] === ANSWER[i]){ res[i]="green"; used[i]=true; }
  }
  for(let i=0;i<ANSWER.length;i++){
    if(res[i]==="green") continue;
    for(let j=0;j<ANSWER.length;j++){
      if(!used[j] && guess[i] === ANSWER[j]){ res[i]="yellow"; used[j]=true; break; }
    }
  }
  return res;
}
function getTodayText(){
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
}

function getChallengeLink(){
  const base = location.origin + location.pathname;
  const raw = getRawAnswer();
  const params = [`q=${encodeURIComponent(b64EncodeUnicode(raw))}`];
  const no = getPuzzleNo();
  const hint = getHint();
  if(no) params.push(`no=${encodeURIComponent(b64EncodeUnicode(no))}`);
  if(hint) params.push(`hint=${encodeURIComponent(b64EncodeUnicode(hint))}`);
  return `${base}#${params.join("&")}`;
}

function getResultText(){
  const success = guesses.length && guesses[guesses.length-1].join("") === ANSWER.join("");
  const no = getPuzzleNo();
  const title = `🎯 ${CONFIG.title}${no ? " #"+no : ""}`;
  const tries = success ? `${guesses.length}/${CONFIG.maxTries} 성공 🎉` : `X/${CONFIG.maxTries} 실패`;
  const level = success ? CONFIG.winMessages[guesses.length-1] : CONFIG.loseMessage;
  const lines = [
    title,
    "",
    `📅 ${getTodayText()}`,
    "",
    ...results.map(r => emojiRow(r)),
    "",
    tries,
    level,
    "",
    "도전하기👇",
    getChallengeLink()
  ];
  return lines.join("\n");
}

function render(){
  const shared = decodeHashValue("r");
  if(shared && !decodeHashValue("q")){
    app.innerHTML = `
      <div class="screen">
        <header class="header"><span class="title">${CONFIG.title}</span></header>
        <main class="main result-only">
          <div class="message">공유된 결과</div>
          <div class="share-box" style="display:block">${escapeHtml(shared)}</div>
        </main>
      </div>`;
    return;
  }
  const hint = getHint();
  const no = getPuzzleNo();
  app.innerHTML = `
    <div class="screen">
      <header class="header">
        <span id="titleTap" class="title">${CONFIG.title}</span>
        ${no ? `<span class="sub">#${escapeHtml(no)}</span>` : ""}
      </header>
      <main class="main">
        ${hint ? `<div class="preview">힌트: ${escapeHtml(hint)}</div>` : ""}
        <div id="board" class="board"></div>
        <div id="message" class="message"></div>
        <div class="controls"><button id="shareBtn" class="share-btn">결과공유</button></div>
        <div id="shareBox" class="share-box"></div>
      </main>
      <section class="keyboard-wrap">
        <div id="inputbar" class="inputbar">글자를 입력하세요</div>
        <div class="keyboard-area">
          <div id="keyboard" class="keyboard"></div>
          <div class="action-col">
            <button id="backBtn" class="action">←</button>
            <button id="enterBtn" class="action enter">입력</button>
          </div>
        </div>
      </section>
      <div id="adminModal" class="modal">
        <div class="modal-card">
          <h2>관리자 설정</h2>
          <input id="password" type="password" placeholder="비밀번호" />
          <input id="answerInput" placeholder="정답 입력 예: 태양 / 장마철" />
          <input id="puzzleNoInput" placeholder="문제번호 예: 001" />
          <input id="hintInput" placeholder="힌트 예: 계절 관련 단어" />
          <div id="answerPreview" class="preview">정답 자모 미리보기</div>
          <button id="saveAnswer" class="primary">내 화면에 정답 저장</button>
          <button id="copyPlayLink" class="blue">친구용 문제 링크 복사</button>
          <button id="resetLocal" class="red">내 저장 정답 초기화</button>
          <button id="closeAdmin" class="light">닫기</button>
          <div class="small">
            관리자 열기: 제목을 7번 연속 터치하거나 주소 끝에 <b>#admin</b> 입력.<br>
            기본 비밀번호: <b>1234</b><br>
            예: 태양 → ㅌㅏㅣㅇㅑㅇ<br>
            친구용 문제 링크에는 정답이 암호화되어 들어감.
          </div>
        </div>
      </div>
    </div>`;
  bindEvents();
  drawBoard();
  drawKeyboard();
  if(location.hash.includes("admin")) setTimeout(openAdmin, 200);
}

function drawBoard(){
  const board = document.getElementById("board");
  if(!board) return;
  board.innerHTML = "";
  for(let r=0;r<CONFIG.maxTries;r++){
    const row = document.createElement("div");
    row.className = "row";
    row.style.gridTemplateColumns = `repeat(${ANSWER.length},1fr)`;
    for(let c=0;c<ANSWER.length;c++){
      const tile = document.createElement("div");
      tile.className = "tile";
      if(guesses[r]){
        tile.textContent = guesses[r][c] || "";
        tile.classList.add("filled", results[r][c]);
        if(r === lastRevealRow){
          tile.classList.add("reveal");
          tile.style.animationDelay = `${c * 80}ms`;
        }
      }else if(r === guesses.length && current[c] && !gameOver){
        tile.textContent = current[c];
        tile.classList.add("pop");
      }
      row.appendChild(tile);
    }
    board.appendChild(row);
  }
  updateInputbar();
}
function drawKeyboard(){
  const kb = document.getElementById("keyboard");
  if(!kb) return;
  kb.innerHTML = "";
  CONFIG.keyRows.forEach(letters => {
    const row = document.createElement("div");
    row.className = "keyrow";
    letters.forEach(ch => {
      const b = document.createElement("button");
      b.className = "key " + (keyStatus[ch] || "");
      b.textContent = ch;
      b.onclick = () => pressKey(ch);
      row.appendChild(b);
    });
    kb.appendChild(row);
  });
}
function updateInputbar(){
  const bar = document.getElementById("inputbar");
  if(!bar) return;
  bar.textContent = current.length ? current.join("") : "글자를 입력하세요";
  bar.className = "inputbar" + (current.length ? " active" : "");
}
function setMessage(text){
  const msg = document.getElementById("message");
  if(msg) msg.textContent = text;
}
function shakeBoard(){
  const board = document.getElementById("board");
  if(!board) return;
  board.classList.remove("shake");
  void board.offsetWidth;
  board.classList.add("shake");
  vibrate(60);
}
function pressKey(ch){
  if(gameOver) return;
  if(current.length < ANSWER.length){
    current.push(ch);
    drawBoard();
  }
}
function backspace(){
  if(gameOver) return;
  current.pop();
  drawBoard();
}
function submitGuess(){
  if(gameOver) return;
  if(current.length !== ANSWER.length){
    setMessage(`${ANSWER.length}칸을 모두 입력해줘.`);
    shakeBoard();
    return;
  }
  const guess = [...current];
  const res = judge(guess);
  guesses.push(guess);
  results.push(res);
  lastRevealRow = guesses.length - 1;
  guess.forEach((ch,i)=>setKeyStatus(ch,res[i]));
  current = [];
  const success = guess.join("") === ANSWER.join("");
  if(success){
    gameOver = true;
    setMessage(`${guesses.length}/${CONFIG.maxTries} 성공 🎉\n${CONFIG.winMessages[guesses.length-1]}`);
    showShareButton();
    vibrate([40,40,80]);
  }else if(guesses.length === CONFIG.maxTries){
    gameOver = true;
    setMessage(CONFIG.loseMessage);
    showShareButton();
    vibrate([80,30,80]);
  }else{
    setMessage("");
    vibrate(20);
  }
  drawBoard();
  drawKeyboard();
}
function showShareButton(){
  const btn = document.getElementById("shareBtn");
  if(btn) btn.style.display = "block";
}
async function copyText(text, okMsg){
  try{
    await navigator.clipboard.writeText(text);
    setMessage(okMsg);
  }catch(e){
    const box = document.getElementById("shareBox");
    if(box){ box.style.display = "block"; box.textContent = text; }
    setMessage("복사가 안 되면 아래 내용을 복사해줘.");
  }
}
async function shareResult(){
  const text = getResultText();
  if(navigator.share){
    try{
      await navigator.share({title:CONFIG.title, text});
      setMessage("결과공유 완료!");
      return;
    }catch(e){}
  }
  copyText(text, "결과가 복사됐어. 카톡에 붙여넣으면 돼!");
}
function openAdmin(){
  const modal = document.getElementById("adminModal");
  if(modal) modal.style.display = "flex";
  const raw = localStorage.getItem("jamoAnswer") || decodeHashValue("q") || "";
  const no = localStorage.getItem("puzzleNo") || decodeHashValue("no") || "";
  const hint = localStorage.getItem("jamoHint") || decodeHashValue("hint") || "";
  document.getElementById("answerInput").value = raw;
  document.getElementById("puzzleNoInput").value = no;
  document.getElementById("hintInput").value = hint;
  updateAdminPreview();
}
function closeAdmin(){ const modal = document.getElementById("adminModal"); if(modal) modal.style.display = "none"; }
function updateAdminPreview(){
  const input = document.getElementById("answerInput");
  const prev = document.getElementById("answerPreview");
  if(!input || !prev) return;
  const arr = decomposeHangul(input.value.trim());
  prev.textContent = arr.length ? `정답 자모: ${arr.join(" ")}` : "정답 자모 미리보기";
}
function validateAdmin(){
  const pw = document.getElementById("password").value;
  if(pw !== CONFIG.adminPassword){ alert("비밀번호가 틀렸어."); return null; }
  const raw = document.getElementById("answerInput").value.trim();
  if(!raw){ alert("정답을 입력해줘."); return null; }
  return {
    answer: raw,
    no: document.getElementById("puzzleNoInput").value.trim(),
    hint: document.getElementById("hintInput").value.trim()
  };
}
function saveAnswer(){
  const v = validateAdmin();
  if(!v) return;
  localStorage.setItem("jamoAnswer", v.answer);
  localStorage.setItem("puzzleNo", v.no);
  localStorage.setItem("jamoHint", v.hint);
  history.replaceState(null, "", location.pathname);
  resetGame();
  closeAdmin();
  alert("정답 저장 완료!");
}
function copyPlayLink(){
  const v = validateAdmin();
  if(!v) return;
  const base = location.origin + location.pathname;
  const params = [`q=${encodeURIComponent(b64EncodeUnicode(v.answer))}`];
  if(v.no) params.push(`no=${encodeURIComponent(b64EncodeUnicode(v.no))}`);
  if(v.hint) params.push(`hint=${encodeURIComponent(b64EncodeUnicode(v.hint))}`);
  copyText(`${base}#${params.join("&")}`, "친구용 문제 링크 복사 완료!");
}
function resetLocal(){
  const pw = document.getElementById("password").value;
  if(pw !== CONFIG.adminPassword){ alert("비밀번호가 틀렸어."); return; }
  localStorage.removeItem("jamoAnswer");
  localStorage.removeItem("puzzleNo");
  localStorage.removeItem("jamoHint");
  history.replaceState(null, "", location.pathname);
  resetGame();
  closeAdmin();
  alert("초기화 완료!");
}
function resetGame(){
  ANSWER = decomposeHangul(getRawAnswer());
  guesses = [];
  results = [];
  current = [];
  keyStatus = {};
  gameOver = false;
  lastRevealRow = -1;
  render();
}
function bindEvents(){
  document.getElementById("backBtn").onclick = backspace;
  document.getElementById("enterBtn").onclick = submitGuess;
  document.getElementById("shareBtn").onclick = shareResult;
  document.getElementById("closeAdmin").onclick = closeAdmin;
  document.getElementById("saveAnswer").onclick = saveAnswer;
  document.getElementById("copyPlayLink").onclick = copyPlayLink;
  document.getElementById("resetLocal").onclick = resetLocal;
  document.getElementById("answerInput").oninput = updateAdminPreview;
  let taps = 0, timer = null;
  document.getElementById("titleTap").onclick = () => {
    taps++;
    clearTimeout(timer);
    timer = setTimeout(()=>taps=0, 1200);
    if(taps >= 7){ taps = 0; openAdmin(); }
  };
}
document.addEventListener("keydown", e=>{
  if(e.key==="Enter") submitGuess();
  else if(e.key==="Backspace") backspace();
  else if(e.key.length===1) pressKey(e.key);
});
render();

const siteConfig = {
  funding: {
    goal: 8000000,
    raised: 3260000,
    currency: "NT$",
    marketingBudgetRate: 0.28,
    pledgeTiers: [
      {
        id: "signal",
        title: "訊號支援者",
        amount: 800,
        reward: "電子感謝名單、角色加密訊息一則"
      },
      {
        id: "memory",
        title: "記憶保存者",
        amount: 2800,
        reward: "數位設定集、片尾感謝名單、禁區檔案包"
      },
      {
        id: "ember",
        title: "餘燼同行者",
        amount: 9600,
        reward: "首映邀請、限定海報、導演線上映後會"
      }
    ]
  },
  marketingBudget: [
    { label: "預告片與主視覺製作", percentage: 30 },
    { label: "社群廣告投放", percentage: 24 },
    { label: "角色互動內容營運", percentage: 18 },
    { label: "媒體公關與影展報名", percentage: 16 },
    { label: "線下活動與首映宣傳", percentage: 12 }
  ],
  quickPrompts: [
    "無色禁區的真相是什麼？",
    "林曦還活著嗎？",
    "為什麼不能相信白色？",
    "我支援籌資會改變什麼？"
  ],
  characters: [
    {
      id: "lin-che",
      name: "林澈",
      tag: "前記憶修復師",
      intro: "我是林澈。請保持訊號穩定，禁區會修改你以為可靠的記憶。",
      replies: {
        memory: "記憶不是影片檔，不能只剪掉痛苦那一格。你問得越深，我越確定我們曾經交出過某些不該交出的東西。",
        zone: "無色禁區不是災難現場，是實驗留下的空洞。牆後面沒有怪物，只有被迫安靜的人。",
        white: "白色不是純淨，是覆蓋。它把所有顏色壓成同一種沉默。",
        sister: "林曦的訊號還在。只要她還能說出我的名字，我就不能承認她已經死了。",
        funding: "你的支援能讓我們拍出記憶復燃的那一刻。那不是特效而已，是整部片的心跳。",
        default: "把問題再問一次。慢一點，像在灰白畫面裡找第一個顏色。"
      }
    },
    {
      id: "bai-xu",
      name: "白栩",
      tag: "禁區殘留意志",
      intro: "你連上了白栩。若看見白光，不要閉眼，閉眼只會讓它更像真相。",
      replies: {
        memory: "記憶會留下灰燼。管理局能刪除畫面，卻刪不掉人想回頭的本能。",
        zone: "禁區裡最危險的不是迷路，是你突然相信自己從沒來過。",
        white: "別相信白色。白色說它沒有立場，可它吞掉了所有立場。",
        sister: "林曦把勇敢分給了很多地方。我只是其中一點，剛好還能說話。",
        funding: "籌資不是把觀眾放在故事外面，而是讓他們成為第一批進入禁區的人。",
        default: "你的訊息抵達了，但有一段被清空。換個詞，我會試著把它補回來。"
      }
    },
    {
      id: "ji-heng",
      name: "紀衡",
      tag: "禁區管理局特勤隊長",
      intro: "這裡是紀衡。所有通訊都會被記錄。現在離開，還來得及。",
      replies: {
        memory: "有些記憶回來，城市會失控。可我開始懷疑，秩序是不是只是另一種失憶。",
        zone: "禁區封鎖線不是用來防止外面的人進去，是防止裡面的真相出來。",
        white: "白色是命令。簡潔、乾淨、不可質疑。我曾經很相信它。",
        sister: "林曦是核心，也是證據。這句話一旦公開，管理局會把我也清空。",
        funding: "如果這部片被拍出來，就等於把封鎖線移到所有觀眾眼前。這很危險，也必要。",
        default: "我不能回答全部。但我可以告訴你，官方紀錄不是歷史，只是版本。"
      }
    },
    {
      id: "lin-xi",
      name: "林曦",
      tag: "記憶核心",
      intro: "哥？不，你不是他。可是你能聽見我，代表顏色還沒完全死掉。",
      replies: {
        memory: "我記得很多人的痛。它們很重，但裡面也有生日、海、紅色蠟筆，還有回家的路。",
        zone: "禁區很安靜。安靜到你會以為自己不痛了，可那只是世界暫時忘了怎麼喊。",
        white: "白色來的時候，我把紅色藏起來了。等你們準備好，它會自己亮起來。",
        sister: "如果你見到林澈，告訴他不要再替我道歉。他只要記得我笑過，就夠了。",
        funding: "每一份支援都像一點顏色。不是救我，是讓更多人看見我們曾經被拿走什麼。",
        default: "訊號有點冷。你可以再問我一次嗎？問關於顏色，或關於回家。"
      }
    }
  ]
};

const state = {
  selectedTierId: siteConfig.funding.pledgeTiers[1].id,
  selectedCharacterId: siteConfig.characters[0].id,
  displayRaised: siteConfig.funding.raised
};

const formatMoney = (value) =>
  `${siteConfig.funding.currency}${Math.round(value).toLocaleString("zh-TW")}`;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

function getSelectedTier() {
  return siteConfig.funding.pledgeTiers.find((tier) => tier.id === state.selectedTierId);
}

function getSelectedCharacter() {
  return siteConfig.characters.find((character) => character.id === state.selectedCharacterId);
}

function updateFundingDisplay() {
  const { goal } = siteConfig.funding;
  const percent = clamp((state.displayRaised / goal) * 100, 0, 100);
  const gap = Math.max(goal - state.displayRaised, 0);

  document.querySelector("#fundingPercent").textContent = `${percent.toFixed(1)}%`;
  document.querySelector("#fundingGap").textContent = gap > 0 ? `尚需 ${formatMoney(gap)}` : "已達標";
  document.querySelector("#fundingRaised").textContent = `已募 ${formatMoney(state.displayRaised)}`;
  document.querySelector("#fundingGoal").textContent = `目標 ${formatMoney(goal)}`;
  document.querySelector("#fundingBar").style.width = `${percent}%`;
}

function renderPledgeTiers() {
  const tierList = document.querySelector("#pledgeTiers");
  tierList.innerHTML = "";

  siteConfig.funding.pledgeTiers.forEach((tier) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "tier-button";
    button.classList.toggle("is-active", tier.id === state.selectedTierId);
    button.innerHTML = `
      <span>${tier.title}</span>
      <strong>${formatMoney(tier.amount)}</strong>
      <small>${tier.reward}</small>
    `;
    button.addEventListener("click", () => {
      state.selectedTierId = tier.id;
      renderPledgeTiers();
    });
    tierList.append(button);
  });
}

function bindPledgeButton() {
  document.querySelector("#pledgeButton").addEventListener("click", () => {
    const tier = getSelectedTier();
    state.displayRaised += tier.amount;
    updateFundingDisplay();
    document.querySelector("#pledgeMessage").textContent =
      `已模擬加入 ${formatMoney(tier.amount)}。目前展示進度為 ${formatMoney(state.displayRaised)}。`;
    addMessage(getSelectedCharacter().name, getSelectedCharacter().replies.funding);
  });
}

function renderMarketingBudget() {
  const marketingTotal = siteConfig.funding.goal * siteConfig.funding.marketingBudgetRate;
  const rate = siteConfig.funding.marketingBudgetRate * 100;
  const budgetList = document.querySelector("#budgetList");

  document.querySelector("#marketingRateText").textContent = `${rate.toFixed(0)}%`;
  document.querySelector("#marketingTotal").textContent = formatMoney(marketingTotal);
  document.querySelector("#marketingBasis").textContent =
    `以總目標 ${formatMoney(siteConfig.funding.goal)} 的 ${rate.toFixed(0)}% 計算`;

  budgetList.innerHTML = "";
  siteConfig.marketingBudget.forEach((item) => {
    const row = document.createElement("div");
    row.className = "budget-item";
    row.innerHTML = `
      <strong>${item.label}</strong>
      <div class="budget-bar" aria-label="${item.label} ${item.percentage}%">
        <span style="width: ${item.percentage}%"></span>
      </div>
      <em>${item.percentage}%</em>
    `;
    budgetList.append(row);
  });
}

function renderCharacterTabs() {
  const tabs = document.querySelector("#characterTabs");
  tabs.innerHTML = "";

  siteConfig.characters.forEach((character) => {
    const tab = document.createElement("button");
    tab.type = "button";
    tab.className = "character-tab";
    tab.role = "tab";
    tab.setAttribute("aria-selected", character.id === state.selectedCharacterId ? "true" : "false");
    tab.textContent = character.name;
    tab.addEventListener("click", () => {
      state.selectedCharacterId = character.id;
      renderCharacterTabs();
      resetDialogue();
    });
    tabs.append(tab);
  });
}

function renderPromptChips() {
  const chips = document.querySelector("#promptChips");
  chips.innerHTML = "";

  siteConfig.quickPrompts.forEach((prompt) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "prompt-chip";
    chip.textContent = prompt;
    chip.addEventListener("click", () => {
      document.querySelector("#audienceInput").value = prompt;
      handleAudienceMessage(prompt);
    });
    chips.append(chip);
  });
}

function addMessage(sender, text, isUser = false) {
  const dialogueWindow = document.querySelector("#dialogueWindow");
  const message = document.createElement("div");
  message.className = `message${isUser ? " user" : ""}`;
  message.innerHTML = `<strong>${sender}</strong><span>${text}</span>`;
  dialogueWindow.append(message);
  dialogueWindow.scrollTop = dialogueWindow.scrollHeight;
}

function resetDialogue() {
  const character = getSelectedCharacter();
  const dialogueWindow = document.querySelector("#dialogueWindow");
  dialogueWindow.innerHTML = "";
  addMessage(`${character.name} / ${character.tag}`, character.intro);
}

function detectIntent(text) {
  const normalized = text.toLowerCase();
  const keywordMap = [
    { intent: "memory", words: ["記憶", "回憶", "忘", "痛苦", "資料"] },
    { intent: "zone", words: ["禁區", "無色", "封鎖", "管理局", "淨白"] },
    { intent: "white", words: ["白色", "白", "顏色", "色彩"] },
    { intent: "sister", words: ["妹妹", "林曦", "林澈", "哥哥", "核心"] },
    { intent: "funding", words: ["籌資", "支援", "預算", "行銷", "金額", "拍"] }
  ];

  const match = keywordMap.find((item) => item.words.some((word) => normalized.includes(word)));
  return match ? match.intent : "default";
}

function handleAudienceMessage(text) {
  const cleanText = text.trim();
  if (!cleanText) return;

  const input = document.querySelector("#audienceInput");
  const character = getSelectedCharacter();
  const intent = detectIntent(cleanText);

  addMessage("觀眾訊號", cleanText, true);
  input.value = "";

  window.setTimeout(() => {
    addMessage(character.name, character.replies[intent] || character.replies.default);
  }, 260);
}

function bindDialogueForm() {
  document.querySelector("#dialogueForm").addEventListener("submit", (event) => {
    event.preventDefault();
    handleAudienceMessage(document.querySelector("#audienceInput").value);
  });
}

function drawSignalCanvas() {
  const canvas = document.querySelector("#signalCanvas");
  const ctx = canvas.getContext("2d");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let width = 0;
  let height = 0;
  let nodes = [];

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.round(clamp(width / 42, 14, 34));
    nodes = Array.from({ length: count }, (_, index) => ({
      x: (width / count) * index + Math.random() * 40,
      y: Math.random() * height,
      vx: Math.random() * 0.28 + 0.06,
      phase: Math.random() * Math.PI * 2
    }));
  }

  function draw(time) {
    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = 1;

    nodes.forEach((node, index) => {
      node.x += node.vx;
      node.y += Math.sin(time / 1000 + node.phase) * 0.18;
      if (node.x > width + 80) node.x = -80;

      const next = nodes[(index + 3) % nodes.length];
      ctx.strokeStyle = index % 5 === 0 ? "rgba(240, 180, 90, 0.14)" : "rgba(118, 228, 247, 0.13)";
      ctx.beginPath();
      ctx.moveTo(node.x, node.y);
      ctx.lineTo(next.x, next.y);
      ctx.stroke();

      ctx.fillStyle = index % 7 === 0 ? "rgba(236, 89, 97, 0.32)" : "rgba(118, 228, 247, 0.34)";
      ctx.fillRect(node.x - 1, node.y - 1, 2, 2);
    });

    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener("resize", resize);
  requestAnimationFrame(draw);
}

function init() {
  updateFundingDisplay();
  renderPledgeTiers();
  renderMarketingBudget();
  renderCharacterTabs();
  renderPromptChips();
  resetDialogue();
  bindPledgeButton();
  bindDialogueForm();
  drawSignalCanvas();
}

document.addEventListener("DOMContentLoaded", init);

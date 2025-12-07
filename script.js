// ----- แสดงหน้า -----
function showPage(id) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    const page = document.getElementById(id);
    if (page) {
      page.classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
      localStorage.setItem("currentPage", id);
    }
  
    document.querySelectorAll(".menu-item").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.target === id);
    });
  }
  
  // ----- Dark / Light Mode -----
  function applyTheme() {
    const saved = localStorage.getItem("themeMode") || "dark";
    const body = document.body;
    const toggleBtn = document.getElementById("themeToggle");
    if (saved === "light") {
      body.classList.add("light");
      toggleBtn.textContent = "🌙 โหมดมืด";
    } else {
      body.classList.remove("light");
      toggleBtn.textContent = "☀ โหมดสว่าง";
    }
  }
  
  function toggleTheme() {
    const body = document.body;
    const toggleBtn = document.getElementById("themeToggle");
    const isLight = body.classList.toggle("light");
    localStorage.setItem("themeMode", isLight ? "light" : "dark");
    toggleBtn.textContent = isLight ? "🌙 โหมดมืด" : "☀ โหมดสว่าง";
  }
  
  // ----- Intro Typing -----
  function typeIntroText() {
    const el = document.getElementById("introMessage");
    if (!el) return;
    const name = localStorage.getItem("studentName") || "เพื่อน";
    const text = `ยินดีต้อนรับ ${name} เข้าสู่คู่มือใช้ ChatGPT เป็นผู้ช่วยเรียน ไม่ใช่เครื่องลอกการบ้าน 💡`;
    let i = 0;
    function type() {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
        setTimeout(type, 25);
      }
    }
    type();
  }
  
  // ----- Save Name -----
  function saveName() {
    const input = document.getElementById("studentName");
    if (!input) return;
    const name = input.value.trim() || "เพื่อน";
    localStorage.setItem("studentName", name);
    document.getElementById("introMessage").textContent = "";
    typeIntroText();
  }
  
  // ----- Copy Prompt -----
  function copyPrompt(btn) {
    const box = btn.closest(".code-box");
    const textEl = box.querySelector(".prompt-text");
    const text = textEl ? textEl.innerText.trim() : "";
    navigator.clipboard.writeText(text).then(() => {
      btn.textContent = "คัดลอกแล้ว ✓";
      setTimeout(() => { btn.textContent = "คัดลอก"; }, 1500);
    }).catch(() => {
      alert("คัดลอกไม่สำเร็จ ให้ลองกดค้างแล้วเลือกคัดลอกเองนะ");
    });
  }
  
  // ----- Demo Chat (ไม่ต่อเน็ต, จำลอง) -----
  function fakeAIReply(msg) {
    const text = msg.toLowerCase();
    if (text.includes("สรุป") || text.includes("บทเรียน")) {
      return "ลองเริ่มจากให้ฉันสรุปหัวข้อย่อยก่อน แล้วค่อยถามจุดที่ไม่เข้าใจเพิ่มทีละข้อ 😊";
    }
    if (text.includes("สอบ") || text.includes("ติว")) {
      return "เราลองทำแบบติวเตอร์กันไหม? พิมพ์หัวข้อบทเรียน แล้วฉันจะถามคำถามให้ทีละข้อ 🎯";
    }
    if (text.includes("ครู") || text.includes("ใบงาน")) {
      return "สำหรับครู ลองให้ฉันช่วยออกใบงานหรือกำหนดการสอน 1 คาบ พร้อมผลลัพธ์การเรียนรู้ดูได้เลยค่ะ 👩‍🏫";
    }
    return "ขอบคุณที่พิมพ์มาคุยกัน ✨ ลองเจาะจงมากขึ้น เช่น 'ช่วยสรุป...', 'ช่วยอธิบาย...', 'ช่วยออกข้อสอบ...' ดูนะ";
  }
  
  function sendDemoChat() {
    const input = document.getElementById("chatDemoInput");
    const log = document.getElementById("chatDemoLog");
    if (!input || !log) return;
  
    const text = input.value.trim();
    if (!text) return;
  
    // แสดงข้อความผู้ใช้
    const userDiv = document.createElement("div");
    userDiv.className = "chat-msg user";
    userDiv.textContent = "คุณ: " + text;
    log.appendChild(userDiv);
  
    // ตอบกลับจำลอง
    const aiDiv = document.createElement("div");
    aiDiv.className = "chat-msg ai";
    aiDiv.textContent = "AI: " + fakeAIReply(text);
    log.appendChild(aiDiv);
  
    log.scrollTop = log.scrollHeight;
    input.value = "";
  }
  
  // ----- Mini Quiz -----
  const miniQuizQuestions = [
    {
      q: "ChatGPT ควรถูกใช้เป็นอะไร?",
      options: [
        "ผู้ช่วยคิดและอธิบายสิ่งที่ไม่เข้าใจ",
        "เครื่องลอกการบ้านโดยไม่ต้องอ่าน",
        "ที่เก็บข้อมูลส่วนตัว"
      ],
      correct: 0
    },
    {
      q: "ถ้า ChatGPT ตอบอะไรมา เราควรทำอย่างไร?",
      options: [
        "เชื่อทันทีทุกคำ",
        "ตรวจสอบกับแหล่งอื่นหรือถามครูเพิ่ม",
        "ก็อปทั้งหมดไปส่งเลย"
      ],
      correct: 1
    },
    {
      q: "ข้อมูลแบบไหนที่ไม่ควรกรอกลงใน ChatGPT?",
      options: [
        "คำถามวิทยาศาสตร์",
        "เลขบัตรประชาชนและที่อยู่จริง",
        "โจทย์คณิตที่ไม่เข้าใจ"
      ],
      correct: 1
    }
  ];
  
  function initMiniQuiz() {
    const container = document.getElementById("miniQuiz");
    if (!container) return;
  
    let html = "";
    miniQuizQuestions.forEach((item, idx) => {
      html += `<p class="mini-quiz-question">${idx + 1}. ${item.q}</p>`;
      item.options.forEach((opt, i) => {
        html += `
          <div>
            <input type="radio" name="q${idx}" value="${i}">
            <span class="mini-quiz-option">${opt}</span>
          </div>
        `;
      });
    });
    container.innerHTML = html;
  
    const best = localStorage.getItem("miniQuizBest") || 0;
    const bestEl = document.getElementById("miniQuizBest");
    if (bestEl) {
      bestEl.textContent = `คะแนนสูงสุดที่เคยทำได้: ${best} / ${miniQuizQuestions.length}`;
    }
  }
  
  function checkMiniQuiz() {
    let score = 0;
    miniQuizQuestions.forEach((item, idx) => {
      const selected = document.querySelector(`input[name="q${idx}"]:checked`);
      if (selected && parseInt(selected.value) === item.correct) {
        score++;
      }
    });
    const resultEl = document.getElementById("miniQuizResult");
    if (resultEl) {
      resultEl.textContent = `คุณได้ ${score} / ${miniQuizQuestions.length} ข้อ 🎉`;
    }
  
    const bestKey = "miniQuizBest";
    const oldBest = parseInt(localStorage.getItem(bestKey) || "0", 10);
    if (score > oldBest) {
      localStorage.setItem(bestKey, score);
    }
    const bestEl = document.getElementById("miniQuizBest");
    if (bestEl) {
      const best = Math.max(score, oldBest);
      bestEl.textContent = `คะแนนสูงสุดที่เคยทำได้: ${best} / ${miniQuizQuestions.length}`;
    }
  }
  
  // ----- INIT -----
  document.addEventListener("DOMContentLoaded", () => {
    // เมนู
    document.querySelectorAll(".menu-item").forEach(btn => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.target;
        if (target) showPage(target);
      });
    });
  
    // ธีม
    applyTheme();
    const themeBtn = document.getElementById("themeToggle");
    if (themeBtn) themeBtn.addEventListener("click", toggleTheme);
  
    // หน้าแรกล่าสุด
    const savedPage = localStorage.getItem("currentPage") || "home";
    showPage(savedPage);
  
    // Intro text
    typeIntroText();
  
    // Quiz
    initMiniQuiz();
  });
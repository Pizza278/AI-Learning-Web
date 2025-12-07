// ===== Theme toggle =====
const themeToggleBtn = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("ai-guide-theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark-theme");
  themeToggleBtn.textContent = "🌙";
} else {
  document.body.classList.remove("dark-theme");
  themeToggleBtn.textContent = "🌞";
}
themeToggleBtn.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-theme");
  themeToggleBtn.textContent = isDark ? "🌙" : "🌞";
  localStorage.setItem("ai-guide-theme", isDark ? "dark" : "light");
});

// ===== Scroll to section by data-target =====
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top, behavior: "smooth" });
}
document.querySelectorAll("[data-target]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-target");
    scrollToSection(target);
  });
});

// ===== Name form =====
const nameForm = document.getElementById("nameForm");
const usernameInput = document.getElementById("username");
const welcomeMessage = document.getElementById("welcomeMessage");

nameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = usernameInput.value.trim();
  if (!name) {
    welcomeMessage.textContent = "ลองใส่ชื่อเล่นสั้น ๆ ก่อนนะ 🙂";
    return;
  }
  welcomeMessage.textContent =
    "สวัสดี " +
    name +
    " 👋 ลองเริ่มอ่านหัวข้อ “เริ่มต้นใช้” และ “Prompt พื้นฐาน” ได้เลย!";
  scrollToSection("basics");
});

// ===== Accordion =====
const accordionItems = document.querySelectorAll(".accordion-item");
accordionItems.forEach((item) => {
  const header = item.querySelector(".accordion-header");
  const panel = item.querySelector(".accordion-panel");
  header.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");
    accordionItems.forEach((it) => {
      it.classList.remove("open");
      const p = it.querySelector(".accordion-panel");
      if (p) p.style.maxHeight = null;
    });
    if (!isOpen) {
      item.classList.add("open");
      if (panel) {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    }
  });
});

// ===== Quiz =====
const quizForm = document.getElementById("quizForm");
const quizResult = document.getElementById("quizResult");
const quizAnswers = {
  q1: "b",
  q2: "b",
  q3: "c",
  q4: "b",
  q5: "b",
};

if (quizForm) {
  quizForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let score = 0;
    const total = Object.keys(quizAnswers).length;

    quizForm.querySelectorAll(".quiz-item").forEach((item) => {
      item.classList.remove("correct", "incorrect");
    });

    Object.entries(quizAnswers).forEach(([q, correct], idx) => {
      const item = quizForm.querySelectorAll(".quiz-item")[idx];
      const checked = quizForm.querySelector(`input[name="${q}"]:checked`);
      if (!checked) {
        item.classList.add("incorrect");
        return;
      }
      if (checked.value === correct) {
        score++;
        item.classList.add("correct");
      } else {
        item.classList.add("incorrect");
      }
    });

    let msg = `คุณได้ ${score} / ${total} ข้อ `;
    if (score === total) {
      msg += "เยี่ยมมาก! พร้อมใช้ ChatGPT อย่างมีสติแล้ว 🎉";
    } else if (score >= 3) {
      msg += "ดีมาก! หากทบทวนหัวข้อด้านบนอีกนิดจะยิ่งแม่นขึ้น 💪";
    } else {
      msg += "ลองย้อนกลับไปอ่านหัวข้อ “เริ่มต้นใช้” และ “Prompt พื้นฐาน” อีกครั้งนะ 😊";
    }
    quizResult.textContent = msg;
  });
}

// ===== Survey =====
const surveyForm = document.getElementById("surveyForm");
const surveyResult = document.getElementById("surveyResult");

if (surveyForm) {
  surveyForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const questionNames = [
      "s1","s2","s3","s4","s5","s6",
      "s7","s8","s9","s10","s11","s12",
      "s13","s14","s15"
    ];

    let totalScore = 0;
    let allAnswered = true;

    questionNames.forEach((q) => {
      const selected = surveyForm.querySelector(`input[name="${q}"]:checked`);
      if (!selected) {
        allAnswered = false;
        return;
      }
      totalScore += parseInt(selected.value, 10);
    });

    if (!allAnswered) {
      surveyResult.textContent = "กรุณาตอบแบบประเมินให้ครบทุกข้อ 🙏";
      return;
    }

    const maxScore = questionNames.length * 5;
    const avgScore = (totalScore / questionNames.length).toFixed(2);

    const suggestion = document.getElementById("suggestion").value.trim();

    let text = `คะแนนรวมที่คุณให้คือ ${totalScore} จาก ${maxScore} คะแนน (เฉลี่ย ${avgScore} จาก 5)`;
    if (suggestion) {
      text += ` • ข้อเสนอแนะ: ${suggestion}`;
    }
    surveyResult.textContent = text;

    const membersBox = document.getElementById("surveyMembers");
    if (membersBox) {
      membersBox.style.display = "block";
    }

    scrollToSection("survey");
  });
}

// ===== Scroll top button =====
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
  if (!scrollTopBtn) return;
  if (window.scrollY > 320) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});
if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
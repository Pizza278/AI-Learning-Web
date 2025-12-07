// ===============================
// สลับโหมดมืด / สว่าง
// ===============================
const themeToggleBtn = document.getElementById("themeToggle");

// โหลดธีมจาก localStorage ถ้ามี
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

// ===============================
// ปุ่มเมนู เลื่อนหน้าไปยัง section
// ===============================
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

// ===============================
// ฟอร์มชื่อผู้ใช้ & ข้อความต้อนรับ
// ===============================
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

  welcomeMessage.textContent = `สวัสดี ${name} 👋 พร้อมเรียนรู้การใช้ ChatGPT แบบมือโปรแล้วใช่ไหม? ลองเริ่มจากหัวข้อ “เริ่มต้นใช้” ด้านล่างได้เลย`;
  scrollToSection("basics");
});

// ===============================
// Accordion ทริกขั้นสูง
// ===============================
const accordionItems = document.querySelectorAll(".accordion-item");

accordionItems.forEach((item) => {
  const header = item.querySelector(".accordion-header");
  const panel = item.querySelector(".accordion-panel");

  header.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");

    // ปิดทุกอันก่อน
    accordionItems.forEach((it) => {
      it.classList.remove("open");
      const p = it.querySelector(".accordion-panel");
      if (p) p.style.maxHeight = null;
    });

    // ถ้าอันนี้ยังไม่เปิด ให้เปิด
    if (!isOpen) {
      item.classList.add("open");
      if (panel) {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    }
  });
});

// ===============================
// แบบทดสอบ
// ===============================
const quizForm = document.getElementById("quizForm");
const quizResult = document.getElementById("quizResult");

// เฉลย
const answers = {
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
    let total = Object.keys(answers).length;

    // ล้างสีเดิม
    quizForm.querySelectorAll(".quiz-item").forEach((item) => {
      item.classList.remove("correct", "incorrect");
    });

    Object.entries(answers).forEach(([question, correctValue], index) => {
      const item = quizForm.querySelectorAll(".quiz-item")[index];
      const checked = quizForm.querySelector(
        `input[name="${question}"]:checked`
      );

      if (!checked) {
        // ไม่ตอบ
        item.classList.add("incorrect");
        return;
      }

      if (checked.value === correctValue) {
        score++;
        item.classList.add("correct");
      } else {
        item.classList.add("incorrect");
      }
    });

    let message = `คุณได้ ${score} / ${total} ข้อ `;
    if (score === total) {
      message += "สุดยอด! พร้อมใช้ ChatGPT อย่างมีสติแล้ว 🎉";
    } else if (score >= 3) {
      message += "ดีมาก! ถ้าย้อนกลับไปอ่านหัวข้อด้านบนอีกนิดจะยิ่งเทพขึ้น 💪";
    } else {
      message += "ไม่เป็นไร ลองกลับไปอ่านหัวข้อ “เริ่มต้นใช้” และ “Prompt พื้นฐาน” อีกครั้งนะ 😊";
    }

    quizResult.textContent = message;
  });
}

// ===============================
// ปุ่มเลื่อนขึ้นด้านบน
// ===============================
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
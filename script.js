function showPage(page) {
    document.querySelectorAll(".page").forEach(p => p.style.display = "none");
    document.getElementById(page).style.display = "block";
}

// ============ ระบบถามตอบ AI ============
async function callAI() {
    const input = document.getElementById("userInput").value;
    const role = document.getElementById("roleSelect").value;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            model: "mixtral-8x7b-32768",
            messages: [{ role: "user", content: role + " : " + input }]
        })
    });

    const data = await response.json();
    document.getElementById("reply").innerText = data.choices[0].message.content;
}

// ============ แบบทดสอบ ============
const questions = [
    {
        q: "AI คืออะไร?",
        a: ["ระบบที่ทำงานเหมือนสมองมนุษย์", "เป็นเกม", "เป็นชื่ออาหาร"],
        correct: 0
    },
    {
        q: "ChatGPT ทำอะไรได้?",
        a: ["ตอบคำถาม พูดคุย", "เต้น Cover", "ขับเครื่องบิน"],
        correct: 0
    }
];

let indexQ = 0;

function loadQuestion() {
    document.getElementById("questionText").innerText = questions[indexQ].q;
    document.getElementById("options").innerHTML = "";

    questions[indexQ].a.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(i);
        document.getElementById("options").appendChild(btn);
    });
}

function checkAnswer(i) {
    const result = document.getElementById("result");
    result.innerText = i === questions[indexQ].correct ? "ถูกต้อง 🎉" : "ยังไม่ใช่ ลองอีกครั้ง 😉";
}

function nextQuestion() {
    indexQ = (indexQ + 1) % questions.length;
    loadQuestion();
}

loadQuestion();
// دالة تسجيل الدخول
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const loginError = document.getElementById("loginError");

    // تحقق من صحة البريد الإلكتروني وكلمة المرور
    if (email === "User" && password === "123") {
        loginError.textContent = "";
        showPage("assessmentPage");
        currentQuestion = 1; // إعادة تعيين السؤال الحالي إلى الأول
        showQuestion(currentQuestion); // عرض السؤال الأول فور الانتقال
    } else {
        loginError.textContent = "البريد الإلكتروني أو كلمة المرور غير صحيحة";
    }
}

// دالة لإظهار الصفحة المطلوبة
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

// تفعيل زر Enter للتسجيل
document.addEventListener('keydown', function(event) {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    if (event.key === "Enter") {
        if (document.getElementById("loginPage").classList.contains("active")) {
            if (document.activeElement === emailInput) {
                passwordInput.focus();
            } else {
                login();
            }
        }
    }
});

// تفعيل زر Enter للتنقل بين الأسئلة
document.addEventListener('keydown', function(event) {
    if (event.key === "Enter" && document.getElementById("assessmentPage").classList.contains("active")) {
        nextQuestion();
    }
});

// إعداد الأسئلة وإظهارها واحدة تلو الأخرى
let currentQuestion = 1;
const totalQuestions = 9;

function showQuestion(questionNumber) {
    const questions = document.querySelectorAll(".question");
    questions.forEach((question, index) => {
        question.style.display = index + 1 === questionNumber ? "block" : "none";
    });
    currentQuestion = questionNumber;
}

function nextQuestion() {
    const answer = document.querySelector(`input[name="q${currentQuestion}"]:checked`);
    if (!answer) {
        alert("يرجى الإجابة عن السؤال الحالي.");
        return;
    }

    if (currentQuestion < totalQuestions) {
        showQuestion(currentQuestion + 1);
    } else {
        calculateResult();
    }
}

// دالة لحساب نتيجة التقييم
function calculateResult() {
    let score = 0;
    for (let i = 1; i <= totalQuestions; i++) {
        const answer = document.querySelector(`input[name="q${i}"]:checked`);
        if (answer) {
            score += parseInt(answer.value);
        } else {
            alert("يرجى الإجابة عن جميع الأسئلة.");
            return;
        }
    }

    let resultMessage;
    let advice = document.getElementById("advice");
    let arshadniLink = document.getElementById("arshadniLink");
    if (score <= 4) {
        resultMessage = "لا يوجد اكتئاب.";
        advice.style.display = "none";
        arshadniLink.style.display = "none";
    } else if (score <= 9) {
        resultMessage = "اكتئاب بسيط.";
        advice.style.display = "none";
        arshadniLink.style.display = "none";
    } else if (score <= 14) {
        resultMessage = "اكتئاب متوسط.";
        advice.style.display = "block";
        arshadniLink.style.display = "block";
    } else if (score <= 19) {
        resultMessage = "اكتئاب متوسط إلى شديد.";
        advice.style.display = "block";
        arshadniLink.style.display = "block";
    } else {
        resultMessage = "اكتئاب شديد.";
        advice.style.display = "block";
        arshadniLink.style.display = "block";
    }

    document.getElementById("resultMessage").textContent = `النتيجة: ${resultMessage}`;
    showPage("resultPage");
}

// دالة لإعادة التقييم
function restart() {
    showPage("assessmentPage");
    currentQuestion = 1; // إعادة تعيين السؤال الأول عند إعادة التقييم
    showQuestion(currentQuestion);
}

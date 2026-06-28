document.addEventListener('DOMContentLoaded', () => {
initTheme();
initStats();
initNavbar();
initCourseModal();
initCalculator();
initTutorSlider();
initBookingForm();
initFaqAccordion();
initTestimonials();
initBlog();
initAIChatbot();
});function initStats() {
fetch('data/stats.json')
.then(res => res.json())
.then(data => {
const studentsEl = document.getElementById('stat-students');
const tutorsEl = document.getElementById('stat-tutors');
const ratingEl = document.getElementById('stat-rating');
const studyingEl = document.getElementById('stat-studying');
if (studentsEl && data.activeLearners) studentsEl.textContent = data.activeLearners;
if (tutorsEl && data.certifiedSheikhs) tutorsEl.textContent = data.certifiedSheikhs;
if (ratingEl && data.trustpilotRating) ratingEl.textContent = data.trustpilotRating;
if (studyingEl && data.studyingRightNow) studyingEl.textContent = data.studyingRightNow;
})
.catch(err => console.log('Error loading stats from data/stats.json, using static values:', err));
}function initTheme() {
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;const savedTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);themeToggle.addEventListener('click', () => {
const currentTheme = body.getAttribute('data-theme');
const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
body.setAttribute('data-theme', newTheme);
localStorage.setItem('theme', newTheme);
updateThemeIcon(newTheme);
});
}function updateThemeIcon(theme) {
const icon = document.querySelector('#theme-toggle i');
if (theme === 'dark') {
icon.className = 'fa-solid fa-sun';
} else {
icon.className = 'fa-solid fa-moon';
}
}function initNavbar() {
const header = document.getElementById('header');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');const sections = document.querySelectorAll('section');
const observerOptions = {
root: null,
rootMargin: '-120px 0px -60% 0px',
threshold: 0
};const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
const id = entry.target.getAttribute('id');
navLinks.forEach(link => {
if (link.getAttribute('href').slice(1) === id) {
link.classList.add('active');
} else {
link.classList.remove('active');
}
});
}
});
}, observerOptions);sections.forEach(section => observer.observe(section));hamburger.addEventListener('click', () => {
const isActive = navMenu.classList.toggle('active');
hamburger.classList.toggle('active');
hamburger.setAttribute('aria-expanded', isActive ? 'true' : 'false');const spans = hamburger.querySelectorAll('span');
if (isActive) {
spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
spans[1].style.opacity = '0';
spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
} else {
spans[0].style.transform = 'none';
spans[1].style.opacity = '1';
spans[2].style.transform = 'none';
}
});navLinks.forEach(link => {
link.addEventListener('click', () => {
navMenu.classList.remove('active');
hamburger.classList.remove('active');
hamburger.setAttribute('aria-expanded', 'false');const spans = hamburger.querySelectorAll('span');
spans[0].style.transform = 'none';
spans[1].style.opacity = '1';
spans[2].style.transform = 'none';
});
});
}const curriculumData = {
qaida: {
tag: "Beginner Course",
title: "Noorani Qaida Syllabus",
steps: [
{ num: "01", name: "Alphabet Alphabets & Phonetics", desc: "Learning singular Arabic letters, their correct exit points (Makharij), and correct articulation." },
{ num: "02", name: "Vowels (Harakaat)", desc: "Understanding the short vowels: Fathah, Kasrah, and Dammah, and their sound durations." },
{ num: "03", name: "Joining Letters", desc: "Learning how Arabic letters change shape in the beginning, middle, and end of words." },
{ num: "04", name: "Tanween & Sukoon", desc: "Introduction to double vowels (Nunation) and the silence mark (Sukoon) rules." },
{ num: "05", name: "Madd Rules (Elongations)", desc: "Mastering long vowels and basic stretching of Quranic sounds (2 to 6 beats)." }
]
},
tajweed: {
tag: "Intermediate Course",
title: "Quran Recitation with Tajweed Rules",
steps: [
{ num: "01", name: "Makharij Al-Huroof", desc: "Detailed analysis of the 17 articulation points in the throat, tongue, lips, and nose." },
{ num: "02", name: "Noon Sakinah & Tanween", desc: "Mastering the four primary rules: Izhar (Clarification), Idgham (Merging), Iqilab (Conversion), and Ikhfa (Hiding)." },
{ num: "03", name: "Meem Sakinah Rules", desc: "Pronunciation guidelines for Izhar Shafawi, Idgham Shafawi, and Ikhfa Shafawi." },
{ num: "04", name: "Qalqalah (Echoing)", desc: "Perfecting the echoing sound of the five letters of Qalqalah (Qaf, Taa, Baa, Jeem, Dal)." },
{ num: "05", name: "Rules of Waqf (Stopping)", desc: "Knowing where to pause, stop, and continue recitation without altering the divine meaning." }
]
},
hifz: {
tag: "Advanced Course",
title: "Structured Memorization (Hifz)",
steps: [
{ num: "01", name: "Assessment & Foundation", desc: "Evaluating reading fluency and creating a personalized daily memorization plan." },
{ num: "02", name: "Juz 30 (Amma) Goal", desc: "Starting memorization from the shorter surahs, building memory strength and confidence." },
{ num: "03", name: "Daily Revision Loop (Sabaq)", desc: "Learning the standard 3-part method: New lesson (Sabaq), recent revision (Sabqi), and old revision (Manzil)." },
{ num: "04", name: "Active Retention Techniques", desc: "Using mental triggers, audio loops, and visual layouts to lock verses in long-term memory." },
{ num: "05", name: "Ijazah Path & Review", desc: "Full continuous recitation of the Quran from memory to receive a registered Hifz Ijazah." }
]
},
translation: {
tag: "All Levels Course",
title: "Word-by-Word Quran Translation Syllabus",
steps: [
{ num: "01", name: "High-Frequency Vocabulary", desc: "Master the 300 most common words that make up 70% of the Quranic text." },
{ num: "02", name: "Arabic Root Word Analysis", desc: "Learn to identify three-letter root verbs and derive multiple complex meanings." },
{ num: "03", name: "Grammatical Construction", desc: "Recognize noun/verb indicators, pronouns, and basic sentence structures in Arabic." },
{ num: "04", name: "Literal vs. Contextual Meaning", desc: "Understand the difference between direct word translation and idiomatic Quranic meaning." },
{ num: "05", name: "Active Translation Practice", desc: "Translate selected short Surahs independently using our root word matrices." }
]
},
tafsir: {
tag: "Advanced Course",
title: "Quranic Tafsir & Exegesis Syllabus",
steps: [
{ num: "01", name: "Principles of Tafsir (Usul al-Tafsir)", desc: "Understand the methodologies, sources, and rules utilized by classical mufassireen." },
{ num: "02", name: "Asbab al-Nuzul (Reasons for Revelation)", desc: "Study the historical background and circumstances under which specific verses were revealed." },
{ num: "03", name: "Linguistic & Rhetorical Tafsir", desc: "Analyze the eloquence, word choice, and unique literary structures of Quranic prose." },
{ num: "04", name: "Thematic Tafsir (Mawdu'i)", desc: "Trace specific themes (e.g., justice, patience, covenant) across different Surahs." },
{ num: "05", name: "Spiritual & Modern Lessons", desc: "Extract timeless moral, legal, and spiritual applications for contemporary life." }
]
}
};function initCourseModal() {
const modal = document.getElementById('curriculum-modal');
const closeBtn = document.getElementById('modal-close');
const modalTag = document.getElementById('modal-course-tag');
const modalTitle = document.getElementById('modal-course-title');
const modalBody = document.getElementById('modal-course-body');
const triggerBtns = document.querySelectorAll('.btn-curriculum');triggerBtns.forEach(btn => {
btn.addEventListener('click', () => {
const courseKey = btn.getAttribute('data-course');
const data = curriculumData[courseKey];
if (data) {
modalTag.textContent = data.tag;
modalTitle.textContent = data.title;
let htmlList = '<div class="modal-curriculum-list">';
data.steps.forEach(step => {
htmlList += `
<div class="curriculum-step">
<div class="step-num">${step.num}</div>
<div class="step-info">
<h4>${step.name}</h4>
<p>${step.desc}</p>
</div>
</div>
`;
});
htmlList += '</div>';
modalBody.innerHTML = htmlList;
modal.classList.add('active');
}
});
});closeBtn.addEventListener('click', () => {
modal.classList.remove('active');
});modal.addEventListener('click', (e) => {
if (e.target === modal) {
modal.classList.remove('active');
}
});
}function initCalculator() {
const classesSlider = document.getElementById('classes-per-week');
const classesBubble = document.getElementById('classes-bubble');
const durationBtns = document.querySelectorAll('[data-duration]');
const tutorTypeBtns = document.querySelectorAll('[data-tutor-type]');
const studentsBtns = document.querySelectorAll('[data-students]');
const priceDisplay = document.getElementById('calc-price-display');
const costPerLesson = document.getElementById('receipt-cost-per-lesson');
const totalLessons = document.getElementById('receipt-total-lessons');
const summaryText = document.getElementById('receipt-summary-text');
const discountLine = document.getElementById('receipt-discount-line');
const discountValue = document.getElementById('receipt-discount-value');
let classesPerWeek = parseInt(classesSlider.value);
let classDuration = 30;
let tutorType = 'standard';
let numStudents = 1;const baseRates = {
standard: 4.38,
senior: 6.25,
ijazah: 8.75
};const discountRates = {
1: 0,
2: 0.15,
3: 0.25,
4: 0.35
};const promoDiscountPercent = 0.20;function updatePricing() {
classesBubble.textContent = `${classesPerWeek} Class${classesPerWeek > 1 ? 'es' : ''} / wk`;const monthlyLessons = Math.round(classesPerWeek * 4.33);
totalLessons.textContent = `${monthlyLessons} classes`;let durationMultiplier = 1;
if (classDuration === 45) durationMultiplier = 1.35;
if (classDuration === 60) durationMultiplier = 1.70;const normalRatePerLesson = baseRates[tutorType] * durationMultiplier;
const discountedRatePerLesson = normalRatePerLesson * (1 - promoDiscountPercent);const subtotalPriceNormal = Math.round(normalRatePerLesson * monthlyLessons) * numStudents;
const subtotalPriceDiscounted = Math.round(discountedRatePerLesson * monthlyLessons) * numStudents;const familyDiscountPercent = discountRates[numStudents];
const familyDiscountAmount = Math.round(subtotalPriceDiscounted * familyDiscountPercent);
const finalMonthlyPrice = subtotalPriceDiscounted - familyDiscountAmount;priceDisplay.innerHTML = `<span class="original-price">$${subtotalPriceNormal}</span>$${finalMonthlyPrice}<span>/mo</span>`;
costPerLesson.innerHTML = `<span style="text-decoration: line-through; opacity: 0.5; font-size: 0.85em; font-weight: 500; margin-right: 0.4rem;">$${normalRatePerLesson.toFixed(2)}</span>$${discountedRatePerLesson.toFixed(2)}`;if (familyDiscountPercent > 0) {
discountValue.textContent = `-${familyDiscountPercent * 100}% (-$${familyDiscountAmount}.00)`;
discountLine.style.display = 'flex';
} else {
discountLine.style.display = 'none';
}
const tutorNames = {
standard: "Standard Instructor",
senior: "Senior Sheikh",
ijazah: "Ijazah Specialist"
};
const studentLabel = numStudents === 1 ? "1 Student" : `${numStudents} Students`;
summaryText.textContent = `${classesPerWeek} lessons/week (${classDuration} mins, ${tutorNames[tutorType]}) - ${studentLabel}`;
}classesSlider.addEventListener('input', (e) => {
classesPerWeek = parseInt(e.target.value);
updatePricing();
});durationBtns.forEach(btn => {
btn.addEventListener('click', () => {
durationBtns.forEach(b => {
b.classList.remove('active');
b.setAttribute('aria-checked', 'false');
});
btn.classList.add('active');
btn.setAttribute('aria-checked', 'true');
classDuration = parseInt(btn.getAttribute('data-duration'));
updatePricing();
});
});tutorTypeBtns.forEach(btn => {
btn.addEventListener('click', () => {
tutorTypeBtns.forEach(b => {
b.classList.remove('active');
b.setAttribute('aria-checked', 'false');
});
btn.classList.add('active');
btn.setAttribute('aria-checked', 'true');
tutorType = btn.getAttribute('data-tutor-type');
updatePricing();
});
});studentsBtns.forEach(btn => {
btn.addEventListener('click', () => {
studentsBtns.forEach(b => {
b.classList.remove('active');
b.setAttribute('aria-checked', 'false');
});
btn.classList.add('active');
btn.setAttribute('aria-checked', 'true');
numStudents = parseInt(btn.getAttribute('data-students'));
updatePricing();
});
});updatePricing();
}function initTutorSlider() {
const slides = document.querySelectorAll('.tutor-slide');
const prevBtn = document.getElementById('tutor-prev-btn');
const nextBtn = document.getElementById('tutor-next-btn');
const dots = document.querySelectorAll('#tutor-dots .slide-dot');
const audioButtons = document.querySelectorAll('.tutor-audio-btn');
let currentSlide = 0;
let isTutorAudioPlaying = false;
let tutorSynthTimeout = null;function showSlide(index) {
slides.forEach(s => s.style.display = 'none');
dots.forEach(d => {
d.classList.remove('active');
d.setAttribute('aria-current', 'false');
});
slides[index].style.display = 'grid';
dots[index].classList.add('active');
dots[index].setAttribute('aria-current', 'true');
currentSlide = index;
}nextBtn.addEventListener('click', () => {
let nextIndex = (currentSlide + 1) % slides.length;
showSlide(nextIndex);
});prevBtn.addEventListener('click', () => {
let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
showSlide(prevIndex);
});dots.forEach(dot => {
dot.addEventListener('click', () => {
const idx = parseInt(dot.getAttribute('data-index'));
showSlide(idx);
});
});function playMelodiousRecitation(type) {
if (!audioCtx) {
audioCtx = new (window.AudioContext || window.webkitAudioContext)();
}
if (audioCtx.state === 'suspended') {
audioCtx.resume();
}
isTutorAudioPlaying = true;
const now = audioCtx.currentTime;const chordRoots = {
tutor1: [196.00, 293.66, 392.00, 493.88],
tutor2: [220.00, 329.63, 440.00, 523.25],
tutor3: [174.61, 261.63, 349.23, 440.00]
};
const roots = chordRoots[type] || chordRoots.tutor1;
roots.forEach((freq, idx) => {const delay = idx * 0.45;
const osc = audioCtx.createOscillator();
const gainNode = audioCtx.createGain();
osc.type = 'sine';
osc.frequency.setValueAtTime(freq, now + delay);gainNode.gain.setValueAtTime(0, now + delay);
gainNode.gain.linearRampToValueAtTime(0.12, now + delay + 0.8);
gainNode.gain.exponentialRampToValueAtTime(0.0001, now + delay + 4);
osc.connect(gainNode);
gainNode.connect(audioCtx.destination);
osc.start(now + delay);
osc.stop(now + delay + 4);
});
}audioButtons.forEach(btn => {
btn.addEventListener('click', () => {
const audioId = btn.getAttribute('data-audio-id');
if (isTutorAudioPlaying) {
isTutorAudioPlaying = false;
btn.innerHTML = '<i class="fa-solid fa-volume-high"></i> Listen to Recitation Demo';
if (tutorSynthTimeout) clearTimeout(tutorSynthTimeout);
} else {
btn.innerHTML = '<i class="fa-solid fa-square-poll-horizontal fa-spin"></i> Playing Audios...';
playMelodiousRecitation(audioId);
tutorSynthTimeout = setTimeout(() => {
isTutorAudioPlaying = false;
btn.innerHTML = '<i class="fa-solid fa-volume-high"></i> Listen to Recitation Demo';
}, 5500);
}
});
});
}function initBookingForm() {
const form = document.getElementById('booking-form');
const steps = document.querySelectorAll('.booking-step');
const indicators = document.querySelectorAll('.progress-step-indicator');
const barFill = document.getElementById('form-progress-bar');
const prevBtn = document.getElementById('form-prev-btn');
const nextBtn = document.getElementById('form-next-btn');
const successPanel = document.getElementById('form-success-panel');
let currentStep = 1;
const totalSteps = 3;function updateFormProgress() {steps.forEach((step, idx) => {
step.classList.remove('active');
if (idx + 1 === currentStep) {
step.classList.add('active');
}
});indicators.forEach((indicator, idx) => {
indicator.classList.remove('active', 'completed');
if (idx + 1 === currentStep) {
indicator.classList.add('active');
} else if (idx + 1 < currentStep) {
indicator.classList.add('completed');
}
});const fillPercent = ((currentStep - 1) / (totalSteps - 1)) * 100;
barFill.style.width = `${fillPercent}%`;if (currentStep === 1) {
prevBtn.style.display = 'none';
nextBtn.textContent = 'Continue';
} else {
prevBtn.style.display = 'inline-flex';
if (currentStep === totalSteps) {
nextBtn.textContent = 'Submit Request';
} else {
nextBtn.textContent = 'Continue';
}
}
}function validateStep1() {
const name = document.getElementById('student-name').value.trim();
const email = document.getElementById('student-email').value.trim();
const phone = document.getElementById('student-phone').value.trim();
const age = document.getElementById('student-age').value;if (!name || !email || !phone || !age) {
alert("Please fill out all required fields marked with *");
return false;
}const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
if (!emailPattern.test(email)) {
alert("Please enter a valid email address.");
return false;
}
return true;
}nextBtn.addEventListener('click', () => {
if (currentStep === 1) {
if (!validateStep1()) return;
}
if (currentStep < totalSteps) {
currentStep++;
updateFormProgress();
} else {const userEmail = document.getElementById('student-email').value;form.style.display = 'none';
document.querySelector('.booking-progress').style.display = 'none';
document.getElementById('success-email-display').textContent = userEmail;
successPanel.style.display = 'block';document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
}
});prevBtn.addEventListener('click', () => {
if (currentStep > 1) {
currentStep--;
updateFormProgress();
}
});const daySelectorBtns = document.querySelectorAll('#form-days-select .slots-day-btn');
daySelectorBtns.forEach(btn => {
btn.addEventListener('click', () => {
const isActive = btn.classList.toggle('active');
btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
});
});const successBackBtn = document.getElementById('success-back-btn');
successBackBtn.addEventListener('click', () => {
form.reset();
form.style.display = 'block';
document.querySelector('.booking-progress').style.display = 'flex';
successPanel.style.display = 'none';
currentStep = 1;
updateFormProgress();
});
}function initFaqAccordion() {
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
const header = item.querySelector('.faq-header');
header.addEventListener('click', () => {const isActive = item.classList.contains('active');faqItems.forEach(i => {
i.classList.remove('active');
const h = i.querySelector('.faq-header');
if (h) h.setAttribute('aria-expanded', 'false');
i.querySelector('.faq-toggle-icon').innerHTML = '<i class="fa-solid fa-plus"></i>';
});
if (!isActive) {
item.classList.add('active');
header.setAttribute('aria-expanded', 'true');
item.querySelector('.faq-toggle-icon').innerHTML = '<i class="fa-solid fa-minus"></i>';
}
});
});
}function initTestimonials() {
const filterBtns = document.querySelectorAll('.testimonial-filters .filter-btn');
const cards = document.querySelectorAll('.testimonials-grid .testimonial-card');
const loadMoreBtn = document.getElementById('load-more-reviews');
if (!loadMoreBtn) return;
let currentFilter = 'all';
let limit = 6;function updateVisibility() {
let count = 0;
cards.forEach(card => {
const category = card.getAttribute('data-category');
const matchesFilter = (currentFilter === 'all' || category === currentFilter);
if (matchesFilter) {
if (count < limit) {
card.classList.remove('hidden-review');
card.style.display = 'flex';
count++;
} else {
card.classList.add('hidden-review');
card.style.display = 'none';
}
} else {
card.classList.add('hidden-review');
card.style.display = 'none';
}
});const totalMatches = Array.from(cards).filter(card => {
const category = card.getAttribute('data-category');
return currentFilter === 'all' || category === currentFilter;
}).length;if (limit >= totalMatches) {
loadMoreBtn.style.display = 'none';
} else {
loadMoreBtn.style.display = 'inline-flex';
}
}filterBtns.forEach(btn => {
btn.addEventListener('click', () => {
filterBtns.forEach(b => b.classList.remove('active'));
btn.classList.add('active');
currentFilter = btn.getAttribute('data-filter');
limit = 6;
updateVisibility();
});
});updateVisibility();
}function initBlog() {
const filterBtns = document.querySelectorAll('.blog-filters .blog-filter-btn');
const cards = document.querySelectorAll('.blog-grid .blog-card');
const loadMoreBtn = document.getElementById('load-more-blogs');
const modal = document.getElementById('blog-modal');
const modalClose = document.getElementById('blog-modal-close');
const modalCategory = document.getElementById('blog-modal-category');
const modalTitle = document.getElementById('blog-modal-title');
const modalAuthor = document.getElementById('blog-modal-author');
const modalDate = document.getElementById('blog-modal-date');
const modalReadtime = document.getElementById('blog-modal-readtime');
const modalBody = document.getElementById('blog-modal-body');if (!cards.length) return;let currentFilter = 'all';
let limit = 6;function updateBlogVisibility() {
let count = 0;
cards.forEach(card => {
const category = card.getAttribute('data-blog-category');
const matchesFilter = (currentFilter === 'all' || category === currentFilter);
if (matchesFilter) {
if (count < limit) {
card.classList.remove('hidden-blog');
card.style.display = 'flex';
count++;
} else {
card.classList.add('hidden-blog');
card.style.display = 'none';
}
} else {
card.classList.add('hidden-blog');
card.style.display = 'none';
}
});const totalMatches = Array.from(cards).filter(card => {
const category = card.getAttribute('data-blog-category');
return currentFilter === 'all' || category === currentFilter;
}).length;if (loadMoreBtn) {
if (limit >= totalMatches) {
loadMoreBtn.style.display = 'none';
} else {
loadMoreBtn.style.display = 'inline-flex';
}
}
}filterBtns.forEach(btn => {
btn.addEventListener('click', () => {
filterBtns.forEach(b => b.classList.remove('active'));
btn.classList.add('active');
currentFilter = btn.getAttribute('data-blog-filter');
limit = 6;
updateBlogVisibility();
});
});if (loadMoreBtn) {
loadMoreBtn.addEventListener('click', () => {
limit += 4;
updateBlogVisibility();
});
}let articlesCache = null;cards.forEach((card, index) => {
const readBtn = card.querySelector('.read-article-btn');
if (!readBtn) return;
const articleId = `article-${index + 1}`;
readBtn.addEventListener('click', async () => {
const category = card.querySelector('.blog-card-badge').textContent;
const title = card.querySelector('.blog-card-title').textContent;
const author = card.querySelector('.blog-card-author span').textContent;const metaSpanElements = card.querySelectorAll('.blog-card-meta span');
const date = metaSpanElements[0] ? metaSpanElements[0].textContent.trim() : '';
const readtime = metaSpanElements[1] ? metaSpanElements[1].textContent.trim() : '';if (modalCategory) modalCategory.textContent = category;
if (modalTitle) modalTitle.textContent = title;
if (modalAuthor) modalAuthor.textContent = author;
if (modalDate) modalDate.textContent = date;
if (modalReadtime) modalReadtime.textContent = readtime;if (modalBody) {
modalBody.innerHTML = `
<div class="blog-modal-spinner">
<div class="spinner-icon"></div>
<p>Loading article...</p>
</div>
`;
modalBody.className = 'modal-body modal-body-article';
}if (modal) {
modal.classList.add('active');
document.body.style.overflow = 'hidden';
}try {
if (!articlesCache) {
const response = await fetch('articles.json');
if (!response.ok) throw new Error('Could not fetch articles.json');
articlesCache = await response.json();
}
const fullContent = articlesCache[articleId] || '<p class="error-msg">Article not found.</p>';if (modal && modal.classList.contains('active') && modalTitle && modalTitle.textContent === title) {
if (modalBody) {
modalBody.innerHTML = fullContent;
}
}
} catch (err) {
console.error('Error fetching article:', err);
if (modal && modal.classList.contains('active') && modalTitle && modalTitle.textContent === title) {
if (modalBody) {
modalBody.innerHTML = `<p class="error-msg" style="text-align: center; color: var(--text-muted); padding: 2rem;">Failed to load article. Please check your internet connection and try again.</p>`;
}
}
}
});
});function closeBlogModal() {
if (modal) {
modal.classList.remove('active');
document.body.style.overflow = '';
}
}if (modalClose) {
modalClose.addEventListener('click', closeBlogModal);
}if (modal) {
modal.addEventListener('click', (e) => {
if (e.target === modal) {
closeBlogModal();
}
});
}updateBlogVisibility();
}function initAIChatbot() {
const container = document.getElementById('ai-chatbot-container');
if (!container) return;const toggleBtn = document.getElementById('ai-chatbot-toggle');
const chatWindow = document.getElementById('ai-chatbot-window');
const closeBtn = document.getElementById('ai-chatbot-close');
const messagesContainer = document.getElementById('chatbot-messages');
const inputField = document.getElementById('chatbot-input');
const sendBtn = document.getElementById('chatbot-send');
const repliesContainer = document.getElementById('chatbot-quick-replies');let isFirstOpen = true;toggleBtn.addEventListener('click', () => {
const isVisible = chatWindow.classList.toggle('visible');
toggleBtn.setAttribute('aria-expanded', isVisible ? 'true' : 'false');
if (isVisible) {
if (isFirstOpen) {
showTypingIndicator();
setTimeout(() => {
removeTypingIndicator();
sendBotMessage("Assalamu Alaikum! I am the Quranic IQ AI Assistant. How can I help you learn today? I can answer questions about our courses, tutors, schedules, and pricing, or guide you to book your 2 Free Trial Classes!");
showQuickReplies();
}, 800);
isFirstOpen = false;
}
inputField.focus();
}
});closeBtn.addEventListener('click', () => {
chatWindow.classList.remove('visible');
toggleBtn.setAttribute('aria-expanded', 'false');
toggleBtn.focus();
});sendBtn.addEventListener('click', handleUserSend);
inputField.addEventListener('keypress', (e) => {
if (e.key === 'Enter') handleUserSend();
});function handleUserSend() {
const text = inputField.value.trim();
if (!text) return;addUserMessage(text);
inputField.value = '';showTypingIndicator();setTimeout(() => {
removeTypingIndicator();
const botResponse = getBotResponse(text);
sendBotMessage(botResponse);
showQuickReplies();
}, 1000);
}function addUserMessage(text) {
const msg = document.createElement('div');
msg.className = 'chat-message message-user';
msg.textContent = text;
messagesContainer.appendChild(msg);
scrollToBottom();
}function sendBotMessage(text) {
const msg = document.createElement('div');
msg.className = 'chat-message message-bot';
msg.innerHTML = text;
messagesContainer.appendChild(msg);
scrollToBottom();
}let typingIndicator = null;
function showTypingIndicator() {
typingIndicator = document.createElement('div');
typingIndicator.className = 'chat-message message-bot';
typingIndicator.innerHTML = '<div class="chatbot-typing"><span></span><span></span><span></span></div>';
messagesContainer.appendChild(typingIndicator);
scrollToBottom();
}function removeTypingIndicator() {
if (typingIndicator) {
typingIndicator.remove();
typingIndicator = null;
}
}function scrollToBottom() {
messagesContainer.scrollTop = messagesContainer.scrollHeight;
}const quickReplies = [
{ text: "📖 View Courses", q: "What courses do you offer?" },
{ text: "👨‍🏫 Meet Tutors", q: "Who are the tutors?" },
{ text: "📞 Contact Info", q: "What is your contact number?" },
{ text: "🎁 Book Free Trial", q: "How do I book a free trial?" }
];function showQuickReplies() {
repliesContainer.innerHTML = '';
quickReplies.forEach(reply => {
const btn = document.createElement('button');
btn.className = 'quick-reply-btn';
btn.textContent = reply.text;
btn.addEventListener('click', () => {
addUserMessage(reply.q);
showTypingIndicator();
setTimeout(() => {
removeTypingIndicator();
sendBotMessage(getBotResponse(reply.q));
showQuickReplies();
}, 800);
});
repliesContainer.appendChild(btn);
});
}function getBotResponse(input) {
const text = input.toLowerCase();if (text.includes('free') || text.includes('trial') || text.includes('book') || text.includes('join') || text.includes('register') || text.includes('class') || text.includes('schedule') || text.includes('start') || text.includes('sign up')) {
return "Start your customized Quran learning journey with **2 Free Trial Classes** (absolutely zero commitment, no credit card required)!<br><br>Our certified Jamia tul Kausar scholars provide 1-on-1 interactive lessons tailored to your pace.<br><br><span class='chatbot-cta-link' onclick='document.getElementById(\"booking\").scrollIntoView({behavior: \"smooth\"}); document.getElementById(\"ai-chatbot-window\").classList.remove(\"visible\");'>👉 Click here to open the Booking Form!</span>";
}if (text.includes('phone') || text.includes('mobile') || text.includes('number') || text.includes('contact') || text.includes('whatsapp') || text.includes('email') || text.includes('location') || text.includes('address') || text.includes('pakistan') || text.includes('islamabad') || text.includes('call')) {
return "You can reach Quranic IQ Academy directly via:<br>📞 **Phone/WhatsApp**: [+92 304 4719851](https://wa.me/923044719851)<br>📧 **Email**: [info@quraniciq.com](mailto:info@quraniciq.com)<br>📍 **Location**: Islamabad, Pakistan<br><br>Feel free to message us on WhatsApp anytime for a fast response, or book your free trial classes below!<br><br><span class='chatbot-cta-link' onclick='document.getElementById(\"booking\").scrollIntoView({behavior: \"smooth\"}); document.getElementById(\"ai-chatbot-window\").classList.remove(\"visible\");'>👉 Book Free Trial Classes</span>";
}if (text.includes('course') || text.includes('learn') || text.includes('translation') || text.includes('tafsir') || text.includes('tajweed') || text.includes('hifz') || text.includes('memoriz') || text.includes('read') || text.includes('grammar') || text.includes('vocabulary') || text.includes('syllabus')) {
return "We offer high-quality 1-on-1 courses for both kids and adults:<br><br>1. 📖 **Word-by-Word Quran Translation**: Focuses on root words, vocabulary, and direct comprehension.<br>2. 🧠 **Quranic Tafsir & Exegesis**: In-depth linguistic, historical, and thematic study.<br>3. 🗣️ **Quran Recitation & Tajweed**: Perfect your articulation and flow with certified rules.<br>4. 🏅 **Hifz-ul-Quran (Memorization)**: Guided memorization with systematic trackers.<br><br>Would you like to try one of these? Book your free trial today!<br><br><span class='chatbot-cta-link' onclick='document.getElementById(\"booking\").scrollIntoView({behavior: \"smooth\"}); document.getElementById(\"ai-chatbot-window\").classList.remove(\"visible\");'>👉 Book Free Trial Classes</span>";
}if (text.includes('tutor') || text.includes('teacher') || text.includes('scholar') || text.includes('sheikh') || text.includes('asghar') || text.includes('sadia') || text.includes('amin') || text.includes('ustadh') || text.includes('staff')) {
return "Our academy features highly qualified Quran scholars:<br><br>• **Asghar Abbas**: Quran, Tajweed & Arabic Instructor (M.A. Arabic & Islamic Studies, 5+ years experience).<br>• **Ustadhah Sadia Rehman**: Female Arabic & Urdu Scholar (Shahadat-ul-Alimiyyah, 6+ years experience).<br>• **Sheikh Mohammad Amin**: Quran Tafsir & Translation Specialist (M.A. Tafsir, Jamia tul Kausar University, 8+ years experience).<br><br>You can study with any of these certified tutors. Book a free trial to match with them!<br><br><span class='chatbot-cta-link' onclick='document.getElementById(\"booking\").scrollIntoView({behavior: \"smooth\"}); document.getElementById(\"ai-chatbot-window\").classList.remove(\"visible\");'>👉 Book Free Trial Classes</span>";
}if (text.includes('price') || text.includes('fee') || text.includes('cost') || text.includes('charge') || text.includes('usd') || text.includes('package') || text.includes('month') || text.includes('rate') || text.includes('money')) {
return "Our learning packages are highly affordable and flexible, starting from standard hourly rates. We also offer family discounts!<br><br>To get started, we recommend taking our **2 Free Trial Classes** to evaluate your level and discuss schedules with your tutor. No credit card is required.<br><br><span class='chatbot-cta-link' onclick='document.getElementById(\"booking\").scrollIntoView({behavior: \"smooth\"}); document.getElementById(\"ai-chatbot-window\").classList.remove(\"visible\");'>👉 Book Your Free Trials</span>";
}if (text.includes('hello') || text.includes('hi') || text.includes('salam') || text.includes('hey') || text.includes('assalamu') || text.includes('greetings') || text.includes('morning') || text.includes('evening')) {
return "Assalamu Alaikum! How can I help you today? Ask me about our courses, tutors, packages, or how to get started with your free trial classes!";
}return "Thank you for your question! I want to help you learn the Quran. I can assist you with details about our Jamia tul Kausar certified tutors, courses (Tafsir, Translation, Tajweed), and registration.<br><br>The best way to start is by booking your **2 Free Trial Classes** so we can evaluate your level and setup your customized plan.<br><br><span class='chatbot-cta-link' onclick='document.getElementById(\"booking\").scrollIntoView({behavior: \"smooth\"}); document.getElementById(\"ai-chatbot-window\").classList.remove(\"visible\");'>👉 Click here to Book a Free Trial!</span><br><br>Or you can text our admin directly on WhatsApp: [+92 304 4719851](https://wa.me/923044719851).";
}
}
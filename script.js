document.addEventListener('DOMContentLoaded', () => {
    console.log('Document loaded, initializing components...');
    
    initThemeToggle();
    initLanguageSwitcher();
    initAccordion();
    initGallery();
    initFormValidation();
    
    if (document.getElementById('quizContainer')) {
        console.log('Quiz container detected, initializing quiz...');
        initQuiz();
    }
});

function initThemeToggle() {
    console.log('Initializing theme toggle...');
    
    if (!document.querySelector('.theme-toggle')) {
        const toggleButton = document.createElement('div');
        toggleButton.className = 'theme-toggle';
        toggleButton.innerHTML = '☀️';
        document.body.appendChild(toggleButton);
        
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
            toggleButton.innerHTML = '🌙';
        }
        
        toggleButton.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            
            if (document.body.classList.contains('light-mode')) {
                toggleButton.innerHTML = '🌙';
                localStorage.setItem('theme', 'light');
            } else {
                toggleButton.innerHTML = '☀️';
                localStorage.setItem('theme', 'dark');
            }
        });
        
        console.log('Theme toggle initialized successfully');
    }
}

function initLanguageSwitcher() {
    console.log('Inicjalizacja przełącznika języków...');
    
    const translations = {
        pl: {
            'nav-home': 'Strona główna',
            'nav-militaria': 'Militaria',
            'nav-aviation': 'Lotnictwo',
            'nav-quiz': 'Quiz',
            'nav-contact': 'Kontakt',
            'home-title': 'Moje zainteresowania',
            'home-description': 'Witamy na mojej stronie poświęconej moim pasjom: militaria i lotnictwo. Zapraszam do poznania szczegółów na podstronach.',
            'videos-title': 'Filmy o zainteresowaniach',
            'submit-quiz': 'Sprawdź wyniki',
            'contact-form-name': 'Imię i nazwisko:',
            'contact-form-email': 'Email:',
            'contact-form-subject': 'Temat:',
            'contact-form-message': 'Wiadomość:',
            'contact-form-submit': 'Wyślij wiadomość',
            'footer-copyright': '© 2023 Militaria i Lotnictwo. Wszelkie prawa zastrzeżone.',
            'retake-quiz': 'Rozwiąż quiz ponownie',
            'find-us': 'Znajdź nas',
            'address': 'Adres',
            'phone': 'Numer telefonu',
            'select-subject': 'Wybierz temat',
            'question': 'Pytanie',
            'feedback': 'Informacja zwrotna',
            'suggestion': 'Sugestie',
            'other': 'Inne'
        },
        en: {
            'nav-home': 'Home',
            'nav-militaria': 'Military',
            'nav-aviation': 'Aviation',
            'nav-quiz': 'Quiz',
            'nav-contact': 'Contact',
            'home-title': 'My Interests',
            'home-description': 'Welcome to my website dedicated to my passions: military and aviation. Please explore the details on the subpages.',
            'videos-title': 'Interest Videos',
            'submit-quiz': 'Check Results',
            'contact-form-name': 'Name:',
            'contact-form-email': 'Email:',
            'contact-form-subject': 'Subject:',
            'contact-form-message': 'Message:',
            'contact-form-submit': 'Send Message',
            'footer-copyright': '© 2023 Military & Aviation. All rights reserved.',
            'retake-quiz': 'Retake Quiz',
            'find-us': 'Find Us',
            'address': 'Address',
            'phone': 'Phone Number',
            'select-subject': 'Select subject',
            'question': 'Question',
            'feedback': 'Feedback',
            'suggestion': 'Suggestion',
            'other': 'Other'
        },
        ru: {
            'nav-home': 'Главная',
            'nav-militaria': 'Военное дело',
            'nav-aviation': 'Авиация',
            'nav-quiz': 'Викторина',
            'nav-contact': 'Контакт',
            'home-title': 'Мои интересы',
            'home-description': 'Добро пожаловать на мой сайт, посвященный моим увлечениям: военное дело и авиация. Пожалуйста, изучите детали на подстраницах.',
            'videos-title': 'Видео по интересам',
            'submit-quiz': 'Проверить результаты',
            'contact-form-name': 'Имя:',
            'contact-form-email': 'Эл. почта:',
            'contact-form-subject': 'Тема:',
            'contact-form-message': 'Сообщение:',
            'contact-form-submit': 'Отправить сообщение',
            'footer-copyright': '© 2023 Военное дело и Авиация. Все права защищены.',
            'retake-quiz': 'Пройти викторину снова',
            'find-us': 'Найти нас',
            'address': 'Адрес',
            'phone': 'Номер телефона',
            'select-subject': 'Выберите тему',
            'question': 'Вопрос',
            'feedback': 'Обратная связь',
            'suggestion': 'Предложение',
            'other': 'Другое'
        }
    };
    
    if (!document.querySelector('.language-switcher')) {
        const languageSwitcher = document.createElement('div');
        languageSwitcher.className = 'language-switcher';
        
        const languages = [
            { code: 'pl', name: 'PL' },
            { code: 'en', name: 'EN' },
            { code: 'ru', name: 'RU' }
        ];
        
        const currentLang = localStorage.getItem('language') || 'pl';
        
        languages.forEach(lang => {
            const button = document.createElement('button');
            button.textContent = lang.name;
            button.dataset.lang = lang.code;
            
            if (lang.code === currentLang) {
                button.classList.add('active');
            }
            
            button.addEventListener('click', () => {
                localStorage.setItem('language', lang.code);
                
                document.querySelectorAll('.language-switcher button').forEach(btn => {
                    btn.classList.remove('active');
                });
                button.classList.add('active');
                
                updatePageTexts(lang.code, translations);
            });
            
            languageSwitcher.appendChild(button);
        });
        
        const header = document.querySelector('header');
        header.appendChild(languageSwitcher);
        
        updatePageTexts(currentLang, translations);
        
        console.log('Przełącznik języków zainicjalizowany pomyślnie');
    }
}

function updatePageTexts(langCode, translations) {
    if (!translations[langCode]) {
        console.error('Brak tłumaczeń dla języka:', langCode);
        return;
    }
    
    const elements = document.querySelectorAll('[data-lang-key]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-lang-key');
        if (translations[langCode][key]) {
            element.textContent = translations[langCode][key];
        }
    });
    
    const pageTitle = document.querySelector('title');
    if (pageTitle) {
        const titleKey = pageTitle.getAttribute('data-lang-key');
        if (titleKey && translations[langCode][titleKey]) {
            pageTitle.textContent = translations[langCode][titleKey];
        }
    }
    
    const inputs = document.querySelectorAll('input[data-lang-placeholder], textarea[data-lang-placeholder]');
    inputs.forEach(input => {
        const key = input.getAttribute('data-lang-placeholder');
        if (translations[langCode][key]) {
            input.placeholder = translations[langCode][key];
        }
    });
    
    const selects = document.querySelectorAll('select');
    selects.forEach(select => {
        const options = select.querySelectorAll('option');
        options.forEach(option => {
            const key = option.getAttribute('data-lang-key');
            if (key && translations[langCode][key]) {
                option.textContent = translations[langCode][key];
            }
        });
    });
    
    console.log('Teksty zaktualizowane dla języka:', langCode);
}

function initAccordion() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        
        header.addEventListener('click', () => {
            content.classList.toggle('active');
            
            const icon = header.querySelector('.accordion-icon');
            if (content.classList.contains('active')) {
                icon.textContent = '−';
            } else {
                icon.textContent = '+';
            }
        });
    });
}

function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (!document.querySelector('.gallery-preview')) {
        const previewContainer = document.createElement('div');
        previewContainer.className = 'gallery-preview';
        
        const previewImage = document.createElement('img');
        previewContainer.appendChild(previewImage);
        
        const closeButton = document.createElement('span');
        closeButton.className = 'gallery-preview-close';
        closeButton.textContent = '×';
        closeButton.addEventListener('click', () => {
            previewContainer.classList.remove('active');
        });
        
        previewContainer.appendChild(closeButton);
        document.body.appendChild(previewContainer);
        
        previewContainer.addEventListener('click', (e) => {
            if (e.target === previewContainer) {
                previewContainer.classList.remove('active');
            }
        });
    }
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            const previewContainer = document.querySelector('.gallery-preview');
            const previewImage = previewContainer.querySelector('img');
            
            previewImage.src = imgSrc;
            previewContainer.classList.add('active');
        });
    });
}

function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            let isValid = true;
            
            document.querySelectorAll('.error-message').forEach(el => el.remove());
            
            if (!name.value || name.value.trim().length < 3) {
                showError(name, 'Name must be at least 3 characters');
                isValid = false;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value || !emailRegex.test(email.value)) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            }
            
            if (!message.value || message.value.trim().length < 10) {
                showError(message, 'Message must be at least 10 characters');
                isValid = false;
            }
            
            if (isValid) {
                alert('Message sent successfully!');
                contactForm.reset();
            }
        });
    }
    
    function showError(field, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#ff6b6b';
        errorDiv.style.fontSize = '0.8rem';
        errorDiv.style.marginTop = '5px';
        errorDiv.textContent = message;
        
        field.style.borderColor = '#ff6b6b';
        field.parentNode.insertBefore(errorDiv, field.nextSibling);
        
        field.addEventListener('input', function() {
            field.style.borderColor = '';
            if (field.nextSibling.className === 'error-message') {
                field.nextSibling.remove();
            }
        }, { once: true });
    }
}

function initQuiz() {
    console.log('Inicjalizacja quizu...');
    const quizContainer = document.getElementById('quizContainer');
    const submitButton = document.getElementById('submitQuiz');
    const resultDiv = document.getElementById('result');
    
    const questions = [
        {
            question: "Który samolot znany jest jako 'Bombowiec Stealth'?", 
            answers: ["B-1 Lancer", "B-2 Spirit", "F-117 Nighthawk", "F-22 Raptor"],
            correct: 1
        },
        {
            question: "W którym roku zakończyła się II wojna światowa?",
            answers: ["1943", "1944", "1945", "1946"],
            correct: 2
        },
        {
            question: "Który kraj opracował myśliwce MiG?",
            answers: ["Stany Zjednoczone", "Związek Radziecki/Rosja", "Wielka Brytania", "Francja"],
            correct: 1
        },
        {
            question: "Jak nazywa się elitarna szkoła pilotów myśliwskich amerykańskiej marynarki wojennej?",
            answers: ["Top Gun", "Eagle School", "Air Combat School", "Fighter Weapons School"],
            correct: 0
        },
        {
            question: "Który czołg był głównym czołgiem bojowym Związku Radzieckiego podczas II wojny światowej?",
            answers: ["Panzer IV", "Sherman", "T-34", "Tiger I"],
            correct: 2
        },
        {
            question: "Jaka była nazwa kodowa inwazji aliantów na Normandię w 1944 roku?",
            answers: ["Operacja Market Garden", "Operacja Overlord", "Operacja Barbarossa", "Operacja Torch"],
            correct: 1
        },
        {
            question: "Który producent samolotów produkuje F/A-18 Super Hornet?",
            answers: ["Lockheed Martin", "Boeing", "Northrop Grumman", "General Dynamics"],
            correct: 1
        },
        {
            question: "Jaki jest największy sojusz wojskowy na świecie?",
            answers: ["Organizacja Narodów Zjednoczonych", "Układ Warszawski", "NATO", "SEATO"],
            correct: 2
        },
        {
            question: "Który śmigłowiec znany jest jako 'Apache'?", 
            answers: ["UH-60 Black Hawk", "CH-47 Chinook", "AH-64", "Mi-24 Hind"],
            correct: 2
        },
        {
            question: "Który samolot jako pierwszy przekroczył barierę dźwięku?",
            answers: ["Bell X-1", "MiG-15", "F-86 Sabre", "Gloster Meteor"],
            correct: 0
        },
        {
            question: "Które państwo posiada największe siły powietrzne na świecie?",
            answers: ["Rosja", "Chiny", "Wielka Brytania", "Stany Zjednoczone"],
            correct: 3
        },
        {
            question: "Jaki był główny myśliwiec używany przez RAF podczas Bitwy o Anglię?",
            answers: ["Hawker Hurricane", "Supermarine Spitfire", "Bristol Beaufighter", "Gloster Gladiator"],
            correct: 0
        },
        {
            question: "Która ranga wojskowa jest wyższa?",
            answers: ["Pułkownik", "Major", "Podpułkownik", "Kapitan"],
            correct: 0
        },
        {
            question: "Jaka jest maksymalna prędkość samolotu SR-71 Blackbird?",
            answers: ["Mach 1,8", "Mach 2,5", "Mach 3,3+", "Mach 4,0"],
            correct: 2
        },
        {
            question: "Który lotniskowiec jest największy na świecie według stanu na 2023 rok?",
            answers: ["USS Gerald R. Ford", "HMS Queen Elizabeth", "Charles de Gaulle", "Admirał Kuzniecow"],
            correct: 0
        }
    ];
    
    quizContainer.innerHTML = '';
    
    questions.forEach((q, index) => {
        const questionElement = document.createElement('div');
        questionElement.className = 'quiz-question';
        questionElement.innerHTML = `<p><strong>Pytanie ${index + 1}:</strong> ${q.question}</p>`;
        
        q.answers.forEach((answer, i) => {
            const id = `q${index}a${i}`;
            questionElement.innerHTML += `
                <div class="quiz-answer">
                    <input type="radio" id="${id}" name="question${index}" value="${i}">
                    <label for="${id}">${answer}</label>
                </div>
            `;
        });
        
        quizContainer.appendChild(questionElement);
    });
    
    submitButton.addEventListener('click', () => {
        let unanswered = 0;
        questions.forEach((_, index) => {
            const answered = document.querySelector(`input[name="question${index}"]:checked`);
            if (!answered) {
                unanswered++;
            }
        });
        
        if (unanswered > 0) {
            resultDiv.innerHTML = `<p class="warning">Uwaga: Nie odpowiedziałeś na ${unanswered} ${unanswered === 1 ? 'pytanie' : (unanswered < 5 ? 'pytania' : 'pytań')}. Aby uzyskać pełny wynik, odpowiedz na wszystkie pytania.</p>`;
            resultDiv.scrollIntoView({ behavior: 'smooth' });
            return;
        }
        
        let score = 0;
        
        questions.forEach((q, index) => {
            const selected = document.querySelector(`input[name="question${index}"]:checked`);
            
            if (selected && parseInt(selected.value) === q.correct) {
                score++;
                selected.parentElement.classList.add('correct-answer');
            } else if (selected) {
                selected.parentElement.classList.add('wrong-answer');
                const correctAnswer = document.querySelector(`input[name="question${index}"][value="${q.correct}"]`);
                if (correctAnswer) {
                    correctAnswer.parentElement.classList.add('correct-answer');
                }
            }
        });
        
        let resultMessage = `<h3>Wyniki quizu</h3>`;
        resultMessage += `<p>Twój wynik: ${score} z ${questions.length} punktów</p>`;
        
        if (score === questions.length) {
            resultMessage += `<p>Doskonały wynik! Jesteś ekspertem w dziedzinie militariów i lotnictwa!</p>`;
        } else if (score >= questions.length * 0.8) {
            resultMessage += `<p>Świetnie! Posiadasz rozległą wiedzę na temat militariów i lotnictwa.</p>`;
        } else if (score >= questions.length * 0.6) {
            resultMessage += `<p>Dobra robota! Masz solidną wiedzę na temat militariów i lotnictwa.</p>`;
        } else if (score >= questions.length * 0.4) {
            resultMessage += `<p>Nieźle, ale jest miejsce na poprawę.</p>`;
        } else {
            resultMessage += `<p>Warto dowiedzieć się więcej o tematyce militariów i lotnictwa.</p>`;
        }
        
        resultMessage += `<button id="retakeQuiz" class="retake-button">Rozwiąż quiz ponownie</button>`;
        
        resultDiv.innerHTML = resultMessage;
        
        document.getElementById('retakeQuiz').addEventListener('click', () => {
            document.querySelectorAll('.quiz-answer').forEach(el => {
                el.classList.remove('correct-answer', 'wrong-answer');
            });
            document.querySelectorAll('input[type="radio"]').forEach(radio => {
                radio.checked = false;
            });
            resultDiv.innerHTML = '';
            window.scrollTo({ top: quizContainer.offsetTop - 100, behavior: 'smooth' });
        });
        
        resultDiv.scrollIntoView({ behavior: 'smooth' });
    });
    
    console.log('Quiz zainicjalizowany pomyślnie');
}

// Main JavaScript file for Military & Aviation Website
// Author: Your Name
// Last updated: Current Date

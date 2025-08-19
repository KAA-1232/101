document.addEventListener('DOMContentLoaded', function() {
    // ========== Мобильное меню ==========
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    
    // Открытие меню
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.add('active');
        document.body.style.overflow = 'hidden'; // Блокируем скролл страницы
    });
    
    // Закрытие меню
    mobileMenuClose.addEventListener('click', closeMobileMenu);
    
    // Закрытие при клике на пункт меню
    navItems.forEach(item => {
        item.addEventListener('click', closeMobileMenu);
    });
    
    function closeMobileMenu() {
        navLinks.classList.remove('active');
        document.body.style.overflow = ''; // Восстанавливаем скролл
    }
    
    // ========== Плавная прокрутка ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Закрываем меню если оно открыто
                if (navLinks.classList.contains('active')) {
                    closeMobileMenu();
                }
                
                // Плавная прокрутка с учетом высоты навигации
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========== Эффект при скролле для навигации ==========
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // ========== Калькулятор стоимости ремонта ==========
    const calculatorForm = document.getElementById('calculator-form');
    if (calculatorForm) {
        calculatorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Получаем данные из формы
            const name = this.elements['name'].value;
            const area = this.elements['area'].value;
            const address = this.elements['address'].value;
            const phone = this.elements['phone'].value;
            
            // Формируем сообщение для WhatsApp
            const message = `Новая заявка на расчет стоимости ремонта:\n\nИмя: ${name}\nПлощадь: ${area} м²\nАдрес: ${address}\nТелефон: ${phone}`;
            
            // Номер телефона для отправки (замените на ваш номер)
            const whatsappNumber = '9383032080'; // Пример номера, замените на нужный
            
            // Кодируем сообщение для URL
            const encodedMessage = encodeURIComponent(message);
            
            // Формируем ссылку WhatsApp
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            
            // Открываем WhatsApp в новом окне
            window.open(whatsappUrl, '_blank');
            
            // Очищаем форму после отправки
            this.reset();
            
            // Можно добавить уведомление об успешной отправке
            alert('Ваша заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.');
        });
    }
    
    // ========== Адаптация карточек проектов ==========
    function adjustProjectCards() {
        const projectCards = document.querySelectorAll('.project-card:not(.view-all)');
        const viewAllCard = document.querySelector('.project-card.view-all');
        
        if (window.innerWidth >= 768) {
            // Для больших экранов
            projectCards.forEach(card => {
                card.style.aspectRatio = '1/1';
            });
            
            if (viewAllCard) {
                viewAllCard.style.aspectRatio = '3/1';
            }
        } else {
            // Для мобильных
            projectCards.forEach(card => {
                card.style.aspectRatio = '16/9';
            });
            
            if (viewAllCard) {
                viewAllCard.style.aspectRatio = '2/1';
            }
        }
    }
    
    // Вызов при загрузке и изменении размера окна
    adjustProjectCards();
    window.addEventListener('resize', adjustProjectCards);
    
    // ========== Анимация появления секций при скролле ==========
    function checkScroll() {
        const sections = document.querySelectorAll('section');
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY || window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            // Показываем секцию когда она на 1/3 видна
            if (scrollY + windowHeight > sectionTop + sectionHeight / 3) {
                section.classList.add('visible');
            }
        });
    }
    
    // Инициализация при загрузке и скролле
    window.addEventListener('load', checkScroll);
    window.addEventListener('scroll', checkScroll);
    
    // ========== Эффекты для кнопок ==========
    document.querySelectorAll('.btn').forEach(btn => {
        // Эффект при наведении
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        });
        
        // Эффект при уходе курсора
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
        });
        
        // Эффект при нажатии
        btn.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(1px)';
        });
        
        // Эффект при отпускании
        btn.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-3px)';
        });
    });
    
    // ========== Закрытие меню при клике вне его ==========
    document.addEventListener('click', function(e) {
        if (navLinks.classList.contains('active') && 
            !e.target.closest('.nav-links') && 
            !e.target.closest('.mobile-menu-btn')) {
            closeMobileMenu();
        }
    });
    
    // ========== Запрет скролла при открытом меню ==========
    document.addEventListener('keydown', function(e) {
        if (navLinks.classList.contains('active') && e.key === 'Escape') {
            closeMobileMenu();
        }
    });
});





// ========== Cookies уведомление ==========
function checkCookies() {
    if (!localStorage.getItem('cookiesAccepted')) {
        const cookiesNotice = document.createElement('div');
        cookiesNotice.className = 'cookies-notice';
        cookiesNotice.innerHTML = `
            <p>Мы используем cookies для улучшения работы сайта. Оставаясь на сайте, вы соглашаетесь с <a href="cookies-policy.html">политикой использования cookies</a>.</p>
            <button class="btn btn-accept">Принять</button>
        `;
        document.body.appendChild(cookiesNotice);
        
        document.querySelector('.btn-accept').addEventListener('click', function() {
            localStorage.setItem('cookiesAccepted', 'true');
            cookiesNotice.style.display = 'none';
        });
    }
}

// Вызов при загрузке
window.addEventListener('load', checkCookies);
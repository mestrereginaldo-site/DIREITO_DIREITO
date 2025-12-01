// Menu mobile
document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
    });
});

// Contador animado para as estatísticas
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Ativar contadores quando a seção estiver visível
function setupCounters() {
    const counters = document.querySelectorAll('.counter');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, 0, target, 2000);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Animar preços quando visíveis
function animatePrices() {
    const priceNumbers = document.querySelectorAll('.price-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'pricePulse 1s ease-out';
                setTimeout(() => {
                    entry.target.style.animation = '';
                }, 1000);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    priceNumbers.forEach(price => {
        observer.observe(price);
    });
}

// Animar elementos ao rolar
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Efeito de digitação para elementos com a classe typing-animation
function setupTypingAnimation() {
    const typingElements = document.querySelectorAll('.typing-animation');
    typingElements.forEach(el => {
        // Reinicia a animação a cada 8 segundos
        setInterval(() => {
            el.style.animation = 'none';
            setTimeout(() => {
                el.style.animation = 'typing 3.5s steps(40, end), blink-caret .75s step-end infinite';
            }, 10);
        }, 8000);
    });
}

// Formulário de agendamento em etapas
let currentStep = 1;
const totalSteps = 5;

function showStep(step) {
    // Esconder todas as etapas
    document.querySelectorAll('.form-step').forEach(el => {
        el.classList.remove('active');
    });
    
    // Mostrar a etapa atual
    document.getElementById(`step${step}`).classList.add('active');
    
    // Atualizar o indicador de progresso (se existir)
    if (document.querySelector('.progress-bar')) {
        const progress = ((step - 1) / (totalSteps - 1)) * 100;
        document.querySelector('.progress-bar').style.width = `${progress}%`;
    }
}

function nextStep() {
    if (currentStep < totalSteps) {
        // Validar etapa atual antes de avançar
        if (validateStep(currentStep)) {
            currentStep++;
            showStep(currentStep);
            
            // Atualizar informações de confirmação
            if (currentStep === 4) {
                updateConfirmation();
            }
        }
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
    }
}

function validateStep(step) {
    let isValid = true;
    
    if (step === 2) {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        
        if (!name) {
            showValidationError('Por favor, insira seu nome');
            isValid = false;
        } else if (!email || !isValidEmail(email)) {
            showValidationError('Por favor, insira um e-mail válido');
            isValid = false;
        } else if (!phone) {
            showValidationError('Por favor, insira seu WhatsApp');
            isValid = false;
        }
    } else if (step === 3) {
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        
        if (!date) {
            showValidationError('Por favor, selecione uma data');
            isValid = false;
        } else if (!time) {
            showValidationError('Por favor, selecione um horário');
            isValid = false;
        }
    } else if (step === 4) {
        const terms = document.getElementById('terms').checked;
        
        if (!terms) {
            showValidationError('Por favor, aceite os termos de serviço');
            isValid = false;
        }
    }
    
    return isValid;
}

function showValidationError(message) {
    // Criar elemento de erro
    const errorDiv = document.createElement('div');
    errorDiv.className = 'validation-error';
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
    `;
    errorDiv.style.cssText = `
        background-color: #ffe6e6;
        color: #cc0000;
        padding: 10px 15px;
        border-radius: 4px;
        margin: 15px 0;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: fadeIn 0.3s ease-out;
    `;
    
    // Adicionar ao formulário
    const formStep = document.querySelector('.form-step.active');
    const firstChild = formStep.firstElementChild;
    formStep.insertBefore(errorDiv, firstChild.nextSibling);
    
    // Remover após 5 segundos
    setTimeout(() => {
        errorDiv.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 300);
    }, 5000);
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function updateConfirmation() {
    // Atualizar serviço
    const selectedService = document.querySelector('input[name="service"]:checked');
    if (selectedService) {
        const serviceLabel = selectedService.nextElementSibling.querySelector('strong').textContent;
        document.getElementById('confirm-service').textContent = serviceLabel;
        
        // Atualizar preço
        const priceSpan = selectedService.nextElementSibling.querySelector('span');
        document.getElementById('confirm-price').textContent = priceSpan.textContent;
        
        // Animar o preço na confirmação
        document.getElementById('confirm-price').style.animation = 'pricePulse 1s ease-out';
        setTimeout(() => {
            document.getElementById('confirm-price').style.animation = '';
        }, 1000);
    }
    
    // Atualizar dados pessoais
    document.getElementById('confirm-name').textContent = document.getElementById('name').value;
    document.getElementById('confirm-email').textContent = document.getElementById('email').value;
    
    // Atualizar data e hora
    document.getElementById('confirm-date').textContent = formatDate(document.getElementById('date').value);
    document.getElementById('confirm-time').textContent = document.getElementById('time').value;
}

function formatDate(dateString) {
    if (!dateString) return '-';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function submitBooking() {
    // Aqui normalmente enviaríamos os dados para um backend
    // Para este exemplo, apenas simularemos o envio
    
    // Coletar dados do formulário
    const formData = {
        service: document.querySelector('input[name="service"]:checked').value,
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        timezone: document.getElementById('timezone').value,
        payment: document.querySelector('input[name="payment"]:checked').value
    };
    
    // Simular envio (em um caso real, seria uma chamada fetch/axios para sua API)
    setTimeout(() => {
        // Salvar no localStorage para demonstração
        localStorage.setItem('lastBooking', JSON.stringify(formData));
        
        // Avançar para etapa de sucesso
        currentStep++;
        showStep(currentStep);
        
        // Efeito de confetes (simulado)
        createConfettiEffect();
        
        // Enviar notificação por e-mail (simulado)
        console.log('Agendamento enviado:', formData);
        console.log('E-mail de confirmação enviado para:', formData.email);
    }, 1500);
}

function createConfettiEffect() {
    const colors = ['#e6af2e', '#1a3a5f', '#2a628f', '#28a745'];
    const successMessage = document.querySelector('.success-message');
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.cssText = `
            position: absolute;
            width: 10px;
            height: 10px;
            background-color: ${colors[Math.floor(Math.random() * colors.length)]};
            top: 50%;
            left: 50%;
            opacity: 0.8;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            z-index: 1000;
        `;
        
        successMessage.appendChild(confetti);
        
        // Animação do confete
        const angle = Math.random() * Math.PI * 2;
        const velocity = 30 + Math.random() * 30;
        const gravity = 0.1;
        
        let x = 0;
        let y = 0;
        let vx = Math.cos(angle) * velocity;
        let vy = Math.sin(angle) * velocity;
        
        function animateConfetti() {
            x += vx;
            y += vy;
            vy += gravity;
            
            confetti.style.transform = `translate(${x}px, ${y}px) rotate(${x}deg)`;
            confetti.style.opacity = 1 - (Math.abs(x) + Math.abs(y)) / 500;
            
            if (Math.abs(x) < 500 && Math.abs(y) < 500) {
                requestAnimationFrame(animateConfetti);
            } else {
                confetti.remove();
            }
        }
        
        requestAnimationFrame(animateConfetti);
    }
}

function resetForm() {
    // Resetar formulário
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('message').value = '';
    document.getElementById('date').value = '';
    document.getElementById('time').value = '';
    document.getElementById('terms').checked = false;
    
    // Voltar para a primeira etapa
    currentStep = 1;
    showStep(currentStep);
    
    // Limpar confetes
    document.querySelectorAll('.confetti').forEach(confetti => {
        confetti.remove();
    });
}

function sendContactMessage() {
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();
    
    if (!name || !email || !message) {
        showContactError('Por favor, preencha todos os campos');
        return;
    }
    
    if (!isValidEmail(email)) {
        showContactError('Por favor, insira um e-mail válido');
        return;
    }
    
    // Simular envio da mensagem
    const contactData = {
        name,
        email,
        message,
        timestamp: new Date().toISOString()
    };
    
    // Salvar no localStorage para demonstração
    localStorage.setItem('lastContact', JSON.stringify(contactData));
    
    // Limpar formulário
    document.getElementById('contact-name').value = '';
    document.getElementById('contact-email').value = '';
    document.getElementById('contact-message').value = '';
    
    // Mostrar mensagem de sucesso
    showContactSuccess('Mensagem enviada com sucesso! Entrarei em contato em até 24 horas.');
    
    // Em um caso real, enviar para seu backend/API
    console.log('Mensagem de contato:', contactData);
}

function showContactError(message) {
    const button = document.querySelector('.contact-form .btn-primary');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'contact-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        background-color: #ffe6e6;
        color: #cc0000;
        padding: 10px 15px;
        border-radius: 4px;
        margin: 15px 0;
        text-align: center;
        animation: fadeIn 0.3s ease-out;
    `;
    
    button.parentNode.insertBefore(errorDiv, button);
    
    setTimeout(() => {
        errorDiv.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 300);
    }, 5000);
}

function showContactSuccess(message) {
    const button = document.querySelector('.contact-form .btn-primary');
    const successDiv = document.createElement('div');
    successDiv.className = 'contact-success';
    successDiv.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    successDiv.style.cssText = `
        background-color: #e6ffe6;
        color: #006600;
        padding: 10px 15px;
        border-radius: 4px;
        margin: 15px 0;
        text-align: center;
        animation: fadeIn 0.3s ease-out;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
    `;
    
    button.parentNode.insertBefore(successDiv, button);
    
    setTimeout(() => {
        successDiv.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.parentNode.removeChild(successDiv);
            }
        }, 300);
    }, 5000);
}

// Inicializar todas as animações
document.addEventListener('DOMContentLoaded', function() {
    // Mostrar primeira etapa do formulário
    showStep(1);
    
    // Definir data mínima para agendamento (amanhã)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowFormatted = tomorrow.toISOString().split('T')[0];
    document.getElementById('date').min = tomorrowFormatted;
    
    // Definir ano atual no footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Configurar animações
    setupCounters();
    setupScrollAnimations();
    setupTypingAnimation();
    animatePrices();
    
    // Adicionar efeito de hover nos cards de serviço
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const priceNumber = this.querySelector('.price-number');
            if (priceNumber) {
                priceNumber.style.transform = 'scale(1.2)';
                priceNumber.style.color = '#e6af2e';
                priceNumber.style.transition = 'all 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const priceNumber = this.querySelector('.price-number');
            if (priceNumber) {
                priceNumber.style.transform = 'scale(1)';
                priceNumber.style.color = '';
            }
        });
    });
    
    // Animar os números do contador quando a página carrega
    setTimeout(() => {
        document.querySelectorAll('.counter').forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            if (counter.textContent === '0') {
                animateCounter(counter, 0, target, 2000);
            }
        });
    }, 1000);
    
    // Preencher dados do último agendamento (se existir)
    const lastBooking = localStorage.getItem('lastBooking');
    if (lastBooking) {
        console.log('Último agendamento recuperado:', JSON.parse(lastBooking));
    }
    
    // Adicionar estilo CSS para animações dinâmicas
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pricePulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); color: #e6af2e; }
            100% { transform: scale(1); }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(-10px); }
        }
    `;
    document.head.appendChild(style);
});

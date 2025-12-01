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
            alert('Por favor, insira seu nome');
            isValid = false;
        } else if (!email || !isValidEmail(email)) {
            alert('Por favor, insira um e-mail válido');
            isValid = false;
        } else if (!phone) {
            alert('Por favor, insira seu WhatsApp');
            isValid = false;
        }
    } else if (step === 3) {
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        
        if (!date) {
            alert('Por favor, selecione uma data');
            isValid = false;
        } else if (!time) {
            alert('Por favor, selecione um horário');
            isValid = false;
        }
    } else if (step === 4) {
        const terms = document.getElementById('terms').checked;
        
        if (!terms) {
            alert('Por favor, aceite os termos de serviço');
            isValid = false;
        }
    }
    
    return isValid;
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
        
        // Enviar notificação por e-mail (simulado)
        console.log('Agendamento enviado:', formData);
        console.log('E-mail de confirmação enviado para:', formData.email);
    }, 1000);
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
}

function sendContactMessage() {
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();
    
    if (!name || !email || !message) {
        alert('Por favor, preencha todos os campos');
        return;
    }
    
    if (!isValidEmail(email)) {
        alert('Por favor, insira um e-mail válido');
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
    alert('Mensagem enviada com sucesso! Entrarei em contato em até 24 horas.');
    
    // Em um caso real, enviar para seu backend/API
    console.log('Mensagem de contato:', contactData);
}

// Inicializar
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
    
    // Animar elementos ao rolar a página
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    document.querySelectorAll('.service-card, .step, .feature').forEach(el => {
        observer.observe(el);
    });
    
    // Preencher dados do último agendamento (se existir)
    const lastBooking = localStorage.getItem('lastBooking');
    if (lastBooking) {
        console.log('Último agendamento recuperado:', JSON.parse(lastBooking));
    }
});

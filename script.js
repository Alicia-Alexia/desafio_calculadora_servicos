    const checkboxes = document.querySelectorAll('input[name="servico"]');
    const valorTotalElemento = document.getElementById('valor-total');
    const serviceCards = document.querySelectorAll('.service-card');
    const btnContratar = document.getElementById('btn-contratar');
    const toast = document.getElementById('toast');

    let totalAtual = 0;

    function atualizarEstado() {
        let total = 0;

        checkboxes.forEach((checkbox, index) => {
            const card = serviceCards[index];
            
            if (checkbox.checked) {
                total += parseFloat(checkbox.value);
                card.classList.add('border-indigo-600', 'bg-indigo-50');
                card.classList.remove('border-slate-100');
            } else {
                card.classList.remove('border-indigo-600', 'bg-indigo-50');
                card.classList.add('border-slate-100');
            }
        });

        totalAtual = total; 

        valorTotalElemento.style.opacity = '0.5';
        setTimeout(() => {
            valorTotalElemento.innerText = formatarMoeda(total);
            valorTotalElemento.style.opacity = '1';
        }, 150);
    }

    function formatarMoeda(valor) {
        return valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }

    function mostrarNotificacao() {
        toast.classList.remove('translate-x-full', 'opacity-0');
    
        setTimeout(() => {
            toast.classList.add('translate-x-full', 'opacity-0');
        }, 3000);
    }

    btnContratar.addEventListener('click', () => {
        if (totalAtual === 0) {
            alert("Por favor, selecione pelo menos um serviço.");
            return;
        }

        const textoOriginal = btnContratar.innerHTML;
        btnContratar.disabled = true;
        btnContratar.innerHTML = `
            <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processando...
        `;

        setTimeout(() => {
            btnContratar.innerHTML = textoOriginal;
            btnContratar.disabled = false;

            mostrarNotificacao();

            checkboxes.forEach(chk => chk.checked = false);
            atualizarEstado(); 

        }, 1500);
    });

    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', atualizarEstado);
    });
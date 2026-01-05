const checkboxes = document.querySelectorAll('input[name="servico"]');
const valorTotalElemento = document.getElementById('valor-total');

checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', atualizarTotal);
});

function atualizarTotal() {
    let total = 0;

    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            total += parseFloat(checkbox.value);
        }
    });
    valorTotalElemento.innerText = formatarMoeda(total);
}

function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}
const containerUl = document.querySelector('#transactions');
const balancoDisplay = document.querySelector('#balance');
const receitaDisplay = document.querySelector('#money-plus');
const despesasDisplay = document.querySelector('#money-minus');
const formulario = document.querySelector('#form');
const imputNome = document.querySelector('#text');
const imputValor = document.querySelector('#amount');
const msgErro = document.querySelector('.msgErro');
const msgSucesso = document.querySelector('.msgSucesso');
const msgExclusao = document.querySelector('.msgExclusao');


/* localstorage */
const localStorageTransacoes = JSON.parse(localStorage
    .getItem('transacoes'))

let transacoes = localStorage
    .getItem('transacoes') !== null ? localStorageTransacoes : [];


const removerTransacao = ID => {
    transacoes = transacoes.filter(transacao => transacao.id !== ID)

    msgExclusao.classList.add('exclusao');
        setTimeout(() => {
            msgExclusao.classList.remove('exclusao')
    },2000)

    updateLocalStorage()
    iniciarAplicacao()
    
    //console.log(transacoes)
}


const addTransacoes = transacao => {
    const operador = transacao.valor < 0 ? '-' : '+'
    const cssClass = transacao.valor < 0 ? 'minus' : 'plus'
    const saldoOperador = Math.abs(transacao.valor);
    const li = document.createElement('li');

    li.classList.add(cssClass);
    li.innerHTML = `
        ${transacao.nome} 
        <span>${operador} R$ ${saldoOperador}</span>
        <button class="delete-btn" onClick="removerTransacao(${transacao.id})">x</button>
    `
    containerUl.append(li);
}

/* operações transações valores */
const getDespesas = saldoTransacao => Math.abs(saldoTransacao
    .filter(saldo => saldo < 0 )
    .reduce((saldo, transacao) => saldo + transacao, 0))
    .toFixed(2)

const getReceita = saldoTransacao => saldoTransacao 
    .filter(saldo => saldo > 0 )
    .reduce((saldo, transacao) => saldo + transacao, 0)
    .toFixed(2)

const getSaldoTotal = saldoTransacao => saldoTransacao
    .reduce((saldo, transacao) => saldo + transacao, 0)
    .toFixed(2);

const getSaldoTransacao = transacoes => transacoes
    .map(transacao => transacao.valor);

const balancoValor = () => {
    const saldoTransacao = getSaldoTransacao(transacoes)
    const saldoTotal = getSaldoTotal(saldoTransacao)
    const receita = getReceita(saldoTransacao)
    const despesas = getDespesas(saldoTransacao)

    balancoDisplay.textContent = `R$ ${saldoTotal}`
    receitaDisplay.textContent = `R$ ${receita}`
    despesasDisplay.textContent = `R$ ${despesas}`
}

const iniciarAplicacao = () => {
    // limpa o container ul para não replicar na hora de inserir nova transação
    containerUl.innerHTML = '';

    transacoes.forEach(addTransacoes);
    balancoValor();
}



iniciarAplicacao();




/* add transacoes ao localstorage */
const updateLocalStorage = () => {
    localStorage.setItem('transacoes', JSON.stringify(transacoes))
}



const geradorId = () => Math.round(Math.random() * 1000)




/* funcoes formulario transacoes */
const limparInputs = (nome, valor) => {
    nome.value = ''
    valor.value = ''
}

const addNovaTransacao = (nome, valor) => {
    transacoes.push({
        id: geradorId(),
        nome: String(nome),
        valor: Number(valor)
    })
}

const formSubmit = e => {
    e.preventDefault();

    const nome = imputNome.value.trim()
    const valor = imputValor.value.trim()
    const camposVazios = nome  === '' || valor === ''

    if(camposVazios) {
        msgErro.classList.add('active');
        setTimeout(() =>{
            msgErro.classList.remove('active');
        },2000);
        return
    }
    else {
        msgSucesso.classList.add('sucesso');
        setTimeout(() => {
            msgSucesso.classList.remove('sucesso')
        },2000)
    }

    addNovaTransacao(nome,valor)
    iniciarAplicacao()
    updateLocalStorage()
    limparInputs(nome,valor)
}

formulario.addEventListener('submit', formSubmit)
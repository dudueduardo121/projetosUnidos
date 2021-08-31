const containerUlJogador = document.querySelector('#transactionsJogador');
const formularioJogador = document.querySelector('#formJogador');
const imputNomeJogador = document.querySelector('#nome');

const msgErroJogador = document.querySelector('.msgErroJogador');
const msgSucessoJogador = document.querySelector('.msgSucessoJogador');
const msgExclusaoJogador = document.querySelector('.msgExclusaoJogador');

/* localstorage */
const localStorageTransacoesJogador = JSON.parse(localStorage
    .getItem('jogadores'))

let jogadores = localStorage
    .getItem('jogadores') !== null ? localStorageTransacoesJogador : [];


const removerTransacaoJogador = ID => {
    jogadores = jogadores.filter(jogador => jogador.id !== ID)

    msgExclusaoJogador.classList.add('exclusao');
        setTimeout(() => {
            msgExclusaoJogador.classList.remove('exclusao')
    },2000)

    updateLocalStorageJogador()
    iniciarAplicacaoJogador()
    
    //console.log(transacoes)
}


const addTransacoesJogador = jogador => {

    const li = document.createElement('li');

    li.innerHTML = `
        ${jogador.nome} 
        <i class="fa fa-id-card icone-jogador"></i>
        <button class="delete-btn" onClick="removerTransacaoJogador(${jogador.id})">x</button>
    `
    containerUlJogador.append(li);
}



const iniciarAplicacaoJogador = () => {
    // limpa o container ul para não replicar na hora de inserir nova transação
    containerUlJogador.innerHTML = '';

    jogadores.forEach(addTransacoesJogador);
}



iniciarAplicacaoJogador();




/* add transacoes ao localstorage */
const updateLocalStorageJogador = () => {
    localStorage.setItem('jogadores', JSON.stringify(jogadores))
}



const geradorId2 = () => Math.round(Math.random() * 1000)




/* funcoes formularioJogador transacoes */
const limparInputsJogador = (nome) => {
    nome.value = ''
}

const addNovaTransacaoJogador = (nome) => {
    jogadores.push({
        id: geradorId2(),
        nome: String(nome)
    })
}

const formSubmitJogador = e => {
    e.preventDefault();

    const nome = imputNomeJogador.value.trim()
    const camposVazios = nome  === ''

    if(camposVazios) {
        msgErroJogador.classList.add('active');
        setTimeout(() =>{
            msgErroJogador.classList.remove('active');
        },2000);
        return
    }
    else {
        msgSucessoJogador.classList.add('sucesso');
        setTimeout(() => {
            msgSucessoJogador.classList.remove('sucesso')
        },2000)
    }

    addNovaTransacaoJogador(nome)
    iniciarAplicacaoJogador()
    updateLocalStorageJogador()
    limparInputsJogador(nome)
}

formularioJogador.addEventListener('submit', formSubmitJogador)

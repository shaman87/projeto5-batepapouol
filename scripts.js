let nomeUsuario = prompt("Digite seu nome");

function entrarNaSala() {
    const nome = {name: nomeUsuario};
    const requisicao = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", nome);
    requisicao.then(tratarSucesso);
    requisicao.catch(tratarErro);
}

function manterConexao() {
    const userOnline = {name: nomeUsuario};
    const requisicao = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", userOnline);
    requisicao.then(userOn);
    requisicao.catch(userOff);
}

function userOn(online) {
    console.log(online.status);
}

function userOff(offline) {
    console.log(offline.status);
}

function tratarSucesso(sucesso) {
    const certo = sucesso.status;
    console.log(nomeUsuario);
    alert("sucesso");
    if(certo === 200) {
        setInterval(manterConexao, 5000);
    }
}

function tratarErro(erro) {
    const errado = erro.response.status;
    console.log(errado);
    alert("erro");
    if(errado === 400) {
        nomeUsuario = prompt("Digite seu nome");
        entrarNaSala();
    }
}

function buscarMensagens() {
    const promessa = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promessa.then(renderizarMensagens);
    promessa.catch(mensagemErro);
}

function renderizarMensagens(mensagens) {
    let conteudoMensagens = document.querySelector(".bloco-mensagens");
    let exibirMensagens = mensagens.data;
    
    conteudoMensagens.innerHTML = "";

    for(let i = 0; i < exibirMensagens.length; i++) {
        if(exibirMensagens[i].type === "status") {
            conteudoMensagens.innerHTML += `
            <div class="entra-na-sala">
                <div class="hora">${exibirMensagens[i].time}</div>
                <div class="usuario">${exibirMensagens[i].from}</div>
                <div>${exibirMensagens[i].text}</div>
            </div>
            `;
        } else if(exibirMensagens[i].type === "message") {
            conteudoMensagens.innerHTML += `
            <div class="caixa-mensagem">
                <div class="hora">${exibirMensagens[i].time}</div>
                <div class="usuario">${exibirMensagens[i].from}</div>
                <div>para</div>
                <div class="usuario">${exibirMensagens[i].to}:</div>
                <div>${exibirMensagens[i].text}</div>
            </div>
            `;
        }
    }

    const ultimaMensagem = document.querySelector(".bloco-mensagens");
    ultimaMensagem.scrollIntoView({block: "end", behavior: "smooth"});
}

function mensagemErro(erro) {
    alert("Servidor offline");
    console.log(erro);
}

function funciona() {
    alert("aeee");
}

entrarNaSala();
buscarMensagens();
setInterval(buscarMensagens, 3000);
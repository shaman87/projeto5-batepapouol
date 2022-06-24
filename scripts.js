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

entrarNaSala();
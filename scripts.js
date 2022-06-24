function entrarNaSala() {
    const nome = prompt("Digite seu nome");
    const nomeUsuario = {name: nome};
    const requisicao = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", nomeUsuario);
    requisicao.then(tratarSucesso);
    requisicao.catch(tratarErro);
}

function tratarSucesso(sucesso) {
    const certo = sucesso.status;
    console.log(certo);
    alert("sucesso");
}

function tratarErro(erro) {
    const errado = erro.response.status;
    console.log(errado);
    alert("erro");
    if(errado === 400){
        entrarNaSala();
    }
}

entrarNaSala();
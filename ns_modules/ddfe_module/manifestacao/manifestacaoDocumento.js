const nsAPI = require('../../api_module/nsAPI')
const util = require("../../api_module/util")

const url = "https://ddfe.ns.eti.br/events/manif"

class Body {
    constructor(CNPJInteressado, chave, manifestacao) {
        this.CNPJInteressado = CNPJInteressado; 
        this.chave = chave;  
        this.manifestacao = manifestacao;     

    }
}
class manifestacao{
    constructor( tpEvento, xJust ){
    this.tpEvento = tpEvento;
    this.xJust = xJust
    }
}

class Response {
    constructor({ status, motivo, erro, retEvento }) {
       this.status = status;
       this.motivo = motivo;
       this.erro = erro;
       this.retEvento = retEvento;
    }
}

async function sendPostRequest(body, caminho, token) {

    let responseAPI = new Response(await nsAPI.PostRequest(url, body, token))

    if (responseAPI.pdf != null && caminhoSalvar !==null) {
        let data = responseAPI.pdf;
        let buff = Buffer.from(data, 'base64');
        util.salvarArquivo(caminho, responseAPI.chave, ".pdf", buff)
    }

    if (responseAPI.xml != null && caminhoSalvar !==null) {
        util.salvarArquivo(caminho, responseAPI.chave, ".xml", responseAPI.xml)
    }

    return responseAPI
}

module.exports = { Body, sendPostRequest,manifestacao }


const nsAPI = require('../../api_module/nsAPI')
const util = require("../../api_module/util")

const url = "https://ddfe.ns.eti.br/dfe/bunch"

class Body {
    constructor(CNPJInteressado, ultNSU, apenasPendManif, apenasComXml, modelo, comEventos, incluirPDF) {
        this.CNPJInteressado = CNPJInteressado;        
        this.ultNSU = ultNSU;
        this.apenasPendManif = apenasPendManif;
        this.apenasComXml = apenasComXml;
        this.modelo = modelo;
        this.comEventos = comEventos;
        this.incluirPDF = incluirPDF
    }
}

class Response {
    constructor({ status, motivo, ultNSU, xmls, nsu, chave, emitCnpj, emitRazao, cSitNFe, modelo, vNF, tpEvento, xml, pdf }) {
        this.status = status;
        this.motivo = motivo;
        this.ultNSU = ultNSU;
        this.xmls = xmls;
        this.nsu = nsu;
        this.chave = chave;
        this.emitCnpj = emitCnpj;
        this.emitRazao = emitRazao;
        this.cSitNFe = cSitNFe;
        this.modelo = modelo;
        this.vNF = vNF;
        this.tpEvento = tpEvento;
        this.xml = xml;
        this.pdf = pdf;
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

module.exports = { Body, sendPostRequest }


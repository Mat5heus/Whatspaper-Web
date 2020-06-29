// _27lSL - desenhos do background 
// _2WG1s - cor do background
// -GlrD _2xoTX - menu de conversas

(function() { 

    function pegarBg() {
        let tempo = false; // 100 ms
        const existo = setInterval(() => {
            let bg = document.querySelector("._2WG1s");
            let desenhos = document.querySelector("._27lSL");
            if (bg && desenhos) {
                clearInterval(existo);
                trocarBg(bg,restaurarJson('whatsappBackground').imagem);
                pegarMenu()
            }
        }, tempo)
    }

    function pegarMenu() {
        let tempo = 2000; // 2 segs
        const intervalo = setInterval(() => {
           let menu = document.querySelector(".-GlrD");
            if(menu) {
                clearInterval(intervalo);
                try {
                    menu.addEventListener("click",pegarBg)
                } catch(e) {
                    console.log("Menu nao encontrado: "+e)
                } 
            }
        }, tempo)
    }

    pegarMenu();

    function trocarBg(bg,url) {
        try {
            let desenhos = document.querySelector("._27lSL");
            if(url) {
                bg.style.background = "black url(\""+url+"\") no-repeat";
                bg.style.backgroundSize="cover";
                desenhos.hidden = true
            } else if (url == "") {
                bg.style.background = url;
                bg.style.backgroundSize= url;
                desenhos.hidden = false
            }
        } catch(e) {
            console.log("Erro ao alterar plano de fundo: "+e)
        }
    }

    chrome.runtime.onMessage.addListener(atualizar);

    function atualizar(mensagem, mandatario, enviarResposta) {
        if(mensagem.imagem == "reset") {
            mensagem.imagem = "";
            salvarJson('whatsappBackground', mensagem);
            trocarBg(document.querySelector("._2WG1s"),mensagem.imagem)
        } else {
            salvarJson('whatsappBackground', mensagem);
            trocarBg(document.querySelector("._2WG1s"),mensagem.imagem)
        }
    }

    function salvarJson(nome, obj) {
        try {
            localStorage.setItem(nome,JSON.stringify(obj))
        } catch(e) {
            console.log("Erro ao salvar Json: "+e)
        }
    }

    function restaurarJson(nome) {
        try {
            return JSON.parse(localStorage.getItem(nome))
        } catch (e) {
            console.log("Erro ao restaurar Json: "+e);
            return false
        }
    }

})();








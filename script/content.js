// _27lSL - desenhos do background 
// _2WG1s - cor do background
// -GlrD _2xoTX - menu de conversas

(function() { 

    function aguardarBG() {
        const existo = setInterval(() => {
            let background = pegarBG();
            if (background.cor && background.desenhos) {
                clearInterval(existo);
                trocarBg()
            }
        }, false);
    }

    function pegarBG() { 
        let background = {
            cor : document.querySelector("._2WG1s"),
            desenhos : document.querySelector("._27lSL")
        }
        return background;
    }

    function menuListener(menu) {
        menu.addEventListener("click",aguardarBG, false)
    }

    //***Funcao a ser melhorada***//
    function menu() {
        const intervalo = setInterval(() => {
           let menu = document.querySelector(".-GlrD"); //Não pode ser constante
            if(menu) {
                clearInterval(intervalo);
                menuListener(menu)
            }
        }, 2000) // 2 seg
    }

    menu();

    function trocarBg(url = restaurarJson('whatsappBackground'), background = pegarBG()) {
        try {
            if(url) {
                background.cor.style.background = "black url(\""+url.imagem+"\") no-repeat";
                background.cor.style.backgroundSize = "cover";
                background.desenhos.hidden = true
            } else {
                background.cor.style.background = '';
                background.cor.style.backgroundSize = '';
                background.desenhos.hidden = false
            }
        } catch(e) {
            console.log("Erro ao alterar plano de fundo: "+e)
        }
    }

    chrome.runtime.onMessage.addListener(atualizar);

    function atualizar(mensagem, mandatario, enviarResposta) {
        if(mensagem.imagem == "reset") {
            mensagem.imagem = false;callback
            salvarJson('whatsappBackground', mensagem);
            trocarBg(mensagem)
        } else {
            salvarJson('whatsappBackground', mensagem);
            trocarBg(mensagem)
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








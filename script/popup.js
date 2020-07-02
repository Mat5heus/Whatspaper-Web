(function() {

    function idioma(lang) {
        $.getJSON("script/dicionarios/"+lang+".json", function(dicionario) {
            let pesquisa = document.querySelector("#pesquisa");
            
            document.querySelector("html").lang = lang;
            document.querySelector("#titulo").innerHTML = dicionario.titulo;
            pesquisa.placeholder = dicionario.pesqPlaceholder;
            pesquisa.title = dicionario.pesqTitle;
            document.querySelector("#trocar").innerHTML = dicionario.btnTrocar;
            document.querySelector("#normal").innerHTML = dicionario.btnNormal
        });
    }
    
    idioma("pt-BR");

    document.querySelector("#trocar").addEventListener("click", () => {
        let input = document.querySelector("#pesquisa");
        if (input.value == '') {
            return;
        }
        enviar(input.value);
        input.value = "";
    });
    
    document.querySelector("#normal").addEventListener("click", () => {
        enviar("reset");
    });
    
    (function () {
        for (let i = 0; i < imagens.item.length; i++) {
            let img = document.createElement("IMG");
            img.setAttribute('id',i);
            img.setAttribute('class','imagens');
            img.setAttribute('src', "miniaturas/"+i+".jpg");
            document.querySelector("#containerImg").appendChild(img);
        }
        let galeria = document.getElementsByClassName("imagens");
        for (let i = 0; i < galeria.length; i++) {
            galeria[i].addEventListener("click",() => {
                enviar(imagens.item[i]);
            });
        }
    })();
    
    //atulizarImagens();
    
    function enviar(base64) {
        let parametros = {
            active: true,
            url: "https://web.whatsapp.com/*",
            currentWindow: true
        }
        
        chrome.tabs.query(parametros,pegarAba);
    
        function pegarAba(aba) {
            let mensagem = {
                imagem: base64
            }
            try {
                chrome.tabs.sendMessage(aba[0].id, mensagem);
            } catch(e) {
                console.log("Nao foi possivel encontrar aba whatsapp: "+e);
            } 
        }
    }
})();

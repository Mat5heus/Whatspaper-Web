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

    document.querySelector("div.container.seta").addEventListener("click", function(){
        const DIST = "70px";
        let setaCont = document.querySelector("div.container.seta");
        let menuCont = document.querySelector("div.container.menu");
        let seta = document.querySelector("#seta");
        if(setaCont.style.marginTop != DIST) {
            setaCont.style.marginTop = DIST;
            setaCont.style.paddingBottom = "5px";
            seta.style.borderBottom = "10px solid #eeeaea";
            seta.style.borderTop = "1px solid transparent";
            menuCont.style.height = DIST;
            menuCont.style.paddingTop = "10px";
            preencherGaleria(4,"icons", "png", "icons","div.container.menu");
        } else {
            setaCont.style.marginTop = "0px";
            seta.style.borderTop = "10px solid #eeeaea";
            setaCont.style.paddingBottom = "0px";
            seta.style.marginTop = "5px";
            seta.style.borderBottom = "4px solid transparent";
            menuCont.style.height = "0px";
            menuCont.innerHTML = '';
            menuCont.style.paddingTop = "0px"
        }
            
    });

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

    document.querySelector("div.container.galeria").addEventListener("click", function(event) {
        if(event.target.src) {
            enviar(imagens.item[event.target.id]);
        }
    });
    
    function preencherGaleria(quant, endereco, tipo, ident, query) {
        for (let i = 0; i < quant; i++) {
            let img = document.createElement("IMG");
            img.setAttribute('id',i);
            img.setAttribute('class',ident);
            img.setAttribute('src', endereco+"/"+i+"."+tipo);
            document.querySelector(query).appendChild(img);
        }
    };
    
    preencherGaleria(imagens.item.length, "miniaturas", "jpg", "imagens","div.container.galeria");
    
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

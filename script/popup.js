(function() {
    const QUANT_MENU_ICONS = 4;

    function idiomaHome(dicionario) {
        let pesquisa = document.querySelector("#pesquisa");
        document.querySelector("html").lang = dicionario.lang;
        document.querySelector("#titulo").innerHTML = dicionario.titulo;
        pesquisa.placeholder = dicionario.pesqPlaceholder;
        pesquisa.title = dicionario.pesqTitle;
        document.querySelector("#trocar").innerHTML = dicionario.btnTrocar;
        document.querySelector("#normal").innerHTML = dicionario.btnNormal
    }
    function idiomaMenu(dicionario) {
        let icons = document.getElementsByClassName("icons");
        if (icons) {
            for(let nome in dicionario.icons) {
                icons[nome].title = dicionario.icons[nome];
            }
        }
    }

    function dicionario(lang, callback) {
        $.getJSON("dicionarios/"+lang.idioma+".json", callback)
    }

    function preferencias(callbackInicial, callbackFinal) {
        $.getJSON("user/preferences.json", (preferencia) => { 
            callbackInicial(preferencia, callbackFinal)
        })
    }
    
    preferencias(dicionario,idiomaHome);

    function opcoesDoMenu(event) {
        if(event.target.src) {
            menuDeslizante();
            let opcoes = document.querySelector("div.container.opcoes");
            let object = document.createElement("object");

            opcoes.style.width = "100%";
            opcoes.style.height = "100%";
            
            if(event.target.id == "0")
                object.setAttribute("data","conf.html")
            else if(event.target.id == "1") 
                object.setAttribute("data","historico.html")
            else if(event.target.id == "2")
                object.setAttribute("data","como-usar.html")
            else
                object.setAttribute("data","sobre.html")
                
            object.setAttribute("width","100%");
            object.setAttribute("height","100%");

            opcoes.appendChild(object)
        }
    }

    function esconderElementos(ident) {
        let imagem = document.getElementsByClassName(ident);
        for(let img in imagem) {
            imagem[img].style.display = "none"
        }
    }

    function menuDeslizante() {
        let setaCont = document.querySelector("div.container.seta");
        let menuCont = document.querySelector("div.container.menu");
        let seta = document.querySelector("#seta");

        if(setaCont.style.marginTop != "80px") {
            setaCont.style.marginTop = "80px";
            setaCont.style.paddingBottom = "5px";

            seta.style.borderBottom = "10px solid #eeeaea";
            seta.style.borderTop = "1px solid transparent";

            menuCont.style.height = "60px";
            menuCont.style.paddingTop = "20px";
            menuCont.addEventListener("click", opcoesDoMenu, false);
            menuCont.addEventListener("mouseleave", menuDeslizante, false);

            adicionarImagens(QUANT_MENU_ICONS,"icons", "png", "icons","div.container.menu");
            preferencias(dicionario,idiomaMenu)
        } else {
            setaCont.style.marginTop = "0px";
            setaCont.style.paddingBottom = "0px";

            seta.style.borderTop = "10px solid #eeeaea";
            seta.style.marginTop = "5px";
            seta.style.borderBottom = "4px solid transparent";

            menuCont.style.height = "0px";
            menuCont.innerHTML = '';
            menuCont.style.paddingTop = "0px";
            menuCont.removeEventListener("mouseleave", menuDeslizante, false);
            menuCont.removeEventListener("click", opcoesDoMenu, false); 
        }
    }
    document.querySelector("div.container.menu").addEventListener("mouseleave", menuDeslizante, false);

    document.querySelector("div.container.seta").addEventListener("click", menuDeslizante, false);

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
    },false);

    document.querySelector("div.container.galeria").addEventListener("click", function(event) {
        if(event.target.src) {
            enviar(imagens.item[event.target.id]);
        }
    });
    
    function adicionarImagens(quant, endereco, tipo, ident, query, title = false) {
        for (let i = 0; i < quant; i++) {
            let img = document.createElement("IMG");
            if (title)
                img.setAttribute('title', title[i])
            img.setAttribute('id',i);
            img.setAttribute('class',ident);
            img.setAttribute('src', endereco+"/"+i+"."+tipo);

            document.querySelector(query).appendChild(img)
        }
    };
    
    adicionarImagens(imagens.item.length, "miniaturas", "jpg", "imagens","div.container.galeria");
    
    function enviar(texto) {
        let parametros = {
            active: true,
            url: "https://web.whatsapp.com/*",
            currentWindow: true
        }
        
        chrome.tabs.query(parametros,pegarAba);
    
        function pegarAba(aba) {
            let mensagem = {
                imagem: texto
            }
            try {
                chrome.tabs.sendMessage(aba[0].id, mensagem);
            } catch(e) {
                console.log("Nao foi possivel encontrar aba whatsapp: "+e);
            } 
        }
    }
})();

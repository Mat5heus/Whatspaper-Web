
function dicionario(preferencia, callback) {
    $.getJSON("dicionarios/"+preferencia.idioma+".json", callback)
}

function preferencias(callbackInicial, callbackFinal) {
    try {
        let preferencia = restaurarJson("preferences");
        callbackInicial(preferencia, callbackFinal)
    } catch(e) {
        $.getJSON("user/preferences.json", (preferencia) => { 
            callbackInicial(preferencia, callbackFinal)
        })
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
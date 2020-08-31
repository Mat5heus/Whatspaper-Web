
document.querySelector("select#idiomas").addEventListener("change", (event) => {
    try{
        var pref = restaurarJson("preferences");
    } catch(e) {
        var pref = {};
    } finally {
        pref.idioma = event.target.options[event.target.selectedIndex].value;
        pref.index = event.target.selectedIndex;
        salvarJson("preferences", pref);
    }
});
function atualizarIdioma(dicionario) {
    document.querySelector("h3.titulo.principal").innerHTML = dicionario.configuracoes.titulo;
    document.querySelector("label#Idioma").innerHTML = dicionario.configuracoes.labelIdioma;
    document.querySelector("label#Apagar").innerHTML = dicionario.configuracoes.apagarTitulo;
    document.querySelector("button#Apagar").innerHTML = dicionario.configuracoes.resetButton;
}
(function () {
    if(restaurarJson("preferences")) {
        var pref = restaurarJson("preferences");
        let select = document.querySelector("select#idiomas");
        select.options[pref.index].selected = true;
        dicionario(pref, atualizarIdioma);
    }
})();


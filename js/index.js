document.addEventListener("DOMContentLoaded", (event) => {
    buscarInscritos();
    construirModal();

    const temaLocal = localStorage.getItem("tema");
    document.body.setAttribute("data-theme", temaLocal);
});

let idiomaAtual = "pt";

function alterarIdioma() {
    idiomaAtual= idiomaAtual == "pt" ? "en" : "pt";
    carregarIdioma(idiomaAtual);
}

function carregarIdioma(idioma) {
    fetch(`json/${idioma}.json`)
    .then(data=> data.json())
    .then(data=> traduzirPagina(data))
}

function traduzirPagina(linguagem) {
    document.querySelectorAll("[data-i18n]").forEach((elemento) => {
        console.log(elemento);
        const chave = elemento.getAttribute("data-i18n");
        console.log(chave);
        if(linguagem[chave]){
            elemento.textContent = linguagem[chave];

        }
    });

    document.querySelectorAll("[data-i18n-alt]").forEach((elemento) => {
        console.log(elemento);
        const chave = elemento.getAttribute("data-i18n-alt");
        if(linguagem[chave]){
            elemento.setAttribute("alt", linguagem[chave]);
        }
    });
}

function construirModal() {
    const botaoSaibaMais = document.getElementById("saiba-mais");
    const modal = document.getElementById("modal");
    const botaoFechar = document.getElementById("fechar-modal");

    botaoFechar.addEventListener("click", ()=>{
        modal.classList.add("hidden");
    });

    botaoSaibaMais.addEventListener("click", () => {
        modal.classList.remove("hidden");
    });

    window.addEventListener("click", (e) => {
        console.log(e.target);
        if (e.target == modal) {
            modal.classList.add("hidden");
        }
    });
}

function alterarTema() {
    //DOM -> document object model
    const tema = document.body.getAttribute("data-theme");
    const novoTema = tema == 'dark' ? 'light' : 'dark';
    /* let novoTema = '';
     if(tema == 'dark'){
         novoTema = 'light';
     }else{
         novoTema = 'dark';
     }*/
    localStorage.setItem("tema", novoTema);
    document.body.setAttribute("data-theme", novoTema);

    const btAlterarTema = document.getElementById("btAlterarTema");
    btAlterarTema.textContent = novoTema == 'dark' ? 'Light' : 'Dark';
}

function buscarInscritos() {
    //fetch("https://jsonplaceholder.typicode.com/users")
    fetch("json/inscritos.json")
        .then(res => res.json())
        .then(res => {
            //alert("Na requisição");
            const divInscritos = document.getElementById('inscritos');
            res.forEach(user => {
                const novoParagrafo = document.createElement("p");
                novoParagrafo.textContent = `Nome: ${user.nome}`;
                divInscritos.appendChild(novoParagrafo);
            });
        }).catch(e => console.log(e));

    //alert("Olá");
}
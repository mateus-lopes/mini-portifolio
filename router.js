
// Adiciona um ouvinte de evento para cliques em links com o atributo "data-app"
document.addEventListener("click", e => {
    // Verifica se o alvo do clique é um link "data-app"
    if (e.target.hasAttribute("data-app")) {
        // Obtém o nome do aplicativo do atributo "data-app"
        const app = e.target.getAttribute("data-app");

        // Carrega o HTML e o JavaScript do aplicativo
        const html = fetch(`apps/${app}/index.html`).then(r => r.text());
        const js = fetch(`apps/${app}/js/app${app}.js`).then(r => r.text());

        // Quando ambos o HTML e o JavaScript forem carregados, atualiza o elemento "main"
        Promise.all([html, js]).then(results => {
            document.getElementById("main").innerHTML = results[0];
            eval(results[1]);
        });
    }
});
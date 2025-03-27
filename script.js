document.addEventListener("DOMContentLoaded", function () {
    const botao = document.getElementById("buscar");
    botao.addEventListener("click", buscarDigimon);
});

function buscarDigimon() {
    let nome = document.getElementById("digimonName").value.trim().toLowerCase();
    let resultado = document.getElementById("resultado");

    if (nome === "") {
        resultado.innerHTML = "<p style='color:red;'>Por favor, insira um nome de Digimon.</p>";
        return;
    }

    fetch(`https://digi-api.com/api/v1/digimon/${nome}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Digimon não encontrado");
            }
            return response.json();
        })
        .then(data => {
            resultado.innerHTML = `
                <div class="card">
                    <h2>${data.name}</h2>
                    <img src="${data.images[0].href}" alt="${data.name}">
                    <p>Nível: ${data.levels ? data.levels[0].level : "Desconhecido"}</p>
                    <p>Tipo: ${data.types ? data.types[0].type : "Desconhecido"}</p>
                </div>
            `;
        })
        .catch(error => {
            resultado.innerHTML = "<p style='color:red;'>Digimon não encontrado.</p>";
        });
}

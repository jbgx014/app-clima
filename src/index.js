import { buscarDadosClima } from "./api.js";

// Esta função é responsável por traduzir o código do clima para uma descrição legível
function traduzirClima(codigo) {
    const mapa = {
        0: "Céu limpo ☀️",
        1: "Principalmente limpo 🌤️",
        2: "Parcialmente nublado ⛅",
        3: "Nublado ☁️",
        45: "Nevoeiro 🌫️",
        48: "Nevoeiro com geada 🌫️",
        51: "Garoa leve 🌦️",
        53: "Garoa moderada 🌦️",
        55: "Garoa intensa 🌧️",
        61: "Chuva leve 🌧️",
        63: "Chuva moderada 🌧️",
        65: "Chuva forte 🌧️",
        71: "Neve leve ❄️",
        73: "Neve moderada ❄️",
        75: "Neve forte ❄️",
        95: "Tempestade ⛈️"
    };

    return mapa[codigo] || "Clima desconhecido";
}

// 1. Selecionamos os elementos do HTML que vamos usar
const botao = document.getElementById('fetch-weather');
const campoCidade = document.getElementById('city-input');
const containerResultado = document.getElementById('weather-result');

// 2. Criamos o "ouvinte" para o clique do botão
botao.addEventListener('click', async () => {
    const nomeDaCidade = campoCidade.value.trim();

    // Validação simples: não deixa pesquisar se o campo estiver vazio
    if (nomeDaCidade === "") {
        alert("Por favor, digite o nome de uma cidade.");
        return;
    }

    // Limpamos o resultado anterior e mostramos que está carregando
    containerResultado.innerHTML = `<p>Buscando clima para <strong>${nomeDaCidade}</strong>...</p>`;

    // 3. Chamamos a função que está lá no api.js
    const dados = await buscarDadosClima(nomeDaCidade);

    // 4. Lógica de exibição (decide o que mostrar baseado no resultado)
    if (dados) {
         const descricao = traduzirClima(dados.codigoClima);
        // Sucesso: Monta o card azul com os dados
        containerResultado.innerHTML = `
            <div class="card-clima">
                <h2>${dados.nomeCidade}</h2>
                <p>Estado: ${dados.estado}</p>
                <p>${descricao}</p>
                <p class="temp">${dados.temperatura}${dados.unidade}</p>
            </div>
        `;
    } else if (dados === null) {
        // Erro: Cidade não encontrada (mostra o erro com o estilo do CSS)
        containerResultado.innerHTML = `
            <div class="msg-erro">
                <p>⚠️ Cidade "<strong>${nomeDaCidade}</strong>" não encontrada.</p>
                <span>Verifique a ortografia e tente novamente.</span>
            </div>
        `;
    } else {
        // Erro: Problema técnico (mostra o erro com o estilo do CSS)
        containerResultado.innerHTML = `
            <div class="msg-erro">
                <p>❌ Ops! Ocorreu um erro no servidor.</p>
                <span>Tente novamente em alguns instantes.</span>
            </div>
        `;
    }
});
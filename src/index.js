import { buscarClimaMultiplasCidades } from "./api.js";

// Traduz código do clima
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

// Formata data (YYYY-MM-DD → DD/MM)
function formatarData(data) {
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}`;
}

// Elementos do HTML
const botao = document.getElementById('fetch-weather');
const campoCidade = document.getElementById('city-input');
const containerResultado = document.getElementById('weather-result');

// Evento de clique
botao.addEventListener("click", async () => {
    const entrada = campoCidade.value.trim();

    if (!entrada) {
        alert("Por favor, digite pelo menos uma cidade.");
        return;
    }

    const cidades = entrada
        .split(",")
        .map((cidade) => cidade.trim())
        .filter((cidade) => cidade !== "");

    // Loading
    containerResultado.innerHTML = `<p>Buscando clima para ${cidades.length} cidade(s)...</p>`;

    const resultados = await buscarClimaMultiplasCidades(cidades);

    if (resultados === undefined) {
        containerResultado.innerHTML = `
            <div class="msg-erro">
                <p>Ops! Ocorreu um erro no servidor.</p>
                <span>Tente novamente em alguns instantes.</span>
            </div>
        `;
        return;
    }

    containerResultado.innerHTML = "";

    resultados.forEach((dados, index) => {
        const nomeBuscado = cidades[index];

        if (dados) {
            // 🔥 Monta os 7 dias
            let previsoesHTML = "";

            dados.previsao.time.forEach((data, i) => {
                const descricao = traduzirClima(dados.previsao.weathercode[i]);
                const max = dados.previsao.temperature_2m_max[i];
                const min = dados.previsao.temperature_2m_min[i];

                previsoesHTML += `
                    <div class="dia">
                        <p><strong>${formatarData(data)}</strong></p>
                        <p>${descricao}</p>
                        <p>🌡️ ${min}° / ${max}°</p>
                    </div>
                `;
            });

            containerResultado.innerHTML += `
    <div class="card-clima">
        <h2>${dados.nomeCidade}</h2>
        <p>Estado: ${dados.estado}</p>

        <p class="agora">Temperatura atual:</p>   
        <p class="temp">${dados.temperatura}${dados.unidade}</p>
        <p>${traduzirClima(dados.codigoClima)}</p>

        <div class="previsao">
            ${previsoesHTML}
        </div>
    </div>
`;

        } else if (dados === null) {

            containerResultado.innerHTML += `
                <div class="msg-erro">
                    <p>⚠️ Cidade "<strong>${nomeBuscado}</strong>" não encontrada.</p>
                    <span>Verifique a ortografia e tente novamente.</span>
                </div>
            `;

        } else {

            containerResultado.innerHTML += `
                <div class="msg-erro">
                    <p>❌ Ops! Ocorreu um erro ao buscar <strong>${nomeBuscado}</strong>.</p>
                    <span>Tente novamente em alguns instantes.</span>
                </div>
            `;
        }
    });
});
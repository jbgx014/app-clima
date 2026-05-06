//
// ======================================
// 🔍 BUSCA CLIMA DE UMA CIDADE
// ======================================
export async function buscarDadosClima(cidade) {
    try {

        // ==============================
        // 1️⃣ GEOCODING (cidade → coordenadas)
        // ==============================
        const urlGeocoding = `https://geocoding-api.open-meteo.com/v1/search?name=${cidade}&count=1&language=pt&format=json`;

        const respostaGeo = await fetch(urlGeocoding);
        const dadosGeo = await respostaGeo.json();

        // Se não encontrou a cidade
        if (!dadosGeo.results || dadosGeo.results.length === 0) {
            return null;
        }

        // Extrai coordenadas e nome
        const { latitude, longitude, name, admin1 } = dadosGeo.results[0];


        // ==============================
        // 2️⃣ CLIMA (atual + previsão 7 dias)
        // ==============================
        const urlWeather = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`;

        const respostaClima = await fetch(urlWeather);
        const dadosClima = await respostaClima.json();


        // ==============================
        // 3️⃣ RETORNO ORGANIZADO
        // ==============================
        return {
            nomeCidade: name,
            estado: admin1,

            // 🌡️ clima atual
            temperatura: dadosClima.current_weather?.temperature,
            codigoClima: dadosClima.current_weather?.weathercode,
            unidade: "°C",

            // 📅 previsão 7 dias
            previsao: dadosClima.daily
        };

    } catch (erro) {
        console.error("Erro na requisição:", erro);
        return undefined;
    }
}


// ======================================
// 🌍 BUSCA MÚLTIPLAS CIDADES
// ======================================
export async function buscarClimaMultiplasCidades(cidades) {
    try {

        const promessas = cidades.map((cidade) =>
            buscarDadosClima(cidade.trim())
        );

        const resultados = await Promise.all(promessas);

        return resultados;

    } catch (erro) {
        console.error("Erro ao buscar múltiplas cidades:", erro);
        return undefined;
    }
}
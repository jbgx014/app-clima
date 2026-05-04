// Esta função será chamada pelo seu outro arquivo (index.js)
export async function buscarDadosClima(cidade) {
    try {
        // Passo 1: Transformar o nome da cidade em coordenadas (Latitude/Longitude)
        const urlGeocoding = `https://geocoding-api.open-meteo.com/v1/search?name=${cidade}&count=1&language=pt&format=json`;
        
        const respostaGeo = await fetch(urlGeocoding);
        const dadosGeo = await respostaGeo.json();

        // Se a API não encontrar a cidade, retornamos null
        if (!dadosGeo.results || dadosGeo.results.length === 0) {
            return null;
        }

        // Extraímos os dados da primeira cidade encontrada
        const { latitude, longitude, name, admin1 } = dadosGeo.results[0];

        // Passo 2: Buscar a temperatura atual usando as coordenadas
        const urlWeather = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
        
        const respostaClima = await fetch(urlWeather);
        const dadosClima = await respostaClima.json();

        // Retornamos um objeto organizado com o que precisamos exibir
        return {
            nomeCidade: name,
            estado: admin1,
            temperatura: dadosClima.current_weather.temperature,
            unidade: dadosClima.current_weather_units.temperature,
            codigoClima: dadosClima.current_weather.weathercode
        };

    } catch (erro) {
        console.error("Erro na requisição:", erro);
        return undefined;
    }
}

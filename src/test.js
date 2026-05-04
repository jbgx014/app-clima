// Para testar trocar no index.html a linha:
// <script type="module" src="./app.js"></script>
// por
// <script type="module" src="./test.js"></script>
// Depois de testar, trocar novamente para rodar o app normal

// IMPORTA sua função principal
import { buscarDadosClima } from "./api.js";

// Função principal que roda todos os testes
async function testarApp() {
    console.log("============== INÍCIO DOS TESTES ==============");

    // ✅ Teste 1: Cidade válida
    console.log("\nTeste 1: Cidade válida");
    let resultado = await buscarDadosClima("São Paulo");

    if (resultado && resultado.temperatura !== undefined) {
        console.log("OK:", resultado);
    } else {
        console.log("Erro: não retornou dados válidos");
    }

    // ❌ Teste 2: Cidade inválida
    console.log("\nTeste 2: Cidade inválida");
    resultado = await buscarDadosClima("cidade_inexistente_123");

    if (resultado === null) {
        console.log("OK: cidade não encontrada tratada corretamente");
    } else {
        console.log("Erro: deveria retornar null");
    }

    // ⚠️ Teste 3: Entrada vazia
    console.log("\nTeste 3: Entrada vazia");
    resultado = await buscarDadosClima("");

    if (resultado === null || resultado === undefined) {
        console.log("OK: entrada vazia tratada");
    } else {
        console.log("Verifique: entrada vazia não tratada corretamente");
    }

    console.log("\n============== TESTES PRINCIPAIS FINALIZADOS ==============");
}


// ABAIXO OS TESTES EXTREMOS!

// 🌐 Teste de erro de rede
async function testeErroRede() {
    console.log("\nTeste 4: Erro de rede");

    // 👉 Para testar de verdade:
    // - desligue a internet
    // OU
    // - altere temporariamente a URL no api.js

    const resultado = await buscarDadosClima("São Paulo");

    if (resultado === undefined) {
        console.log("OK: erro de rede tratado corretamente");
    } else {
        console.log("Verifique: simule falha de rede para validar este teste");
    }
}

// ⚠️ Teste de resposta inesperada da API
function testeRespostaInvalida() {
    console.log("\nTeste 5: Resposta inesperada da API");

    // Simulação: dados sem current_weather
    try {
        const dadosFake = {};
        console.log(dadosFake.current_weather.temperature);
    } catch (erro) {
        console.log("OK: código precisa tratar ausência de dados da API");
    }
}

// 🚀 Executa todos os testes
async function executarTestes() {
    await testarApp();
    await testeErroRede();
    testeRespostaInvalida();

    console.log("\n============== FIM DOS TESTES ==============");
}

executarTestes();
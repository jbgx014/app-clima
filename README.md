# 🌦️ App Clima

Aplicação web para consulta de clima em tempo real utilizando a API Open-Meteo, desenvolvida como parte de um exercício do curso Generation Brasil. O projeto foi construído com apoio do ChatGPT, conforme proposto na atividade, com foco em aprendizado, boas práticas e uso consciente de ferramentas de IA.

## 📖 Sobre o Projeto
O App Clima permite que o usuário digite o nome de uma cidade e visualize:

* 🌡️ **Temperatura atual**
* ☁️ **Descrição do clima**
* 📍 **Nome da cidade e região**

O app utiliza duas etapas principais:
1. 🔎 **Geocoding** — converte o nome da cidade em latitude e longitude.
2. 🌍 **Weather API** — busca os dados de clima com base nas coordenadas.

Além disso, o projeto trata erros como cidades inválidas e falhas de requisição.

## 🛠️ Tecnologias
* HTML5
* CSS3
* JavaScript (ES Modules)
* [API Open-Meteo](https://open-meteo.com/)

## 📁 Estrutura do Projeto

```text
APP-CLIMA
├── public/
│   └── index.html
├── src/
│   ├── api.js
│   ├── index.js
│   ├── styles.css
│   └── test.js
└── README.md
```

## 🚀 Como Executar
Abra o projeto no VS Code.

Localize e abra o arquivo: public/index.html.

Execute com a extensão Live Server ou abra o arquivo diretamente no seu navegador.


## ▶️ Como Usar

1. Digite o nome de uma cidade no campo de busca.
2. Clique no botão **"Buscar Clima"**.
3. Veja as informações meteorológicas atualizadas na tela.

## 📊 Exemplo

**Entrada:**
> São Paulo

**Saída:**
> São Paulo  
> Estado: São Paulo  
> Parcialmente nublado ⛅  
> 25°C

## ✨ Funcionalidades

*   🔍 **Busca de clima** dinâmica por nome da cidade.
*   🌍 **Conversão automática** de endereços para coordenadas geográficas.
*   🌡️ **Exibição em tempo real** da temperatura atual.
*   ☁️ **Tradução inteligente** de códigos de clima para descrições amigáveis.
*   ⚠️ **Tratamento de erros completo:**
    *   Cidade não encontrada.
    *   Entrada de texto vazia.
    *   Falhas na comunicação com a API.
*   🧪 **Testes manuais** integrados via `test.js`.
*   🎨 **Interface moderna**, responsiva e minimalista.


## ▶️ Como rodar os testes

No arquivo `index.html`, altere a chamada do script:

```html
<!-- De: -->
<script type="module" src="../src/index.js"></script>

<!-- Para: -->
<script type="module" src="../src/test.js"></script>
```

## ⚠️ Tratamento de Erros

| Situação | Comportamento |
| :--- | :--- |
| **Cidade inválida** | Retorna `null` |
| **Erro de rede** | Retorna `undefined` |
| **Entrada vazia** | Bloqueada diretamente no frontend |

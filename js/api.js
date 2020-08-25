class API{
    constructor(apiKey){
        this.apiKey = apiKey;
    }
    //Obtener todas las monedas
    async obtenerMonedasAPI(){
        const url = `
        https://min-api.cryptocompare.com/data/all/coinlist?api_key=${this.apiKey}` 

        //fetch a la api
        const urlObtenerMonedas = await fetch(url);

        //Respuesta en json
        const monedas = await urlObtenerMonedas.json();

        return{
            monedas
        }
    }

    async obtenerValores(moneda, criptomoneda){
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}&api_key=${this.apiKey}`;

        //Consultar en rest api
        const urlConvertir = await fetch(url);

        const resultado = await urlConvertir.json();

        return{
            resultado
        }
    }
}
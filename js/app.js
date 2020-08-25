const cotizador = new API('34f39a9ce5869f3fa50aca093a68a679e7c0a1b2179bd46ea380076f4640dfd5');
const ui = new Interfaz();





//Leer formulario
const formulario = document.querySelector('#formulario');
//Event Listener
formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    //Leer la moneda seleccionada
    const monedaSelect = document.querySelector('#moneda');
    const monedaSeleccionada = monedaSelect.options[monedaSelect.selectedIndex].value;
    //Leer la criptomoneda seleccionada
    const criptoMonedaSelect = document.querySelector('#criptomoneda');
    const criptoMonedaSeleccionada = criptoMonedaSelect.options[criptoMonedaSelect.selectedIndex].value;

    //Comprobar que ambos campos tengan algo seleccionado
    if(monedaSeleccionada === '' || criptoMonedaSeleccionada === ''){
        console.log('Selecciona algo')
        //Lanzar una alerta de error
        ui.mostarMensaje('Ambos Campos son Obligatorios', 'alert bg-danger text-center');
    }else {
        //Todo OK consultar la api
       cotizador.obtenerValores(monedaSeleccionada, criptoMonedaSeleccionada)
       .then(data => {
           ui.mostrarResultado(data.resultado.RAW,monedaSeleccionada,criptoMonedaSeleccionada);
       })
        
    }
    console.log(monedaSeleccionada);
    console.log(criptoMonedaSeleccionada);
})
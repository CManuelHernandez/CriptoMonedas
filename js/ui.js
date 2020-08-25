class Interfaz{

    constructor(){
        this.init();
    }
    init(){
        this.construirSelect();
    }

    construirSelect(){
        cotizador.obtenerMonedasAPI()
            .then(monedas => {

                //crear un select de opciones
                const select = document.querySelector('#criptomoneda');

                //Iterar por los resultados de la api
                for(const [key, value] of Object.entries(monedas.monedas.Data)){
                    //Añadir el Symbol y el nombre como opciones
                    const opcion = document.createElement('option');
                    opcion.value = value.Symbol;
                    opcion.appendChild(document.createTextNode(value.CoinName));
                    select.appendChild(opcion);
                }
            })
    }

    mostarMensaje(mensaje, clases){
        const div = document.createElement('div');
        div.className = clases;
        div.appendChild(document.createTextNode(mensaje));

        
        //Seleccionar mensajes
        const divMensajes = document.querySelector('.mensajes');
        divMensajes.appendChild(div);
        //Mostrar contenido
        setTimeout(() => {
            document.querySelector('.mensajes div').remove();
        },3000)

    }

    //Imprime el resultado de la cotizacion

    mostrarResultado(resultado, moneda, crypto){

        //En caso de un resultado anterior, ocultarlo
        const resultadoAnterior = document.querySelector('#resultado > div');

        if(resultadoAnterior) {
            resultadoAnterior.remove();
        };
        
        const datosMoneda = resultado[crypto][moneda]

        console.log(datosMoneda);

        //Recortar decimales de precio
        let precio = datosMoneda.PRICE.toFixed(2),
            porcentaje = datosMoneda.CHANGEPCTDAY.toFixed(2),
            actualizado = new Date(datosMoneda.LASTUPDATE * 1000).toLocaleDateString('es-ES');
            

        //Construir el template

        let templateHTML = `
            <div class="card bg-warning">
                <div class="card-body text-light">
                    <h2 class="card-title">Resultado: </h2>
                    <p>El Precio de ${datosMoneda.FROMSYMBOL} a moneda ${datosMoneda.TOSYMBOL} es de: $ ${precio}</p>
                    <p>Variacion último día: % ${porcentaje}</p>
                    <p>Ultima Actualizacion: ${actualizado}</p>
                    
                </div>
            </div>
        `;

        this.mostrarOcultarSpinner('block');
        setTimeout(() => {
            //Insertar el resultado
            document.querySelector('#resultado').innerHTML = templateHTML;

            //Ocultar el spinner
            this.mostrarOcultarSpinner('none');
        },3000);

        
    }

    //Mostar un spineer de carga al enviar la cotizacion
    mostrarOcultarSpinner(vista){
        const spinner = document.querySelector('.contenido-spinner');
        spinner.style.display = vista;

    }
}
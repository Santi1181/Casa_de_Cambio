// https://v6.exchangerate-api.com/v6/475615bb6d77e2ed59770143/latest/USD   --- Obtener Ultimo
// https://v6.exchangerate-api.com/v6/475615bb6d77e2ed59770143/history/USD/2020/05/01  --- Historico - Plan pago

const URLAPI = 'https://v6.exchangerate-api.com/v6/475615bb6d77e2ed59770143/latest/'

function fetchCotizaciones(moneda = 'ARS') {
    fetch(URLAPI + moneda)
        .then((resultado) => resultado.json())
        .then((datos) => {
            refrescarPantalla()
            Object.keys(datos.conversion_rates).forEach(moneda => {
                mostrarTasas(moneda, datos.conversion_rates[moneda])
                mostrarMonedas(moneda)
            })
            console.log(datos)
            agregarFechaUltimaActualizacion(datos.time_last_update_utc)
        })
}

function mostrarTasas(moneda, valor) {

    const tablaContenido = document.querySelector('#tabla-cotizaciones');

    const registroTabla = document.createElement('tr');

    const columnaMoneda = document.createElement('th');
    const columnaCotizacion = document.createElement('th');

    columnaMoneda.textContent = `${moneda}`;
    columnaCotizacion.textContent = `$${valor}`

    registroTabla.append(columnaMoneda, columnaCotizacion);
    tablaContenido.appendChild(registroTabla);
}


function mostrarMonedas(moneda) {
    const selectorMoneda = document.querySelector('#selector-moneda-base');
    const opcionMoneda = document.createElement('option');

    opcionMoneda.setAttribute('value', `${moneda}`);
    opcionMoneda.textContent = `${moneda}`;

    selectorMoneda.appendChild(opcionMoneda);
}

function agregarFechaUltimaActualizacion(fechaActualizacion) {
    document.querySelector('#ultima-actualizacion').textContent = fechaActualizacion.substring(0, 16)
}

function refrescarPantalla() {
    let tabla = document.querySelector('#tabla-cotizaciones')
    limpiar(tabla)

    let monedas = document.querySelector('#selector-moneda-base')
    limpiar(monedas)

    document.querySelector('#ultima-actualizacion').textContent = ''
}

function limpiar(padre) {
    while (padre.firstChild) {
        padre.removeChild(padre.firstChild)
    }
}


document.querySelector('#actualizar').addEventListener('click', () => {
    let monedaSeleccionada = document.querySelector('#selector-moneda-base').value
    fetchCotizaciones(monedaSeleccionada)
})


fetchCotizaciones()

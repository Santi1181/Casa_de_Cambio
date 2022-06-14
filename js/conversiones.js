// https://v6.exchangerate-api.com/v6/475615bb6d77e2ed59770143/latest/USD   --- Obtener Ultimo
// https://v6.exchangerate-api.com/v6/475615bb6d77e2ed59770143/history/USD/2020/05/01  --- Historico - Plan pago

const URLAPI = 'https://v6.exchangerate-api.com/v6/475615bb6d77e2ed59770143/latest/'

function fetchCargarMonedaConversion(moneda = 'ARS') {
    fetch(URLAPI + moneda)
        .then(resultado => resultado.json())
        .then(datos => {
            Object.keys(datos.conversion_rates).forEach(moneda => {
                mostrarMonedaConversion(moneda)
            })

        })

}

function mostrarMonedaConversion(moneda) {
    const selectorMonedaBase = document.querySelector('#moneda-base');
    const selectorMonedaDestino = document.querySelector('#moneda-destino');

    const monedaBase = document.createElement('option');
    const monedaDestino = document.createElement('option');

    monedaBase.setAttribute('value', `${moneda}`);
    monedaBase.textContent = `${moneda}`;

    monedaDestino.setAttribute('value', `${moneda}`);
    monedaDestino.textContent = `${moneda}`;

    selectorMonedaBase.appendChild(monedaBase);
    selectorMonedaDestino.appendChild(monedaDestino);
}

async function fetchCotizacionMoneda(monedaBase, monedaDestino) {
    const cantidadAConvertir = document.querySelector('#cantidad-a-convertir').value

    const resultado = await fetch(URLAPI + monedaBase)
    const datos = await resultado.json();
    const cotizacion = datos.conversion_rates[monedaDestino]

    document.querySelector('#resultado').value = (cantidadAConvertir * cotizacion).toFixed(2)
    document.querySelector('#resultado-conversion').textContent = monedaDestino

}


document.querySelector('#convertir').addEventListener('click', () => {

    let monedaBase = document.querySelector('#moneda-base').value
    let monedaDestino = document.querySelector('#moneda-destino').value

    fetchCotizacionMoneda(monedaBase, monedaDestino)

})


fetchCargarMonedaConversion()








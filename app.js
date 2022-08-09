const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');

const routes = require('./routes');

const app = express()
app.set('port', process.env.PORT || 9000)
app.use(cors({ origin: "*" }));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes -------------------------------------------
app.get('/', (req, res)=>{
    res.send('Welcome to my API')
})
app.use('/api', routes)

// server running -----------------------------------
app.listen(app.get('port'), ()=>{
    console.log('server running on port', app.get('port'))
})

/**
 * [Autenticación de google]
 * @param {JSON} credencialesV2 Archivo JSON descargado desde google cloud el cual nos permite usar una cuenta de Servicio 
 * 
 */


/**
 * [Escribiendo Datos en la Hoja de Calculo]
 * @param Autenticacion  Cuenta de servicio la cual tiene acceso y privilegios en la hoja de calculo
 * @param {String} spreadsheetid id de la hoja de calculo donde se escribiran los datos
 * @param {String} range Rango en el cual se escribiran los datos
 * @param {String} valueInputOption permite que los valores sean analizados como si el usuario los hubiera escrito directamente en la hoja de calculo, por ejemplo, los numeros seran numeros y si se detecta el formato de fecha se considerara una fecha
 * @param {String} majorDimension El orden en que los datos seran ingresados, en este caos es en filas, la otra opción seria COLUMNS o columnas
 * @param {Array} values los valores a ser ingresados en la hoja de calculo
 */
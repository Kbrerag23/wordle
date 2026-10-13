import { useEffect, useState } from 'react'
import Casilla from './components/Casilla.jsx'

const FILAS = 6
const COLUMNAS = 5
const PALABRAS = [
  'ACTOR', 'AGUAS', 'ALTAR', 'AMIGO', 'ANDAR', 'ANGEL', 'ARBOL', 'ARENA', 'ASILO', 'AVION',
  'BAHIA', 'BANCO', 'BARCO', 'BESOS', 'BRAZO', 'BUENO', 'CABLE', 'CAIDA', 'CAJON', 'CALOR',
  'CAMPO', 'CANTO', 'CARNE', 'CARRO', 'CASAS', 'CEBRA', 'CERCA', 'CIEGO', 'CIELO', 'CINTA',
  'CLARO', 'CLIMA', 'COBRE', 'COCHE', 'COLOR', 'COMER', 'CORAL', 'CORTE', 'CORTO', 'COSTA',
  'CRUCE', 'CUEVA', 'CULPA', 'DANZA', 'DATOS', 'DEDOS', 'DIETA', 'DISCO', 'DOBLE', 'DOLOR',
  'DONDE', 'DULCE', 'EXITO', 'EXTRA', 'FALSO', 'FAROL', 'FAVOR', 'FELIZ', 'FERIA', 'FIBRA',
  'FINCA', 'FLOTA', 'FOCOS', 'FONDO', 'FORMA', 'FUEGO', 'FUERA', 'GAFAS', 'GALLO', 'GANAR',
  'GENTE', 'GLOBO', 'GOLFO', 'GORDO', 'GRASA', 'GRUPO', 'GUAPO', 'HABER', 'HACER', 'HASTA',
  'HEROE', 'HIELO', 'HOJAS', 'HONDO', 'HORAS', 'HOTEL', 'HUECO', 'HUESO', 'HUEVO', 'HUMOR',
  'IDEAS', 'IGUAL', 'INDIO', 'ISLAS', 'JABON', 'JAPON', 'JARRA', 'JUEGO', 'JULIO', 'JUNIO',
  'JUNTO', 'JUSTO', 'LABIO', 'LAPIZ', 'LARGO', 'LATIN', 'LECHE', 'LENTO', 'LEYES', 'LIBRO',
  'LIDER', 'LIMON', 'LINDO', 'LINEA', 'LISTO', 'LLAVE', 'LLENO', 'LLORO', 'LUCHA', 'LUGAR',
  'LUNES', 'MADRE', 'MAGIA', 'MANGO', 'MANOS', 'MAPAS', 'MARCO', 'MARES', 'MARZO', 'MAYOR',
  'MEJOR', 'MENOR', 'MENOS', 'MENTE', 'MESES', 'METRO', 'MIEDO', 'MINAS', 'MITAD', 'MONTE',
  'MORAL', 'MOTOR', 'MUJER', 'MUNDO', 'MUSEO', 'NACER', 'NADAR', 'NARIZ', 'NEGRO', 'NIEVE',
  'NIÑOS', 'NOCHE', 'NORTE', 'NUBES', 'NUEVE', 'NUEVO', 'NUNCA', 'OASIS', 'OBRAS', 'OESTE',
  'OJALA', 'ORDEN', 'OTOÑO', 'OVEJA', 'PADRE', 'PAGAR', 'PAPEL', 'PARED', 'PARTE', 'PASAR',
  'PASOS', 'PASTO', 'PATIO', 'PECHO', 'PEDIR', 'PELEA', 'PELOS', 'PERRO', 'PIANO', 'PIEZA',
  'PILAS', 'PINOS', 'PINTA', 'PISTA', 'PLATA', 'PLATO', 'PLAZA', 'PLOMO', 'POBRE', 'PODER',
  'POETA', 'POLVO', 'PONER', 'PRADO', 'PRIMO', 'PRISA', 'PUNTO', 'QUESO', 'RATON', 'RAZON',
  'RECTA', 'REGLA', 'REINA', 'RELOJ', 'RESTO', 'RITMO', 'RIVAL', 'ROBOT', 'ROJOS', 'RUBIO',
  'RUEDA', 'RUIDO', 'RUTAS', 'SABER', 'SABOR', 'SACAR', 'SALTO', 'SALUD', 'SANTO', 'SEÑAL',
  'SERIO', 'SILLA', 'SITIO', 'SOBRE', 'SOCIO', 'SUCIO', 'SUELO', 'SUIZA', 'SUTIL', 'TABLA',
  'TACON', 'TARDE', 'TAZON', 'TECHO', 'TELAR', 'TEMAS', 'TENER', 'TENIS', 'TEXTO', 'TIGRE',
  'TIPOS', 'TOCAR', 'TOMAR', 'TONTO', 'TORRE', 'TRAER', 'TRATO', 'TRIGO', 'TRUCO', 'TUMBA',
  'TUNEL', 'VACAS', 'VALOR', 'VAPOR', 'VASOS', 'VECES', 'VELOZ', 'VENIR', 'VERDE', 'VIAJE',
  'VIEJO', 'VILLA', 'VIRUS', 'VOCES', 'VOLAR', 'VUELO', 'YEGUA', 'ZORRO'
]

function palabraAlAzar() {
  return PALABRAS[Math.floor(Math.random() * PALABRAS.length)]
}

function tableroVacio() {
  const tablero = []
  for (let f = 0; f < FILAS; f++) {
    tablero.push(Array(COLUMNAS).fill(''))
  }
  return tablero
}

function estadoDe(letra, columna, solucion) {
  if (solucion[columna] === letra) return 'correcta'
  if (solucion.includes(letra)) return 'presente'
  return 'ausente'
}

function App() {
  const [intentos, setIntentos] = useState(tableroVacio())
  const [filaActual, setFilaActual] = useState(0)
  const [solucion] = useState(palabraAlAzar)
  
  const ultimo = filaActual > 0 ? intentos[filaActual - 1].join('') : ''
  const ganada = ultimo === solucion
  const terminada = ganada || filaActual === FILAS

  useEffect(() => {
    document.querySelector('.casilla:enabled')?.focus()
  }, [filaActual])

  function cambiarLetra(f, c, evento) {
    const letra = evento.target.value.toUpperCase()
    if (!/^[A-ZÑ]?$/.test(letra)) return
    
    const copia = intentos.map((fila) => [...fila])
    copia[f][c] = letra
    setIntentos(copia)
    
    if (letra !== '') evento.target.nextElementSibling?.focus()
  }

  function comprobar(evento) {
    evento.preventDefault()
    if (terminada) return
    if (intentos[filaActual].includes('')) return
    
    setFilaActual(filaActual + 1)
  }

  return (
    <form className="juego" onSubmit={comprobar}>
      <h1>Wordle</h1>
      <div className="tablero">
        {intentos.map((fila, f) => (
          <div className="fila" key={f}>
            {fila.map((letra, c) => (
              <Casilla
                key={c}
                columna={c}
                letra={letra}
                estado={f < filaActual ? estadoDe(letra, c, solucion) : ''}
                activa={f === filaActual && !terminada}
                onCambio={(evento) => cambiarLetra(f, c, evento)}
                onKeyDown={(evento) => {
                  if (evento.key === 'Backspace' && letra === '') {
                    evento.target.previousElementSibling?.focus()
                  }
                }}
              />
            ))}
          </div>
        ))}
      </div>
      {terminada ? (
        <p className="mensaje" role="status">
          {ganada
            ? '¡Enhorabuena, has acertado!'
            : `La palabra era ${solucion}`}
        </p>
      ) : (
        <button className="boton" type="submit">
          Comprobar
        </button>
      )}
    </form>
  )
}

export default App
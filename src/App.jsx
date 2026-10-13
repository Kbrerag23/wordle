import { useEffect, useState } from 'react'
import Casilla from './components/Casilla.jsx'
import Teclado from './components/Teclado.jsx'

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

function calcularEstadosFila(intento, solucion) {
  const estados = Array(COLUMNAS).fill('ausente')
  const solucionArr = solucion.split('')
  
  for (let i = 0; i < COLUMNAS; i++) {
    if (intento[i] === solucionArr[i]) {
      estados[i] = 'correcta'
      solucionArr[i] = null
    }
  }
  
  for (let i = 0; i < COLUMNAS; i++) {
    if (intento[i] !== '' && estados[i] !== 'correcta') {
      const idx = solucionArr.indexOf(intento[i])
      if (idx !== -1) {
        estados[i] = 'presente'
        solucionArr[idx] = null
      }
    }
  }
  
  return estados
}

function App() {
  const [intentos, setIntentos] = useState(tableroVacio())
  const [filaActual, setFilaActual] = useState(0)
  const [solucion, setSolucion] = useState(palabraAlAzar)
  const [error, setError] = useState('')
  
  const ultimo = filaActual > 0 ? intentos[filaActual - 1].join('') : ''
  const ganada = ultimo === solucion
  const terminada = ganada || filaActual === FILAS

  const letrasUsadas = {}
  for (let f = 0; f < filaActual; f++) {
    const estados = calcularEstadosFila(intentos[f], solucion)
    intentos[f].forEach((letra, c) => {
      if (estados[c] === 'correcta') letrasUsadas[letra] = 'correcta'
      else if (estados[c] === 'presente' && letrasUsadas[letra] !== 'correcta') letrasUsadas[letra] = 'presente'
      else if (estados[c] === 'ausente' && !letrasUsadas[letra]) letrasUsadas[letra] = 'ausente'
    })
  }

  useEffect(() => {
    document.querySelector('.casilla:enabled')?.focus()
  }, [filaActual])

  function reiniciarPartida() {
    setIntentos(tableroVacio())
    setFilaActual(0)
    setSolucion(palabraAlAzar())
    setError('')
  }

  function cambiarLetra(f, c, evento) {
    const letra = evento.target.value.toUpperCase()
    if (!/^[A-ZÑ]?$/.test(letra)) return
    
    const copia = intentos.map((fila) => [...fila])
    copia[f][c] = letra
    setIntentos(copia)
    setError('')
    
    if (letra !== '') evento.target.nextElementSibling?.focus()
  }

  function pulsarTeclado(tecla) {
    if (terminada) return
    const fila = intentos[filaActual]
    
    if (tecla === 'ENTER') {
      if (fila.includes('')) {
        setError('Faltan letras')
      } else {
        setFilaActual(filaActual + 1)
        setError('')
      }
      return
    }
    
    if (tecla === 'BACKSPACE') {
      for (let c = COLUMNAS - 1; c >= 0; c--) {
        if (fila[c] !== '') {
          const copia = intentos.map((r) => [...r])
          copia[filaActual][c] = ''
          setIntentos(copia)
          document.querySelectorAll('.fila')[filaActual].querySelectorAll('.casilla')[c].focus()
          break
        }
      }
      return
    }
    
    const emptyIndex = fila.findIndex((l) => l === '')
    if (emptyIndex !== -1) {
      const copia = intentos.map((r) => [...r])
      copia[filaActual][emptyIndex] = tecla
      setIntentos(copia)
      setError('')
      
      const nextIndex = emptyIndex < COLUMNAS - 1 ? emptyIndex + 1 : emptyIndex
      document.querySelectorAll('.fila')[filaActual].querySelectorAll('.casilla')[nextIndex].focus()
    }
  }

  function comprobar(evento) {
    evento.preventDefault()
    if (terminada) return
    if (intentos[filaActual].includes('')) {
      setError('Faltan letras')
      return
    }
    setFilaActual(filaActual + 1)
    setError('')
  }

  return (
    <form className="juego" onSubmit={comprobar}>
      <h1>Wordle</h1>
      <div className="error">{error}</div>
      <div className="tablero">
        {intentos.map((fila, f) => {
          const estados = f < filaActual ? calcularEstadosFila(fila, solucion) : Array(COLUMNAS).fill('')
          return (
            <div className="fila" key={f}>
              {fila.map((letra, c) => (
                <Casilla
                  key={c}
                  fila={f}
                  columna={c}
                  letra={letra}
                  estado={estados[c]}
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
          )
        })}
      </div>
      
      {terminada ? (
        <div>
          <p className="mensaje" role="status">
            {ganada ? '¡Enhorabuena, has acertado!' : `La palabra era ${solucion}`}
          </p>
          <button className="boton" type="button" onClick={reiniciarPartida}>
            Nueva partida
          </button>
        </div>
      ) : (
        <button className="boton" type="submit" style={{ display: 'none' }}>
          Comprobar
        </button>
      )}

      <Teclado letrasUsadas={letrasUsadas} onPulsarTecla={pulsarTeclado} />
    </form>
  )
}

export default App
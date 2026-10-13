function Teclado({ letrasUsadas, onPulsarTecla }) {
  const filas = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
  ]

  return (
    <div className="teclado">
      {filas.map((fila, i) => (
        <div key={i} className="teclado-fila">
          {fila.map((tecla) => {
            const estado = letrasUsadas[tecla] || ''
            return (
              <button
                key={tecla}
                type="button"
                className={`tecla ${estado}`}
                onClick={() => onPulsarTecla(tecla)}
              >
                {tecla === 'BACKSPACE' ? '⌫' : (tecla === 'ENTER' ? 'INTRO' : tecla)}
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default Teclado
function Casilla({ letra, estado = '', activa, onCambio, onKeyDown, fila, columna }) {
  const retrasoGiro = estado ? `${columna * 0.2}s` : '0s'
  const claseLlena = letra !== '' && !estado && activa ? 'llena' : ''

  return (
    <input
      aria-label={`Fila ${fila + 1}, Columna ${columna + 1}, ${estado || 'vacía'}`}
      className={`casilla ${estado} ${claseLlena}`}
      value={letra}
      maxLength={1}
      disabled={!activa}
      onChange={onCambio}
      onKeyDown={onKeyDown}
      style={{ animationDelay: retrasoGiro }}
    />
  )
}

export default Casilla
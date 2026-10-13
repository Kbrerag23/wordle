function Casilla({ letra, estado = '', activa, onCambio, onKeyDown, columna }) {
  const retrasoGiro = estado ? `${columna * 0.2}s` : '0s'
  const claseLlena = letra !== '' && !estado && activa ? 'llena' : ''

  return (
    <input
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
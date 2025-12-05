function calcularTarifa({ tipo, entrada, salida, precio }) {
  const fechaEntrada = new Date(entrada);
  const fechaSalida = new Date(salida);
  const diffMs = fechaSalida - fechaEntrada;

  switch (tipo) {
    case "hora":
      return calcularPorHora(diffMs, precio);

    case "dia":
      return calcularPorDia(diffMs, precio);

    case "mes":
      return calcularPorMes(fechaEntrada, fechaSalida, precio);

    default:
      throw new Error("Tipo de tarifa no válido");
  }
}

function calcularPorHora(diffMs, precioHora) {
  const horas = Math.ceil(diffMs / (1000 * 60 * 60));
  return horas * precioHora;
}

function calcularPorDia(diffMs, precioDia) {
  const dias = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  return dias * precioDia;
}

function calcularPorMes(entrada, salida, precioMes) {
  const meses =
    (salida.getFullYear() - entrada.getFullYear()) * 12 +
    (salida.getMonth() - entrada.getMonth()) +
    1;

  return meses * precioMes;
}

module.exports = { calcularTarifa };

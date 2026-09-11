// utilidades/validaciones.js

const validarNombre = (nombre) => {
  return typeof nombre === 'string' && nombre.trim().length >= 3;
};

const validarCorreo = (correo) => {
  const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regexCorreo.test(correo);
};

const generarId = () => {
  return 'id-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
};

// Función principal de validación del aprendiz
const validarAprendiz = (datos) => {
  const errores = [];

  if (!datos.nombre || !validarNombre(datos.nombre)) {
    errores.push("El nombre es obligatorio y debe tener al menos 3 caracteres.");
  }

  if (!datos.correo || !validarCorreo(datos.correo)) {
    errores.push("El correo electrónico no es válido.");
  }

  return {
    esValido: errores.length === 0,
    errores
  };
};

// Exportar las funciones (especialmente validarAprendiz y generarId)
module.exports = {
  validarAprendiz,
  generarId
};
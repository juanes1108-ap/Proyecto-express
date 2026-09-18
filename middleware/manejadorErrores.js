const manejadorErrores = (error, req, res, next) => {
    // 1. Tomamos statusCode o status o 500
    const codigoError = error.statusCode || error.status || 500;
    const mensajeError = error.message || "Error inesperado!!";

    // 2. Agregamos () a toISOString() para que imprima la fecha correcta
    console.error(`[Manejador Errores] - ${new Date().toISOString()} - ${codigoError} - ${mensajeError}`);

    if (error.stack) {
        console.error(error.stack);
    }

    // 3. Agregamos .status(codigoError) antes de .json()
    res.status(codigoError).json({
        Error: "manejadorErrores",
        codigoError,
        mensajeError,
        ...(process.env.NODE_ENV === "development" && { stack: error.stack })
    });
};

module.exports = manejadorErrores;
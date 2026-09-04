export function errorMiddleware(error, request, response, next) {
  console.error(error);

  const statusCode = error.statusCode || 500;

  response.status(statusCode).json({
    error: true,
    message: error.message || "Erro interno do servidor.",
  });
}


export function apiResponse(statusCode, message, data = {}) {
  return {
    success: statusCode >= 200 && statusCode < 300, // true if 2xx
    //statusCode: statusCode,
    
    message: message,
    data: data,
  };
}

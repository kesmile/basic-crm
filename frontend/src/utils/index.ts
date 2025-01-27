const getAuthToken = () => {
    return localStorage.getItem('token'); // Ajusta esto según cómo almacenes el token
};

export {
    getAuthToken
}
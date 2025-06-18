// Transformay la siguiente función para que funcione con promesas en lugar de callbacks:

export function obtenerDatosPromise(callback) {
    setTimeout(() => {
        callback(null, { data: 'datos importantes' });
    }, 2000);
}

// Transformay la siguiente función para que funcione con promesas en lugar de callbacks:

export function obtenerDatosPromise(callback) {
    setTimeout(() => {
        callback(null, { data: 'datos importantes' });
    }, 2000);
}

export function obtenerDatosPromise() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: 'datos importantes' });
        }, 2000);
    });
}

// Datos iniciales de productos
let productos = [
    { nombre: "Cable THW 10mm", precio: 15.99, imagen: "https://ejemplo.com/cable.jpg" },
    { nombre: "Interruptor Siemens", precio: 8.50, imagen: "https://ejemplo.com/interruptor.jpg" }
];

// Mostrar productos
function renderizarProductos() {
    const contenedor = document.getElementById('listaProductos');
    contenedor.innerHTML = productos.map(producto => `
        <div class="producto">
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio}</p>
        </div>
    `).join('');
}

// Panel de administrador
document.getElementById('btnAdmin').addEventListener('click', () => {
    const password = prompt("Contraseña de admin:");
    if (password === "soltec123") { // Cambia esto en producción
        document.getElementById('adminPanel').classList.toggle('hidden');
    }
});

// Agregar nuevo producto
document.getElementById('formProducto').addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;
    const imagen = document.getElementById('imagen').files[0];

    if (imagen) {
        const reader = new FileReader();
        reader.onload = (e) => {
            productos.push({ nombre, precio, imagen: e.target.result });
            renderizarProductos();
        };
        reader.readAsDataURL(imagen);
    }
});

// Buscador
document.getElementById('buscador').addEventListener('input', (e) => {
    const termino = e.target.value.toLowerCase();
    const filtrados = productos.filter(p => 
        p.nombre.toLowerCase().includes(termino)
    );
    document.getElementById('listaProductos').innerHTML = filtrados.map(p => `
        <div class="producto">
            <img src="${p.imagen}" alt="${p.nombre}">
            <h3>${p.nombre}</h3>
            <p>$${p.precio}</p>
        </div>
    `).join('');
});

// Inicializar
renderizarProductos();
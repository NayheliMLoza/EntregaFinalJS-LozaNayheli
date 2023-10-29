 document.addEventListener('DOMContentLoaded', () => {
    const productos = [
        { id: 1, nombre: "juguetes de perro", precio: 50.00, categoria: "perros", imagen: "../img/perro2.jpg" },
        { id: 2, nombre: "juguetes de gato", precio: 35.00, categoria: "gatos", imagen: "../img/gato2.jpg" },
        { id: 3, nombre: "Pecera", precio: 35.00, categoria: "peces", imagen: "../img/pecera2.jpg" },
        { id: 4, nombre: "juguetes de perro", precio: 50.00, categoria: "perros", imagen: "../img/perro2.jpg" },
        { id: 5, nombre: "juguetes de gato", precio: 35.00, categoria: "gatos", imagen: "../img/gato2.jpg" },
        { id: 6, nombre: "Pecera", precio: 35.00, categoria: "peces", imagen: "../img/pecera2.jpg" },
        { id: 7, nombre: "juguetes de perro", precio: 50.00, categoria: "perros", imagen: "../img/perro2.jpg" },
        { id: 8, nombre: "juguetes de gato", precio: 35.00, categoria: "gatos", imagen: "../img/gato2.jpg" },
        { id: 9, nombre: "Pecera", precio: 35.00, categoria: "peces", imagen: "../img/pecera2.jpg" },
        { id: 10, nombre: "juguetes de perro", precio: 50.00, categoria: "perros", imagen: "../img/perro2.jpg" },
        { id: 11, nombre: "juguetes de gato", precio: 35.00, categoria: "gatos", imagen: "../img/gato2.jpg" },
        { id: 12, nombre: "Pecera", precio: 35.00, categoria: "peces", imagen: "../img/pecera2.jpg" },
    ];

    function mostrarProductos(categoriaSeleccionada = "todos") {
        const contenedorProductos = document.getElementById('contenedor-productos');
        contenedorProductos.innerHTML = '';

        const productosFiltrados = (categoriaSeleccionada === "todos") ? productos : productos.filter(producto => producto.categoria === categoriaSeleccionada);

        productosFiltrados.forEach(producto => {
            const elementoProducto = document.createElement('div');
            elementoProducto.classList.add('producto');
            elementoProducto.innerHTML = `
                <h3>${producto.nombre}</h3>
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <p>Precio: $${producto.precio.toFixed(2)}</p>
                <button class="agregar-carrito" data-id="${producto.id}">Añadir al carrito</button>
            `;
            contenedorProductos.appendChild(elementoProducto);
        });

        const botonesAgregarCarrito = document.querySelectorAll('.agregar-carrito');
        botonesAgregarCarrito.forEach(boton => {
            boton.addEventListener('click', agregarAlCarrito);
        });
    }
    

    function agregarAlCarrito(event) {
        const idProducto = event.target.getAttribute('data-id');
        const productoSeleccionado = productos.find(producto => producto.id === parseInt(idProducto));
    
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
        
        const index = carrito.findIndex(item => item.id === productoSeleccionado.id);
    
        if (index !== -1) {
            
            carrito[index].cantidad++;
        } else {
            
            carrito.push({ ...productoSeleccionado, cantidad: 1 });
        }
    
        localStorage.setItem('carrito', JSON.stringify(carrito));
    
        actualizarInterfazCarrito(carrito);
    
        Toastify({
            text: `Producto añadido al carrito: ${productoSeleccionado.nombre}`,
            duration: 3000,
            close: true,
            gravity: "top",
            position: 'right',
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, #007BFF, #00bfff)",
                color: "#fff"
            }
        }).showToast();
    }
    
    
    function actualizarInterfazCarrito(carrito) {
        const cantidadCarrito = document.getElementById('cantidad-carrito');
        const totalCarrito = document.getElementById('total-carrito');
    
        const totalProductos = carrito.reduce((total, producto) => total + producto.cantidad, 0);
        const totalPrecio = carrito.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
    
        cantidadCarrito.textContent = totalProductos;
        totalCarrito.textContent = `$${totalPrecio.toFixed(2)}`;
    }

    const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
    actualizarInterfazCarrito(carritoGuardado);

    const botonesCategorias = document.querySelectorAll('.boton-categoria');
    botonesCategorias.forEach(boton => {
        boton.addEventListener('click', () => {
            const categoriaSeleccionada = boton.id;
            mostrarProductos(categoriaSeleccionada);
        });
    });

    mostrarProductos();

    
    const toggleCarrito = document.getElementById('toggleCarrito');
    toggleCarrito.addEventListener('click', mostrarCarritoModal);

    
    const cerrarModal = document.getElementById('cerrarModal');
    cerrarModal.addEventListener('click', cerrarCarritoModal);

    
    const vaciarCarritoBtn = document.getElementById('vaciarCarrito');
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    
    const comprarCarritoBtn = document.getElementById('comprarCarrito');
    comprarCarritoBtn.addEventListener('click', comprarCarrito);

    function mostrarCarritoModal() {
        const modalCarrito = document.getElementById('modal-carrito');
        modalCarrito.style.display = 'block';
        mostrarProductosEnModal();
    }

    function cerrarCarritoModal() {
        const modalCarrito = document.getElementById('modal-carrito');
        modalCarrito.style.display = 'none';
    }

    function mostrarProductosEnModal() {
        const contenedorProductosModal = document.getElementById('contenedor-productos-modal');
        contenedorProductosModal.innerHTML = '';

        const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];

        carritoGuardado.forEach(producto => {
            const elementoProducto = document.createElement('div');
            elementoProducto.classList.add('producto-modal');
            elementoProducto.innerHTML = `
                <h3>${producto.nombre}</h3>
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <p>Precio: $${producto.precio.toFixed(2)}</p>
                <button class="eliminar-carrito" data-id="${producto.id}">Eliminar</button>
            `;
            contenedorProductosModal.appendChild(elementoProducto);
        });

        
        const botonesEliminarModal = document.querySelectorAll('.eliminar-carrito');
        botonesEliminarModal.forEach(boton => {
            boton.addEventListener('click', eliminarDelCarritoModal);
        });
    }

    function eliminarDelCarritoModal(event) {
        const idProducto = event.target.getAttribute('data-id');
        const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
        const index = carritoGuardado.findIndex(producto => producto.id === parseInt(idProducto));

        carritoGuardado.splice(index, 1);
        localStorage.setItem("carrito", JSON.stringify(carritoGuardado));

        actualizarInterfazCarrito(carritoGuardado);
        mostrarProductosEnModal();
    }

    function vaciarCarrito() {
        localStorage.removeItem("carrito");
        actualizarInterfazCarrito([]);
        mostrarProductosEnModal();
    }

    function comprarCarrito() {
        vaciarCarrito();
        cerrarCarritoModal();
        Toastify({
            text: `¡Compra realizada con éxito!`,
            duration: 3000,
            close: true,
            gravity: "top",
            position: 'right',
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, #28a745, #218838)",
                color: "#fff"
            }
        }).showToast();
    }
});

import './style.css'
import { productos } from './datos.js'
// Elemento donde se dibujan las tarjetas (lo creas en el Ejercicio 1)
const catalogo = document.getElementById('catalogo');
const listaPedido = document.getElementById('lista-pedido');
const totalElemento = document.getElementById('total');
const btnVaciar = document.getElementById('btn-vaciar');
const contenedorFiltros = document.getElementById('filtros');
function mostrarProductos(lista) {
  const tarjetasHTML = lista.map(p => `
    <div class="bg-white rounded-lg shadow p-4 flex flex-col justify-between">
      <div>
        <h2 class="text-xl font-semibold text-gray-800">${p.nombre}</h2>
        <p class="text-gray-600 font-medium my-2">$${p.precio.toFixed(2)} USD</p>
      </div>
      <button 
        data-id="${p.id}" 
        class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition">
        Agregar
      </button>
    </div>
  `).join(''); // 2. Convertimos el arreglo de HTML en un solo string continuo
  // 3. Insertamos el HTML renderizado dentro del contenedor 'catalogo'
  catalogo.innerHTML = tarjetasHTML;
}
mostrarProductos(productos);
const pedido = [];
function mostrarPedido() {
  // Dibuja cada producto del pedido con map dentro de #lista-pedido
  listaPedido.innerHTML = pedido.map(p => `
    <li class="flex justify-between items-center py-1 border-b border-gray-200">
      <span>${p.nombre}</span>
      <span class="font-semibold">$${p.precio.toFixed(2)}</span>
    </li>
  `).join('');
  // Calcula el total con reduce
  const total = pedido.reduce((suma, p) => suma + p.precio, 0);
  // Actualiza el texto del total
  totalElemento.textContent = `Total: $${total.toFixed(2)} USD`;
}
contenedorFiltros.addEventListener('click', (evento) => {
  const boton = evento.target.closest('button[data-categoria]');
  if (!boton) return;

  const categoria = boton.dataset.categoria;

  // Punto 2: Filtrar la lista de productos
  const listaFiltrada = categoria === 'Todos'
    ? productos
    : productos.filter(p => p.categoria === categoria);

  mostrarProductos(listaFiltrada);

  // Punto 3: Resaltar el botón activo cambiando las clases de Tailwind
  const todosLosBotones = contenedorFiltros.querySelectorAll('button[data-categoria]');
  todosLosBotones.forEach(btn => {
    if (btn === boton) {
      btn.className = "btn-filtro bg-blue-500 text-white font-semibold py-2 px-4 rounded shadow transition";
    } else {
      btn.className = "btn-filtro bg-white text-gray-700 hover:bg-gray-100 font-semibold py-2 px-4 rounded shadow transition";
    }
  });
});
catalogo.addEventListener('click', (evento) => {
  const boton = evento.target.closest('button[data-id]');
  if (!boton) return;
  const id = Number(boton.dataset.id);
  // 1. Busca el producto con productos.find(...)
  const productoEncontrado = productos.find(p => p.id === id);
  if (productoEncontrado) {
    // 2. Agrégalo a pedido con push
    pedido.push(productoEncontrado);
    // 3. Llama a mostrarPedido()
    mostrarPedido();
  }
});
btnVaciar.addEventListener('click', () => {
  // Deja el arreglo vacío
  pedido.length = 0;
  // Redibuja
  mostrarPedido();
});
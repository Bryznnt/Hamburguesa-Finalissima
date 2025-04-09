const hamburguesas = [
	{
	  img: "https://i.ibb.co/Dgvt7nk/photo-1568901346375-23c9450c58cd.jpg",
	  name: "Parrillera",
	  price: 24,
	  id: 1,
	},
	{
	  img: "https://i.ibb.co/85nTv6c/photo-1553979459-d2229ba7433b.jpg",
	  name: "Carnívora",
	  price: 30,
	  id: 2,
	},
	{
	  img: "https://i.ibb.co/b5nHhYY/photo-1606755962773-d324e0a13086.jpg",
	  name: "Crispy",
	  price: 21,
	  id: 3,
	},
	{
	  img: "https://i.ibb.co/TRPsQFy/photo-1572802419224-296b0aeee0d9.jpg",
	  name: "Doble Todo",
	  price: 26,
	  id: 4,
	},
	{
	  img: "https://i.ibb.co/3cnFLSn/photo-1594212699903-ec8a3eca50f5.jpg",
	  name: "Combo 1",
	  price: 35,
	  id: 5,
	},
	{
	  img: "https://i.ibb.co/F4vL446/photo-1549611016-3a70d82b5040.jpg",
	  name: "Huachana",
	  price: 25,
	  id: 6,
	},
  ];
  
  // Renderizado dinámico de productos
  const contenedor = document.querySelector(".container-items");
  contenedor.innerHTML = ""; // Limpiar el contenedor antes de renderizar
  
  let itemsHTML = ''; // Variable para almacenar el HTML de los productos
  
  hamburguesas.forEach((producto) => {
	itemsHTML += `
	  <div class="item">
		<figure>
		  <img src="${producto.img}" alt="${producto.name}" />
		</figure>
		<div class="info-product">
		  <h2>${producto.name}</h2>
		  <p class="price">$${producto.price}</p>
		  <button class="btn-add-cart" data-id="${producto.id}">Añadir al carrito</button>
		</div>
	  </div>
	`;
  });
  
  // Insertamos todos los productos en el contenedor de una sola vez
  contenedor.innerHTML = itemsHTML;
  
  // --- CARRITO ---
  const btnCart = document.querySelector('.container-cart-icon');
  const containerCartProducts = document.querySelector('.container-cart-products');
  let allProducts = []; // Cambia con el tiempo
  document.addEventListener('DOMContentLoaded', () => {
	allProducts = JSON.parse(localStorage.getItem('allProducts')) || [];
	showHTML();
  });
  
  btnCart.addEventListener('click', () => {
	containerCartProducts.classList.toggle('hidden-cart');
  });
  
  const rowProduct = document.querySelector('.row-product');
  const productsList = document.querySelector('.container-items');
  const valorTotal = document.querySelector('.total-pagar');
  const countProducts = document.querySelector('#contador-productos');
  const cartEmpty = document.querySelector('.cart-empty');
  const cartTotal = document.querySelector('.cart-total');
  
  // Agregar productos al carrito
  productsList.addEventListener('click', (e) => {
	if (e.target.classList.contains('btn-add-cart')) {
	  const product = e.target.parentElement;
	  const infoProduct = {
		quantity: 1,
		title: product.querySelector('h2').textContent,
		price: product.querySelector('p').textContent,
	  };
  
	  const exists = allProducts.some((product) => product.title === infoProduct.title);
  
	  if (exists) {
		allProducts = allProducts.map((product) => {
		  if (product.title === infoProduct.title) {
			product.quantity++;
		  }
		  return product;
		});
	  } else {
		allProducts = [...allProducts, infoProduct];
	  }
  
	  showHTML();
	}
  });
  
  // Eliminar una unidad del producto al hacer clic en la X
  rowProduct.addEventListener('click', (e) => {
	if (e.target.classList.contains('icon-close')) {
	  const productElement = e.target.parentElement;
	  const title = productElement.querySelector('p').textContent;
  
	  allProducts = allProducts.map((product) => {
		if (product.title === title) {
		  return {
			...product,
			quantity: product.quantity - 1
		  };
		}
		return product;
	  }).filter(product => product.quantity > 0);
  
	  showHTML();
	}
  });
  
  // Mostrar HTML actualizado
  function showHTML() {
	if (!allProducts.length) {
	  cartEmpty.classList.remove('hidden');
	  rowProduct.classList.add('hidden');
	  cartTotal.classList.add('hidden');
	} else {
	  cartEmpty.classList.add('hidden');
	  rowProduct.classList.remove('hidden');
	  cartTotal.classList.remove('hidden');
	}
  
	rowProduct.innerHTML = '';
  
	let total = 0;
	let totalOfProducts = 0;
	let containerProduct = '';
  
	allProducts.forEach((product) => {
	  containerProduct += `
		<div class="cart-product">
		  <div class="info-cart-product">
			<span class="cantidad-producto-carrito">${product.quantity}</span>
			<p class="titulo-producto-carrito">${product.title}</p>
			<span class="precio-producto-carrito">${product.price}</span>
		  </div>
		  <svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="icon-close"
		  >
			<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
		  </svg>
		</div>
	  `;
  
	  total += product.quantity * parseFloat(product.price.slice(1)); // Convierte el precio en número
	  totalOfProducts += product.quantity;
	});
  
	// Actualizamos el HTML de los productos en el carrito
	rowProduct.innerHTML = containerProduct;
  
	valorTotal.innerText = `$${total}`;
	countProducts.innerText = totalOfProducts;
  
	readAllProduct();
  }
  
  // Guardar en localStorage
  function readAllProduct() {
	localStorage.setItem('allProducts', JSON.stringify(allProducts));
  }
  
// Event listener para el botón "Añadir Producto"
document.getElementById('añadir').addEventListener('click', function () {
    const formulario = document.getElementById('prodNuevo');
    formulario.classList.toggle('new');
  });
  
  fetch('http://localhost:3000/productos')
    .then(respuesta => respuesta.json())
    .then(datos => mostrarProductos(datos))
  
  const mostrarProductos = (datos) => {
    let productos = ''
    const contenedor = document.querySelector('#contProducAdmin')
    datos.forEach(datos => {
      productos +=
        `<div class="card border border-1 border-dark d-flex flex-column align-items-center"
              style="width: 100%; max-width: 300px; margin:30px">
              <img src="${datos.img}" class="card-img-top" alt="...">
              <div class="card-body ">
                  <h4>${datos.titulo}</h4>
                  <p class="card-text ">${datos.desc}</p>
              </div>
  <div class="d-flex justify-content-between align-items-center w-100 mb-2 px-2">
    <p class="card-text border border-secondary rounded p-2 mb-0">
      <strong>${datos.precio}</strong>
    </p>
    <div class="d-flex ms-auto">
      <a href="#editar" class="btn btn-outline-warning me-2 edit">
        <i class="bi bi-pencil"></i>
      </a>
      <a class="btn btn-outline-danger" type="submit">
        <i class="bi bi-trash"></i>
      </a>
    </div>
  </div>
  
  
          </div>`

    })
    contenedor.innerHTML = productos
  
    // Añadir event listeners a los botones "Editar"
    const editButtons = document.querySelectorAll('.edit');
    editButtons.forEach(button => {
      button.addEventListener('click', function () {
        const formulario = document.getElementById('editar');
        formulario.classList.toggle('newE');
      });
    });
  }
  
  const formulario = document.forms['form-crear']
  console.log(formulario)
  formulario.addEventListener('submit', (event) => {
    event.preventDefault();
  
    let titulo = formulario.titulo.value
    let desc = formulario.desc.value
    let precio = formulario.precio.value
    // console.log(titulo,descripcion,precio);
  
    // Objetos con los datos obtenidos en el formulario
    let newDatos = {titulo: titulo, desc: desc, precio: precio}
    
    let nuevosDatos = JSON.stringify(newDatos)
    console.log(nuevosDatos)
  })
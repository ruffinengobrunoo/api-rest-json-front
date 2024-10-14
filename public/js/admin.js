const endpoint = 'http://localhost:3000/productos'

// Event listener para el botón "Añadir Producto"
document.getElementById('añadir').addEventListener('click', function () {
    const formulario = document.getElementById('nuevoProd');
    formulario.classList.toggle('new');
  });
  
  fetch(endpoint)
    .then(respuesta => respuesta.json())
    .then(datos => mostrarProductos(datos))
  
  const mostrarProductos = (datos) => {
    let productos = ''
    const contenedor = document.querySelector('#contenedorAdmin')
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
  
  const formulario = document.forms['formCrear']
  console.log(formulario)
  formulario.addEventListener('submit', (event) => {
    event.preventDefault();
  console.log('holis')
    let titulo = formulario.titulo.value
    let desc = formulario.desc.value
    let precio = formulario.precio.value
    console.log(titulo,desc,precio);
  
    // Objetos con los datos obtenidos en el formulario
    let newDatos = {titulo: titulo, desc: desc, precio: precio}
    
    if (!newDatos.titulo || !newDatos.desc || !newDatos.precio){
      document.querySelector('#mesaje33').innerHTML='faltan datos'
      return 
    }
      document.querySelector('#mensaje33').innerHTML= '';
    
    let nuevosDatosJson = JSON.stringify(newDatos)
    console.log(nuevosDatosJson)

    // enviar datos al back :3
    const enviarNewProducto = async()=>{
      try{
        const enviarDatos = await fetch(endpoint, {
          method: 'post',
          headers: {
            'content-type': 'aplication/json'
          },
          body: nuevosDatosJson
        })
        // obtener respuesta del back si se puede
        const respuesta = await enviarDatos.json()
        console.log(respuesta)
      }catch(error){
        console.log(error)
      }
    }
    enviarNewProducto();
  })
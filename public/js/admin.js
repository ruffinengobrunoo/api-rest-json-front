const endpoint = 'http://localhost:3000/productos'

// Event listener para el botón "Añadir Producto"
document.getElementById('añadir').addEventListener('click', function () {
  const formulario = document.getElementById('prodNuevo');
  formulario.classList.toggle('new');
});

fetch(endpoint)
  .then(respuesta => respuesta.json())
  .then(datos => mostrarProductos(datos))

const mostrarProductos = (datos) => {
  let productos = ''
  const contenedor = document.querySelector('#divProdNuevo')
  datos.forEach(datos => {
    productos +=
      `<div class="card border border-1 border-dark d-flex flex-column align-items-center"
            style="width: 100%; max-width: 300px; margin:30px">
            <img src="fotos/${datos.img}" class="card-img-top" alt="...">
            <div class="card-body ">
                <h4>${datos.titulo}</h4>
                <p class="card-text ">${datos.descripcion}</p>
            </div>
<div class="d-flex justify-content-between align-items-center w-100 mb-2 px-2">
  <p class="card-text border border-secondary rounded p-2 mb-0">
    <strong>${datos.precio}</strong>
  </p>
  <div class="d-flex ms-auto">
    <a href="#prodEditar" class="btn btn-outline-warning me-2 edit">
      <i class="bi bi-pencil"></i>
    </a>
    
    <a class="btn btn-outline-danger" type="submit" id="eliminar" onClick="eliminar(${datos.id})">
      <i class="bi bi-trash" id="eliminar"></i>
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
      const formulario = document.getElementById('prodEditar');
      formulario.classList.toggle('newE');
    });
  });
}

mostrarMensaje = (mensaje) =>{
  document.querySelector('#divMensaje').innerHTML= mensaje;
}

// agregar producto
const formulario = document.forms['formAñadir']
console.log(formulario)
formulario.addEventListener('submit', (event) => {
  event.preventDefault();
  let titulo = formulario.titulo.value
  let descripcion = formulario.descripcion.value
  let precio = formulario.precio.value
  let img = formulario.titulo.value+".jpeg";
  // console.log(titulo,descripcion,precio);

  // Objetos con los datos obtenidos en el formulario
  let newDatos = { titulo: titulo, descripcion: descripcion, precio: precio, img: img}


  if (!newDatos.titulo || !newDatos.descripcion || !newDatos.precio) {
    document.querySelector('#mensaje').innerHTML = '*Complete todos los datos'
    return
  }
    document.querySelector('#mensaje').innerHTML = ''

 

  let nuevosDatosJson = JSON.stringify(newDatos)
  console.log(nuevosDatosJson)
  const enviarNewProducto = async () => { //enviar datos al back
    try {
      const enviarDatos = await fetch(endpoint, {
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        body: nuevosDatosJson
      })
      
      //obtengo la respuesta del back
      const respuesta = await enviarDatos.json()
      console.log(respuesta)
      let mensaje = document.querySelector('#divMensaje');
      mensaje.className+= 'bg-warning';
      mensaje.innerHTML = respuesta.mensaje;

      //limpiar formulario y ocultarlo
      // document.querySelector('#formAñadir').reset();
      document.querySelector('#formAñadir').style.display='none';

      mostrarMensaje(respuesta.mensaje)

      //refrescar la pagina
      setTimeout(() => {
        location.reload();
      }, 1000);

    }
    catch (error) {
      console.log(error)
    }
  }
  enviarNewProducto()
})

// eliminar producto por atrevido gato..

const eliminar = (id) =>{
  // console.log(id+" sos capo")

  const eliminarProd = async() =>{
    try{
      const res = await fetch (endpoint+ '/' + id, { // endpoint con param
        method: 'delete'
      })
      //obtengo respuesta
      const respuesta = await res.json
      mostrarMensaje(respuesta.mensaje)
    }catch{
      mostrarMensaje('error al borrar sos re gil')
    }
  }
  eliminarProd();
}
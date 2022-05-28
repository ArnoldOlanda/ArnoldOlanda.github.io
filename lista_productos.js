(function(){

    if(!sessionStorage.getItem('idAlmacen')){
        document.body.innerHTML=`
        <h1> Debe iniciar sesion primero </h1>
        <a href='index.html'>Ir al login </a>
        `
        //alert("Debe iniciar sesion primero");
        //window.location.href='index.html';
        return;
    }
})()


const lista = document.getElementById('listaProductos');
const updateForm = document.getElementById('updateForm');
const updateBtn = document.getElementById('update');

const nombre = document.getElementById('nombre');
const descripcion = document.getElementById('descripcion');
const unidad = document.getElementById('unidad');
const precio = document.getElementById('precio');


let productos;
let idProducto;

const loadData = async () => {
    const almacen = sessionStorage.getItem("idAlmacen")

    const response = await fetch(`https://modulo-inventario.herokuapp.com/api/productos/${almacen}`,{
        method:'GET',
        headers:{
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json()

    console.log(data.data);
    productos = data.data;

    const fragment = document.createDocumentFragment();
    for (let i=0; i < data.data.length; i ++ ) {
        const tr = document.createElement('TR')
        tr.innerHTML=`
            <td>${ i + 1 }</td>
            <td>${ data.data[i].nombre }</td>
            <td>${ data.data[i].descripcion }</td>
            <td>${ data.data[i].unid_medida}</td>
            <td>${ data.data[i].precio }</td>
            <td>${ data.data[i].stock }</td>
            <td>${ data.data[i].proveedor }</td>
        `
        const td = document.createElement('TD')
        const editBtn = document.createElement('BUTTON')
        const deleteBtn = document.createElement('BUTTON')

        editBtn.innerText="Editar"
        deleteBtn.innerText="Eliminar"

        editBtn.onclick = () => {
            idProducto = productos[i].id;

            nombre.value = productos[i].nombre
            descripcion.value = productos[i].descripcion
            unidad.value = productos[i].unid_medida
            precio.value = productos[i].precio
            updateForm.style.opacity='1';
        }

        deleteBtn.onclick = async () => {
            idProducto = productos[i].id;

            const confirmarEliminar = confirm("¿Realmente desea eliminar este producto?")
            if(confirmarEliminar){
                const response = await fetch(`https://modulo-inventario.herokuapp.com/api/productos/${ parseInt(idProducto) }`,{
                    method:'DELETE',
                    headers:{
                        'Content-Type': 'application/json'
                    }
                });

                const data = await response.json()
                alert("Registro eliminado")
            }
            lista.innerHTML=''
            loadData();
        }

        td.append(editBtn,deleteBtn)
        tr.append(td)
        fragment.append(tr)
    }
    lista.append(fragment)
}

updateBtn.onclick = async() =>{
    body={
        nombre:nombre.value,
        descripcion:descripcion.value,
        unidad:unidad.value,
        precio:parseFloat(precio.value)
    }
    if( nombre.value.length < 1    || unidad.value.length < 1 || precio.value.length < 1 ) {
        return alert("Los campos estan vacios")
    }

    if( !isNaN(unidad.value) ){
        return alert("Revise los datos ingresados")
    }


    if(parseFloat(precio.value) < 0 ) return alert("EL valor del precio no puede ser negativo")
    if(isNaN(precio.value)) return alert("El precio debe ser un valor valido")

    const response = await fetch(`https://modulo-inventario.herokuapp.com/api/productos/${parseInt(idProducto)}`,{
        method:'PUT',
        body:JSON.stringify(body),
        headers:{
            'Content-Type': 'application/json'
        }
    });
    
    const {err} =  await response.json()
    if(response.status==400) console.log(JSON.stringify(err.errors));
    
    updateForm.style.display='none';
    alert("Producto actualizado");
    lista.innerHTML=''
    loadData();
}

loadData();
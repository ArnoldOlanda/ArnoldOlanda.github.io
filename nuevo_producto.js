(function(){

    if(!sessionStorage.getItem('idAlmacen')){
        document.body.innerHTML=`
        <h1> Debe iniciar sesion primero </h1>
        <a href='index.html'>Ir al login </a>
        `
        return;
    }
})()


const nombre = document.getElementById('nombre');
const descripcion = document.getElementById('descripcion');
const unidad = document.getElementById('unidad');
const proveedor = document.getElementById('proveedor');
const stock = document.getElementById('stock');
const precio = document.getElementById('precio');

const btnRegistrar = document.getElementById('registrar');

(async () => {
    const response = await fetch('https://modulo-inventario.herokuapp.com/api/proveedores',{
        method:'GET',
        headers:{
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json()

    const fragment = document.createDocumentFragment();
    for (let i=0; i < data.data.length; i ++ ) {
        const option = document.createElement('OPTION')
        option.setAttribute('value',data.data[i].id)
        option.innerText=data.data[i].nombre
        fragment.append(option)
    }
    proveedor.append(fragment)
})()



btnRegistrar.onclick = () => {

    const almacen = sessionStorage.getItem('idAlmacen');
    
    const body = {
        nombre:nombre.value,
        descripcion:descripcion.value,
        unidad:unidad.value,
        proveedor:parseInt(proveedor.value),
        almacen,
        stock:parseInt(stock.value),
        precio:parseFloat(precio.value)
    };
    console.log(body);

    
    if( nombre.value.length < 1    || unidad.value.length < 1 || 
        stock.value.length < 1     || precio.value.length < 1 ) {
        return alert("Los campos estan vacios")
    }

    if( !isNaN(unidad.value) ){
        return alert("Revise los datos ingresados")
    }

    if(isNaN(stock.value) || isNaN(precio.value)){
        return alert("El stock y/o el precio deben ser un numero")
    }

    console.log(stock.value < 0);
    if( parseInt(stock.value) < 0  || parseFloat(precio.value) < 0 ){
        return alert('El stock y/o el precio no pueden ser numeros negativos')
    }

    if(proveedor.value == '0') return alert("Seleccione un proveedor")

    try {

        saveData(body);
        alert("Producto registrado")

        window.location.href = 'lista_productos.html'

    } catch (error) {
        console.log(error);
    }
}

const saveData = async (body = {}) => {

   try {
        const response = await fetch('https://modulo-inventario.herokuapp.com/api/productos',{
            method:'POST',
            body:JSON.stringify(body),
            headers:{
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        if(response.status===400) console.log(data.err)
        else console.log(data.msg);

   } catch (error) {
       console.log(data.error);
   }

}


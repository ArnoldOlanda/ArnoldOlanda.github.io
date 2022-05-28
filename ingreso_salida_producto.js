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


const producto = document.getElementById('producto');
const stock = document.getElementById('stock');
const btnRegister = document.getElementById('btnRegister');

let cantidad = 0;

let productos;
const almacen = sessionStorage.getItem('idAlmacen');

const loadData = async () => {

    

    const response = await fetch(`https://modulo-inventario.herokuapp.com/api/productos/${ almacen }`,{
        method:'GET',
        headers:{
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json()

    productos=data.data

    const fragment = document.createDocumentFragment();
    for (let i=0; i < productos.length; i ++ ) {
        const option = document.createElement('OPTION')
        option.setAttribute('value',data.data[i].id)
        option.innerText = data.data[i].nombre
        fragment.append(option)
    }
    producto.append(fragment)
}
producto.onchange=()=>{

    const p = productos.find(e=> e.id == producto.value )
    stock.value=parseInt(p.stock)
}

btnRegister.onclick = async ()=> {

    const body = {
        producto:parseInt(producto.value),
        almacen,
        cantidad:parseInt(stock.value)
    }
    if(stock.value < 1) return alert("El stock no puede ser una cantidad negativa o cero")

    const response = await fetch('https://modulo-inventario.herokuapp.com/api/productos/',{
        method:'PUT',
        body:JSON.stringify(body),
        headers:{
            'Content-Type': 'application/json'
        }
    });

    if(response.status == 400){
        const data = await response.json();
        console.log(data);
    }

    const data = await response.json();


    console.log(data.data);
    console.log(body);

    alert('Stock modificado con exito')
    window.location.href='lista_productos.html'
}


loadData();
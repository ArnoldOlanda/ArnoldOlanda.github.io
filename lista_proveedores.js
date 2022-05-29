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

const lista = document.getElementById('listaProveedores');


const loadData = async () => {
    const response = await fetch('https://modulo-inventario.herokuapp.com/api/proveedores',{
        method:'GET',
        headers:{
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json()

    console.log(data.data);

    const fragment = document.createDocumentFragment();
    for (let i=0; i < data.data.length; i ++ ) {
        const tr = document.createElement('TR')
        tr.innerHTML=`
            <td>${ i + 1 }</td>
            <td>${ data.data[i].nombre }</td>
            <td>${ data.data[i].direccion }</td>
        `
        fragment.append(tr)
    }
    lista.append(fragment)
}

loadData();
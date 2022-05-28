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



const nombre = document.getElementById('nombre');
const direccion = document.getElementById('direccion');

const btnRegistrar = document.getElementById('registrar');


btnRegistrar.onclick = () => {
    
    const body = {
        nombre:nombre.value,
        direccion:direccion.value
    };


    
    if(nombre.value.length < 1 || direccion.value.length < 1 ) {
        return alert("Debe llenar los campos")
    }
    if(!isNaN(nombre.value) || !isNaN(direccion.value)){
        nombre.focus()
        
        return alert("Los valores de los campos deben ser cadenas de texto validas")
    }

    try {

        //saveData(body);

        nombre.value=''
        direccion.value=''
        alert("Proveedor registrado")
        //window.location.href = './dashboard.html'

    } catch (error) {
        console.log(error);
    }
}

const saveData = async (body = {}) => {

    const response = await fetch('https://modulo-inventario.herokuapp.com/api/proveedores',{
        method:'POST',
        body:JSON.stringify(body),
        headers:{
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json()

    console.log(data.msg);
}
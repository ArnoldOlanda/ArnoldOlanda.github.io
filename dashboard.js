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


const  cerrarSesion = () => {
    const confirmaCierre = confirm("¿Esta seguro que desea cerra la sesion?");
    if(confirmaCierre){
        sessionStorage.removeItem('idAlmacen');
        sessionStorage.removeItem('user');
        window.location.href='index.html'
    }
}
let menu = document.querySelector('ion-menu');
let router = document.querySelector("ion-router");
let itemsMenu = document.querySelectorAll(".item-menu"); 
let cerrarSesion = document.querySelector(".cerrar-sesion");

// páginas
let paginaLogin = document.querySelector("pagina-login");
let paginaRegistro = document.querySelector("pagina-registro");
let paginaHome = document.querySelector("pagina-home");
let paginaListado = document.querySelector("pagina-listado");

// Asignar funcion cerrar menu a los items del menu
for (let i = 0; i < itemsMenu.length; i++) {
    const element = itemsMenu[i];
    element.addEventListener("click", cerrarMenu);
}

function cerrarMenu() {
    menu.close();
}

//cada vez que cambia la ruta de navegación muestro u oculto cosas
router.addEventListener("ionRouteDidChange", cambioDeRuta);

function cambioDeRuta(event) {
    console.log("ionRouteDidChange")
    
    let navegacion = event.detail;

    // ocultar todas las páginas
    let paginas = document.getElementsByClassName('pagina');
    for (let i = 0; i < paginas.length; i++) {
        paginas[i].style.display = "none";
    }

    if (navegacion.to === "/login") {
        paginaLogin.style.display = "block";
    }

    if (navegacion.to === "/registro") {
        paginaRegistro.style.display = "block";
    }

    if (navegacion.to === "/") {
        paginaHome.style.display = "block";
    }

    if (navegacion.to === "/listado") {
        paginaListado.style.display = "block";
    }
}

// -------------------  Accediendo al dispositivo -------------------  

document.getElementById('btnSacarFoto').addEventListener('click', sacarFoto);

async function sacarFoto() {
    // estamos en android o en web?
    if (Capacitor.isNativePlatform()) {
        let photo = await Capacitor.Plugins.Camera.getPhoto({
            quality: 90,
            // allowEditing: true,
            resultType: "uri"
        });
    
        document.getElementById("foto").src = photo.webPath;
    } else {
        alert('Esto solo funciona en entorno nativo');
    }
};

//funciona en algunos emuladores. Con la API 30  no funciona. Pero funciona con API 28.
document.getElementById('btnObtenerCoordenadas').addEventListener('click', obtenerGeolocalizacion);

async function obtenerGeolocalizacion() {
    // estamos en android o en web?
    if (Capacitor.isNativePlatform()) {
        let resultado = await Capacitor.Plugins.Geolocation.getCurrentPosition({ timeout: 3000 });

        document.getElementById("coordenadas").innerHTML = 
        `
            <ion-item><b>Latitude:</b> ${resultado.coords.latitude}</ion-item>
            <ion-item><b>Altitude:</b> ${resultado.coords.altitude}</ion-item>  
            <ion-item><b>Longitude:</b> ${resultado.coords.longitude}</ion-item>  
        `;
    } else {
        alert('Esto solo funciona en entorno nativo');
    }
};

document.getElementById('btnObtenerInfoDispositivo').addEventListener('click', obtenerInformacionDelDispositivo);

async function obtenerInformacionDelDispositivo() {
    // estamos en android o en web?
    if (Capacitor.isNativePlatform()) {
        let resultado = await Capacitor.Plugins.Device.getInfo();

        document.getElementById("infoDispositivo").innerHTML = 
        `
            <ion-item><b>Nombre:</b> ${resultado.name}</ion-item>
            <ion-item><b>Modelo:</b> ${resultado.model}</ion-item>  
            <ion-item><b>Plataforma:</b> ${resultado.platform}</ion-item>  
            <ion-item><b>Sistema Operativo:</b> ${resultado.operatingSystem}</ion-item>  
            <ion-item><b>Es virtual?:</b> ${resultado.isVirtual}</ion-item> 
        `;

    } else {
        alert('Device funciona en entorno nativo');
    }
};

document.getElementById('btnNetworkStatus').addEventListener('click', obtenerNetworkStatus);

async function obtenerNetworkStatus() {
    // estamos en android o en web?
    if (Capacitor.isNativePlatform()) {
        let resultado = await Capacitor.Plugins.Network.getStatus();

        document.getElementById("networkStatus").innerHTML = 
        `
            <ion-item><b>Conectado?:</b> ${resultado.connected}</ion-item> 
            <ion-item><b>Tipo de Conexión:</b> ${resultado.connectionType}</ion-item> 
        `;

    } else {
        alert('Device funciona en entorno nativo');
    }
};
 
// document.getElementById('btnQrScanner').addEventListener('click', escanearQR);

// async function escanearQR() {
//     alert('escanearQR');

//     // estamos en android o en web?
//     if (Capacitor.isNativePlatform()) {
//         alert('isNativePlatform');


//         Capacitor.Plugins.BarcodeScanner.hideBackground(); // make background of WebView transparent
//         const result = await Capacitor.Plugins.BarcodeScanner.startScan(); // start scanning and wait for a result

//         // if the result has content
//         if (result.hasContent) {
//             alert('hasContent');
//             console.log(result.content); // log the raw scanned content
//         }

//     } else {
//         alert('Esto solo funciona en entorno nativo');
//     }

// }
// function iniciar(){
//     obtenerGeolocalizacion();
// }

// window.onload = iniciar
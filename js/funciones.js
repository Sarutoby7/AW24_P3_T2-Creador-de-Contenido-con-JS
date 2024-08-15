var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var imagenSeleccionada = null;
var colorFondo = '#ffffff';
var colorTexto = '#000000';
var fuenteTexto = '30px Arial';
var tamanoTexto = 30;

function mostrarModal() {
    var temaSeleccionado = document.getElementById('temas').value;
    var cuerpoModal = document.querySelector('.modal-body');

    cuerpoModal.innerHTML = '';
    
    if (temaSeleccionado === 'cumpleaños') {
        cuerpoModal.innerHTML = `
            <img src="img/cumple/invitacion1c.png" class="img-thumbnail img-opcion" onclick="seleccionarImagen('img/cumple/invitacion1c.png');">
            <img src="img/cumple/invitacion2c.png" class="img-thumbnail img-opcion" onclick="seleccionarImagen('img/cumple/invitacion2c.png');">
            <img src="img/cumple/invitacion3c.png" class="img-thumbnail img-opcion" onclick="seleccionarImagen('img/cumple/invitacion3c.png');">
        `;
    } else if (temaSeleccionado === 'boda') {
        cuerpoModal.innerHTML = `
            <img src="img/boda/boda1.png" class="img-thumbnail img-opcion" onclick="seleccionarImagen('img/boda/boda1.png');">
            <img src="img/boda/boda2.png" class="img-thumbnail img-opcion" onclick="seleccionarImagen('img/boda/boda2.png');">
            <img src="img/boda/boda3.png" class="img-thumbnail img-opcion" onclick="seleccionarImagen('img/boda/boda3.png');">
        `;
    } else if (temaSeleccionado === 'aniversario') {
        cuerpoModal.innerHTML = `
            <img src="img/aniver/ani1.png" class="img-thumbnail img-opcion" onclick="seleccionarImagen('img/aniver/ani1.png');">
            <img src="img/aniver/ani2.png" class="img-thumbnail img-opcion" onclick="seleccionarImagen('img/aniver/ani2.png');">
            <img src="img/aniver/ani3.png" class="img-thumbnail img-opcion" onclick="seleccionarImagen('img/aniver/ani3.png');">
        `;
    }

    $('#modalImagenes').modal('show');
}

function seleccionarImagen(ruta) {
    imagenSeleccionada = new Image();
    imagenSeleccionada.src = ruta;
    imagenSeleccionada.onload = function() {
        ctx.fillStyle = colorFondo;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(imagenSeleccionada, 0, 0, canvas.width, canvas.height);
        actualizarMensaje();
    };
    document.getElementById('tarjeta').style.display = 'block';
    $('#modalImagenes').modal('hide');
}

function cambiarColorFondo() {
    colorFondo = document.getElementById('colorFondo').value;
    ctx.fillStyle = colorFondo;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (imagenSeleccionada) {
        ctx.drawImage(imagenSeleccionada, 0, 0, canvas.width, canvas.height);
    }
    actualizarMensaje();
}

function cambiarColorTexto() {
    colorTexto = document.getElementById('colorTexto').value;
    actualizarMensaje();
}

function cambiarTamanoTexto() {
    tamanoTexto = document.getElementById('tamanoTexto').value || 30;
    fuenteTexto = tamanoTexto + 'px ' + (document.getElementById('tipografia').value || 'Arial');
    actualizarMensaje();
}

function actualizarMensaje() {
    var mensaje = document.getElementById('mensaje').value;
    var nombreRemitente = document.getElementById('nomRemi').value;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = colorFondo;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (imagenSeleccionada) {
        ctx.drawImage(imagenSeleccionada, 0, 0, canvas.width, canvas.height);
    }

    ctx.font = fuenteTexto;
    ctx.fillStyle = colorTexto;
    ctx.textAlign = 'center';

    ctx.fillText(mensaje, canvas.width / 2, canvas.height / 2);

    var padding = 20;
    var tamanioNombre = 20;
    ctx.font = tamanioNombre + 'px ' + (document.getElementById('tipografia').value || 'Arial');
    ctx.textAlign = 'center';
    ctx.fillText(nombreRemitente, canvas.width / 2, canvas.height - padding);
}

function exportarPNG() {
    var enlace = document.createElement('a');
    enlace.download = 'tarjeta.png';
    enlace.href = canvas.toDataURL();
    enlace.click();
}

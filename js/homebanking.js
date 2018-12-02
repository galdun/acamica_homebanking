//Declaración de variables
var nombreUsuario = 'Guillermo';
var pass = 123123;
var saldoCuenta = 10000;
var limiteExtraccion = 1500;
var valorAgua = 350;
var valorTelefono = 425;
var valorLuz = 210;
var valorInternet = 570;
var arrayCuentasAmiga = [1234567, 7654321];

//Llamo a la siguiente funcion ni bien comienza el JS ya que no quiero que el usuario vea nada del sitio antes de iniciar sesion.
iniciarSesion();



//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function () {
    cargarNombreEnPantalla();
    actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
}



//Funciones de suma y resta basica que actualizan saldo de cuenta.
function sumarDinero(valorDepositado) {
    saldoCuenta = saldoCuenta + valorDepositado;
}

function restaDinero(valorExtraccion) {
    saldoCuenta = saldoCuenta - valorExtraccion;
}



//Funciones que comprueban si el saldo a extraer es correcto
function elSaldoEsPermitido(valorExtraccion) {
    if (valorExtraccion <= limiteExtraccion)
        return true;
    else
        return false;
}

function haySaldoDisponible(valorExtraccion) {
    if (valorExtraccion <= saldoCuenta)
        return true;
    else
        return false;
}

function pideBilletesDeCien(valorExtraccion) {
    if (valorExtraccion % 100 == 0)
        return true;
    else
        return false;
}



//Funcion que ejecuta el debito en la cuenta
function entregaDinero(valorExtraccion) {
    var saldoAanterior = saldoCuenta;

    restaDinero(valorExtraccion);
    actualizarSaldoEnPantalla();
    alert("Su saldo actual es " + saldoCuenta + "\nEl valor de la extraccion fue " + valorExtraccion + "\nSu saldo anterior era " + saldoAanterior);
}

function valorIngresadoEsValido(valor) {
    if (!isNaN(valor)) {
        return true;
    } else {
        return false;
    }
}


//Funciones que tenes que completar
function cambiarLimiteDeExtraccion() {
    var nuevoLimite = parseInt(prompt("Ingrese el limite de extraccion deseado"));

    if (valorIngresadoEsValido(nuevoLimite)) {
        limiteExtraccion = nuevoLimite;
        actualizarLimiteEnPantalla();
        alert("Su nuevo limite de extraccion es " + limiteExtraccion);
    } else {
        alert("El valor ingresado no es correcto. \nSu limite no se pudo cambiar. \nPor favor intente nuevamente");
    }
}


function extraerDinero() {
    var valorExtraccion = parseInt(prompt('Cuanto desea extraer?'));

    if (valorIngresadoEsValido(valorExtraccion)){

        if (elSaldoEsPermitido(valorExtraccion)) {
            if (haySaldoDisponible(valorExtraccion)) {
                if (pideBilletesDeCien(valorExtraccion)) {
                    entregaDinero(valorExtraccion);
                } else
                    alert("El cajero solo dispensa billetes de 100 \nPor favor seleccione un valor multiplo de 100")
            } else
                alert("El valor " + valorExtraccion + " Supera el saldo de cuenta.\nPor favor seleccione un valor menor");
        } else
            alert("El valor " + valorExtraccion + " Supera el limite de extraccion. \nSu limite diario es " + limiteExtraccion);

    } else {
        alert("El valor ingresado no es valido. \nPor favor intente nuevamente");
    }
}


function depositarDinero() {
    var valorDepositado = parseInt(prompt('Cuanto desea depositar?'));

    if (valorIngresadoEsValido(valorDepositado)) {
        var saldoAanterior = saldoCuenta;

        sumarDinero(valorDepositado);
        actualizarSaldoEnPantalla();
        alert("Su saldo actual es " + saldoCuenta + "\nEl valor del deposito fue " + valorDepositado + "\nSu saldo anterior era " + saldoAanterior);
    } else {
        alert("El valor ingresado no es valido. \nPor favor intente nuevamente");
    }
}

function elijaServicoPagar() {
    var opcion = parseInt(prompt("Ingrese el número que corresponda con el servicio que desea pagar\n1- Agua\n2- Luz\n3- Internet\n4- Telefono" + " "));

    while (opcion < 1 || opcion > 4) {
        alert("El valor ingresado no corresponde a un servicio valido. por favor vuelva a intentar ");
        opcion = parseInt(prompt("Ingrese el número que corresponda con el servicio que desea pagar\n1- Agua\n2- Luz\n3- Internet\n4- Telefono" + " "));
    }
    return opcion;
}


function debitaServicio(valorServicio, servicio) {

    //valida saldo en cuenta y efectua el debito
    if (valorServicio <= saldoCuenta) {
        var saldoAnterior = saldoCuenta;
        saldoCuenta = saldoCuenta - valorServicio;
        alert("Se debito el servicio de " + servicio + "\nSaldo Anterior: $" + saldoAnterior + "\nDinero descontado: $" + valorServicio + "\nSaldo actual: $" + saldoCuenta);
    }
    else {
        alert("No posee saldo suficiente para efectuar el pago del servicio");
    }
}


function pagarServicio() {
    // primero muestra por pantalla la lista de servicio y luego espera que el usuario ingrese una opcion
    //validad la opcion que el usuario ingreso debe ser de entre 1 a 4 sino pide de nuevo la opcion
    var servicioElegido = elijaServicoPagar();

    switch (servicioElegido) {
        case 1: //Agua
            debitaServicio(valorAgua, "Agua");
            break;
        case 2: //Luz
            debitaServicio(valorLuz, "Luz");
            break;
        case 3: //Internet
            debitaServicio(valorInternet, "Internet");
            break;
        case 4: //Telefono
            debitaServicio(valorTelefono, "Telefono");
            break;
    }
    actualizarSaldoEnPantalla();
}


function transferirDinero() {
    var dineroATransferir = parseInt(prompt("Ingrese el monto que desea transferir: " + ""));

    if (valorIngresadoEsValido(dineroATransferir)){

        if (haySaldoDisponible(dineroATransferir)) {
            var cuentaDestino = parseInt(prompt("Ingrese el numero de cuenta al qeu desea transferir: " + ""));
            if (arrayCuentasAmiga.includes(cuentaDestino)) {
                restaDinero(dineroATransferir)
                alert("Se ha transferido: $" + dineroATransferir + "\nCuenta Destino: " + cuentaDestino);
                actualizarSaldoEnPantalla();
            } else {
                alert("La cuenta ingresada no se encuentra registrada");
            }
        } else {
            alert("No posee saldo suficiente para realizar la transferencia.");
        }
        
    } else {
        alert("El valor ingresado no es valido. \nPor favor intente nuevamente.");
    }
}

function iniciarSesion() {
    var codigoIngresado = parseInt(prompt("Bienvenido/a " + nombreUsuario + " por favor ingresa tu password"));

    if (codigoIngresado === pass) {
        alert("Bienvenido/a " + nombreUsuario + " ya podes comenzar a realizar operaciones.");
    } else {
        var cantiadadErrores = 1;
        while (cantiadadErrores < 3 && codigoIngresado !== pass) {
            alert("Codigo incorrecto por favor intente nuevamente.");
            codigoIngresado = parseInt(prompt("Bienvenido/a " + nombreUsuario + " por favor ingresa tu password"));
            cantiadadErrores++;
        }
        if (codigoIngresado === pass) {
            alert("Bienvenido/a " + nombreUsuario + " ya podes comenzar a realizar operaciones.");
        } else {
            saldoCuenta = 0;
            alert("Demasiados intentos fallidos Su dinero ha sido retenido por razones de seguridad.")
        }
    }
}


//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}


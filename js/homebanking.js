//Declaración de variables
var nombreUsuario = 'Guillermo'
var saldoCuenta = 10000;
var limiteExtraccion = 1500;
var valorAgua = 350;
var valorTelefono = 425;
var valorLuz = 210;
var valorInternet = 570;


//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function() {
    cargarNombreEnPantalla();
    actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
}

//Funciones de suma y resta basica que actualizan saldo de cuenta.
function sumarDinero (valorDepositado){
    saldoCuenta = saldoCuenta + valorDepositado;
}

function restaDinero (valorExtraccion){
    saldoCuenta = saldoCuenta - valorExtraccion;
}

//Funciones que comprueban si el saldo a extraer es correcto
function elSaldoEsPermitido (valorExtraccion) {
    if (valorExtraccion <= limiteExtraccion)
        return true;
    else
        return false;
}

function haySaldoDisponible (valorExtraccion){
    if (valorExtraccion <= saldoCuenta)
        return true;
    else
        return false;
}

function pideBilletesDeCien (valorExtraccion){
    if(valorExtraccion % 100 == 0)
        return true;
    else
        return false;
    
}

//Funcion que ejecuta el debito en la cuenta
function entregaDinero (valorExtraccion){
    var saldoAanterior = saldoCuenta;
    restaDinero(valorExtraccion);
    actualizarSaldoEnPantalla();
    alert("Su saldo actual es "+ saldoCuenta + "\nEl valor de la extraccion fue " + valorExtraccion + "\nSu saldo anterior era " + saldoAanterior);
}

//Funciones que tenes que completar
function cambiarLimiteDeExtraccion() {
    //Pedirle al usuario que ingrese el nuevo límite de extracción
    var nuevoLimite = parseInt (prompt("Ingrese el limite de extraccion deseado"));
    //Modificar la variable que contiene al límite de extracción
    limiteExtraccion = nuevoLimite;
    //Ejecutar la función actualizarLimiteEnPantalla() para que se actualice el nuevo límite en el HTML
    actualizarLimiteEnPantalla();
    //Mostrar una alerta que muestre un mensaje con el nuevo límite de extracción
    alert("Su nuevo limite de extraccion es " + limiteExtraccion);
}

function extraerDinero() {
    var valorExtraccion = parseInt(prompt('Cuanto desea extraer?'));
    
    if (elSaldoEsPermitido(valorExtraccion)){
        if (haySaldoDisponible (valorExtraccion)){
            if(pideBilletesDeCien (valorExtraccion)){
                entregaDinero (valorExtraccion);
            }else
                alert("El cajero solo dispensa billetes de 100 \nPor favor seleccione un valor multiplo de 100")
        }else
            alert("El valor "+ valorExtraccion + " Supera el saldo de cuenta.\nPor favor seleccione un valor menor");    
    }else
        alert("El valor "+ valorExtraccion + " Supera el limite de extraccion. \nSu limite diario es " + limiteExtraccion);
}


function depositarDinero() {
    var valorDepositado = parseInt(prompt('Cuanto desea depositar?'));
    var saldoAanterior = saldoCuenta;
    sumarDinero (valorDepositado);
    actualizarSaldoEnPantalla(); 
    alert("Su saldo actual es "+ saldoCuenta + "\nEl valor del deposito fue " + valorDepositado + "\nSu saldo anterior era " + saldoAanterior);
}

function elijaServicoPagar(){
    var opcion = parseInt(prompt ("Ingrese el número que corresponda con el servicio que desea pagar\n1- Agua\n2- Luz\n3- Internet\n4- Telefono" + " "));
    while (opcion <1 || opcion > 4){
        alert ("El valor ingresado no corresponde a un servicio valido. por favor vuelva a intentar ");
        opcion = parseInt(prompt ("Ingrese el número que corresponda con el servicio que desea pagar\n1- Agua\n2- Luz\n3- Internet\n4- Telefono" + " "));
    }
    return opcion;
}


function debitaServicio(valorServicio, servicio){
    //valida saldo en cuenta y efectua el debito
    if (valorServicio <= saldoCuenta){  
        var saldoAnterior = saldoCuenta;
        saldoCuenta = saldoCuenta - valorServicio;
        alert("Se debito el servicio de " + servicio +"\nSaldo Anterior: $"+saldoAnterior+"\nDinero descontado: $"+valorServicio+"\nSaldo actual: $"+saldoCuenta);         
    }
    else{
        alert("No posee saldo suficiente para efectuar el pago del servicio");
    }
}


function pagarServicio() {
    // primero muestra por pantalla la lista de servicio y luego espera que el usuario ingrese una opcion
    //validad la opcion que el usuario ingreso debe ser de entre 1 a 4 sino pide de nuevo la opcion
    var servicioElegido = elijaServicoPagar ();
    
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

}

function iniciarSesion() {

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
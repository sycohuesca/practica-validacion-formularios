// Cargamos la lista de paises el en select.
 $("#pais").load("../php/pais.php");
       
      $("#nombre").focusin(function (){
          $("#pais").chosen();
          
      });

// Associamos a este select el plugin chosen.
$("#contact").chosen({disable_search_threshold: 10});

// Aqui vamos a validar nuestro formulario.

$("#miformulario").validate({
   rules:{
    nombre:"required",
    apellido:"required",
    telefono:{
        required:true,
        digits:true,
        maxlength:9,
        minlength:9
    },
    email:{
        required:true,
        remote:'../php/validar_email.php'
    },
    email2:{
        equalTo:"#email"
    },
    nif_cif:{
        required:true,
        remote:"../php/validar_nif.php",
        nif:function(){
            // Si el demandante es un particular se comprueba si el nif tiene el formato correcto.
            if ($("#particular").is(":checked")){
               $('#nif_cif').val().toUpperCase();
            return "nif";
        }
    },
    cifES: function (){
    	// Comprobamos si esta selecionado empresa y comprobamos que sea un cif valido.
    	    if ($("#empresa").is(":checked")){
               $('#nif_cif').val().toUpperCase();
            return "cifES";
        }
    }
    },
    nom_emp:"required",
    direccion:"required",
    zip:{
        required:true,
        maxlength:5,
        digits:true
    },
    provincia:"required",
    ciudad:"required",
    pais:"required",
    iban:{
        required:true,
        iban:"iban"   // Se comprueba el codigo IBAN es valido.
    },
    usuario:{
        required:true,
        minlength:4
    },
    pass:{
        required:true,
        minlength:6  
    },
    pass2:{
        required:true,
        equalTo:"#pass"
    }
      },
   // Una vez completado y no hay errores se envia el mensaje para aceptar.
    submitHandler : function() {
        var nombre=$("#nombre").val();
        var cuota=$("input[name='pago']:checked").val();
	var respuesta=confirm("Sr./a "+nombre+" se va a cobrar el primer pago de "+cuota+" € ¿Desea continuar ?");
            if (respuesta==1){
                alert("Usuario "+nombre+" dado de alta.");
            }
            else {
                alert("No se ha realizado el alta.")
            }
				}
});
// Metodo que gestiona la complexidad del password.
 $("#pass").focusin(function () {
            $("#pass").complexify({}, function (valid, complexity) {
                $("#BarraPass").attr("value",complexity);
                            });
        });
 // Metodo para rellenar el zip con ceros a la izquierda.
function rellenar (){
        var zip = $("#zip").val();
        var cero="0";
        var resultado=5-zip.length;
        for (var i=0;i<resultado;i++){
          zip="0"+zip;  
        }
        $("#zip").val(zip);
        return zip;
       };
       // Metodo que actualiza el label segun proceda.
       function demandante_nombre(){
            $("#lab_nom").text("Nombre:");  
          $("#lab_nif").text("Nif:"); 
        var nuevo_nombre=$("#nombre").val()+" "+$("#apellido").val();
        $("#nom_emp").val(nuevo_nombre);
         $("#nom_emp").prop("disabled","false"); 
       };
// buscamos el municipio y la localidad y los rellenamos.
$("#zip").focusout(function() {
  var zip=rellenar();
        var promesa = $.ajax({
        url: "../php/datos.php",
        type: "GET",
        dataType: "json",
        data: {zip: zip}
    });
    promesa.done(function(data) {
       $("#ciudad").attr("value",data["municipio"]);
       $("#provincia").attr("value",data["provincia"]);
    });
    promesa.fail(function() {
        console.log("Fallo al importar los datos");
    });
});
// Rellenar con el nombre y apellido si es particular
$("#apellido").focusout(function (){
   if ($("#particular").is(":checked")){
          demandante_nombre();
      }
      });  
   // Segun el demandante cambiamos los label.
   
      $("#deman").change(function (){
        if ($("#empresa").is(":checked")) {
            $("#nom_emp").val("");
            $("#nom_emp").removeAttr("disabled");
          $("#lab_nom"). text("Empresa:");  
          $("#lab_nif"). text("Cif:"); 
                  }
                  else {
                    demandante_nombre();
      }
                  });
    //RELLENAR EL CAMPO USUARIO este campo no se puede modificar

    $("#email").focusout(function() {
var email=$("#email").val();
        $("#usuario").val(email);
        $("#usuario").prop("disabled","false");
    });
   // Añade el metodo comprobar el IBAN.
jQuery.validator.addMethod("iban", function(value, element) {
	// some quick simple tests to prevent needless work
	if (this.optional(element)) {
		return true;
	}
	if (!(/^([a-zA-Z0-9]{4} ){2,8}[a-zA-Z0-9]{1,4}|[a-zA-Z0-9]{12,34}$/.test(value))) {
		return false;
	}

	// check the country code and find the country specific format
	var iban = value.replace(/ /g,'').toUpperCase(); // remove spaces and to upper case
	var countrycode = iban.substring(0,2);
	var bbancountrypatterns = {
		'AL': "\\d{8}[\\dA-Z]{16}",
		'AD': "\\d{8}[\\dA-Z]{12}",
		'AT': "\\d{16}",
		'AZ': "[\\dA-Z]{4}\\d{20}",
		'BE': "\\d{12}",
		'BH': "[A-Z]{4}[\\dA-Z]{14}",
		'BA': "\\d{16}",
		'BR': "\\d{23}[A-Z][\\dA-Z]",
		'BG': "[A-Z]{4}\\d{6}[\\dA-Z]{8}",
		'CR': "\\d{17}",
		'HR': "\\d{17}",
		'CY': "\\d{8}[\\dA-Z]{16}",
		'CZ': "\\d{20}",
		'DK': "\\d{14}",
		'DO': "[A-Z]{4}\\d{20}",
		'EE': "\\d{16}",
		'FO': "\\d{14}",
		'FI': "\\d{14}",
		'FR': "\\d{10}[\\dA-Z]{11}\\d{2}",
		'GE': "[\\dA-Z]{2}\\d{16}",
		'DE': "\\d{18}",
		'GI': "[A-Z]{4}[\\dA-Z]{15}",
		'GR': "\\d{7}[\\dA-Z]{16}",
		'GL': "\\d{14}",
		'GT': "[\\dA-Z]{4}[\\dA-Z]{20}",
		'HU': "\\d{24}",
		'IS': "\\d{22}",
		'IE': "[\\dA-Z]{4}\\d{14}",
		'IL': "\\d{19}",
		'IT': "[A-Z]\\d{10}[\\dA-Z]{12}",
		'KZ': "\\d{3}[\\dA-Z]{13}",
		'KW': "[A-Z]{4}[\\dA-Z]{22}",
		'LV': "[A-Z]{4}[\\dA-Z]{13}",
		'LB': "\\d{4}[\\dA-Z]{20}",
		'LI': "\\d{5}[\\dA-Z]{12}",
		'LT': "\\d{16}",
		'LU': "\\d{3}[\\dA-Z]{13}",
		'MK': "\\d{3}[\\dA-Z]{10}\\d{2}",
		'MT': "[A-Z]{4}\\d{5}[\\dA-Z]{18}",
		'MR': "\\d{23}",
		'MU': "[A-Z]{4}\\d{19}[A-Z]{3}",
		'MC': "\\d{10}[\\dA-Z]{11}\\d{2}",
		'MD': "[\\dA-Z]{2}\\d{18}",
		'ME': "\\d{18}",
		'NL': "[A-Z]{4}\\d{10}",
		'NO': "\\d{11}",
		'PK': "[\\dA-Z]{4}\\d{16}",
		'PS': "[\\dA-Z]{4}\\d{21}",
		'PL': "\\d{24}",
		'PT': "\\d{21}",
		'RO': "[A-Z]{4}[\\dA-Z]{16}",
		'SM': "[A-Z]\\d{10}[\\dA-Z]{12}",
		'SA': "\\d{2}[\\dA-Z]{18}",
		'RS': "\\d{18}",
		'SK': "\\d{20}",
		'SI': "\\d{15}",
		'ES': "\\d{20}",
		'SE': "\\d{20}",
		'CH': "\\d{5}[\\dA-Z]{12}",
		'TN': "\\d{20}",
		'TR': "\\d{5}[\\dA-Z]{17}",
		'AE': "\\d{3}\\d{16}",
		'GB': "[A-Z]{4}\\d{14}",
		'VG': "[\\dA-Z]{4}\\d{16}"
	};
	var bbanpattern = bbancountrypatterns[countrycode];
	// As new countries will start using IBAN in the
	// future, we only check if the countrycode is known.
	// This prevents false negatives, while almost all
	// false positives introduced by this, will be caught
	// by the checksum validation below anyway.
	// Strict checking should return FALSE for unknown
	// countries.
	if (typeof bbanpattern !== 'undefined') {
		var ibanregexp = new RegExp("^[A-Z]{2}\\d{2}" + bbanpattern + "$", "");
		if (!(ibanregexp.test(iban))) {
			return false; // invalid country specific format
		}
	}

	// now check the checksum, first convert to digits
	var ibancheck = iban.substring(4,iban.length) + iban.substring(0,4);
	var ibancheckdigits = "";
	var leadingZeroes = true;
	var charAt;
	for (var i =0; i<ibancheck.length; i++) {
		charAt = ibancheck.charAt(i);
		if (charAt !== "0") {
			leadingZeroes = false;
		}
		if (!leadingZeroes) {
			ibancheckdigits += "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(charAt);
		}
	}

	// calculate the result of: ibancheckdigits % 97
    var cRest = '';
    var cOperator = '';
	for (var p=0; p<ibancheckdigits.length; p++) {
		var cChar = ibancheckdigits.charAt(p);
		cOperator = '' + cRest + '' + cChar;
		cRest = cOperator % 97;
    }
	return cRest === 1;
}, "Por favor, revisa tu cuenta IBAN");

// Añade el metodo nif modificado incluyendo la letra mayusculas o minusculas.
jQuery.validator.addMethod('nif', function(value, element) {
	if(/^([0-9]{8})*[a-zA-Z]+$/.test(value)){
		var numero = value.substr(0,value.length-1);
		var let = value.substr(value.length-1,1);
		numero = numero % 23;
		var letra='TRWAGMYFPDXBNJZSQVHLCKET';
                letra=letra.toUpperCase();
                let=let.toUpperCase();
		letra=letra.substring(numero,numero+1);
		if (letra==let)
		return true;
		return false;
	}
}, 'Introduce un NIF válido.');

// Añadimos el metodo comprobar CIF español.
jQuery.validator.addMethod( "cifES", function ( value, element ) {
 "use strict";
  
 var sum,
  num = [],
  controlDigit;
  
 value = value.toUpperCase();
  
 // Basic format test
 if ( !value.match( '((^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$|^[T]{1}[A-Z0-9]{8}$)|^[0-9]{8}[A-Z]{1}$)' ) ) {
  return false;
 }
  
 for ( var i = 0; i < 9; i++ ) {
  num[ i ] = parseInt( value.charAt( i ), 10 );
 }
  
 // Algorithm for checking CIF codes
 sum = num[ 2 ] + num[ 4 ] + num[ 6 ];
 for ( var count = 1; count < 8; count += 2 ) {
  var tmp = ( 2 * num[ count ] ).toString(),
   secondDigit = tmp.charAt( 1 );
   
  sum += parseInt( tmp.charAt( 0 ), 10 ) + ( secondDigit === '' ? 0 : parseInt( secondDigit, 10 ) );
 }
  
 // CIF test
 if ( /^[ABCDEFGHJNPQRSUVW]{1}/.test( value ) ) {
  sum += '';
  controlDigit = 10 - parseInt( sum.charAt( sum.length - 1 ), 10 );
  value += controlDigit;
  return ( num[ 8 ].toString() === String.fromCharCode( 64 + controlDigit ) || num[ 8 ].toString() === value.charAt( value.length - 1 ) );
 }
  
 return false;
  
}, "Introduzca un CIF correcto." );

// mensajes de validacion español.
(function ($) {
	$.extend($.validator.messages, {
		required: "Este campo es obligatorio.",
		email: "Por favor, escribe una dirección de correo válida",
		digits: "Por favor, escribe sólo dígitos.",
		equalTo: "Por favor, escribe el mismo valor de nuevo.",
		maxlength: $.validator.format("Por favor, no escribas más de {0} caracteres."),
		minlength: $.validator.format("Por favor, no escribas menos de {0} caracteres.")		
	});
}(jQuery));

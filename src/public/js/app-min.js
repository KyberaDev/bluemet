
let Location = location.toString();

window.onload = () => {

    $('#pre-loader').toggleClass('load');

    if (Location !== 'http://localhost:4000/dashboard/addProduct') {
        hideCTInputs();
        inputActions();
        $("#buscador").on("keyup", function () {
            buscador_productos()
        });
    } else {
        hideCTInputsAddProductos();
        drag_n_drop()
        $("#procedencia_producto").on("change", function () {
            filtros_productos()
            inputCategoriaAddProductos($("#procedencia_producto").val())
            $("#tipo_producto_item").hide();
            $("#categoria_producto_item").show();
            $("#categoria_producto").show();
        });

        $("#categoria_producto").on("change", function () {
            filtros_productos()
            inputTipoAddProductos($("#procedencia_producto").val(), $("#categoria_producto").val())
            $("#categoria_producto_item").show();
            $("#categoria_producto").show();
            $("#tipo_producto").show();
        });
    }
}
let data = [

    {

        "0": "Fabricacion nacional",

        "1": "Importacion"
    },

    {

        "0": "Carpinería en aluminio",

        "1": "Curtain Wall",

        "2": "Herrería especializada",

        "3": "Fabricacion de portones manuales y automaticos",

        "4": "Acero inoxidable"

    },

    {
        "0": "Portones industriales/residenciales",

        "1": "Automatismos portones/cortinas",

        "2": "Cortinas de enrollar",

        "3": "Puertas cortafuego",

        "4": "Rampas niveladoras",

        "5": "Barreras automáticas",

        "6": "Sellos de anden",

        "7": "Puertas rápidas"
    },

    {

        "0": "Claraboyas fijas/moviles",

        "1": "Techos fijos/móviles",

        "2": "Cubiertas de piscina fijas/móviles",

        "3": "Barandas",

        "4": "Aberturas (puertas/ventanas)",

        "5": "Lucernarios",

        "6": "Cerramientos en general"

    },

    {

        "0": "Escaleras y barandas",

        "1": "Puertas",

        "2": "Entrepisos y estructuras metálicas",

        "3": "Cerramientos",

        "4": "Portones",

        "5": "Rejas",

        "6": "Enrejado perimetral",

        "7": "Puertas rejas",

        "8": "Galpones"

    },

    {

        "0": "Basculantes",

        "1": "Corredizos",

        "2": "Batientes",

        "3": "Quebradizos"

    },

    {

        "0": "Escaleras",

        "1": "Barandas",

        "2": "Puertas",

        "3": "Portones",

        "4": "Trabajos en general"

    },

    {

        "0": "Desarrollador",

        "1": "Administrador",

        "2": "Gestor de Productos"

    }
];

function modal() {
    $("#modal").html(response)
    $(".modal").css('display', 'flex')
}

let procedencia;
let categoria;
let tipo;

function getFiltros() {
    //Oculto los campos para categoria y timpo de los filtros de la seccion productos
    hideCTInputs();

    let filtros = {};

    let procedencia_input = $("#selectProcedencia").val();
    let cateogria_input = $("#selectCategoria").val();
    let tipo_input = $("#selectTipoProducto").val();

    switch (procedencia_input) {
        case "1":
            procedencia = "Fabricación Nacional"
            filtros['PROCEDENCIA'] = procedencia
            //Muestro los campos para categoria y timpo de los filtros de la seccion productos
            showCTInputs(1)
            if (cateogria_input != null && tipo_input != null) {
                categorias_filtros(procedencia_input, cateogria_input, tipo_input)
                filtros['CATEGORIA'] = categoria
                filtros['TIPO'] = tipo
            } else if (cateogria_input != null && tipo_input == null) {
                categorias_filtros(procedencia_input, cateogria_input, null)
                filtros['CATEGORIA'] = categoria
            }
            break;
        case "2":
            procedencia = "Productos Importados"
            filtros['PROCEDENCIA'] = procedencia
            //Muestro el campo para categoria
            showCTInputs(2)
            if (cateogria_input != null && tipo_input == null) {
                categorias_filtros(procedencia_input, cateogria_input, null)
                filtros['CATEGORIA'] = categoria
            }
            break;
    }

    return filtros
}

function categorias_filtros(procedencia_input, cateogria_input, tipo_input) {
    if (procedencia_input != "2") {
        switch (cateogria_input) {
            case "0":
                categoria = "Carpinería en aluminio"
                if (tipo_input != null) {
                    tipo = data[3][tipo_input]
                }
                break;
            case "2":
                categoria = "Herrería especializada"
                if (tipo_input != null) {
                    tipo = data[4][tipo_input]
                }
                break;
            case "3":
                categoria = "Fabricacion de portones manuales y automaticos"
                if (tipo_input != null) {
                    tipo = data[5][tipo_input]
                }
                break;
            case "4":
                categoria = "Acero inoxidable"
                if (tipo_input != null) {
                    tipo = data[6][tipo_input]
                }
                break;
            default:
                categoria = "Curtain Wall"
                break;
        }

    } else {
        switch (cateogria_input) {
            case "0":
                categoria = "Portones industriales/residenciales"
                break;
            case "1":
                categoria = "Automatismos portones/cortinas"
                break;
            case "2":
                categoria = "Cortinas de enrollar"
                break;
            case "3":
                categoria = "Puertas cortafuego"
                break;
            case "4":
                categoria = "Rampas niveladoras"
                break;
            case "5":
                categoria = "Barreras automáticas"
                break;
            case "6":
                categoria = "Sellos de anden"
                break;
            default:
                categoria = "Puertas rápidas"
                break;
        }
    }

    return categoria
}

function hideCTInputs() {
    $("#categoria_producto").hide();
    $("#tipo_producto").hide();
}

function showCTInputs(procedencia) {

    if (procedencia == 1) {
        $("#categoria_producto").show();
        $("#tipo_producto").show();
    } else {
        $("#categoria_producto").show();
    }

}

function categorias_filtros(procedencia_input, cateogria_input, tipo_input) {
    if (procedencia_input != "2") {
        switch (cateogria_input) {
            case "0":
                categoria = "Carpinería en aluminio"
                if (tipo_input != null) {
                    tipo = data[3][tipo_input]
                }
                break;
            case "2":
                categoria = "Herrería especializada"
                if (tipo_input != null) {
                    tipo = data[4][tipo_input]
                }
                break;
            case "3":
                categoria = "Fabricacion de portones manuales y automaticos"
                if (tipo_input != null) {
                    tipo = data[5][tipo_input]
                }
                break;
            case "4":
                categoria = "Acero inoxidable"
                if (tipo_input != null) {
                    tipo = data[6][tipo_input]
                }
                break;
            default:
                categoria = "Curtain Wall"
                break;
        }

    } else {
        switch (cateogria_input) {
            case "0":
                categoria = "Portones industriales/residenciales"
                break;
            case "1":
                categoria = "Automatismos portones/cortinas"
                break;
            case "2":
                categoria = "Cortinas de enrollar"
                break;
            case "3":
                categoria = "Puertas cortafuego"
                break;
            case "4":
                categoria = "Rampas niveladoras"
                break;
            case "5":
                categoria = "Barreras automáticas"
                break;
            case "6":
                categoria = "Sellos de anden"
                break;
            default:
                categoria = "Puertas rápidas"
                break;
        }
    }

    return categoria
}

function resetFiltros() {
    hideCTInputs();
    if ($("#selectProcedencia").val() != null || $("#selectCategoria").val() != null || $("#selectTipoProducto").val() != null) {
        $("#buscador").val("")
        $("#selectProcedencia").val("0")
        $("#selectCategoria").html($("<option></option>").attr({ "value": "none", "selected": true, 'disabled': true, 'hidden': true }).text('Seleccione categoria'));
        $("#selectTipoProducto").html($("<option></option>").attr({ "value": "none", "selected": true, 'disabled': true, 'hidden': true }).text('Seleccione Tipo de producto'));
    }
}

function inputActions() {

    document.getElementById("reset-filter").addEventListener("click", () => {
        reset_divs()
        resetFiltros()
    })

    $("#selectProcedencia").on("change", function () {
        filtros_productos()
        inputCategoria($("#selectProcedencia").val())
        $("#tipo_producto").hide();
    });

    $("#selectCategoria").on("change", function () {
        filtros_productos()
        $("#selectTipoProducto").html($("<option></option>").attr({ "value": "none", "selected": true, 'disabled': true, 'hidden': true }).text('Seleccione Tipo de producto'));
        inputTipo($("#selectProcedencia").val(), $("#selectCategoria").val())
    });

    $("#selectTipoProducto").on("change", function () {
        filtros_productos()
    });
}

function inputCategoria(procedencia) {
    var categoria
    categoria = document.getElementById('selectCategoria');
    $("#selectCategoria").html($("<option></option>").attr({ "value": "NULL", "selected": true, 'disabled': true, 'hidden': true }).text('Seleccione categoria'));
    for (var i = 0; i < Object.keys(data[procedencia]).length; i++) {
        var opt = document.createElement('option');
        opt.value = i;
        opt.text = data[procedencia][i];
        categoria.appendChild(opt);
    }

}

function inputTipo(procedencia, cat) {


    let categoria

    switch (cat) {
        case "0":
            categoria = 3
            break;
        case "2":
            categoria = 4
            break;
        case "3":
            categoria = 5
            break;
        case "4":
            categoria = 6
            break;
        default:
            categoria = 1
            break;
    }

    if (procedencia == 1 && categoria != 1) {
        $("#tipo_producto").show();
        var tipo
        tipo = document.getElementById('selectTipoProducto');
        $("#selectTipoProducto").html($("<option></option>").attr({ "value": "NULL", "selected": true, 'disabled': true, 'hidden': true }).text('Seleccione Tipo de producto'));
        for (var i = 0; i < Object.keys(data[categoria]).length; i++) {
            var opt = document.createElement('option');
            opt.value = i;
            opt.text = data[categoria][i];
            tipo.appendChild(opt);
        }
    } else {
        $("#tipo_producto").hide();
    }
}

function inputCategoriaAddProductos(procedencia) {
    if (procedencia == "Fabricación Nacional") {
        procedencia = 1
    } else { procedencia = 2 }
    var categoria
    categoria = document.getElementById('categoria_producto');
    $("#categoria_producto").html($("<option></option>").attr({ "value": "none", "selected": true, 'disabled': true, 'hidden': true }).text('Seleccione categoria'));

    for (var i = 0; i < Object.keys(data[procedencia]).length; i++) {
        var opt = document.createElement('option');
        opt.value = data[procedencia][i];
        opt.text = data[procedencia][i];
        categoria.appendChild(opt);
    }
}

function inputTipoAddProductos(procedencia, cat) {

    if (procedencia != "Productos Importados") {

        let categoria


        switch (cat) {
            case "Carpinería en aluminio":

                categoria = 3

                break;
            case "Herrería especializada":

                categoria = 4

                break;
            case "Fabricacion de portones manuales y automaticos":

                categoria = 5

                break;
            case "Acero inoxidable":

                categoria = 6

                break;
            default:

                categoria = 1

                break;
        }

        if (categoria != 1) {
            $("#tipo_producto_item").show();
            var tipo
            tipo = document.getElementById('tipo_producto');
            $("#tipo_producto").html($("<option></option>").attr({ "value": "none", "selected": true, 'disabled': true, 'hidden': true }).text('Seleccione Tipo de producto'));
            for (var i = 0; i < Object.keys(data[categoria]).length; i++) {
                var opt = document.createElement('option');
                opt.value = data[categoria][i];
                opt.text = data[categoria][i];
                tipo.appendChild(opt);
            }
        } else {
            $("#tipo_producto_item").hide();
        }
    }

}

function hideCTInputsAddProductos() {
    $("#categoria_producto_item").hide();
    $("#tipo_producto_item").hide();
}

function drag_n_drop() {

    document.querySelectorAll(".inputFile").forEach(inputElement => {

        let mostrar_img
        const dropZoneElement = inputElement.closest(".upload-container");

        dropZoneElement.addEventListener("dragover", event => {
            event.preventDefault()
            dropZoneElement.classList.add("active")
        });

        ["dragleave", "dragend"].forEach((e) => {
            dropZoneElement.addEventListener(e, event => {
                dropZoneElement.classList.remove("active")
            });
        });

        dropZoneElement.addEventListener("drop", event => {
            event.preventDefault();
            if (event.dataTransfer.files.length) {
                mostrar_img = mostrarImagen(event.dataTransfer.files[0])
                if (mostrar_img == 1) {
                    $(".message-image").html('<i class="fa-solid fa-circle-exclamation"></i> Archivo invalido')
                    $(".message-image").show()
                    dropZoneElement.classList.remove("active")
                } else if (mostrar_img == 0) {
                    $(".message-image").html('<i class="fa-solid fa-circle-exclamation"></i> El limite de subida es de 2MB')
                    $(".message-image").show()
                    dropZoneElement.classList.remove("active")
                }
            }
        });

        inputElement.addEventListener("change", event => {
            if (inputElement.files.length) {
                mostrar_img = mostrarImagen(event.srcElement.files[0])
                if (mostrar_img == 1) {
                    $(".message-image").html('<i class="fa-solid fa-circle-exclamation"></i> Archivo invalido')
                    $(".message-image").show()
                    dropZoneElement.classList.remove("active")
                } else if (mostrar_img == 0) {
                    $(".message-image").html('<i class="fa-solid fa-circle-exclamation"></i> El limite de subida es de 2MB')
                    $(".message-image").show()
                    dropZoneElement.classList.remove("active")
                }
            }
        });

        $(".remove-image").on("click", function () {
            borrarImagen()
            dropZoneElement.classList.remove("active")
        });
    });

}

function mostrarImagen(file) {

    let tipo_archivo = file.type;

    if (tipo_archivo.includes("image/jpg") || tipo_archivo.includes("image/jpeg") || tipo_archivo.includes("image/png")) {
        if (file.size <= 2000000) {
            $(".upload-complete-container").show()
            $(".upload-container").hide()
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                img_base64 = reader.result + "," + file.name;
                $("#img-uploaded").attr("src", reader.result)
                $("#img-uploaded").show()
            }
        } else {
            img_base64 = 0;
            return 0
        }
    } else {
        return 1
    }

}

function borrarImagen() {
    $(".upload-complete-container").hide()
    $(".upload-container").show()
    $("#img-uploaded").attr("src", null)
    $("#img-uploaded").hide()
    img_base64 = 0
}

function buscador_tabla_productos_dashboard() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("buscador_productos_dashboard");
    filter = input.value.toUpperCase();
    table = document.getElementById("tabla_productos_dashboard");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        for (let x = 0; x < td.length; x++) {
            const element = td[x].textContent.toUpperCase();
            if (element.indexOf(filter) > -1) {
                tr[i].style.display = "";
                x = td.length;
            } else {
                tr[i].style.display = "none";
            }
        }
        /*
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
        */
    }
}

let result = [];
let productos = document.getElementsByClassName("items-container")[0];

function filtros_productos() {
    if (Location.includes('/productos')) {

        let filtros = getFiltros();
        let productos = document.getElementsByClassName("items-container")[0];
        let divs = productos.getElementsByClassName("item");
        result = [];

        for (let i = 0; i < divs.length; i++) {

            const element = divs[i];
            const elementText = element.textContent
            const elementTitle = element.getElementsByTagName("h3")[0].textContent.toUpperCase();



            if (elementText.includes(filtros['PROCEDENCIA']) && elementText.includes(filtros['CATEGORIA']) && elementText.includes(filtros['TIPO'])) {
                result[i] = element
            } else {
                if (elementText.includes(filtros['PROCEDENCIA']) && elementText.includes(filtros['CATEGORIA']) && filtros['TIPO'] == undefined) {
                    result[i] = element
                } else {
                    if (elementText.includes(filtros['PROCEDENCIA']) && filtros['CATEGORIA'] == undefined) {
                        result[i] = element
                    }
                }
            }





        }
        show_filtered_products(divs, result)
    }
}



function reset_divs() {
    let productos = document.getElementsByClassName("items-container")[0];
    let divs = productos.getElementsByClassName("item");
    for (let i = 0; i < divs.length; i++) {
        divs[i].style.display = "";
    }
}

function show_filtered_products(Products, filterResult) {
    for (let i = 0; i < Products.length; i++) {
        const element = Products[i];
        if (filterResult.includes(element)) {
            Products[i].style.display = "";
        } else {
            Products[i].style.display = "none";
        }
    }
}

function buscador_productos() {
    let elementTitle, element
    let productos = document.getElementsByClassName("items-container")[0];
    let buscador = document.getElementById("buscador").value;
    let divs = productos.getElementsByClassName("item");

    if (buscador != '') {
        for (let i = 0; i < divs.length; i++) {
            element = divs[i];
            elementTitle = element.getElementsByTagName("h3")[0].textContent.toUpperCase();
            if (elementTitle.includes(buscador)) {
                element.style.display = "";
            } else {
                element.style.display = "none";
            }
        }
    }else{
        filtros_productos()
    }


}
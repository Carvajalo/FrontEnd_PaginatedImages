let input_form = document.getElementById('form_crear')
let btn_cancelar_foto = document.getElementById('cancelar_foto')
let btn_subir_img = document.getElementById('subir_img')
const btn_enviar_info = document.getElementById("enviar_info");
const div_list = document.getElementById('list')
pagination_element = document.getElementById("pagination");
let icon_arrow_left = document.getElementById('icon_arrow_left')
icon_arrow_right = document.getElementById('icon_arrow_right')
let images = []
let current_page = 1;
let elements = 3;

let LocalImages = window.localStorage.getItem('LocalImages')



input_form.style.display = 'none'


btn_subir_img.addEventListener('click', () => {
    input_form.style.display = 'block'
    btn_subir_img.style.display = 'none'
})


btn_cancelar_foto.addEventListener('click', () => {
    btn_subir_img.style.display = 'block'
    input_form.style.display = 'none'
    /*     recorrerInputs(input => {
            input.value = ''
        }) */
})


btn_enviar_info.addEventListener('click', () => {
    let image_input = document.querySelectorAll('input')
    let fReader = new FileReader();
    let img = image_input[0]

    if (img != null && image_input[1].value != '') {
        fReader.readAsDataURL(img.files[0])
        fReader.onloadend = function (event) {
            img = [event.target.result, image_input[1].value]
            images.push(img)
            display(images, div_list, elements, current_page)
            btn_cancelar_foto.click()
            SetupPagination2(images, pagination_element, elements)
            
            let LocalImages = window.localStorage.getItem('LocalImages')
            if (LocalImages == null){
                window.localStorage.setItem('LocalImages', JSON.stringify([img]))
            }else{
                LocalImages = JSON.parse(localStorage.getItem('LocalImages'))
                LocalImages.push(img)
                window.localStorage.setItem('LocalImages', JSON.stringify(LocalImages))
            }
        }
    }
})

function recorrerInputs(tarea) {
    let vector_inputs = document.querySelectorAll("input");

    vector_inputs.forEach((input) => {
        tarea(input);
    });
}



function display(items, wrapper, items_per_page, page) {
    if (current_page == 1) {
        icon_arrow_left.style.display = 'none'
    } else {
        icon_arrow_left.style.display = 'block'
    }
    if (LocalImages != null && current_page < Math.ceil((LocalImages.length / elements))) {
        icon_arrow_right.style.display = 'block' 
    }else{
        icon_arrow_right.style.display = 'none'

    }
/*     if (current_page < Math.ceil((images.length / elements))) {
        icon_arrow_right.style.display = 'block'
    } else {
        icon_arrow_right.style.display = 'none'
    } */
    
    wrapper.innerHTML = "";
    page--;
    loop_start = items_per_page * page;
    let paginatedItems = items.slice(loop_start, loop_start + items_per_page)
    paginatedItems.forEach((element) => {
        let template_registro = `
            <figure>
                <img src="${element[0]}"  
                    alt="${element[1]}" 
                    class="w-full h-52"/>
                <figcaption class="mb-1"> 
                    ${element[1]}
                </figcaption>
            </figure>`
        div_list.innerHTML = div_list.innerHTML + template_registro
    })
}





function SetupPagination(items, wrapper, items_per_page) {

    let page_count = Math.ceil(items.length / items_per_page);
    for (let i = 1; i < page_count + 1; i++) {
        let btn = PaginationButtons(i, items);
        wrapper.appendChild(btn)
    }
}




function PaginationButtons(page, items) {
    let button = document.createElement("button");
    let template_button = `
        <button class="mx-1 hover:bg-blue-700">
            ${page}
        </button>
    `
    if (current_page == page) {
        template_button = `
        <button class="active mx-1 hover:bg-blue-700">
            ${page}
        </button>`
    }
    button.innerHTML = template_button

    button.addEventListener("click", function () {
        current_page = page;
        display(items, div_list, elements, current_page);
    });
    return button;
}

display(images, div_list, elements, current_page)
SetupPagination(images, pagination_element, elements)


function SetupPagination2(items, wrapper, items_per_page) {
    page = Math.floor((items.length / items_per_page) + 1)
    new_button = items.slice(items.length - (items.length % items_per_page), items.length)
    if (new_button.length == 1) {
        let btn = PaginationButtons(page, items)
        wrapper.appendChild(btn)
    }
}


icon_arrow_left.addEventListener('click', () => {
    if (current_page - 1 > 0) {
        current_page = current_page - 1
        display(images, div_list, elements, current_page)
    }

})

icon_arrow_right.addEventListener('click', () => {
    if (current_page < Math.ceil((images.length / elements))) {
        console.log(Math.ceil((images.length / elements)))
        current_page = current_page + 1
        display(images, div_list, elements, current_page)
    }
})


if (LocalImages != null){
    LocalImages = JSON.parse(LocalImages)
    console.log(LocalImages)
    display(LocalImages, div_list, elements, current_page)
    SetupPagination(LocalImages, pagination_element, elements)

}
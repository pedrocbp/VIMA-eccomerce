if (document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready)
} else{
    ready()
}
document.addEventListener('DOMContentLoaded', updateTotal)
function ready(){
    const removeproduct = document.getElementsByClassName("remove")
    for (var i = 0; i < removeproduct.length; i++){
        removeproduct[i].addEventListener("click", removeProduto)
    }

    
    const quantityInputs = document.getElementsByClassName("product-qtd")
    for(var i = 0; i < quantityInputs.length; i++){
        quantityInputs[i].addEventListener("change",updateTotal)
    }


    // const addToCartButtons = document.getElementsByClassName("button-hover-background")
    // for (var i = 0; i < addToCartButtons.length; i++){
    //     addToCartButtons[i].addEventListener("click", addProductToCart)
    // }
}


function acao(){
    retornar_page('carrinho.html')
  
 }
 
 function retornar_page(url){
     window.location.href = url; 
 }

function addProductToCart(event){
    const button = event.target
    const productInfos = button.parentElement.parentElement
    const productImg = productInfos.querySelector(".one").src
    const productTitle = productInfos.querySelector(".product-select").innerText
    const productPrice = productInfos.querySelector(".price-product").innerText


    let newCartProduct = document.createElement("tr")
    newCartProduct.classList.add("cart-product")
    newCartProduct.innerHTML = 
    `   <td>
            <div class="product">
                <img src="${productImg}" alt="${productTitle}" />
                <div class="info">
                    <div class="name">${productTitle}</div>
                    <div class="category">Categoria</div>
                </div>
            </div>
        </td>
        <td>
            <span class="product-price">${productPrice}}</span>
        </td>
        <td>
            <div class="qty">
                <button><i class="bx bx-minus"></i></button>
                <input type="number" value="1" min="0" class="product-qtd">
                <button><i class="bx bx-plus"></i></button>
            </div>
        </td>
        <td>
            R$ 240
        </td>
        <td>
            <button type="button" class="remove"><i class="bx bx-x"></i></button>
        </td>
    
    `

    const tableBody = document.querySelector(".cart-table-body");
    console.log(tableBody)
    tableBody.append(newCartProduct)

    updateTotal()
}
function removeProduto(event){
    event.target.parentElement.parentElement.remove()
    updateTotal()
}

function updateTotal() {
    let totalMontante = 0;
    const linhadeprodutos = document.getElementsByClassName("cart-product");

    for (var i = 0; i < linhadeprodutos.length; i++) {
        const productPreco = parseFloat(linhadeprodutos[i].getElementsByClassName("product-price")[0].innerText.replace("R$", "").replace(",", "."));
        const productQuantity = parseInt(linhadeprodutos[i].getElementsByClassName("product-qtd")[0].value);
        totalMontante += productPreco * productQuantity;
    }

    totalMontante = totalMontante.toFixed(2); /* Arredonda casa decimal */
    totalMontante = totalMontante.replace(".", ","); /* Fazendo troca de . para , */

    const cartTotal = document.querySelector(".cart-total span");
    if (cartTotal) {
        cartTotal.innerText = "R$" + totalMontante;
    }

    const infoTotal = document.querySelector(".info span");
    if (infoTotal) {
        infoTotal.innerText = "R$" + totalMontante;
    }
}



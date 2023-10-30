let cartProductList = JSON.parse(localStorage.getItem("cartData")) || []

displaycart()

function deleteProduct(id){
    const productId = id 
    var result = confirm("Want to delete?");
        if (result) {
            console.log('product id',productId)
            updatedCartList = cartProductList.filter(product => product.id != productId)
            console.log('updated list',updatedCartList)
            localStorage.setItem("cartData",JSON.stringify(updatedCartList))
            location.reload()
           
      
        }
        else{
            return
        }
}

function displaycart(){
    let total=0;

    if(cartProductList.length==0){
        document.getElementById('cartItem').innerHTML = "Your cart is empty";
        document.getElementById("total").innerHTML = "$ "+0+".00";
    }
    else{
        document.getElementById("cartItem").innerHTML = cartProductList.map((product)=>
        {
            var {image, title, price, id  } = product;

            total=total+price;

            document.getElementById("total").innerHTML = "$ "+total+".00";

            return(
                `<div class='cart-item'>
                    <div class='row-img'>
                        <img class='rowimg' src=${image}>
                    </div>
                    <p style='font-size:12px; margin-left:3%'>${title}</p>
                    <h2 style='font-size: 15px;margin-left:auto; margin-right:3%'>$ ${price}.00</h2>`+
                    `<i class='fa-solid fa-trash' onclick='deleteProduct(${id})'></i>
                </div>`
            );
        }).join('');
    }

    
}

fetch("https://fakestoreapi.com/products")
.then((response) => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("NETWORK RESPONSE ERROR");
  }
})
.then(data => {
  localStorage.setItem("productlist",JSON.stringify(data))
  localStorage.setItem("defaultproductList",JSON.stringify(data))
 
})
.catch((error) => console.error("FETCH ERROR:", error));

let productList = JSON.parse(localStorage.getItem("productlist")) || []

let cartProduct = JSON.parse(localStorage.getItem("cartData")) || []
  
let defaultlist = JSON.parse(localStorage.getItem("defaultproductList")) || []

cartProductCount()


document.getElementById('root').innerHTML = productList.map((product)=>
    {
        var {image, title, price,id} = product;
        return(
            `<div class='product-box'>
                <div class='img-box'>
                    <img class='images' src=${image}></img>
                </div>
                <div class='bottom'>
                    <p class='product-name'>${title}</p>
                    <h2>$ ${price}.00</h2>`+
                    `<button onclick='addtocart(${id})'>Add to cart</button>`+
                `</div>
            </div>`
        )
    }).join('')
 


function addtocart(id){

    cartProduct.push({...productList[id-1]});

    localStorage.setItem("cartData",JSON.stringify(cartProduct))

    cartProductCount();
    
}


function cartProductCount (){

    document.getElementById("count").innerHTML=cartProduct.length;
}

const filterDropdown = document.getElementById('select-filter-by');

filterDropdown.addEventListener('change', function handleChange(event) {

  const selectedValue = event.target.value

    if(selectedValue === "LowToHigh"){

      const highToLowSortedData = sortDataByPrice(productList, selectedValue);
      localStorage.setItem("productlist",JSON.stringify(highToLowSortedData))
      localStorage.setItem("selectedFilter",selectedValue)
      location.reload()

    }
    else if ( selectedValue === "HightToLow"){

      const lowToHighSortedData = sortDataByPrice(productList, selectedValue);
      localStorage.setItem("productlist",JSON.stringify(lowToHighSortedData))
      localStorage.setItem("selectedFilter",selectedValue)
      location.reload()

    }
    else if (selectedValue === "default"){

      localStorage.setItem("productlist",JSON.stringify(defaultlist))
      localStorage.setItem("selectedFilter",selectedValue)
      location.reload()
      
    }

});

const selectedFilter = localStorage.getItem("selectedFilter");

document.querySelector('#select-filter-by').value = selectedFilter;


function sortDataByPrice(data, selectedValue) {
  data.sort(function (a, b) {
    if (selectedValue === "HightToLow") {
      return b.price - a.price; 
    } 
    else if (selectedValue === "LowToHigh") {
      
      return a.price - b.price; 
    }
  });
  return data;
}





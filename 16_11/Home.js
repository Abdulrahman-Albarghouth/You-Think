let products = [];
let SingleProducts = {};

const cards = document.querySelector(".cards");




const getProducts = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json()
    products = []
    products.push(...data)
}

const getSingleProducts = async (productId) => {
    const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
    const data = await res.json()
    SingleProducts = data
}

const showCards = (data) => {
    cards.innerHTML = ""
    data.map(item => {
        cards.innerHTML += `
        <li class="card">
          <img
            src="${item.image}"
            alt=""
          />
          <div class="card-info">
            <p>
              ${item.title}
              Bracelet
            </p>
            <p>price: ${item.price}</p>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
          </div>
        </li>
        `
    })
}

await getProducts()

console.log(products)

showCards(products)




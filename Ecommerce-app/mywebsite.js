let shop = document.getElementById("shop");


let shopItemsData =[{
    id:"anything1",
    name:"Casual Shirt",
    price: 45,
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit",
   img: "./pexels-chris-f-19109860.jpg"},
{id:"anything2",
name:"Casual Shirt",
price: 45,
desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit",
img: "./pexels-chris-f-19109860.jpg"
},
{id:"anything3",
    name:"Casual Shirt",
    price: 45,
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit",
   img: "./pexels-chris-f-19109860.jpg"
},{id:"anything4",
name:"Casual Shirt",
price: 45,
desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit",
img: "pexels-chris-f-19109860.jpg"
}]


let generateShop =()=>{
return shop.innerHTML=()=>`
<div class="shop-item"> 
<img width="196" src="./pexels-chris-f-19109860.jpg" alt="">
<div class="details">
  <h3>Casual Shirt</h3>
  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. </p>
  <div class="price-quantity">
    <h2>Ksh.200</h2>
    <div class="price-btn">
      <ion-icon id="remove" name="remove"></ion-icon>
      <div class="quantity">0</div>
      <ion-icon id="add" name="add"></ion-icon>
    </div>
  </div>
</div> 
`}
generateShop()
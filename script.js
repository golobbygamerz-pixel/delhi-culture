// script.js
const products=[
 {id:1,name:"CORE LOGO TEE",price:1499,cat:"tees"},
 {id:2,name:"DELHI BOX TEE",price:1699,cat:"tees"},
 {id:3,name:"NOIR BAGGY PANTS",price:2499,cat:"bottoms"},
 {id:4,name:"CITY CARGO",price:2799,cat:"bottoms"},
 {id:5,name:"SIGNAL OVERSHIRT",price:2999,cat:"outerwear"},
 {id:6,name:"NIGHT SHIFT JACKET",price:3499,cat:"outerwear"},
 {id:7,name:"RAW FIT TEE",price:1399,cat:"tees"},
 {id:8,name:"EAST DELHI DENIM",price:3199,cat:"bottoms"}
];

let cart=JSON.parse(localStorage.getItem("dc-cart")||"[]");

const money=n=>"₹"+n.toLocaleString("en-IN");

function renderProducts(list=products){
  document.querySelector("#products").innerHTML=list.map(p=>`
    <article class="product" onclick="quick(${p.id})">
      <div class="product-visual"></div>
      <button class="quick" onclick="event.stopPropagation();add(${p.id})">ADD TO BAG</button>
      <div class="product-info"><strong>${p.name}</strong><span>${money(p.price)}</span></div>
    </article>`).join("");
}

function renderCart(){
  const box=document.querySelector("#cartItems");
  document.querySelector("#cartCount").textContent=cart.reduce((a,i)=>a+i.qty,0);
  if(!cart.length){box.innerHTML="<p style='font-size:12px;color:#888'>YOUR BAG IS EMPTY.</p>";}
  else box.innerHTML=cart.map(i=>`
    <div class="cart-item">
      <div class="mini-visual"></div>
      <div><strong style="font-size:11px">${i.name}</strong><div style="font-size:10px;margin-top:8px">${money(i.price)}</div>
      <div class="qty"><button onclick="change(${i.id},-1)">−</button>${i.qty}<button onclick="change(${i.id},1)">+</button></div></div>
      <button onclick="removeItem(${i.id})">×</button>
    </div>`).join("");
  document.querySelector("#subtotal").textContent=money(cart.reduce((a,i)=>a+i.price*i.qty,0));
  localStorage.setItem("dc-cart",JSON.stringify(cart));
}

function add(id){
  const p=products.find(x=>x.id===id), item=cart.find(x=>x.id===id);
  item?item.qty++:cart.push({...p,qty:1});
  renderCart();document.querySelector("#cart").classList.add("open");
}
function change(id,n){
  const i=cart.find(x=>x.id===id);if(!i)return;
  i.qty+=n;if(i.qty<1)cart=cart.filter(x=>x.id!==id);renderCart();
}
function removeItem(id){cart=cart.filter(x=>x.id!==id);renderCart()}

function quick(id){
  const p=products.find(x=>x.id===id);
  document.querySelector("#quickContent").innerHTML=`
    <div class="quick-grid">
      <div class="quick-big"></div>
      <div class="quick-info">
        <p>${p.cat.toUpperCase()}</p><h2>${p.name}</h2>
        <p>Designed for everyday movement. Clean silhouette, relaxed fit and a minimal Delhi Culture identity.</p>
        <h3>${money(p.price)}</h3>
        <button onclick="add(${p.id});closeQuick()">ADD TO BAG — ${money(p.price)}</button>
      </div>
    </div>`;
  document.querySelector("#quickView").classList.add("open");
}
function closeQuick(){document.querySelector("#quickView").classList.remove("open")}

document.querySelectorAll(".filter").forEach(b=>b.onclick=()=>{
  document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));
  b.classList.add("active");
  renderProducts(b.dataset.filter==="all"?products:products.filter(p=>p.cat===b.dataset.filter));
});

document.querySelector("#cartBtn").onclick=()=>document.querySelector("#cart").classList.add("open");
document.querySelector("#closeCart").onclick=()=>document.querySelector("#cart").classList.remove("open");
document.querySelector("#closeQuick").onclick=closeQuick;

document.querySelector("#searchBtn").onclick=()=>{
  document.querySelector("#searchPanel").classList.add("open");
  document.querySelector("#searchInput").focus();
};
document.querySelector("#searchPanel .close").onclick=()=>document.querySelector("#searchPanel").classList.remove("open");

document.querySelector("#searchInput").oninput=e=>{
  const q=e.target.value.toLowerCase();
  document.querySelector("#searchResults").innerHTML=products.filter(p=>p.name.toLowerCase().includes(q))
  .map(p=>`<button onclick="quick(${p.id})" style="text-align:left;padding:15px 0;border-bottom:1px solid #ddd;font-weight:700">${p.name} — ${money(p.price)}</button>`).join("");
};

document.querySelector("#checkout").onclick=()=>{
  if(!cart.length)return alert("Your bag is empty.");
  alert("Checkout is ready for Razorpay integration. Connect your Razorpay backend before accepting live payments.");
};

const observer=new IntersectionObserver(entries=>entries.forEach(e=>e.isIntersecting&&e.target.classList.add("visible")),{threshold:.12});
document.querySelectorAll(".reveal").forEach(e=>observer.observe(e));

renderProducts();
renderCart();
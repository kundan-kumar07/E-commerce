
let container=document.querySelector(".container-of-cards");
let basket=JSON.parse(localStorage.getItem("data1")) || [];

let generateShop=()=>{
    return (container.innerHTML=shopItems.map((x)=>{
      let {id,price,desc,img,name}=x;
      let search=basket.find((x)=>x.id===id)||[];
        return `<div  class="item">
        <img width="220" src="${img}" alt="" />
        <div class="details">
          <h1>${name}</h1>
          <p>${desc}
            
          </p>
          <div class="price">
            <h2>${price}</h2>
            <div class="buttons">
              <i onclick="decrement('${id}')" class="bi-dash-lg"></i>
              <div id="${id}" class="quantity">
              ${search.item===undefined ? 0:search.item}</div>
              
              <i onclick="increment('${id}')"class="bi-plus-lg"></i>
            </div>
          </div>
        </div>
      </div>`
      ;

    })
    .join(""))
}

generateShop();

let increment=(id)=>{
  let selectedItem=id;
  let search=basket.find((x)=>x.id===selectedItem);
  if(search===undefined){
    basket.push({
      id:selectedItem,
      item:1,  
      
    });
  }
  else{
    search.item+=1;
  }
  localStorage.setItem("data1",JSON.stringify(basket));

  // console.log(basket);
  update(selectedItem);
  
  
};
let decrement=(id)=>{
  let selectedItem=id;
  let search=basket.find((x)=>x.id===selectedItem);
  if(search===undefined)return;

  else if(search.item===0){
    return;

  }
  else{
    search.item-=1;
  }
  
  basket=basket.filter((x)=>x.item!==0);
  localStorage.setItem("data1",JSON.stringify(basket));

  // console.log(basket);
  update(selectedItem);

};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  if (search) {
    document.getElementById(id).innerHTML = search.item;
  }
  calculation();
};

let calculation=()=>{
  let cartAmount=document.querySelector(".cartAmount");
  cartAmount.innerHTML=(basket.map((x)=>x.item).reduce((x,y)=>x+y,0));


}

  







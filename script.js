let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");
let favBtn = document.querySelector(".fav-btn");
const favMeals = document.querySelector("#fav-meals");
const mealBody = document.querySelector(".meal-body");
const cartContainer = document.getElementById("#cart");

const products = []





let getMovie = () =>  {
  let movieName = movieNameRef.value;
  let url = `https://www.omdbapi.com/?t=${movieName}&apikey=${key}`;


    if (movieName.length <= 0) {
        result.innerHTML = `<h3 class="msg">Please Enter A Movie Name</h3>`;
      }else {
        fetch(url)
          .then((resp) => resp.json())
          .then((data) => {
            //If movie exists in database
            if (data.Response == "True") {


          

              result.innerHTML = `



              <div class="productItem">
              <div class="image">
                  <img src="${data.Poster}" alt="Image">
              </div>
              <div class="name">
                  <h2>${data.Title}</h2>
              </div>

              <div class="rating">
                        
              <h4>${data.imdbRating}</h4>
          </div>

              <div class="details">
              <span>${data.Rated}</span>
              <span>${data.Year}</span>
              <span>${data.Runtime}</span>
          </div>
          <div class="genre">
          <div>${data.Genre.split(",").join("</div><div>")}</div>
         </div>

         <h3>Plot:</h3>
         <p>${data.Plot}</p>
         <h3>Cast:</h3>
         <p>${data.Actors}</p>
              
              <div class="btn">
                <i class="fas fa-heart"></i>
              </div>
          </div>
            `;


     

            const btn = document.getElementsByClassName('btn');


            for(var i = 0; i < btn.length; i++){
              let cartBtn = btn[i]
              cartBtn.addEventListener('click', () => {
                   
                    let product = {
                      image: event.target.parentElement.parentElement.children[0].children[0].src,
                      name: event.target.parentElement.parentElement.children[1].children[0].textContent,
                      quantity: 1
           
                   
                 
                    }

                  
                    addItemToLocal(product)
                    dispCartItem()
                 
              })

            }
            
       




            function addItemToLocal(product) {

              let cartItem = JSON.parse(localStorage.getItem('prdInCart'))
              if(cartItem === null) {
              products.push(product)
              localStorage.setItem('prdInCart', JSON.stringify(products))
              
             
              } else {
                cartItem.forEach(item => {
                  if(product.name == item.name) {
                    product.quantity = item.quantity += 1;
                  }else {
                    products.push(item)
                  }
                });
                products.push(product)
              }
              localStorage.setItem('prdInCart', JSON.stringify(products))
              window.location.reload()
            }





           
          
            }

       
       
       
          
          
          //If movie does NOT exists in database
          else {
            result.innerHTML = `<h3 class='msg'>${data.Error}</h3>`;
          }
        })
        //If error occurs
        .catch(() => {
          result.innerHTML = `<h3 class="msg">Error Occured</h3>`;
        });
        
      
      
        
      }

  
       
    }
      searchBtn.addEventListener("click", getMovie);
      window.addEventListener("load", getMovie);
   
      


  
      function dispCartItem(){
        let html = '';
        let cartItem = JSON.parse(localStorage.getItem('prdInCart'))
        cartItem.forEach(data => {
            html += `
            <div class="cartlist">
            <div><img src="${data.image}" alt=""></div>
            <div><h3>${data.name}</h3></div>
                   
             <div class="reoveItem"><button>x</button></div>
            
       </div>
            `
        });
       document.querySelector('.cartdisp').innerHTML = html;



       
       
      }
      
      
      dispCartItem()
     
      
      
        const removeItem = document.getElementsByClassName('reoveItem')
        for(var i = 0; i < removeItem.length; i++) {
          let removeBtn = removeItem[i]
          removeBtn.addEventListener('click', () => {
            let cartItem = JSON.parse(localStorage.getItem('prdInCart'))
            console.log(event.target.parentElement.parentElement.children[1].children[0].textContent)
            cartItem.forEach(item => {
            if(item.name != event.target.parentElement.parentElement.children[1].children[0].textContent) {
              products.push(item)
            }
            });
            localStorage.setItem('prdInCart', JSON.stringify(products))
              window.location.reload()
          })
        }


      



 

          
           
         
    
    

   



 



    
      

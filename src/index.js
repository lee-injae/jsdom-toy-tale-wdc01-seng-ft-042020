// let addToy = false;
// const url = "http://localhost:3000/toys"
// const toyFormContainer = () => document.querySelector(".container");
// const addBtn = () => document.querySelector("#new-toy-btn");
// const toyForm = () => document.querySelector(".add-toy-form")

// document.addEventListener("DOMContentLoaded", () => {
//   addBtn().addEventListener("click", toggleFormDisplay);
//   toyForm().addEventListener("submit", handleSubmit)
//   getToys()
// });

 // hide & seek with the form
function toggleFormDisplay(){
  addToy = !addToy;
  if (addToy) {
    toyFormContainer().style.display = "block";
  } else {
    toyFormContainer().style.display = "none";
  }
}


// toy rendering

function getToys(){
  fetch(url)
  .then(function(response){
    response.json()
  .then(function(json){
    json.forEach(function(toy){
      renderToyCard(toy)
    })
  })
})
}

  function renderToyCard(toy) {
      let toyContainer = document.querySelector("#toy-collection")
      let div = document.createElement("div")
      div.className = "card"

      let heading = document.createElement("h2")
      let img = document.createElement("img")
      let likes = document.createElement("p")
      let button = document.createElement("button")

      heading.textContent = toy.name
      img.src = toy.image
      img.className = "toy-avatar"
      likes.textContent = `${toy.likes} Likes`
      button.className = "like-btn"
      button.textContent = "Like <3"
      button.addEventListener("click", function(e){ 
        handleClick(e, toy.id)
      })

      div.append(heading,img,likes,button)
      
      toyContainer.appendChild(div)
  }

function handleClick(e, id){
let likesEl = e.target.nextElementSibling
let likes = parseInt(likesEl.textContent.split(" ")[0]) + 1
  fetch(`${url}/${id}`, {
    method: "PATCH",
    headers: {"Content-Type": "application/json", "Accept": "application/json"},
    body: JSON.stringify({likes: likes})
  }).then(function(response){
    response.json()
  }).then(function(json){
    likes.textContent = `${likes} Likes`
  }) 
}

function handleSubmit(e) {
  e.preventDefault()
  createToy(e.tartet.name.value, e.target.image.value)
  e.target.reset
}


//adding a new toy

function createToy(name,imageURL) {
  fetch(url, {
    method: "POST",
    headers: {"Content-Type": "application/json", "Accept": "application/json"},
    body: JSON.stringify({
      name: name,
      image: imageURL,
      likes: 0
    })
  }).then(function(response){
    response.json()
    .then(renderToyCard)
  })
}




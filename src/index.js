let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  toggleForm()
  getToys()
  newToyForm()
});

const getToys = () => {
  fetch('http://localhost:3000/toys/')
  .then(resp => resp.json())
  .then(toys => {
    //returns an array of toys - we'll create a card for each toy. Lets seperate them out
    toys.forEach(toy => renderToy(toy))
    //we now have one object at a time
    })
}

const renderToy = (toy) => {
  // console.log(toy.name)
  //create a div with class "card"
  const toyCard = document.createElement('div')
  toyCard.className = "card"


  const toyName = document.createElement('h2')
  toyName.innerText = toy.name

  const toyImg = document.createElement('img')
  toyImg.src = toy.image
  toyImg.className = "toy-avatar"

  const toyLikes = document.createElement('p')
  toyLikes.innerText = `${toy.likes} Likes`

  const likeBtn = document.createElement('button')
  likeBtn.innerText = `like <3`
  likeBtn.className = 'like-btn'
  likeBtn.id = toy.id

  likeBtn.addEventListener('click', (e) => {
    const currentLikesText = e.target.previousSibling.innerText
    // split the string into an array to seperate [number], "likes"
    const actualLikes = currentLikesText.split(" ")[0]
    // console.log(actualLikes)
    //convert actualLikes into a number
    e.target.previousSibling.innerText = `${parseInt(actualLikes) +1} Likes`
  })

  toyCard.append(toyName,toyImg,toyLikes,likeBtn)

  //get the collection div
  const toyCollection = document.querySelector('#toy-collection')
  //console.log(toyCollection)
  //append it
  toyCollection.append(toyCard)
}

// ADD NEW TOY
const newToyForm = () => {
  // get the form
  const toyForm = document.querySelector('.add-toy-form')
  //add event listener for submit
  toyForm.addEventListener('submit', (e) => {
    e.preventDefault()
    // get info from the form
    const newToyName = e.target.name.value
    const newToyImage = e.target.image.value
    //console.log(e.target.name.value)

    const newToyObj = {
      name: newToyName,
      image: newToyImage,
      likes: 0
    }
    // get new toy to appear
    renderToy(newToyObj)
  })
}

const toggleForm = () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
}

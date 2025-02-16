const typeColor = {
  bug: "#26de81",
  dragon: "#ffeaa7",
  electric: "#fed330",
  fairy: "#FF0069",
  fighting: "#30336b",
  fire: "#f0932b",
  flying: "#81ecec",
  grass: "#00b894",
  ground: "#EFB549",
  ghost: "#a55eea",
  ice: "#74b9ff",
  normal: "#95afc0",
  poison: "#6c5ce7",
  psychic: "#a29bfe",
  rock: "#2d3436",
  water: "#0190FF",
};
const url = " https://pokeapi.co/api/v2/pokemon/";
const head = document.querySelector(".header")
const card = document.getElementById("card");
const btn = document.getElementById("btn");
const btn1 = document.querySelector("#btn2");
const bdayCont = document.querySelector(".bday");
const h = document.querySelector(".heading");
const bday = document.querySelector(".bday-value");

let getPokeData = () => {
  h.style.display = "none";
  head.style.display = "none";
  card.style.display = "flex";
  bdayCont.style.display = "none";
  btn.style.display = "none";
  btn1.style.display = "block";
  const birth = bday.value;
  const dob = new Date(birth);

  // Generate a random number between 1 and 150
  let id = Math.floor(Math.random() * (dob.getDate()+dob.getMonth()));
  // console.log(id);

  // console.log(birth);
  // console.log;
  // Combine the pokeapi url with pokemon id
  const finalUrl = url + id;
  // Fetch generated URL
  fetch(finalUrl)
    .then((response) => response.json())
    .then((data) => {
      generateCard(data);
    });
};

//Generate Card

let generateCard = (data) => {

  // Get necessary data and assign it to variables
  console.log(data);
  const hp = data.stats[0].base_stat;
  const imgSrc = data.sprites.other.dream_world.front_default;
  const pokeName = (data.name[0].toUpperCase() + data.name.slice(1)).toUpperCase();
  const statAttack = data.stats[1].base_stat;
  const statDefense = data.stats[2].base_stat;
  const statSpeed = data.stats[5].base_stat;

  // Set themeColor based on pokemon type
  const themeColor = typeColor[data.types[0].type.name];
  console.log(themeColor);
  card.innerHTML = `
          <p class="hp">
            <span>HP</span>
              ${hp}
          </p>
          <img src=${imgSrc} />
          <h2 class="poke-name">You are a 
          "${pokeName}"</h2>
          <div class="types">
           
          </div>
          <div class="stats">
            <div>
              <h3>${statAttack}</h3>
              <p>Attack</p>
            </div>
            <div>
              <h3>${statDefense}</h3>
              <p>Defense</p>
            </div>
            <div>
              <h3>${statSpeed}</h3>
              <p>Speed</p>
            </div>
          </div>
    `;
  appendTypes(data.types);
  styleCard(themeColor);
};
let appendTypes = (types) => {
  types.forEach((item) => {
    let span = document.createElement("SPAN");
    span.textContent = item.type.name;
    document.querySelector(".types").appendChild(span);
  });
};
let styleCard = (color) => {
  card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #ffffff 36%)`;
  card.querySelectorAll(".types span").forEach((typeColor) => {
    typeColor.style.backgroundColor = color;
  });
};

btn.addEventListener("click", getPokeData);
btn1.addEventListener("click", () => {
  location.reload();
})

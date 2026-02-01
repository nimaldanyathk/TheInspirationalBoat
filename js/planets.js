const model = [
  {
    name: "SUN",
    description:
      "The Sun is the star at the center of the Solar System. It is a nearly perfect ball of hot plasma,heated to incandescence by nuclear fusion reactions in its core.",
    year: "4,500,000,000",
    type: "YELLOW DWARF STAR",
    radius: "696,340 km",
    planet: "../assets/images/sun.png",
    galaxy: "../assets/images/sunbag.jpg",
  },
  {
    name: "EARTH",
    description:
      "Earth is the third planet from the Sun and the only place known in the universe where life has originated and found habitability. This is enabled by Earth being a water world, the only one in the Solar System sustaining liquid surface water.",
    year: "4.54 billion",
    type: "terrestrial",
    radius: "6,371 km",
    planet: "../assets/images/earth.png",
    galaxy: "../assets/images/earthbag.jpg",
  },
  {
    name: "MARS",
    description: `Mars is the fourth planet and the furthest terrestrial planet from the Sun. The reddish color of its surface is due to finely grained iron(III) oxide dust in the soil, giving it the nickname "the Red Planet". Mars's radius is second smallest among the planets in the Solar System at 3,389.5 km`,
    year: "4.6 billion",
    type: "terrestrial",
    radius: "3,389.5 km",
    planet: "../assets/images/mars.png",
    galaxy: "../assets/images/marsbag.jpg",
  },
  {
    name: "JUPITER",
    description:
      "Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass more than two and a half times that of all the other planets in the Solar System combined, and slightly less than one one-thousandth the mass of the Sun",
    year: "4.6 billion",
    type: "gas giant",
    radius: "69,911 km",
    planet: "../assets/images/jupiter.png",
    galaxy: "../assets/images/jupiterbag.jpg",
  },
  {
    name: "SATURN",
    description:
      "Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. It is a gas giant with an average radius of about nine and a half times that of Earth. It has a prominent ring system that consists of nine continuous main rings and three discontinuous arcs.",
    year: "4.6 billion",
    type: "gas giant",
    radius: "58,232 km",
    planet: "../assets/images/saturn.jpg",
    galaxy: "../assets/images/saturnbag.jpg",
  },
  {
    name: "URANUS",
    description:
      "Uranus is the seventh planet from the Sun and is a gaseous cyan ice giant. Most of the planet is made of water, ammonia, and methane in a supercritical phase of matter, which in astronomy is called 'ice' or volatiles.",
    year: "4.5 billion",
    type: "ice giant",
    radius: "25,362 km",
    planet: "../assets/images/uranus.png",
    galaxy: "../assets/images/uranusbag.avif",
  },
  {
    name: "NEPTUNE",
    description:
      "Neptune is the eighth and farthest known Solar planet from the Sun. In the Solar System, it is the fourth-largest planet by diameter, the third-most-massive planet, and the densest giant planet. It is 17 times the mass of Earth, and slightly more massive than its near-twin Uranus.",
    year: "4.5 billion",
    type: "ice giant",
    radius: "24,622 km",
    planet: "../assets/images/neptune.png",
    galaxy: "../assets/images/neptunebag.jpeg",
  }
];

const right = document.querySelector(".right");
const left = document.querySelector(".left");
const name = document.querySelector(".name");
const description = document.querySelector(".description");
const year = document.querySelector(".year");
const type = document.querySelector(".type");
const radius = document.querySelector(".radius");
const planet = document.querySelector(".planet");
const galaxy = document.querySelector(".galaxy");
let index = 0;
let degrees = 0;

right.addEventListener("click", () => {
  if (index < model.length - 1) {
    index++;
    degrees += 180;
    updatePlanetInfo();
  }
});

left.addEventListener("click", () => {
  if (index > 0) {
    index--;
    degrees -= 180;
    updatePlanetInfo();
  }
});

function updatePlanetInfo() {
  name.innerHTML = model[index].name;
  description.innerHTML = model[index].description;
  year.innerHTML = model[index].year;
  type.innerHTML = model[index].type;
  radius.innerHTML = model[index].radius;
  planet.style.transform = `rotate(${degrees}deg)`;
  galaxy.style.transform = `rotate(-${degrees}deg)`;
  galaxy.style.transform += `scale(2)`;
  setTimeout(() => {
    planet.src = model[index].planet;
    galaxy.src = model[index].galaxy;
  }, 500);
}
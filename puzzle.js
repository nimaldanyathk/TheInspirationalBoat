
function checkAnswer() {
  const input = document.getElementById("answer").value;
  const result = document.getElementById("result");
  const successSound = document.getElementById("success-sound");

  const n = parseInt(input);

  if (isNaN(n) || n < 2 || n > 1000) {
    result.textContent = "❌ Enter a valid n between 2 and 1000.";
    return;
  }

  const val = BigInt(3) ** BigInt(n) + BigInt(2) ** BigInt(n);
  if (val % BigInt(n) === BigInt(0)) {
    result.textContent = "✅ Wormhole opened! Welcome through the Gravity Gate!";
    successSound.play();
    document.querySelector(".blackhole-animation").style.boxShadow = "0 0 50px 15px #00ffcc";
    localStorage.setItem('puzzleSolved', 'true');
  } else {
    result.textContent = "❌ Black hole rejects your logic. Try again.";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem('puzzleSolved') === 'true') {
    document.getElementById("result").textContent = "🌟 You've already unlocked the Gravity Gate!";
    document.querySelector(".blackhole-animation").style.boxShadow = "0 0 50px 15px #00ffcc";
  }

  particlesJS("particles-js", {
    "particles": {
      "number": {
        "value": 355,
        "density": {
          "enable": true,
          "value_area": 789
        }
      },
      "color": {
        "value": "#D490AF"
      },
      "shape": {
        "type": "circle"
      },
      "opacity": {
        "value": 0.5,
        "anim": {
          "enable": true,
          "speed": 0.2
        }
      },
      "size": {
        "value": 2,
        "random": true,
        "anim": {
          "enable": true,
          "speed": 2
        }
      },
      "move": {
        "enable": true,
        "speed": 0.2,
        "random": true
      }
    },
    "interactivity": {
      "events": {
        "onhover": {
          "enable": true,
          "mode": "bubble"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        }
      },
      "modes": {
        "bubble": {
          "distance": 80,
          "size": 1,
          "duration": 3
        },
        "push": {
          "particles_nb": 4
        }
      }
    },
    "retina_detect": true
  });
});

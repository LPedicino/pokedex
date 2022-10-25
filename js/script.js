const pkmName = document.querySelector(".pkm-name");
const pkmNum = document.querySelector(".pkm-num");
const pkmImg = document.querySelector(".pkm-img");

const form = document.querySelector(".form");
const input = document.querySelector(".input-search");
const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");

let searchPkm = 25;

const fetchPkm = async (pkm) => {
  const APIResponse = await fetch(`http://pokeapi.co/api/v2/pokemon/${pkm}`);

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
};

const renderPkm = async (pkm) => {
  pkmName.innerHTML = "Loading...";
  pkmNum.innerHTML = "";

  const data = await fetchPkm(pkm);

  if (data) {
    pkmImg.style.display = "block";
    pkmName.innerHTML = data.name;
    pkmNum.innerHTML = data.id;
    pkmImg.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];
    input.value = "";
    searchPkm = data.id;
  } else {
    pkmImg.style.display = "none";
    pkmName.innerHTML = "Not Found ";
    pkmNum.innerHTML = "";
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  renderPkm(input.value.toLowerCase());
});

btnPrev.addEventListener("click", () => {
  if (searchPkm > 1) {
    searchPkm -= 1;
    renderPkm(searchPkm);
  }
});

btnNext.addEventListener("click", () => {
  searchPkm += 1;
  renderPkm(searchPkm);
});

renderPkm(searchPkm);

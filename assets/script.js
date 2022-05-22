// Base url
const baseUrl = "http://localhost:3000/paletas";

const gettAllPaletas = async () => {
  const res = await fetch(`${baseUrl}/get-all-paletas`);

  const paletas = await res.json();

  return paletas;
};

const getPaletaById = async (id) => {
  const res = await fetch(`${baseUrl}/get-paleta/${id}`);

  if (res.status === 404) {
    return false;
  }

  const paleta = await res.json();

  return paleta;
};

const createPaleta = async (sabor, descricao, foto, preco) => {
  const paleta = {
    sabor,
    descricao,
    foto,
    preco,
  };
  const res = await fetch(`${baseUrl}/createPaleta`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify(paleta),
  });

  const newPaleta = await res.json();
  return newPaleta;
};

const updatePaleta = async (sabor, descricao, foto, preco) => {
  const paleta = {
    sabor,
    descricao,
    foto,
    preco,
  };

  const res = await fetch(`${baseUrl}/updatePaleta/:id`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify(paleta),
  });

  const updatedPaleta = await res.json();
  return updatedPaleta;
};

const deletePaleta = async (id) => {
  const res = await fetch(`${baseUrl}/deletePaleta/${id}`, {
    method: "DELETE",
    mode: "cors",
  });

  if (res.status === 204) {
    return "Paleta excluida com sucesso.";
  } else {
    return "Paleta não encontrada.";
  }
};

const printAllPaleta = async () => {
  const paletas = await gettAllPaletas();

  paletas.forEach((paletas) => {
    document.querySelector("#paletaList").insertAdjacentHTML(
      "beforeend",
      `
      <div>
      <div class="cardPaleta">
          <div class="cardPaleta_infos">
              <h4>${paletas.sabor}</h4>
              <span>R$${paletas.preco.toFixed(2)}</span>
              <h4>${paletas.descricao}</h4>
          </div>
          <img src=${paletas.foto} alt=${paletas.sabor}/>
      </div>
      
      `
    );
  });
};

printAllPaleta();

const PrintChosedPaleta = async () => {
  document.querySelector("#searchedPaleta").innerHTML = "";

  const input = document.querySelector("#inputIdPaleta");
  const id = input.value;

  const paleta = await getPaletaById(id);

  if (paleta === false) {
    const errorMessage = document.createElement("p");
    errorMessage.id = "errorMessage";
    errorMessage.classList.add("ErrorMessage");
    errorMessage.innerHTML = "Nenhuma Paleta foi encontrada.";

    document.querySelector("#searchedPaleta").appendChild(errorMessage);
  } else {
    document.querySelector("#searchedPaleta").innerHTML = `
    <div class="cardPaleta">
      <div class="cardPaleta_infos">
          <h4>${paleta.sabor}</h4>
          <span>R$${paleta.preco.toFixed(2)}</span>
          <h4>${paleta.descricao}</h4>
      </div>
      <img src=${paleta.foto} alt=${paleta.sabor}/>
    </div>
    `;
  }
};

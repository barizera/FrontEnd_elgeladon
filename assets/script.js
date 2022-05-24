// Variável auxiliar
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

const createPaleta = async () => {
  const sabor = document.querySelector("#sabor").value 
  const descricao = document.querySelector("#descricao").value
  const foto = document.querySelector("#foto").value 
  const preco = document.querySelector("#preco").value 
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
  console.log(res.body);
  console.log(paleta);
  const novaPaleta = await res.json();

  return novaPaleta;
};

const updatePaleta = async () => {
  
  document.querySelector("#id").value = paleta.id;
  document.querySelector("#sabor").value = paleta.sabor;
  document.querySelector("#descricao").value = paleta.descricao;
  document.querySelector("#foto").value = paleta.foto;
  document.querySelector("#preco").value = paleta.preco;
  
  const paleta = {
    id,
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
      <div class="cardPaleta" id="cardPaleta_${paletas.id}">
          <div class="cardPaleta_infos">
              <h4>${paletas.sabor}</h4>
              <span>R$${paletas.preco}</span>
              <h4>${paletas.descricao}</h4>
              <div class="PaletaListaItem__acoes Acoes">
                 <button class="Acoes__editar btn" onclick="openModalCreate(${paletas.id})">Editar</i></button> 
                 <button class="Acoes__apagar btn")">Apagar</button> 
              </div>  
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
          <span>R$${paleta.preco}</span>
          <h4>${paleta.descricao}</h4>
      </div>
      <img src=${paleta.foto} alt=${paleta.sabor}/>
    </div>
    `;
  }
};

const openModalCreate = async (id = 0) => {
  document.querySelector(".Modal_overlay").style.display = "flex";
  if (id != 0) {
    document.querySelector("#title_header_modal").innerText =
      "Atualizar Paleta";
    document.querySelector("#button_form_modal").innerText = "Atualizar";
    document
      .querySelector("#button_form_modal")
      .setAttribute("onclick", "updatePaleta()");

    const res = await fetch(`${baseUrl}/get-paleta/${id}`);
    const paleta = await res.json();

  
  } else {
    document.querySelector("#title_header_modal").innerText =
      "Cadastre uma Paleta";
    document.querySelector("#button_form_modal").innerText = "Cadastrar";
  }
};

const fecharModalCreate = () => {
  document.querySelector(".Modal_overlay").style.display = "none";

  document.querySelector("#sabor").value = "";
  document.querySelector("#preco").value = 0;
  document.querySelector("#descricao").value = "";
  document.querySelector("#foto").value = "";
};

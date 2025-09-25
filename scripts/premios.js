async function buscarPremios(){
    try{
        const response = await fetch("https://pontuamais.onrender.com/premio/todos", {
        method: "GET",
        headers: {"Content-Type": "application/json",
            }
        });

        const data = await response.json();

        if(response.status !== 200){
            return data.erro;
        }

        return data.premios;

    }catch(erro){
        console.log(erro);
    }
}

async function resgatarPremio(premioId){
    console.log("iniciando processo");
    const cpf = document.getElementById("cpf");

    const cpfValor = cpf.value.trim();


    if(cpfValor === null || cpfValor === undefined || cpfValor === ""){
        return alert("É necessário informar o CPF do cliente para o resgate");
    }

    try{
        const response = await fetch("https://pontuamais.onrender.com/premio/pegar/premio", {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
            clienteCpf:cpfValor,
            premioId: premioId
            })
        });

        const data = await response.json();

        if(response.status === 200){
            cpf.value = "";
            return alert("Prêmio resgatado com sucesso!");
        }

        if("erro" in data){
            if (data.erro && data.erro.toLowerCase().includes("token")) {
                alert(`${data.erro} Você será redirecionado para a tela de login`);
                return setTimeout(() => window.location.href = "login.html", 1000);
            }
            return alert(`Ocorreu um erro: ${data.erro}`);
        }

    }catch(erro){
        console.log(erro);
    }
}

function criarCardPremio(premio){
    const card = document.createElement('div');
    card.className = "card-premio";

    card.innerHTML = `
        <img src="${premio.imagem || 'placeholder.jpg'}" alt="${premio.titulo}" class="card-image">
        <p class="card-titulo">${premio.titulo}</p>
        <p class="card-preco">${premio.valor}</p>
        <button class="card-button" premioId="${premio.id}">Resgatar</button>
    `;
    const button = card.querySelector('.card-button');
    button.addEventListener('click', function() {
        resgatarPremio(premio.id);
    });
    return card;
}


document.addEventListener("DOMContentLoaded", async () => {
    try{
        const premios = await buscarPremios();
        const grid = document.getElementById("grid-premios");

        grid.innerHTML = "";

        premios.forEach(premio => {
            const card = criarCardPremio(premio);
            grid.appendChild(card);
        });
    }catch(erro){
        console.log("Erro ao carregar o grid");
        console.log(erro);
    }
});

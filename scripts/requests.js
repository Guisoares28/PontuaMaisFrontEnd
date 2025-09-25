document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("formConsulta").addEventListener("submit", async (event) => {
        event.preventDefault();

        const cpf = document.getElementById("inputCPF").value;
        const mensagem_erro = document.getElementById("erro_alert");
        const nome = document.getElementById("textNome");
        const pontos = document.getElementById("textPontos");
        const cardCliente = document.getElementById("divPontoNome");
        const pesquisarPremios = document.getElementById('link-premios');
        
        mensagem_erro.hidden = true;

        try{
            const button = document.getElementById("enviar");

            button.textContent = "Consultando...";

            const response = await fetch("https://pontuamais.onrender.com/cliente/dados", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",                    
               },
               body:JSON.stringify({
                clienteCpf:cpf
               })
            });

            const data = await response.json();

            if(!response.ok){
                mensagem_erro.hidden = false;
                mensagem_erro.textContent = data.erro;
            }

            pesquisarPremios.hidden= false;
            cardCliente.hidden = false;
            nome.hidden = false;
            pontos.hidden = false;
            nome.textContent = data.mensagem.nome.toUpperCase();
            pontos.textContent = `Pontos: ${data.mensagem.totalPontos}`;
            button.textContent = "Consultar";
        }catch(erro){
            console.log(erro);
        }
        
    });
});
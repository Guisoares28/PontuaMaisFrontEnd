document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('submit', async (e) => {
        e.preventDefault();

        const cpf = document.getElementById('cpf').value;
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;
        const error_mensagem = document.getElementById('error_alert');

        error_mensagem.hidden = true;

        try{
            const response = await fetch('http://localhost:3000/cliente/cadastro', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    cpf:cpf,
                    nome:nome,
                    email:email,
                    telefone:telefone
                })
            });

            const data = await response.json();

            if(response.status !== 201){
                error_mensagem.hidden = false;
                error_mensagem.textContent = data.erro;
                if(data.erro.toLowerCase().includes("token")){
                    setTimeout(() => {
                        alert(`${data.erro} Você será redirecionado para a tela de login`);
                        window.location.href = "login.html";
                    }, 1000)
                }
                return
            }
            alert(data.mensagem);

            document.getElementById('cpf').value = "";
            document.getElementById('nome').value = "";
            document.getElementById('email').value = "";
            document.getElementById('telefone').value = "";

        }catch(erro){
            console.log(erro);
        }
    })
});
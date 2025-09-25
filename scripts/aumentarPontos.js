document.getElementById("formPontos").addEventListener('submit', async (e) => {
    e.preventDefault();

    const cpf = document.getElementById("cpf").value;
    const pontos = document.getElementById("pontos").value;

    if (!cpf) return alert("É necessário informar o CPF do cliente para adicionar pontos");

    try {
        const res = await fetch("https://pontuamais.onrender.com/funcionario/pontos/adicionar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ pontos: pontos, clienteCpf: cpf })
        });

        const data = await res.json();

        if (!res.ok) {
            if (data.erro && data.erro.toLowerCase().includes("token")) {
                alert(`${data.erro} Você será redirecionado para a tela de login`);
                setTimeout(() => window.location.href = "login.html", 1000);
                return;
            }
            return alert(data.erro || "Erro desconhecido");
        }

        const inputCpf = document.getElementById("cpf");
        const inputPontos = document.getElementById("pontos");

        inputCpf.value = "";
        inputPontos.value = "";

        alert(data.message);
    } catch (err) {
        console.error(err);
        alert("Erro ao conectar com o servidor");
    }
});
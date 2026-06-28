// ── CONTA ADMIN ──
const ADMIN_EMAIL = "admin@flavia.com";
const ADMIN_SENHA = "1234";

function getUsuarios() {
    const dados = localStorage.getItem("usuarios");
    return dados ? JSON.parse(dados) : [];
}

function salvarUsuarios(usuarios) {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function fazerLogin() {
    const email = document.getElementById("campoEmail").value.trim();
    const senha = document.getElementById("campoSenha").value;
    const erroDiv = document.getElementById("erroLogin");

    if (email === ADMIN_EMAIL && senha === ADMIN_SENHA) {
        erroDiv.classList.add("d-none");
        window.location.href = "agendamento-admin.html";
    }

    const usuarios = getUsuarios();
    const usuarioEncontrado = usuarios.find(function(u) {
        return u.email === email && u.senha === senha;
    });

    if (usuarioEncontrado) {
        erroDiv.classList.add("d-none");
        window.location.href = "agendamento.html";
    } else {
        erroDiv.classList.remove("d-none");
    }
}

// ── FUNÇÃO: FAZER CADASTRO ──
function fazerCadastro() {
    const email     = document.getElementById("cadastroEmail").value.trim();
    const telefone  = document.getElementById("cadastroTelefone").value.trim();
    const senha     = document.getElementById("cadastroSenha").value;
    const confirma  = document.getElementById("cadastroConfirma").value;
    
    const erroDiv   = document.getElementById("erroCadastro");
    const sucessoDiv = document.getElementById("sucessoCadastro");

    // Esconde avisos anteriores
    erroDiv.classList.add("d-none");
    sucessoDiv.classList.add("d-none");

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
        erroDiv.textContent = "Digite um e-mail válido (ex: nome@email.com).";
        erroDiv.classList.remove("d-none");
        return;
    }

    if (telefone === "") {
        erroDiv.textContent = "O telefone é obrigatório.";
        erroDiv.classList.remove("d-none");
        return;
    }

    if (senha !== confirma) {
        erroDiv.textContent = "As senhas não coincidem.";
        erroDiv.classList.remove("d-none");
        return;
    }

    if (senha.length < 6) {
        erroDiv.textContent = "A senha precisa ter pelo menos 6 caracteres.";
        erroDiv.classList.remove("d-none");
        return;
    }

    if (email === ADMIN_EMAIL) {
        erroDiv.textContent = "Esse e-mail já está em uso.";
        erroDiv.classList.remove("d-none");
        return;
    }

    const usuarios = getUsuarios();
    const jaExiste = usuarios.find(function(u) { return u.email === email; });

    if (jaExiste) {
        erroDiv.textContent = "Esse e-mail já está cadastrado.";
        erroDiv.classList.remove("d-none");
        return;
    }

    usuarios.push({ 
        email: email, 
        telefone: telefone, 
        senha: senha 
    });
    salvarUsuarios(usuarios);

    document.getElementById("formCadastro").reset();
    sucessoDiv.classList.remove("d-none");
}

document.addEventListener("DOMContentLoaded", function () {
    const campoSenha = document.getElementById("campoSenha");
    if (campoSenha) {
        campoSenha.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                fazerLogin();
            }
        });
    }
});
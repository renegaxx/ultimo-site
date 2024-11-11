import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";
import { app, db } from './script.js';  // Certifique-se de que o caminho está correto

const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    if (user) {
        const userRef = doc(db, "users", user.uid);  // Busca documento do usuário pelo uid
        getDoc(userRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    // Exibe o nome completo, nome de usuário e email
                    document.getElementById("fullName").innerText = userData.fullName;
                    document.getElementById("username").innerText = userData.username;
                    document.getElementById("user-email").innerText = userData.email;
                } else {
                    console.log("Usuário não encontrado no Firestore");
                }
            })
            .catch((error) => {
                console.log("Erro ao recuperar dados do Firestore:", error);
            });
    } else {
        console.log("Usuário não está logado.");
        window.location.href = "LoginCadastro.html";  // Redireciona caso não esteja logado
    }
});

// ANIMAÇÃO DAS JANELAS DE BOAS VINDAS
document.addEventListener("DOMContentLoaded", function () {
    // Animar o título de boas-vindas
    const welcomeMessage = document.getElementById("welcome-message");
    
    // Quando a animação terminar, vamos mover o conteúdo para o topo
    welcomeMessage.addEventListener("animationend", function () {
        // Adiciona a classe para mover o conteúdo para o topo
        document.getElementById("welcome-container").classList.add("animated");
    });

    // Clique no botão "Colaborador"
    document.getElementById("collaborator-btn").addEventListener("click", function () {
        // Esconde todos os elementos de seleção de função
        document.getElementById("role-selection").style.display = "none";
    
        // Exibe a nova div personalizada com animação
        const customContainer = document.getElementById("custom-container");
        customContainer.style.display = "flex";  // Exibe o contêiner
    
        // Adiciona a classe para ativar a animação de deslizar para cima
        setTimeout(() => {
            customContainer.classList.add("show");
        }, 10); // Um pequeno delay para garantir que o display esteja definido como 'flex' antes de animar
    });
    
    // Fecha a div personalizada quando o botão de fechar é clicado
    document.getElementById("close-btn").addEventListener("click", function () {
        // Remove a classe para animar de volta para baixo
        const customContainer = document.getElementById("custom-container");
        customContainer.classList.remove("show");
    
        // Espera a animação de fechamento para esconder o contêiner
        setTimeout(() => {
            customContainer.style.display = "none";  // Esconde a div personalizada

            // Exibe novamente os botões de seleção de função com opacidade e transição ajustadas
            const roleSelection = document.getElementById("role-selection");
            roleSelection.style.display = "flex";
            roleSelection.style.opacity = "1";
            roleSelection.style.visibility = "visible";
        }, 500); // Tempo de duração da animação
    });

    // Seleciona os elementos para o criador
    const creatorBtn = document.getElementById("creator-btn");
    const roleSelection = document.getElementById("role-selection");
    const confirmationScreen = document.getElementById("confirmation-screen");
    const confirmBtn = document.getElementById("confirm-btn");
    const cancelBtn = document.getElementById("cancel-btn");

    // Evento de clique para o botão "Criador"
    creatorBtn.addEventListener("click", function () {
        // Esconde a tela de seleção de papel
        roleSelection.style.display = "none";
        // Exibe a tela de confirmação
        confirmationScreen.style.display = "block";
    });

    // Evento de clique para o botão de confirmação
    confirmBtn.addEventListener("click", function () {
        // Ação caso o usuário confirme (pode ser redirecionado ou alterado conforme necessário)
        alert("Parabéns! Você agora é um Criador!");
    });

    // Evento de clique para o botão de cancelar
    cancelBtn.addEventListener("click", function () {
        // Volta para a tela de seleção de papel com a opacidade e a visibilidade ajustadas
        confirmationScreen.style.display = "none";
        roleSelection.style.display = "flex";
        roleSelection.style.opacity = "1";
        roleSelection.style.visibility = "visible";
    });
});

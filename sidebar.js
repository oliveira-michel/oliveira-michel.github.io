/**
 * sidebar.js - Componente reutilizável para barra lateral
 * 
 * Este script gera dinamicamente a barra lateral com informações pessoais
 * que pode ser reutilizada em todas as páginas do site.
 */
document.addEventListener('DOMContentLoaded', function () {
    // Detecta o caminho relativo para a raiz do site
    function getPathToRoot() {
        // Conta o número de / na URL para determinar o nível de profundidade
        const path = window.location.pathname;
        const parts = path.split('/').filter(part => part.length > 0);

        // Ignora o arquivo .htm no final
        const depth = path.endsWith('.htm') ? parts.length - 1 : parts.length;

        // Para ambiente local com file://, retorne caminho direto
        if (window.location.protocol === 'file:') {
            return './';
        }

        // Cria o caminho relativo com base na profundidade
        return depth === 0 ? './' : '../'.repeat(depth);
    }

    // Determina o caminho relativo para os recursos
    const pathToRoot = getPathToRoot();

    // Seleciona o elemento onde será inserido o sidebar
    const sidebarContainer = document.getElementById('mymenu');

    if (sidebarContainer) {
        // HTML do sidebar
        const sidebarHTML = `
            <div class="profileCard">
                <img src="${pathToRoot}selfie.jpg" alt="Michel Oliveira" class="photo">
                <h1>Michel Oliveira e Oliveira</h1>
                <div class="title">
                    <p>
                        Arquiteto e Engenheiro de sistemas | Reconhecida experiência em liderança de projetos com REST APIs
                    </p>
                </div>
                <div class="at">
                    <p>Banco Itaú · Banco Safra · Digitra.com</p>
                </div>
                <div class="social">
                    <a href="https://br.linkedin.com/in/michel-oliveira-arquitetura-ti" target="_blank" aria-label="LinkedIn"><span><i class="fab fa-linkedin"></i></span></a>
                    <a href="https://github.com/oliveira-michel" target="_blank" aria-label="GitHub"><span><i class="fab fa-github"></i></span></a>
                </div>
            </div>
            <div class="links">
                <div class="welcome-message">
                    <p>Uso este espaço para reunir alguns conteúdos que produzi ao longo da minha trajetória profissional. São frutos de experiências práticas nas empresas onde trabalhei.</p>
                    <p>Espero que estes materiais possam ser úteis para você. Para contato profissional, ficarei feliz em conectar pelo LinkedIn.</p>
                </div>
            </div>
        `;

        // Insere o HTML no container
        sidebarContainer.innerHTML = sidebarHTML;
    }
}); 
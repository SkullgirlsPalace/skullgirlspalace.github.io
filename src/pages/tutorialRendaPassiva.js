// =====================================================
// MANIFESTO DA RENDA PASSIVA
// Tutorial Component
// =====================================================

export function render() {
    return `
        <div class="tutorial-page fade-in" style="padding: 2rem 1rem; background-color: var(--bg-dark); min-height: 100vh;">
            
            <style>
                /* Scoped styles for the manifesto to avoid conflicts */
                @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap');
                
                .manifesto-wrapper {
                    font-family: 'Cinzel', serif;
                    background-color: #fdf6e3; /* Cor de pergaminho claro da V1 */
                    color: #3a2e1f; /* Cor de tinta escura (marrom) */
                    border: 2px solid #c9b79c;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                    max-width: 56rem;
                    margin: 0 auto;
                    padding: 2rem;
                    border-radius: 0.5rem;
                }

                @media (min-width: 768px) {
                    .manifesto-wrapper {
                        padding: 3rem;
                    }
                }

                .manifesto-wrapper h1, 
                .manifesto-wrapper h2, 
                .manifesto-wrapper h3 {
                    font-weight: 700;
                    text-shadow: 1px 1px 0px #c9b79c; /* Sombra leve para dar profundidade da V1 */
                    margin-bottom: 1rem;
                    color: inherit; /* override base app styles */
                }

                .manifesto-wrapper h1 {
                    font-size: 2.25rem;
                    line-height: 2.5rem;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    text-align: center;
                }

                @media (min-width: 768px) {
                    .manifesto-wrapper h1 {
                        font-size: 3rem;
                        line-height: 1;
                    }
                }

                .manifesto-wrapper h2 {
                    font-size: 1.5rem;
                    line-height: 2rem;
                    text-transform: uppercase;
                    border-bottom: 1px solid rgba(139, 69, 19, 0.2);
                    padding-bottom: 0.5rem;
                    margin-top: 2rem;
                }

                @media (min-width: 768px) {
                    .manifesto-wrapper h2 {
                        font-size: 1.875rem;
                        line-height: 2.25rem;
                    }
                }

                .manifesto-wrapper h3 {
                    font-size: 1.25rem;
                    line-height: 1.75rem;
                    margin-top: 1.5rem;
                }

                @media (min-width: 768px) {
                    .manifesto-wrapper h3 {
                        font-size: 1.5rem;
                        line-height: 2rem;
                    }
                }

                .manifesto-wrapper hr {
                    border-color: #c9b79c;
                    border-top-width: 2px;
                    border-style: solid;
                    margin: 2rem 0;
                }

                .manifesto-wrapper p {
                    font-size: 1.125rem;
                    line-height: 1.75;
                    margin-bottom: 1rem;
                    text-align: justify;
                }

                .manifesto-wrapper ul {
                    list-style-type: none;
                    padding-left: 1rem;
                    margin-bottom: 1.5rem;
                }

                .manifesto-wrapper ul.list-disc {
                    list-style-type: disc;
                    padding-left: 2.5rem;
                }

                .manifesto-wrapper li {
                    font-size: 1.125rem;
                    line-height: 1.75;
                    margin-bottom: 1rem;
                }

                .manifesto-wrapper header {
                    text-align: center;
                    margin-bottom: 3rem;
                }

                .manifesto-wrapper .subtitle {
                    font-size: 1.125rem;
                    font-style: italic;
                    margin-top: 0.5rem;
                }

                /* V2 specific elements mixed with V1 styling */
                .manifesto-wrapper .highlight-box {
                    background: rgba(201, 183, 156, 0.2);
                    border-left: 4px solid #c9b79c;
                    padding: 1rem;
                    margin: 1.5rem 0;
                }

                .manifesto-wrapper .stamp {
                    border: 3px double #8b0000;
                    color: #8b0000;
                    padding: 5px 15px;
                    display: inline-block;
                    transform: rotate(-3deg);
                    font-weight: bold;
                    opacity: 0.8;
                    margin-top: 10px;
                    font-size: 1.25rem;
                }

                .manifesto-wrapper .image-frame {
                    border: 8px double #c9b79c;
                    padding: 10px;
                    background: #fdf6e3;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                    margin: 20px 0;
                }

                .manifesto-wrapper .base-image {
                    width: 100%;
                    height: auto;
                    border: 1px solid #3a2e1f;
                    display: block;
                }

                .manifesto-wrapper .footer-text {
                    text-align: center;
                    font-size: 0.875rem;
                    color: #78716c;
                    margin-top: 2rem;
                }
                
                .manifesto-wrapper strong {
                    font-weight: 700;
                }
            </style>

            <main class="manifesto-wrapper">
                
                <!-- Cabeçalho do Manifesto -->
                <header>
                    <h1>O Manifesto da Renda Passiva</h1>
                    <p class="subtitle">Um Decreto sobre a Eficiência na Fenda de Skullgirls Mobile</p>
                    <div class="stamp">EDIÇÃO ATUALIZADA</div>
                </header>
                
                <section>
                    
                    <!-- Introdução: Por que este manifesto existe -->
                    <h2>I. Preâmbulo: A Tirania do "Grind"</h2>
                    <p>Nós, os jogadores conscientes do nosso tempo, reunidos em busca de justa recompensa pelo esforço calculado, vimos por este meio declarar nossa filosofia. A Fenda (Rift), em sua estrutura atual, apresenta uma disparidade injusta: a recompensa por alcançar o pináculo do Diamante 1-3 é marginalmente superior àquela do Diamante 4, contudo, o esforço exigido é exponencialmente maior.</p>
                    <p>Rejeitamos a corrida dos ratos. Rejeitamos o "grind" que consome horas de vida em troca de retornos decrescentes. Este manifesto é a nossa declaração de independência, baseado na filosofia do 80/20: obter 80% dos resultados com apenas 20% do esforço.</p>
                    <p>Este é o caminho da Renda Passiva.</p>

                    <hr>

                    <!-- Os Princípios da Estratégia -->
                    <h2>II. Os Pilares da Eficiência</h2>
                    <p>Para alcançar e manter o Diamante 4 com o mínimo de desgaste, decretamos os seguintes pilares como lei:</p>
                    
                    <ul>
                        <li>
                            <strong>1. O Pilar do "Timing" Divino:</strong> Os cinco (5) ataques obrigatórios serão realizados no domingo à tarde. Idealmente, após a missa, quando munidos do <strong>BUFF</strong> divino, e quando a elite da Fenda já ascendeu, deixando para trás bases mais fracas e menor risco de retaliação.
                        </li>
                        <li>
                            <strong>2. O Pilar da Discrição (O Ponto 1480):</strong> Nosso objetivo não é a glória, mas a constância. Manter-se-á uma pontuação próxima a 1480. Ultrapassar os 1500 pontos é convidar o perigo e tornar-se um alvo desnecessário. Com cinco vitórias fáceis, esta faixa é atingida sem alarde.
                        </li>
                        <li>
                            <strong>3. O Pilar da Caça Seletiva:</strong> Atacaremos somente bases mais fracas ou evidentemente fáceis. A honra não enche o cofre de Teopontos; a vitória fácil, sim.
                        </li>
                        <li>
                            <strong>4. O Pilar da Compensação:</strong> Ocasionalmente, seremos atacados. Cada derrota na defesa durante a semana será considerada como um ataque adicional a ser feito no domingo, garantindo a manutenção da nossa faixa de pontos.
                        </li>
                    </ul>

                    <hr>

                    <!-- A Montagem da Base Custo-Benefício -->
                    <h2>III. O Decreto da Base Econômica</h2>
                    <p>Uma base de Renda Passiva não é construída com diamantes inúteis, mas com investimentos inteligentes que servem tanto à defesa quanto ao ataque. A ordem de prioridade é absoluta:</p>

                    <h3>Prioridade I: Os Diamantes "Curinga"</h3>
                    <p>Unidades de valor duplo, que fortalecem o ataque e a defesa simultaneamente. Elas são o alicerce de toda a conta e, portanto, da Fenda. Focai vossos recursos aqui antes de tudo:</p>
                    <ul class="list-disc">
                        <li>Desejo de Morte</li>
                        <li>Hóstia Profana</li>
                        <li>Fantoche Sombrio</li>
                        <li>Ameaça Mascarada (O ganha-ganha, buildada para defesa mesmo no ataque)</li>
                        <li>Neuromancer e Papa Moscas (Com Sangue Maculado, sua superior dispensa build defensiva)</li>
                    </ul>

                    <h3>Prioridade II: Os Ouros "Absurdos"</h3>
                    <p>O pão e a manteiga da nossa defesa. Economicamente viáveis, rápidos de evoluir (especialmente suas habilidades superiores) e, após o <strong>BUFF</strong> da v7.7, mais potentes do que nunca. Com golpes e astro no nível 9, eles entregam o máximo custo-benefício. Esta será a maioria da nossa base:</p>
                    <ul class="list-disc">
                        <li>Cachinhos Malvados</li>
                        <li>Tela Azul (Funciona em ambos os nós solo)</li>
                        <li>GI Jazz (O único Big Band defensivo que honraremos)</li>
                        <li>Forças Armadas</li>
                        <li>Maldade Eterna</li>
                        <li>Fibra Forte (!!!!!)</li>
                        <li>Painwheels adicionais com Sangue Maculado</li>
                        <li>(Opcional: Última Esperança, embora menos potente)</li>
                    </ul>

                    <h3>Prioridade III: A Elite Defensiva (O Toque Final)</h3>
                    <p>Com a base de Curingas e Ouros estabelecida, necessitamos apenas de um ou dois especialistas. Estes são os guardiões que evitam o ataque, contribuindo passivamente para nossa renda. Não há segredo:</p>
                    <ul class="list-disc">
                        <li>Replicada</li>
                        <li>Megalomaníaca</li>
                    </ul>

                    <hr>

                    <!-- A Alquimia dos Catalisadores -->
                    <h2>IV. A Alquimia dos Catalisadores</h2>
                    <p>A transição do Ouro para o Diamante 4 exige uma mudança na gestão de tesouros. No Diamante, a Chave de Diamante é garantida e o baú rende 20% de progresso, contra miseráveis 8% do Ouro 1. Portanto, vossa missão é parar de comprar chaves com moedas de fenda e iniciar o investimento em Catalisadores.</p>
                    <p>Não temais a escassez! As Disputas Premiadas de Diamante e o Concílio das Guildas proverão vossas chaves. Uma vez que vossos guerreiros estejam prontos, focai na Alquimia até que toda a base esteja encantada com catalisadores nível 9 ou superior.</p>
                    
                    <div class="highlight-box">
                        <h3 style="margin-top: 0; text-decoration: underline;">Ordenanças de Forja:</h3>
                        <p><strong>Genéricos (Nível 9):</strong> <strong> Autoimune, BLOCKBUSTED, Hora de Enfeitiçar, Luta Final, Maldição do Conhecimento, O Vacilão Nervoso e Previsão Definhante.</strong> Espalhai-os conforme a necessidade.</p>
                        <p><strong>Específicos de Vento (Nível 11):</strong> "No Ar Rarefeito" é obrigatório. "Resistência Fútil" (Big Band) deve sustentar vosso duo de vento para repelir invasores.</p>
                    </div>

                    <hr>

                    <!-- O Concílio das Guildas -->
                    <h2>V. O Concílio das Guildas</h2>
                    <p>As Guildas são fontes valiosas de recursos, abarcando mais jogadores em suas glórias do que a própria Fenda. Contudo, elas exigem que vossa base de Fenda esteja sólida. O investimento na base é único; os Bosses da Guilda demandam especificidades que só devem ser buscadas após a estabilidade da Renda Passiva.</p>
                    <p>Sede membros úteis, cumpri vossas missões e usai vosso arsenal atual. Não sacrifiqueis vossa base de Fenda para perseguir metas efêmeras de Bosses antes do tempo.</p>

                    <hr>

                    <!-- Mapa da Cidadela -->
                    <h2>VI. O Mapa da Cidadela (Exemplo de Base)</h2>
                    <p>Para ilustrar estas leis, apresentamos a visualização sagrada de uma base construída sob a égide da eficiência e da renda passiva:</p>
                    
                    <div class="image-frame">
                        <img src="img/testes/base-renda-passiva.jpeg" alt="[Mapa da Base Recomendada]" class="base-image" onerror="this.src='https://via.placeholder.com/800x450?text=Imagem+da+Base+Nao+Encontrada'">
                        <p style="text-align: center; font-size: 0.875rem; font-style: italic; margin-top: 1rem;">Referência visual: A disposição tática dos guardiões e catalisadores.</p>
                    </div>

                    <hr>

                    <!-- Conclusão -->
                    <h2>VII. Conclusão</h2>
                    <p>Que este manifesto seja o guia para aqueles que buscam a recompensa sem a exaustão. Que a Renda Passiva flua. Jogue com inteligência, não com "grind".</p>
                    
                    <p style="text-align: center; font-size: 0.875rem; font-style: italic; margin-top: 2rem;">- Proclamado pelos Sábios da Eficiência -</p>

                </section>

                <footer class="footer-text">
                    <p>Versão Atualizada - Dezembro de 2025</p>
                </footer>
            </main>
        </div>
    `;
}

export function init() {
    // Scroll to top when page loads to ensure they see the header
    window.scrollTo(0, 0);
}

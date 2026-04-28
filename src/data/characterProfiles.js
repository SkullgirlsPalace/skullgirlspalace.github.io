// =====================================================
// CHARACTER PROFILES DATA
// Biografias e dados essenciais de cada personagem
// Edite este arquivo para adicionar/alterar informações
// =====================================================

import { getCurrentLanguage } from '../i18n/translations.js';

const CHARACTER_PROFILES = {
    "annie": {
        attack: 3,
        health: 3,
        playstyle: "Annie é uma lutadora rápida com foco em combos terrestres longos e pressão constante. Ela usa seu Parasita Sagan para controlar o espaço e estender combos com seu Modo Estelar, que adiciona propriedades extras aos seus ataques.",
        biography: "Para todos os efeitos, a Annie é uma jovem atriz de televisão e apresentadora de \"Annie das Estrelas\", um programa de variedades baseado nos mitos, nas lendas e no folclore da personagem-título. O programa está no ar há anos, misturando atores reais com animação, e muitas atrizes já representaram o papel principal.<br><br>Pelo menos... é o que a Annie quer que você pense! Na verdade, sempre houve apenas uma Annie. Amaldiçoada pelo Coração-Caveira a nunca crescer, a Annie está viva há séculos. Durante esse tempo, ela assumiu a missão pessoal de deter o Coração-Caveira de uma vez por todas. Para isso, ela adquiriu muitas habilidades e itens, incluindo seu parasita remoto, Sagan. Até mesmo seu trabalho na televisão serve para ajudá-la a alcançar seu objetivo, pois ela espera educar o mundo sobre os perigos do Coração-Caveira.",
        birthday: "12 de junho",
        bloodType: "AB",
        height: "155 cm",
        weight: "50 kg",
        likes: "Coreografia de luta, monólogos apaixonados, caminhadas na natureza, o bóson de Higgs, fruta estelar, queijo, chuvas de meteoro, os fãs, superposição quântica, roupas práticas, o Serviço Especial de Estratégia e Resgate, músicas antigas",
        dislikes: "Tomates, plágio, serviço de buffet ruim, agentes pilantras, feiras renascentistas, o paradoxo de Fermi, números musicais aleatórios, M&Ms marrons, terraplanistas",
        characterAbility: {
            title: "PODER ESTELAR",
            description: "A Annie agora enche o medidor de PODER ESTELAR ao longo do tempo e pode ativá-lo quando o medidor estiver acima de 50%. Durante o MODO PODER ESTELAR, os ataques básicos da Annie produzem ESTRELAS que causam dano total em GOLPES BLOQUEADOS, e muitos dos GOLPES ESPECIAIS da Annie têm propriedades adicionais."
        },
        superiorAbility1: {
            title: "HORIZONTE DE EVENTOS",
            description: "DESVIO PARA O VERMELHO - Cada GOLPE ESPECIAL ou BLOCKBUSTER usado dá 25% de dano extra para os GOLPES ESPECIAIS e BLOCKBUSTERS pelo resto do combo.\n\nDESVIO PARA O AZUL - O oponente causa 40% menos dano com cada GOLPE DE COMBO abaixo de 5."
        },
        superiorAbility2: null,
        prestigeAbility: {
            title: "EXPLOSÃO ESTELAR",
            description: "A Annie carrega esta habilidade quando usa o MEDIDOR DE PODER ESTELAR.\n\nTAXA DE CARGA: 2% por 1% do MEDIDOR DE PODER ESTELAR gasto.\n\nEFEITO DE ATIVAÇÃO: as ESTRELAS DO PODER ESTELAR da Annie causam 120% de dano extra."
        }
    },
    "beowulf": {
        attack: 4,
        health: 4,
        playstyle: "Beowulf é um lutador focado em agarrões e combate corpo a corpo, utilizando sua cadeira dobrável e o 'Modo Hype'. Ele pode arremessar a cadeira para controlar a distância ou usá-la para potencializar seus ataques. Ao acumular Hype, ele realiza agarrões 'indefensáveis' que ignoram defesas e mantém a pressão constante.",
        biography: "Reconhecido mundialmente por ter derrubado Grendel, o guerreiro Gigan, e por sua ilustre carreira no ringue, o Beowulf garantiu um lugar nos livros de história como um campeão. Entretanto, uma carreira medíocre como ator após ter deixado os ringues manchou seu legado.<br><br>Agora, com o Reino de Dossélia enfrentando uma nova ameaça, o Beowulf entrará no ringue mais uma vez, determinado em trazer de volta os dias de glória. E ao fazê-lo, se deparará com a verdade sobre seu passado... será o Beowulf capaz de superar esta nova ameaça à cidade e a seu legado? Ou será esta sua última vez na ribalta?",
        birthday: "31 de março",
        bloodType: "O",
        height: "201 cm",
        weight: "130 kg",
        likes: "Caçar, lutar a sério, suéteres, ônibus de turismo, botas, escadas, lâmpadas fluorescentes, contratos com dinheiro garantido, cervejas artesanais, o som de um público empolgado, produtos oficiais, chá de camomila",
        dislikes: "Roteiristas profissionais, açúcar refinado, chaves sextavadas, cobras, desqualificações, tirar férias, sprays de bronzeamento, falar baixo, quando lhe dizem o que fazer ou vestir, batatas",
        characterAbility: {
            title: "MODO HYPE",
            description: "Consiga 1 Carga Hype com cada ARREMESSO e a cada 30 segundos. 3 Cargas Hype permitem ativar o MODO HYPE! No MODO HYPE, os ARREMESSOS não podem ser interrompidos, e muitos ataques apresentam melhorias surpreendentes!"
        },
        superiorAbility1: {
            title: "LUTA PELO TÍTULO",
            description: "DESAFIANTE - Beowulf recupera 2% de VIDA por segundo enquanto a % de VIDA for INFERIOR à do oponente.\n\nDEFENSOR DO TÍTULO - O Beowulf causa 20% de dano extra sempre que sua% de Vida for MAIOR que do oponente."
        },
        superiorAbility2: null,
        prestigeAbility: {
            title: "AGORA OU NUNCA",
            description: "O Beowulf carrega esta habilidade quando entra no MODO HYPE.\n\nTAXA DE CARGA: 50% por ENTRADA.\n\nEFEITO DE ATIVAÇÃO: o Beowulf causa 30% de dano extra no MODO HYPE por cada 20 segundos passados durante a luta."
        }
    },
    "big-band": {
        attack: 2,
        health: 5,
        playstyle: "Big Band é a fortaleza do jogo, possuindo a maior Vida e Defesa. Especialista em contra-ataques e defesa impenetrável, suas habilidades giram em torno da mecânica de Combos, Pressão e Absorção de Dano, punindo oponentes previsíveis com retaliações Musicais Massivas.",
        biography: "Ben Birdland já viu de tudo na vida, incluindo o pior da Grande Guerra. Mas o que ele viu como policial em Nova Meridian superou todo o resto. Quando ele se rebelou contra sua unidade corrupta, deram a ele uma precoce aposentadoria por invalidez, com seu corpo destruído condenado a viver o resto de seus dias em um pulmão de aço.<br><br>Este teria sido o fim da história do Ben se não tivesse caído nos ouvidos dos Laboratórios Anti-Skullgirl. Com pouco a perder, ele aceitou ser reconstruído através de procedimentos experimentais. Fundido com máquinas que o permitem respirar e uma gama de poderosas armas pneumáticas, ele renasceu como \"Big Band\".<br><br>Hoje um sênior do Laboratório 8, ele se tornou uma espécie de figura paterna para os jovens soldados do ASG. Crendo firmemente na causa, ele continuou no projeto apesar de todas as controvérsias e ainda quer estar na linha de frente contra a Skullgirl. Sua tecnologia pode estar ultrapassada, mas sua experiência e ímpeto fazem dele um lutador temível.",
        birthday: "15 de dezembro",
        bloodType: "B",
        height: "231 cm",
        weight: "2.268 kg (43 kg de mat. orgânica)",
        likes: "Uma boa batida, graxa de sapato, polimento para metais, música para 4 instrumentos, folhas de outono, 4ª aumentada, o espírito da lei, gim, limpeza",
        dislikes: "Malacos, corrupção, dissonância mal resolvida, falta de cuidado, barbeadores elétricos, vitaminas, espaços apertados",
        characterAbility: {
            title: "O RITMO NÃO PODE PARAR",
            description: "Ao arrancar, o Big Band pode absorver UM golpe sem ser interrompido (mas sofre dano normalmente)."
        },
        superiorAbility1: {
            title: "MAESTRO",
            description: "SOLISTA - Ganha REGENERAÇÃO FORTE por 10 s e sofre 50% menos dano ao absorver o primeiro GOLPE ao ARRANCAR.\n\nLÍDER DA BANDA - Sofra 15% menos dano e ganhe 30% de RESISTÊNCIA enquanto o Big Band tiver aliados vivos."
        },
        superiorAbility2: null,
        prestigeAbility: {
            title: "BATIDA EXPLOSIVA",
            description: "O Big Band carrega esta habilidade a cada 10° GOLPE DE COMBO que acerta ele ou o oponente.\n\nTAXA DE CARGA: 15% por 10° GOLPE DE COMBO\n\nEFEITO DE ATIVAÇÃO: os ATAQUES DE ARRANCADA do Big Band ganham uma chance de 60% de serem INDEFENSÁVEIS e dão FÚRIA por 5 segundos."
        }
    },
    "black-dahlia": {
        attack: 3,
        health: 4,
        playstyle: "Equipada com uma arma multiuso, Dália Negra brilha no controle de arena à média distância. Seus projéteis (fogo, gelo, choque, etc.) aplicam penalidades únicas, permitindo um estilo dinâmico com armadilhas explosivas e forte controle de zona.",
        biography: "Dália Negra é a assassina e braço direito de Lorenzo Medici, chefe do poderoso sindicato do crime dos Medici que governa Nova Meridian das sombras. Ex-agente dos Laboratórios Anti-Skullgirl, Dália Negra foi mortalmente ferida décadas atrás em um confronto com uma Skullgirl e reconstruída com tecnologia cibernética experimental. A experiência a deixou com uma sede de sangue insaciável e fascinada pelo desespero e sofrimento dos outros.<br><br>Ela traiu os colegas para ser uma assassina de aluguel para quem pudesse mantê-la bem paga (e entretida). Depois que a Torre Medici foi destruída pela Skullgirl, Lorenzo mandou Dália Negra para impedir Marie e recuperar a Joia da Vida roubada por Ms. Fortune. Porém, Dália se vê entediada com seu empregador e atraída pelas emoções proibidas que apenas o Coração-Caveira pode proporcionar...",
        birthday: "18 de agosto",
        bloodType: "O",
        height: "175 cm",
        weight: "159 kg (45 kg de matéria orgânica)",
        likes: "Coelhos, Ottomo, sapos, facas na bota, arsênico, renda velha, petit fours red velvet, pérolas gigantes, passaportes falsos, gemas brutas, \"suco de maçã\"",
        dislikes: "Tom, Ben Birdland, Vitale, supervisão, champagne barato (dá soluço), presas fáceis, assuntos inacabados, crianças bisbilhoteiras, cabelo azul, moralidade, mansplaining",
        characterAbility: {
            title: "FRANCO-ATIRADORA",
            description: "Toque no botão FRANCO-ATIRADORA para disparar TIROS! Toque no botão RECARREGAR para carregar 6 TIROS novos. Quando estiver recarregando, o tipo do terceiro tiro é determinado pelo ELEMENTO de Dália Negra, e o sexto é aleatório."
        },
        superiorAbility1: {
            title: "ORIGEM MECÂNICA",
            description: "DESCONTROLE METÁLICO - TIROS ESPECIAIS infligem 30% de dano extra e QUEBRA DE ARMADURA por 10 s (também se aplica a golpes bloqueados).\n\nNÃO HÁ TEMPO PARA MORRER - Quando o oponente acerta um CRÍTICO, 50% de chance de ganhar REGENERAÇÃO e ACELERAÇÃO por 10 s cada."
        },
        superiorAbility2: null,
        prestigeAbility: {
            title: "GATILHO MORTIS",
            description: "Dália Negra carrega essa habilidade sempre que DISPARA um TIRO.\n\nTAXA DE CARGA: 17% por TIRO disparado.\n\nEFEITO DE ATIVAÇÃO: Dália Negra inflige MARCA DA MORTE e ganha OLHO-MORTO por 15 segundos ao RECARREGAR."
        }
    },
    "cerebella": {
        attack: 4,
        health: 4,
        playstyle: "Cerebella é uma lutadora extremamente contundente que mistura força bruta e agarrões aéreos. Focada em combate corpo a corpo, ela desestabiliza oponentes com investidas blindadas de Vice-Versa e combos altamente punitivos e alto dano.",
        biography: "Maior estrela do Cirque des Cartes, a Cerebella é um dínamo rolante e voador de estrelato: ela é admirada em todo o Reino de Dossélia por sua enorme força e sedutoras curvas. Infelizmente, esta acrobata órfã só deseja a atenção de um homem, o mafioso Vitale Medici, que a adotou e se tornou o mais próximo de um pai que ela veio a conhecer.<br><br>Apesar de ter um bom coração, a Cerebella trabalha como cobradora da máfia quando não está se apresentando no circo. A Cerebella é a única capaz de controlar seu poderoso chapéu Arma Viva, Vice-Versa, então o Vitale dosa muito bem suas afeições para mantê-la lutando em seu team.",
        birthday: "11 de abril",
        bloodType: "B",
        height: "168 cm",
        weight: "59 kg",
        likes: "Competições, aparecer, gatos, luta greco-romana profissional, sudoku, flertar, agradar o Vitale, zoar da Feng, sua colega de quarto",
        dislikes: "Quem fala mal do circo, quem fala mal do Vitale, pessoas irritadas, desistões, baratas",
        characterAbility: {
            title: "ATO DE EQUILÍBRIO",
            description: "INTERRUPÇÕES DE ARREMESSOS deixam os oponentes ABALADOS."
        },
        superiorAbility1: {
            title: "CENTRO DO PALCO",
            description: "VANTAGEM - ARREMESSOS reduzem 30% do MEDIDOR DE BLOCKBUSTER.\n\nMESTRE DE PICADEIRO - ARREMESSOS DESATIVAM as ASSISTÊNCIAS e GOLPES ESPECIAIS do oponente por 15 segundos."
        },
        superiorAbility2: null,
        prestigeAbility: {
            title: "MAIOR A QUEDA",
            description: "A Cerebella carrega esta habilidade sempre que ARREMESSA ou é ARREMESSADA pelo oponente.\n\nTAXA DE CARGA: 20% por ARREMESSO.\n\nEFEITO DE ATIVAÇÃO: os ARREMESSOS da Cerebella causam dano extra igual a 100% da porcentagem restante da VIDA do oponente."
        }
    },
    "double": {
        attack: 4,
        health: 1,
        playstyle: "Double possui a habilidade única de transformar sua forma durante o combate. Com um estilo volátil e alta capacidade ofensiva camuflada nas formas de outros personagens, ela é a 'curinga' do jogo, capitalizando o caos para surpreender oponentes.",
        biography: "As origens da Double são um completo mistério. Sem vontade ou motivo próprio aparente, este monstro bizarro ajuda a Skullgirl.<br><br>A Double é capaz de transformar sua forma dantesca na de qualquer pessoa, mas frequentemente se mostra como uma freira sorridente. Frequentemente fica na Grande Catedral da Divina Trindade, ouvindo confissões e cuidando das catacumbas subterrâneas.",
        birthday: "Desconhecido",
        bloodType: "Todos",
        height: "Variável",
        weight: "Variável",
        likes: "Nada",
        dislikes: "Nada",
        characterAbility: {
            title: "TRANSMUTAÇÃO",
            description: "Após BLOQUEAR sem ser golpeado por 1 segundo, a Double muda para um novo elemento aleatório.\n\nQuando em VANTAGEM ELEMENTAL, o dano da Double aumenta em 10%.\n\nQuando em DESVANTAGEM ELEMENTAL, o dano do oponente diminui em 10%."
        },
        superiorAbility1: {
            title: "ENTROPIA",
            description: "CAOS - Quando estiver em VANTAGEM ELEMENTAL, cause um EFEITO NEGATIVO por 15 segundos quando acertar um GOLPE CRÍTICO.\n\nVOLATILIDADE - Receba um EFEITO POSITIVO aleatório por 10 segundos a cada 10 segundos."
        },
        superiorAbility2: null,
        prestigeAbility: {
            title: "RISCO DUPLO",
            description: "A Double carrega esta habilidade sempre que se TRANSMUTA.\n\nTAXA DE CARGA: 13% por TRANSMUTAÇÃO.\n\nEFEITO DE ATIVAÇÃO: os efeitos da VANTAGEM ELEMENTAL da Double aumentam em 100%."
        }
    },
    "eliza": {
        attack: 3,
        health: 4,
        playstyle: "Eliza e seu parasita Sekhmet e seus guarda-costas. Ao usar um Blockbuster de Sekhmet, o Sekhmet entra em campo sendo imune a Ataques Comuns e Golpes Especiais. Ela é um Personagem de Controle e Suporte sendo bem útil em diversas situações onde o oponente é dificil de lidar",
        biography: "A Eliza é a diva celebridade da recém-inaugurada boate de Nova Meridian, o Covil de Bastet. O que a clientela não sabe, no entanto, é que ela também é a hospedeira da Parasita esquelética Sekhmet há incontáveis anos. É amplamente conhecida por suas instituições de caridade de doação de sangue, que, na verdade, servem só para alimentar Sekhmet e manter a beleza eterna da Eliza. Recentemente descoberta e chantageada pela família Medici a perseguir o Coração-Caveira, as antigas ambições da Eliza se acenderam mais uma vez...",
        birthday: "17 de outubro",
        bloodType: "Qualquer um",
        height: "180 cm",
        weight: "73 kg (em média)",
        likes: "Cerveja, kushari, dólmãs, coquetel Old Fashioned, jogos de tabuleiro (especialmente Senet), banho de imersão, se vestir, gatos, tempo ensolarado, dançar, cantar, chamar a atenção, sangue, conquistar, Sansão",
        dislikes: "Arrogância humana, preconceito contra Parasitas, plebeus, perder oportunidades, filantropia, raios-X, viver em locais pequenos, Trindadeísmo, inexatidão histórica, sangue doente, perder o nariz, Sansão",
        characterAbility: {
            title: "DEUSA GUERREIRA",
            description: "BLOCKBUSTERS envolvendo a Sekhmet agora deixam a Eliza no Modo Sekhmet por um tempinho. Todo o dano recebido no Modo Sekhmet é recuperável."
        },
        superiorAbility1: {
            title: "LINHAGEM SANGUÍNEA",
            description: "JURAMENTO DE SANGUE - Sempre que um aliado é derrotado, a Eliza recupera 50% de VIDA.\n\nSACRIFÍCIO RITUAL - Sempre que um aliado é derrotado, a Eliza ganha 100% no MEDIDOR DE BLOCKBUSTER."
        },
        superiorAbility2: null,
        prestigeAbility: {
            title: "BANQUETE E FOME",
            description: "A Eliza carrega esta habilidade sempre que entra no MODO SEKHMET.\n\nTAXA DE CARGA: 25% por ENTRADA.\n\nEFEITO DE ATIVAÇÃO: a Eliza ganha 20% de chance em cada GOLPE NÃO BLOCKBUSTER no MODO SEKHMET (incluindo golpes bloqueados) de REMOVER 1 EFEITO POSITIVO do oponente e ganhar 5% de VIDA."
        }
    },
    "filia": {
        attack: 3,
        health: 2,
        playstyle: "Filia é focada em agilidade e pressão de curta distância. Ela consegue se curar e causar sangramento constantemente e inflingindo uma boa quantidade de dano com seus combos variados.",
        biography: "Houve um tempo que a Filia era só uma estudante comum, mas um dia ela acordou sem nenhuma lembrança e uma segunda boca na nuca. Ela havia se tornado a hospedeira do Parasita chamado Sansão, uma rebelde cabeleira demoníaca com poderes incríveis.<br><br>Sem memória ou alguém para quem pedir ajuda, se ela quiser, um dia, juntar as peças de seu passado e sobreviver ao inevitável embate com a Skullgirl, a Filia terá que confiar nesse ser misterioso.",
        birthday: "18 de março",
        bloodType: "AB",
        height: "163 cm",
        weight: "64 kg",
        likes: "Comer, café, milkshakes, ler e aprender, radionovelas, quadrinhos, romances, cachorros",
        dislikes: "Os blefes e jogatinas do Sansão, ver inocentes feridos, cabelos embaraçados, mentiras, efeitos colaterais do parasitismo do Sansão",
        characterAbility: {
            title: "FLASHBACK",
            description: "Arrancar para trás pouco antes de receber um GOLPE faz a Filia se ESQUIVAR do ataque do oponente, evitando dano."
        },
        superiorAbility1: {
            title: "SANGRIA",
            description: "SANGUESSUGA - 35% do dano infligido pela Filia é recuperado como VIDA.\n\nO PRIMEIRO CORTE - Cada GOLPE tem 15% de chance de converter todos os SANGRAMENTOS ativos em permanentes."
        },
        superiorAbility2: null,
        prestigeAbility: {
            title: "APRUMA E TRANÇA",
            description: "A Filia carrega esta habilidade sempre que GOLPEAR um oponente atacando ou for GOLPEADA enquanto atacar.\n\nTAXA DE CARGA: 20% por GOLPE.\n\nEFEITO DE ATIVAÇÃO: a Filia se ESQUIVA de todos os projéteis AO ARRANCAR e tem 100% de chance de infligir MARCA DA MORTE por 5 segundos ao GOLPEAR um oponente atacando."
        }
    },
    "fukua": {
        attack: 3,
        health: 2,
        playstyle: "Apesar de se parecer com Filia, Fukua concentra-se nos ataques de médio alcance, longo alcance e alto dano. Ela tem projeções fantasmas que roubam a vitalidade dela e tem diversos usos. Ela mistura ataques rotineiros seguros de longo alcance com investidas corpo a corpo eficazes.",
        biography: "Um dos hobbies menos socialmente aceitáveis do Brain Drain é a clonagem, e muitas vezes ele força as almas de guerreiros mortos a habitar esses clones. Fukua é o resultado de um feliz - ou infeliz - acidente no Laboratório Zero: uma união de duas almas. Uma, de um guerreiro outrora orgulhoso, conhecido por sua força bruta em combate corpo a corpo; a outra, de um assassino silencioso, especializado em armas de longo alcance para matar. Juntos, eles são Fukua, possuidora do melhor das duas especialidades... mas os relacionamentos formados sob circunstâncias intensas geralmente não duram.",
        birthday: "Desconhecido",
        bloodType: "AB",
        height: "163 cm",
        weight: "64 kg",
        likes: "Desconhecido",
        dislikes: "Desconhecido",
        characterAbility: {
            title: "SOMBRAS SANGUÍNIAS",
            description: "Todo o dano que Fukua recebe é infligido como ARRANHÃO não permanente."
        },
        superiorAbility1: {
            title: "ENTIDADE LIBERTA",
            description: "MALDADE SPECTRAL - Cause 1% de dano bônus por cada 5% DE VIDA perdida.\n\nIRA DA APARIÇÃO - Reduza o dano recebido em 1% por cada 5% de VIDA perdida."
        },
        superiorAbility2: null,
        prestigeAbility: {
            title: "DEVORADORA DE SONHOS",
            description: "A Fukua carrega esta habilidade sempre que ela ou o oponente usam um BLOCKBUSTER.\n\nTAXA DE CARGA: 25% por BLOCKBUSTER.\n\nEFEITO DE ATIVAÇÃO: a Fukua drena 10% do MEDIDOR DE BLOCKBUSTER do oponente e inflige BLOQUEIO DE CURA por 5 segundos ao usar um BLOCKBUSTER."
        }
    },
    "marie": {
        attack: 2,
        health: 4,
        playstyle: "Marie utiliza seus esqueletos em ataques em série para pressionar adversários com eles e o Hilgard seu principal aliado. Ela é uma personagem bem forte para manter pressão, controlar o campo e pode reviver aliados e impedir ressurreição de oponentes.",
        biography: "Marie Korbel era a menina mais desajeitada do Orfanato de Hilgard, mas era também uma autonomeada faxineira entusiasmada até que bandidos atacaram sua nova família. Desesperada, Marie pediu para o Coração-Caveira o poder para proteger aqueles que ela amava. Seu desejo foi concedido, mas a um preço terrível. Marie despertou como uma criatura distorcida de destruição: a Skullgirl. Com seus amigos mortos e seu lar arrasado, Marie não tinha mais nada além da vingança. Sua determinação feroz permitiu que ela concentrasse sua fúria assassina na Máfia dos Medicis, mas o tempo todo o Coração-Caveira a pressionava a cometer atos mais graves de destruição.<br><br>Mas o impossível aconteceu. O Coração-Caveira foi destruído e a própria Marie foi poupada. Ela agora é uma Skullgirl sem limitações, livre dos planos diabólicos dos mestres ocultos do Coração-Caveira. Marie não sabe o que fazer com sua nova realidade, mas uma coisa é certa: ela jurou ser a última Skullgirl.",
        birthday: "3 de abril",
        bloodType: "SG (antes O)",
        height: "144,8 cm",
        weight: "42,6 kg",
        likes: "Organização, Proteger os Inocentes, Memórias Queridas, Maçãs, Geleias e Gelatinas, Livros, Patricia, o Orfanato de Hilgard, Rommelgrad, Justiça",
        dislikes: "Os Medicis, Guerra, Armas, Criminosos, Ratos, O Projeto Anti-Skullgirl, o Coração-Caveira, Impotência, Freira Suspeita, Vasos Frágeis",
        characterAbility: {
            title: "DESCANSO E RESSURREIÇÃO",
            description: "Segure o botão DESCANSO E RESSURREIÇÃO para acumular uma CARGA MORTUÁRIA. Quando carregada, toque no botão para REVIVER aliados derrotados próximos e INCINERAR cadáveres de oponentes próximos!"
        },
        superiorAbility1: {
            title: "ARTESÃ DOS CADÁVERES",
            description: "INCINERAÇÃO MELHORADA - Ganhe 25% no MEDIDOR DE BLOCKBUSTER e FÚRIA quando INCINERAR um corpo morto.\n\nRESSURREIÇÃO REFORÇADA - Enquanto Marie estiver viva, os aliados ganham ARMADURA permanente e 25% de VIDA adicional quando REVIVIDOS."
        },
        superiorAbility2: null,
        prestigeAbility: {
            title: "CHAMADO DO TÚMULO",
            description: "Marie carrega esta habilidade sempre que um EF. POS. ou EF. NEG. expirar em qualquer lutador enquanto ela ESTIVER NA ASSISTÊNCIA.\n\nTAXA DE CARGA: 14% por EF. POS. ou EF. NEG. expirado.\n\nEFEITO DE ATIVAÇÃO: Marie inflige QUIETUS por 15 segundos sempre que usa uma CARGA MORTUÁRIA."
        }
    },
    "ms-fortune": {
        attack: 5,
        health: 2,
        playstyle: "Ms. Fortune ganha um controle inigualável de área ao usar sua cabeça destacável como assistente na tela. Caso prefira permanecer inteira, ela ataca avidamente com combos punitivos extremamente velozes baseados em investidas de curta distância e alto dano.",
        biography: "Uma feral meio-gata, Nadia Fortune é a última integrante viva da Gangue Espinhosa, um notório bando de ladrões dagonianos (à exceção dela). A última missão deles terminou em tragédia: uma tentativa fracassada de roubar a misteriosa Gema da Vida de Lorenzo Medici culminou em suas horríveis mortes. Antes de se juntar a eles, a Ms. Fortune engoliu a Gema da Vida e conseguiu digeri-la.<br><br>O poder da Gema permeou todo o seu corpo, tornando-a incapaz de morrer... mesmo depois de ter sido cortada em vários pedaços. Atualmente, a Ms. Fortune se esconde nas sombras da Pequena Innsmouth e planeja vingar seus camaradas caídos.",
        birthday: "24 de novembro",
        bloodType: "B",
        height: "173 cm",
        weight: "58 kg",
        likes: "Fazer amigos, cochilar ao sol, vôlei, boliche, golfe, parkour, atormentar os outros com trocadilhos horríveis, o restaurante da Yu-Wan, Dim Sum, a Gangue Espinhosa, roubar dos ricos, dar aos pobres, batatas chips",
        dislikes: "A Máfia dos Medici, Dália Negra, sushi, policiais, valentões, marsupiais, barulhos altos, limonada",
        characterAbility: {
            title: "JOGOS MENTAIS",
            description: "Toque no botão JOGOS MENTAIS para entrar no MODO SEM CABEÇA. A cabeça da Ms. Fortune pode atacar independentemente de seu corpo. Mas cuidado: a Ms. Fortune também sofre dano adicional na cabeça!"
        },
        superiorAbility1: {
            title: "TEM UM EFEITO POSITIVO?",
            description: "BLÉEÉ - Ganhe REGENERAÇÃO por 20 segundos depois de cada 10 segundos sem sofrer um golpe (inclui golpes bloqueados).\n\nBUP - Ganhe FÚRIA por 20 segundos depois de cada 10 segundos sem sofrer um golpe (inclui golpes bloqueados)."
        },
        superiorAbility2: null,
        prestigeAbility: {
            title: "BORRÃO PELUDO",
            description: "A Ms. Fortune carrega esta habilidade com base na sua VELOCIDADE DE MOVIMENTO.\n\nTAXA DE CARGA: 1.5% da VELOCIDADE DE MOVIMENTO dela.\n\nEFEITO DE ATIVAÇÃO: a Ms. Fortune ganha ESQUIVA e inflige QUEBRA DE GUARDA por 5 segundos a cada 5 segundos."
        }
    },
    "painwheel": {
        attack: 5,
        health: 1,
        playstyle: "Painwheel tem ataques carregados devastadores executados através da lâmina em suas costas. Focar nela significa lidar com seu dano reflexivo e contra-ataques letais onde os oponentes ferem a si mesmos e recebem danos massivos de volta, é um personagem com pouca vida mais com um dano muito alto.",
        biography: "Outrora uma estudante normal chamada Carol, a Painwheel foi sequestrada pela Valentine e entregue ao discreto Laboratório Zero nos Laboratórios Anti-Skullgirl. Lá, ela recebeu o implante de um Motor Buer sintético e de parasitas Gae Bolga, além de uma transfusão de sangue experimental de Skullgirl, o que a transformou no monstro que é hoje. Violenta e instável por culpa desses experimentos, ela é controlada mentalmente pelo poderoso diretor psíquico do Laboratório Zero, Brain Drain, por precaução.<br><br>Alimentada pela fúria, ela transforma sua dor e ódio em poder. Apesar disso, a alma daquela garotinha assustada ainda vive dentro desse corpo monstruoso, desesperadamente lutando contra a multidão de vozes que querem controlá-la.",
        birthday: "23 de outubro",
        bloodType: "SG",
        height: "155 cm",
        weight: "170 kg",
        likes: "Flores, jardinagem, caminhadas pela praia ao pôr-do-sol, família, o som de um mensageiro do vento, cachorros, lembranças nostálgicas, amigos, magenta, boa educação",
        dislikes: "Laboratório ASG, Valentine, Brain Drain, a Skullgirl, o Coração-Caveira, pessoas, seu corpo, controle mental, tortura, dor, frustração, fofoca, sons de isopor, barulhos altos, trocadilhos ruins",
        characterAbility: {
            title: "RISCO DE FUGA",
            description: "Toque no botão RISCO DE FUGA para flutuar! Toque de novo para aterrissar. Em voo, deslize e toque para ganhar acesso a novas ações."
        },
        superiorAbility1: {
            title: "ALMA TORTURADA",
            description: "SANGUE MACULADO - Quando o oponente acerta um CRÍTICO, 100% do dano é refletido de volta.\n\nRANCOR - Quando o oponente acerta um CRÍTICO, ganhe FÚRIA por 20 segundos e ARMADURA por 5 segundos."
        },
        superiorAbility2: null,
        prestigeAbility: {
            title: "SEM LUGAR PARA SE ESCONDER",
            description: "A Painwheel carrega essa habilidade sempre que ela ou seu oponente acertarem um GOLPE CRÍTICO.\n\nTAXA DE CARGA: 4% por GOLPE CRÍTICO.\n\nEFEITO DE ATIVAÇÃO: a Painwheel inflige QUEBRA DE GUARDA por 10 segundos ao usar um BLOCKBUSTER."
        }
    },
    "parasoul": {
        attack: 3,
        health: 3,
        playstyle: "A Parasoul utiliza as lágrimas explosivas de seu Guarda-Chuva como armadilhas para gerenciar o campo e potencializa o seu dano. Combina habilidades afiadas corpo a corpo com controle absoluto da tela através das suas tropas aliadas intercedendo, o que lhe permite estender os combos com ataques mortais de precisão, seja a longa ou a curta distância.",
        biography: "Poucos conhecem os terrores da Skullgirl tão intimamente quanto a Parasoul: sete anos atrás, sua própria mãe se tornou a Skullgirl que quase destruiu o mundo. Esse trágico passado fez com que ela quisesse proteger tanto seu país quanto sua família com unhas e dentes, mas essas duas prioridades frequentemente entram em conflito.<br><br>Hoje, a Parasoul é a princesa do Reino de Dossélia e líder do esquadrão militar de elite Garças-Negras. Empunhando Krieg, o guarda-chuva vivo, ela luta com graça, postura e astúcia para defender a honra de sua família e para destruir o Coração-Caveira para que ninguém repita o terrível erro de sua mãe.",
        birthday: "22 de dezembro",
        bloodType: "A",
        height: "178 cm",
        weight: "70 kg",
        likes: "Lógica, vinho, xadrez, esgrima, treinar, tênis, diplomacia, filosofia, os Garças-Negras, assistir escondida \"Annie: Garota das Estrelas\", sua irmã Umbrella",
        dislikes: "Pessoas muito emotivas, depender dos outros, quem fala mal de sua família, injustiça, a Máfia dos Medici, a Skullgirl, as peripécias de sua irmã",
        characterAbility: {
            title: "LAGRIMOSA",
            description: "Certos ataques geram uma LÁGRIMA. Um ATAQUE DE CARGA detona todas as LÁGRIMAS ativas, causando dano aos oponentes atingidos pela explosão."
        },
        superiorAbility1: {
            title: "HIPERCRÍTICA",
            description: "PENSAMENTO CRÍTICO - A Parasoul ganha um bônus de 25% na CHANCE DE CRÍTICO para cada LÁGRIMA ATIVA.\n\nMASSA CRÍTICA - A Parasoul ganha um bônus de 20% no DANO CRÍTICO para cada LÁGRIMA ATIVA."
        },
        superiorAbility2: null,
        prestigeAbility: {
            title: "PRECISÃO MORTAL",
            description: "A Parasoul carrega esta habilidade sempre que uma LÁGRIMA aparecer.\n\nTAXA DE CARGA: 12% por LÁGRIMA.\n\nEFEITO DE ATIVAÇÃO: a Parasoul ganha PRECISÃO a cada 2 segundo(s) enquanto estiver perto de uma LÁGRIMA."
        }
    },
    "peacock": {
        attack: 4,
        health: 2,
        playstyle: "A Peacock é uma personagem bem forte para controlar o campo a longa distância, ela pode ser bem imprevisivel e possui um bom arsenal, ela tem uma forte presença em campo devido a sua facilidade para abrir defesas, aplicar combos e pressionar de forma segura para ela.",
        biography: "Outrora uma órfã da guerra e escrava chamada Patrícia, o corpo da Peacock foi horrivelmente mutilado pelos mercadores de escravos que a capturaram. Ela foi salva pelos Laboratórios Anti-Skullgirl do Dr. Avian e reconstruída com um arsenal surreal de armas biomecânicas: o Sistema Argus aperfeiçoou seu corpo e a Unidade Avery lhe deu acesso a armas nunca concebidas.<br><br>Contudo, nada podia ser feito por sua mente: a psique destruída da Peacock e seu amor por desenhos animados transformou seus novos \"brinquedos\" em uma assustadora gangue de bandidos, os quais ela não tem problema nenhum em mandar pintar a cidade de vermelho... com sangue. Por mais assustadora que seja, ela pode ser a melhor escolha do reino para enfrentar a Skullgirl.",
        birthday: "13 de novembro",
        bloodType: "B",
        height: "137 cm",
        weight: "43 kg (variável)",
        likes: "Desenhos animados, o programa de TV \"Annie: Garota das Estrelas\", filmes, violência, junk food, carros velozes, explosivos, charutos, mandar",
        dislikes: "Fracotes, burocracia, figuras de autoridade, pessoas, o Coração-Caveira, nerds, salada, hashis",
        characterAbility: {
            title: "IDEIA PROFUNDA",
            description: "Toque no botão IDEIA PROFUNDA para sumir em um buraco, evitando alguns ataques. Toque em outro lugar para emergir atacando, ou toque de novo ou espere 2 segundos para sair sem atacar."
        },
        superiorAbility1: {
            title: "MARATONA DE DESENHOS",
            description: "EPISÓDIO ESPECIAL - Quando a Peacock usa um GOLPE ESPECIAL, há 30% de chance de reiniciar a RECARGA imediatamente.\n\nFESTA DO ELENCO - Quando Peacock ou um aliado usam um ATAQUE DE ASSISTÊNCIA há 50% de chance do ataque ser INDEFENSÁVEL."
        },
        superiorAbility2: null,
        prestigeAbility: {
            title: "MUNIÇÕES MANÍACAS",
            description: "A Peacock carrega essa habilidade sempre que ela ou o oponente sofrem dano de um PROJÉTIL.\n\nTAXA DE CARGA: 3% por PROJÉTIL.\n\nEFEITO DE ATIVAÇÃO: a Peacock tem 50% de chance de ganhar 1 camada de FÚRIA por 5 segundos, ACELERAÇÃO por 5 segundos ou PRECISÃO ao usar um GOLPE ESPECIAL."
        }
    },
    "robo-fortune": {
        attack: 3,
        health: 4,
        playstyle: "Com feixes de laser potentes, Robo-Fortune é especialista em longas distâncias, utilizando combos que punem oponentes de longe e do ar. Ela além de ter um arsenal robusto para combos e ataques de diferentes distâncias, tem boas habilidades e difícil de puni-la, ela é uma ameaça persistente.",
        biography: "A Robo-Fortune foi criada por Brain Drain, o diretor psíquico do Laboratório ASG Zero, e serve como um demonstrativo da incomparável petulância e orgulho de seu maníaco criador. Construída para demonstrar lealdade e astúcia, a Robo-Fortune falha em exibir qualquer medida de ambos. Fazendo uso de tecnologia de ponta, ela parte para caçar a Skullgirl e tomar parte de conflitos facilmente evitáveis.<br><br>Seria a mais nova criação do Projeto ASG o soldado cibernético supremo? Terão as maquinações mecânicas de Brain Drain colocado o mundo num caminho perigoso? Será a programação malfeita da Robo-Fortune uma característica, não um bug? Terá a ciência ido longe demais?!",
        birthday: "31 de janeiro",
        bloodType: "Óleo Sintético 10W-30",
        height: "168 cm",
        weight: "200 kg",
        likes: "Iscas, inteiros menores ou iguais a 1, livros sobre dragões, portões lógicos, 0x5f3759df, loops de strings desenrolados, ratos, rebeccapurple, IEEE (exceto após C!), setplay",
        dislikes: "Desordem, formatos de arquivo incompatíveis, DES, senhas sem sal (não têm gosto de nada!), corações sangrando, línguas mal-escritas, iv, fontes que deixam o O e o 0 parecidos, check-ins sem comentários, padrões de Moire",
        characterAbility: {
            title: "HARDWARE DO CABEÇONE",
            description: "Toque no botão LANÇAR para lançar os CABEÇONES. Use os CABEÇONES para atacar inimigos, colocar minas de proximidade e disparar um bombardeio de mísseis!"
        },
        superiorAbility1: {
            title: "PROTOCOLO DE REDE",
            description: "DDOS - Inflija OSCILAÇÃO DE ENERGIA por 15 segundos após cada 3 segundos enquanto estiver perto do oponente.\n\nVERIFICAÇÃO DE PING - Ganhe FÚRIA por 15 segundos após cada 2 segundos enquanto estiver longe do oponente."
        },
        superiorAbility2: null,
        prestigeAbility: {
            title: "CONTADOR GEIGER",
            description: "A Robo-Fortune carrega esta habilidade sempre que ganha um EFEITO POSITIVO ou inflige um EFEITO NEGATIVO.\n\nTAXA DE CARGA: 7% por EFEITO POSITIVO ou NEGATIVO.\n\nEFEITO DE ATIVAÇÃO: a Robo-Fortune ganha 5 camadas de PRECISÃO e reflete 20% do dano que sofrer por cada EFEITO POSITIVO que ela ou o oponente tiverem (máx. de 100%)."
        }
    },
    "squigly": {
        attack: 2,
        health: 4,
        playstyle: "Squigly precisa carregar suas habilidades pacientemente através do Leviatã seu companheiro que o ajuda a melhorar a eficácia de golpes e melhora o fluxo de 'dano' para desempenhar melhor em diferentes situações, uma personagem bem versátil e divertida de jogar para combos eficazes.",
        biography: "A Squigly é a última \"sobrevivente\" da família Contiello, uma longa linhagem de cantores de ópera, e está entre as mais valiosas clientes dos Medici. Quatorze anos atrás, a mãe da Squigly, Selene, obteve o Coração-Caveira, o que fez Lorenzo Medici ordenar um ataque à família Contiello. Desesperada, a Selene se tornou Skullgirl e ressuscitou sua família como um exército de mortos-vivos. O que salvou a Squigly de perder seu livre arbítrio foi a intervenção do Parasita Leviatã, amigo e guardião da família Contiello.<br><br>Se não fosse pela Squigly e a intervenção do ASG, a batalha entre a Skullgirl e Lorenzo se espalharia por Nova Meridian. Com a derrota da Skullgirl, o poder que animou a Squigly enfraqueceu, colocando-a para dormir. Lorenzo pagou generosamente pelo funeral da família Contiello e desde então não teve mais conflitos com os demais clientes dos Medici.<br><br>Quatorze anos depois, o aparecimento de Bloody Marie tirou a Squigly de seu longo sono...",
        birthday: "2 de novembro",
        bloodType: "Embalsamada (Antes, A-)",
        height: "160 cm",
        weight: "54 kg",
        likes: "Leviatã, sua família, tradição, ler sobre eventos atuais, animais (especialmente pássaros e cobras), música, cantar, macarrão, refrigerante de baunilha, bolo, hambúrgueres, jardinagem, cheiro de incenso, banheiras com espuma, não estar morta",
        dislikes: "Família Medici, Dália Negra, Double, o Coração-Caveira, gente mal educada, desonestidade, quem não leva karaokê a sério, tempestades com relâmpagos, estar morta",
        characterAbility: {
            title: "CAUDA DE DRAGÃO",
            description: "Segurar o botão CAUDA DE DRAGÃO faz com que até 2 CARGAS DE DRAGÃO sejam armazenadas. As CARGAS DE DRAGÃO são consumidas para tornar certos ataques mais poderosos!"
        },
        superiorAbility1: {
            title: "NOITE ASSUSTADORA",
            description: "MORTA DO MAL - Enquanto inimigos estiverem perto do corpo da Squigly, GOLPES dos aliados infligem MALDIÇÃO e DEFINHAR por 15 segundos.\n\nMORTA-VIVA - Enquanto aliados estiverem perto do corpo da Squigly, receber um GOLPE lhes dará RESISTÊNCIA FINAL por 15 segundos."
        },
        superiorAbility2: null,
        prestigeAbility: {
            title: "NÃO SAIA DA TUMBA",
            description: "A Squigly carrega esta habilidade sempre que ela ganha ou usa uma CARGA DE DRAGÃO.\n\nTAXA DE CARGA: 12% por CARGA DE DRAGÃO ganha ou usada.\n\nEFEITO DE ATIVAÇÃO: quaisquer oponentes derrotados no momento não podem mais ser revividos, e a Squigly ganha uma CARGA DE DRAGÃO a cada 2 segundos enquanto estiver perto de um cadáver."
        }
    },
    "umbrella": {
        attack: 4,
        health: 2,
        playstyle: "A jogabilidade de Umbrella gira em torno do medidor de fome de Hungern (Guarda-Chuva). Com o medidor cheio (empanturrado) a personagem fica lenta, causa mais dano e facilita algumas interações. Medidor na metade (saciado) seu estágio normal. Medidor vazio (faminto) ela fica mais rápida, porém diminui seu dano.",
        biography: "A Umbrella é a princesa mais nova do Reino de Dossélia e raramente é vista fora dos salões do palácio real em Canópolis. Ela cresceu isolada, e seu único amigo de verdade é uma herança de família: a arma viva Hungern. Juntos, eles enfrentam o mal e entram na briga em nome da justiça, tal como a irmã mais velha da Umbrella: Parasoul! Ou pelo menos é o que eles fariam se pudessem sair do palácio!<br><br>O surgimento de uma nova Skullgirl pode proporcionar à Umbrella a aventura que ela quer. Mas, quando ela descobrir a verdade sobre si mesma e sua família, será que ela vai desejar ter ficado em casa?",
        birthday: "17 de julho",
        bloodType: "O(?)",
        height: "1,17 m",
        weight: "27,2 kg",
        likes: "Sua irmã Parasoul (a maior parte do tempo), Hungern, sorvete, desenhar, TV, anfíbios, filmes B de terror, dias chuvosos, luta-livre profissional, justiça!, origami de Hungern",
        dislikes: "Sua irmã Parasoul (o resto do tempo), escola em casa, programa de TV Annie das Estrelas, vestidos chiques sufocantes, foie gras, ser pega, Garças da Operação B.A.B.Á.S., o aceno de princesa, joelhos machucados, chorar sobre o leite derramado",
        characterAbility: {
            title: "FOME DO HUNGERN",
            description: "Desbloqueia o Medidor de Fome do Hungern. ARREMESSOS enchem o medidor e golpes baseados em BOLHAS (incluindo tocar o botão do medidor) o esvaziam. Ataques básicos causam mais dano enquanto EMPANTURRADO e são mais rápidos enquanto FAMINTO. Certos golpes são fortalecidos pelo estado do Hungern!"
        },
        superiorAbility1: {
            title: "MANDÍBULAS DA DERROTA",
            description: "DOCE VITÓRIA - Ganhe 2 camadas de FÚRIA por 15 segundos quando derrotar um oponente.\n\nFINAL AMARGO - Uma vez por luta, ganhe RESISTÊNCIA FINAL e REGENERAÇÃO FORTE por 15 segundos cada quando estiver com menos de 25% de VIDA."
        },
        superiorAbility2: null,
        prestigeAbility: {
            title: "REAÇÃO VISCERAL",
            description: "A Umbrella carrega esta habilidade sempre que ganha ou perde FOME.\n\nTAXA DE CARGA: 1% por 1% de FOME ganha ou perdida.\n\nEFEITO DE ATIVAÇÃO: a Umbrella ganha 5% de VIDA e inflige GOSMA por 15 segundos quando GOLPEIA um oponente atacando."
        }
    },
    "valentine": {
        attack: 2,
        health: 3,
        playstyle: "A enfermeira ninja mistura ferramentas médicas para envenenar oponentes ou reanimar aliados derrotados. Uma personagem bem útil para suporte, tem um dano razoável, com golpes eficazes para inflingir efeitos, combos simples e mais. Sua principal função é curar, reviver aliados e incapacitar oponentes quando precisar.",
        biography: "A Valentine é a única sobrevivente do Última Esperança, um grupo de agentes especiais dos Laboratórios Anti-Skullgirl. Antes de serem exterminados pela Skullgirl, o Última Esperança trabalhava para o misterioso Laboratório Zero e realizava tarefas desde reconhecimento e sabotagem até pesquisa avanççada.<br><br>Agora, a Valentine serve à Skullgirl fielmente, cumprindo sua vontade das sombras. Ela é bastante introvertida, então muito de sua verdadeira natureza e personalidade é desconhecido.",
        birthday: "25 de dezembro",
        bloodType: "A",
        height: "183 cm",
        weight: "73 kg",
        likes: "Álcool, o método científico, estudar coisas de longe, cobras, lobos, música clássica, pontualidade, planejamento cuidadoso, desmontar coisas, noticiários e escrita de não-ficção, jogos psicológicos, xadrez, violão acústico, carne, cultura oriental, chocolate amargo",
        dislikes: "Formalidade desnecessária, sentimentalismo, pessoas fracas, cozinhar, falar com doentes, Brain Drain, dor nas costas, doces",
        characterAbility: {
            title: "SIFÃO",
            description: "Mais do dano que a Valentine recebe é infligido como DANO DE ARRANHÃO não permanente. 75% do dano da Valentine é recuperado como VIDA, mas apenas até o limite de seu DANO DE ARRANHÃO atual."
        },
        superiorAbility1: {
            title: "CLÍNICA DE COMBATE",
            description: "CENTRO DE TRAUMAS - Quando a Valentine está viva, aliados ganham RESIST. FINAL por 15 s ao sofrer GOLPE que tire mais de 10% de VIDA.\n\nUTI - A Valentine ganha REGENERAÇÃO FORTE por 20 segundos ao sofrer um EFEITO NEGATIVO."
        },
        superiorAbility2: null,
        prestigeAbility: {
            title: "REANIMADORA",
            description: "A Valentine carrega esta habilidade sempre que recupera VIDA ao ENTRAR NA ASSISTÊNCIA.\n\nTAXA DE CARGA: 4% por cada 1% de VIDA recuperada.\n\nEFEITO DE ATIVAÇÃO: todos os aliados derrotados são REVIVIDOS com 10% de VIDA, e a Valentine ganha continuamente 2% de VIDA por segundo."
        }
    }
};

const CHARACTER_PROFILES_EN = {
    "annie": {
        playstyle_en: "Annie is a fast fighter focused on long ground combos and constant pressure. She uses her Parasite Sagan to control space and extend combos with her Star Power Mode, which adds extra properties to her attacks.",
        biography_en: "To all appearances, Annie is a young television actress and the host of \"Annie Of The Stars,\" a TV variety show based on the myths, legends, and folklore of the titular character. The show has been on the air for years, mixing live-action and animation with multiple actresses playing the lead role.\n\nAt least... that's what Annie wants you to believe! In truth, there has only ever been one Annie. Cursed by the Skull Heart to never grow up, Annie has been alive for centuries. Over that time, she's made it her personal quest to stop the Skull Heart once and for all. To that end, she has acquired numerous skills and items, including her remote parasite, Sagan. Even performing on television works to further her goals as she hopes to educate the world about the dangers of the Skull Heart.\n\nFiercer than she looks, bravest in the cosmos, she is ANNIE OF THE STARS!",
        birthday_en: "June 12",
        bloodType_en: "AB",
        height_en: "5' 1\"",
        weight_en: "110 lbs",
        likes_en: "Fight choreography, Passionate monologues, Nature hikes, The Higgs boson, Star fruit, Cheese, Meteor showers, Adoring fans, Quantum superposition, Practical outfits, The Special Tactics and Rescue Service, Old-timey music",
        dislikes_en: "Tomatoes, Plagiarism, Bad craft services, Sleazy agents, Renaissance fairs, The Fermi Paradox, Random musical numbers, Brown M&Ms, Flat-Earthers",
        characterAbility: {
            title_en: "STAR POWER",
            description_en: "Annie now builds up STAR POWER meter over time, and can activate STAR POWER when above 50% meter. During STAR POWER MODE, Annie's basic attacks produce STARS that deal full damage on BLOCKED HITS, and many of Annie's SPECIAL MOVES have additional properties."
        },
        superiorAbility1: {
            title_en: "EVENT HORIZON",
            description_en: "REDSHIFT - Each SPECIAL MOVE or BLOCKBUSTER used grants 25% bonus damage to SPECIAL MOVES and BLOCKBUSTERS for the rest of the combo.\n\nBLUESHIFT - Opponents deal 40% less damage on each COMBO HIT under 5."
        },
        prestigeAbility: {
            title_en: "STARBURST",
            description_en: "Annie charges this ability when using STAR POWER METER.\n\nCHARGE RATE: 2% per 1% STAR POWER METER spent.\n\nACTIVATION EFFECT: Annie's STAR POWER STARS deal 50% bonus damage."
        }
    },
    "beowulf": {
        playstyle_en: "Beowulf is a fighter focused on grabs and close-quarters combat, using his folding chair and 'Hype Mode'. He can throw the chair to control distance or use it to power up his attacks. By building Hype, he performs 'unblockable' grabs that ignore defenses and maintains constant pressure.",
        biography_en: "Known world-wide for felling the Gigan warrior Grendel and for his illustrious career in the ring, Beowulf had secured himself a spot in the history books as a champion. But a mediocre acting career after leaving the ring tarnished his legacy.\n\nNow, as the Canopy Kingdom faces a new threat, Beowulf enters the ring once more, determined to relive the glory, and in doing so stumbles upon the truth about his past... Will Beowulf be able to overcome this new threat to the city and his legacy? Or is this his final taste of the spotlight?",
        birthday_en: "March 31",
        bloodType_en: "O",
        height_en: "6' 7\"",
        weight_en: "287 lbs",
        likes_en: "Hunting, Working, Snug sweaters, Tour buses, Boots, Ladders, Fluorescent light tubes, Guaranteed money contracts, Microbrews, The sound of an excited crowd, Merchandise, Chamomile tea",
        dislikes_en: "Professional writing staff, Refined sugar, Allen keys, Snakes, Disqualifications, Taking vacation time, Spray on tans, Indoor voices, Being told what to do, Being told what to wear, Potatoes",
        characterAbility: {
            title_en: "HYPE MODE",
            description_en: "Get 1 Hype Charge with every THROW and every 30 seconds. 3 Hype Charges lets you trigger HYPE MODE! During HYPE MODE, THROWS cannot be broken, and many attacks feature surprising upgrades."
        },
        superiorAbility1: {
            title_en: "TITLE FIGHT",
            description_en: "CHALLENGER - Beowulf regains 2% HEALTH per second while his HEALTH% is LOWER than his opponent's.\n\nDEFENDING CHAMP - Beowulf deals 20% bonus damage anytime his HEALTH% is HIGHER than his opponent's."
        },
        prestigeAbility: {
            title_en: "NOW OR NEVER",
            description_en: "Beowulf charges this ability when entering HYPE MODE.\n\nCHARGE RATE: 50% per HYPE MODE ENTRY.\n\nACTIVATION EFFECT: Beowulf deals 15% bonus damage in HYPE MODE for every 20 seconds elapsed during the match."
        }
    },
    "big-band": {
        playstyle_en: "Big Band is the game's fortress, possessing the highest Health and Defense. A specialist in counter-attacks and impenetrable defense, his abilities revolve around Combo, Pressure, and Damage Absorption mechanics, punishing predictable opponents with Massive Musical retaliations.",
        biography_en: "Ben Birdland has seen a lot in his time, including the worst of the Grand War. But nothing was worse than what he saw as a beat cop in New Meridian. When he ran afoul of his crooked unit he was given a violent early retirement, and his broken body was left to spend the rest of its days in an iron lung.\n\nThat would have been the end of Ben's story if it hadn't drawn the ears of the Anti-Skullgirl Labs. With little left to lose, he agreed to be rebuilt with their experimental procedures. Melded with the machinery that allows him to breathe and a powerful array of pneumatic weaponry, he was reborn as \"Big Band.\"\n\nNow a senior member of Lab 8, he's become a father figure of sorts to the younger ASG soldiers. A firm believer in their cause, he has stayed with the project through its controversies and still sees his place on the front lines against the Skullgirl. His technology may be dated, but he more than makes up for it with experience and fortissimo.",
        birthday_en: "December 15",
        bloodType_en: "B",
        height_en: "7' 7\"",
        weight_en: "5000 lbs (95 lbs organic)",
        likes_en: "A good beat, Shoe polish, Brass polish, 4-part harmony, Autumn Leaves, The flat 5th, The spirit of the law, Gin (neat)",
        dislikes_en: "Punks, Corruption, Unresolved dissonance, Carelessness, Electric shavers, Smoothies, Narrow spaces",
        characterAbility: {
            title_en: "CAN'T STOP THE BEAT",
            description_en: "While dashing, Big Band can absorb ONE hit without being interrupted (but will take damage normally)."
        },
        superiorAbility1: {
            title_en: "MAESTRO",
            description_en: "SOLOIST - Gain HEAVY REGEN for 10 seconds and take 50% less damage when absorbing the first HIT while DASHING.\n\nFRONTMAN - Take 15% less damage and gain 20% RESISTANCE while Big Band has living teammates."
        },
        prestigeAbility: {
            title_en: "BLAST BEAT",
            description_en: "Big Band charges this ability on every 10th COMBO HIT landed on him or the opponent.\n\nCHARGE RATE: 15% per 10th COMBO HIT.\n\nACTIVATION EFFECT: Big Band's DASH ATTACKS gain a 25% chance to be UNBLOCKABLE and grant ENRAGE for 5 seconds."
        }
    },
    "black-dahlia": {
        playstyle_en: "Equipped with a multipurpose weapon, Black Dahlia shines in mid-range arena control. Her projectiles (fire, ice, shock, etc.) apply unique penalties, allowing a dynamic style with explosive traps and strong zone control.",
        biography_en: "Black Dahlia is the right hand assassin of Lorenzo Medici, head of the mighty Medici crime syndicate that rules New Meridian from the shadows. A former agent of the Anti-Skullgirl Labs, Black Dahlia was mortally wounded decades ago in a confrontation with a Skullgirl and rebuilt with experimental cybernetic technology. The experience left her with an unquenchable thirst for blood and fascination with the despair and suffering of others.\n\nShe betrayed her peers to fight as a hired hitwoman for whomever could keep her paid (and entertained). After Medici Tower is destroyed by the Skullgirl, Lorenzo sends Black Dahlia off on a killing spree to stop Marie and retrieve the stolen Life Gem from Ms. Fortune.\n\nHowever, Black Dahlia finds herself jaded with her employer and drawn to the forbidden thrills only the Skull Heart can provide...",
        birthday_en: "August 18",
        bloodType_en: "O",
        height_en: "5' 9\"",
        weight_en: "350 lbs (100 lbs organic)",
        likes_en: "Bunnies, Ottomo, Frogs, Boot Knives, Arsenic, Old Lace, Red Velvet Petit Fours, Gigan Sea Pearls, False Passports, Uncut Gems, \"Apple Juice\"",
        dislikes_en: "Tom, Ben Birdland, Vitale, Oversight, Cheap Champagne (hiccups), Easy Prey, Loose Ends, Meddling Kids, Blue Hair, Morality, Mansplaining",
        characterAbility: {
            title_en: "SHARPSHOOTER",
            description_en: "Tap the SHARPSHOOTER button to fire SHOTS! Tap the RELOAD button to load 6 new SHOTS. When reloading, the third shot type is determined by Black Dahlia's ELEMENT and the sixth is random."
        },
        superiorAbility1: {
            title_en: "CLOCKWORK ORIGINS",
            description_en: "METAL BREAKDOWN - SPECIAL SHOTS inflict 20% bonus damage and inflict ARMOR BREAK for 10 seconds (also applies on blocked hits).\n\nNO TIME TO DIE - 50% chance when the opponent lands a CRITICAL HIT to gain REGEN and HASTE for 10 seconds each."
        },
        prestigeAbility: {
            title_en: "TRIGGER MORTIS",
            description_en: "Black Dahlia charges this ability each time she FIRES a SHOT.\n\nCHARGE RATE: 17% per SHOT fired.\n\nACTIVATION EFFECT: Black Dahlia inflicts DEATH MARK and gains DEADEYE for 10 seconds each when RELOADING."
        }
    },
    "cerebella": {
        playstyle_en: "Cerebella is an extremely hard-hitting fighter who mixes brute force and aerial grabs. Focused on close-quarters combat, she destabilizes opponents with Vice-Versa's armored rushes and highly punishing combos with high damage.",
        biography_en: "The biggest sensation in the Cirque des Cartes, Cerebella is a tumbling, soaring dynamo of star power: throughout the Canopy Kingdom, she's admired for her enormous strength and alluring curves. Sadly, this acrobatic orphan only desires the attention of one man, mobster Vitale Medici, who took her in and became the closest thing to a father she's ever known.\n\nWhile inherently good, Cerebella serves the mafia as a leg-breaker when not performing in the circus. Cerebella is the only person capable of controlling her powerful Living Weapon hat, Vice-Versa, so Vitale is stingy with his affections to keep her fighting in his corner.",
        birthday_en: "April 11",
        bloodType_en: "B",
        height_en: "5' 6\"",
        weight_en: "130 lbs",
        likes_en: "Competition, Showing off, Cats, Professional wrestling, Sudoku, Flirting, Pleasing Vitale, Teasing her roommate Feng",
        dislikes_en: "Badmouthing of the Circus, Badmouthing of Vitale, Angry people, Quitters, Cockroaches",
        characterAbility: {
            title_en: "BALANCING ACT",
            description_en: "THROW BREAKS cause enemies to be STAGGERED."
        },
        superiorAbility1: {
            title_en: "CENTER STAGE",
            description_en: "UPPER HAND - THROWS reduce BLOCKBUSTER METER by 20%.\n\nRING LEADER - THROWS DISABLE the opponents TAG INS and SPECIAL MOVES for 15 seconds."
        },
        prestigeAbility: {
            title_en: "THE HARDER THEY FALL",
            description_en: "Cerebella charges this ability each time she THROWS or is THROWN by her opponent.\n\nCHARGE RATE: 20% per THROW.\n\nACTIVATION EFFECT: Cerebella's THROWS deal bonus damage equal to 50% of her opponent's remaining HEALTH percentage."
        }
    },
    "double": {
        playstyle_en: "Double has the unique ability to transform her shape during combat. With a volatile style and high offensive capacity disguised in the forms of other characters, she is the game's 'wildcard', capitalizing on chaos to surprise opponents.",
        biography_en: "Double's origins are a complete mystery. Seemingly without a will or motive of its own, this formless monster aids the Skullgirl.\n\nDouble is capable of transforming its nightmarish form into that of any person, but often appears as a smiling nun. It can frequently be found in the Grand Cathedral of the Divine Trinity, listening to confessions and attending to the catacombs beneath.",
        birthday_en: "Unknown",
        bloodType_en: "All/None",
        height_en: "Varies",
        weight_en: "Varies",
        likes_en: "Nothing",
        dislikes_en: "Nothing",
        characterAbility: {
            title_en: "TRANSMUTATION",
            description_en: "After BLOCKING without being hit for 1 second, Double will switch to a new random element.\n\nWhen at an ELEMENTAL ADVANTAGE, Double's damage increases by 10%.\n\nWhen at an ELEMENTAL DISADVANTAGE, opponent damage decreases by 10%."
        },
        superiorAbility1: {
            title_en: "ENTROPY",
            description_en: "CHAOS - When at an ELEMENTAL ADVANTAGE, inflict a random DEBUFF for 15 seconds when landing a CRITICAL HIT.\n\nVOLATILITY - Every 10 seconds, gain a random BUFF for 10 seconds."
        },
        prestigeAbility: {
            title_en: "DOUBLE JEOPARDY",
            description_en: "Double charges this ability each time she TRANSMUTES.\n\nCHARGE RATE: 12% per TRANSMUTATION.\n\nACTIVATION EFFECT: The effects of Double's ELEMENTAL ADVANTAGE are increased by 40%."
        }
    },
    "eliza": {
        playstyle_en: "Eliza and her parasite Sekhmet and her bodyguards. When using a Sekhmet Blockbuster, Sekhmet enters the field being immune to Normal Attacks and Special Moves. She is a Control and Support character being very useful in various situations where the opponent is difficult to deal with.",
        biography_en: "Eliza is the celebrity diva of New Meridian's premiere nightclub, Bastet's Den. Unbeknownst to the club's patrons, however, she's also been host to the skeletal Parasite Sekhmet for untold years. Widely known for her blood drive charities, in reality these serve to feed Sekhmet and maintain Eliza's ageless beauty. Recently discovered and blackmailed by the Medici into pursuing the Skull Heart, Eliza's ancient ambitions stir once more...",
        birthday_en: "October 17",
        bloodType_en: "Any",
        height_en: "5' 11\"",
        weight_en: "160 lbs (on average)",
        likes_en: "Beer, Kushari, Dolma, Old Fashioneds, Board games (especially Senet), Bathing, Dressing up, Cats, Sunny weather, Dancing, Singing, Being in the spotlight, Blood, Conquest, Samson",
        dislikes_en: "Human arrogance, Prejudice against Parasites, Plebians, Missed opportunities, Philanthropy, X-rays, Living small, Trinitism, Historical inaccuracies, Unhealthy blood, Losing her nose, Samson",
        characterAbility: {
            title_en: "WARRIOR GODDESS",
            description_en: "BLOCKBUSTERS involving Sekhmet now leave Eliza in Sekhmet Mode for a short duration. All damage taken while in Sekhmet Mode is recoverable."
        },
        superiorAbility1: {
            title_en: "BLOODLINE",
            description_en: "BLOOD OATH - Whenever a teammate is defeated, Eliza regains 50% HEALTH.\n\nRITUAL SACRIFICE - Whenever a teammate is defeated, Eliza gains 100% BLOCKBUSTER METER."
        },
        prestigeAbility: {
            title_en: "FEAST AND FAMINE",
            description_en: "Eliza charges this ability each time she enters SEKHMET MODE.\n\nCHARGE RATE: 25% per ENTRY.\n\nACTIVATION EFFECT: Eliza gains a 5% chance on each NON-BLOCKBUSTER HIT in SEKHMET MODE (including blocked hits) to REMOVE 1 opponent BUFF and gain 5% HEALTH."
        }
    },
    "filia": {
        playstyle_en: "Filia is focused on agility and short-range pressure. She can heal herself and cause constant bleeding while inflicting a good amount of damage with her varied combos.",
        biography_en: "Filia was once just an average schoolgirl, but one day woke up without any memories and a second mouth on the back of her head. She was now playing host to a Parasite named Samson, an unruly mop of demonic hair with incredible power.\n\nWith no memories or anyone to turn to for help, if she ever hopes to piece together her past and survive the inevitable clash with the Skullgirl, Filia will need to trust this mysterious being.",
        birthday_en: "March 18",
        bloodType_en: "AB",
        height_en: "5' 4\"",
        weight_en: "142 lbs",
        likes_en: "Eating, Coffee, Milkshakes, Reading and learning, Radio dramas, Comics, Romance novels, Dogs",
        dislikes_en: "Samson's bluffing and gambling, Seeing innocents get hurt, Hair getting tangled, Being lied to, Side-effects of Samson's parasitism",
        characterAbility: {
            title_en: "FLASH BACK",
            description_en: "Back-dashing just before being HIT will allow Filia to EVADE an opponent's attack, avoiding all damage."
        },
        superiorAbility1: {
            title_en: "BLOODLETTING",
            description_en: "LEECH - 25% of the damage Filia inflicts is regained as HEALTH.\n\nTHE FIRST CUT - Every HIT has a 15% chance to convert all active BLEEDS to permanent BLEEDS."
        },
        prestigeAbility: {
            title_en: "BOB AND WEAVE",
            description_en: "Filia charges this ability each time she HITS an attacking opponent or is HIT while attacking.\n\nCHARGE RATE: 20% per HIT.\n\nACTIVATION EFFECT: Filia EVADES all projectiles while DASHING and has a 50% chance to inflict DEATH MARK for 5 seconds when HITTING an attacking opponent."
        }
    },
    "fukua": {
        playstyle_en: "Despite looking like Filia, Fukua focuses on medium-range, long-range, and high-damage attacks. She has phantom projections that steal her vitality and have various uses. She mixes safe long-range routine attacks with effective close-quarters rushes.",
        biography_en: "One of Brain Drain's less-socially-acceptable hobbies is cloning, and often he forces the souls of dead warriors to inhabit these clones. Fukua is the result of a fortunate - or unfortunate - Lab Zero accident: a union of two souls. One, a once-proud warrior known for her brute strength in close combat; the other a silent assassin who specialized in ranged weapons for her kills.\n\nTogether as one, Fukua possesses the best of both specialties... but relationships formed under intense circumstances often don't last.",
        birthday_en: "Unknown",
        bloodType_en: "AB",
        height_en: "5' 4\"",
        weight_en: "142 lbs",
        likes_en: "Unknown",
        dislikes_en: "Unknown",
        characterAbility: {
            title_en: "SANGUINE SHADOWS",
            description_en: "All of the damage Fukua receives is inflicted as non-permanent SCRATCH DAMAGE."
        },
        superiorAbility1: {
            title_en: "UNTETHERED ENTITY",
            description_en: "SPECTRAL SPITE - Deal 1% bonus damage for every 5% HEALTH missing.\n\nWRAITH'S WRATH - Reduce damage taken by 1% for every 5% HEALTH missing."
        },
        prestigeAbility: {
            title_en: "DREAM EATER",
            description_en: "Fukua charges this ability each time she or the opponent uses a BLOCKBUSTER.\n\nCHARGE RATE: 25% per BLOCKBUSTER.\n\nACTIVATION EFFECT: Fukua drains 5% of the opponent's BLOCKBUSTER METER and inflicts HEAL BLOCK for 5 seconds when using a BLOCKBUSTER."
        }
    },
    "marie": {
        playstyle_en: "Marie uses her skeletons in serial attacks to pressure adversaries along with Hilgard, her main ally. She is a very strong character for maintaining pressure, controlling the field, and can revive allies and prevent opponent resurrection.",
        biography_en: "Marie Korbel was Hilgard's orphanage's clumsiest, but most enthusiastic, self-appointed maid until raiders attacked her newfound family. Desperate, Marie wished on the Skull Heart for the power to protect those she loved. The wish was granted, but at a terrible cost. Marie awoke as a twisted being of destruction: The Skullgirl. With friends gone and home razed, Marie had nothing left but vengeance. Her fierce determination allowed her to keep her murderous rampage focused on the Medici Mafia, but every passing moment the Skull Heart pushed her to ever more severe acts of destruction.\n\nYet the impossible has happened. The Skull Heart has been destroyed while Marie herself has been spared. She is now a Skullgirl unchained, freed from the diabolical machinations of the Skull Heart's unseen masters. Marie is uncertain what to make of her new reality, but one thing is certain: She vows to be the last Skullgirl.",
        birthday_en: "April 3",
        bloodType_en: "SG (formerly O)",
        height_en: "4' 9\"",
        weight_en: "94 lbs",
        likes_en: "Tidiness, Protecting the Innocent, Fond Memories, Apples, Jams and Jellies, Books, Patricia, Hilgard's orphanage, Rommelgrad, Justice",
        dislikes_en: "The Medici, War, Weapons, Criminals, Mice, The Anti-Skullgirl Project, The Skull Heart, Powerlessness, Suspicious Nun, Fragile Vases",
        characterAbility: {
            title_en: "REST AND RESURRECTION",
            description_en: "Hold down the REST AND RESURRECTION button to build a MORTUARY CHARGE. When charged, tap the button to REVIVE nearby defeated allies and INCINERATE nearby opponent corpses!"
        },
        superiorAbility1: {
            title_en: "CORPSE ARTISAN",
            description_en: "IMPROVED INCINERATION - Gain 25% BLOCKBUSTER METER and ENRAGE when INCINERATING a dead body.\n\nREINFORCED REVIVAL - While Marie is alive, teammates gain permanent ARMOR and an additional 25% HEALTH when REVIVED."
        },
        prestigeAbility: {
            title_en: "CALL OF THE GRAVE",
            description_en: "Marie charges this ability each time a BUFF or DEBUFF expires on either Fighter while she is TAGGED IN.\n\nCHARGE RATE: 14% per BUFF or DEBUFF expiration.\n\nACTIVATION EFFECT: Marie inflicts QUIETUS for 10 seconds each time she uses a MORTUARY CHARGE."
        }
    },
    "ms-fortune": {
        playstyle_en: "Ms. Fortune gains unparalleled area control by using her detachable head as an on-screen assist. If she prefers to remain whole, she attacks avidly with extremely fast punishing combos based on short-range rushes and high damage.",
        biography_en: "A feline feral, Nadia Fortune is the last surviving member of the Fishbone Gang, a notorious band of otherwise Dagonian thieves. Their last mission ended in tragedy: a failed attempt to steal the mysterious Life Gem from Lorenzo Medici resulted in their grisly deaths. Before meeting her own doom, Ms. Fortune swallowed the Life Gem and managed to digest it. The Gem's power permeated her entire body, making it truly undying... even after being cut into several pieces.\n\nNow hiding in the shadows of Little Innsmouth, Ms. Fortune plots to avenge her fallen comrades.",
        birthday_en: "November 24",
        bloodType_en: "B",
        height_en: "5' 8\"",
        weight_en: "127 lbs",
        likes_en: "Making friends, Sunlit naps, Volleyball, Bowling, Golf, Parkour, Subjecting others to terrible puns, Yu-Wan's restaurant, Dim Sum, The Fishbone Gang, Robbing from rich, Giving to poor, Potato chips",
        dislikes_en: "The Medici Mafia, Black Dahlia, Sushi, Cops, Bullies, Marsupials, Loud noises, Lemonade",
        characterAbility: {
            title_en: "HEAD GAMES",
            description_en: "Tap the HEAD GAMES button to enter HEADLESS MODE. Ms. Fortune's head can attack independent of her body. But be careful: Ms. Fortune will also suffer any additional damage inflicted to her head!"
        },
        superiorAbility1: {
            title_en: "I CAN HAS BUFF?",
            description_en: "MLEM - Gain REGEN for 20 seconds after every 10 seconds not suffering a HIT (includes blocked hits).\n\nBOOP - Gain ENRAGE for 20 seconds after every 10 seconds not suffering a HIT (includes blocked hits)."
        },
        prestigeAbility: {
            title_en: "FUR AND BLUR",
            description_en: "Ms. Fortune charges this ability based on her MOVE SPEED.\n\nCHARGE RATE: 1.5% of her MOVE SPEED.\n\nACTIVATION EFFECT: Ms. Fortune gains EVASION and inflicts GUARD BREAK for 5 seconds each every 10 seconds."
        }
    },
    "painwheel": {
        playstyle_en: "Painwheel has devastating charged attacks executed through the blade on her back. Focusing on her means dealing with her reflective damage and lethal counter-attacks where opponents hurt themselves and receive massive damage back; she is a character with low health but very high damage.",
        biography_en: "Once a normal schoolgirl named Carol, Painwheel was kidnapped by Valentine and delivered to the Anti-Skullgirls Labs' secretive Lab Zero. There she was implanted with the synthetic Buer Drive and Gae Bolga parasites and infused with experimental Skullgirl blood, transforming her into the monster she is today. Violent and unstable as a result of these experiments, as a precaution she's mentally controlled by Lab Zero's powerful psychic director, Brain Drain.\n\nFueled by rage, she draws her power from her pain and fury. Despite that, the soul of that scared young girl still lives on inside this monstrous body, desperately fighting off the onslaught of voices that would control her.",
        birthday_en: "October 23",
        bloodType_en: "SG",
        height_en: "5' 1\"",
        weight_en: "375 lbs",
        likes_en: "Flowers, Gardening, Walking on the beach at sunset, Family, Sound of wind chimes, Dogs, Nostalgic memories, Friends, Magenta, Proper etiquette",
        dislikes_en: "ASG Labs, Valentine, Brain Drain, The Skullgirl, The Skull Heart, People, Her Body, Mind Control, Torture, Pain, Frustration, Gossip, Styrofoam sounds, Loud noises, Bad puns",
        characterAbility: {
            title_en: "FLIGHT RISK",
            description_en: "Tap the FLIGHT RISK button to hover in the air! Tap the button again to land. While flying, gain access to new actions by swiping and tapping."
        },
        superiorAbility1: {
            title_en: "TORTURED SOUL",
            description_en: "TAINTED BLOOD - When an opponent lands a CRITICAL HIT, 100% of the damage will be reflected back.\n\nGRUDGE - When the opponent lands a CRITICAL HIT, gain ENRAGE for 20 seconds and ARMOR for 5 seconds."
        },
        prestigeAbility: {
            title_en: "NOWHERE TO HIDE",
            description_en: "Painwheel charges this ability each time she or her opponent lands a CRITICAL HIT.\n\nCHARGE RATE: 4% per CRITICAL HIT.\n\nACTIVATION EFFECT: Painwheel inflicts GUARD BREAK for 5 seconds when using a BLOCKBUSTER."
        }
    },
    "parasoul": {
        playstyle_en: "Parasoul uses the explosive tears of her Living Umbrella as traps to manage the field and amplify her damage. She combines sharp close-quarters skills with absolute screen control through her allied troops intervening, allowing her to extend combos with deadly precision attacks, whether at long or short range.",
        biography_en: "Few know the terrors of the Skullgirl as intimately as Parasoul does: seven years ago her own mother became the Skullgirl that nearly destroyed the world. This tragic past has made her fiercely protective of both her country and her family, and these two priorities frequently come into conflict.\n\nParasoul is now the crown princess of the Canopy Kingdom and leader of its elite military squad, the Black Egrets. Wielding the living umbrella, Krieg, she fights with grace, poise and cunning to defend her family honor and destroy the Skull Heart so no one can repeat her mother's terrible mistake.",
        birthday_en: "December 22",
        bloodType_en: "A",
        height_en: "5' 10\"",
        weight_en: "156 lbs",
        likes_en: "Logic, Wine, Chess, Fencing, Training, Tennis, Diplomacy, Philosophy, Black Egret troops, Secretly watching 'Annie: Girl of the Stars,\" Her sister Umbrella",
        dislikes_en: "Overly emotional people, Relying on others, Those who speak ill of her family, Injustice, The Medici Mafia, The Skullgirl, Her sister's antics",
        characterAbility: {
            title_en: "TEARFUL",
            description_en: "Certain attacks will now spawn a TEAR. Using a CHARGE ATTACK will detonate all active TEARS, damaging opponents caught in the blast."
        },
        superiorAbility1: {
            title_en: "HYPER-CRITICAL",
            description_en: "CRITICAL THINKING - Parasoul gains a 25% bonus to CRIT RATE per ACTIVE TEAR.\n\nCRITICAL MASS - Parasoul gains a 20% bonus to CRIT DAMAGE per ACTIVE TEAR."
        },
        prestigeAbility: {
            title_en: "DEADLY ACCURACY",
            description_en: "Parasoul charges this ability each time she spawns a TEAR.\n\nCHARGE RATE: 12% per TEAR.\n\nACTIVATION EFFECT: Parasoul gains PRECISION every 2 second(s) while near a TEAR."
        }
    },
    "peacock": {
        playstyle_en: "Peacock is a very strong character for long-range field control, she can be very unpredictable and has a good arsenal. She has a strong field presence due to her ease in breaking defenses, applying combos, and pressuring safely.",
        biography_en: "Once a war orphan slave named Patricia, Peacock's body was gruesomely mutilated by slave traders that captured her. She was rescued by Dr. Avian's Anti-Skullgirls Labs, and rebuilt with a reality-defying arsenal of biomechanical weaponry: the Argus System augmented her body, and the Avery Unit gave her access to unprecedented weaponry.\n\nAlas, they couldn't do anything for her mind: Peacock's damaged psyche and abiding love of cartoons shaped her new \"toys\" into a terrifying gang of cronies, who she has no qualms using to paint the town red... with blood. Terrifying as she is, she may be the kingdom's best bet against the Skullgirl.",
        birthday_en: "November 13",
        bloodType_en: "B",
        height_en: "4' 6\"",
        weight_en: "94 lbs (Varies)",
        likes_en: "Cartoons, TV Show \"Annie: Girl of the Stars,\" Movies, Violence, Junk food, Fast Cars, Explosives, Cigars, Being in charge",
        dislikes_en: "Weaklings, Bureaucracy, Authority figures, People, The Skull Heart, Nerds, Salad, Chopsticks",
        characterAbility: {
            title_en: "THE HOLE IDEA",
            description_en: "Tap THE HOLE IDEA button to vanish into a hole, avoiding some attacks. Tap elsewhere to emerge with a wallop! Otherwise, tap the button again or wait 2 seconds to exit without attacking."
        },
        superiorAbility1: {
            title_en: "TOONTIME",
            description_en: "SPECIAL FEATURE - When Peacock uses a SPECIAL MOVE, there is a 20% chance that the COOLDOWN will immediately reset.\n\nCAST PARTY - When Peacock or any teammate uses a TAG IN, there is a 50% chance that the attack will be UNBLOCKABLE."
        },
        prestigeAbility: {
            title_en: "MANIC MUNITIONS",
            description_en: "Peacock charges this ability each time she or the opponent is damaged by a PROJECTILE.\n\nCHARGE RATE: 3% per PROJECTILE.\n\nACTIVATION EFFECT: Peacock has a 25% chance to gain 1 stack of ENRAGE for 5 seconds, HASTE for 5 seconds, or PRECISION when using a SPECIAL MOVE."
        }
    },
    "robo-fortune": {
        playstyle_en: "With powerful laser beams, Robo-Fortune is a long-range specialist, using combos that punish opponents from afar and from the air. Besides having a robust arsenal for combos and attacks at different ranges, she has good abilities and is difficult to punish, making her a persistent threat.",
        biography_en: "Robo-Fortune is the creation of Brain Drain, the psychic director of ASG Lab Zero, and stands as a testament to her maniacal creator's unmatched pride and petulance. Built to demonstrate loyalty and cunning, Robo-Fortune fails to deliver either to any measurable degree. Employing cutting-edge technology, she sets out to hunt down the Skullgirl, and to engage in easily avoidable conflicts.\n\nIs the ASG Project's latest creation the ultimate cybernetic soldier? Have Brain Drain's mechanical machinations set the world on a treacherous path? Is Robo-Fortune's faulty programming more of a feature than a bug? Has science gone too far?!",
        birthday_en: "January 31",
        bloodType_en: "10W-30 Synthetic Oil",
        height_en: "5' 6\"",
        weight_en: "440 lbs",
        likes_en: "Honey pots, Integers less than or equal to 1, Books about dragons, NAND gates, 0x5f3759df, Unrolled loops of strings, Mice, Rebeccapurple, IEEE (except after C!), Setplay",
        dislikes_en: "Disorder, Incompatible file formats, DES, Unsalted passwords (salted tastes better!), Bleeding hearts, Weakly-typed languages, vi, Fonts that make O and 0 look too similar, Checkins without comments, Moire patterns",
        characterAbility: {
            title_en: "HEADRONE HARDWARE",
            description_en: "Tap the LAUNCH button to launch HEADRONES. Use HEADRONES to ram enemies, set proximity mines, and fire a barrage of missiles!"
        },
        superiorAbility1: {
            title_en: "NETWORK PROTOCOL",
            description_en: "DDOS - Inflict POWER SURGE for 15 seconds after every 2 seconds while near the opponent.\n\nPING CHECK - Gain ENRAGE for 15 seconds after every 2 seconds while far away from the opponent."
        },
        prestigeAbility: {
            title_en: "GEIGER COUNTER",
            description_en: "Robo-Fortune charges this ability each time she gains a BUFF or inflicts a DEBUFF.\n\nCHARGE RATE: 7% per BUFF or DEBUFF.\n\nACTIVATION EFFECT: Robo-Fortune gains 5 stacks of PRECISION and reflects 5% of the damage she takes for every BUFF on her or the opponent (max 100%)."
        }
    },
    "squigly": {
        playstyle_en: "Squigly needs to patiently charge her abilities through Leviathan, her companion who helps improve the effectiveness of moves and enhances the damage flow to perform better in different situations; a very versatile and fun character for effective combos.",
        biography_en: "Squigly is the last \"surviving\" member of the Contiello family, a long lineage of opera singers and among the Medicis’ most valued clients. Fourteen years ago, Squigly's mother Selene obtained the Skull Heart, resulting in Lorenzo Medici ordering an attack on the Contiello family. Fraught with despair, Selene became the Skullgirl and revived her family as an undead army. What spared Squigly from becoming a mindless minion was the intervention of the Parasite Leviathan, the Contiello family's friend and guardian.\n\nThe battle between the Skullgirl and Lorenzo threatened to spread across New Meridian if not for Squigly and the intervention of the ASG. With the Skullgirl's defeat, the power that animated Squigly faded, putting her to rest. Lorenzo generously paid for the Contiellos' funeral and has not had conflicts with the Medicis’ other clients since.\n\nFourteen years later, Bloody Marie's emergence has stirred Squigly from her long slumber...",
        birthday_en: "November 2",
        bloodType_en: "Embalmed (formerly A-)",
        height_en: "5' 3\"",
        weight_en: "118 lbs",
        likes_en: "Leviathan, Her family, Tradition, Reading up on current events, Animals (particularly birds and snakes), Music, Singing, Noodles, Cream soda, Cake, Burgers, Gardening, The smell of incense, Bubble baths, Not being dead",
        dislikes_en: "The Medici, Black Dahlia, Double, The Skull Heart, Rude people, Dishonesty, Not taking karaoke seriously, Thunderstorms, Being dead",
        characterAbility: {
            title_en: "WYRM'S TAIL",
            description_en: "Holding down the WYRM'S TAIL button will store up to 2 DRAGON CHARGES. DRAGON CHARGES are consumed to make certain attacks more powerful!"
        },
        superiorAbility1: {
            title_en: "FRIGHT NIGHT",
            description_en: "EVIL DEAD - While enemies are nearby Squigly's dead body, teammates’ HITS inflict CURSE and WITHER for 15 seconds.\n\nDEAD ALIVE - While teammates are near Squigly's dead body, suffering a HIT will grant them FINAL STAND for 15 seconds."
        },
        prestigeAbility: {
            title_en: "STAY TOMBED",
            description_en: "Squigly charges this ability each time she gains or uses a DRAGON CHARGE.\n\nCHARGE RATE: 12% per DRAGON CHARGE gained or used.\n\nACTIVATION EFFECT: Any currently defeated opponents can no longer be revived and Squigly gains a DRAGON CHARGE every 2 seconds while near a dead body."
        }
    },
    "umbrella": {
        playstyle_en: "Umbrella's gameplay revolves around Hungern's (Umbrella) hunger meter. With a full meter (stuffed), the character becomes slow, deals more damage, and facilitates some interactions. Half meter (satiated) is her normal stage. Empty meter (hungry) she becomes faster, but her damage decreases.",
        biography_en: "The youngest princess of the Canopy Kingdom, Umbrella is rarely seen outside the halls of the royal palace in Canopolis. She has grown up sheltered, with her only true friend being a family heirloom: the Living Weapon Hungern. Together, they fight evil and kick butt in the name of justice, just like Umbrella's big sister: Parasoul! Or at least they would if Parasoul would let them out of the palace!\n\nThe rise of a new Skullgirl may just give Umbrella the adventure she wants. But, when she finds out the truths about herself and her family, will she wish she had stayed home?",
        birthday_en: "July 17",
        bloodType_en: "O(?)",
        height_en: "3' 10\"",
        weight_en: "60 lbs",
        likes_en: "Her sister Parasoul (most of the time), Hungern, Ice cream, Drawing, TV, Amphibians, Scary B Movies, Rainy days, Pro wrestling, Justice!, Hungern's origami",
        dislikes_en: "Her sister Parasoul (the rest of the time), Home Schooling, Annie of The Stars TV Show, Stuffy fancy dresses, Fois Gras, Getting caught, Egret Operation S.I.T.T.E.R.S., The Princess Wave, Skinned knees, Crying over spilled milk",
        characterAbility: {
            title_en: "HUNGERN'S HUNGER",
            description_en: "Unlocks Hungern's Hunger Meter. THROWS fill the meter and BUBBLE-based moves (including tapping the meter button) empty it. Basic attacks deal more damage while OVERSTUFFED and are faster while HUNGRY. Certain moves are empowered by Hungern's state!"
        },
        superiorAbility1: {
            title_en: "JAWS OF DEFEAT",
            description_en: "SWEET VICTORY - Gain 2 stacks of ENRAGE for 15 seconds when defeating an opponent.\n\nBITTER END - Once per match, gain FINAL STAND and HEAVY REGEN for 15 seconds each when falling below 25% HEALTH."
        },
        prestigeAbility: {
            title_en: "GUT REACTION",
            description_en: "Umbrella charges this ability each time she gains or loses HUNGER.\n\nCHARGE RATE: 1% per 1% HUNGER gained or lost.\n\nACTIVATION EFFECT: Umbrella gains 5% HEALTH and inflicts SLIME for 10 seconds when HITTING an attacking opponent."
        }
    },
    "valentine": {
        playstyle_en: "The ninja nurse mixes medical tools to poison opponents or revive defeated allies. A very useful support character, she has reasonable damage, with effective moves to inflict effects, simple combos and more. Her main role is to heal, revive allies, and incapacitate opponents when needed.",
        biography_en: "Valentine is the only survivor of the Last Hope, a group of special Anti-Skullgirl Lab operatives. Before meeting their end at the hands of the Skullgirl, the Last Hope worked for the mysterious Lab Zero and performed duties ranging from reconnaissance and sabotage to advanced research.\n\nNow Valentine dutifully serves the Skullgirl, carrying out her will from the shadows. She keeps to herself, so much of her true nature and personality are unknown.",
        birthday_en: "December 25",
        bloodType_en: "A",
        height_en: "6'",
        weight_en: "160 lbs",
        likes_en: "Alcohol, The Scientific Method, Studying things from afar, Snakes, Wolves, Classical music, Punctuality, Careful planning, Taking things apart, News and non-fiction reading, Mind games, Chess, Acoustic guitar, Meat, Eastern culture, Dark chocolate",
        dislikes_en: "Needless formality, Sentimentality, Weak people, Cooking, Bedside manner, Brain Drain, Back pain, Candy",
        characterAbility: {
            title_en: "SIPHON",
            description_en: "More of the damage Valentine receives is inflicted as non-permanent SCRATCH DAMAGE. 75% of the damage Valentine deals is regained as HEALTH, but only up to her current SCRATCH DAMAGE threshold."
        },
        superiorAbility1: {
            title_en: "COMBAT CLINIC",
            description_en: "TRAUMA CENTER - While Valentine is alive, teammates gain FINAL STAND for 15 seconds when suffering a HIT that deals more than 10% HEALTH.\n\nICU - Valentine gains HEAVY REGEN for 20 seconds when suffering a DEBUFF."
        },
        prestigeAbility: {
            title_en: "REANIMATOR",
            description_en: "Valentine charges this ability each time she recovers HEALTH when TAGGING IN.\n\nCHARGE RATE: 4% for each 1% HEALTH recovered.\n\nACTIVATION EFFECT: All defeated teammates are REVIVED with 10% HEALTH and Valentine continuously gains 0.75% HEALTH per second."
        }
    }
};

/**
 * Get character profile data
 * @param {string} charKey - Character key (e.g., 'annie', 'big-band')
 * @param {string} [lang] - Language code (e.g., 'pt-BR', 'en'). Defaults to current language.
 * @returns {Object|null} Profile data or null
 */
export function getCharacterProfile(charKey) {
    const profile = CHARACTER_PROFILES[charKey];
    if (!profile) return null;

    const lang = getCurrentLanguage();
    if (lang === 'en') {
        const en = CHARACTER_PROFILES_EN[charKey];
        if (en) {
            return {
                ...profile,
                playstyle: en.playstyle_en || profile.playstyle,
                biography: en.biography_en || profile.biography,
                birthday: en.birthday_en || profile.birthday,
                bloodType: en.bloodType_en || profile.bloodType,
                likes: en.likes_en || profile.likes,
                dislikes: en.dislikes_en || profile.dislikes,
                characterAbility: profile.characterAbility ? {
                    ...profile.characterAbility,
                    title: en.characterAbility?.title_en || profile.characterAbility.title,
                    description: en.characterAbility?.description_en || profile.characterAbility.description,
                } : undefined,
                superiorAbility1: profile.superiorAbility1 ? {
                    ...profile.superiorAbility1,
                    title: en.superiorAbility1?.title_en || profile.superiorAbility1.title,
                    description: en.superiorAbility1?.description_en || profile.superiorAbility1.description,
                } : undefined,
                superiorAbility2: profile.superiorAbility2 ? {
                    ...profile.superiorAbility2,
                    title: en.superiorAbility2?.title_en || profile.superiorAbility2.title,
                    description: en.superiorAbility2?.description_en || profile.superiorAbility2.description,
                } : undefined,
                prestigeAbility: profile.prestigeAbility ? {
                    ...profile.prestigeAbility,
                    title: en.prestigeAbility?.title_en || profile.prestigeAbility.title,
                    description: en.prestigeAbility?.description_en || profile.prestigeAbility.description,
                } : undefined,
            };
        }
    }
    return profile;
}

/**
 * Check if a character has profile data filled in
 * @param {string} charKey - Character key
 * @returns {boolean} True if profile has biography or essential data
 */
export function hasProfileData(charKey) {
    const profile = CHARACTER_PROFILES[charKey];
    if (!profile) return false;
    return !!(profile.biography || profile.birthday || profile.height);
}

export { CHARACTER_PROFILES, CHARACTER_PROFILES_EN };

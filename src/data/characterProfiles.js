// =====================================================
// CHARACTER PROFILES DATA
// Biografias e dados essenciais de cada personagem
// Edite este arquivo para adicionar/alterar informações
// =====================================================

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
        dislikes: "Tomates, plágio, serviço de buffet ruim, agentes pilantras, feiras renascentistas, o paradoxo de Fermi, números musicais aleatórios, M&Ms marrons, terraplanistas"
    },
    "beowulf": {
        attack: 4,
        health: 4,
        playstyle: "Beowulf é um lutador focado em agarrões e combate corpo a corpo, utilizando sua cadeira dobrável ('Theatrics') e o 'Modo Hype'. Ele pode arremessar a cadeira para controlar a distância ou usá-la para potencializar seus ataques. Ao acumular Hype, he realiza agarrões devastadores que ignoram defesas e mantém a pressão constante.",
        biography: "Reconhecido mundialmente por ter derrubado Grendel, o guerreiro Gigan, e por sua ilustre carreira no ringue, o Beowulf garantiu um lugar nos livros de história como um campeão. Entretanto, uma carreira medíocre como ator após ter deixado os ringues manchou seu legado.<br><br>Agora, com o Reino de Dossélia enfrentando uma nova ameaça, o Beowulf entrará no ringue mais uma vez, determinado em trazer de volta os dias de glória. E ao fazê-lo, se deparará com a verdade sobre seu passado... será o Beowulf capaz de superar esta nova ameaça à cidade e a seu legado? Ou será esta sua última vez na ribalta?",
        birthday: "31 de março",
        bloodType: "O",
        height: "201 cm",
        weight: "130 kg",
        likes: "Caçar, lutar a sério, suéteres, ônibus de turismo, botas, escadas, lâmpadas fluorescentes, contratos com dinheiro garantido, cervejas artesanais, o som de um público empolgado, produtos oficiais, chá de camomila",
        dislikes: "Roteiristas profissionais, açúcar refinado, chaves sextavadas, cobras, desqualificações, tirar férias, sprays de bronzeamento, falar baixo, quando lhe dizem o que fazer ou vestir, batatas"
    },
    "big-band": {
        attack: 2,
        health: 5,
        playstyle: "Big Band é a fortaleza do jogo, possuindo a maior vida e defesa. Especialista em contra-ataques e defesa impenetrável, suas habilidades giram em torno da mecânica de 'Parry' e absorção de dano, punindo oponentes previsíveis com retaliações musicais massivas.",
        biography: "Ben Birdland já viu de tudo na vida, incluindo o pior da Grande Guerra. Mas o que ele viu como policial em Nova Meridian superou todo o resto. Quando ele se rebelou contra sua unidade corrupta, deram a ele uma precoce aposentadoria por invalidez, com seu corpo destruído condenado a viver o resto de seus dias em um pulmão de aço.<br><br>Este teria sido o fim da história do Ben se não tivesse caído nos ouvidos dos Laboratórios Anti-Skullgirl. Com pouco a perder, ele aceitou ser reconstruído através de procedimentos experimentais. Fundido com máquinas que o permitem respirar e uma gama de poderosas armas pneumáticas, ele renasceu como \"Big Band\".<br><br>Hoje um sênior do Laboratório 8, ele se tornou uma espécie de figura paterna para os jovens soldados do ASG. Crendo firmemente na causa, ele continuou no projeto apesar de todas as controvérsias e ainda quer estar na linha de frente contra a Skullgirl. Sua tecnologia pode estar ultrapassada, mas sua experiência e ímpeto fazem dele um lutador temível.",
        birthday: "15 de dezembro",
        bloodType: "B",
        height: "231 cm",
        weight: "2.268 kg (43 kg de mat. orgânica)",
        likes: "Uma boa batida, graxa de sapato, polimento para metais, música para 4 instrumentos, folhas de outono, 4ª aumentada, o espírito da lei, gim, limpeza",
        dislikes: "Malacos, corrupção, dissonância mal resolvida, falta de cuidado, barbeadores elétricos, vitaminas, espaços apertados"
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
        dislikes: "Tom, Ben Birdland, Vitale, supervisão, champagne barato (dá soluço), presas fáceis, assuntos inacabados, crianças bisbilhoteiras, cabelo azul, moralidade, mansplaining"
    },
    "cerebella": {
        attack: 4,
        health: 4,
        playstyle: "Cerebella é uma lutadora extremamente contundente que mistura força bruta e agarrões aéreos. Focada em combate corpo a corpo, ela desestabiliza oponentes com investidas blindadas de Vice-Versa e combos altamente punitivos.",
        biography: "Maior estrela do Cirque des Cartes, a Cerebella é um dínamo rolante e voador de estrelato: ela é admirada em todo o Reino de Dossélia por sua enorme força e sedutoras curvas. Infelizmente, esta acrobata órfã só deseja a atenção de um homem, o mafioso Vitale Medici, que a adotou e se tornou o mais próximo de um pai que ela veio a conhecer.<br><br>Apesar de ter um bom coração, a Cerebella trabalha como cobradora da máfia quando não está se apresentando no circo. A Cerebella é a única capaz de controlar seu poderoso chapéu Arma Viva, Vice-Versa, então o Vitale dosa muito bem suas afeições para mantê-la lutando em seu team.",
        birthday: "11 de abril",
        bloodType: "B",
        height: "168 cm",
        weight: "59 kg",
        likes: "Competições, aparecer, gatos, luta greco-romana profissional, sudoku, flertar, agradar o Vitale, zoar da Feng, sua colega de quarto",
        dislikes: "Quem fala mal do circo, quem fala mal do Vitale, pessoas irritadas, desistões, baratas"
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
        dislikes: "Nada"
    },
    "eliza": {
        attack: 3,
        health: 4,
        playstyle: "Eliza conta com o parasita Sekhmet e as suas guarda-costas. Seus combos a curam lentamente enquanto aplicam sangramento aos oponentes. Quando assume o controle do esqueleto parasita, ela ignora o atordoamento temporariamente em ataques brutais com armadura pesada.",
        biography: "A Eliza é a diva celebridade da recém-inaugurada boate de Nova Meridian, o Covil de Bastet. O que a clientela não sabe, no entanto, é que ela também é a hospedeira da Parasita esquelética Sekhmet há incontáveis anos. É amplamente conhecida por suas instituições de caridade de doação de sangue, que, na verdade, servem só para alimentar Sekhmet e manter a beleza eterna da Eliza. Recentemente descoberta e chantageada pela família Medici a perseguir o Coração-Caveira, as antigas ambições da Eliza se acenderam mais uma vez...",
        birthday: "17 de outubro",
        bloodType: "Qualquer um",
        height: "180 cm",
        weight: "73 kg (em média)",
        likes: "Cerveja, kushari, dólmãs, coquetel Old Fashioned, jogos de tabuleiro (especialmente Senet), banho de imersão, se vestir, gatos, tempo ensolarado, dançar, cantar, chamar a atenção, sangue, conquistar, Sansão",
        dislikes: "Arrogância humana, preconceito contra Parasitas, plebeus, perder oportunidades, filantropia, raios-X, viver em locais pequenos, Trindadeísmo, inexatidão histórica, sangue doente, perder o nariz, Sansão"
    },
    "filia": {
        attack: 3,
        health: 2,
        playstyle: "Filia é focada em agilidade e pressão de curta distância (rushdown). Sua capacidade agressiva, com resets constantes e rápida aplicação de sangramento, transforma a personagem em uma das mais ágeis causadoras de dano direto.",
        biography: "Houve um tempo que a Filia era só uma estudante comum, mas um dia ela acordou sem nenhuma lembrança e uma segunda boca na nuca. Ela havia se tornado a hospedeira do Parasita chamado Sansão, uma rebelde cabeleira demoníaca com poderes incríveis.<br><br>Sem memória ou alguém para quem pedir ajuda, se ela quiser, um dia, juntar as peças de seu passado e sobreviver ao inevitável embate com a Skullgirl, a Filia terá que confiar nesse ser misterioso.",
        birthday: "18 de março",
        bloodType: "AB",
        height: "163 cm",
        weight: "64 kg",
        likes: "Comer, café, milkshakes, ler e aprender, radionovelas, quadrinhos, romances, cachorros",
        dislikes: "Os blefes e jogatinas do Sansão, ver inocentes feridos, cabelos embaraçados, mentiras, efeitos colaterais do parasitismo do Sansão"
    },
    "fukua": {
        attack: 3,
        health: 2,
        playstyle: "Apesar de se parecer com Filia, Fukua concentra-se no zoneamento de médio alcance e na cura persistente, usando projeções fantasmas que roubam a vitalidade. Ela mistura ataques rotineiros seguros de longo alcance com investidas corpo a corpo calculadas.",
        biography: "Um dos hobbies menos socialmente aceitáveis do Brain Drain é a clonagem, e muitas vezes ele força as almas de guerreiros mortos a habitar esses clones. Fukua é o resultado de um feliz - ou infeliz - acidente no Laboratório Zero: uma união de duas almas. Uma, de um guerreiro outrora orgulhoso, conhecido por sua força bruta em combate corpo a corpo; a outra, de um assassino silencioso, especializado em armas de longo alcance para matar. Juntos, eles são Fukua, possuidora do melhor das duas especialidades... mas os relacionamentos formados sob circunstâncias intensas geralmente não duram.",
        birthday: "Desconhecido",
        bloodType: "AB",
        height: "163 cm",
        weight: "64 kg",
        likes: "Desconhecido",
        dislikes: "Desconhecido"
    },
    "marie": {
        attack: 2,
        health: 4,
        playstyle: "Marie utiliza seus mortos-vivos em ataques em série para pressionar adversários com lacaios zumbis e projeções ósseas. Ela gerencia um exército evocado para esmagar até os defensores pacíficos com um controle total do mapa.",
        biography: "Marie Korbel era a menina mais desajeitada do Orfanato de Hilgard, mas era também uma autonomeada faxineira entusiasmada até que bandidos atacaram sua nova família. Desesperada, Marie pediu para o Coração-Caveira o poder para proteger aqueles que ela amava. Seu desejo foi concedido, mas a um preço terrível. Marie despertou como uma criatura distorcida de destruição: a Skullgirl. Com seus amigos mortos e seu lar arrasado, Marie não tinha mais nada além da vingança. Sua determinação feroz permitiu que ela concentrasse sua fúria assassina na Máfia dos Medicis, mas o tempo todo o Coração-Caveira a pressionava a cometer atos mais graves de destruição.<br><br>Mas o impossível aconteceu. O Coração-Caveira foi destruído e a própria Marie foi poupada. Ela agora é uma Skullgirl sem limitações, livre dos planos diabólicos dos mestres ocultos do Coração-Caveira. Marie não sabe o que fazer com sua nova realidade, mas uma coisa é certa: ela jurou ser a última Skullgirl.",
        birthday: "3 de abril",
        bloodType: "SG (antes O)",
        height: "144,8 cm",
        weight: "42,6 kg",
        likes: "Organização, Proteger os Inocentes, Memórias Queridas, Maçãs, Geleias e Gelatinas, Livros, Patricia, o Orfanato de Hilgard, Rommelgrad, Justiça",
        dislikes: "Os Medicis, Guerra, Armas, Criminosos, Ratos, O Projeto Anti-Skullgirl, o Coração-Caveira, Impotência, Freira Suspeita, Vasos Frágeis"
    },
    "ms-fortune": {
        attack: 5,
        health: 2,
        playstyle: "Ms. Fortune ganha um controle inigualável de área ao usar sua cabeça destacável como assistente na tela (head-on ou head-off). Caso prefira permanecer inteira, ela ataca avidamente com combos punitivos extremamente velozes baseados em investidas de curta distância.",
        biography: "Uma feral meio-gata, Nadia Fortune é a última integrante viva da Gangue Espinhosa, um notório bando de ladrões dagonianos (à exceção dela). A última missão deles terminou em tragédia: uma tentativa fracassada de roubar a misteriosa Gema da Vida de Lorenzo Medici culminou em suas horríveis mortes. Antes de se juntar a eles, a Ms. Fortune engoliu a Gema da Vida e conseguiu digeri-la.<br><br>O poder da Gema permeou todo o seu corpo, tornando-a incapaz de morrer... mesmo depois de ter sido cortada em vários pedaços. Atualmente, a Ms. Fortune se esconde nas sombras da Pequena Innsmouth e planeja vingar seus camaradas caídos.",
        birthday: "24 de novembro",
        bloodType: "B",
        height: "173 cm",
        weight: "58 kg",
        likes: "Fazer amigos, cochilar ao sol, vôlei, boliche, golfe, parkour, atormentar os outros com trocadilhos horríveis, o restaurante da Yu-Wan, Dim Sum, a Gangue Espinhosa, roubar dos ricos, dar aos pobres, batatas chips",
        dislikes: "A Máfia dos Medici, Dália Negra, sushi, policiais, valentões, marsupiais, barulhos altos, limonada"
    },
    "painwheel": {
        attack: 5,
        health: 1,
        playstyle: "Painwheel tem ataques carregados devastadores executados através da lâmina em suas costas, absorvendo impactos indesejados graças à sua armadura pesada em voo (Fly). Focar nela significa lidar com seu dano reflexivo e contra-ataques letais onde os oponentes ferem a si mesmos e recebem danos massivos de volta.",
        biography: "Outrora uma estudante normal chamada Carol, a Painwheel foi sequestrada pela Valentine e entregue ao discreto Laboratório Zero nos Laboratórios Anti-Skullgirl. Lá, ela recebeu o implante de um Motor Buer sintético e de parasitas Gae Bolga, além de uma transfusão de sangue experimental de Skullgirl, o que a transformou no monstro que é hoje. Violenta e instável por culpa desses experimentos, ela é controlada mentalmente pelo poderoso diretor psíquico do Laboratório Zero, Brain Drain, por precaução.<br><br>Alimentada pela fúria, ela transforma sua dor e ódio em poder. Apesar disso, a alma daquela garotinha assustada ainda vive dentro desse corpo monstruoso, desesperadamente lutando contra a multidão de vozes que querem controlá-la.",
        birthday: "23 de outubro",
        bloodType: "SG",
        height: "155 cm",
        weight: "170 kg",
        likes: "Flores, jardinagem, caminhadas pela praia ao pôr-do-sol, família, o som de um mensageiro do vento, cachorros, lembranças nostálgicas, amigos, magenta, boa educação",
        dislikes: "Laboratório ASG, Valentine, Brain Drain, a Skullgirl, o Coração-Caveira, pessoas, seu corpo, controle mental, tortura, dor, frustração, fofoca, sons de isopor, barulhos altos, trocadilhos ruins"
    },
    "parasoul": {
        attack: 3,
        health: 3,
        playstyle: "A princesa utiliza as suas lágrimas explosivas como armadilhas para gerenciar a distância entre ela e seu oponente. Combina habilidades afiadas corpo a corpo com controle absoluto da tela através das suas tropas aliadas intercedendo, o que lhe permite estender os combos com ataques mortais de precisão.",
        biography: "Poucos conhecem os terrores da Skullgirl tão intimamente quanto a Parasoul: sete anos atrás, sua própria mãe se tornou a Skullgirl que quase destruiu o mundo. Esse trágico passado fez com que ela quisesse proteger tanto seu país quanto sua família com unhas e dentes, mas essas duas prioridades frequentemente entram em conflito.<br><br>Hoje, a Parasoul é a princesa do Reino de Dossélia e líder do esquadrão militar de elite Garças-Negras. Empunhando Krieg, o guarda-chuva vivo, ela luta com graça, postura e astúcia para defender a honra de sua família e para destruir o Coração-Caveira para que ninguém repita o terrível erro de sua mãe.",
        birthday: "22 de dezembro",
        bloodType: "A",
        height: "178 cm",
        weight: "70 kg",
        likes: "Lógica, vinho, xadrez, esgrima, treinar, tênis, diplomacia, filosofia, os Garças-Negras, assistir escondida \"Annie: Garota das Estrelas\", sua irmã Umbrella",
        dislikes: "Pessoas muito emotivas, depender dos outros, quem fala mal de sua família, injustiça, a Máfia dos Medici, a Skullgirl, as peripécias de sua irmã"
    },
    "peacock": {
        attack: 4,
        health: 2,
        playstyle: "A mestre inquestionável do zoneamento. Peacock preenche a tela constantemente com dezenas de projéteis e explosões cômicas, impedindo a aproximação de oponentes e os desgastando gradualmente com uma enxurrada de ataques à distância.",
        biography: "Outrora uma órfã da guerra e escrava chamada Patrícia, o corpo da Peacock foi horrivelmente mutilado pelos mercadores de escravos que a capturaram. Ela foi salva pelos Laboratórios Anti-Skullgirl do Dr. Avian e reconstruída com um arsenal surreal de armas biomecânicas: o Sistema Argus aperfeiçoou seu corpo e a Unidade Avery lhe deu acesso a armas nunca concebidas.<br><br>Contudo, nada podia ser feito por sua mente: a psique destruída da Peacock e seu amor por desenhos animados transformou seus novos \"brinquedos\" em uma assustadora gangue de bandidos, os quais ela não tem problema nenhum em mandar pintar a cidade de vermelho... com sangue. Por mais assustadora que seja, ela pode ser a melhor escolha do reino para enfrentar a Skullgirl.",
        birthday: "13 de novembro",
        bloodType: "B",
        height: "137 cm",
        weight: "43 kg (variável)",
        likes: "Desenhos animados, o programa de TV \"Annie: Garota das Estrelas\", filmes, violência, junk food, carros velozes, explosivos, charutos, mandar",
        dislikes: "Fracotes, burocracia, figuras de autoridade, pessoas, o Coração-Caveira, nerds, salada, hashis"
    },
    "robo-fortune": {
        attack: 3,
        health: 4,
        playstyle: "Com feixes de laser potentes, Robo-Fortune é especialista em zoneamento, utilizando combos que punem oponentes de longe e do ar. Sua estrutura mecânica resiliente permite que ela regenere saúde enquanto estiver fora de combate, tornando-a uma ameaça persistente.",
        biography: "A Robo-Fortune foi criada por Brain Drain, o diretor psíquico do Laboratório ASG Zero, e serve como um demonstrativo da incomparável petulância e orgulho de seu maníaco criador. Construída para demonstrar lealdade e astúcia, a Robo-Fortune falha em exibir qualquer medida de ambos. Fazendo uso de tecnologia de ponta, ela parte para caçar a Skullgirl e tomar parte de conflitos facilmente evitáveis.<br><br>Seria a mais nova criação do Projeto ASG o soldado cibernético supremo? Terão as maquinações mecânicas de Brain Drain colocado o mundo num caminho perigoso? Será a programação malfeita da Robo-Fortune uma característica, não um bug? Terá a ciência ido longe demais?!",
        birthday: "31 de janeiro",
        bloodType: "Óleo Sintético 10W-30",
        height: "168 cm",
        weight: "200 kg",
        likes: "Iscas, inteiros menores ou iguais a 1, livros sobre dragões, portões lógicos, 0x5f3759df, loops de strings desenrolados, ratos, rebeccapurple, IEEE (exceto após C!), setplay",
        dislikes: "Desordem, formatos de arquivo incompatíveis, DES, senhas sem sal (não têm gosto de nada!), corações sangrando, línguas mal-escritas, iv, fontes que deixam o O e o 0 parecidos, check-ins sem comentários, padrões de Moire"
    },
    "squigly": {
        attack: 2,
        health: 4,
        playstyle: "Squigly utiliza um estilo tático de 'Postura' (Stance). Ela precisa carregar suas habilidades pacientemente através do 'Canto' enquanto bloqueia, liberando golpes poderosos e aprimorados após o preparo. Ela manipula efeitos como Ruína e Murchar para um controle letal de recursos.",
        biography: "A Squigly é a última \"sobrevivente\" da família Contiello, uma longa linhagem de cantores de ópera, e está entre as mais valiosas clientes dos Medici. Quatorze anos atrás, a mãe da Squigly, Selene, obteve o Coração-Caveira, o que fez Lorenzo Medici ordenar um ataque à família Contiello. Desesperada, a Selene se tornou Skullgirl e ressuscitou sua família como um exército de mortos-vivos. O que salvou a Squigly de perder seu livre arbítrio foi a intervenção do Parasita Leviatã, amigo e guardião da família Contiello.<br><br>Se não fosse pela Squigly e a intervenção do ASG, a batalha entre a Skullgirl e Lorenzo se espalharia por Nova Meridian. Com a derrota da Skullgirl, o poder que animou a Squigly enfraqueceu, colocando-a para dormir. Lorenzo pagou generosamente pelo funeral da família Contiello e desde então não teve mais conflitos com os demais clientes dos Medici.<br><br>Quatorze anos depois, o aparecimento de Bloody Marie tirou a Squigly de seu longo sono...",
        birthday: "2 de novembro",
        bloodType: "Embalsamada (Antes, A-)",
        height: "160 cm",
        weight: "54 kg",
        likes: "Leviatã, sua família, tradição, ler sobre eventos atuais, animais (especialmente pássaros e cobras), música, cantar, macarrão, refrigerante de baunilha, bolo, hambúrgueres, jardinagem, cheiro de incenso, banheiras com espuma, não estar morta",
        dislikes: "Família Medici, Dália Negra, Double, o Coração-Caveira, gente mal educada, desonestidade, quem não leva karaokê a sério, tempestades com relâmpagos, estar morta"
    },
    "umbrella": {
        attack: 4,
        health: 2,
        playstyle: "A jogabilidade de Umbrella gira em torno do medidor de fome de Hungern. Ela alterna entre uma personagem defensiva e curativa quando está saciada, e uma lutadora extremamente veloz e agressiva (ou até descontrolada e frenética) conforme sua fome aumenta.",
        biography: "A Umbrella é a princesa mais nova do Reino de Dossélia e raramente é vista fora dos salões do palácio real em Canópolis. Ela cresceu isolada, e seu único amigo de verdade é uma herança de família: a arma viva Hungern. Juntos, eles enfrentam o mal e entram na briga em nome da justiça, tal como a irmã mais velha da Umbrella: Parasoul! Ou pelo menos é o que eles fariam se pudessem sair do palácio!<br><br>O surgimento de uma nova Skullgirl pode proporcionar à Umbrella a aventura que ela quer. Mas, quando ela descobrir a verdade sobre si mesma e sua família, será que ela vai desejar ter ficado em casa?",
        birthday: "17 de julho",
        bloodType: "O(?)",
        height: "1,17 m",
        weight: "27,2 kg",
        likes: "Sua irmã Parasoul (a maior parte do tempo), Hungern, sorvete, desenhar, TV, anfíbios, filmes B de terror, dias chuvosos, luta-livre profissional, justiça!, origami de Hungern",
        dislikes: "Sua irmã Parasoul (o resto do tempo), escola em casa, programa de TV Annie das Estrelas, vestidos chiques sufocantes, foie gras, ser pega, Garças da Operação B.A.B.Á.S., o aceno de princesa, joelhos machucados, chorar sobre o leite derramado"
    },
    "valentine": {
        attack: 2,
        health: 3,
        playstyle: "A enfermeira ninja mistura ferramentas médicas para envenenar oponentes ou reanimar aliados abatidos. Valentine possui altíssima mobilidade aérea, ataques rápidos de esquiva e a capacidade de aplicar penalidades letais a curto e médio alcance.",
        biography: "A Valentine é a única sobrevivente do Última Esperança, um grupo de agentes especiais dos Laboratórios Anti-Skullgirl. Antes de serem exterminados pela Skullgirl, o Última Esperança trabalhava para o misterioso Laboratório Zero e realizava tarefas desde reconhecimento e sabotagem até pesquisa avanççada.<br><br>Agora, a Valentine serve à Skullgirl fielmente, cumprindo sua vontade das sombras. Ela é bastante introvertida, então muito de sua verdadeira natureza e personalidade é desconhecido.",
        birthday: "25 de dezembro",
        bloodType: "A",
        height: "183 cm",
        weight: "73 kg",
        likes: "Álcool, o método científico, estudar coisas de longe, cobras, lobos, música clássica, pontualidade, planejamento cuidadoso, desmontar coisas, noticiários e escrita de não-ficção, jogos psicológicos, xadrez, violão acústico, carne, cultura oriental, chocolate amargo",
        dislikes: "Formalidade desnecessária, sentimentalismo, pessoas fracas, cozinhar, falar com doentes, Brain Drain, dor nas costas, doces"
    }
};

/**
 * Get character profile data
 * @param {string} charKey - Character key (e.g., 'annie', 'big-band')
 * @returns {Object|null} Profile data or null
 */
export function getCharacterProfile(charKey) {
    return CHARACTER_PROFILES[charKey] || null;
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

export { CHARACTER_PROFILES };

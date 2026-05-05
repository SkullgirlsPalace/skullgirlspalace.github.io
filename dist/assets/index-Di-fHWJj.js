(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function t(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(s){if(s.ep)return;s.ep=!0;const n=t(s);fetch(s.href,n)}})();const Pt="modulepreload",Mt=function(e){return"/"+e},ja={},re=function(a,t,o){let s=Promise.resolve();if(t&&t.length>0){let r=function(d){return Promise.all(d.map(p=>Promise.resolve(p).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),c=(l==null?void 0:l.nonce)||(l==null?void 0:l.getAttribute("nonce"));s=r(t.map(d=>{if(d=Mt(d),d in ja)return;ja[d]=!0;const p=d.endsWith(".css"),u=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${u}`))return;const m=document.createElement("link");if(m.rel=p?"stylesheet":Pt,p||(m.as="script"),m.crossOrigin="",m.href=d,c&&m.setAttribute("nonce",c),document.head.appendChild(m),p)return new Promise((b,f)=>{m.addEventListener("load",b),m.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${d}`)))})}))}function n(r){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=r,window.dispatchEvent(l),!l.defaultPrevented)throw r}return s.then(r=>{for(const l of r||[])l.status==="rejected"&&n(l.reason);return a().catch(n)})},Xe={"pt-BR":{nav:{home:"Início",characters:"Personagens",guide:"Guia",calculator:"Calculadora",about:"sobre"},home:{heroTitle:"Skullgirls Palace",heroSubtitle:"Sua fonte completa de builds, calculadoras e estratégias para Skullgirls Mobile.",characters:"PERSONAGENS",guide:"GUIA",calculator:"CALCULADORA",hub:"SKULLGIRLS MOBILE HUB",about:"SOBRE"},about:{title:"Sobre o Projeto",close:"×",heroTitle:"Skullgirls Palace",heroSubtitle:"Sua fonte completa de builds, calculadoras e estratégias para Skullgirls Mobile. Um projeto da comunidade Palácio Branco.",discord:"Discord",github:"GitHub",buildsTitle:"Builds Recomendadas",buildsDesc:"O intuito de recomendar uma Build, Superior e Arsenal é para facilitar sua Vida e você desempenhar melhor com sua Variante Favorita sem precisar ficar perguntando de tantos lugares, foi tudo montado por bons jogadores e boa parte das recomendações são boas, eu espero. Em caso de erros reporte no Servidor do Discord.",calculatorTitle:"Calculadora",calculatorDesc:"Simule seus Ganhos mensais de Moedas e Teonitas, calcule também o quanto é necessário para Gastar em Moedas para Melhorar suas Variantes, Golpes, Astros e etc...",creditsTitle:"Créditos",creditsDevs:"Desenvolvido por <strong>Lifi ツ</strong> e <strong>João Pedro</strong>.",inspiration:"Inspiração Principal e Colaborador:",sources:"Fontes oficiais utilizadas:",assetsNote:"Assets originais pertencem à Autumn Game e Hidden Variable Studios.",disclaimerBtn:"Aviso Legal",disclaimerTitle:"Aviso Legal:",disclaimerText1:"Projeto de Fã - Não afiliado à Autumn Games ou Hidden Variable Studios.",disclaimerText2:"Todos os assets pertencem aos seus respectivos proprietários.",reportBug:"Encontrou algum erro ou bug? Reporte no",serverName:"Servidor Palácio Branco"},characters:{title:"Personagens",selectCharacter:"Escolha um Personagem",searchPlaceholder:"Pesquisar Variantes",allCharacters:"Todas as Variantes"},guide:{title:"Guia",tutorials:"Tutoriais",statistics:"Estatísticas",modifiers:"Modificadores",catalysts:"Catalisadores",passiveIncomeTitle:"Renda Passiva",passiveIncomeDesc:"Aprenda a maximizar seus ganhos diários e semanais sem gastar teonitas.",maxStats:"Estatísticas Máximas",hideImage:"Ocultar Imagem",showImage:"Mostrar Imagem",positiveEffects:"Efeitos Positivos",negativeEffects:"Efeitos Negativos",permanentEffect:"Efeito Permanente",icon:"Ícone",name:"Nome",effectDesc:"Descrição do Efeito",max:"Máx",maxUndefined:"Indefinido",gameDescription:"Descrição do Jogo",explanation:"Explicação",scaling:"Escala",weekModifiers:"Modificadores da Semana",loadingCatalysts:"Carregando catalisadores...",errorCatalysts:"Erro ao carregar catalisadores.",riftCatalysts:"Catalisadores da Fenda",catalystsLoaded:"Catalisadores Carregados",noModifiersElement:"Nenhum modificador encontrado para este elemento."},element:{fire:"Fogo",water:"Água",wind:"Vento",light:"Luz",dark:"Trevas",neutral:"Neutro"},filter:{filterBtn:"Filtrar",clear:"Limpar",clearAll:"Limpar Tudo",clearAdvanced:"Limpar",score:"Pontuação",atk:"Ataque",hp:"Vida",alpha:"Ordem Alfabética",element:"Elemento",category:"Categoria",organize:"Organizar",changeCharacter:"Trocar Personagem",chooseCharacter:"Escolher Personagem",supportShort:"Suporte"},calc:{title:"Calculadora",intro:"Simule seus Ganhos mensais de Moedas e Teonitas, calcule também o quanto é necessário para Gastar em Moedas para Melhorar suas Variantes, Golpes, Astros e etc...",earnings:"Ganhos",costs:"Custos",fixedSources:"Fontes Fixas",dailyEvents:"Eventos Diários",calendar:"Calendário",site:"Site",guildMissions:"Missões de Guilda",battlePass:"Passe de Batalha",free:"Gratuito",premium:"Premium",prizeFights:"Disputas Premiadas",pfCharacter:"Personagem da DP",pfRanking:"Ranking da DP",pfMonthly:"DP Mensal",pfParticipate:"Participar da DP?",pfMedicis:"DP Medicis",noParticipate:"Não participar",parallelRealms:"Reinos Paralelos",difficulty:"Dificuldade",basic:"Básico",advanced:"Avançado",expert:"Especialista",master:"Mestre",nightmare:"Pesadelo",noMercy:"Sem Piedade",completeness:"Completude",minimum:"Mínimo",maximum:"Máximo",guild:"Guilda",guildEvents:"Eventos de Guilda",battleTier:"Tier da Guilda",noParticipateGuild:"Não participar",guildPoints:"Pontos de Guilda",estimatedResult:"Resultado Estimado",monthlyCoins:"Moedas Mensais",perWeek:"/semana",monthlyTheonite:"Teonitas Mensais",moves:"Golpes",moveRarity:"Raridade do Golpe",noMoves:"Nenhum",shinyDiscount:"Desconto Shiny",desiredLevel:"Nível Desejado",custom:"Personalizado",level:"Nível",initialLevel:"Nível Inicial",astros:"Astros",astroRarity:"Raridade do Astro",noAstro:"Nenhum",totalBuildCost:"Custo Total do Upgrade",breakdown:"Detalhamento",coins:"moedas",theonite:"theonitas",moveCost:"Custo do Golpe",moveCostPlural:"Custo dos Golpes",characterRarity:"Custo do Personagem",astroCost:"Custo do Astro",evolutionPo:"Pontos de Evolução",totalCoins:"Total de Moedas",totalPo:"Total de Pontos de Evolução",shinyNotes:"(shiny: 50% de desconto)",altCoins:"Moedas",altTheonite:"Teonita",top10:"Top 10%",top30:"Top 30%",top60:"Top 60%",top100:"Top 100",lv:"Lv",shiny:"shiny",pf:"DP"},rarity:{bronze:"Bronze",silver:"Prata",gold:"Ouro",diamond:"Diamante"},common:{loading:"Carregando...",error:"Erro ao carregar página",backHome:"Voltar ao Início",reload:"Recarregar",initError:"Erro ao inicializar a aplicação",scrollToTop:"Voltar ao topo",scrollToBottom:"Ir para o final",altNew:"Novo",altHealth:"Vida"},footer:{title:"Skullgirls Palace",description:"Sua fonte completa de builds, guias e mais para Skullgirls Mobile.",creditsTitle:"Créditos",creditsDevs:"Desenvolvido por <strong>Lifi ツ</strong> e <strong>João Pedro</strong>.",inspiration:"Inspiração Principal e Colaborador:",sources:"Fontes oficiais:",officialLinksTitle:"Links Oficiais",officialSite:"Site Oficial SGM",hub:"Skullgirls Mobile Hub",assetsNote:"Assets originais pertencem à Autumn Games e Hidden Variable Studios.",feedbackTitle:"Feedback",reportBug:"Encontrou algum erro ou bug? Reporte no",serverName:"Servidor Palácio Branco",disclaimer:"Projeto de fã não afiliado aos desenvolvedores oficiais."},variant:{ability:"Habilidade",build:"Build",signatureAbility:"HABILIDADE CARACTERÍSTICA",recommendedBuild:"BUILD RECOMENDADA",recommendedArsenal:"ARSENAL RECOMENDADO",recommendedMarquee:"HABILIDADE SUPERIOR RECOMENDADA",attack:"Ataque",health:"Vida",power:"Pontuação",noVariants:"Nenhuma variante encontrada com estes filtros.",class:"CLASSE",information:"Informações",builds:"BUILDS",tierList:"TIER LIST",exclusive:"Exclusivo"},detail:{characterNotFound:"Personagem não encontrado",filters:"Filtros Avançados",sortBy:"Ordenar por",rarity:"Raridade",element:"Elemento",profileOf:"Ficha de",aboutChar:"Sobre",noVariantsFilters:"Nenhuma variante encontrada com estes filtros.",allVariants:"TODAS AS VARIANTES"},tier:{tierlistTitle:"Tier List",chooseChar:"Escolha um personagem para ver sua tier list.",variant:"Variante",dpAttack:"DP Ataque",parallelRealms:"Reinos Paralelos",riftAttack:"Fenda Ataque",riftDefense:"Fenda Defesa",notes:"Notas",rankSS:"Rank absoluto. Dominante no meta, essencial para qualquer conta.",rankS:"Rank excelente. Altamente competitivo e versátil.",rankA:"Rank ótimo. Sólido e confiável na maioria dos cenários.",rankB:"Rank bom. Viável com investimento adequado.",rankC:"Rank mediano. Funcional mas limitado em cenários competitivos.",rankI:"Rank inferior. Difícil de usar efetivamente.",rankNA:"Não aplicável. Sem dados suficientes para avaliação.",classes:"Classes",defensive:"Defensivo",noVariants:"Nenhuma variante encontrada."},catalysts:{title:"Catalisadores",intro:"Catalisadores são itens especiais que modificam as condições de batalha na Fenda. Eles podem fortalecer ou enfraquecer certos elementos e atributos, criando vantagens estratégicas.",weekModifiers:"Modificadores da Semana",selectElement:"Selecione um elemento para ver os modificadores da semana.",loading:"Carregando catalisadores...",errorLoad:"Erro ao carregar catalisadores.",noElementFound:"Nenhum catalisador específico deste elemento encontrado.",addNotes:"Adicionar notas..."},tutorial:{title:"O Manifesto da Renda Passiva",subtitle:"Um Decreto sobre a Eficiência na Fenda de Skullgirls Mobile",edition:"EDIÇÃO ATUALIZADA",preamble:'I. Preâmbulo: A Tirania do "Grind"',preamble1:"Nós, os jogadores conscientes do nosso tempo, reunidos em busca de justa recompensa pelo esforço calculado, vimos por este meio declarar nossa filosofia. A Fenda (Rift), em sua estrutura atual, apresenta uma disparidade injusta: a recompensa por alcançar o pináculo do Diamante 1-3 é marginalmente superior àquela do Diamante 4, contudo, o esforço exigido é exponencialmente maior.",preamble2:'Rejeitamos a corrida dos ratos. Rejeitamos o "grind" que consome horas de vida em troca de retornos decrescentes. Este manifesto é a nossa declaração de independência, baseado na filosofia do 80/20: obter 80% dos resultados com apenas 20% do esforço.',preamble3:"Este é o caminho da Renda Passiva.",pillars:"II. Os Pilares da Eficiência",pillarsIntro:"Para alcançar e manter o Diamante 4 com o mínimo de desgaste, decretamos os seguintes pilares como lei:",pillar1Title:'1. O Pilar do "Timing" Divino:',pillar1Desc:"Os cinco (5) ataques obrigatórios serão realizados no domingo à tarde. Idealmente, após a missa, quando munidos do <strong>BUFF</strong> divino, e quando a elite da Fenda já ascendeu, deixando para trás bases mais fracas e menor risco de retaliação.",pillar2Title:"2. O Pilar da Discrição (O Ponto 1480):",pillar2Desc:"Nosso objetivo não é a glória, mas a constância. Manter-se-á uma pontuação próxima a 1480. Ultrapassar os 1500 pontos é convidar o perigo e tornar-se um alvo desnecessário. Com cinco vitórias fáceis, esta faixa é atingida sem alarde.",pillar3Title:"3. O Pilar da Caça Seletiva:",pillar3Desc:"Atacaremos somente bases mais fracas ou evidentemente fáceis. A honra não enche o cofre de Teopontos; a vitória fácil, sim.",pillar4Title:"4. O Pilar da Compensação:",pillar4Desc:"Ocasionalmente, seremos atacados. Cada derrota na defesa durante a semana será considerada como um ataque adicional a ser feito no domingo, garantindo a manutenção da nossa faixa de pontos.",decree:"III. O Decreto da Base Econômica",decreeIntro:"Uma base de Renda Passiva não é construída com diamantes inúteis, mas com investimentos inteligentes que servem tanto à defesa quanto ao ataque. A ordem de prioridade é absoluta:",priority1Title:'Prioridade I: Os Diamantes "Curinga"',priority1Desc:"Unidades de valor duplo, que fortalecem o ataque e a defesa simultaneamente. Elas são o alicerce de toda a conta e, portanto, da Fenda. Focai vossos recursos aqui antes de tudo:",priority1Items:"Desejo de Morte|Hóstia Profana|Fantoche Sombrio|Ameaça Mascarada (O ganha-ganha, buildada para defesa mesmo no ataque)|Neuromancer e Papa Moscas (Com Sangue Maculado, sua superior dispensa build defensiva)",priority2Title:'Prioridade II: Os Ouros "Absurdos"',priority2Desc:"O pão e a manteiga da nossa defesa. Economicamente viáveis, rápidos de evoluir (especialmente suas habilidades superiores) e, após o <strong>BUFF</strong> da v7.7, mais potentes do que nunca. Com golpes e astro no nível 9, eles entregam o máximo custo-benefício. Esta será a maioria da nossa base:",priority2Items:"Cachinhos Malvados|Tela Azul (Funciona em ambos os nós solo)|GI Jazz (O único Big Band defensivo que honraremos)|Forças Armadas|Maldade Eterna|Fibra Forte (!!!!!)|Painwheels adicionais com Sangue Maculado|(Opcional: Última Esperança, embora menos potente)",priority3Title:"Prioridade III: A Elite Defensiva (O Toque Final)",priority3Desc:"Com a base de Curingas e Ouros estabelecida, necessitamos apenas de um ou dois especialistas. Estes são os guardiões que evitam o ataque, contribuindo passivamente para nossa renda. Não há segredo:",priority3Items:"Replicada|Megalomaníaca",alchemy:"IV. A Alquimia dos Catalisadores",alchemy1:"A transição do Ouro para o Diamante 4 exige uma mudança na gestão de tesouros. No Diamante, a Chave de Diamante é garantida e o baú rende 20% de progresso, contra miseráveis 8% do Ouro 1. Portanto, vossa missão é parar de comprar chaves com moedas de fenda e iniciar o investimento em Catalisadores.",alchemy2:"Não temais a escassez! As Disputas Premiadas de Diamante e o Concílio das Guildas proverão vossas chaves. Uma vez que vossos guerreiros estejam prontos, focai na Alquimia até que toda a base esteja encantada com catalisadores nível 9 ou superior.",forgeTitle:"Ordenanças de Forja:",forgeGeneric:"Genéricos (Nível 9):",forgeGenericItems:" Autoimune, BLOCKBUSTED, Hora de Enfeitiçar, Luta Final, Maldição do Conhecimento, O Vacilão Nervoso e Previsão Definhante.",forgeGenericNote:"Espalhai-os conforme a necessidade.",forgeWind:"Específicos de Vento (Nível 11):",forgeWindItems:'"No Ar Rarefeito" é obrigatório. "Resistência Fútil" (Big Band) deve sustentar vosso duo de vento para repelir invasores.',guild:"V. O Concílio das Guildas",guild1:"As Guildas são fontes valiosas de recursos, abarcando mais jogadores em suas glórias do que a própria Fenda. Contudo, elas exigem que vossa base de Fenda esteja sólida. O investimento na base é único; os Bosses da Guilda demandam especificidades que só devem ser buscadas após a estabilidade da Renda Passiva.",guild2:"Sede membros úteis, cumpri vossas missões e usai vosso arsenal atual. Não sacrifiqueis vossa base de Fenda para perseguir metas efêmeras de Bosses antes do tempo.",citadel:"VI. O Mapa da Cidadela (Exemplo de Base)",citadelDesc:"Para ilustrar estas leis, apresentamos a visualização sagrada de uma base construída sob a égide da eficiência e da renda passiva:",citadelImgAlt:"[Mapa da Base Recomendada]",citadelCaption:"Referência visual: A disposição tática dos guardiões e catalisadores.",imgNotFound:"Imagem da Base Não Encontrada",conclusion:"VII. Conclusão",conclusion1:'Que este manifesto seja o guia para aqueles que buscam a recompensa sem a exaustão. Que a Renda Passiva flua. Jogue com inteligência, não com "grind".',conclusionSignature:"- Proclamado pelos Sábios da Eficiência -",versionDate:"Versão Atualizada - Dezembro de 2025"},profile:{about:"Sobre",abilities:"Habilidades",abilitiesNA:"Habilidades não disponíveis.",attack:"Ataque",biography:"Biografia",biographyNA:"Biografia não disponível.",birthday:"Aniversário",bloodType:"Tipo Sanguíneo",characterAbility:"Habilidade do Personagem",close:"Fechar",critlessClick:"Clique para ver o Guia Critless",critlessRecommended:"Recomendado Critless",dislikes:"Desgosta",essentialData:"Dados Essenciais",essentialDataNA:"Dados essenciais não disponíveis.",expandAlt:"Expandir/Recolher alternativas",health:"Vida",height:"Altura",likes:"Gosta",marqueeDetails:"Detalhes do Marquee",moves:"Golpes",noDescription:"Sem descrição disponível.",noMoves:"Nenhum movimento disponível.",noVariants:"Nenhuma variante disponível.",others:"OUTROS",playstyle:"Estilo de Jogo",playstyleNA:"Estilo de jogo não disponível.",prestigeAbility:"Habilidade de Prestígio",specialMoves:"GOLPES ESPECIAIS",blockbusters:"BLOCKBUSTERS",superiorAbility:"Habilidade Superior",totalMoves:"Total de Movimentos",totalVariants:"Total de Variantes",unknown:"Desconhecido",variants:"Variantes",weight:"Peso"},tooltip:{element:"Elemento",buffEffect:"Efeito Positivo",debuffEffect:"Efeito Negativo",elementEffects:"Efeitos por Elemento",clickForDetails:"Clique para detalhes",max:"Máx: {value}",maximum:"Máximo: {value}",maxLabel:"Máx: ",stack:"Acúmulo: {value}",scaling:"Escala: {value}",elementTable:"Tabela de Elementos",critlessGuide:"Guia Critless",summary:"Resumo",explanation:"Explicação",moveDescription:"Descrição do Golpe",description:"Descrição",accumulation:"Acúmulo",positiveEffect:"Efeito Positivo",negativeEffect:"Efeito Negativo",term:"Termo",classRole:"Classe/Função",close:"Fechar"},error:{pageLoad:"Erro ao carregar página",backToHome:"Voltar ao Início",appInit:"Erro ao inicializar a aplicação",reload:"Recarregar"}},en:{nav:{home:"Home",characters:"Characters",guide:"Guide",calculator:"Calculator",about:"about"},home:{heroTitle:"Skullgirls Palace",heroSubtitle:"Your complete source for builds, calculators, and strategies for Skullgirls Mobile.",characters:"CHARACTERS",guide:"GUIDE",calculator:"CALCULATOR",hub:"SKULLGIRLS MOBILE HUB",about:"ABOUT"},about:{title:"About the Project",close:"×",heroTitle:"Skullgirls Palace",heroSubtitle:"Your complete source for builds, calculators, and strategies for Skullgirls Mobile. A project from the Palácio Branco community.",discord:"Discord",github:"GitHub",buildsTitle:"Recommended Builds",buildsDesc:"The purpose of recommending a Build, Superior and Arsenal is to make your life easier and help you perform better with your Favorite Variant without having to ask around from so many places. Everything was put together by good players and most of the recommendations are good, I hope. If you find errors, report them on our Discord Server.",calculatorTitle:"Calculator",calculatorDesc:"Simulate your monthly Coin and Theonite earnings, and calculate how much you need to spend on Coins to upgrade your Variants, Moves, Astros, and more...",creditsTitle:"Credits",creditsDevs:"Developed by <strong>Lifi ツ</strong> and <strong>João Pedro</strong>.",inspiration:"Main Inspiration and Collaborator:",sources:"Official sources used:",assetsNote:"Original assets belong to Autumn Game and Hidden Variable Studios.",disclaimerBtn:"Legal Notice",disclaimerTitle:"Legal Notice:",disclaimerText1:"Fan Project - Not affiliated with Autumn Games or Hidden Variable Studios.",disclaimerText2:"All assets belong to their respective owners.",reportBug:"Found an error or bug? Report it on",serverName:"Palácio Branco Server"},characters:{title:"Characters",selectCharacter:"Select a Character",searchPlaceholder:"Search Variants",allCharacters:"All Variants"},guide:{title:"Guide",tutorials:"Tutorials",statistics:"Statistics",modifiers:"Modifiers",catalysts:"Catalysts",passiveIncomeTitle:"Passive Income",passiveIncomeDesc:"Learn how to maximize your daily and weekly earnings without spending theonites.",maxStats:"Max Stats",hideImage:"Hide Image",showImage:"Show Image",positiveEffects:"Positive Effects",negativeEffects:"Negative Effects",permanentEffect:"Permanent Effect",icon:"Icon",name:"Name",effectDesc:"Effect Description",max:"Max",maxUndefined:"Undefined",gameDescription:"Game Description",explanation:"Explanation",scaling:"Scaling",weekModifiers:"Week Modifiers",loadingCatalysts:"Loading catalysts...",errorCatalysts:"Error loading catalysts.",riftCatalysts:"Rift Catalysts",catalystsLoaded:"Catalysts Loaded",noModifiersElement:"No modifiers found for this element."},element:{fire:"Fire",water:"Water",wind:"Wind",light:"Light",dark:"Dark",neutral:"Neutral"},filter:{filterBtn:"Filter",clear:"Clear Filters",clearAll:"Clear All",clearAdvanced:"Clear",score:"Score",atk:"Attack",hp:"Health",alpha:"Alphabetical Order",element:"Elemento",category:"Category",organize:"Organize",changeCharacter:"Change Character",chooseCharacter:"Choose Character",supportShort:"Support"},calc:{title:"Calculator",intro:"Simulate your monthly Coin and Theonite earnings, and calculate how much you need to spend on Coins to upgrade your Variants, Moves, Astros, and more...",earnings:"Earnings",costs:"Costs",fixedSources:"Fixed Sources",dailyEvents:"Daily Events",calendar:"Calendar",site:"Site",guildMissions:"Guild Missions",battlePass:"Battle Pass",free:"Free",premium:"Premium",prizeFights:"Prize Fights",pfCharacter:"PF Character",pfRanking:"PF Ranking",pfMonthly:"Monthly PF",pfParticipate:"Participate in PF?",pfMedicis:"PF Medicis",noParticipate:"Don't participate",parallelRealms:"Parallel Realms",difficulty:"Difficulty",basic:"Basic",advanced:"Advanced",expert:"Expert",master:"Master",nightmare:"Nightmare",noMercy:"No Mercy",completeness:"Completeness",minimum:"Minimum",maximum:"Maximum",guild:"Guild",guildEvents:"Guild Events",battleTier:"Guild Tier",noParticipateGuild:"Don't participate",guildPoints:"Guild Points",estimatedResult:"Estimated Result",monthlyCoins:"Monthly Coins",perWeek:"/week",monthlyTheonite:"Monthly Theonite",moves:"Moves",moveRarity:"Move Rarity",noMoves:"None",shinyDiscount:"Shiny Discount",desiredLevel:"Desired Level",custom:"Custom",level:"Level",initialLevel:"Initial Level",astros:"Astros",astroRarity:"Astro Rarity",noAstro:"None",totalBuildCost:"Total Upgrade Cost",breakdown:"Breakdown",coins:"coins",theonite:"theonite",moveCost:"Move Cost",moveCostPlural:"Moves Cost",characterRarity:"Character Cost",astroCost:"Astro Cost",evolutionPo:"Evolution Points",totalCoins:"Total Coins",totalPo:"Total Evolution Points",shinyNotes:"(shiny: 50% discount)",altCoins:"Coins",altTheonite:"Theonite",top10:"Top 10%",top30:"Top 30%",top60:"Top 60%",top100:"Top 100",lv:"Lv",shiny:"shiny",pf:"PF"},rarity:{bronze:"Bronze",silver:"Silver",gold:"Gold",diamond:"Diamond"},common:{loading:"Loading...",error:"Error loading page",backHome:"Back to Home",reload:"Reload",initError:"Error initializing application",scrollToTop:"Back to top",scrollToBottom:"Go to bottom",altNew:"New",altHealth:"Health"},footer:{title:"Skullgirls Palace",description:"Your complete source for builds, guides and more for Skullgirls Mobile.",creditsTitle:"Credits",creditsDevs:"Developed by <strong>Lifi ツ</strong> and <strong>João Pedro</strong>.",inspiration:"Main Inspiration and Collaborator:",sources:"Official sources:",officialLinksTitle:"Official Links",officialSite:"SGM Official Site",hub:"Skullgirls Mobile Hub",assetsNote:"Original assets belong to Autumn Game and Hidden Variable Studios.",feedbackTitle:"Feedback",reportBug:"Found an error or bug? Report it on",serverName:"Palácio Branco Server",disclaimer:"Fan project not affiliated with official developers."},variant:{ability:"Ability",build:"Build",signatureAbility:"SIGNATURE ABILITY",recommendedBuild:"RECOMMENDED BUILD",recommendedArsenal:"RECOMMENDED ARSENAL",recommendedMarquee:"RECOMMENDED MARQUEE ABILITY",attack:"Attack",health:"Health",power:"Power",noVariants:"No variants found with these filters.",class:"CLASS",information:"Information",builds:"BUILDS",tierList:"TIER LIST",exclusive:"Exclusive"},detail:{characterNotFound:"Character not found",filters:"Advanced Filters",sortBy:"Sort by",rarity:"Rarity",element:"Element",profileOf:"Profile of",aboutChar:"About",noVariantsFilters:"No variants found with these filters.",allVariants:"ALL VARIANTS"},tier:{tierlistTitle:"Tier List",chooseChar:"Choose a character to view their tier list.",variant:"Variant",dpAttack:"DP Attack",parallelRealms:"Parallel Realms",riftAttack:"Rift Attack",riftDefense:"Rift Defense",notes:"Notes",rankSS:"Absolute rank. Dominant in the meta, essential for any account.",rankS:"Excellent rank. Highly competitive and versatile.",rankA:"Great rank. Solid and reliable in most scenarios.",rankB:"Good rank. Viable with proper investment.",rankC:"Average rank. Functional but limited in competitive scenarios.",rankI:"Inferior rank. Difficult to use effectively.",rankNA:"Not applicable. Insufficient data for evaluation.",classes:"Classes",defensive:"Defensive",noVariants:"No variants found."},catalysts:{title:"Catalysts",intro:"Catalysts are special items that modify battle conditions in the Rift. They can strengthen or weaken certain elements and attributes, creating strategic advantages.",weekModifiers:"Modifiers of the Week",selectElement:"Select an element to see the weekly modifiers.",loading:"Loading catalysts...",errorLoad:"Error loading catalysts.",noElementFound:"No catalysts found for this specific element.",addNotes:"Add notes..."},tutorial:{title:"The Manifesto of Passive Income",subtitle:"A Decree on Efficiency in the Skullgirls Mobile Rift",edition:"UPDATED EDITION",preamble:'I. Preamble: The Tyranny of the "Grind"',preamble1:"We, the players conscious of our time, gathered in pursuit of fair reward for calculated effort, hereby declare our philosophy. The Rift, in its current structure, presents an unjust disparity: the reward for reaching the pinnacle of Diamond 1-3 is marginally superior to that of Diamond 4, yet the effort required is exponentially greater.",preamble2:'We reject the rat race. We reject the "grind" that consumes hours of life in exchange for diminishing returns. This manifesto is our declaration of independence, based on the 80/20 philosophy: obtain 80% of the results with only 20% of the effort.',preamble3:"This is the path of Passive Income.",pillars:"II. The Pillars of Efficiency",pillarsIntro:"To achieve and maintain Diamond 4 with minimal wear, we decree the following pillars as law:",pillar1Title:'1. The Pillar of Divine "Timing":',pillar1Desc:"The five (5) mandatory attacks shall be performed on Sunday afternoon. Ideally, after mass, when armed with the divine <strong>BUFF</strong>, and when the Rift elite has already ascended, leaving behind weaker bases and less risk of retaliation.",pillar2Title:"2. The Pillar of Discretion (The 1480 Point):",pillar2Desc:"Our goal is not glory, but consistency. A score close to 1480 shall be maintained. Exceeding 1500 points is inviting danger and becoming an unnecessary target. With five easy victories, this range is reached without fanfare.",pillar3Title:"3. The Pillar of Selective Hunting:",pillar3Desc:"We shall only attack weaker or evidently easy bases. Honor does not fill the Theonite coffers; easy victory does.",pillar4Title:"4. The Pillar of Compensation:",pillar4Desc:"Occasionally, we will be attacked. Each defense defeat during the week shall be considered as an additional attack to be made on Sunday, ensuring the maintenance of our score range.",decree:"III. The Decree of the Economic Base",decreeIntro:"A Passive Income base is not built with useless diamonds, but with smart investments that serve both defense and attack. The order of priority is absolute:",priority1Title:'Priority I: The "Wildcard" Diamonds',priority1Desc:"Dual-value units that strengthen both attack and defense simultaneously. They are the foundation of the entire account and, therefore, of the Rift. Focus your resources here before anything else:",priority1Items:"Death Wish|Unholy Host|Shadow Puppet|Masked Menace (The win-win, built for defense even on offense)|Neuromancer and Fly Trap (With Tainted Blood, their superior makes defensive builds unnecessary)",priority2Title:'Priority II: The "Absurd" Golds',priority2Desc:"The bread and butter of our defense. Economically viable, quick to evolve (especially their marquee abilities) and, after the <strong>BUFF</strong> of v7.7, more powerful than ever. With moves and skill tree at level 9, they deliver maximum cost-benefit. These will be the majority of our base:",priority2Items:"Dread Locks|Blue Screen (Works on both solo nodes)|GI Jazz (The only defensive Big Band we shall honor)|Armed Forces|Evergreen Evil|Immoral Fiber (!!!!!)|Additional Painwheels with Tainted Blood|(Optional: Last Hope, though less potent)",priority3Title:"Priority III: The Defensive Elite (The Finishing Touch)",priority3Desc:"With the foundation of Wildcards and Golds established, we need only one or two specialists. These are the guardians who deter attacks, passively contributing to our income. There is no secret:",priority3Items:"Reimaged|Megalomaniac",alchemy:"IV. The Alchemy of Catalysts",alchemy1:"The transition from Gold to Diamond 4 requires a change in treasure management. In Diamond, the Diamond Key is guaranteed and the chest yields 20% progress, compared to the miserable 8% of Gold 1. Therefore, your mission is to stop buying keys with rift coins and start investing in Catalysts.",alchemy2:"Fear not scarcity! Diamond Prize Fights and the Guild Council shall provide your keys. Once your warriors are ready, focus on Alchemy until the entire base is enchanted with level 9 or higher catalysts.",forgeTitle:"Forge Ordinances:",forgeGeneric:"Generic (Level 9):",forgeGenericItems:" Autoimmune, BLOCKBUSTED, Hexing Hour, Last Stand, Curse of Knowledge, Nervous Wrecker and Withering Prediction.",forgeGenericNote:"Spread them as needed.",forgeWind:"Wind-Specific (Level 11):",forgeWindItems:'"Thin Air" is mandatory. "Futile Resistance" (Big Band) must sustain your wind duo to repel invaders.',guild:"V. The Guild Council",guild1:"Guilds are valuable sources of resources, encompassing more players in their glories than the Rift itself. However, they require your Rift base to be solid. The investment in the base is singular; Guild Bosses demand specificities that should only be pursued after Passive Income stability.",guild2:"Be useful members, fulfill your missions and use your current arsenal. Do not sacrifice your Rift base to chase ephemeral Boss goals before the time is right.",citadel:"VI. The Citadel Map (Base Example)",citadelDesc:"To illustrate these laws, we present the sacred visualization of a base built under the aegis of efficiency and passive income:",citadelImgAlt:"[Recommended Base Map]",citadelCaption:"Visual reference: The tactical arrangement of guardians and catalysts.",imgNotFound:"Base Image Not Found",conclusion:"VII. Conclusion",conclusion1:'May this manifesto be the guide for those who seek reward without exhaustion. Let Passive Income flow. Play with intelligence, not with "grind".',conclusionSignature:"- Proclaimed by the Sages of Efficiency -",versionDate:"Updated Version - December 2025"},profile:{about:"About",abilities:"Abilities",abilitiesNA:"Abilities not available.",attack:"Attack",biography:"Biography",biographyNA:"Biography not available.",birthday:"Birthday",bloodType:"Blood Type",characterAbility:"Character Ability",close:"Close",critlessClick:"Click to view the Critless Guide",critlessRecommended:"Critless Recommended",dislikes:"Dislikes",essentialData:"Essential Data",essentialDataNA:"Essential data not available.",expandAlt:"Expand/Collapse alternatives",health:"Health",height:"Height",likes:"Likes",marqueeDetails:"Marquee Details",moves:"Moves",noDescription:"No description available.",noMoves:"No moves available.",noVariants:"No variants available.",others:"OTHERS",playstyle:"Playstyle",playstyleNA:"Playstyle not available.",prestigeAbility:"Prestige Ability",specialMoves:"SPECIAL MOVES",blockbusters:"BLOCKBUSTERS",superiorAbility:"Superior Ability",totalMoves:"Total Moves",totalVariants:"Total Variants",unknown:"Unknown",variants:"Variants",weight:"Weight"},tooltip:{element:"Element",buffEffect:"Buff Effect",debuffEffect:"Debuff Effect",elementEffects:"Element Effects",clickForDetails:"Click for details",max:"Max: {value}",maximum:"Maximum: {value}",maxLabel:"Max: ",stack:"Stack: {value}",scaling:"Scaling: {value}",elementTable:"Element Table",critlessGuide:"Critless Guide",summary:"Summary",explanation:"Explanation",moveDescription:"Move Description",description:"Description",accumulation:"Accumulation",positiveEffect:"Positive Effect",negativeEffect:"Negative Effect",term:"Term",classRole:"Class/Role",close:"Close"},error:{pageLoad:"Error loading page",backToHome:"Back to Home",appInit:"Error initializing application",reload:"Reload"}}};let oa=localStorage.getItem("language")||"pt-BR";function y(){return oa}function $t(e){Xe[e]&&(oa=e,localStorage.setItem("language",e),document.documentElement.lang=e,window.dispatchEvent(new CustomEvent("languageChanged",{detail:{language:e}})))}function i(e,a={}){const t=e.split(".");let o=Xe[oa];for(const n of t)if(o&&typeof o=="object"&&n in o)o=o[n];else{o=Xe["pt-BR"];for(const r of t)if(o&&typeof o=="object"&&r in o)o=o[r];else return e;break}if(typeof o!="string")return e;let s=o;for(const[n,r]of Object.entries(a))s=s.replace(new RegExp(`\\{${n}\\}`,"g"),r);return s}let De=null,ke=null,j=null;async function xt(){if(De)return De;try{return De=await(await fetch("data/krazete/ENGLISH-Variants.json")).json(),De}catch(e){return console.warn("Could not load Krazete EN data:",e),{}}}async function Ft(){if(ke)return ke;try{return ke=await(await fetch("data/krazete/PT-BR-Variantes.json")).json(),ke}catch(e){return console.warn("Could not load Krazete PT-BR data:",e),{}}}function le(e){return e?e.replace(/\r/g,"").trim():""}async function Nt(){if(j)return j;const[e,a]=await Promise.all([xt(),Ft()]);j={};for(const[t,o]of Object.entries(a)){const s=e[t];if(!s||!o)continue;const n=le(o.name);n&&(j[n]={name:le(s.name),ability:le(s.ability),SA1:s.SA1,SA2:s.SA2})}return j}async function Ut(){await Nt()}function z(e){var o;if(y()==="pt-BR"||!j)return e;const t=le(e);return((o=j[t])==null?void 0:o.name)||e}function qt(e,a){var s;if(y()==="pt-BR"||!j)return a;const o=le(e);return((s=j[o])==null?void 0:s.ability)||a}function Vt(e,a){if(y()==="pt-BR"||!j)return a;const o=le(e),s=j[o];if(!s||!s.SA1)return a;let n=`[SA1]: ${s.SA1}`;return s.SA2&&(n+=`

[SA2]: ${s.SA2}`),n}function zt(){const e=y();return`
  <section class="section" id="landing-hub">
    <div class="hub-container">
      
      <!-- Hero Section -->
      <div class="hub-hero">
        <div class="hero-main-row">
          <a href="javascript:void(0)" onclick="handleToggleAboutDrawer()" class="home-about-link">
            <img loading="lazy" src="img/official/IconInfo.webp" alt="">
            <span>${i("home.about")}</span>
          </a>
          
          <h1>${i("home.heroTitle")}</h1>

          <div class="home-language-selector">
            <div class="language-selector" id="homeLanguageSelector">
              <button class="language-btn" onclick="handleToggleHomeLanguageMenu()">
                <span class="lang-flag">${e==="pt-BR"?'<img src="img/official/flag_pt.webp" alt="PT" class="flag-icon">':'<img src="img/official/flag_en.webp" alt="EN" class="flag-icon">'}</span>
                <span class="lang-code">${e==="pt-BR"?"PT-BR":"EN"}</span>
                <svg class="lang-arrow" width="12" height="12" viewBox="0 0 12 12">
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" fill="none"/>
                </svg>
              </button>
              <div class="language-dropdown" id="homeLanguageDropdown">
                <button class="lang-option ${e==="pt-BR"?"active":""}" onclick="handleSelectLanguage('pt-BR')">
                  <span class="lang-flag"><img src="img/official/flag_pt.webp" alt="PT" class="flag-icon"></span>
                  <span>${e==="pt-BR"?"Português Brasil":"Portuguese Brazilian"}</span>
                </button>
                <button class="lang-option ${e==="en"?"active":""}" onclick="handleSelectLanguage('en')">
                  <span class="lang-flag"><img src="img/official/flag_en.webp" alt="EN" class="flag-icon"></span>
                  <span>${e==="pt-BR"?"Inglês":"English"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <p>${i("home.heroSubtitle")}</p>
      </div>

      <!-- Menu Buttons -->
      <div class="hub-menu">
        <button class="hub-btn" onclick="navigateTo('characters')">
          <span>${i("home.characters")}</span>
        </button>
        <button class="hub-btn" onclick="navigateTo('guide')">
          <span>${i("home.guide")}</span>
        </button>
        <button class="hub-btn" onclick="navigateTo('stats')">
          <span>${i("home.calculator")}</span>
        </button>
        <button class="hub-btn" onclick="window.open('https://hub.skullgirlsmobile.com', '_blank')">
          <span>${i("home.hub")}</span>
        </button>
      </div>

    </div>
  </section>
  `}function Ht(){window._homeLangListenerAdded||(document.addEventListener("click",e=>{const a=document.getElementById("homeLanguageSelector"),t=document.getElementById("homeLanguageDropdown");a&&t&&!a.contains(e.target)&&t.classList.remove("active")}),window._homeLangListenerAdded=!0)}window.handleToggleHomeLanguageMenu=function(){const e=document.getElementById("homeLanguageDropdown");e&&e.classList.toggle("active")};const Ai=Object.freeze(Object.defineProperty({__proto__:null,init:Ht,render:zt},Symbol.toStringTag,{value:"Module"})),jt=["annie.json","beowulf.json","big-band.json","black-dahlia.json","cerebella.json","double.json","eliza.json","filia.json","fukua.json","marie.json","ms-fortune.json","painwheel.json","parasoul.json","peacock.json","robo-fortune.json","squigly.json","umbrella.json","valentine.json"],sa={annie:"img/select_character/Annie_Icon2.webp",beowulf:"img/select_character/Beowulf_Icon2.webp","big-band":"img/select_character/bigband_icon2.webp","black-dahlia":"img/select_character/black_dahlia_icon2.webp",cerebella:"img/select_character/cerebella_icon2.webp",double:"img/select_character/double_icon2.webp",eliza:"img/select_character/eliza_icon2.webp",filia:"img/select_character/filia_icon2.webp",fukua:"img/select_character/fukua_icon2.webp",marie:"img/select_character/marie_icon2.webp","ms-fortune":"img/select_character/msfortune_icon2.webp",painwheel:"img/select_character/painwhell_icon2.webp",parasoul:"img/select_character/parasoul_icon2.webp",peacock:"img/select_character/peacock2.webp","robo-fortune":"img/select_character/robo_fortune_icon2.webp",squigly:"img/select_character/squigly_icon2.webp",umbrella:"img/select_character/umbrella_icon2.webp",valentine:"img/select_character/valentine_icon2.webp"},na={annie:"#00a8a8",beowulf:"#858585","big-band":"#808040","black-dahlia":"#3e003e",cerebella:"#ff5402",double:"#5050a3",eliza:"#ffd700",filia:"#000000",fukua:"#006000",marie:"#888888","ms-fortune":"#0099ff",painwheel:"#797900",parasoul:"#ff0000",peacock:"#c60000","robo-fortune":"#005151",squigly:"#800080",umbrella:"#ffff00",valentine:"#FFFFFF"},Je={Fogo:{class:"fire",icon:"🔥",key:"fogo",iconPath:"img/official/ElementalFireBackless.webp",statIcon:"img/official/ElementalIconFire.webp"},Água:{class:"water",icon:"💧",key:"agua",iconPath:"img/official/ElementalWaterBackless.webp",statIcon:"img/official/ElementalIconWater.webp"},Ar:{class:"wind",icon:"🌪️",key:"ar",iconPath:"img/official/ElementalWindBackless.webp",statIcon:"img/official/ElementalIconWind.webp"},Luz:{class:"light",icon:"☀️",key:"luz",iconPath:"img/official/ElementalLightBackless.webp",statIcon:"img/official/ElementalIconLight.webp"},Trevas:{class:"dark",icon:"🌙",key:"trevas",iconPath:"img/official/ElementalDarkBackless.webp",statIcon:"img/official/ElementalIconDark.webp"},Neutro:{class:"neutral",icon:"⚪",key:"neutro",iconPath:"img/official/ElementalNeutralBackless.webp",statIcon:"img/official/ElementalIconNeutral.webp"}},Qt={Fire:{class:"fire",icon:"🔥",key:"fogo",iconPath:"img/official/ElementalFireBackless.webp",statIcon:"img/official/ElementalIconFire.webp"},Water:{class:"water",icon:"💧",key:"agua",iconPath:"img/official/ElementalWaterBackless.webp",statIcon:"img/official/ElementalIconWater.webp"},Wind:{class:"wind",icon:"🌪️",key:"ar",iconPath:"img/official/ElementalWindBackless.webp",statIcon:"img/official/ElementalIconWind.webp"},Light:{class:"light",icon:"☀️",key:"luz",iconPath:"img/official/ElementalLightBackless.webp",statIcon:"img/official/ElementalIconLight.webp"},Dark:{class:"dark",icon:"🌙",key:"trevas",iconPath:"img/official/ElementalDarkBackless.webp",statIcon:"img/official/ElementalIconDark.webp"},Neutral:{class:"neutral",icon:"⚪",key:"neutro",iconPath:"img/official/ElementalNeutralBackless.webp",statIcon:"img/official/ElementalIconNeutral.webp"}};function we(){return y()==="en"?{...Je,...Qt}:Je}const vi=Je,Qa={diamante:4,ouro:3,prata:2,bronze:1},Wa={Fogo:1,Água:2,Ar:3,Luz:4,Trevas:5,Neutro:6},Wt={diamante:"DIAMANTE",ouro:"OURO",prata:"PRATA",bronze:"BRONZE"},Kt={diamante:"DIAMOND",ouro:"GOLD",prata:"SILVER",bronze:"BRONZE"};function Yt(){return y()==="en"?Kt:Wt}function Ze(e){return Yt()[e]||e}const yi={diamante:"img/official/icone_diamante.webp",ouro:"img/official/icone_ouro.webp",prata:"img/official/icone_prata.webp",bronze:"img/official/icone_bronze.webp"},Xt={Fogo:"Fire",Água:"Water",Ar:"Wind",Luz:"Light",Trevas:"Dark",Neutro:"Neutral"},Jt={Fire:"Fogo",Water:"Água",Wind:"Ar",Air:"Ar",Light:"Luz",Dark:"Trevas",Neutral:"Neutro",fire:"Fogo",water:"Água",wind:"Ar",air:"Ar",light:"Luz",dark:"Trevas",neutral:"Neutro"};function Ka(e){return Jt[e]||e}function O(e){return y()==="en"&&Xt[e]||e}const ea={annie:"Annie",beowulf:"Beowulf","big-band":"Big Band","black-dahlia":"Black Dahlia",cerebella:"Cerebella",double:"Double",eliza:"Eliza",filia:"Filia",fukua:"Fukua",marie:"Marie","ms-fortune":"Ms. Fortune",painwheel:"Painwheel",parasoul:"Parasoul",peacock:"Peacock","robo-fortune":"Robo-Fortune",squigly:"Squigly",umbrella:"Umbrella",valentine:"Valentine"},A={characters:{},catalysts:null,statistics:null,tierData:{},userPreferences:JSON.parse(localStorage.getItem("SGM_USER_PREFS")||'{"catalystNotes":{}}'),currentCharacter:null,currentSection:"landing-hub",currentTab:"builds",tabState:{builds:{filters:{rarity:[],element:[],variantClass:[],efeitos:[]},sort:{type:"score",direction:"desc"}},tier:{filters:{rarity:[],element:[],variantClass:[],efeitos:[]},sort:{type:"class",direction:"desc"}}},isFilterBarOpen:!1,isAboutDrawerOpen:!1,isMobileMenuOpen:!1},Zt=new Set;function F(){return{...A}}function N(){Zt.forEach(e=>e(A))}function Ri(e){A.characters=e,N()}function wi(e){A.currentCharacter=e,N()}function Oi(e){A.currentSection=e,N()}function Si(e){A.currentTab=e,N()}function Ti(e,a){const t=A.currentTab==="tier"?"tier":"builds",o=A.tabState[t].filters[e],s=o.indexOf(a);s>-1?o.splice(s,1):o.push(a),N()}function Ci(){const e=A.currentTab==="tier"?"tier":"builds";A.tabState[e].filters={rarity:[],element:[],variantClass:[],efeitos:[]},A.tabState[e].sort=e==="tier"?{type:"class",direction:"desc"}:{type:"score",direction:"desc"},N()}function Ii(){const e=A.currentTab==="tier"?"tier":"builds";A.tabState[e].filters.variantClass=[],A.tabState[e].filters.efeitos=[];const a=A.tabState[e].sort.type;(a==="element"||a==="class")&&(A.tabState[e].sort=e==="tier"?{type:"class",direction:"desc"}:{type:"score",direction:"desc"}),N()}function eo(){A.tabState.builds.filters={rarity:[],element:[],variantClass:[],efeitos:[]},A.tabState.tier.filters={rarity:[],element:[],variantClass:[],efeitos:[]},A.tabState.builds.sort={type:"score",direction:"desc"},A.tabState.tier.sort={type:"class",direction:"desc"},N()}function Di(e){const a=A.currentTab==="tier"?"tier":"builds",t=A.tabState[a].sort;t.type===e?t.direction=t.direction==="desc"?"asc":"desc":(t.type=e,t.direction=["name","element","class"].includes(e)?"asc":"desc"),N()}function ki(e){A.tierData=e,N()}function _i(e){A.catalysts=e,N()}function Bi(e){A.statistics=e,N()}function Gi(e,a){A.userPreferences.catalystNotes||(A.userPreferences.catalystNotes={}),A.userPreferences.catalystNotes[e]=a,localStorage.setItem("SGM_USER_PREFS",JSON.stringify(A.userPreferences))}const ao=Object.freeze(Object.defineProperty({__proto__:null,clearAdvancedFilters:Ii,clearFilters:Ci,getState:F,notifySubscribers:N,resetAllFilters:eo,setCatalysts:_i,setCharacters:Ri,setCurrentCharacter:wi,setCurrentSection:Oi,setCurrentTab:Si,setStatistics:Bi,setTierData:ki,toggleFilter:Ti,toggleSort:Di,updateCatalystNote:Gi},Symbol.toStringTag,{value:"Module"})),g={characters:null,catalysts:null,catalysts_en:null,fenda:null,fenda_en:null,statistics:null,tierData:null,golpes:null,astros:null,teonitas:null,disputasPremiadas:null,reinosParalelos:null,ganhosFixos:null,guildas:null,extras:null};async function Li(){if(g.characters)return g.characters;const e={},a=jt.map(t=>fetch(`data/${t}`).then(o=>o.json()).then(o=>{const s=t.replace(".json","").toLowerCase();return e[s]=o,o}).catch(o=>(console.warn(`Error loading ${t}:`,o),null)));return await Promise.all(a),g.characters=e,Ri(e),e}async function Pi(){if(g.tierData)return g.tierData;try{const a=await(await fetch("data/tier-data.json")).json();return g.tierData=a,ki(a),a}catch(e){return console.error("Error loading tier data:",e),{}}}async function ra(){const e=y(),a=e==="en"?"catalysts_en":"catalysts";if(g[a])return g[a];const t=e==="en"?"data/catalisadores_en.json":"data/catalisadores.json";try{const s=await(await fetch(t)).json();return g[a]=s,_i(s),s}catch(o){return console.error("Error loading catalysts:",o),null}}async function Mi(){const e=y(),a=e==="en"?"fenda_en":"fenda";if(g[a])return g[a];const t=e==="en"?"data/fenda_en.json":"data/fenda.json";try{const o=await fetch(t);return g[a]=await o.json(),g[a]}catch(o){return console.error("Error loading fenda data:",o),null}}async function $i(){if(g.extras)return g.extras;try{const e=await fetch("data/extras.json");return g.extras=await e.json(),g.extras}catch(e){return console.error("Error loading extras data:",e),null}}async function xi(){if(g.statistics)return g.statistics;try{const[e,a,t,o,s,n,r]=await Promise.all([Fi(),Ni(),Ui(),qi(),Vi(),zi(),Hi()]),l={golpes:e,astros:a,teonitas:t,disputasPremiadas:o,reinosParalelos:s,ganhosFixos:n,guildas:r};return g.statistics=l,Bi(l),l}catch(e){return console.error("Error loading statistics:",e),null}}async function Fi(){if(g.golpes)return g.golpes;try{const e=await fetch("data/stats/golpes.json");return g.golpes=await e.json(),g.golpes}catch(e){return console.error("Error loading golpes data:",e),null}}async function Ni(){if(g.astros)return g.astros;try{const e=await fetch("data/stats/astros.json");return g.astros=await e.json(),g.astros}catch(e){return console.error("Error loading astros data:",e),null}}async function Ui(){if(g.teonitas)return g.teonitas;try{const e=await fetch("data/stats/teonitas.json");return g.teonitas=await e.json(),g.teonitas}catch(e){return console.error("Error loading teonitas data:",e),null}}async function qi(){if(g.disputasPremiadas)return g.disputasPremiadas;try{const e=await fetch("data/stats/disputas_premiadas.json");return g.disputasPremiadas=await e.json(),g.disputasPremiadas}catch(e){return console.error("Error loading disputas premiadas data:",e),null}}async function Vi(){if(g.reinosParalelos)return g.reinosParalelos;try{const e=await fetch("data/stats/reinos_paralelos.json");return g.reinosParalelos=await e.json(),g.reinosParalelos}catch(e){return console.error("Error loading reinos paralelos data:",e),null}}async function zi(){if(g.ganhosFixos)return g.ganhosFixos;try{const e=await fetch("data/stats/ganhos_fixos.json");return g.ganhosFixos=await e.json(),g.ganhosFixos}catch(e){return console.error("Error loading ganhos fixos data:",e),null}}async function Hi(){if(g.guildas)return g.guildas;try{const e=await fetch("data/stats/guildas.json");return g.guildas=await e.json(),g.guildas}catch(e){return console.error("Error loading guildas data:",e),null}}function Z(){return g.characters}function ee(e){var a;return((a=g.characters)==null?void 0:a[e])||null}function ji(){return g.extras||{}}const io=Object.freeze(Object.defineProperty({__proto__:null,getCharacter:ee,getCharacters:Z,getExtrasGlobalData:ji,loadAllCharacters:Li,loadAstrosData:Ni,loadCatalysts:ra,loadDisputasPremiadasData:qi,loadExtrasData:$i,loadFendaData:Mi,loadGanhosFixosData:zi,loadGolpesData:Fi,loadGuildasData:Hi,loadReinosParalelosData:Vi,loadStatistics:xi,loadTeonitasData:Ui,loadTierData:Pi},Symbol.toStringTag,{value:"Module"}));function pe(e){if(!e)return[];const a=[];return Object.entries(e).forEach(([t,o])=>{o.forEach(s=>{a.push({...s,rarityKey:t})})}),a}const Qi=["Fluxo de Mana","Vira a balança","Mana Flow","Scale Tipper","Isca Sortuda","Lucky Lure"];function Pe(e){if(!e)return!1;const a=e.trim().toLowerCase();return Qi.some(t=>t.toLowerCase()===a)}function to(e){const a=ee(e);return a?pe(a.variants).some(o=>Pe(o.name)):!1}function oo(e,a,t=0,o="openCharacterDetails"){const s=na[e]||"var(--accent-gold)",n=sa[e]||`img/${e}/icon.webp`,r=to(e)?`<img loading="lazy" src="img/official/new_icon_U.webp" alt="${i("common.altNew")}" class="new-badge">`:"",c=y()==="en"&&ea[e]||a.character;return`
<div class="character-card animate-in"
  style="animation-delay: ${t*.03}s; --char-accent: ${s}"
  onclick="${o}('${e}')">
  ${r}
  <img src="${n}" alt="${c}" loading="lazy"
  onerror="this.src='img/official/Annie_Icon.webp'">
  <div class="name">${c.toUpperCase()}</div>
</div>
`}function Wi(e,a,t="openCharacterDetails"){const o=document.getElementById(e);if(!o)return;const s=y(),n=Object.entries(a).filter(([r,l])=>l&&l.character).sort((r,l)=>{if(s==="en"){const c=ea[r[0]]||r[1].character,d=ea[l[0]]||l[1].character;return c.localeCompare(d)}else return r[1].character.localeCompare(l[1].character)});o.innerHTML=n.map(([r,l],c)=>oo(r,l,c,t)).join("")}function so(){return`
        <section class="section character-selection" id="character-selection">
            <div class="section-header">
                <button class="btn-back" onclick="navigateTo('')">
                    ←
                </button>
                <h2>${i("characters.selectCharacter")}</h2>
            </div>

  <div class="character-grid" id="characterGrid">
    <!-- Populated by JS -->
  </div>
</section>
`}function no(){const e=Z();e&&Wi("characterGrid",e,"openCharacterDetails")}const ro=Object.freeze(Object.defineProperty({__proto__:null,init:no,render:so},Symbol.toStringTag,{value:"Module"})),ae={ataque:{keys:["ATQ","ATK","Ataque","ATAQUE","Attack"],name:"ATQ / Ataque",name_en:"ATK / Attack",type:"term",detailed:"Representa o dano base do seu lutador.",detailed_en:"Represents your fighter's base damage."},vida:{keys:["HP","VIDA","VD","Vida"],name:"Vida (VD)",name_en:"Health (HP)",type:"term",detailed:"Representa a saúde do seu lutador. Se chegar a zero, o personagem é derrotado.",detailed_en:"Represents your fighter's health. If it reaches zero, the character is defeated."},critless:{keys:["Critless","critless","Sem Crítico","sem crítico","CRITLESS"],name:"Critless (Sem Crítico)",name_en:"Critless",type:"buff-term",color:"#ffdd44",detailed:"Estratégia de não investir em Taxa e Dano Crítico para contornar habilidades de punição por acerto crítico.",detailed_en:"A strategy of not investing in Crit Rate and Crit Damage to bypass abilities that punish critical hits.",explicacao:`O conceito de <strong style="color:#fff">Critless</strong> consiste em NÃO melhorar os nós de Taxa Crítica e Dano Crítico na Árvore de Habilidades do personagem, mantendo-os fora também da sua Build.

Evitar acertos críticos é fundamental para lidar contra variantes defensivas específicas (como Painwheels com Sangue Maculado ou modificadores com reflexão de dano na qual dependem de sofrer Dano Crítico para punir você. Essa escolha reduz seu potencial de ataque direto, sendo mais aconselhada para personagens com muita Vida, Cura ou Ataque Baixo.

<strong>Dica:</strong> AGARRÕES nunca causam acertos críticos, mesmo se você tiver o Efeito Positivo Precisão

Avalie cuidadosamente antes de criar uma variante <em>Critless</em>, pois isso pode limitar um pouco o desempenho dela contra outros oponentes comuns.`,explicacao_en:`The concept of <strong style="color:#fff">Critless</strong> consists of NOT upgrading the Crit Rate and Crit Damage nodes in the character's Skill Tree, keeping them out of your Build as well.

Avoiding critical hits is essential to deal with specific defensive variants (such as Painwheels with Tainted Blood or modifiers with damage reflection that depend on receiving Critical Damage to punish you). This choice reduces your direct attack potential, being more advisable for characters with high Health, Healing, or low Attack.

<strong>Tip:</strong> THROWS never cause critical hits, even if you have the Precision Buff.

Evaluate carefully before creating a <em>Critless</em> variant, as it may somewhat limit their performance against other common opponents.`},signature_abilities:{keys:["Habilidades Características","Habilidade Característica","Signature Abilities"],name:"Habilidades Características",name_en:"Signature Abilities",type:"term",detailed:"São as habilidades passivas que tornam cada Variante única no jogo.",detailed_en:"These are the passive abilities that make each Variant unique in the game."},marquee_abilities:{keys:["Habilidade Superior","Habilidades Superiores","Marquee Abilities"],name:"Habilidade Superior",name_en:"Marquee Ability",type:"term",detailed:"Uma habilidade adicional que pode ser escolhida entre duas opções após o personagem finalizar sua árvore de habilidades.",detailed_en:"An additional ability that can be chosen from two options after the character completes their skill tree."},special_moves:{keys:["Golpes Especiais","Golpe Especial","Special Moves"],name:"Golpes Especiais",name_en:"Special Moves",type:"term",detailed:'Golpes Especiais são os golpesredondos, são mais "simples" que os Blockbusters, eles podem ser usados com mais frequência (Reat. Especial e Níveis carrega mais rápido) e podem ser repetidos.',detailed_en:"Special Moves are simpler than Blockbusters, they can be used more frequently (Special Cooldown and Levels charge faster) and can be repeated."},tag_in:{keys:["Assistência","Tag In","Ataque de Assistência"],name:"Assistência (Tag In)",name_en:"Tag In (Assist)",type:"term",detailed:"Permite que um aliado entre na luta realizando um ataque.",detailed_en:"Allows an ally to enter the fight performing an attack."},buff:{keys:["Efeito Positivo","EF. POS.","EF. POSITIVO","EFEITOS POSITIVOS","EFEITO POSITIVO","Buff"],name:"Efeito Positivo (EF. POS.)",name_en:"Buff (BUFF)",type:"buff-term",color:"#6fbf73",detailed:"Ícones coloridos que aparecem abaixo da barra de vida.",detailed_en:"Colored icons that appear below the health bar."},debuff:{keys:["Efeito Negativo","EF. NEG.","EF. NEGATIVO","EFEITOS NEGATIVOS","EFEITO NEGATIVO","Debuff"],name:"Efeito Negativo (EF. NEG.)",name_en:"Debuff (DEBUFF)",type:"debuff-term",color:"#f06868",detailed:"Ícones vermelhos que aparecem abaixo da barra de vida.",detailed_en:"Red icons that appear below the health bar."},permanent_modifier:{keys:["Modificador Permanente","Efeito Permanente","Permanent Modifier"],name:"Efeito Permanente",name_en:"Permanent Effect",type:"term",color:"#b0bec5",icon:"img/modifiers/permanent/Permanent.webp",stacks:5,detailed:"O Efeito com está borda não pode ser removido.",detailed_en:"The Effect with this border cannot be removed.",explicacao:"O Efeito com está borda não pode ser removido.",explicacao_en:"The Effect with this border cannot be removed."},armor:{keys:["Armadura","Armor"],name:"Armadura",name_en:"Armor",type:"buff",color:"#4488ff",icon:"img/modifiers/buffs/Armor.webp",stacks:5,scaling:"20% > 40% > 60% > 80% > 100%",detailed:"Reduz o dano sofrido em 20%.",detailed_en:"Reduces damage taken by 20%.",explicacao:"Reduz dano em 20%. Removido por Quebra de Armadura.",explicacao_en:"Reduces damage by 20%. Removed by Armor Break."},auto_block:{keys:["Bloqueio Automático","Auto Block","Bloq. Automático"],name:"Bloqueio Automático",name_en:"Auto Block",type:"buff",color:"#4488ff",icon:"img/modifiers/buffs/Auto_Block.webp",stacks:5,scaling:"10% > 20% > 30% > 40% > 50%",detailed:"10% de chance de BLOQUEAR automaticamente o próximo GOLPE.",detailed_en:"10% chance to automatically BLOCK the next HIT.",explicacao:"10% chance de Bloquear Automaticamente. Removido por Quebra de Guarda. Olho-Morto Anula este Efeito.",explicacao_en:"10% chance to Auto Block. Removed by Guard Break. Deadeye ignores this effect."},barrier:{keys:["Barreira","Barrier"],name:"Barreira",name_en:"Barrier",type:"buff",color:"#888899",icon:"img/modifiers/buffs/Barrier.webp",stacks:5,scaling:"10% > 20% > 30% > 40% > 50%",detailed:"Ganhe 10% de vida temporária.",detailed_en:"Gain 10% temporary health.",explicacao:"Vida Temporária baseada em 10% da Vida Máxima, basicamente uma Vida adicional.",explicacao_en:"Temporary Health based on 10% of Max HP, essentially additional Health."},blessing:{keys:["Benção","Blessing"],name:"Benção",name_en:"Blessing",type:"buff",color:"#ffdd44",icon:"img/modifiers/buffs/Blessing.webp",stacks:5,scaling:"20% > 20% > 30% > 40% > 50%",detailed:"RESSUSCITE com 20% de VIDA ao ser DERROTADO.",detailed_en:"REVIVE with 20% HEALTH when DEFEATED.",explicacao:"Revive com 10% de Vida por acúmulo. Quietus anula este efeito.",explicacao_en:"Revives with 10% Health per stack. Quietus nullifies this effect."},deadeye:{keys:["Olho-Morto","Deadeye"],name:"Olho-Morto",name_en:"Deadeye",type:"buff",color:"#aa44dd",icon:"img/modifiers/buffs/Deadeye.webp",stacks:1,detailed:"Os Ataques ignoram a DEFESA do oponente e não ativam os efeitos de BLOQUEIO AUTOMÁTICO, INABALÁVEL, ESQUIVA e ESPINHOS.",detailed_en:"Attacks ignore the opponent's DEFENSE and do not trigger AUTO BLOCK, UNFLINCHING, EVASION and THORNS effects.",explicacao:"Ignora Defesa, Bloqueio Automático, Inabalável, Esquiva e Espinhos.",explicacao_en:"Ignores Defense, Auto Block, Unflinching, Evasion and Thorns."},enrage:{keys:["Fúria","Enrage"],name:"Fúria",name_en:"Enrage",type:"buff",color:"#ff4444",icon:"img/modifiers/buffs/Enrage.webp",stacks:5,scaling:"20% > 40% > 60% > 80% > 100%",detailed:"Aumenta o dano em 20%.",detailed_en:"Increases damage by 20%.",explicacao:"Aumenta o Dano em 20%. Remove Incapacitação.",explicacao_en:"Increases damage by 20%. Removes Cripple."},evasion:{keys:["Esquiva","Evasão","Evasion"],name:"Esquiva",name_en:"Evasion",type:"buff",icon:"img/modifiers/buffs/Evasion.webp",stacks:5,detailed:"O próximo GOLPE será esquivado.",detailed_en:"The next HIT will be evaded.",explicacao:"Esquiva de qualquer Ataque. Não Esquiva de Blockbuster Indefensável e Olho-Morto.",explicacao_en:"Evades any Attack. Cannot evade Unblockable Blockbusters and Deadeye."},final_stand:{keys:["Resistência Final","Final Stand"],name:"Resistência Final",name_en:"Final Stand",type:"buff",color:"#ffdd44",icon:"img/modifiers/buffs/FinalStand.webp",stacks:1,detailed:"Impede a morte.",detailed_en:"Prevents death.",explicacao:"A Vida não cai abaixo de 1 Vida. Bloqueia Destruição. Quietus anula este Efeito.",explicacao_en:"Health cannot drop below 1 HP. Blocks Doom. Quietus nullifies this effect."},haste:{keys:["Aceleração","Haste"],name:"Aceleração",name_en:"Haste",type:"buff",color:"#aa44dd",icon:"img/modifiers/buffs/Haste.webp",stacks:1,detailed:"Aumenta a velocidade de ganho do MEDIDOR DE BLOCKBUSTER em 100%.",detailed_en:"Increases BLOCKBUSTER METER gain speed by 100%.",explicacao:"+100% ganho de medidor. Remove Lentidão.",explicacao_en:"+100% meter gain. Removes Slow."},heavy_regen:{keys:["Regeneração Forte","Heavy Regen"],name:"Regeneração Forte",name_en:"Heavy Regen",type:"buff",color:"#44cc66",icon:"img/modifiers/buffs/HeavyRegen.webp",stacks:1,detailed:"Regenera 2% da VIDA MÁXIMA a cada segundo.",detailed_en:"Regenerates 2% of MAX HEALTH every second.",explicacao:"Cura 2% de Vida por segundo. Remove Sangramento.",explicacao_en:"Heals 2% Health per second. Removes Bleed."},immunity:{keys:["Imunidade","Immunity"],name:"Imunidade",name_en:"Immunity",type:"buff",color:"#ffdd44",icon:"img/modifiers/buffs/Immune.webp",stacks:1,detailed:"Dá imunidade a todos os EFEITOS NEGATIVOS.",detailed_en:"Grants immunity to all DEBUFFS.",explicacao:"Impede o ganho de novos Efeitos Negativos, Efeitos Negativos já aplicados não serão removidos.",explicacao_en:"Prevents gaining new Debuffs. Already applied Debuffs will not be removed."},invincible:{keys:["Invencível","Invincible"],name:"Invencível",name_en:"Invincible",type:"buff",color:"#ffdd44",icon:"img/modifiers/buffs/Invincible.webp",stacks:1,detailed:"Reduz o dano sofrido em 100%.",detailed_en:"Reduces damage taken by 100%.",explicacao:"Impede dano de todos os golpes, sangramentos, drenagens e reflexão de dano. Não Anula Destruição.",explicacao_en:"Prevents damage from all hits, bleeds, drains and damage reflection. Does not negate Doom."},miasma:{keys:["Miasma"],name:"Miasma",name_en:"Miasma",type:"buff",color:"#44cc66",icon:"img/modifiers/buffs/Miasma.webp",stacks:5,scaling:"1% > 2% > 3% > 4% > 5%",detailed:"Drena 2% de VIDA e MEDIDOR por seg de oponentes próximos.",detailed_en:"Drains 2% HEALTH and METER per second from nearby opponents.",explicacao:"Drena 1% de Vida e Medidor do oponente. Bloqueio de Cura e Polaridade Inversa não impedem a Drenagem de Vida e Blockbuster.",explicacao_en:"Drains 1% of the opponent's Health and Meter. Heal Block and Inverse Polarity do not prevent Health and Blockbuster Drain."},precision:{keys:["Precisão","Precision"],name:"Precisão",name_en:"Precision",type:"buff",color:"#ffdd44",icon:"img/modifiers/buffs/Precision.webp",stacks:5,detailed:"Garante que o próximo GOLPE seja CRÍTICO. GOLPES DE PRECISÃO não ativam as HABILIDADES CARACTERÍSTICAS do oponente.",detailed_en:"Guarantees the next HIT will be CRITICAL. PRECISION HITS do not trigger the opponent's SIGNATURE ABILITIES.",explicacao:"Acerto Crítico garantido e não ativa Habilidades Características.",explicacao_en:"Guaranteed Critical Hit and does not trigger Signature Abilities."},regen:{keys:["Regeneração","Regen"],name:"Regeneração",name_en:"Regen",type:"buff",color:"#44cc66",icon:"img/modifiers/buffs/Regen.webp",stacks:5,scaling:"1% > 2% > 3% > 4% > 5%",detailed:"Regenera 1% da VIDA MÁXIMA a cada segundo.",detailed_en:"Regenerates 1% of MAX HEALTH every second.",explicacao:"Cura 1% de Vida por segundo. Remove Sangramento.",explicacao_en:"Heals 1% Health per second. Removes Bleed."},thorns:{keys:["Espinhos","Thorns"],name:"Espinhos",name_en:"Thorns",type:"buff",color:"#aa44dd",icon:"img/modifiers/buffs/Thorns.webp",stacks:5,scaling:"20% > 40% > 60% > 80% > 100%",detailed:"Reflita 20% do dano ao agressor.",detailed_en:"Reflects 20% of damage to the attacker.",explicacao:"Reflete 20% do dano por acúmulo. Olho-Morto ignora este efeito.",explicacao_en:"Reflects 20% damage per stack. Deadeye ignores this effect."},unflinching:{keys:["Inabalável","Unflinching"],name:"Inabalável",name_en:"Unflinching",type:"buff",color:"#ffdd44",icon:"img/modifiers/buffs/Unflinching.webp",stacks:1,detailed:"Não reaja a golpes.",detailed_en:"Do not react to hits.",explicacao:"O personagem não será derrubado por ataques normais ou a maioria dos golpes especiais, golpes Blockbusters e Agarrões ainda podem derrubar. Olho-Morto Ignora este Efeito.",explicacao_en:"The character will not be knocked down by normal attacks or most special moves. Blockbuster moves and Throws can still knock down. Deadeye ignores this effect."},armor_break:{keys:["Quebra de Armadura","Armor Break","Quebra de Arm."],name:"Quebra de Armadura",name_en:"Armor Break",type:"debuff",color:"#ff4444",icon:"img/modifiers/debuffs/ArmorBreak.webp",stacks:1,detailed:"Aumenta o dano sofrido em 20%.",detailed_en:"Increases damage taken by 20%.",explicacao:"+20% dano recebido. Remove Armadura.",explicacao_en:"+20% damage received. Removes Armor."},bleed:{keys:["Sangramento","Bleed"],name:"Sangramento",name_en:"Bleed",type:"debuff",color:"#ff4444",icon:"img/modifiers/debuffs/Bleed.webp",stacks:5,scaling:"1% > 2% > 3% > 4% > 5%",detailed:"Drena 1% da VIDA MÁXIMA da vítima a cada segundo.",detailed_en:"Drains 1% of the victim's MAX HEALTH every second.",explicacao:"Remove 1% da Vida Máxima por Segundo até 1 de Vida. Remove Regeneração.",explicacao_en:"Removes 1% of Max Health per second down to 1 HP. Removes Regen."},cripple:{keys:["Incapacitação","Cripple"],name:"Incapacitação",name_en:"Cripple",type:"debuff",color:"#ff4444",icon:"img/modifiers/debuffs/Cripple.webp",stacks:1,detailed:"Reduz o dano infligido em 20%.",detailed_en:"Reduces damage dealt by 20%.",explicacao:"-20% dano causado. Remove Fúria.",explicacao_en:"-20% damage dealt. Removes Enrage."},curse:{keys:["Maldição","Curse"],name:"Maldição",name_en:"Curse",type:"debuff",color:"#ff4444",icon:"img/modifiers/debuffs/Curse.webp",stacks:1,detailed:"Impede de ganhar EFEITOS POSITIVOS.",detailed_en:"Prevents gaining BUFFS.",explicacao:"Impede o ganho de novos Efeitos Positivos.",explicacao_en:"Prevents gaining new Buffs."},death_mark:{keys:["Marca da Morte","Death Mark"],name:"Marca da Morte",name_en:"Death Mark",type:"debuff",color:"#ff4444",icon:"img/modifiers/debuffs/DeathMark.webp",stacks:1,detailed:"Aumenta em 50% o dano sofrido por CRÍTICOS e reduz em 50% a CAPACIDADE DE BLOQUEIO.",detailed_en:"Increases damage taken from CRITS by 50% and reduces BLOCK CAPACITY by 50%.",explicacao:"Aumenta em +50% o Dano Sofrido por Críticos e reduz em 50% a Capacidade de Bloqueio.",explicacao_en:"Increases Critical damage taken by +50% and reduces Block Capacity by 50%."},doom:{keys:["Destruição","Doom"],name:"Destruição",name_en:"Doom",type:"debuff",color:"#ff4444",icon:"img/modifiers/debuffs/Doom.webp",stacks:1,detailed:"APÓS X segundos, o lutador afetado é morto.",detailed_en:"AFTER X seconds, the affected fighter is killed.",explicacao:"Morte instantânea ao expirar. Ignora Invencibilidade.",explicacao_en:"Instant death upon expiration. Ignores Invincible."},fatigue:{keys:["Fadiga","Fatigue"],name:"Fadiga",name_en:"Fatigue",type:"debuff",color:"#ff4444",icon:"img/modifiers/debuffs/Fatigue.webp",stacks:1,detailed:"ASSISTÊNCIAS E GOLPES ESPECIAIS levem o dobro do tempo para reativar. Após X segundos, o Lutador atingido tem 50% de chance de ficar ATORDOADO por 2 seg.",detailed_en:"ASSISTS and SPECIAL MOVES take double the time to reactivate. After X seconds, the affected Fighter has a 50% chance to be STUNNED for 2 sec.",explicacao:"Recarga de Golpes Especiais e Assistência 50% mais lenta, ao expirar tem 50% de chance infligir Atordoamento.",explicacao_en:"Special Moves and Assist cooldown 50% slower, upon expiration has a 50% chance to inflict Stun."},guard_break:{keys:["Quebra de Guarda","Guard Break"],name:"Quebra de Guarda",name_en:"Guard Break",type:"debuff",color:"#ff4444",icon:"img/modifiers/debuffs/Guard_Break.webp",stacks:5,scaling:"10% > 20% > 30% > 40% > 50%",detailed:"10% de chance do bloqueio falhar durante um BLOQUEIO.",detailed_en:"10% chance for blocking to fail during a BLOCK.",explicacao:"10% chance de falhar a Guarda. Remove Bloqueio Automático.",explicacao_en:"10% chance to fail a Guard. Removes Auto Block."},heavy_bleed:{keys:["Sangramento Forte","Heavy Bleed"],name:"Sangramento Forte",name_en:"Heavy Bleed",type:"debuff",color:"#ff4444",icon:"img/modifiers/debuffs/HeavyBleed.webp",stacks:1,detailed:"Drena 2% da VIDA MÁXIMA da vítima a cada segundo.",detailed_en:"Drains 2% of the victim's MAX HEALTH every second.",explicacao:"Remove 2% da Vida Máxima por Segundo. Remove Regeneração.",explicacao_en:"Removes 2% of Max Health per second. Removes Regen."},hex:{keys:["Feitiço","Hex"],name:"Feitiço",name_en:"Hex",type:"debuff",color:"#ff4444",icon:"img/modifiers/debuffs/Hex.webp",stacks:1,detailed:"HABILIDADES CARACTERÍSTICAS desativadas.",detailed_en:"SIGNATURE ABILITIES disabled.",explicacao:"Desativa Habilidades Características.",explicacao_en:"Disables Signature Abilities."},immobilize:{keys:["Imobilização","Immobilize"],name:"Imobilização",name_en:"Immobilize",type:"debuff",color:"#ff4444",icon:"img/modifiers/debuffs/Immobilize.webp",stacks:1,detailed:"Impede o personagem de se mover.",detailed_en:"Prevents the character from moving.",explicacao:"Impede o personagem de se mover.",explicacao_en:"Prevents the character from moving."},inverse_polarity:{keys:["Polaridade Inversa","Inverse Polarity"],name:"Polaridade Inversa",name_en:"Inverse Polarity",type:"debuff",color:"#ff4444",icon:"img/modifiers/debuffs/InversePolarity.webp",stacks:1,detailed:"Inverte qualquer tipo de Regeneração e causa dano ao invés de curar.",detailed_en:"Inverts any type of Regeneration and deals damage instead of healing.",explicacao:"Inverte qualquer tipo de Regeneração e causa dano ao invés de curar.",explicacao_en:"Inverts any type of Regeneration and deals damage instead of healing."},heal_block:{keys:["Bloqueio de Cura","Heal Block"],name:"Bloqueio de Cura",name_en:"Heal Block",type:"debuff",color:"#ff4444",icon:"img/modifiers/debuffs/HealBlock.webp",stacks:1,detailed:"Bloqueia todo tipo de cura.",detailed_en:"Blocks all types of healing.",explicacao:"Impede o personagem de ser curado.",explicacao_en:"Prevents the character from being healed."},lock_block:{keys:["Desativar Blockbusters","Lock Block Buster","Desativar Blockbuster"],name:"Desativar Blockbusters",name_en:"Lock Blockbuster",type:"debuff",color:"#ff4444",icon:"img/modifiers/debuffs/LockBlock.webp",stacks:1,detailed:"Desativa BLOCKBUSTER.",detailed_en:"Disables BLOCKBUSTERS.",explicacao:"Bloqueia o uso de Blockbusters e não permite carregar Blockbusters pendentes.",explicacao_en:"Blocks the use of Blockbusters and prevents charging pending Blockbusters."},lock_special:{keys:["Desativar Especiais","Lock Special","Desabilitam GOLPES ESPECIAIS"],name:"Desativar Especiais",name_en:"Lock Special",type:"debuff",color:"#ff4444",icon:"img/modifiers/debuffs/LockSpecial.webp",stacks:1,detailed:"Desativa GOLPES ESPECIAIS.",detailed_en:"Disables SPECIAL MOVES.",explicacao:"Bloqueia o uso de Golpes Especiais e desativa a Recarga dos Golpes Especiais.",explicacao_en:"Blocks the use of Special Moves and disables Special Move cooldowns."},lock_tag:{keys:["Desativar Assistências","Lock Tag","Desativar Assistência"],name:"Desativar Assistências",name_en:"Lock Tag Out",type:"debuff",color:"#ff4444",icon:"img/modifiers/debuffs/LockTag.webp",stacks:1,detailed:"Desativa ASSISTÊNCIAS.",detailed_en:"Disables ASSISTS.",explicacao:"Bloqueia Assistências e impede a recarga da Assistência.",explicacao_en:"Blocks Assists and prevents Assist cooldown."},power_surge:{keys:["Oscilação de Energia","Power Surge"],name:"Oscilação de Energia",name_en:"Power Surge",type:"debuff",color:"#ff4444",icon:"img/modifiers/debuffs/PowerSurge.webp",stacks:5,scaling:"5% > 10% > 15% > 20% > 25%",detailed:"Sofra dano igual a 5% da VIDA MÁXIMA ao usar um BLOCKBUSTER.",detailed_en:"Suffer damage equal to 5% of MAX HEALTH when using a BLOCKBUSTER.",explicacao:"Sofre 5% de dano igual a sua Vida Máxima ao usar Blockbuster.",explicacao_en:"Suffers 5% damage equal to your Max Health when using a Blockbuster."},quietus:{keys:["Quietus"],name:"Quietus",name_en:"Quietus",type:"debuff",color:"#ff4444",icon:"img/modifiers/debuffs/Quietus.webp",stacks:1,detailed:"A RESITÊNCIA da vítima é ignorada e os efeitos de RESISTÊNCIA FINAL e BENÇÃO são contornados.",detailed_en:"The victim'S RESISTANCE is ignored and FINAL STAND and BLESSING effects are bypassed.",explicacao:"Ignora Resistência, Resistência Final e Benção.",explicacao_en:"Ignores Resistance, Final Stand and Blessing."},slime:{keys:["Gosma","Slime"],name:"Gosma",name_en:"Slime",type:"debuff",color:"#ff4444",icon:"img/modifiers/debuffs/Slime.webp",stacks:5,scaling:"2% > 4% > 6% > 8% > 10%",detailed:"Sofra dano igual a 2% VIDA MÁXIMA sempre que um EF. POSITIVO for recebido.",detailed_en:"Suffer damage equal to 2% MAX HEALTH whenever a BUFF is received.",explicacao:"Sofre 2% de dano igual a sua Vida Máxima ao ganhar EF. POS.",explicacao_en:"Suffers 2% damage equal to your Max Health when gaining a Buff."},slow:{keys:["Lentidão","Slow"],name:"Lentidão",name_en:"Slow",type:"debuff",color:"#ff4444",icon:"img/modifiers/debuffs/Slow.webp",stacks:5,scaling:"50% > 100% > 150% > 200% > 250%",detailed:"Diminui a velocidade de ganho do MEDIDOR DE BLOCKBUSTER em 50%.",detailed_en:"Decreases BLOCKBUSTER METER gain speed by 50%.",explicacao:"Seus Blockbuster demoram -50% para carregar. Remove Aceleração.",explicacao_en:"Your Blockbusters take 50% longer to charge. Removes Haste."},stun:{keys:["Atordoamento","Stun"],name:"Atordoamento",name_en:"Stun",type:"debuff",color:"#ff4444",icon:"img/modifiers/debuffs/Stun.webp",stacks:1,detailed:"Atordoa a vítima.",detailed_en:"Stuns the victim.",explicacao:"Atordoamento impede todas as ações até o efeito expirar.",explicacao_en:"Stun prevents all actions until the effect expires."},wither:{keys:["Definhar","Wither"],name:"Definhar",name_en:"Wither",type:"debuff",color:"#ff4444",icon:"img/modifiers/debuffs/Wither.webp",stacks:5,scaling:"5% > 10% > 15% > 20% > 25%",detailed:"Perca 10% a cada segundo no MEDIDOR DE BLOCKBUSTER.",detailed_en:"Lose 10% per second from the BLOCKBUSTER METER.",explicacao:"Remove 5% de Medidor de Blockbuster por segundo.",explicacao_en:"Removes 5% Blockbuster Meter per second."}};function lo(){const e=[];for(const[a,t]of Object.entries(ae))if(t.type==="buff"||t.type==="debuff"||t.type==="buff-term"||t.type==="debuff-term")for(const o of t.keys)e.push({pattern:o,effectKey:a});return e.sort((a,t)=>t.pattern.length-a.pattern.length),e}function Te(e,a){a||(a=y());const t=ae[e];return t?a==="pt-BR"||!t.name_en?t:{...t,name:t.name_en,detailed:t.detailed_en||t.detailed,explicacao:t.explicacao_en||t.explicacao}:null}function co(e){if(!e)return null;const t=e.trim().toLowerCase().replace(/\s*\([^)]+\)$/,"").trim();for(const o of Object.values(ae))if(o.keys&&o.keys.some(s=>s.toLowerCase()===t))return o.icon||null;return null}const Ki={"Isca Sortuda":{buffs:{Ar:["Regeneração"],Fogo:["Inabalável"],Água:["Aceleração"],Trevas:["Olho-Morto"],Luz:["Precisão"],Neutro:["Barreira"]},buffs_en:{Wind:["Regen"],Fire:["Unflinching"],Water:["Haste"],Dark:["Deadeye"],Light:["Precision"],Neutral:["Barrier"]}},"Íris-Color":{buffs:{Ar:["Regeneração Forte"],Fogo:["Fúria (x2)"],Água:["Armadura (x2)"],Trevas:["Aceleração"],Luz:["Imunidade"],Neutro:[]},buffs_en:{Wind:["Heavy Regen"],Fire:["Enrage (x2)"],Water:["Armor (x2)"],Dark:["Haste"],Light:["Immunity"],Neutral:[]},debuffs:{Ar:["Desativar Blockbusters"],Fogo:["Sangramento"],Água:["Incapacitação"],Trevas:["Bloqueio de Cura"],Luz:["Feitiço"],Neutro:[]},debuffs_en:{Wind:["Disable Blockbusters"],Fire:["Bleed"],Water:["Cripple"],Dark:["Heal Block"],Light:["Curse"],Neutral:[]}},"Confusão Interior":{buffs:{Ar:["Regeneração"],Fogo:["Fúria"],Água:["Armadura"],Trevas:["Espinhos"],Luz:["Benção"],Neutro:["Barreira"]},buffs_en:{Wind:["Regen"],Fire:["Enrage"],Water:["Armor"],Dark:["Thorns"],Light:["Blessing"],Neutral:["Barrier"]}},"Plumagem Prismática":{buffs:{Ar:["Esquiva","Regeneração"],Fogo:["Precisão (x3)","Fúria"],Água:["Bloqueio Automático","Armadura"],Trevas:["Espinhos","Aceleração"],Luz:["Inabalável","Imunidade"],Neutro:["Miasma","Barreira"]},buffs_en:{Wind:["Evasion","Regen"],Fire:["Precision (x3)","Enrage"],Water:["Auto Block","Armor"],Dark:["Thorns","Haste"],Light:["Unflinching","Immunity"],Neutral:["Miasma","Barrier"]},debuffs:{Ar:["Sangramento"],Fogo:["Incapacitação"],Água:["Quebra de Armadura"],Trevas:["Definhar"],Luz:["Polaridade Inversa"],Neutro:["Feitiço"]},debuffs_en:{Wind:["Bleed"],Fire:["Cripple"],Water:["Armor Break"],Dark:["Wither"],Light:["Inverse Polarity"],Neutral:["Curse"]}},"Visitante do Espaço":{buffs:{Ar:["Regeneração"],Fogo:["Fúria"],Água:["Armadura"],Trevas:["Espinhos"],Luz:["Benção"],Neutro:["Barreira"]},buffs_en:{Wind:["Regen"],Fire:["Enrage"],Water:["Armor"],Dark:["Thorns"],Light:["Blessing"],Neutral:["Barrier"]}}};function po(e){return e in Ki}function uo(e,a){const t=y(),o=Ki[e];if(!o)return null;if(t==="pt-BR")return o;const s={};return o.buffs_en&&(s.buffs=o.buffs_en),o.debuffs_en&&(s.debuffs=o.debuffs_en),s}const se={annie:{Explosão:{image:{image:"img/annie/Annie_19.webp",type:"Golpe Especial",description:"Ao GOLPEAR, inflige QUEBRA DE GUARDA por 5/7/10 seg."},type:"Golpe Especial",description:"Ao GOLPEAR, inflige QUEBRA DE GUARDA por 5/7/10 seg."},"Corte Crescente":{image:{image:"img/annie/Annie_21.webp",type:"Golpe Especial",description:"50% de chance de causar QUEBRA DE GUARDA por 5/7/10 segundos ao BLOQUEAR."},type:"Golpe Especial",description:"50% de chance de causar QUEBRA DE GUARDA por 5/7/10 segundos ao BLOQUEAR."},"Pilar de Destruição":{image:{image:"img/annie/Annie_22.webp",type:"Golpe Especial",description:"Em um GOLPE CRÍTICO, tira 5/7/10% adicionais da VIDA MÁX. do oponente."},type:"Golpe Especial",description:"Em um GOLPE CRÍTICO, tira 5/7/10% adicionais da VIDA MÁX. do oponente."},"Chuva de Meteoros":{image:{image:"img/annie/Annie_25.webp",type:"Golpe Especial",description:"CHANCE DE CRÍTICO 50/75/100% maior se o oponente tiver um BLOCKBUSTER totalmente carregado."},type:"Blockbuster",description:"CHANCE DE CRÍTICO 50/75/100% maior se o oponente tiver um BLOCKBUSTER totalmente carregado."},"Estilingue Gravitacional":{image:{image:"img/annie/Annie_28.webp",type:"Golpe Especial",description:"5% de chance de causar IMOBILIZAÇÃO por 10/12/15 segundos ao acertar um GOLPE."},type:"Blockbuster",description:"5% de chance de causar IMOBILIZAÇÃO por 10/12/15 segundos ao acertar um GOLPE."},"Foto Bop":{image:{image:"img/annie/Annie_29.webp",type:"Golpe Especial",description:"Transfere todos os EF. NEGATIVOS para o oponente.\\n\\nOs oponentes com menos de 25% de VIDA têm uma chance de 25/35/50% de serem derrotados instantaneamente."},type:"Blockbuster",description:"Transfere todos os EF. NEGATIVOS para o oponente.\\n\\nOs oponentes com menos de 25% de VIDA têm uma chance de 25/35/50% de serem derrotados instantaneamente."},"Pilar da Criação":{image:{image:"img/annie/Annie_27.webp",type:"Golpe Especial",description:"CURA os aliados em 50/75/100% do dano causado se usado com uma CONTAGEM DE COMBO de pelo menos 30."},type:"Blockbuster",description:"CURA os aliados em 50/75/100% do dano causado se usado com uma CONTAGEM DE COMBO de pelo menos 30."},"Raio Sagan":{image:{image:"img/annie/Annie_26.webp",type:"Golpe Especial",description:"25/35/50% do dano causado é recuperado como VIDA."},type:"Blockbuster",description:"25/35/50% do dano causado é recuperado como VIDA."},Reentrada:{image:{image:"img/annie/Annie_24.webp",type:"Golpe Especial",description:"Dá FÚRIA por 5/7/10 segundos se o terceiro golpe for um GOLPE CRÍTICO."},type:"Golpe Especial",description:"Dá FÚRIA por 5/7/10 segundos se o terceiro golpe for um GOLPE CRÍTICO."},"Punho do Norte":{image:{image:"img/annie/Annie_23.webp",type:"Golpe Especial",description:"Dá INABALÁVEL por 5/7/10 segundos se usado com uma CONTAGEM DE COMBO de pelo menos 15."},type:"Golpe Especial",description:"Dá INABALÁVEL por 5/7/10 segundos se usado com uma CONTAGEM DE COMBO de pelo menos 15."},"Corte Saturno":{image:{image:"img/annie/Annie_20.webp",type:"Golpe Especial",description:"**Expulsão**\\n\\nAo GOLPEAR, força o oponente a SAIR DA ASSISTÊNCIA, removendo todos os EFEITOS DE COMBATE."},type:"Golpe Especial",description:"**Expulsão**\\n\\nAo GOLPEAR, força o oponente a SAIR DA ASSISTÊNCIA, removendo todos os EFEITOS DE COMBATE."},"Nebulosa Refletora":{image:{image:"img/annie/Annie_18.webp",type:"Golpe Especial",description:"PROVOQUE o oponente para ganhar BLOQUEIO AUTOMÁTICO por 10/12/15 seg.\\n\\nSe usado como contragolpe, inflige IMOBILIZAÇÃO por 5 segundos."},type:"Golpe Especial",description:"PROVOQUE o oponente para ganhar BLOQUEIO AUTOMÁTICO por 10/12/15 seg.\\n\\nSe usado como contragolpe, inflige IMOBILIZAÇÃO por 5 segundos."}},beowulf:{"Aroo Ready?":{image:{image:"img/beowulf/Beowulf_17.webp",type:"Golpe Especial",description:"PROVOQUE seu oponente para ganhar ACELERAÇÃO por 10/12/15 segundos."},type:"Golpe Especial",description:"PROVOQUE seu oponente para ganhar ACELERAÇÃO por 10/12/15 segundos."},Explosão:{image:{image:"img/beowulf/Beowulf_18.webp",type:"Golpe Especial",description:"Ao GOLPEAR, inflige LENTIDÃO por 5/7/10 segundos."},type:"Golpe Especial",description:"Ao GOLPEAR, inflige LENTIDÃO por 5/7/10 segundos."},"Geatish Trepak":{image:{image:"img/beowulf/Beowulf_24.webp",type:"Golpe Especial",description:"25/35/50% de dano extra se usado no MODO HYPE."},type:"Blockbuster",description:"25/35/50% de dano extra se usado no MODO HYPE."},"Gigantic Arm":{image:{image:"img/beowulf/Beowulf_25.webp",type:"Golpe Especial",description:"Ao GOLPEAR, tem 15/20/25% de chance de ATORDOAR o oponente por 4/6 s e tem chance 25/50/100% maior de acertar um CRÍTICO enquanto estiver no MODO HYPE.\r"},type:"Blockbuster",description:"Ao GOLPEAR, tem 15/20/25% de chance de ATORDOAR o oponente por 4/6 s e tem chance 25/50/100% maior de acertar um CRÍTICO enquanto estiver no MODO HYPE.\r"},"Hurting Hurdle (Cadeira)":{image:{image:"img/beowulf/Beowulf_21.webp",type:"Golpe Especial",description:"Tem chance 25/50/100% maior de acertar um CRÍTICO."},type:"Golpe Especial",description:"Tem chance 25/50/100% maior de acertar um CRÍTICO."},"Wulf Shoot":{image:{image:"img/beowulf/Beowulf_23.webp",type:"Golpe Especial",description:""},type:"Golpe Especial",description:""},"Gigan Arm Sweep":{image:{image:"img/beowulf/Beowulf_20.webp",type:"Golpe Especial",description:"Ao GOLPEAR, inflige SANGRAMENTO por 4/8/12 s e ganha 10/15/20% de MEDIDOR DE BLOCKBUSTER. Também causa 15/20/25% a mais de dano enquanto estiver no MODO HYPE.\r"},type:"Golpe Especial",description:"Ao GOLPEAR, inflige SANGRAMENTO por 4/8/12 s e ganha 10/15/20% de MEDIDOR DE BLOCKBUSTER. Também causa 15/20/25% a mais de dano enquanto estiver no MODO HYPE.\r"},"Striker Kick":{image:{image:"img/beowulf/Beowulf_19.webp",type:"Golpe Especial",description:"**Expulsão**\\n\\nAo GOLPEAR, força o oponente a SAIR DA ASSISTÊNCIA, removendo todos os EFEITOS DE COMBATE."},type:"Golpe Especial",description:"**Expulsão**\\n\\nAo GOLPEAR, força o oponente a SAIR DA ASSISTÊNCIA, removendo todos os EFEITOS DE COMBATE."},"Lupine Pummel":{image:{image:"img/beowulf/Beowulf_26.webp",type:"Golpe Especial",description:"Ao GOLPEAR, tem 15/25/35% de chance de infligir QUEBRA DE GUARDA e MALDIÇÃO por 10 s.\r"},type:"Blockbuster",description:"Ao GOLPEAR, tem 15/25/35% de chance de infligir QUEBRA DE GUARDA e MALDIÇÃO por 10 s.\r"},"Three Wulf Moonsault":{image:{image:"img/beowulf/Beowulf_29.webp",type:"Golpe Especial",description:"Ao GOLPEAR, tem 25/50/100% de chance de REMOVER 1 EF. POS. do oponente. Oponentes derrotados não revivem se usado no MODO HYPE.\r"},type:"Blockbuster",description:"Ao GOLPEAR, tem 25/50/100% de chance de REMOVER 1 EF. POS. do oponente. Oponentes derrotados não revivem se usado no MODO HYPE.\r"},"Wulfamania!":{image:{image:"img/beowulf/Beowulf_28.webp",type:"Golpe Especial",description:"Ao usar para derrotar um oponente, recupera 25/35/50% da VIDA MÁX. de Beowulf instantaneamente. O efeito é dobrado ao usar o MODO HYPE.\r"},type:"Blockbuster",description:"Ao usar para derrotar um oponente, recupera 25/35/50% da VIDA MÁX. de Beowulf instantaneamente. O efeito é dobrado ao usar o MODO HYPE.\r"},"Wulf Blitzer":{image:{image:"img/beowulf/Beowulf_22.webp",type:"Golpe Especial",description:"Ao GOLPEAR, tem 25/50% de chance de infligir QUEBRA DE ARMADURA por 5/7 segundos."},type:"Golpe Especial",description:"Ao GOLPEAR, tem 25/50% de chance de infligir QUEBRA DE ARMADURA por 5/7 segundos."},Airwulf:{image:{image:"img/beowulf/Beowulf_27.webp",type:"Golpe Especial",description:"Ao GOLPEAR, tem 25/50/100% de chance de infligir QUEBRA DE ARMADURA e BLOQUEIO DE CURA por 10 s.\r"},type:"Blockbuster",description:"Ao GOLPEAR, tem 25/50/100% de chance de infligir QUEBRA DE ARMADURA e BLOQUEIO DE CURA por 10 s.\r"}},"big-band":{Explosão:{image:{image:"img/big-band/Big_Band_17.webp",type:"Golpe Especial",description:"Ao GOLPEAR, inflige INCAPACITAÇÃO por 5/7/10 segundos."},type:"Golpe Especial",description:"Ao GOLPEAR, inflige INCAPACITAÇÃO por 5/7/10 segundos."},"Pedalada Gigante":{image:{image:"img/big-band/Big_Band_22.webp",type:"Golpe Especial",description:"Remove todos os EF. POS. do oponente e desativa os GOLPES ESPECIAIS dele por 4/8/12 s ao GOLPEAR."},type:"Golpe Especial",description:"Remove todos os EF. POS. do oponente e desativa os GOLPES ESPECIAIS dele por 4/8/12 s ao GOLPEAR."},"Porrada de Pratos":{image:{image:"img/big-band/Big_Band_20.webp",type:"Golpe Especial",description:"20/35% de chance de ATORDOAR o oponente por 3/4 segundos ao GOLPEAR."},type:"Golpe Especial",description:"20/35% de chance de ATORDOAR o oponente por 3/4 segundos ao GOLPEAR."},"Soco Labrosone":{image:{image:"img/big-band/Big_Band_21.webp",type:"Golpe Especial",description:"Ao GOLPEAR, tem 50/100% de chance de infligir SANGRAMENTO por 4/6 segundos."},type:"Golpe Especial",description:"Ao GOLPEAR, tem 50/100% de chance de infligir SANGRAMENTO por 4/6 segundos."},"Solo de Soalha":{image:{image:"img/big-band/Big_Band_24.webp",type:"Golpe Especial",description:"Causa 2/5/8% de dano extra por cada GOLPE DE COMBO."},type:"Blockbuster",description:"Causa 2/5/8% de dano extra por cada GOLPE DE COMBO."},"Trompa Supersônica":{image:{image:"img/big-band/Big_Band_25.webp",type:"Golpe Especial",description:"15% de chance de infligir SANGRAMENTO FORTE por 5/7/10 s ao GOLPEAR."},type:"Blockbuster",description:"15% de chance de infligir SANGRAMENTO FORTE por 5/7/10 s ao GOLPEAR."},"Tuba Tuba":{image:{image:"img/big-band/Big_Band_29.webp",type:"Golpe Especial",description:"35% de chance de remover 1 EF. POS. do oponente ao GOLPEAR. O GOLPE final tem 50/75/100% de chance de ATORDOAR por 6 s."},type:"Blockbuster",description:"35% de chance de remover 1 EF. POS. do oponente ao GOLPEAR. O GOLPE final tem 50/75/100% de chance de ATORDOAR por 6 s."},"Motor Tympani":{image:{image:"img/big-band/Big_Band_26.webp",type:"Golpe Especial",description:"Ao GOLPEAR, tem 25% de chance de infligir QUEBRA DE ARMADURA por 5/7/10 s."},type:"Blockbuster",description:"Ao GOLPEAR, tem 25% de chance de infligir QUEBRA DE ARMADURA por 5/7/10 s."},"Siga o Compasso":{image:{image:"img/big-band/Big_Band_27.webp",type:"Golpe Especial",description:"Reduz o MED. DE BLOCKBUSTER do oponente em 8/10/12% a cada GOLPE acertado em GOLPES DE COMBO maiores que 10."},type:"Blockbuster",description:"Reduz o MED. DE BLOCKBUSTER do oponente em 8/10/12% a cada GOLPE acertado em GOLPES DE COMBO maiores que 10."},"Fôlego da Gaita":{image:{image:"img/big-band/Big_Band_16.webp",type:"Golpe Especial",description:"PROVOQUE o oponente para ganhar ARMADURA por 10/15/20 segundos."},type:"Golpe Especial",description:"PROVOQUE o oponente para ganhar ARMADURA por 10/15/20 segundos."},Intervalo:{image:{image:"img/big-band/Big_Band_19.webp",type:"Golpe Especial",description:"**Expulsão**\\n\\nAo GOLPEAR, força o oponente a SAIR DA ASSISTÊNCIA, removendo todos os EFEITOS DE COMBATE."},type:"Golpe Especial",description:"**Expulsão**\\n\\nAo GOLPEAR, força o oponente a SAIR DA ASSISTÊNCIA, removendo todos os EFEITOS DE COMBATE."},"Isolamento Acústico":{image:{image:"img/big-band/Big_Band_18.webp",type:"Golpe Especial",description:"Se usado como contragolpe, ATORDOA o oponente por 2/3/4 segundos."},type:"Golpe Especial",description:"Se usado como contragolpe, ATORDOA o oponente por 2/3/4 segundos."},"Doce Melodia":{image:{image:"img/big-band/Big_Band_23.webp",type:"Golpe Especial",description:"Reduz o MEDIDOR DE BLOCKBUSTER do oponente em 6/7/8% a cada GOLPE que acertar."},type:"Golpe Especial",description:"Reduz o MEDIDOR DE BLOCKBUSTER do oponente em 6/7/8% a cada GOLPE que acertar."},"Arautos em Fila":{image:{image:"img/big-band/Big_Band_28.webp",type:"Golpe Especial",description:"Ganhe 3 camadas de REGENERAÇÃO por 8/10/12 s."},type:"Blockbuster",description:"Ganhe 3 camadas de REGENERAÇÃO por 8/10/12 s."}},"black-dahlia":{"Te Vejo por Aí":{image:{image:"img/black-dahlia/Black_Dahlia_18.webp",type:"Golpe Especial",description:"**Expulsão**\\n\\nAo GOLPEAR, força o oponente a SAIR DA ASSISTÊNCIA, removendo todos os EFEITOS DE COMBATE."},type:"Golpe Especial",description:"**Expulsão**\\n\\nAo GOLPEAR, força o oponente a SAIR DA ASSISTÊNCIA, removendo todos os EFEITOS DE COMBATE."},Deslizando:{image:{image:"img/black-dahlia/Black_Dahlia_20.webp",type:"Golpe Especial",description:"Tem 50/75/100% de chance de remover todos os EF. NEG. quando usado."},type:"Golpe Especial",description:"Tem 50/75/100% de chance de remover todos os EF. NEG. quando usado."},Massacre:{image:{image:"img/black-dahlia/Black_Dahlia_24.webp",type:"Golpe Especial",description:"Ganhe OLHO-MORTO por 5/7/10 segundos ao golpear."},type:"Golpe Especial",description:"Ganhe OLHO-MORTO por 5/7/10 segundos ao golpear."},"Pêndulo da Morte":{image:{image:"img/black-dahlia/Black_Dahlia_22.webp",type:"Golpe Especial",description:"Tem chance 25/50/100% maior de acertar um CRÍTICO."},type:"Golpe Especial",description:"Tem chance 25/50/100% maior de acertar um CRÍTICO."},"Ratoeira dos Medici":{image:{image:"img/black-dahlia/Black_Dahlia_23.webp",type:"Golpe Especial",description:"Ao GOLPEAR, DESATIVA os BLOCKBUSTERS e inflige IMOBILIZAÇÃO por 8/10/12 segundos."},type:"Golpe Especial",description:"Ao GOLPEAR, DESATIVA os BLOCKBUSTERS e inflige IMOBILIZAÇÃO por 8/10/12 segundos."},Capacho:{image:{image:"img/black-dahlia/Black_Dahlia_26.webp",type:"Golpe Especial",description:"Ao GOLPEAR, inflige QUEBRA DE ARMADURA por 5/7/10 segundos."},type:"Blockbuster",description:"Ao GOLPEAR, inflige QUEBRA DE ARMADURA por 5/7/10 segundos."},Empoderar:{image:{image:"img/black-dahlia/Black_Dahlia_27.webp",type:"Golpe Especial",description:"Ao GOLPEAR, inflige MALDIÇÃO por 5/7/10 segundos."},type:"Blockbuster",description:"Ao GOLPEAR, inflige MALDIÇÃO por 5/7/10 segundos."},"Perigo no Cenário":{image:{image:"img/black-dahlia/Black_Dahlia_25.webp",type:"Golpe Especial",description:"50/75/100% de chance de infligir QUEBRA DE GUARDA por 10 segundos ao BLOQUEAR."},type:"Blockbuster",description:"50/75/100% de chance de infligir QUEBRA DE GUARDA por 10 segundos ao BLOQUEAR."},"Presente de Despedida":{image:{image:"img/black-dahlia/Black_Dahlia_28.webp",type:"Golpe Especial",description:"Causa 10/15/20% de dano extra por cada camada de EF. NEG. no oponente."},type:"Blockbuster",description:"Causa 10/15/20% de dano extra por cada camada de EF. NEG. no oponente."},"Contra, Ataque!":{image:{image:"img/black-dahlia/Black_Dahlia_21.webp",type:"Golpe Especial",description:"Se usado como contragolpe, inflige BLOQUEIO DE CURA por 4/8/12 segundos."},type:"Golpe Especial",description:"Se usado como contragolpe, inflige BLOQUEIO DE CURA por 4/8/12 segundos."},Explosão:{image:{image:"img/black-dahlia/Black_Dahlia_17.webp",type:"Golpe Especial",description:"Causa MARCA DA MORTE por 5/7/10 segundos quando acertar um GOLPE."},type:"Golpe Especial",description:"Causa MARCA DA MORTE por 5/7/10 segundos quando acertar um GOLPE."},"Noite das Garotas":{image:{image:"img/black-dahlia/Black_Dahlia_29.webp",type:"Golpe Especial",description:"Ao GOLPEAR, tem 25% de chance de infligir MARCA DA MORTE por 10/12/15 s (também se aplica a golpes bloqueados)."},type:"Blockbuster",description:"Ao GOLPEAR, tem 25% de chance de infligir MARCA DA MORTE por 10/12/15 s (também se aplica a golpes bloqueados)."},"Último Pedido":{image:{image:"img/black-dahlia/Black_Dahlia_30.webp",type:"Blockbuster",description:"Ganhe FÚRIA e OLHO-MORTO por 10/12/15 segundos se usado para derrotar um oponente."},type:"Blockbuster",description:"Ganhe FÚRIA e OLHO-MORTO por 10/12/15 segundos se usado para derrotar um oponente."},"É Suco de Maçã":{image:{image:"img/black-dahlia/Black_Dahlia_19.webp",type:"Golpe Especial",description:"PROVOQUE seu oponente para ganhar OLHO-MORTO por 10/12/15 segundos."},type:"Golpe Especial",description:"PROVOQUE seu oponente para ganhar OLHO-MORTO por 10/12/15 segundos."}},cerebella:{Explosão:{image:{image:"img/cerebella/Cerebella_18.webp",type:"Golpe Especial",description:"Ao GOLPEAR, inflige INCAPACITAÇÃO por 5/7/10 segundos."},type:"Golpe Especial",description:"Ao GOLPEAR, inflige INCAPACITAÇÃO por 5/7/10 segundos."},"Arremesso de Martelo":{image:{image:"img/cerebella/Cerebella_19.webp",type:"Golpe Especial",description:"**Expulsão**\\n\\nAo GOLPEAR, força o oponente a SAIR DA ASSISTÊNCIA, removendo todos os EFEITOS DE COMBATE."},type:"Golpe Especial",description:"**Expulsão**\\n\\nAo GOLPEAR, força o oponente a SAIR DA ASSISTÊNCIA, removendo todos os EFEITOS DE COMBATE."},"Cavalo de Alça":{image:{image:"img/cerebella/Cerebella_25.webp",type:"Golpe Especial",description:"Ao GOLPEAR, tem 10/20% de chance de infligir SANGRAMENTO por 5/7 segundos."},type:"Golpe Especial",description:"Ao GOLPEAR, tem 10/20% de chance de infligir SANGRAMENTO por 5/7 segundos."},Cerecóptero:{image:{image:"img/cerebella/Cerebella_22.webp",type:"Golpe Especial",description:"Ao GOLPEAR, tem 10/20% de chance de infligir QUEBRA DE ARMADURA por 5/7 segundos."},type:"Golpe Especial",description:"Ao GOLPEAR, tem 10/20% de chance de infligir QUEBRA DE ARMADURA por 5/7 segundos."},"Chifrada Montanhesa":{image:{image:"img/cerebella/Cerebella_20.webp",type:"Golpe Especial",description:"Ao GOLPEAR, inflige QUEBRA DE ARMADURA por 4/8/12 segundos."},type:"Golpe Especial",description:"Ao GOLPEAR, inflige QUEBRA DE ARMADURA por 4/8/12 segundos."},Gorilassel:{image:{image:"img/cerebella/Cerebella_24.webp",type:"Golpe Especial",description:""},type:"Golpe Especial",description:""},"Punho Engatilhado":{image:{image:"img/cerebella/Cerebella_23.webp",type:"Golpe Especial",description:"Tem chance 25/50/100% maior de acertar um CRÍTICO."},type:"Golpe Especial",description:"Tem chance 25/50/100% maior de acertar um CRÍTICO."},"Diamante Bruto":{image:{image:"img/cerebella/Cerebella_28.webp",type:"Golpe Especial",description:"15/25/35% de dano extra se o oponente estiver no ar."},type:"Blockbuster",description:"15/25/35% de dano extra se o oponente estiver no ar."},"Dínamo Diamante":{image:{image:"img/cerebella/Cerebella_27.webp",type:"Golpe Especial",description:"Causa 2/5/8% de dano extra por cada GOLPE DE COMBO."},type:"Blockbuster",description:"Causa 2/5/8% de dano extra por cada GOLPE DE COMBO."},Excelebella:{image:{image:"img/cerebella/Cerebella_29.webp",type:"Golpe Especial",description:"Ao GOLPEAR, tem 15/25% de chance de ATORDOAR o oponente por 4/6 segundos."},type:"Blockbuster",description:"Ao GOLPEAR, tem 15/25% de chance de ATORDOAR o oponente por 4/6 segundos."},"Final Mortal":{image:{image:"img/cerebella/Cerebella_31.webp",type:"Golpe Especial",description:"Se usado para derrotar um oponente, ganha 2 EFEITOS POSITIVOS aleatórios por 10/12/15 seg."},type:"Blockbuster",description:"Se usado para derrotar um oponente, ganha 2 EFEITOS POSITIVOS aleatórios por 10/12/15 seg."},"Trapézio Medici":{image:{image:"img/cerebella/Cerebella_17.webp",type:"Golpe Especial",description:"PROVOQUE o oponente para ganhar ARMADURA por 10/12/15 segundos."},type:"Golpe Especial",description:"PROVOQUE o oponente para ganhar ARMADURA por 10/12/15 segundos."},"Cortada de Chifre":{image:{image:"img/cerebella/Cerebella_21.webp",type:"Golpe Especial",description:"Tem chance 25/50/100% maior de acertar um CRÍTICO."},type:"Golpe Especial",description:"Tem chance 25/50/100% maior de acertar um CRÍTICO."},Amaciante:{image:{image:"img/cerebella/Cerebella_30.webp",type:"Golpe Especial",description:"Se usado para derrotar um oponente, ganha 2 camadas de ARMADURA por 10/12/15 seg."},type:"Blockbuster",description:"Se usado para derrotar um oponente, ganha 2 camadas de ARMADURA por 10/12/15 seg."},"Rede de Segurança":{image:{image:"img/cerebella/Cerebella_26.webp",type:"Golpe Especial",description:"Se usado para derrotar um oponente, ganha REGENERAÇÃO FORTE por 5/8/10 seg."},type:"Blockbuster",description:"Se usado para derrotar um oponente, ganha REGENERAÇÃO FORTE por 5/8/10 seg."}},double:{"Falsas intenções":{image:{image:"img/double/Double_19.webp",type:"Golpe Especial",description:"PROVOQUE o oponente para ganhar um EFEITO POSITIVO aleatório por 10/12/15 segundos."},type:"Golpe Especial",description:"PROVOQUE o oponente para ganhar um EFEITO POSITIVO aleatório por 10/12/15 segundos."},Explosão:{image:{image:"img/double/Double_17.webp",type:"Golpe Especial",description:"Ao GOLPEAR, inflige BLOQUEIO DE CURA por 5/7/10 segundos."},type:"Golpe Especial",description:"Ao GOLPEAR, inflige BLOQUEIO DE CURA por 5/7/10 segundos."},Fakesabiá:{image:{image:"img/double/Double_21.webp",type:"Golpe Especial",description:"Ao GOLPEAR, inflige BLOQUEIO DE CURA por 4/8/12 segundos."},type:"Golpe Especial",description:"Ao GOLPEAR, inflige BLOQUEIO DE CURA por 4/8/12 segundos."},"Fim da Picada":{image:{image:"img/double/Double_23.webp",type:"Golpe Especial",description:"Tem chance 25/50/100% maior de acertar um CRÍTICO."},type:"Golpe Especial",description:"Tem chance 25/50/100% maior de acertar um CRÍTICO."},"Luger Cover":{image:{image:"img/double/Double_24.webp",type:"Golpe Especial",description:"Ao GOLPEAR, inflige um EFEITO NEGATIVO aleatório por 4/8/12 segundos."},type:"Golpe Especial",description:"Ao GOLPEAR, inflige um EFEITO NEGATIVO aleatório por 4/8/12 segundos."},Pelinhoslide:{image:{image:"img/double/Double_22.webp",type:"Golpe Especial",description:"Ao GOLPEAR, inflige LENTIDÃO por 4/8/12 segundos."},type:"Golpe Especial",description:"Ao GOLPEAR, inflige LENTIDÃO por 4/8/12 segundos."},Gatélites:{image:{image:"img/double/Double_28.webp",type:"Golpe Especial",description:"Ao GOLPEAR, tem 2/3/5% de chance de remover todos os EFEITOS POSITIVOS."},type:"Blockbuster",description:"Ao GOLPEAR, tem 2/3/5% de chance de remover todos os EFEITOS POSITIVOS."},Megacaótico:{image:{image:"img/double/Double_29.webp",type:"Golpe Especial",description:"Reduz o MEDIDOR DE BLOCKBUSTER do oponente em 3/4/5% a cada GOLPE acertado."},type:"Blockbuster",description:"Reduz o MEDIDOR DE BLOCKBUSTER do oponente em 3/4/5% a cada GOLPE acertado."},Ligeirinho:{image:{image:"img/double/Double_20.webp",type:"Golpe Especial",description:""},type:"Golpe Especial",description:""},"Cabra da Peste":{image:{image:"img/double/Double_18.webp",type:"Golpe Especial",description:"**Expulsão**\\n\\nAo GOLPEAR, força o oponente a SAIR DA ASSISTÊNCIA, removendo todos os EFEITOS DE COMBATE."},type:"Golpe Especial",description:"**Expulsão**\\n\\nAo GOLPEAR, força o oponente a SAIR DA ASSISTÊNCIA, removendo todos os EFEITOS DE COMBATE."},Gunblades:{image:{image:"img/double/Double_26.webp",type:"Golpe Especial",description:"Ao GOLPEAR, tem 25/35/50% de chance de infligir SANGRAMENTO e BLOQUEIO DE CURA por 10 segundos."},type:"Blockbuster",description:"Ao GOLPEAR, tem 25/35/50% de chance de infligir SANGRAMENTO e BLOQUEIO DE CURA por 10 segundos."},"Hora do Pesadelo":{image:{image:"img/double/Double_30.webp",type:"Golpe Especial",description:"Se usado para derrotar um oponente, ganha 3 EFEITOS POSITIVOS aleatórios por 10/12/15 segundos."},type:"Blockbuster",description:"Se usado para derrotar um oponente, ganha 3 EFEITOS POSITIVOS aleatórios por 10/12/15 segundos."},"Besta de Gehenna":{image:{image:"img/double/Double_25.webp",type:"Golpe Especial",description:"25/35/50% de chance de colocar os GOLPES ESPECIAIS e TROCAS do oponente em REATIVAÇÃO."},type:"Blockbuster",description:"25/35/50% de chance de colocar os GOLPES ESPECIAIS e TROCAS do oponente em REATIVAÇÃO."},"Multidão Enfurecida":{image:{image:"img/double/Double_27.webp",type:"Golpe Especial",description:"Ao GOLPEAR, tem 25/35/50% de chance de infligir FEITIÇO por 10 segundos."},type:"Blockbuster",description:"Ao GOLPEAR, tem 25/35/50% de chance de infligir FEITIÇO por 10 segundos."}},eliza:{"Damas Escarlates":{image:{image:"img/eliza/Eliza_19.webp",type:"Golpe Especial",description:"PROVOQUE o oponente para ganhar REGENERAÇÃO por 10/12/15 segundos."},type:"Golpe Especial",description:"PROVOQUE o oponente para ganhar REGENERAÇÃO por 10/12/15 segundos."},"Exílio do Paraíso":{image:{image:"img/eliza/Eliza_18.webp",type:"Golpe Especial",description:"**Expulsão**\\n\\nAo GOLPEAR, força o oponente a SAIR DA ASSISTÊNCIA, removendo todos os EFEITOS DE COMBATE."},type:"Golpe Especial",description:"**Expulsão**\\n\\nAo GOLPEAR, força o oponente a SAIR DA ASSISTÊNCIA, removendo todos os EFEITOS DE COMBATE."},Ascenção:{image:{image:"img/eliza/Eliza_26.webp",type:"Golpe Especial",description:"25/50% de chance de ATORDOAR o oponente por 4/6 segundos ao GOLPEAR."},type:"Golpe Especial",description:"25/50% de chance de ATORDOAR o oponente por 4/6 segundos ao GOLPEAR."},"Banir o caos":{image:{image:"img/eliza/Eliza_21.webp",type:"Golpe Especial",description:"Remove todos os EFEITOS POSITIVOS do oponente e inflige BLOQUEIO DE CURA por 4/8/12 seg (ao BLOQUEAR também)."},type:"Golpe Especial",description:"Remove todos os EFEITOS POSITIVOS do oponente e inflige BLOQUEIO DE CURA por 4/8/12 seg (ao BLOQUEAR também)."},"Espiral de Osíris":{image:{image:"img/eliza/Eliza_24.webp",type:"Golpe Especial",description:"5/10% de chance de infligir SANGRAMENTO FORTE por 5/10 segundos ao GOLPEAR."},type:"Golpe Especial",description:"5/10% de chance de infligir SANGRAMENTO FORTE por 5/10 segundos ao GOLPEAR."},"Mergulho de Hórus":{image:{image:"img/eliza/Eliza_22.webp",type:"Golpe Especial",description:"Tem chance 25/50/100% maior de acertar um CRÍTICO."},type:"Golpe Especial",description:"Tem chance 25/50/100% maior de acertar um CRÍTICO."},"Peso de Anúbis":{image:{image:"img/eliza/Eliza_20.webp",type:"Golpe Especial",description:""},type:"Golpe Especial",description:""},"Dama do Massacre":{image:{image:"img/eliza/Eliza_32.webp",type:"Golpe Especial",description:"50/75/100% de chance de infligir um EF. NEGATIVO. aleatório por 10 seg e colocar GOLPES ESPECIAIS e ASSISTÊNCIAS do oponente em REATIVAÇÃO."},type:"Blockbuster",description:"50/75/100% de chance de infligir um EF. NEGATIVO. aleatório por 10 seg e colocar GOLPES ESPECIAIS e ASSISTÊNCIAS do oponente em REATIVAÇÃO."},"Fúria da Sekhmet":{image:{image:"img/eliza/Eliza_29.webp",type:"Golpe Especial",description:"Ao GOLPEAR, tem 25/35/50% de chance de ganhar FÚRIA E ACELERAÇÃO por 10 seg."},type:"Blockbuster",description:"Ao GOLPEAR, tem 25/35/50% de chance de ganhar FÚRIA E ACELERAÇÃO por 10 seg."},"Mordida da Sekhmet":{image:{image:"img/eliza/Eliza_27.webp",type:"Golpe Especial",description:"Ao GOLPEAR, tem 25/35/50% de chance de infligir QUEBRA DE ARMADURA e MALDIÇÃO por 10 seg."},type:"Blockbuster",description:"Ao GOLPEAR, tem 25/35/50% de chance de infligir QUEBRA DE ARMADURA e MALDIÇÃO por 10 seg."},"Meio da Esfinge":{image:{image:"img/eliza/Eliza_30.webp",type:"Golpe Especial",description:"Ao GOLPEAR, reduz o MEDIDOR DE BLOCKBUSTER do oponente em 25/35/50%."},type:"Golpe Especial",description:"Ao GOLPEAR, reduz o MEDIDOR DE BLOCKBUSTER do oponente em 25/35/50%."},Explosão:{image:{image:"img/eliza/Eliza_17.webp",type:"Golpe Especial",description:"Inflige MALDIÇÃO por 5/7/10 segundos ao GOLPEAR"},type:"Golpe Especial",description:"Inflige MALDIÇÃO por 5/7/10 segundos ao GOLPEAR"},"Nekhbet, a Abutre":{image:{image:"img/eliza/Eliza_30.webp",type:"Golpe Especial",description:"Ao GOLPEAR, tem 25/35/50% de chance de infligir QUEBRA DE ARMADURA por 8 segundos."},type:"Blockbuster",description:"Ao GOLPEAR, tem 25/35/50% de chance de infligir QUEBRA DE ARMADURA por 8 segundos."},"Trono de Ísis":{image:{image:"img/eliza/Eliza_25.webp",type:"Golpe Especial",description:""},type:"Golpe Especial",description:""},"Vez da Sekhmet":{image:{image:"img/eliza/Eliza_28.webp",type:"Golpe Especial",description:"Ao GOLPEAR, tem 25/35/50% de chance de infligir SANGRAMENTO e BLOQUEIO DE CURA por 10 seg."},type:"Blockbuster",description:"Ao GOLPEAR, tem 25/35/50% de chance de infligir SANGRAMENTO e BLOQUEIO DE CURA por 10 seg."},"Sol de Khepri":{image:{image:"img/eliza/Eliza_30.webp",type:"Golpe Especial",description:"Causa 25/35/50% de dano extra se o oponente estiver sofrendo um EFEITO NEGATIVO."},type:"Blockbuster",description:"Causa 25/35/50% de dano extra se o oponente estiver sofrendo um EFEITO NEGATIVO."}},filia:{Explosão:{image:{image:"img/filia/Filia_18.webp",type:"Golpe Especial",description:"Ao GOLPEAR, inflige SANGRAMENTO por 5/7/10 segundos."},type:"Golpe Especial",description:"Ao GOLPEAR, inflige SANGRAMENTO por 5/7/10 segundos."},"Mechas Soltas":{image:{image:"img/filia/Filia_19.webp",type:"Golpe Especial",description:"**Expulsão**\\n\\nAo GOLPEAR, força o oponente a SAIR DA ASSISTÊNCIA, removendo todos os EFEITOS DE COMBATE."},type:"Golpe Especial",description:"**Expulsão**\\n\\nAo GOLPEAR, força o oponente a SAIR DA ASSISTÊNCIA, removendo todos os EFEITOS DE COMBATE."},"Espinho Trançado":{image:{image:"img/filia/Filia_23.webp",type:"Golpe Especial",description:"Ao GOLPEAR, inflige SANGRAMENTO por 4/8/12 segundos."},type:"Golpe Especial",description:"Ao GOLPEAR, inflige SANGRAMENTO por 4/8/12 segundos."},Cuspida:{image:{image:"img/filia/Filia_29.webp",type:"Golpe Especial",description:"Reduz o MEDIDOR DE BLOCKBUSTER do oponente em 25/35/50%."},type:"Blockbuster",description:"Reduz o MEDIDOR DE BLOCKBUSTER do oponente em 25/35/50%."},"Die Verwandlung":{image:{image:"img/filia/Filia_24.webp",type:"Golpe Especial",description:"Ao GOLPEAR, tem 10/15/20% de chance de infligir SANGRAMENTO por 5 segundos."},type:"Blockbuster",description:"Ao GOLPEAR, tem 10/15/20% de chance de infligir SANGRAMENTO por 5 segundos."},"Senta a Pua!":{image:{image:"img/filia/Filia_25.webp",type:"Golpe Especial",description:"Ao GOLPEAR, tem 5/10/15% de chance de remover todos os EFEITOS POSITIVOS."},type:"Blockbuster",description:"Ao GOLPEAR, tem 5/10/15% de chance de remover todos os EFEITOS POSITIVOS."},Tricobezoar:{image:{image:"img/filia/Filia_27.webp",type:"Golpe Especial",description:"15/25/35% de dano extra se o oponente estiver no ar."},type:"Blockbuster",description:"15/25/35% de dano extra se o oponente estiver no ar."},"Pico de Viúva":{image:{image:"img/filia/Filia_26.webp",type:"Golpe Especial",description:"Ao GOLPEAR, tem 50/75/100% de chance de infligir INCAPACITAÇÃO e QUEBRA DE ARMADURA por 10 seg."},type:"Blockbuster",description:"Ao GOLPEAR, tem 50/75/100% de chance de infligir INCAPACITAÇÃO e QUEBRA DE ARMADURA por 10 seg."},"Lobo Devorador":{image:{image:"img/filia/Filia_28.webp",type:"Golpe Especial",description:"25/35/50% de dano extra se o oponente tiver um efeito de SANGRAMENTO."},type:"Blockbuster",description:"25/35/50% de dano extra se o oponente tiver um efeito de SANGRAMENTO."},"Bola de Cabelo":{image:{image:"img/filia/Filia_22.webp",type:"Golpe Especial",description:""},type:"Golpe Especial",description:""},"Coque Francês":{image:{image:"img/filia/Filia_21.webp",type:"Golpe Especial",description:"Ao GOLPEAR, tem 25/50% de chance de infligir SANGRAMENTO por 3/5 segundos."},type:"Golpe Especial",description:"Ao GOLPEAR, tem 25/50% de chance de infligir SANGRAMENTO por 3/5 segundos."},Brocamizade:{image:{image:"img/filia/Filia_20.webp",type:"Golpe Especial",description:"Tem chance 25/50/100% maior de acertar um CRÍTICO."},type:"Golpe Especial",description:"Tem chance 25/50/100% maior de acertar um CRÍTICO."},"É de Nascença":{image:{image:"img/filia/Filia_17.webp",type:"Golpe Especial",description:"PROVOQUE o oponente para ganhar FÚRIA por 10/12/15 segundos."},type:"Golpe Especial",description:"PROVOQUE o oponente para ganhar FÚRIA por 10/12/15 segundos."}},fukua:{Explosão:{image:{image:"img/fukua/Fukua_18.webp",type:"Golpe Especial",description:"Ao GOLPEAR, inflige FADIGA por 15/13/10 seg."},type:"Golpe Especial",description:"Ao GOLPEAR, inflige FADIGA por 15/13/10 seg."},Brocamizade:{image:{image:"img/fukua/Fukua_20.webp",type:"Golpe Especial",description:"Causa MARCA DE MORTE, QUEBRA DE ARMADURA e INCAPACITAÇÃO por 10/12/15 seg cada, se o golpe final for CRÍTICO."},type:"Golpe Especial",description:"Causa MARCA DE MORTE, QUEBRA DE ARMADURA e INCAPACITAÇÃO por 10/12/15 seg cada, se o golpe final for CRÍTICO."},"Clone Solitário":{image:{image:"img/fukua/Fukua_21.webp",type:"Golpe Especial",description:"Ao GOLPEAR, causa BLOQUEIO DE CURA por 10/12/15 seg. A VIDA drena lentamente enquanto um Clone é preparado."},type:"Golpe Especial",description:"Ao GOLPEAR, causa BLOQUEIO DE CURA por 10/12/15 seg. A VIDA drena lentamente enquanto um Clone é preparado."},"Tiros de Amor":{image:{image:"img/fukua/Fukua_24.webp",type:"Golpe Especial",description:"INDEFENSÁVEL se o oponente estiver distante. Ao GOLPEAR, drena 5/10/15% do MEDIDOR DE BLOCKBUSTER ou 15/20/25% se o oponente estiver longe."},type:"Golpe Especial",description:"INDEFENSÁVEL se o oponente estiver distante. Ao GOLPEAR, drena 5/10/15% do MEDIDOR DE BLOCKBUSTER ou 15/20/25% se o oponente estiver longe."},"Beijo de Boa noite":{image:{image:"img/fukua/Fukua_25.webp",type:"Golpe Especial",description:"10/15/25% de chance de infligir DEFINHAR e FADIGA por 10 seg cada ao GOLPEAR."},type:"Blockbuster",description:"10/15/25% de chance de infligir DEFINHAR e FADIGA por 10 seg cada ao GOLPEAR."},"Broca Sonhadora":{image:{image:"img/fukua/Fukua_26.webp",type:"Golpe Especial",description:"Causa 2/5/8% de dano extra por cada GOLPE DE COMBO."},type:"Blockbuster",description:"Causa 2/5/8% de dano extra por cada GOLPE DE COMBO."},"Conchinha Inevitável":{image:{image:"img/fukua/Fukua_27.webp",type:"Golpe Especial",description:"Dá 1/2/3 camadas de MIASMA por 10 seg se usado para derrotar um oponente.\\n\\n50% do dano causado é recuperado como VIDA."},type:"Blockbuster",description:"Dá 1/2/3 camadas de MIASMA por 10 seg se usado para derrotar um oponente.\\n\\n50% do dano causado é recuperado como VIDA."},"Melhores Amigos!":{image:{image:"img/fukua/Fukua_28.webp",type:"Golpe Especial",description:"15/20/25% de chance de transferir todos os EF. NEGATIVOS para o oponente e todos EF. POSITIVOS do oponente para você ao GOLPEAR."},type:"Blockbuster",description:"15/20/25% de chance de transferir todos os EF. NEGATIVOS para o oponente e todos EF. POSITIVOS do oponente para você ao GOLPEAR."},"Uma Vez Mordido...":{image:{image:"img/fukua/Fukua_29.webp",type:"Golpe Especial",description:"Causa 25/35/50% de dano bônus se o oponente tiver mais de 50% DE VIDA.\\n\\n50% do dano causado é recuperado como VIDA."},type:"Blockbuster",description:"Causa 25/35/50% de dano bônus se o oponente tiver mais de 50% DE VIDA.\\n\\n50% do dano causado é recuperado como VIDA."},"Mechas Soltas":{image:{image:"img/fukua/Fukua_19.webp",type:"Golpe Especial",description:"**Expulsão**\\n\\nAo GOLPEAR, força o oponente a SAIR DA ASSISTÊNCIA, removendo todos os EFEITOS DE COMBATE."},type:"Golpe Especial",description:"**Expulsão**\\n\\nAo GOLPEAR, força o oponente a SAIR DA ASSISTÊNCIA, removendo todos os EFEITOS DE COMBATE."},"Flecha do Cupido":{image:{image:"img/fukua/Fukua_23.webp",type:"Golpe Especial",description:"Ao GOLPEAR, drena 5/10/15% do MEDIDOR DE BLOCKBUSTER ou 15/20/25% se o oponente estiver longe."},type:"Golpe Especial",description:"Ao GOLPEAR, drena 5/10/15% do MEDIDOR DE BLOCKBUSTER ou 15/20/25% se o oponente estiver longe."},Indefeso:{image:{image:"img/fukua/Fukua_17.webp",type:"Golpe Especial",description:"PROVOQUE no seu oponente para ganhar MIASMA por 10/12/15 seg e recuperar 5% de VIDA."},type:"Golpe Especial",description:"PROVOQUE no seu oponente para ganhar MIASMA por 10/12/15 seg e recuperar 5% de VIDA."},"Abraço de Inseto":{image:{image:"img/fukua/Fukua_22.webp",type:"Golpe Especial",description:"Ao GOLPEAR, inflige FADIGA por 15/13/10 seg. A VIDA drena lentamente enquanto um Clone é preparado."},type:"Golpe Especial",description:"Ao GOLPEAR, inflige FADIGA por 15/13/10 seg. A VIDA drena lentamente enquanto um Clone é preparado."},"De Pernas pro Ar":{image:{image:"img/fukua/Fukua_30.webp",type:"Golpe Especial",description:"Causa dano adicional de 5/10/15% para cada 10% DE VIDA perdida por Fukua."},type:"Blockbuster",description:"Causa dano adicional de 5/10/15% para cada 10% DE VIDA perdida por Fukua."}},marie:{Explosão:{image:{image:"img/marie/Marie_16.webp",type:"Golpe Especial",description:"Ao GOLPEAR, inflige QUIETUS por 10/12/15 segundos."},type:"Golpe Especial",description:"Ao GOLPEAR, inflige QUIETUS por 10/12/15 segundos."},"Desafio Formal":{image:{image:"img/marie/Marie_17.webp",type:"Golpe Especial",description:"**Expulsão**\\n\\nAo GOLPEAR, força o oponente a SAIR DA ASSISTÊNCIA, removendo todos os EFEITOS DE COMBATE."},type:"Golpe Especial",description:"**Expulsão**\\n\\nAo GOLPEAR, força o oponente a SAIR DA ASSISTÊNCIA, removendo todos os EFEITOS DE COMBATE."},"Carrossel da Marie":{image:{image:"img/marie/Marie_21.webp",type:"Golpe Especial",description:"Ao GOLPEAR, inflige QUEBRA DE ARMADURA por 4/8/12 segundos."},type:"Golpe Especial",description:"Ao GOLPEAR, inflige QUEBRA DE ARMADURA por 4/8/12 segundos."},"Fazedor de Feno de Hilgard":{image:{image:"img/marie/Marie_20.webp",type:"Golpe Especial",description:"INVOCAÇÃO ESQUELÉTICA: ao GOLPEAR, inflige QUIETUS por 5/7/10 segundos."},type:"Golpe Especial",description:"INVOCAÇÃO ESQUELÉTICA: ao GOLPEAR, inflige QUIETUS por 5/7/10 segundos."},"Obstrução da Sucção":{image:{image:"img/marie/Marie_22.webp",type:"Golpe Especial",description:""},type:"Golpe Especial",description:""},"Pula-Pula":{image:{image:"img/marie/Marie_23.webp",type:"Golpe Especial",description:"INVOCAÇÃO ESQUELÉTICA: 15/20/25% de chance de infligir SANGRAMENTO FORTE por 5 segundos ao GOLPEAR."},type:"Golpe Especial",description:"INVOCAÇÃO ESQUELÉTICA: 15/20/25% de chance de infligir SANGRAMENTO FORTE por 5 segundos ao GOLPEAR."},"Esmurrar Até Cansar":{image:{image:"img/marie/Marie_25.webp",type:"Golpe Especial",description:"INVOCAÇÃO ESQUELÉTICA: 20/35% de chance de infligir ATORDOAMENTO por 3/4 segundos ao GOLPEAR. INDEFENSÁVEL se o oponente estiver sofrendo de QUIETUS."},type:"Blockbuster",description:"INVOCAÇÃO ESQUELÉTICA: 20/35% de chance de infligir ATORDOAMENTO por 3/4 segundos ao GOLPEAR. INDEFENSÁVEL se o oponente estiver sofrendo de QUIETUS."},"Impacto Esquelético Repetido":{image:{image:"img/marie/Marie_29.webp",type:"Golpe Especial",description:"INVOCAÇÃO ESQUELÉTICA: inflige POLARIDADE INVERSA por 10/12/15 segundos ao GOLPEAR. Causa 50% de dano extra se CARREGADO."},type:"Blockbuster",description:"INVOCAÇÃO ESQUELÉTICA: inflige POLARIDADE INVERSA por 10/12/15 segundos ao GOLPEAR. Causa 50% de dano extra se CARREGADO."},"Uivo de Hilgard":{image:{image:"img/marie/Marie_26.webp",type:"Golpe Especial",description:"INVOCAÇÃO ESQUELÉTICA: 35% de chance de infligir QUIETUS por 10/12/15 segundos ao GOLPEAR."},type:"Blockbuster",description:"INVOCAÇÃO ESQUELÉTICA: 35% de chance de infligir QUIETUS por 10/12/15 segundos ao GOLPEAR."},"O Peso da sua Vontade":{image:{image:"img/marie/Marie_28.webp",type:"Golpe Especial",description:"Reduz o MEDIDOR DE BLOCKBUSTER do oponente em 2/3/4% a cada GOLPE que acertar."},type:"Blockbuster",description:"Reduz o MEDIDOR DE BLOCKBUSTER do oponente em 2/3/4% a cada GOLPE que acertar."},"Manobra Roomba":{image:{image:"img/marie/Marie_27.webp",type:"Golpe Especial",description:"25/35/50% do dano causado é recuperado como VIDA."},type:"Blockbuster",description:"25/35/50% do dano causado é recuperado como VIDA."},"Limpeza Geral":{image:{image:"img/marie/Marie_24.webp",type:"Golpe Especial",description:"25/50/75% de chance de remover todos os EFEITOS POSITIVOS ao GOLPEAR."},type:"Blockbuster",description:"25/50/75% de chance de remover todos os EFEITOS POSITIVOS ao GOLPEAR."},"Explosão do Fole":{image:{image:"img/marie/Marie_19.webp",type:"Golpe Especial",description:"50/75/100% de chance ao GOLPEAR (inclui golpes bloqueados) para transferir 1 EF. NEG. de si mesma para o oponente."},type:"Golpe Especial",description:"50/75/100% de chance ao GOLPEAR (inclui golpes bloqueados) para transferir 1 EF. NEG. de si mesma para o oponente."},"Um Momento no Tempo":{image:{image:"img/marie/Marie_18.webp",type:"Golpe Especial",description:"PROVOQUE seu oponente para ganhar um EF. POS. aleatório por 10/12/15 segundos. Também inflige DEFINHAR por 10 segundos se CARREGADO."},type:"Golpe Especial",description:"PROVOQUE seu oponente para ganhar um EF. POS. aleatório por 10/12/15 segundos. Também inflige DEFINHAR por 10 segundos se CARREGADO."}},"ms-fortune":{"Gato sonolento":{image:{image:"img/ms-fortune/Ms_Fortune_19.webp",type:"Golpe Especial",description:"PROVOQUE seu oponente para ganhar 1/2/3 camada(s) de PRECISÃO."},type:"Golpe Especial",description:"PROVOQUE seu oponente para ganhar 1/2/3 camada(s) de PRECISÃO."},Explosão:{image:{image:"img/ms-fortune/Ms_Fortune_17.webp",type:"Golpe Especial",description:"Causa MARCA DA MORTE por 5/7/10 segundos quando acertar um GOLPE."},type:"Golpe Especial",description:"Causa MARCA DA MORTE por 5/7/10 segundos quando acertar um GOLPE."},"Deslisada felina":{image:{image:"img/ms-fortune/Ms_Fortune_21.webp",type:"Golpe Especial",description:"Causa 25/35/50% de dano extra contra oponentes sofrendo um EFEITO NEGATIVO."},type:"Golpe Especial",description:"Causa 25/35/50% de dano extra contra oponentes sofrendo um EFEITO NEGATIVO."},"El Gato":{image:{image:"img/ms-fortune/Ms_Fortune_22.webp",type:"Golpe Especial",description:"25/35/50% de chance infligir ATORDOAMENTO por 4 segundos ao acertar um CRÍTICO."},type:"Golpe Especial",description:"25/35/50% de chance infligir ATORDOAMENTO por 4 segundos ao acertar um CRÍTICO."},Fibrosa:{image:{image:"img/ms-fortune/Ms_Fortune_23.webp",type:"Golpe Especial",description:"Ao GOLPEAR, inflige QUEBRA DE ARMADURA por 4/8/12 segundos."},type:"Golpe Especial",description:"Ao GOLPEAR, inflige QUEBRA DE ARMADURA por 4/8/12 segundos."},"Cinco de desmembro":{image:{image:"img/ms-fortune/Ms_Fortune_28.webp",type:"Golpe Especial",description:"Causa 50/75/100% de dano extra se o oponente tiver menos de 50% de VIDA. Sacrifica 25% da sua VIDA restante."},type:"Blockbuster",description:"Causa 50/75/100% de dano extra se o oponente tiver menos de 50% de VIDA. Sacrifica 25% da sua VIDA restante."},"Febre de gato":{image:{image:"img/ms-fortune/Ms_Fortune_25.webp",type:"Golpe Especial",description:"Causa 3/5/8% de dano adicional por GOLPE COMBO e inflige MARCA DA MORTE por 10 seg. (ao BLOQUEAR também)."},type:"Blockbuster",description:"Causa 3/5/8% de dano adicional por GOLPE COMBO e inflige MARCA DA MORTE por 10 seg. (ao BLOQUEAR também)."},"NHAM NHAM NHAM":{image:{image:"img/ms-fortune/Ms_Fortune_26.webp",type:"Golpe Especial",description:"25/35/50% do dano causado é recuperado como VIDA."},type:"Blockbuster",description:"25/35/50% do dano causado é recuperado como VIDA."},Patadas:{image:{image:"img/ms-fortune/Ms_Fortune_24.webp",type:"Golpe Especial",description:"Ao GOLPEAR, tem 25/35/50% de chance de infligir SANGRAMENTO por 5 segundos."},type:"Blockbuster",description:"Ao GOLPEAR, tem 25/35/50% de chance de infligir SANGRAMENTO por 5 segundos."},"Gata-pulta":{image:{image:"img/ms-fortune/Ms_Fortune_18.webp",type:"Golpe Especial",description:"**Expulsão**\\n\\nAo GOLPEAR, força o oponente a SAIR DA ASSISTÊNCIA, removendo todos os EFEITOS DE COMBATE."},type:"Golpe Especial",description:"**Expulsão**\\n\\nAo GOLPEAR, força o oponente a SAIR DA ASSISTÊNCIA, removendo todos os EFEITOS DE COMBATE."},"Arranhão de gato":{image:{image:"img/ms-fortune/Ms_Fortune_20.webp",type:"Golpe Especial",description:"Cada GOLPE tem 15/25/35% de chance de infligir MARCA DA MORTE por 10 s ou QUEBRA DE ARMAD. por 10 s se o ataque for BLOQUEADO."},type:"Golpe Especial",description:"Cada GOLPE tem 15/25/35% de chance de infligir MARCA DA MORTE por 10 s ou QUEBRA DE ARMAD. por 10 s se o ataque for BLOQUEADO."},"Fúria feral":{image:{image:"img/ms-fortune/Ms_Fortune_27.webp",type:"Golpe Especial",description:"Causa dano adicional igual a 5/7/10% da VIDA MÁXIMA do oponente se o golpe final for um CRÍTICO."},type:"Blockbuster",description:"Causa dano adicional igual a 5/7/10% da VIDA MÁXIMA do oponente se o golpe final for um CRÍTICO."}},painwheel:{Explosão:{image:{image:"img/painwheel/Painwheel_17.webp",type:"Golpe Especial",description:"Causa MARCA DA MORTE por 5/7/10 segundos quando acertar um GOLPE."},type:"Golpe Especial",description:"Causa MARCA DA MORTE por 5/7/10 segundos quando acertar um GOLPE."},"Eixo de Corrida":{image:{image:"img/painwheel/Painwheel_22.webp",type:"Golpe Especial",description:""},type:"Golpe Especial",description:""},"Ferrão Gae Bolga":{image:{image:"img/painwheel/Painwheel_21.webp",type:"Golpe Especial",description:"Tem chance 25/50/100% maior de acertar um CRÍTICO."},type:"Golpe Especial",description:"Tem chance 25/50/100% maior de acertar um CRÍTICO."},"Colheita de Buer":{image:{image:"img/painwheel/Painwheel_27.webp",type:"Golpe Especial",description:"Ao GOLPEAR, tem 15/25% de chance de infligir QUEBRA DE ARMADURA por 5/10 segundos."},type:"Blockbuster",description:"Ao GOLPEAR, tem 15/25% de chance de infligir QUEBRA DE ARMADURA por 5/10 segundos."},"Morte Rastejante":{image:{image:"img/painwheel/Painwheel_25.webp",type:"Golpe Especial",description:"Ao GOLPEAR, tem 5/10% de chance de infligir SANGRAMENTO por 3/6 segundos."},type:"Blockbuster",description:"Ao GOLPEAR, tem 5/10% de chance de infligir SANGRAMENTO por 3/6 segundos."},"Sobrecarga de Buer":{image:{image:"img/painwheel/Painwheel_28.webp",type:"Golpe Especial",description:"Reduz o MEDIDOR DE BLOCKBUSTER do oponente em 3/5/7% a cada GOLPE acertado."},type:"Blockbuster",description:"Reduz o MEDIDOR DE BLOCKBUSTER do oponente em 3/5/7% a cada GOLPE acertado."},"Carga de Ódio":{image:{image:"img/painwheel/Painwheel_24.webp",type:"Golpe Especial",description:"Ao GOLPEAR, tem 25/50/100% de chance de ganhar FÚRIA por 10 segundos."},type:"Blockbuster",description:"Ao GOLPEAR, tem 25/50/100% de chance de ganhar FÚRIA por 10 segundos."},"Boca-de-Dragão":{image:{image:"img/painwheel/Painwheel_18.webp",type:"Golpe Especial",description:"**Expulsão**\\n\\nAo GOLPEAR, força o oponente a SAIR DA ASSISTÊNCIA, removendo todos os EFEITOS DE COMBATE."},type:"Golpe Especial",description:"**Expulsão**\\n\\nAo GOLPEAR, força o oponente a SAIR DA ASSISTÊNCIA, removendo todos os EFEITOS DE COMBATE."},"Sorria!":{image:{image:"img/painwheel/Painwheel_19.webp",type:"Golpe Especial",description:"PROVOQUE o oponente para ganhar FÚRIA por 10/12/15 segundos."},type:"Golpe Especial",description:"PROVOQUE o oponente para ganhar FÚRIA por 10/12/15 segundos."},"Rancor Violeta":{image:{image:"img/painwheel/Painwheel_23.webp",type:"Golpe Especial",description:"5/10% de chance de infligir SANGRAMENTO FORTE por 5/10 segundos ao GOLPEAR."},type:"Golpe Especial",description:"5/10% de chance de infligir SANGRAMENTO FORTE por 5/10 segundos ao GOLPEAR."},"Lírio Cruel":{image:{image:"img/painwheel/Painwheel_20.webp",type:"Golpe Especial",description:"Ao GOLPEAR, tem 15/25% de chance de infligir SANGRAMENTO por 2/4 segundos."},type:"Golpe Especial",description:"Ao GOLPEAR, tem 15/25% de chance de infligir SANGRAMENTO por 2/4 segundos."},"Foice Fraturada":{image:{image:"img/painwheel/Painwheel_26.webp",type:"Golpe Especial",description:"Ao GOLPEAR, tem 15/20/25% de chance de infligir MARCA DA MORTE por 10 seg."},type:"Blockbuster",description:"Ao GOLPEAR, tem 15/20/25% de chance de infligir MARCA DA MORTE por 10 seg."}},parasoul:{Bâillement:{image:{image:"img/parasoul/Parasoul_20.webp",type:"Golpe Especial",description:"PROVOQUE o oponente para ganhar IMUNIDADE por 10/12/15 segundos."},type:"Golpe Especial",description:"PROVOQUE o oponente para ganhar IMUNIDADE por 10/12/15 segundos."},"Chamado da Garça":{image:{image:"img/parasoul/Parasoul_21.webp",type:"Golpe Especial",description:"PROVOQUE seu oponente para ganhar 1/2/3 camada(s) de PRECISÃO."},type:"Golpe Especial",description:"PROVOQUE seu oponente para ganhar 1/2/3 camada(s) de PRECISÃO."},"Gatilho de napalm":{image:{image:"img/parasoul/Parasoul_24.webp",type:"Golpe Especial",description:""},type:"Golpe Especial",description:""},"Tiro de Napalm":{image:{image:"img/parasoul/Parasoul_26.webp",type:"Golpe Especial",description:"Ao GOLPEAR, tem 50/100% de chance de infligir SANGRAMENTO por 5/8 segundos."},type:"Golpe Especial",description:"Ao GOLPEAR, tem 50/100% de chance de infligir SANGRAMENTO por 5/8 segundos."},"Brigada Infernal":{image:{image:"img/parasoul/Parasoul_31.webp",type:"Golpe Especial",description:"50/75/100% de dano extra enquanto pelo menos 3 LÁGRIMAS estiverem ativas."},type:"Blockbuster",description:"50/75/100% de dano extra enquanto pelo menos 3 LÁGRIMAS estiverem ativas."},"Brigada Motorizada":{image:{image:"img/parasoul/Parasoul_30.webp",type:"Golpe Especial",description:"Ao GOLPEAR, tem 15/25% de chance de ATORDOAR o oponente por 4/6 segundos."},type:"Blockbuster",description:"Ao GOLPEAR, tem 15/25% de chance de ATORDOAR o oponente por 4/6 segundos."},"Quicando no Dossel":{image:{image:"img/parasoul/Parasoul_29.webp",type:"Golpe Especial",description:"Ao GOLPEAR, tem 25/35/50% de chance de remover todos os EFEITOS POSITIVOS."},type:"Blockbuster",description:"Ao GOLPEAR, tem 25/35/50% de chance de remover todos os EFEITOS POSITIVOS."},Explosão:{image:{image:"img/parasoul/Parasoul_19.webp",type:"Golpe Especial",description:"Ao GOLPEAR, DESATIVA BLOCKBUSTERS por 5/7/10 seg."},type:"Golpe Especial",description:"Ao GOLPEAR, DESATIVA BLOCKBUSTERS por 5/7/10 seg."},Banimento:{image:{image:"img/parasoul/Parasoul_18.webp",type:"Golpe Especial",description:"**Expulsão**\\n\\nAo GOLPEAR, força o oponente a SAIR DA ASSISTÊNCIA, removendo todos os EFEITOS DE COMBATE."},type:"Golpe Especial",description:"**Expulsão**\\n\\nAo GOLPEAR, força o oponente a SAIR DA ASSISTÊNCIA, removendo todos os EFEITOS DE COMBATE."},"Mergulho da Garça":{image:{image:"img/parasoul/Parasoul_22.webp",type:"Golpe Especial",description:"Se usado como contragolpe, ATORDOA o oponente por 3/4/5 segundos."},type:"Golpe Especial",description:"Se usado como contragolpe, ATORDOA o oponente por 3/4/5 segundos."},"Arremesso de napalm":{image:{image:"img/parasoul/Parasoul_23.webp",type:"Golpe Especial",description:""},type:"Golpe Especial",description:""},"Garça Motorizada":{image:{image:"img/parasoul/Parasoul_25.webp",type:"Golpe Especial",description:"Ao GOLPEAR, inflige QUEBRA DE ARMADURA por 4/8/12 segundos."},type:"Golpe Especial",description:"Ao GOLPEAR, inflige QUEBRA DE ARMADURA por 4/8/12 segundos."},"Tiro Silencioso":{image:{image:"img/parasoul/Parasoul_28.webp",type:"Blockbuster",description:"Tem chance 15%/25%/35% maior de acertar um CRÍTICO."},type:"Blockbuster",description:"Tem chance 15%/25%/35% maior de acertar um CRÍTICO."},"Banho de napalm":{image:{image:"img/parasoul/Parasoul_27.webp",type:"Blockbuster",description:""},type:"Blockbuster",description:""}},peacock:{"Vai, George!":{image:{image:"img/peacock/Peacock_22.webp",type:"Golpe Especial",description:""},type:"Golpe Especial",description:""},"Quem Vem Agora?":{image:{image:"img/peacock/Peacock_16.webp",type:"Golpe Especial",description:"**Expulsão**\\n\\nAo GOLPEAR, força o oponente a SAIR DA ASSISTÊNCIA, removendo todos os EFEITOS DE COMBATE."},type:"Golpe Especial",description:"**Expulsão**\\n\\nAo GOLPEAR, força o oponente a SAIR DA ASSISTÊNCIA, removendo todos os EFEITOS DE COMBATE."},"BANG, BANG, BANG!":{image:{image:"img/peacock/Peacock_19.webp",type:"Golpe Especial",description:"Tem chance 25/50/100% maior de acertar um CRÍTICO."},type:"Golpe Especial",description:"Tem chance 25/50/100% maior de acertar um CRÍTICO."},"Multidão Enfurecida":{image:{image:"img/peacock/Peacock_26.webp",type:"Golpe Especial",description:"Ao GOLPEAR, tem 15/25/35% de chance de remover todos os EFEITOS POSITIVOS."},type:"Blockbuster",description:"Ao GOLPEAR, tem 15/25/35% de chance de remover todos os EFEITOS POSITIVOS."},"Lenny, o Solitário":{image:{image:"img/peacock/Peacock_25.webp",type:"Golpe Especial",description:"Ao GOLPEAR, inflige 1/2/3 EFEITOS NEGATIVOS aleatórios por 10 segundos."},type:"Blockbuster",description:"Ao GOLPEAR, inflige 1/2/3 EFEITOS NEGATIVOS aleatórios por 10 segundos."},"Alô Passarinho":{image:{image:"img/peacock/Peacock_17.webp",type:"Golpe Especial",description:"PROVOQUE o oponente para ganhar IMUNIDADE por 10/12/15 segundos."},type:"Golpe Especial",description:"PROVOQUE o oponente para ganhar IMUNIDADE por 10/12/15 segundos."},"Liguem os Motores!":{image:{image:"img/peacock/Peacock_20.webp",type:"Golpe Especial",description:"Ao GOLPEAR, tem 25/50% de chance de infligir SANGRAMENTO por 4/8 segundos."},type:"Golpe Especial",description:"Ao GOLPEAR, tem 25/50% de chance de infligir SANGRAMENTO por 4/8 segundos."},Explosão:{image:{image:"img/peacock/Peacock_18.webp",type:"Golpe Especial",description:"Ao GOLPEAR, inflige QUEBRA DE ARMADURA por 5/7/10 segundos."},type:"Golpe Especial",description:"Ao GOLPEAR, inflige QUEBRA DE ARMADURA por 5/7/10 segundos."},"Esquadrilha da Fumaça":{image:{image:"img/peacock/Peacock_21.webp",type:"Golpe Especial",description:"Ao GOLPEAR, inflige QUEBRA DE ARMADURA por 4/8/12 segundos."},type:"Golpe Especial",description:"Ao GOLPEAR, inflige QUEBRA DE ARMADURA por 4/8/12 segundos."},"Dia do Julgamento":{image:{image:"img/peacock/Peacock_23.webp",type:"Golpe Especial",description:"Ao GOLPEAR, tem 15/25% de chance de ATORDOAR o oponente por 4/6 segundos."},type:"Blockbuster",description:"Ao GOLPEAR, tem 15/25% de chance de ATORDOAR o oponente por 4/6 segundos."},"Bons Companheiros":{image:{image:"img/peacock/Peacock_28.webp",type:"Golpe Especial",description:"Ao GOLPEAR, tem 5/10% de chance de infligir QUEBRA DE ARMADURA por 5/8 segundos."},type:"Blockbuster",description:"Ao GOLPEAR, tem 5/10% de chance de infligir QUEBRA DE ARMADURA por 5/8 segundos."},"Agonia de Argo":{image:{image:"img/peacock/Peacock_24.webp",type:"Golpe Especial",description:"Ao GOLPEAR, tem 5/10% de chance de infligir QUEBRA DE ARMADURA por 3/5 segundos."},type:"Blockbuster",description:"Ao GOLPEAR, tem 5/10% de chance de infligir QUEBRA DE ARMADURA por 3/5 segundos."},"Aeroporto Mortal":{image:{image:"img/peacock/Peacock_27.webp",type:"Golpe Especial",description:"Ao GOLPEAR, tem 15/25% de chance de infligir SANGRAMENTO FORTE por 5/10 segundos."},type:"Blockbuster",description:"Ao GOLPEAR, tem 15/25% de chance de infligir SANGRAMENTO FORTE por 5/10 segundos."}},"robo-fortune":{Explosão:{image:{image:"img/robo-fortune/Robo-Fortune_17.webp",type:"Golpe Especial",description:"Ao GOLPEAR, inflija OSCILAÇÃO DE ENERGIA por 5/7/10 segundos."},type:"Golpe Especial",description:"Ao GOLPEAR, inflija OSCILAÇÃO DE ENERGIA por 5/7/10 segundos."},"Corte Rápido":{image:{image:"img/robo-fortune/Robo-Fortune_24.webp",type:"Golpe Especial",description:"Ao GOLPEAR, 50% de chance de ATORDOAR por 4 s e infligir OSC. DE ENERGIA por 10/12/15 s se o oponente ARRANCAR."},type:"Golpe Especial",description:"Ao GOLPEAR, 50% de chance de ATORDOAR por 4 s e infligir OSC. DE ENERGIA por 10/12/15 s se o oponente ARRANCAR."},"Fidget Spin":{image:{image:"img/robo-fortune/Robo-Fortune_20.webp",type:"Golpe Especial",description:"Tem chance 25/50/100% maior de acertar um CRÍTICO."},type:"Golpe Especial",description:"Tem chance 25/50/100% maior de acertar um CRÍTICO."},"Raio de Calor":{image:{image:"img/robo-fortune/Robo-Fortune_21.webp",type:"Golpe Especial",description:"Ao GOLPEAR, 15/25/35% de chance de REMOVER 1 EF. POS. do oponente e ATORDOAR por 3 s."},type:"Golpe Especial",description:"Ao GOLPEAR, 15/25/35% de chance de REMOVER 1 EF. POS. do oponente e ATORDOAR por 3 s."},"Raio de Teonita":{image:{image:"img/robo-fortune/Robo-Fortune_23.webp",type:"Golpe Especial",description:"Ao GOLPEAR, DESATIVA ASSISTÊNCIAS, GOLPES ESPECIAIS ou BLOCKBUSTERS por 5/7/10 segundos.\\n\\nInflige QUEBRA DE ARMADURA por 10 segundos se BLOQUEADA."},type:"Golpe Especial",description:"Ao GOLPEAR, DESATIVA ASSISTÊNCIAS, GOLPES ESPECIAIS ou BLOCKBUSTERS por 5/7/10 segundos.\\n\\nInflige QUEBRA DE ARMADURA por 10 segundos se BLOQUEADA."},"Rotação Perigosa!":{image:{image:"img/robo-fortune/Robo-Fortune_22.webp",type:"Golpe Especial",description:"Ao GOLPEAR, 15/20/25% de chance de TRANSFERIR 1 EF. NEG. para o oponente."},type:"Golpe Especial",description:"Ao GOLPEAR, 15/20/25% de chance de TRANSFERIR 1 EF. NEG. para o oponente."},"ARMADILHA MAGNÉTICA":{image:{image:"img/robo-fortune/Robo-Fortune_27.webp",type:"Golpe Especial",description:"25/35/50% do dano causado é recuperado como VIDA. Ganhe BARREIRA por 10 segundos ao GOLPEAR."},type:"Blockbuster",description:"25/35/50% do dano causado é recuperado como VIDA. Ganhe BARREIRA por 10 segundos ao GOLPEAR."},"BATERIA DE ASSALTO":{image:{image:"img/robo-fortune/Robo-Fortune_26.webp",type:"Golpe Especial",description:"10/15/20% de chance de infligir OSCILAÇÃO DE ENERGIA por 10 segundos ao GOLPEAR."},type:"Blockbuster",description:"10/15/20% de chance de infligir OSCILAÇÃO DE ENERGIA por 10 segundos ao GOLPEAR."},"CANHÃO DRAMÁTICO ALFA":{image:{image:"img/robo-fortune/Robo-Fortune_25.webp",type:"Golpe Especial",description:"CRÍTICOS infligem DEFINHAR por 5/7/10 segundos."},type:"Blockbuster",description:"CRÍTICOS infligem DEFINHAR por 5/7/10 segundos."},"CANHÃO DRAMÁTICO ÔMEGA":{image:{image:"img/robo-fortune/Robo-Fortune_29.webp",type:"Golpe Especial",description:"Ao GOLPEAR, 2/3/5% de chance de REMOVER 1 EF. POS. do oponente e tirar 2% de VIDA extra p/ cada EF. POS. removido. Oponentes derrotados não revivem."},type:"Blockbuster",description:"Ao GOLPEAR, 2/3/5% de chance de REMOVER 1 EF. POS. do oponente e tirar 2% de VIDA extra p/ cada EF. POS. removido. Oponentes derrotados não revivem."},"Corte da Linha":{image:{image:"img/robo-fortune/Robo-Fortune_18.webp",type:"Golpe Especial",description:"**Expulsão**\\n\\nAo GOLPEAR, força o oponente a SAIR DA ASSISTÊNCIA, removendo todos os EFEITOS DE COMBATE."},type:"Golpe Especial",description:"**Expulsão**\\n\\nAo GOLPEAR, força o oponente a SAIR DA ASSISTÊNCIA, removendo todos os EFEITOS DE COMBATE."},"CURTO-CIRCUITO":{image:{image:"img/robo-fortune/Robo-Fortune_28.webp",type:"Golpe Especial",description:"Durante o modo de detonação, GOLPES reduzem o MEDIDOR DE BLOCKBUSTER em 5/7/10%.\\n\\nSacrifica 10% da sua VIDA MÁXIMA."},type:"Blockbuster",description:"Durante o modo de detonação, GOLPES reduzem o MEDIDOR DE BLOCKBUSTER em 5/7/10%.\\n\\nSacrifica 10% da sua VIDA MÁXIMA."},"Fala de verdade!":{image:{image:"img/robo-fortune/Robo-Fortune_19.webp",type:"Golpe Especial",description:"PROVOQUE seu oponente para ganhar BARREIRA por 10/12/15 segundos."},type:"Golpe Especial",description:"PROVOQUE seu oponente para ganhar BARREIRA por 10/12/15 segundos."}},squigly:{Explosão:{image:{image:"img/squigly/Squigly_18.webp",type:"Golpe Especial",description:"Inflige MALDIÇÃO por 5/7/10 segundos ao GOLPEAR"},type:"Golpe Especial",description:"Inflige MALDIÇÃO por 5/7/10 segundos ao GOLPEAR"},"Arrastar e morder":{image:{image:"img/squigly/Squigly_22.webp",type:"Golpe Especial",description:"Ao GOLPEAR, tem 10/15/20% de chance de remover todos os EFEITOS POSITIVOS do oponente."},type:"Golpe Especial",description:"Ao GOLPEAR, tem 10/15/20% de chance de remover todos os EFEITOS POSITIVOS do oponente."},"Basso buffo":{image:{image:"img/squigly/Squigly_17.webp",type:"Golpe Especial",description:"**Expulsão**\\n\\nAo GOLPEAR, força o oponente a SAIR DA ASSISTÊNCIA, removendo todos os EFEITOS DE COMBATE."},type:"Golpe Especial",description:"**Expulsão**\\n\\nAo GOLPEAR, força o oponente a SAIR DA ASSISTÊNCIA, removendo todos os EFEITOS DE COMBATE."},"O acorde de prata":{image:{image:"img/squigly/Squigly_24.webp",type:"Golpe Especial",description:"Ao GOLPEAR, tem 25/35/50% de chance de TRANSFERIR 1 EFEITO POSITIVO do oponente para si mesmo."},type:"Golpe Especial",description:"Ao GOLPEAR, tem 25/35/50% de chance de TRANSFERIR 1 EFEITO POSITIVO do oponente para si mesmo."},"Arrastar e soltar":{image:{image:"img/squigly/Squigly_27.webp",type:"Golpe Especial",description:"Ao GOLPEAR, inflige QUEBRA DE ARMADURA por 5/7/10 segundos."},type:"Blockbuster",description:"Ao GOLPEAR, inflige QUEBRA DE ARMADURA por 5/7/10 segundos."},"Soco de dragão":{image:{image:"img/squigly/Squigly_23.webp",type:"Golpe Especial",description:"Ao GOLPEAR, inflige MALDIÇÃO por 5/7/10 segundos, se usado enquanto CARREGADO."},type:"Golpe Especial",description:"Ao GOLPEAR, inflige MALDIÇÃO por 5/7/10 segundos, se usado enquanto CARREGADO."},"Fúria do dragão":{image:{image:"img/squigly/Squigly_29.webp",type:"Golpe Especial",description:"Inflige MALDIÇÃO por 5/7/10 segundos.\\n\\nCausa 50% de dano extra se usado com menos de 10% de VIDA."},type:"Blockbuster",description:"Inflige MALDIÇÃO por 5/7/10 segundos.\\n\\nCausa 50% de dano extra se usado com menos de 10% de VIDA."},"Encantador de serpentes":{image:{image:"img/squigly/Squigly_19.webp",type:"Golpe Especial",description:"PROVOQUE o oponente para ganhar IMUNIDADE por 10/12/15 segundos."},type:"Golpe Especial",description:"PROVOQUE o oponente para ganhar IMUNIDADE por 10/12/15 segundos."},"Inferno do Leviatã":{image:{image:"img/squigly/Squigly_28.webp",type:"Golpe Especial",description:"Ao GOLPEAR, tem 25% de chance de infligir DEFINHAR e BLOQUEIO DE CURA por 5/7/10 segundos."},type:"Blockbuster",description:"Ao GOLPEAR, tem 25% de chance de infligir DEFINHAR e BLOQUEIO DE CURA por 5/7/10 segundos."},"Empurrador de margaridas":{image:{image:"img/squigly/Squigly_26.webp",type:"Golpe Especial",description:"Causa 25/35/50% de dano extra a oponentes com menos de 25% de VIDA."},type:"Blockbuster",description:"Causa 25/35/50% de dano extra a oponentes com menos de 25% de VIDA."},"Ópera de batalha":{image:{image:"img/squigly/Squigly_25.webp",type:"Golpe Especial",description:"25% de chance de fazer DEFINHAR por 5/7/10 segundos ao GOLPEAR"},type:"Blockbuster",description:"25% de chance de fazer DEFINHAR por 5/7/10 segundos ao GOLPEAR"},"Das cinzas às cinzas":{image:{image:"img/squigly/Squigly_21.webp",type:"Golpe Especial",description:"15/20/25% de chance de fazer DEFINHAR por 5 segundos ao GOLPEAR"},type:"Golpe Especial",description:"15/20/25% de chance de fazer DEFINHAR por 5 segundos ao GOLPEAR"},"Centro do palco":{image:{image:"img/squigly/Squigly_20.webp",type:"Golpe Especial",description:""},type:"Golpe Especial",description:""}},umbrella:{Explosão:{image:{image:"img/umbrella/Umbrella_18.webp",type:"Golpe Especial",description:"Ao GOLPEAR, inflige GOSMA por 10/12/15 segundos."},type:"Golpe Especial",description:"Ao GOLPEAR, inflige GOSMA por 10/12/15 segundos."},"Bolha Boba":{image:{image:"img/umbrella/Umbrella_24.webp",type:"Golpe Especial",description:"Ao GOLPEAR, inflige GOSMA por 10/12/15 segundos."},type:"Golpe Especial",description:"Ao GOLPEAR, inflige GOSMA por 10/12/15 segundos."},"Lambe e Vai":{image:{image:"img/umbrella/Umbrella_23.webp",type:"Golpe Especial",description:"Ao GOLPEAR, inflige QUEBRA DE ARMADURA por 4/8/12 segundos."},type:"Golpe Especial",description:"Ao GOLPEAR, inflige QUEBRA DE ARMADURA por 4/8/12 segundos."},"Moedor de Sal":{image:{image:"img/umbrella/Umbrella_22.webp",type:"Golpe Especial",description:""},type:"Golpe Especial",description:""},"Soprando Bolhas":{image:{image:"img/umbrella/Umbrella_20.webp",type:"Golpe Especial",description:"Ao GOLPEAR, DESATIVA ASSISTÊNCIAS, GOLPES ESPECIAIS ou BLOCKBUSTERS por 5/7/10 segundos."},type:"Golpe Especial",description:"Ao GOLPEAR, DESATIVA ASSISTÊNCIAS, GOLPES ESPECIAIS ou BLOCKBUSTERS por 5/7/10 segundos."},"Hora do Rango":{image:{image:"img/umbrella/Umbrella_30.webp",type:"Golpe Especial",description:"25/35/50% do dano causado é recuperado como VIDA. Oponentes derrotados não podem ser revividos."},type:"Blockbuster",description:"25/35/50% do dano causado é recuperado como VIDA. Oponentes derrotados não podem ser revividos."},"Lente Projetora":{image:{image:"img/umbrella/Umbrella_28.webp",type:"Golpe Especial",description:"10/15/20% de chance de infligir OSCILAÇÃO DE ENERGIA por 10 segundos ao GOLPEAR."},type:"Blockbuster",description:"10/15/20% de chance de infligir OSCILAÇÃO DE ENERGIA por 10 segundos ao GOLPEAR."},"Refluxo Ácido":{image:{image:"img/umbrella/Umbrella_25.webp",type:"Golpe Especial",description:"50% de chance de infligir GOSMA por 10/12/15 segundos ao GOLPEAR."},type:"Blockbuster",description:"50% de chance de infligir GOSMA por 10/12/15 segundos ao GOLPEAR."},"Tempo Ruim":{image:{image:"img/umbrella/Umbrella_27.webp",type:"Golpe Especial",description:"25% de chance de causar DEFINHAR por 5/7/10 segundos ao GOLPEAR se usado enquanto FAMINTO."},type:"Blockbuster",description:"25% de chance de causar DEFINHAR por 5/7/10 segundos ao GOLPEAR se usado enquanto FAMINTO."},"Trava-Língua":{image:{image:"img/umbrella/Umbrella_29.webp",type:"Golpe Especial",description:"35% de chance de infligir GOSMA por 10/12/15 segundos ao GOLPEAR.\\n\\n35% do dano causado é recuperado como VIDA."},type:"Blockbuster",description:"35% de chance de infligir GOSMA por 10/12/15 segundos ao GOLPEAR.\\n\\n35% do dano causado é recuperado como VIDA."},"Saúde!":{image:{image:"img/umbrella/Umbrella_19.webp",type:"Golpe Especial",description:"**Expulsão**\\n\\nAo GOLPEAR, força o oponente a SAIR DA ASSISTÊNCIA, removendo todos os EFEITOS DE COMBATE."},type:"Golpe Especial",description:"**Expulsão**\\n\\nAo GOLPEAR, força o oponente a SAIR DA ASSISTÊNCIA, removendo todos os EFEITOS DE COMBATE."},"Dá Cá um Abraço":{image:{image:"img/umbrella/Umbrella_17.webp",type:"Golpe Especial",description:"PROVOQUE seu oponente para ganhar 1/2/3 camadas de BÊNÇÃO por 15 segundos."},type:"Golpe Especial",description:"PROVOQUE seu oponente para ganhar 1/2/3 camadas de BÊNÇÃO por 15 segundos."},"Chute Carrossel":{image:{image:"img/umbrella/Umbrella_21.webp",type:"Golpe Especial",description:"Tem chance 25/50/100% maior de acertar um CRÍTICO."},type:"Golpe Especial",description:"Tem chance 25/50/100% maior de acertar um CRÍTICO."},"Arrancada Hungern":{image:{image:"img/umbrella/Umbrella_26.webp",type:"Golpe Especial",description:"15/20/25% de dano extra se usado enquanto EMPANTURRADO."},type:"Blockbuster",description:"15/20/25% de dano extra se usado enquanto EMPANTURRADO."}},valentine:{Explosão:{image:{image:"img/valentine/Valentine_18.webp",type:"Golpe Especial",description:"Ao GOLPEAR, inflige SANGRAMENTO por 5/7/10 segundos."},type:"Golpe Especial",description:"Ao GOLPEAR, inflige SANGRAMENTO por 5/7/10 segundos."},"Triagem!":{image:{image:"img/valentine/Valentine_20.webp",type:"Golpe Especial",description:"**Expulsão**\\n\\nAo GOLPEAR, força o oponente a SAIR DA ASSISTÊNCIA, removendo todos os EFEITOS DE COMBATE."},type:"Golpe Especial",description:"**Expulsão**\\n\\nAo GOLPEAR, força o oponente a SAIR DA ASSISTÊNCIA, removendo todos os EFEITOS DE COMBATE."},"Cruz da Morte":{image:{image:"img/valentine/Valentine_21.webp",type:"Golpe Especial",description:"Ao GOLPEAR, tem 25/50% de chance de infligir SANGRAMENTO por 5/8 segundos."},type:"Golpe Especial",description:"Ao GOLPEAR, tem 25/50% de chance de infligir SANGRAMENTO por 5/8 segundos."},"Risco Biológico: Tipo A":{image:{image:"img/valentine/Valentine_23.webp",type:"Golpe Especial",description:"Reduz o MEDIDOR DE BLOCKBUSTER do oponente em 25/35/50% (GOLPEANDO ou BLOQUEANDO)."},type:"Golpe Especial",description:"Reduz o MEDIDOR DE BLOCKBUSTER do oponente em 25/35/50% (GOLPEANDO ou BLOQUEANDO)."},"Contraveneno: Detox":{image:{image:"img/valentine/Valentine_26.webp",type:"Golpe Especial",description:"15/25/35% de chance de remover todos os EFEITOS POSITIVOS ao GOLPEAR."},type:"Blockbuster",description:"15/25/35% de chance de remover todos os EFEITOS POSITIVOS ao GOLPEAR."},"Contraveneno: Paralisia":{image:{image:"img/valentine/Valentine_27.webp",type:"Golpe Especial",description:"15/25/35% de chance de ATORDOAR o oponente por 5 segundos ao GOLPEAR."},type:"Blockbuster",description:"15/25/35% de chance de ATORDOAR o oponente por 5 segundos ao GOLPEAR."},"Incisão Excessiva":{image:{image:"img/valentine/Valentine_29.webp",type:"Golpe Especial",description:"Ao GOLPEAR, tem 25/35/50% de chance de infligir SANGRAMENTO por 5 segundos."},type:"Blockbuster",description:"Ao GOLPEAR, tem 25/35/50% de chance de infligir SANGRAMENTO por 5 segundos."},Laringectomia:{image:{image:"img/valentine/Valentine_30.webp",type:"Golpe Especial",description:"10/15/20% de chance de infligir SANGRAMENTO FORTE por 10 segundos ao GOLPEAR."},type:"Blockbuster",description:"10/15/20% de chance de infligir SANGRAMENTO FORTE por 10 segundos ao GOLPEAR."},"Morte Cardiovascular":{image:{image:"img/valentine/Valentine_32.webp",type:"Golpe Especial",description:"25/35/50% de dano extra se o oponente estiver sofrendo SANGRAMENTO."},type:"Blockbuster",description:"25/35/50% de dano extra se o oponente estiver sofrendo SANGRAMENTO."},"Ressuscitação Agressiva":{image:{image:"img/valentine/Valentine_31.webp",type:"Golpe Especial",description:"Ao GOLPEAR o corpo de um aliado caído, RESSUSCITE-O com {0:P0} de VIDA."},type:"Blockbuster",description:"Ao GOLPEAR o corpo de um aliado caído, RESSUSCITE-O com {0:P0} de VIDA."},"Morto ao Chegar":{image:{image:"img/valentine/Valentine_33.webp",type:"Golpe Especial",description:"Se usado para derrotar um oponente, ganha REGENERAÇÃO FORTE por 10/12/15 seg."},type:"Blockbuster",description:"Se usado para derrotar um oponente, ganha REGENERAÇÃO FORTE por 10/12/15 seg."},"Queda funerária":{image:{image:"img/valentine/Valentine_22.webp",type:"Golpe Especial",description:"25/50/75% de chance de ATORDOAR o oponente por 4 segundos se a Valentine estiver com REGENERAÇÃO."},type:"Golpe Especial",description:"25/50/75% de chance de ATORDOAR o oponente por 4 segundos se a Valentine estiver com REGENERAÇÃO."},Chocoglicemia:{image:{image:"img/valentine/Valentine_19.webp",type:"Golpe Especial",description:"PROVOQUE o oponente para ganhar REGENERAÇÃO por 10/12/15 segundos."},type:"Golpe Especial",description:"PROVOQUE o oponente para ganhar REGENERAÇÃO por 10/12/15 segundos."},"Contraveneno: Sedativo":{image:{image:"img/valentine/Valentine_28.webp",type:"Golpe Especial",description:"Reduz o MEDIDOR DE BLOCKBUSTER do oponente em 15/25/35% ao GOLPEAR."},type:"Blockbuster",description:"Reduz o MEDIDOR DE BLOCKBUSTER do oponente em 15/25/35% ao GOLPEAR."},"Risco Biológico: Tipo B":{image:{image:"img/valentine/Valentine_24.webp",type:"Golpe Especial",description:"25/35/50% de chance de remover todos os EFEITOS POSITIVOS do oponente (GOLPEANDO ou BLOQUEANDO)."},type:"Golpe Especial",description:"25/35/50% de chance de remover todos os EFEITOS POSITIVOS do oponente (GOLPEANDO ou BLOQUEANDO)."},"Risco Biológico: Tipo C":{image:{image:"img/valentine/Valentine_25.webp",type:"Golpe Especial",description:"25/35/50% de chance de infligir ATORDOAMENTO por 4 segundos (GOLPEANDO ou BLOQUEANDO)."},type:"Golpe Especial",description:"25/35/50% de chance de infligir ATORDOAMENTO por 4 segundos (GOLPEANDO ou BLOQUEANDO)."}}};function Yi(e,a){if(se[e]){const t=a.toLowerCase().trim().replace(/\s*\(expuls[ãa]o\)/i,"").replace(/\s*\(provocar\)/i,"");for(const[o,s]of Object.entries(se[e]))if(o.toLowerCase().trim()===t)return s;if(se[e][a])return se[e][a]}return null}const Me={atq:{keys:["ATQ%","ATQ"],name:'<img loading="lazy" src="img/official/AttackIcon.webp" alt="ATQ" style="width: 24px; vertical-align: middle; margin-right: 6px;"> Ataque',name_en:'<img loading="lazy" src="img/official/AttackIcon.webp" alt="ATK" style="width: 24px; vertical-align: middle; margin-right: 6px;"> Attack',max:"Indefinido",max_en:"Undefined",summary:"Ataque é um atributo fundamental para qualquer personagem que precise infligir dano.",summary_en:"Attack is a fundamental attribute for any character that needs to deal damage.",detailed:"O Ataque aumenta o Dano Base do personagem. Ele é essencial, pois fortalece tudo o que o lutador faz: escala com a Taxa de ATQ Crítico e Dano Crítico, e aumenta a eficácia das Fúrias. Além disso, ter mais Ataque aumenta o dano causado pelos seus Golpes Especiais, Blockbusters, Habilidades Características, Astro Convidado e Ataques de Assistência. Contra oponentes com Armadura ou Defesa alta, o Ataque contribui significativamente, embora existam raras exceções onde outros atributos possam ser priorizados.",detailed_en:"Attack increases the character's Base Damage. It is essential because it strengthens everything the fighter does: it scales with Crit Rate and Crit Damage, and increases the effectiveness of Blockbusters. Additionally, having more Attack increases the damage dealt by Special Moves, Blockbusters, Signature Abilities, Guest Star, and Assist Attacks. Against opponents with Armor or high Defense, Attack contributes significantly, although there are rare exceptions where other attributes may be prioritized."},vd:{keys:["VD%","VD","Vida%","Vida"],name:'<img loading="lazy" src="img/official/HealthIcon.webp" alt="Vida" style="width: 24px; vertical-align: middle; margin-right: 6px;"> Vida',name_en:'<img loading="lazy" src="img/official/HealthIcon.webp" alt="HP" style="width: 24px; vertical-align: middle; margin-right: 6px;"> Health',max:"Indefinido",max_en:"Undefined",summary:"Vida é um atributo atrelado à sobrevivência, necessário para resistir a grandes quantidades de dano.",summary_en:"Health is an attribute tied to survivability, necessary to withstand large amounts of damage.",detailed:"É o principal atributo para variantes defensivas, suportes ou aquelas que interagem com Vida em suas habilidades. A Vida escala com a Vida Base da Variante, Habilidades Características, Modificadores e Efeitos. Personagens com muita Vida absorvem mais dano ao possuir Barreira (que escala com a Vida Máxima) e recebem mais cura de Regenerações (Vida Base + Vida%). Também aumenta a quantidade de Vida recuperada ao ser revivido.",detailed_en:"It is the primary attribute for defensive variants, supports, or those that interact with Health in their abilities. Health scales with the Variant's Base Health, Signature Abilities, Modifiers, and Effects. Characters with high Health absorb more damage when they have Barrier (which scales with Max Health) and receive more healing from Regeneration (Base Health + Health%). It also increases the amount of Health recovered when revived."},perfuracao:{keys:["Perfuração"],name:"Perfuração",name_en:"Piercing",max:"50%",summary:"Ignora uma porcentagem da DEFESA e da ARMADURA do oponente.",summary_en:"Ignores a percentage of the opponent's DEFENSE and ARMOR.",detailed:"É um atributo que aumenta o dano causado contra Defesa e o Efeito Positivo de Armadura. Muito útil para atacar personagens defensivos que, além de possuírem muita Vida, acumulam Defesa. A Perfuração ajuda de forma efetiva a aumentar o dano que você infligirá nessas condições. Sem este atributo, você pode chegar a causar quase nada ou até zero de dano contra certos oponentes.",detailed_en:"It is an attribute that increases damage dealt against Defense and the Armor Buff. Very useful for attacking defensive characters who, besides having high Health, stack Defense. Piercing effectively increases the damage you will inflict in these conditions. Without this attribute, you may deal almost no or even zero damage against certain opponents."},defesa:{keys:["Defesa"],name:"Defesa",name_en:"Defense",max:"50%",summary:"Diminui os danos recebidos de golpes em um percentual.",summary_en:"Reduces damage taken from hits by a percentage.",detailed:"É um atributo que reduz o dano sofrido por ataques de diferentes tipos. Quando combinado com Armaduras, esse dano recebido pode ser ainda mais reduzido. Vale lembrar que a Perfuração do inimigo consegue diminuir a eficácia da sua Defesa, e o efeito de Olho-Morto ignora totalmente a Defesa.",detailed_en:"It is an attribute that reduces damage taken from different types of attacks. When combined with Armor, the damage taken can be reduced even further. Keep in mind that the enemy's Piercing can reduce the effectiveness of your Defense, and the Dead-Eye effect completely ignores Defense."},precisao:{keys:["Precisão"],name:"Precisão",name_en:"Accuracy",max:"50%",summary:"Aumenta a probabilidade das Habilidades serem ativadas e rebate a Resistência do oponente.",summary_en:"Increases the probability of Abilities activating and counters the opponent's Resistance.",detailed:"Este atributo é muito importante para causadores de Efeitos Negativos e personagens com baixas chances de ativar suas Habilidades Características. A Precisão serve para diminuir a Resistência do oponente (que poderia impedir um efeito de ser aplicado). Para personagens e astros convidados que dependem de converter efeitos, infligir efeitos negativos ou ativar habilidades, a Precisão facilita muito a ativação dessas características.",detailed_en:"This attribute is very important for debuffers and characters with low chances of activating their Signature Abilities. Accuracy serves to reduce the opponent's Resistance (which could prevent an effect from being applied). For characters and guest stars that rely on converting effects, inflicting debuffs, or activating abilities, Accuracy greatly facilitates triggering these features."},resistencia:{keys:["Resistência"],name:"Resistência",name_en:"Resistance",max:"50%",summary:"Diminui a probabilidade de sofrer Efeitos Negativos das Habilidades do oponente e rebate a Precisão do oponente.",summary_en:"Reduces the probability of suffering Negative Effects from the opponent's Abilities and counters the opponent's Accuracy.",detailed:"O atributo reduz a chance de sofrer Efeitos Negativos vindos de diversas fontes, como Habilidades Características, Modificadores, Astros Convidados e na Assistência. É um atributo muito forte para evitar sofrer efeitos prejudiciais e é extremamente útil para defesas, competindo diretamente contra a Precisão do atacante.",detailed_en:"This attribute reduces the chance of suffering Negative Effects from various sources, such as Signature Abilities, Modifiers, Guest Stars, and Assists. It is a very strong attribute for avoiding harmful effects and is extremely useful for defenses, competing directly against the attacker's Accuracy."},bonus_elem:{keys:["Bônus Elem.","Bônus Elemental"],name:"Bônus Elemental",name_en:"Elemental Bonus",max:"50%",summary:"Aumenta os danos causados quando em vantagem de Elementos.",summary_en:"Increases damage dealt when having an Elemental advantage.",detailed:"Potencializa o dano do lutador quando ele está em Vantagem Elemental. A regra básica é: Fogo vence Ar, Ar vence Água e Água vence Fogo. Luz e Trevas não possuem desvantagem, ambos ficam em vantagem quando se enfrentam. O elemento Neutro não possui vantagem ou desvantagem.",detailed_en:"Boosts the fighter's damage when they have an Elemental Advantage. The basic rule is: Fire beats Wind, Wind beats Water, and Water beats Fire. Light and Dark have no disadvantage — both gain advantage when facing each other. The Neutral element has no advantage or disadvantage."},penal_elem:{keys:["Penal. Elem.","Penalidade Elemental"],name:"Penalidade Elemental",name_en:"Elemental Penalty",max:"0%",summary:"Reduz a perda de dano quando você está em desvantagem de Elementos.",summary_en:"Reduces the damage loss when you are at an Elemental disadvantage.",detailed:"Normalmente, você causa menos dano em desvantagem (exemplo: Ar contra Fogo, Fogo contra Água). Este atributo reduz essa penalidade para que você não perca tanto dano ao atacar, permitindo lutar de igual para igual mesmo em situações desfavoráveis.",detailed_en:"Normally, you deal less damage at a disadvantage (for example: Wind against Fire, Fire against Water). This attribute reduces that penalty so you don't lose as much damage when attacking, allowing you to fight on equal footing even in unfavorable situations."},reat_assist:{keys:["Reat. Assistência","Reativação de Assistência"],name:"Reativação de Assistência",name_en:"Tag Cooldown",max:"50%",summary:"Diminui o tempo de reativação para Ataques com Assistência.",summary_en:"Reduces the cooldown for Assist Attacks.",detailed:"Este atributo diminui a velocidade que a Assistência e a troca de personagens demoram para carregar. Quanto maior for a quantidade, mais rápido a assistência do personagem irá carregar, este efeito é apenas para a variante com este atributo, outros aliados que não tiverem reat. assistência não carregaram tão rápido quanto quem possui este atributo mais elevado.",detailed_en:"This attribute reduces the time that Assists and character swaps take to charge. The higher the amount, the faster the character's assist will recharge. This effect only applies to the variant with this attribute — other allies without Tag Cooldown will not charge as quickly as the one with a higher value."},reat_especial:{keys:["Reat. Especial","Reativação Especial"],name:"Reativação Especial",name_en:"Special Cooldown",max:"50%",summary:"Diminui o tempo de reativação para Golpes Especiais.",summary_en:"Reduces the cooldown for Special Moves.",detailed:"Os Golpes Especiais do personagem irão carregar mais rápido para serem usados novamente. O nível do golpe já diminui este tempo de carga naturalmente, e este atributo acelera o processo ainda mais.",detailed_en:"The character's Special Moves will charge faster to be used again. The move's level already reduces this cooldown naturally, and this attribute accelerates the process even further."},cap_defesa:{keys:["Cap. Defesa","Capacidade de Defesa"],name:"Capacidade de Defesa",name_en:"Block Capacity",max:"100%",summary:"Diminui os danos recebidos ao defender em um percentual.",summary_en:"Reduces damage taken when blocking by a percentage.",detailed:"Este atributo diminui o dano sofrido ao bloquear golpes. Quanto maior a quantidade, menos dano a variante sofrerá enquanto estiver defendendo. Vale notar que este efeito de proteção pode ser diminuído por Perfuração e Olho-Morto.",detailed_en:"This attribute reduces the damage suffered when blocking hits. The higher the amount, the less damage the variant will take while blocking. Note that this protective effect can be reduced by Piercing and Dead-Eye."},ganho_medidor:{keys:["Ganho Medidor"],name:"Ganho Medidor",name_en:"Meter Gain",max:"100%",summary:"Aumenta a taxa de ganho do medidor para Ataques Blockbuster.",summary_en:"Increases the meter gain rate for Blockbuster Attacks.",detailed:"O Blockbuster pode demorar para carregar dependendo do nível dele, o que pode ser frustrante, já que muitas variantes dependem desses ataques. Este atributo aumenta a velocidade desse carregamento: ao infligir dano ou sofrer dano, os Blockbusters ficarão prontos para uso mais rápido.",detailed_en:"Blockbusters can take a while to charge depending on their level, which can be frustrating since many variants rely on these attacks. This attribute increases the charging speed: when dealing or taking damage, Blockbusters will be ready for use faster."},taxa_critica:{keys:["Taxa de ATQ Crít.","Taxa de Ataque Crítico","Taxa de Atq Crítico","Taxa de Atq de Crítico"],name:"Taxa de ATQ Crítico",name_en:"Crit Rate",max:"100%",summary:"Aumenta a probabilidade de acertar um Golpe Crítico.",summary_en:"Increases the probability of landing a Critical Hit.",detailed:"Define a chance de aumentar o Dano Base do seu personagem no próximo golpe. Este atributo escala com Dano Crítico, Ataque e o efeito de Marca da Morte para causar ainda mais dano.",detailed_en:"Determines the chance to increase your character's Base Damage on the next hit. This attribute scales with Crit Damage, Attack, and the Death Mark effect to deal even more damage."},dano_crit:{keys:["Dano Crítico"],name:"Dano Crítico",name_en:"Crit Damage",max:"200%",summary:"Aumenta o bônus de danos ao acertar um Golpe Crítico.",summary_en:"Increases the damage bonus when landing a Critical Hit.",detailed:"Este atributo é um complemento da Taxa de ATQ Crítico. Enquanto a Taxa aumenta a probabilidade de ocorrer, o Dano Crítico aumenta muito o dano infligido quando o golpe acontece. Ele escala com a Taxa de ATQ Crítico, Ataque e Marca da Morte.",detailed_en:"This attribute complements Crit Rate. While Crit Rate increases the probability of a critical occurring, Crit Damage greatly increases the damage inflicted when the hit lands. It scales with Crit Rate, Attack, and Death Mark."},resist_crit:{keys:["Resist. ATQ. Crít.","Resistência a Ataque Crítico"],name:"Resistência a Ataque Crítico",name_en:"Crit Resistance",max:"100%",summary:"Diminui a chance de receber um Golpe Crítico.",summary_en:"Reduces the chance of receiving a Critical Hit.",detailed:"O atributo diminui a chance de sofrer um golpe crítico vindo do adversário. Se o oponente conseguir acertar o crítico mesmo assim, o dano será o mesmo, mas a frequência com que isso ocorre será drasticamente reduzida.",detailed_en:"This attribute reduces the chance of suffering a critical hit from the opponent. If the opponent still manages to land a critical, the damage will be the same, but the frequency at which it occurs will be drastically reduced."},critless:{keys:["Critless","critless"],name:"Critless",name_en:"Critless",summary:"Estratégia de não investir em Taxa e Dano Crítico.",summary_en:"A strategy of not investing in Crit Rate and Crit Damage.",detailed:"O conceito de Critless consiste em NÃO melhorar os nós de Taxa Crítica e Dano Crítico na Árvore de Habilidades do personagem. Isso é fundamental para lidar com variantes que punem acertos críticos, como Painwheels com Sangue Frio. Agarrões nunca causam críticos, facilitando essa estratégia.",detailed_en:"The Critless concept consists of NOT upgrading Crit Rate and Crit Damage nodes in the character's Skill Tree. This is essential for dealing with variants that punish critical hits, such as Painwheels with Cold Blood. Throws never deal criticals, making this strategy easier."},tier_dp_ataque:{keys:[],name:"DP Ataque",name_en:"PF Attack Tier",summary:"Classifica o Desempenho para a Disputa Premiada (Ataque).",summary_en:"Ranks performance for Prize Fights (Attack).",detailed:"Classifica o Desempenho da Variante baseando-se em suas Habilidades Características, utilidade em questão de inflingir dano, controle da partida e capacidade de lidar com confrontos mais difíceis.",detailed_en:"Ranks the Variant's performance based on its Signature Abilities, damage-dealing utility, match control, and ability to handle tougher encounters."},tier_reinos_paralelos:{keys:[],name:"Reinos Paralelos",name_en:"Parallel Realms Tier",summary:"Classificação para o modo Reinos Paralelos.",summary_en:"Rating for the Parallel Realms mode.",detailed:"Classifica o Desempenho para o Modo Reinos Paralelos (Sem Dó/Pesadelo), baseando em suas Habilidades Características, já que o modo possui diversos modificadores difíceis de lidar.",detailed_en:"Ranks performance for Parallel Realms mode (No Mercy/Nightmare), based on the Variant's Signature Abilities, since the mode features many difficult modifiers to deal with."},tier_fenda_ataque:{keys:[],name:"Fenda Ataque",name_en:"Rift Attack Tier",summary:"Classificação para o modo Batalhas da Fenda (Ataque).",summary_en:"Rating for Rift Battles mode (Attack).",detailed:"Classifica o Desempenho para os Ataques na Fenda, o modo fica bem mais difícil em níveis mais avançados, então será classificado o desempenho individual da variante para lidar com os requisitos da Fenda, como finalizar rápido, finalizar com blockbuster, combos e etc.",detailed_en:"Ranks performance for Rift Attacks. The mode becomes much harder at advanced levels, so it rates the variant's individual performance in handling Rift requirements, such as finishing quickly, finishing with a Blockbuster, combos, and so on."},tier_fenda_defesa:{keys:[],name:"Fenda Defesa",name_en:"Rift Defense Tier",summary:"Classificação para o modo Batalhas da Fenda (Defesa).",summary_en:"Rating for Rift Battles mode (Defense).",detailed:"Classifica o Desempenho Individual e em Equpe para as Defesas em nós da Fenda, baseando-se o quão difícil é lidar com a Defesa por ter uma forte Habilidade Característica, Habilidade Superior ou Muita Vida. Os Catalisadores e Modificadores podem beneficiar muito bem as Defesas em diferentes contextos, mas por si só se a Variante for Forte o suficiente ela terá um grande impacto defensivo na sua Base ou na Base do Oponente.",detailed_en:"Ranks individual and team performance for Defenses on Rift nodes, based on how difficult the Defense is to deal with due to a strong Signature Ability, Superior Move, or high Health. Catalysts and Modifiers can greatly benefit Defenses in different contexts, but on its own, if the Variant is strong enough, it will have a major defensive impact on your Base or the Opponent's Base."}};function Xi(e,a){a||(a=y());const t=Me[e];return t?a==="pt-BR"||!t.name_en?t:{...t,name:t.name_en,max:t.max_en||t.max,summary:t.summary_en||t.summary,detailed:t.detailed_en||t.detailed}:null}function mo(){const e=[];for(const[a,t]of Object.entries(Me))for(const o of t.keys)e.push({pattern:o,attrKey:a});return e.sort((a,t)=>t.pattern.length-a.pattern.length),e}function Q(e,a=null){if(!e)return"";Array.isArray(e)&&(e=e.join(`
`)),typeof e!="string"&&(e=String(e)),e=e.replace(/\[HAB \d+\]:\s*/g,""),e=e.replace(/\*\*([^*]+)\*\*/g,"$1"),e=e.replace(/<:[^:]+:\d+>/g,"");const t=lo(),o=[];let s=e;for(const{pattern:n,effectKey:r}of t){const l=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),c=new RegExp(`(?<![\\wÀ-ÿ])${l}(?![\\wÀ-ÿ])`,"gi");s=s.replace(c,d=>{const p=`\0EFF_${o.length}\0`,u=Te(r),m=u?u.type:"term",b=u&&u.icon?`<img loading="lazy" src="${u.icon}" class="inline-effect-icon" alt="">`:"";return r==="critless"?o.push({marker:p,html:`<span class="attr-highlight critless-term ${m}" data-attr-key="critless" style="cursor:pointer;" onclick="showCritlessDisclaimer(); event.stopPropagation();">${b}${d}</span>`}):m==="buff-term"||m==="debuff-term"?o.push({marker:p,html:`<span class="${m}">${b}${d}</span>`}):o.push({marker:p,html:`<span class="attr-highlight ${m}" data-attr-key="${r}">${b}${d}</span>`}),p})}for(const{marker:n,html:r}of o)s=s.replace(n,r);return s=s.replace(/((?:\?\?\?|\d+(?:\.\d+)?%?))/g,'<span class="number">$1</span>'),a&&po(a)&&(s=s.replace(new RegExp("(?<![\\wÀ-ÿ])(ELEMENTOS?|ELEMENTS?)(?![\\wÀ-ÿ])","gi"),n=>`<span class="attr-highlight element-table" data-attr-key="element_table" data-variant="${a}"><img loading="lazy" src="img/official/all_elements.gif" width="256" height="256" class="inline-effect-icon" alt="">${n}</span>`)),s=s.replace(/\\n/g,"<br>").replace(/\n/g,"<br>"),s}function Ya(e,a=null){if(!e)return"";typeof e!="string"&&(e=String(e)),e=e.replace(/<:[^:]+:\d+>/g,"");const t=["Contra, Ataque!","Nekhbet, a Abutre","Vai, George!","BANG, BANG, BANG!","Lenny, o Solitário"];t.forEach((s,n)=>{const r=`__SPECIAL_MOVE_${n}__`,l=new RegExp(s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"gi");e=e.replace(l,r)});let o=e.split(/,\s*/).filter(s=>s.trim());return o=o.map(s=>{let n=s;return t.forEach((r,l)=>{const c=`__SPECIAL_MOVE_${l}__`;n=n.replace(c,r)}),n}),a?o.map(s=>{const n=s.trim(),r=n.replace(/\s*\(?BB\d\)?$/i,"").trim(),l=Yi(a,r);return l?`
                    <div class="arsenal-move">
                        <img loading="lazy" src="${l.image.image}" alt="${r}" class="move-icon" onerror="this.style.display='none'">
                        <span class="move-name attr-highlight move-highlight" data-attr-key="move" data-move="${r}" data-char="${a}">${n}</span>
                    </div>
                `:`
                <div class="arsenal-move">
                    <span class="move-name">\${originalName}</span>
                </div>
            `}).join(""):o.map(s=>`<span>${s.trim()}</span>`).join("")}function oe(e){return e&&parseInt(String(e).replace(/[,\.]/g,""))||0}function aa(e){const a=e.split("-").map(o=>o.charAt(0).toUpperCase()+o.slice(1)).join("");return`img/official/${a==="RoboFortune"?"Robofortune":a}_MasteryIcon.webp`}function x(e){const a=y()==="en"?"en-US":"pt-BR";return new Intl.NumberFormat(a).format(e)}function Xa(e){if(!e)return"";typeof e!="string"&&(e=String(e));const a=mo();let t=e;const o=[];let s=t;for(const{pattern:n,attrKey:r}of a){const l=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),c=new RegExp(`(?<![\\wÀ-ÿ])${l}(?![\\wÀ-ÿ])`,"g");s=s.replace(c,d=>{const p=`\0ATTR_${o.length}\0`;return o.push({marker:p,html:`<span class="attr-highlight" data-attr-key="${r}">${d}</span>`}),p})}for(const{marker:n,html:r}of o)s=s.replace(n,r);return s}function la(e){if(!e)return"";const s=y()==="en"?{Boss:"Boss (Central Node)","Triple (Top)":"Triple Node (Top)","Duo (Left)":"Duo Node (Left)","Duo (Right)":"Duo Node (Right)",Duo:"Duo Node","Single (Left)":"Single Node (Left)","Single (Right)":"Single Node (Right)",Single:"Single Node",Both:"Both",Personagem:"Character Name","Def. Fire":"Def. Fire","Def. Water":"Def. Water","Def. Wind":"Def. Wind","Def. Light":"Def. Light","Def. Dark":"Def. Dark"}:{Boss:"Chefe (Nó Central)","Triplo (Topo)":"Nó Triplo (Topo)","Duo (Esquerdo)":"Nó Duplo (Esquerdo)","Duo (Direito)":"Nó Duplo (Direito)",Duo:"Nó Duplo","Single (Esquerdo)":"Nó Solo (Esquerdo)","Single (Direito)":"Nó Solo (Direito)",Single:"Nó Solo",Ambos:"Ambos",Personagem:"Nome do Personagem","Def. Fogo":"Def. Fogo","Def. Água":"Def. Água","Def. Ar":"Def. Ar","Def. Luz":"Def. Luz","Def. Trevas":"Def. Trevas"};return s[e]?s[e]:e}const go={Ofensivo:"Offensive",Defensivo:"Defensive","Suporte de Utilidade":"Utility Support",Coringa:"Wildcard"},$={Ofensivo:{icon:"img/modifiers/buffs/Enrage.webp",color:"#ff6d00"},Defensivo:{icon:"img/modifiers/buffs/Armor.webp",color:"#1565c0"},"Suporte de Utilidade":{icon:"img/modifiers/buffs/FinalStand.webp",color:"#fdd835"},Coringa:{icon:"img/modifiers/buffs/Deadeye.webp",color:"#9c27b0"}},Ja={Ofensivo:1,Coringa:2,Defensivo:3,"Suporte de Utilidade":4},Za={Ofensivo:"O Personagem Principal do time feito para causar o máximo de dano possível, geralmente ele ganha efeitos ou inflinge efeitos. Útil contra personagens Defensivos.",Defensivo:"Personagem que tem alta quantidade de Vida e Habilidades que aumentam a sobrevivência do mesmo, também pode ter habilidades punitivas como dano refletido e outros efeitos eficazes contra o opressor.","Suporte de Utilidade":"Personagem que tem habilidades que podem conceder EF. POSITIVOS aos Aliados, EF. NEGATIVOS aos oponentes ou ambos (conceder efeitos e inflingir efeitos). Alguns suportes podem se beneficiar de suas próprias habilidades e entrar em campo para contribuir para o time de diferentes formas.",Coringa:"Personagem que consegue desempenhar em várias funções, pode inflingir dano, aplicar efeitos, inflingir efeitos, defender ou até servir como suporte."},fo={Ofensivo:"The team's main damage dealer, designed to deal as much damage as possible. Typically gains buffs or inflicts debuffs. Effective against Defensive fighters.",Defensivo:"A fighter with high HP and abilities that increase survivability. May also have punishing abilities like reflect damage and other effects effective against aggressors.","Suporte de Utilidade":"A fighter with abilities that grant BUFFS to allies, inflict DEBUFFS on opponents, or both. Some supports can benefit from their own abilities and contribute to the team in various ways.",Coringa:"A fighter that can perform in multiple roles — dealing damage, applying buffs or debuffs, defending, or even supporting the team."};function K(e){return y()==="en"&&go[e]||e}function Ji(e){return y()==="en"?fo[e]||Za[e]||"":Za[e]||""}const bo={"Rosa Estelar":["Suporte de Utilidade"],"Modelo Submarina":["Suporte de Utilidade"],"Poder Sombrio":["Defensivo"],"Combatente da Liberdade":["Defensivo"],"Pico Bola":["Suporte de Utilidade"],"Homem de Gelo":["Coringa"],Promotor:["Suporte de Utilidade"],"Favorito dos Fãs":["Suporte de Utilidade"],"Heavy Metal":["Defensivo"],"Banda dos Sonhos":["Defensivo"],"Rodas Rítmicas":["Coringa"],"G.I. Jazz":["Defensivo"],"Big Baddy":["Defensivo"],Superjazz:["Defensivo"],Desarmonizador:["Defensivo"],"Resonant Evil":["Defensivo"],"Ciclone Carmesim":["Coringa"],Arlequim:["Suporte de Utilidade"],"Cérebro Gelado":["Defensivo"],"Forças Armadas":["Defensivo"],"Massa Cinzenta":["Suporte de Utilidade"],Ressurgente:["Defensivo"],"Sentinela de Pedra":["Coringa"],"Hóstia Profana":["Coringa"],"Fora-da-Lei Marcial":["Suporte de Utilidade"],"Agente Corrosiva":["Coringa"],Xenamorfa:["Defensivo"],"Fibra Forte":["Defensivo"],"Maldade Eterna":["Suporte de Utilidade"],Sorvescola:["Suporte de Utilidade"],"Confusão Interior":["Suporte de Utilidade"],"Veludo Vermelho":["Suporte de Utilidade"],"Magnata Nobre":["Suporte de Utilidade"],"Cacho Mágico":["Coringa"],Escoteira:["Coringa"],"Cachinhos Malvados":["Defensivo"],Investigadora:["Suporte de Utilidade"],"Quartzo Estelar":["Suporte de Utilidade"],"Imagem Dividida":["Coringa"],"Bela do Inferno":["Coringa"],"Cópia Aproximada":["Suporte de Utilidade"],"Sem Coração":["Suporte de Utilidade"],"Maldade Insana":["Ofensivo"],Megalomaníaca:["Defensivo"],"Cavalo Sombrio":["Suporte de Utilidade"],Octoplasma:["Suporte de Utilidade"],"Encantadora de Serpentes":["Suporte de Utilidade"],"Dama de Honra":["Suporte de Utilidade"],"Briga Fatal":["Coringa"],"Agora e Sempre":["Defensivo"],Brincadeirinha:["Defensivo"],"Papa-Moscas":["Coringa"],Neuromancer:["Coringa"],"Festa Macabra":["Coringa"],"Ameaça Mascarada":["Coringa"],Vagalume:["Defensivo"],"Frio Mordente":["Coringa"],"Pura Coragem":["Defensivo"],Resguardada:["Ofensivo","Suporte de Utilidade"],"Apanhadora de Sonhos":["Suporte de Utilidade"],"Ícone Iônico":["Ofensivo"],"Velhos Tempos":["Defensivo"],Intocável:["Defensivo"],Chumbinho:["Suporte de Utilidade"],Esboço:["Suporte de Utilidade"],"Plumagem Prismática":["Suporte de Utilidade"],Reprise:["Suporte de Utilidade"],Replicada:["Defensivo"],"Persona Grata":["Suporte de Utilidade"],"Tela Azul":["Defensivo"],Reviravolta:["Defensivo"],"Frio de Matar":["Defensivo"],"Quebra-Morto":["Defensivo"],"Branca de Medo":["Defensivo"],"Campeã dos Campeões":["Suporte de Utilidade"],Angelical:["Coringa"],Wunderkind:["Suporte de Utilidade"],"Desejo de Morte":["Coringa"],"Isca Sortuda":["Suporte de Utilidade"],"Saqueadora do Palácio":["Coringa"],Rosinha:["Suporte de Utilidade","Defensivo"],"Soldado Serafim":["Suporte de Utilidade"],"Preços para Matar":["Coringa"],"Cirurgiã-General":["Coringa"],Superluminal:["Suporte de Utilidade"],"Última Esperança":["Suporte de Utilidade","Defensivo"],"Mai-s O Quê?":["Coringa"],"Matadora Joy":["Suporte de Utilidade","Defensivo"],"Turno Mortal":["Coringa"],"Quente com Gelo":["Suporte de Utilidade"],Jaleco:["Suporte de Utilidade"],"Maravilha Eterna":["Coringa"],"Mente Criminosa":["Coringa"],Megassônico:["Coringa"],"Megera Vaporwave":["Coringa"],"Fantoche Sombrio":["Coringa"],"Zona de Buffer":["Coringa"],Overclocked:["Coringa"],"Ouro Maciço":["Suporte de Utilidade"]};function de(e){return bo[e]||["Ofensivo"]}function Zi(e){return de(e).map(t=>({key:t,localized:K(t)}))}function Fe(e,a,t=null){const{type:o,direction:s}=a;return[...e].sort((n,r)=>{var b,f,h,S,T,C;if((!t||(!t.rarity||t.rarity.length===0)&&(!t.element||t.element.length===0))&&(o==="score"&&s==="desc")){const _=Pe(n.name),B=Pe(r.name);if(_!==B)return _?-1:1;if(_&&B){const P=D=>{const k=D.trim().toLowerCase();return Qi.findIndex(I=>I.toLowerCase()===k)},R=P(n.name),E=P(r.name);if(R!==-1&&E!==-1)return R-E}}const d=Qa[n.rarityKey]||0,p=Qa[r.rarityKey]||0;if(d!==p)return s==="desc"?p-d:d-p;let u,m;switch(o){case"score":u=oe((b=n.stats)==null?void 0:b.power),m=oe((f=r.stats)==null?void 0:f.power);break;case"atk":u=oe((h=n.stats)==null?void 0:h.attack),m=oe((S=r.stats)==null?void 0:S.attack);break;case"hp":u=oe((T=n.stats)==null?void 0:T.health),m=oe((C=r.stats)==null?void 0:C.health);break;case"name":u=n.name,m=r.name;break;case"element":u=Wa[n.element]||99,m=Wa[r.element]||99;break;case"class":const _=de(n.name),B=de(r.name);u=Ja[_[0]]||99,m=Ja[B[0]]||99;break;default:u=n.name,m=r.name}return u<m?s==="asc"?-1:1:u>m?s==="asc"?1:-1:0})}function Ne(e,a){let t=e;if(a.rarity&&a.rarity.length>0&&(t=t.filter(o=>a.rarity.includes(o.rarityKey))),a.element&&a.element.length>0&&(t=t.filter(o=>{const s=vi[o.element];return s&&a.element.includes(s.key)})),a.variantClass&&a.variantClass.length>0&&(t=t.filter(o=>de(o.name).some(n=>a.variantClass.includes(n)))),a.efeitos&&a.efeitos.length>0){const o=t.filter(s=>{if(!s.signature_ability||!s.signature_ability.description)return!1;const n=s.signature_ability.description.toLowerCase();return a.efeitos.some(r=>{const l=ae[r];return l?l.keys.some(c=>n.includes(c.toLowerCase())):!1})});o.length>0&&(t=o)}return t}const _e={annie:{"Rosa Estelar":"img/annie/Annie_16.webp","Modelo Submarina":"img/annie/Annie_13.webp","Brilho das Estrelas":"img/annie/Annie_15.webp","Marcas de Fogo":"img/annie/Annie_14.webp","Vínculo de Alma":"img/annie/Annie_17.webp","Maravilha Eterna":"img/annie/Annie_7.webp",Ondina:"img/annie/Annie_12.webp","Heroína do Tempo":"img/annie/Annie_10.webp","Garota Material":"img/annie/Annie_8.webp","Rebelde Cósmica":"img/annie/Annie_11.webp","Princesa da Lua":"img/annie/Annie_9.webp","Ameaça Tripla":"img/annie/Annie_4.webp","Glamour Galático":"img/annie/Annie_3.webp","Estrela Ninja":"img/annie/Annie_5.webp","Srta. Mercúrio":"img/annie/Annie_6.webp","Criança Estelar":"img/annie/Annie_1.webp","Chama Solar":"img/annie/Annie_2.webp"},beowulf:{"Rei das Feras":"img/beowulf/Beowulf_15.webp","Poder Sombrio":"img/beowulf/Beowulf_13.webp","Picada de Cobra":"img/beowulf/Beowulf_14.webp","Ogros Têm Camadas":"img/beowulf/Beowulf_16.webp","Combatente da Liberdade":"img/beowulf/Beowulf_10.webp","Dragão Brigão":"img/beowulf/Beowulf_9.webp","Praga do Lobo":"img/beowulf/Beowulf_7.webp","Pico Bola":"img/beowulf/Beowulf_11.webp","Último Lutador":"img/beowulf/Beowulf_8.webp","Homem de Gelo":"img/beowulf/Beowulf_12.webp","Lutador X":"img/beowulf/Beowulf_5.webp","Número Um":"img/beowulf/Beowulf_4.webp",Promotor:"img/beowulf/Beowulf_3.webp","Favorito dos Fãs":"img/beowulf/Beowulf_6.webp","Alma de Pedra":"img/beowulf/Beowulf_2.webp","Lobo Azarão":"img/beowulf/Beowulf_1.webp"},"big-band":{"Bandido de Bronze":"img/big-band/Big_Band_15.webp","Banda dos Sonhos":"img/big-band/Big_Band_14.webp","Heavy Metal":"img/big-band/Big_Band_13.webp","G.I. JAZZ":"img/big-band/Big_Band_9.webp",Megassônico:"img/big-band/Big_Band_10.webp","Pânico na Cidade":"img/big-band/Big_Band_7.webp","Rodas Rítmicas":"img/big-band/Big_Band_11.webp",'Detetive "Dick"':"img/big-band/Big_Band_8.webp","Big Baddy":"img/big-band/Big_Band_30.webp","Ganhando Vantagem":"img/big-band/Big_Band_12.webp","Virtuoso Vintage":"img/big-band/Big_Band_6.webp",Robocópia:"img/big-band/Big_Band_3.webp","Resonant Evil":"img/big-band/Big_Band_4.webp",Desarmonizador:"img/big-band/Big_Band_5.webp","Batidas Rítmicas":"img/big-band/Big_Band_2.webp",Superjazz:"img/big-band/Big_Band_1.webp"},"black-dahlia":{"Hóstia Profana":"img/black-dahlia/Black_Dahlia_14.webp","Pele Elegante":"img/black-dahlia/Black_Dahlia_13.webp","Calibre Mágico":"img/black-dahlia/Black_Dahlia_15.webp",Carregada:"img/black-dahlia/Black_Dahlia_16.webp","Agente Corrosiva":"img/black-dahlia/Black_Dahlia_9.webp","Fora-da-Lei Marcial":"img/black-dahlia/Black_Dahlia_8.webp",Imperturbável:"img/black-dahlia/Black_Dahlia_10.webp",Psicomandante:"img/black-dahlia/Black_Dahlia_7.webp",Estelar:"img/black-dahlia/Black_Dahlia_12.webp","Violência Vermelha":"img/black-dahlia/Black_Dahlia_11.webp","Máquina Mortífera":"img/black-dahlia/Black_Dahlia_3.webp","Esmaga-Alma":"img/black-dahlia/Black_Dahlia_5.webp","Dame Slayer":"img/black-dahlia/Black_Dahlia_4.webp","Perigo Biológico":"img/black-dahlia/Black_Dahlia_6.webp","Gatilho Nervoso":"img/black-dahlia/Black_Dahlia_1.webp","Pistola Dourada":"img/black-dahlia/Black_Dahlia_2.webp"},cerebella:{Estrelada:"img/cerebella/Cerebella_14.webp","Mão Pesada":"img/cerebella/Cerebella_13.webp",Mekastar:"img/cerebella/Cerebella_15.webp","Ciclone Carmesim":"img/cerebella/Cerebella_16.webp",Assustadora:"img/cerebella/Cerebella_12.webp",Arlequim:"img/cerebella/Cerebella_7.webp","Blitz e Glamour":"img/cerebella/Cerebella_11.webp","Cérebro Gelado":"img/cerebella/Cerebella_9.webp","Forças Armadas":"img/cerebella/Cerebella_8.webp","Mente Criminosa":"img/cerebella/Cerebella_10.webp","Massa Cinzenta":"img/cerebella/Cerebella_3.webp","Guerreira Toad":"img/cerebella/Cerebella_5.webp",Ressurgente:"img/cerebella/Cerebella_4.webp","Sentinela de Pedra":"img/cerebella/Cerebella_6.webp",Substituta:"img/cerebella/Cerebella_1.webp","Cabeça Dura":"img/cerebella/Cerebella_2.webp"},double:{"Criatura de Hábito":"img/double/Double_15.webp","Coração da Escuridão":"img/double/Double_14.webp","Quebra-Queixo":"img/double/Double_13.webp","Altar Ego":"img/double/Double_16.webp","Teoria do Caos":"img/double/Double_11.webp","Maldade Eterna":"img/double/Double_10.webp","Fibra Forte":"img/double/Double_7.webp","Íris-Color":"img/double/Double_9.webp",Xenamorfa:"img/double/Double_8.webp","Bruxa do Mar":"img/double/Double_12.webp","Tirana do Templo":"img/double/Double_3.webp",Chicleteira:"img/double/Double_4.webp",Misticatástrofe:"img/double/Double_5.webp","Pecado da Serpente":"img/double/Double_6.webp",Freirarteira:"img/double/Double_1.webp",Sorvescola:"img/double/Double_2.webp","Grande Mãe":"img/double/Double_31.webp"},eliza:{"Múmia Querida":"img/eliza/Eliza_14.webp","Don Passione":"img/eliza/Eliza_15.webp","A Vampira":"img/eliza/Eliza_13.webp","Senhor das Trevas":"img/eliza/Eliza_16.webp","Veludo Vermelho":"img/eliza/Eliza_9.webp","Magnata Nobre":"img/eliza/Eliza_12.webp","Intervenção da Diva":"img/eliza/Eliza_7.webp","Confusão Interior":"img/eliza/Eliza_11.webp",Lazulita:"img/eliza/Eliza_10.webp","Banho de Sangue":"img/eliza/Eliza_8.webp",Sombria:"img/eliza/Eliza_5.webp","Amor Sangrento":"img/eliza/Eliza_3.webp","Víbora Escarlate":"img/eliza/Eliza_4.webp",Sombruma:"img/eliza/Eliza_6.webp","Rainha do Nilo":"img/eliza/Eliza_1.webp",Decifrada:"img/eliza/Eliza_2.webp"},filia:{"Cachinhos Malvados":"img/filia/Filia_8.webp","Trança Parasita":"img/filia/Filia_7.webp","Estrela Virtual":"img/filia/Filia_10.webp","Cabelos ao Vento":"img/filia/Filia_9.webp","Cacho Mágico":"img/filia/Filia_12.webp","Quartzo Estelar":"img/filia/Filia_5.webp","Frio Cortante":"img/filia/Filia_3.webp","Cabelo Rebelde":"img/filia/Filia_4.webp",Investigadora:"img/filia/Filia_6.webp","Pontas Duplas":"img/filia/Filia_2.webp",Cisalhamento:"img/filia/Filia_16.webp","Matadora de Aula":"img/filia/Filia_13.webp","Borrão Azul":"img/filia/Filia_15.webp","Djinn Frizz":"img/filia/Filia_14.webp",Escoteira:"img/filia/Filia_11.webp",Descabelada:"img/filia/Filia_1.webp"},fukua:{"Imagem Dividida":"img/fukua/Fukua_12.webp","Complexo de Pico":"img/fukua/Fukua_15.webp","Fantoche Sombrio":"img/fukua/Fukua_13.webp","Demônio dos Sonhos":"img/fukua/Fukua_14.webp","Eco de Estrela":"img/fukua/Fukua_16.webp","Bordas Forradas":"img/fukua/Fukua_7.webp","Terror Noturno":"img/fukua/Fukua_9.webp","Megera Vaporwave":"img/fukua/Fukua_8.webp","Bela do Inferno":"img/fukua/Fukua_11.webp","Fios Fantasmas":"img/fukua/Fukua_10.webp","Virada do Camaleão":"img/fukua/Fukua_4.webp","Chuva Sombria":"img/fukua/Fukua_3.webp","Irmãs de Alma":"img/fukua/Fukua_5.webp","Falsa Temida":"img/fukua/Fukua_6.webp","Cópia Aproximada":"img/fukua/Fukua_1.webp","Gêmeo Infernal":"img/fukua/Fukua_2.webp","Poder Floral":"img/fukua/Flower_Power.webp"},marie:{Megalomaníaca:"img/marie/Marie_14.webp","Sem Coração":"img/marie/Marie_13.webp","Maldade Insana":"img/marie/Marie_15.webp",Octoplasma:"img/marie/Marie_8.webp",Coveira:"img/marie/Marie_7.webp","Aspiradora de Fantasmas":"img/marie/Marie_10.webp","A Todo Custo":"img/marie/Marie_12.webp","Ceifadora Sorridente":"img/marie/Marie_11.webp","Cavalo Sombrio":"img/marie/Marie_9.webp","Dama de Honra":"img/marie/Marie_4.webp","Encantadora de Serpentes":"img/marie/Marie_3.webp","Domadora de Fantasmas":"img/marie/Marie_5.webp","Osso Puro":"img/marie/Marie_1.webp","Maga Marrenta":"img/marie/Marie_2.webp","Abóbora Fantasma":"img/marie/Marie_6.webp","Guardião do Cometa":"img/marie/Comet_Custodian.webp"},"ms-fortune":{"Stalker de Vento":"img/ms-fortune/Ms_Fortune_14.webp","Soldado de Infantaria":"img/ms-fortune/Ms_Fortune_15.webp","Fúria Felpuda":"img/ms-fortune/Ms_Fortune_13.webp","Biscoito da Sorte":"img/ms-fortune/Ms_Fortune_16.webp","Agora e Sempre":"img/ms-fortune/Ms_Fortune_8.webp","Miau e Ordem":"img/ms-fortune/Ms_Fortune_7.webp","Ladra de Tempo":"img/ms-fortune/Ms_Fortune_11.webp","Agente Trapaçeira":"img/ms-fortune/Ms_Fortune_10.webp","Corta e Afoga":"img/ms-fortune/Ms_Fortune_9.webp",Terripeluda:"img/ms-fortune/Ms_Fortune_12.webp","Gata Negra":"img/ms-fortune/Ms_Fortune_4.webp","Sra. Jurada":"img/ms-fortune/Ms_Fortune_5.webp","Sorte Felina":"img/ms-fortune/Ms_Fortune_3.webp",Remendada:"img/ms-fortune/Ms_Fortune_6.webp",Brincadeirinha:"img/ms-fortune/Ms_Fortune_1.webp","Gata do Inferno":"img/ms-fortune/Ms_Fortune_2.webp","Briga Fatal":"img/ms-fortune/Ms_Fortune_29.webp"},painwheel:{"Escaladora de Paredes":"img/painwheel/Painwheel_15.webp","Ameaça Mascarada":"img/painwheel/Painwheel_16.webp",Neuromancer:"img/painwheel/Painwheel_14.webp","Papa-Moscas":"img/painwheel/Painwheel_13.webp",Vagalume:"img/painwheel/Painwheel_9.webp","Frio Mordente":"img/painwheel/Painwheel_11.webp",Gênese:"img/painwheel/Painwheel_7.webp","Festa Macabra":"img/painwheel/Painwheel_10.webp",Tirania:"img/painwheel/Painwheel_12.webp","Corta-diversão":"img/painwheel/Painwheel_8.webp","Jovem Fúria":"img/painwheel/Painwheel_4.webp","Motor de Sangue":"img/painwheel/Painwheel_3.webp","Sexta Esquisita":"img/painwheel/Painwheel_5.webp","Serrada ao Meio":"img/painwheel/Painwheel_6.webp",Enferrujada:"img/painwheel/Painwheel_1.webp","Pura Coragem":"img/painwheel/Painwheel_2.webp"},parasoul:{"Ruiva Fatal":"img/parasoul/Parasoul_15.webp","Atração Fatal":"img/parasoul/Parasoul_16.webp",Salgada:"img/parasoul/Parasoul_14.webp","Bela do Bar":"img/parasoul/Parasoul_17.webp","The Legend of Parasoul":"img/parasoul/Parasoul_11.webp",Indômita:"img/parasoul/Parasoul_12.webp","Orgulho Real":"img/parasoul/Parasoul_8.webp","Má Sorte":"img/parasoul/Parasoul_10.webp","Loura Real":"img/parasoul/Parasoul_9.webp",Varia:"img/parasoul/Parasoul_7.webp","Matrona de Ferro":"img/parasoul/Parasoul_13.webp","Operações Sombrias":"img/parasoul/Parasoul_5.webp","Voo da Garça":"img/parasoul/Parasoul_3.webp","Hera Uma Vez":"img/parasoul/Parasoul_4.webp","Fã do Perigo":"img/parasoul/Parasoul_6.webp",Resguardada:"img/parasoul/Parasoul_1.webp","Reinado Duro":"img/parasoul/Parasoul_2.webp"},peacock:{"Fica Frio":"img/peacock/Peacock_13.webp","Apanhadora de Sonhos":"img/peacock/Peacock_14.webp","Quebra de Contrato":"img/peacock/Peacock_15.webp",Intocável:"img/peacock/Peacock_7.webp","Velhos Tempos":"img/peacock/Peacock_8.webp","Prodígio Primitivo":"img/peacock/Peacock_11.webp",Ultraviolenta:"img/peacock/Peacock_9.webp","A Malvada":"img/peacock/Peacock_10.webp","Ícone Iônico":"img/peacock/Peacock_12.webp",Supercuringa:"img/peacock/Peacock_5.webp","Plumagem Prismática":"img/peacock/Peacock_6.webp","Cara Pintada":"img/peacock/Peacock_4.webp",Chumbinho:"img/peacock/Peacock_3.webp",Reprise:"img/peacock/Peacock_1.webp",Esboço:"img/peacock/Peacock_2.webp","Ouro Maciço":"img/peacock/Solid_Gold.webp"},"robo-fortune":{Overclocked:"img/robo-fortune/Robo-Fortune_13.webp","X-Bot":"img/robo-fortune/Robo-Fortune_14.webp",Replicada:"img/robo-fortune/Robo-Fortune_15.webp","Pulso de Prótons":"img/robo-fortune/Robo-Fortune_16.webp","Zona de Buffer":"img/robo-fortune/Robo-Fortune_12.webp","Tela Azul":"img/robo-fortune/Robo-Fortune_8.webp","Terror Byte":"img/robo-fortune/Robo-Fortune_7.webp","Persona Grata":"img/robo-fortune/Robo-Fortune_10.webp","Caça-cabeças":"img/robo-fortune/Robo-Fortune_9.webp","Tritura-Números":"img/robo-fortune/Robo-Fortune_11.webp","Bombardeiro Azul":"img/robo-fortune/Robo-Fortune_5.webp",Nyanotec:"img/robo-fortune/Robo-Fortune_3.webp","Protetor Vetor":"img/robo-fortune/Robo-Fortune_6.webp",Ronrominador:"img/robo-fortune/Robo-Fortune_4.webp",Protótipo:"img/robo-fortune/Robo-Fortune_1.webp","M-1AU":"img/robo-fortune/Robo-Fortune_2.webp","Dupla Exposição":"img/robo-fortune/Robo_Fortune_30.webp"},squigly:{Reviravolta:"img/squigly/Squigly_14.webp",Lovecraftiana:"img/squigly/Squigly_13.webp","Perigo Mortal":"img/squigly/Squigly_15.webp","Ghoul Glacial":"img/squigly/Squigly_16.webp","Frio de Matar":"img/squigly/Squigly_8.webp",Bioexorcista:"img/squigly/Squigly_9.webp",Thriller:"img/squigly/Squigly_10.webp","Sopro da Morte":"img/squigly/Squigly_7.webp","Artista Demônio":"img/squigly/Squigly_11.webp","Roendo as Unhas":"img/squigly/Squigly_12.webp","Verde Gangrena":"img/squigly/Squigly_6.webp",Semimorta:"img/squigly/Squigly_3.webp","Morta de Calor":"img/squigly/Squigly_4.webp","Quebra-Morto":"img/squigly/Squigly_5.webp","Medo do Palco":"img/squigly/Squigly_1.webp","Branca de Medo":"img/squigly/Squigly_2.webp"},umbrella:{"Desejo de Morte":"img/umbrella/Umbrella_15.webp","Campeã dos Campeões":"img/umbrella/Umbrella_14.webp","Artista Ilusionista":"img/umbrella/Umbrella_13.webp",Angelical:"img/umbrella/Umbrella_16.webp","Maruja dos Sete Mares":"img/umbrella/Umbrella_9.webp","Visitante do Espaço":"img/umbrella/Umbrella_8.webp","Saqueadora do Palácio":"img/umbrella/Umbrella_12.webp",Wunderkind:"img/umbrella/Umbrella_10.webp",Psicriança:"img/umbrella/Umbrella_11.webp",Rosinha:"img/umbrella/Umbrella_4.webp","Pirata de Poça":"img/umbrella/Umbrella_5.webp","Mordida Doce":"img/umbrella/Umbrella_6.webp","Criança Selvagem":"img/umbrella/Umbrella_7.webp","Pitada de Raiva":"img/umbrella/Umbrella_2.webp","Vento Ventania":"img/umbrella/Umbrella_3.webp","Isca Sortuda":"img/umbrella/Umbrella_31.webp"},valentine:{"Preços para matar":"img/valentine/Valentine_13.webp","Soldado Serafim":"img/valentine/Valentine_16.webp","Negócio Sangrento":"img/valentine/Valentine_15.webp","Très Chic":"img/valentine/Valentine_14.webp","Perto da Morte":"img/valentine/Valentine_17.webp","Última Esperança":"img/valentine/Valentine_8.webp","Piro-técnica":"img/valentine/Valentine_10.webp","Morro Quieto":"img/valentine/Valentine_7.webp","Presa Final":"img/valentine/Valentine_11.webp","Cirurgiã-General":"img/valentine/Valentine_9.webp",Superluminal:"img/valentine/Valentine_12.webp","Turno Mortal":"img/valentine/Valentine_3.webp","Matadora Joy":"img/valentine/Valentine_5.webp","Mai-s O Quê?":"img/valentine/Valentine_4.webp","Hallow – Demônio":"img/valentine/Valentine_6.webp",Jaleco:"img/valentine/Valentine_1.webp","Quente com Gelo":"img/valentine/Valentine_2.webp"}};function ie(e,a,t){if(_e[e]){if(_e[e][a])return _e[e][a];const o=a.toLowerCase();for(const[s,n]of Object.entries(_e[e]))if(s.toLowerCase()===o)return n}return`img/official/${e.charAt(0).toUpperCase()+e.slice(1)}_Icon.webp`}const ho={"Confusão Interior":{source:"Obtível em Presente Dourado (Social)",source_en:"Available from Gold Gift (Social)",icon:"img/official/gold_gift.webp",category:"Presente",category_en:"Gift"},"Big Baddy":{source:"Obtível em Presente Dourado da Guilda",source_en:"Available from Guild Gold Gift",icon:"img/official/guild_gift.webp",category:"Presente",category_en:"Gift"},"Estrela Virtual":{source:"Obtível em Relíquia Elemental (Água)",source_en:"Available from Elemental Relic (Water)",icon:"img/official/Gacha_ElementalWater.webp",category:"Relíquia Elemental",category_en:"Elemental Relic"},"Piro-técnica":{source:"Obtível em Relíquia Elemental (Fogo)",source_en:"Available from Elemental Relic (Fire)",icon:"img/official/Gacha_ElementalFire.webp",category:"Relíquia Elemental",category_en:"Elemental Relic"},"Má Sorte":{source:"Obtível em Relíquia Elemental (Ar)",source_en:"Available from Elemental Relic (Wind)",icon:"img/official/Gacha_ElementalAir.webp",category:"Relíquia Elemental",category_en:"Elemental Relic"},"Festa Macabra":{source:"Obtível em Relíquia Elemental (Luz)",source_en:"Available from Elemental Relic (Light)",icon:"img/official/Gacha_ElementalLight.webp",category:"Relíquia Elemental",category_en:"Elemental Relic"},Megassônico:{source:"Obtível em Relíquia Elemental (Trevas)",source_en:"Available from Elemental Relic (Dark)",icon:"img/official/Gacha_ElementalDark.webp",category:"Relíquia Elemental",category_en:"Elemental Relic"},"Mai-s O Quê?":{source:"Obtível em Relíquia Diária (Raro)",source_en:"Available from Daily Relic (Rare)",icon:"img/official/Gacha_Daily.webp",category:"Relíquia Diária",category_en:"Daily Relic"},"Favorito dos Fãs":{source:"Obtível em Relíquia de Personagem Beowulf (Raro)",source_en:"Available from Beowulf Character Relic (Rare)",icon:"img/official/Gacha_Char_Beowulf.webp",category:"Relíquia de Personagem",category_en:"Character Relic"},"Tritura-Números":{source:"Obtível em Relíquia de Personagem Robo-Fortune(Raro)",source_en:"Available from Robo-Fortune Character Relic (Rare)",icon:"img/official/Gacha_Char_RoboFortune.webp",category:"Relíquia de Personagem",category_en:"Character Relic"},"Ouro Maciço":{source:"Obtível em Relíquia de Personagem Peacock (Raro)",source_en:"Available from Peacock Character Relic (Rare)",icon:"img/official/Gacha_Char_Peacock.webp",category:"Relíquia de Personagem",category_en:"Character Relic"}};function Eo(e){const a=ho[e];return a?y()==="en"?{...a,source:a.source_en||a.source,category:a.category_en||a.category}:a:null}const Ao={annie:{attack:3,health:3,playstyle:"Annie é uma lutadora rápida com foco em combos terrestres longos e pressão constante. Ela usa seu Parasita Sagan para controlar o espaço e estender combos com seu Modo Estelar, que adiciona propriedades extras aos seus ataques.",biography:'Para todos os efeitos, a Annie é uma jovem atriz de televisão e apresentadora de "Annie das Estrelas", um programa de variedades baseado nos mitos, nas lendas e no folclore da personagem-título. O programa está no ar há anos, misturando atores reais com animação, e muitas atrizes já representaram o papel principal.<br><br>Pelo menos... é o que a Annie quer que você pense! Na verdade, sempre houve apenas uma Annie. Amaldiçoada pelo Coração-Caveira a nunca crescer, a Annie está viva há séculos. Durante esse tempo, ela assumiu a missão pessoal de deter o Coração-Caveira de uma vez por todas. Para isso, ela adquiriu muitas habilidades e itens, incluindo seu parasita remoto, Sagan. Até mesmo seu trabalho na televisão serve para ajudá-la a alcançar seu objetivo, pois ela espera educar o mundo sobre os perigos do Coração-Caveira.',birthday:"12 de junho",bloodType:"AB",height:"155 cm",weight:"50 kg",likes:"Coreografia de luta, monólogos apaixonados, caminhadas na natureza, o bóson de Higgs, fruta estelar, queijo, chuvas de meteoro, os fãs, superposição quântica, roupas práticas, o Serviço Especial de Estratégia e Resgate, músicas antigas",dislikes:"Tomates, plágio, serviço de buffet ruim, agentes pilantras, feiras renascentistas, o paradoxo de Fermi, números musicais aleatórios, M&Ms marrons, terraplanistas",characterAbility:{title:"PODER ESTELAR",description:"A Annie agora enche o medidor de PODER ESTELAR ao longo do tempo e pode ativá-lo quando o medidor estiver acima de 50%. Durante o MODO PODER ESTELAR, os ataques básicos da Annie produzem ESTRELAS que causam dano total em GOLPES BLOQUEADOS, e muitos dos GOLPES ESPECIAIS da Annie têm propriedades adicionais."},superiorAbility1:{title:"HORIZONTE DE EVENTOS",description:`DESVIO PARA O VERMELHO - Cada GOLPE ESPECIAL ou BLOCKBUSTER usado dá 25% de dano extra para os GOLPES ESPECIAIS e BLOCKBUSTERS pelo resto do combo.

DESVIO PARA O AZUL - O oponente causa 40% menos dano com cada GOLPE DE COMBO abaixo de 5.`},superiorAbility2:null,prestigeAbility:{title:"EXPLOSÃO ESTELAR",description:`A Annie carrega esta habilidade quando usa o MEDIDOR DE PODER ESTELAR.

TAXA DE CARGA: 2% por 1% do MEDIDOR DE PODER ESTELAR gasto.

EFEITO DE ATIVAÇÃO: as ESTRELAS DO PODER ESTELAR da Annie causam 120% de dano extra.`}},beowulf:{attack:4,health:4,playstyle:"Beowulf é um lutador focado em agarrões e combate corpo a corpo, utilizando sua cadeira dobrável e o 'Modo Hype'. Ele pode arremessar a cadeira para controlar a distância ou usá-la para potencializar seus ataques. Ao acumular Hype, ele realiza agarrões 'indefensáveis' que ignoram defesas e mantém a pressão constante.",biography:"Reconhecido mundialmente por ter derrubado Grendel, o guerreiro Gigan, e por sua ilustre carreira no ringue, o Beowulf garantiu um lugar nos livros de história como um campeão. Entretanto, uma carreira medíocre como ator após ter deixado os ringues manchou seu legado.<br><br>Agora, com o Reino de Dossélia enfrentando uma nova ameaça, o Beowulf entrará no ringue mais uma vez, determinado em trazer de volta os dias de glória. E ao fazê-lo, se deparará com a verdade sobre seu passado... será o Beowulf capaz de superar esta nova ameaça à cidade e a seu legado? Ou será esta sua última vez na ribalta?",birthday:"31 de março",bloodType:"O",height:"201 cm",weight:"130 kg",likes:"Caçar, lutar a sério, suéteres, ônibus de turismo, botas, escadas, lâmpadas fluorescentes, contratos com dinheiro garantido, cervejas artesanais, o som de um público empolgado, produtos oficiais, chá de camomila",dislikes:"Roteiristas profissionais, açúcar refinado, chaves sextavadas, cobras, desqualificações, tirar férias, sprays de bronzeamento, falar baixo, quando lhe dizem o que fazer ou vestir, batatas",characterAbility:{title:"MODO HYPE",description:"Consiga 1 Carga Hype com cada ARREMESSO e a cada 30 segundos. 3 Cargas Hype permitem ativar o MODO HYPE! No MODO HYPE, os ARREMESSOS não podem ser interrompidos, e muitos ataques apresentam melhorias surpreendentes!"},superiorAbility1:{title:"LUTA PELO TÍTULO",description:`DESAFIANTE - Beowulf recupera 2% de VIDA por segundo enquanto a % de VIDA for INFERIOR à do oponente.

DEFENSOR DO TÍTULO - O Beowulf causa 20% de dano extra sempre que sua% de Vida for MAIOR que do oponente.`},superiorAbility2:null,prestigeAbility:{title:"AGORA OU NUNCA",description:`O Beowulf carrega esta habilidade quando entra no MODO HYPE.

TAXA DE CARGA: 50% por ENTRADA.

EFEITO DE ATIVAÇÃO: o Beowulf causa 30% de dano extra no MODO HYPE por cada 20 segundos passados durante a luta.`}},"big-band":{attack:2,health:5,playstyle:"Big Band é a fortaleza do jogo, possuindo a maior Vida e Defesa. Especialista em contra-ataques e defesa impenetrável, suas habilidades giram em torno da mecânica de Combos, Pressão e Absorção de Dano, punindo oponentes previsíveis com retaliações Musicais Massivas.",biography:'Ben Birdland já viu de tudo na vida, incluindo o pior da Grande Guerra. Mas o que ele viu como policial em Nova Meridian superou todo o resto. Quando ele se rebelou contra sua unidade corrupta, deram a ele uma precoce aposentadoria por invalidez, com seu corpo destruído condenado a viver o resto de seus dias em um pulmão de aço.<br><br>Este teria sido o fim da história do Ben se não tivesse caído nos ouvidos dos Laboratórios Anti-Skullgirl. Com pouco a perder, ele aceitou ser reconstruído através de procedimentos experimentais. Fundido com máquinas que o permitem respirar e uma gama de poderosas armas pneumáticas, ele renasceu como "Big Band".<br><br>Hoje um sênior do Laboratório 8, ele se tornou uma espécie de figura paterna para os jovens soldados do ASG. Crendo firmemente na causa, ele continuou no projeto apesar de todas as controvérsias e ainda quer estar na linha de frente contra a Skullgirl. Sua tecnologia pode estar ultrapassada, mas sua experiência e ímpeto fazem dele um lutador temível.',birthday:"15 de dezembro",bloodType:"B",height:"231 cm",weight:"2.268 kg (43 kg de mat. orgânica)",likes:"Uma boa batida, graxa de sapato, polimento para metais, música para 4 instrumentos, folhas de outono, 4ª aumentada, o espírito da lei, gim, limpeza",dislikes:"Malacos, corrupção, dissonância mal resolvida, falta de cuidado, barbeadores elétricos, vitaminas, espaços apertados",characterAbility:{title:"O RITMO NÃO PODE PARAR",description:"Ao arrancar, o Big Band pode absorver UM golpe sem ser interrompido (mas sofre dano normalmente)."},superiorAbility1:{title:"MAESTRO",description:`SOLISTA - Ganha REGENERAÇÃO FORTE por 10 s e sofre 50% menos dano ao absorver o primeiro GOLPE ao ARRANCAR.

LÍDER DA BANDA - Sofra 15% menos dano e ganhe 30% de RESISTÊNCIA enquanto o Big Band tiver aliados vivos.`},superiorAbility2:null,prestigeAbility:{title:"BATIDA EXPLOSIVA",description:`O Big Band carrega esta habilidade a cada 10° GOLPE DE COMBO que acerta ele ou o oponente.

TAXA DE CARGA: 15% por 10° GOLPE DE COMBO

EFEITO DE ATIVAÇÃO: os ATAQUES DE ARRANCADA do Big Band ganham uma chance de 60% de serem INDEFENSÁVEIS e dão FÚRIA por 5 segundos.`}},"black-dahlia":{attack:3,health:4,playstyle:"Equipada com uma arma multiuso, Dália Negra brilha no controle de arena à média distância. Seus projéteis (fogo, gelo, choque, etc.) aplicam penalidades únicas, permitindo um estilo dinâmico com armadilhas explosivas e forte controle de zona.",biography:"Dália Negra é a assassina e braço direito de Lorenzo Medici, chefe do poderoso sindicato do crime dos Medici que governa Nova Meridian das sombras. Ex-agente dos Laboratórios Anti-Skullgirl, Dália Negra foi mortalmente ferida décadas atrás em um confronto com uma Skullgirl e reconstruída com tecnologia cibernética experimental. A experiência a deixou com uma sede de sangue insaciável e fascinada pelo desespero e sofrimento dos outros.<br><br>Ela traiu os colegas para ser uma assassina de aluguel para quem pudesse mantê-la bem paga (e entretida). Depois que a Torre Medici foi destruída pela Skullgirl, Lorenzo mandou Dália Negra para impedir Marie e recuperar a Joia da Vida roubada por Ms. Fortune. Porém, Dália se vê entediada com seu empregador e atraída pelas emoções proibidas que apenas o Coração-Caveira pode proporcionar...",birthday:"18 de agosto",bloodType:"O",height:"175 cm",weight:"159 kg (45 kg de matéria orgânica)",likes:'Coelhos, Ottomo, sapos, facas na bota, arsênico, renda velha, petit fours red velvet, pérolas gigantes, passaportes falsos, gemas brutas, "suco de maçã"',dislikes:"Tom, Ben Birdland, Vitale, supervisão, champagne barato (dá soluço), presas fáceis, assuntos inacabados, crianças bisbilhoteiras, cabelo azul, moralidade, mansplaining",characterAbility:{title:"FRANCO-ATIRADORA",description:"Toque no botão FRANCO-ATIRADORA para disparar TIROS! Toque no botão RECARREGAR para carregar 6 TIROS novos. Quando estiver recarregando, o tipo do terceiro tiro é determinado pelo ELEMENTO de Dália Negra, e o sexto é aleatório."},superiorAbility1:{title:"ORIGEM MECÂNICA",description:`DESCONTROLE METÁLICO - TIROS ESPECIAIS infligem 30% de dano extra e QUEBRA DE ARMADURA por 10 s (também se aplica a golpes bloqueados).

NÃO HÁ TEMPO PARA MORRER - Quando o oponente acerta um CRÍTICO, 50% de chance de ganhar REGENERAÇÃO e ACELERAÇÃO por 10 s cada.`},superiorAbility2:null,prestigeAbility:{title:"GATILHO MORTIS",description:`Dália Negra carrega essa habilidade sempre que DISPARA um TIRO.

TAXA DE CARGA: 17% por TIRO disparado.

EFEITO DE ATIVAÇÃO: Dália Negra inflige MARCA DA MORTE e ganha OLHO-MORTO por 15 segundos ao RECARREGAR.`}},cerebella:{attack:4,health:4,playstyle:"Cerebella é uma lutadora extremamente contundente que mistura força bruta e agarrões aéreos. Focada em combate corpo a corpo, ela desestabiliza oponentes com investidas blindadas de Vice-Versa e combos altamente punitivos e alto dano.",biography:"Maior estrela do Cirque des Cartes, a Cerebella é um dínamo rolante e voador de estrelato: ela é admirada em todo o Reino de Dossélia por sua enorme força e sedutoras curvas. Infelizmente, esta acrobata órfã só deseja a atenção de um homem, o mafioso Vitale Medici, que a adotou e se tornou o mais próximo de um pai que ela veio a conhecer.<br><br>Apesar de ter um bom coração, a Cerebella trabalha como cobradora da máfia quando não está se apresentando no circo. A Cerebella é a única capaz de controlar seu poderoso chapéu Arma Viva, Vice-Versa, então o Vitale dosa muito bem suas afeições para mantê-la lutando em seu team.",birthday:"11 de abril",bloodType:"B",height:"168 cm",weight:"59 kg",likes:"Competições, aparecer, gatos, luta greco-romana profissional, sudoku, flertar, agradar o Vitale, zoar da Feng, sua colega de quarto",dislikes:"Quem fala mal do circo, quem fala mal do Vitale, pessoas irritadas, desistões, baratas",characterAbility:{title:"ATO DE EQUILÍBRIO",description:"INTERRUPÇÕES DE ARREMESSOS deixam os oponentes ABALADOS."},superiorAbility1:{title:"CENTRO DO PALCO",description:`VANTAGEM - ARREMESSOS reduzem 30% do MEDIDOR DE BLOCKBUSTER.

MESTRE DE PICADEIRO - ARREMESSOS DESATIVAM as ASSISTÊNCIAS e GOLPES ESPECIAIS do oponente por 15 segundos.`},superiorAbility2:null,prestigeAbility:{title:"MAIOR A QUEDA",description:`A Cerebella carrega esta habilidade sempre que ARREMESSA ou é ARREMESSADA pelo oponente.

TAXA DE CARGA: 20% por ARREMESSO.

EFEITO DE ATIVAÇÃO: os ARREMESSOS da Cerebella causam dano extra igual a 100% da porcentagem restante da VIDA do oponente.`}},double:{attack:4,health:1,playstyle:"Double possui a habilidade única de transformar sua forma durante o combate. Com um estilo volátil e alta capacidade ofensiva camuflada nas formas de outros personagens, ela é a 'curinga' do jogo, capitalizando o caos para surpreender oponentes.",biography:"As origens da Double são um completo mistério. Sem vontade ou motivo próprio aparente, este monstro bizarro ajuda a Skullgirl.<br><br>A Double é capaz de transformar sua forma dantesca na de qualquer pessoa, mas frequentemente se mostra como uma freira sorridente. Frequentemente fica na Grande Catedral da Divina Trindade, ouvindo confissões e cuidando das catacumbas subterrâneas.",birthday:"Desconhecido",bloodType:"Todos",height:"Variável",weight:"Variável",likes:"Nada",dislikes:"Nada",characterAbility:{title:"TRANSMUTAÇÃO",description:`Após BLOQUEAR sem ser golpeado por 1 segundo, a Double muda para um novo elemento aleatório.

Quando em VANTAGEM ELEMENTAL, o dano da Double aumenta em 10%.

Quando em DESVANTAGEM ELEMENTAL, o dano do oponente diminui em 10%.`},superiorAbility1:{title:"ENTROPIA",description:`CAOS - Quando estiver em VANTAGEM ELEMENTAL, cause um EFEITO NEGATIVO por 15 segundos quando acertar um GOLPE CRÍTICO.

VOLATILIDADE - Receba um EFEITO POSITIVO aleatório por 10 segundos a cada 10 segundos.`},superiorAbility2:null,prestigeAbility:{title:"RISCO DUPLO",description:`A Double carrega esta habilidade sempre que se TRANSMUTA.

TAXA DE CARGA: 13% por TRANSMUTAÇÃO.

EFEITO DE ATIVAÇÃO: os efeitos da VANTAGEM ELEMENTAL da Double aumentam em 100%.`}},eliza:{attack:3,health:4,playstyle:"Eliza e seu parasita Sekhmet e seus guarda-costas. Ao usar um Blockbuster de Sekhmet, o Sekhmet entra em campo sendo imune a Ataques Comuns e Golpes Especiais. Ela é um Personagem de Controle e Suporte sendo bem útil em diversas situações onde o oponente é dificil de lidar",biography:"A Eliza é a diva celebridade da recém-inaugurada boate de Nova Meridian, o Covil de Bastet. O que a clientela não sabe, no entanto, é que ela também é a hospedeira da Parasita esquelética Sekhmet há incontáveis anos. É amplamente conhecida por suas instituições de caridade de doação de sangue, que, na verdade, servem só para alimentar Sekhmet e manter a beleza eterna da Eliza. Recentemente descoberta e chantageada pela família Medici a perseguir o Coração-Caveira, as antigas ambições da Eliza se acenderam mais uma vez...",birthday:"17 de outubro",bloodType:"Qualquer um",height:"180 cm",weight:"73 kg (em média)",likes:"Cerveja, kushari, dólmãs, coquetel Old Fashioned, jogos de tabuleiro (especialmente Senet), banho de imersão, se vestir, gatos, tempo ensolarado, dançar, cantar, chamar a atenção, sangue, conquistar, Sansão",dislikes:"Arrogância humana, preconceito contra Parasitas, plebeus, perder oportunidades, filantropia, raios-X, viver em locais pequenos, Trindadeísmo, inexatidão histórica, sangue doente, perder o nariz, Sansão",characterAbility:{title:"DEUSA GUERREIRA",description:"BLOCKBUSTERS envolvendo a Sekhmet agora deixam a Eliza no Modo Sekhmet por um tempinho. Todo o dano recebido no Modo Sekhmet é recuperável."},superiorAbility1:{title:"LINHAGEM SANGUÍNEA",description:`JURAMENTO DE SANGUE - Sempre que um aliado é derrotado, a Eliza recupera 50% de VIDA.

SACRIFÍCIO RITUAL - Sempre que um aliado é derrotado, a Eliza ganha 100% no MEDIDOR DE BLOCKBUSTER.`},superiorAbility2:null,prestigeAbility:{title:"BANQUETE E FOME",description:`A Eliza carrega esta habilidade sempre que entra no MODO SEKHMET.

TAXA DE CARGA: 25% por ENTRADA.

EFEITO DE ATIVAÇÃO: a Eliza ganha 20% de chance em cada GOLPE NÃO BLOCKBUSTER no MODO SEKHMET (incluindo golpes bloqueados) de REMOVER 1 EFEITO POSITIVO do oponente e ganhar 5% de VIDA.`}},filia:{attack:3,health:2,playstyle:"Filia é focada em agilidade e pressão de curta distância. Ela consegue se curar e causar sangramento constantemente e inflingindo uma boa quantidade de dano com seus combos variados.",biography:"Houve um tempo que a Filia era só uma estudante comum, mas um dia ela acordou sem nenhuma lembrança e uma segunda boca na nuca. Ela havia se tornado a hospedeira do Parasita chamado Sansão, uma rebelde cabeleira demoníaca com poderes incríveis.<br><br>Sem memória ou alguém para quem pedir ajuda, se ela quiser, um dia, juntar as peças de seu passado e sobreviver ao inevitável embate com a Skullgirl, a Filia terá que confiar nesse ser misterioso.",birthday:"18 de março",bloodType:"AB",height:"163 cm",weight:"64 kg",likes:"Comer, café, milkshakes, ler e aprender, radionovelas, quadrinhos, romances, cachorros",dislikes:"Os blefes e jogatinas do Sansão, ver inocentes feridos, cabelos embaraçados, mentiras, efeitos colaterais do parasitismo do Sansão",characterAbility:{title:"FLASHBACK",description:"Arrancar para trás pouco antes de receber um GOLPE faz a Filia se ESQUIVAR do ataque do oponente, evitando dano."},superiorAbility1:{title:"SANGRIA",description:`SANGUESSUGA - 35% do dano infligido pela Filia é recuperado como VIDA.

O PRIMEIRO CORTE - Cada GOLPE tem 15% de chance de converter todos os SANGRAMENTOS ativos em permanentes.`},superiorAbility2:null,prestigeAbility:{title:"APRUMA E TRANÇA",description:`A Filia carrega esta habilidade sempre que GOLPEAR um oponente atacando ou for GOLPEADA enquanto atacar.

TAXA DE CARGA: 20% por GOLPE.

EFEITO DE ATIVAÇÃO: a Filia se ESQUIVA de todos os projéteis AO ARRANCAR e tem 100% de chance de infligir MARCA DA MORTE por 5 segundos ao GOLPEAR um oponente atacando.`}},fukua:{attack:3,health:2,playstyle:"Apesar de se parecer com Filia, Fukua concentra-se nos ataques de médio alcance, longo alcance e alto dano. Ela tem projeções fantasmas que roubam a vitalidade dela e tem diversos usos. Ela mistura ataques rotineiros seguros de longo alcance com investidas corpo a corpo eficazes.",biography:"Um dos hobbies menos socialmente aceitáveis do Brain Drain é a clonagem, e muitas vezes ele força as almas de guerreiros mortos a habitar esses clones. Fukua é o resultado de um feliz - ou infeliz - acidente no Laboratório Zero: uma união de duas almas. Uma, de um guerreiro outrora orgulhoso, conhecido por sua força bruta em combate corpo a corpo; a outra, de um assassino silencioso, especializado em armas de longo alcance para matar. Juntos, eles são Fukua, possuidora do melhor das duas especialidades... mas os relacionamentos formados sob circunstâncias intensas geralmente não duram.",birthday:"Desconhecido",bloodType:"AB",height:"163 cm",weight:"64 kg",likes:"Desconhecido",dislikes:"Desconhecido",characterAbility:{title:"SOMBRAS SANGUÍNIAS",description:"Todo o dano que Fukua recebe é infligido como ARRANHÃO não permanente."},superiorAbility1:{title:"ENTIDADE LIBERTA",description:`MALDADE SPECTRAL - Cause 1% de dano bônus por cada 5% DE VIDA perdida.

IRA DA APARIÇÃO - Reduza o dano recebido em 1% por cada 5% de VIDA perdida.`},superiorAbility2:null,prestigeAbility:{title:"DEVORADORA DE SONHOS",description:`A Fukua carrega esta habilidade sempre que ela ou o oponente usam um BLOCKBUSTER.

TAXA DE CARGA: 25% por BLOCKBUSTER.

EFEITO DE ATIVAÇÃO: a Fukua drena 10% do MEDIDOR DE BLOCKBUSTER do oponente e inflige BLOQUEIO DE CURA por 5 segundos ao usar um BLOCKBUSTER.`}},marie:{attack:2,health:4,playstyle:"Marie utiliza seus esqueletos em ataques em série para pressionar adversários com eles e o Hilgard seu principal aliado. Ela é uma personagem bem forte para manter pressão, controlar o campo e pode reviver aliados e impedir ressurreição de oponentes.",biography:"Marie Korbel era a menina mais desajeitada do Orfanato de Hilgard, mas era também uma autonomeada faxineira entusiasmada até que bandidos atacaram sua nova família. Desesperada, Marie pediu para o Coração-Caveira o poder para proteger aqueles que ela amava. Seu desejo foi concedido, mas a um preço terrível. Marie despertou como uma criatura distorcida de destruição: a Skullgirl. Com seus amigos mortos e seu lar arrasado, Marie não tinha mais nada além da vingança. Sua determinação feroz permitiu que ela concentrasse sua fúria assassina na Máfia dos Medicis, mas o tempo todo o Coração-Caveira a pressionava a cometer atos mais graves de destruição.<br><br>Mas o impossível aconteceu. O Coração-Caveira foi destruído e a própria Marie foi poupada. Ela agora é uma Skullgirl sem limitações, livre dos planos diabólicos dos mestres ocultos do Coração-Caveira. Marie não sabe o que fazer com sua nova realidade, mas uma coisa é certa: ela jurou ser a última Skullgirl.",birthday:"3 de abril",bloodType:"SG (antes O)",height:"144,8 cm",weight:"42,6 kg",likes:"Organização, Proteger os Inocentes, Memórias Queridas, Maçãs, Geleias e Gelatinas, Livros, Patricia, o Orfanato de Hilgard, Rommelgrad, Justiça",dislikes:"Os Medicis, Guerra, Armas, Criminosos, Ratos, O Projeto Anti-Skullgirl, o Coração-Caveira, Impotência, Freira Suspeita, Vasos Frágeis",characterAbility:{title:"DESCANSO E RESSURREIÇÃO",description:"Segure o botão DESCANSO E RESSURREIÇÃO para acumular uma CARGA MORTUÁRIA. Quando carregada, toque no botão para REVIVER aliados derrotados próximos e INCINERAR cadáveres de oponentes próximos!"},superiorAbility1:{title:"ARTESÃ DOS CADÁVERES",description:`INCINERAÇÃO MELHORADA - Ganhe 25% no MEDIDOR DE BLOCKBUSTER e FÚRIA quando INCINERAR um corpo morto.

RESSURREIÇÃO REFORÇADA - Enquanto Marie estiver viva, os aliados ganham ARMADURA permanente e 25% de VIDA adicional quando REVIVIDOS.`},superiorAbility2:null,prestigeAbility:{title:"CHAMADO DO TÚMULO",description:`Marie carrega esta habilidade sempre que um EF. POS. ou EF. NEG. expirar em qualquer lutador enquanto ela ESTIVER NA ASSISTÊNCIA.

TAXA DE CARGA: 14% por EF. POS. ou EF. NEG. expirado.

EFEITO DE ATIVAÇÃO: Marie inflige QUIETUS por 15 segundos sempre que usa uma CARGA MORTUÁRIA.`}},"ms-fortune":{attack:5,health:2,playstyle:"Ms. Fortune ganha um controle inigualável de área ao usar sua cabeça destacável como assistente na tela. Caso prefira permanecer inteira, ela ataca avidamente com combos punitivos extremamente velozes baseados em investidas de curta distância e alto dano.",biography:"Uma feral meio-gata, Nadia Fortune é a última integrante viva da Gangue Espinhosa, um notório bando de ladrões dagonianos (à exceção dela). A última missão deles terminou em tragédia: uma tentativa fracassada de roubar a misteriosa Gema da Vida de Lorenzo Medici culminou em suas horríveis mortes. Antes de se juntar a eles, a Ms. Fortune engoliu a Gema da Vida e conseguiu digeri-la.<br><br>O poder da Gema permeou todo o seu corpo, tornando-a incapaz de morrer... mesmo depois de ter sido cortada em vários pedaços. Atualmente, a Ms. Fortune se esconde nas sombras da Pequena Innsmouth e planeja vingar seus camaradas caídos.",birthday:"24 de novembro",bloodType:"B",height:"173 cm",weight:"58 kg",likes:"Fazer amigos, cochilar ao sol, vôlei, boliche, golfe, parkour, atormentar os outros com trocadilhos horríveis, o restaurante da Yu-Wan, Dim Sum, a Gangue Espinhosa, roubar dos ricos, dar aos pobres, batatas chips",dislikes:"A Máfia dos Medici, Dália Negra, sushi, policiais, valentões, marsupiais, barulhos altos, limonada",characterAbility:{title:"JOGOS MENTAIS",description:"Toque no botão JOGOS MENTAIS para entrar no MODO SEM CABEÇA. A cabeça da Ms. Fortune pode atacar independentemente de seu corpo. Mas cuidado: a Ms. Fortune também sofre dano adicional na cabeça!"},superiorAbility1:{title:"TEM UM EFEITO POSITIVO?",description:`BLÉEÉ - Ganhe REGENERAÇÃO por 20 segundos depois de cada 10 segundos sem sofrer um golpe (inclui golpes bloqueados).

BUP - Ganhe FÚRIA por 20 segundos depois de cada 10 segundos sem sofrer um golpe (inclui golpes bloqueados).`},superiorAbility2:null,prestigeAbility:{title:"BORRÃO PELUDO",description:`A Ms. Fortune carrega esta habilidade com base na sua VELOCIDADE DE MOVIMENTO.

TAXA DE CARGA: 1.5% da VELOCIDADE DE MOVIMENTO dela.

EFEITO DE ATIVAÇÃO: a Ms. Fortune ganha ESQUIVA e inflige QUEBRA DE GUARDA por 5 segundos a cada 5 segundos.`}},painwheel:{attack:5,health:1,playstyle:"Painwheel tem ataques carregados devastadores executados através da lâmina em suas costas. Focar nela significa lidar com seu dano reflexivo e contra-ataques letais onde os oponentes ferem a si mesmos e recebem danos massivos de volta, é um personagem com pouca vida mais com um dano muito alto.",biography:"Outrora uma estudante normal chamada Carol, a Painwheel foi sequestrada pela Valentine e entregue ao discreto Laboratório Zero nos Laboratórios Anti-Skullgirl. Lá, ela recebeu o implante de um Motor Buer sintético e de parasitas Gae Bolga, além de uma transfusão de sangue experimental de Skullgirl, o que a transformou no monstro que é hoje. Violenta e instável por culpa desses experimentos, ela é controlada mentalmente pelo poderoso diretor psíquico do Laboratório Zero, Brain Drain, por precaução.<br><br>Alimentada pela fúria, ela transforma sua dor e ódio em poder. Apesar disso, a alma daquela garotinha assustada ainda vive dentro desse corpo monstruoso, desesperadamente lutando contra a multidão de vozes que querem controlá-la.",birthday:"23 de outubro",bloodType:"SG",height:"155 cm",weight:"170 kg",likes:"Flores, jardinagem, caminhadas pela praia ao pôr-do-sol, família, o som de um mensageiro do vento, cachorros, lembranças nostálgicas, amigos, magenta, boa educação",dislikes:"Laboratório ASG, Valentine, Brain Drain, a Skullgirl, o Coração-Caveira, pessoas, seu corpo, controle mental, tortura, dor, frustração, fofoca, sons de isopor, barulhos altos, trocadilhos ruins",characterAbility:{title:"RISCO DE FUGA",description:"Toque no botão RISCO DE FUGA para flutuar! Toque de novo para aterrissar. Em voo, deslize e toque para ganhar acesso a novas ações."},superiorAbility1:{title:"ALMA TORTURADA",description:`SANGUE MACULADO - Quando o oponente acerta um CRÍTICO, 100% do dano é refletido de volta.

RANCOR - Quando o oponente acerta um CRÍTICO, ganhe FÚRIA por 20 segundos e ARMADURA por 5 segundos.`},superiorAbility2:null,prestigeAbility:{title:"SEM LUGAR PARA SE ESCONDER",description:`A Painwheel carrega essa habilidade sempre que ela ou seu oponente acertarem um GOLPE CRÍTICO.

TAXA DE CARGA: 4% por GOLPE CRÍTICO.

EFEITO DE ATIVAÇÃO: a Painwheel inflige QUEBRA DE GUARDA por 10 segundos ao usar um BLOCKBUSTER.`}},parasoul:{attack:3,health:3,playstyle:"A Parasoul utiliza as lágrimas explosivas de seu Guarda-Chuva como armadilhas para gerenciar o campo e potencializa o seu dano. Combina habilidades afiadas corpo a corpo com controle absoluto da tela através das suas tropas aliadas intercedendo, o que lhe permite estender os combos com ataques mortais de precisão, seja a longa ou a curta distância.",biography:"Poucos conhecem os terrores da Skullgirl tão intimamente quanto a Parasoul: sete anos atrás, sua própria mãe se tornou a Skullgirl que quase destruiu o mundo. Esse trágico passado fez com que ela quisesse proteger tanto seu país quanto sua família com unhas e dentes, mas essas duas prioridades frequentemente entram em conflito.<br><br>Hoje, a Parasoul é a princesa do Reino de Dossélia e líder do esquadrão militar de elite Garças-Negras. Empunhando Krieg, o guarda-chuva vivo, ela luta com graça, postura e astúcia para defender a honra de sua família e para destruir o Coração-Caveira para que ninguém repita o terrível erro de sua mãe.",birthday:"22 de dezembro",bloodType:"A",height:"178 cm",weight:"70 kg",likes:'Lógica, vinho, xadrez, esgrima, treinar, tênis, diplomacia, filosofia, os Garças-Negras, assistir escondida "Annie: Garota das Estrelas", sua irmã Umbrella',dislikes:"Pessoas muito emotivas, depender dos outros, quem fala mal de sua família, injustiça, a Máfia dos Medici, a Skullgirl, as peripécias de sua irmã",characterAbility:{title:"LAGRIMOSA",description:"Certos ataques geram uma LÁGRIMA. Um ATAQUE DE CARGA detona todas as LÁGRIMAS ativas, causando dano aos oponentes atingidos pela explosão."},superiorAbility1:{title:"HIPERCRÍTICA",description:`PENSAMENTO CRÍTICO - A Parasoul ganha um bônus de 25% na CHANCE DE CRÍTICO para cada LÁGRIMA ATIVA.

MASSA CRÍTICA - A Parasoul ganha um bônus de 20% no DANO CRÍTICO para cada LÁGRIMA ATIVA.`},superiorAbility2:null,prestigeAbility:{title:"PRECISÃO MORTAL",description:`A Parasoul carrega esta habilidade sempre que uma LÁGRIMA aparecer.

TAXA DE CARGA: 12% por LÁGRIMA.

EFEITO DE ATIVAÇÃO: a Parasoul ganha PRECISÃO a cada 2 segundo(s) enquanto estiver perto de uma LÁGRIMA.`}},peacock:{attack:4,health:2,playstyle:"A Peacock é uma personagem bem forte para controlar o campo a longa distância, ela pode ser bem imprevisivel e possui um bom arsenal, ela tem uma forte presença em campo devido a sua facilidade para abrir defesas, aplicar combos e pressionar de forma segura para ela.",biography:'Outrora uma órfã da guerra e escrava chamada Patrícia, o corpo da Peacock foi horrivelmente mutilado pelos mercadores de escravos que a capturaram. Ela foi salva pelos Laboratórios Anti-Skullgirl do Dr. Avian e reconstruída com um arsenal surreal de armas biomecânicas: o Sistema Argus aperfeiçoou seu corpo e a Unidade Avery lhe deu acesso a armas nunca concebidas.<br><br>Contudo, nada podia ser feito por sua mente: a psique destruída da Peacock e seu amor por desenhos animados transformou seus novos "brinquedos" em uma assustadora gangue de bandidos, os quais ela não tem problema nenhum em mandar pintar a cidade de vermelho... com sangue. Por mais assustadora que seja, ela pode ser a melhor escolha do reino para enfrentar a Skullgirl.',birthday:"13 de novembro",bloodType:"B",height:"137 cm",weight:"43 kg (variável)",likes:'Desenhos animados, o programa de TV "Annie: Garota das Estrelas", filmes, violência, junk food, carros velozes, explosivos, charutos, mandar',dislikes:"Fracotes, burocracia, figuras de autoridade, pessoas, o Coração-Caveira, nerds, salada, hashis",characterAbility:{title:"IDEIA PROFUNDA",description:"Toque no botão IDEIA PROFUNDA para sumir em um buraco, evitando alguns ataques. Toque em outro lugar para emergir atacando, ou toque de novo ou espere 2 segundos para sair sem atacar."},superiorAbility1:{title:"MARATONA DE DESENHOS",description:`EPISÓDIO ESPECIAL - Quando a Peacock usa um GOLPE ESPECIAL, há 30% de chance de reiniciar a RECARGA imediatamente.

FESTA DO ELENCO - Quando Peacock ou um aliado usam um ATAQUE DE ASSISTÊNCIA há 50% de chance do ataque ser INDEFENSÁVEL.`},superiorAbility2:null,prestigeAbility:{title:"MUNIÇÕES MANÍACAS",description:`A Peacock carrega essa habilidade sempre que ela ou o oponente sofrem dano de um PROJÉTIL.

TAXA DE CARGA: 3% por PROJÉTIL.

EFEITO DE ATIVAÇÃO: a Peacock tem 50% de chance de ganhar 1 camada de FÚRIA por 5 segundos, ACELERAÇÃO por 5 segundos ou PRECISÃO ao usar um GOLPE ESPECIAL.`}},"robo-fortune":{attack:3,health:4,playstyle:"Com feixes de laser potentes, Robo-Fortune é especialista em longas distâncias, utilizando combos que punem oponentes de longe e do ar. Ela além de ter um arsenal robusto para combos e ataques de diferentes distâncias, tem boas habilidades e difícil de puni-la, ela é uma ameaça persistente.",biography:"A Robo-Fortune foi criada por Brain Drain, o diretor psíquico do Laboratório ASG Zero, e serve como um demonstrativo da incomparável petulância e orgulho de seu maníaco criador. Construída para demonstrar lealdade e astúcia, a Robo-Fortune falha em exibir qualquer medida de ambos. Fazendo uso de tecnologia de ponta, ela parte para caçar a Skullgirl e tomar parte de conflitos facilmente evitáveis.<br><br>Seria a mais nova criação do Projeto ASG o soldado cibernético supremo? Terão as maquinações mecânicas de Brain Drain colocado o mundo num caminho perigoso? Será a programação malfeita da Robo-Fortune uma característica, não um bug? Terá a ciência ido longe demais?!",birthday:"31 de janeiro",bloodType:"Óleo Sintético 10W-30",height:"168 cm",weight:"200 kg",likes:"Iscas, inteiros menores ou iguais a 1, livros sobre dragões, portões lógicos, 0x5f3759df, loops de strings desenrolados, ratos, rebeccapurple, IEEE (exceto após C!), setplay",dislikes:"Desordem, formatos de arquivo incompatíveis, DES, senhas sem sal (não têm gosto de nada!), corações sangrando, línguas mal-escritas, iv, fontes que deixam o O e o 0 parecidos, check-ins sem comentários, padrões de Moire",characterAbility:{title:"HARDWARE DO CABEÇONE",description:"Toque no botão LANÇAR para lançar os CABEÇONES. Use os CABEÇONES para atacar inimigos, colocar minas de proximidade e disparar um bombardeio de mísseis!"},superiorAbility1:{title:"PROTOCOLO DE REDE",description:`DDOS - Inflija OSCILAÇÃO DE ENERGIA por 15 segundos após cada 3 segundos enquanto estiver perto do oponente.

VERIFICAÇÃO DE PING - Ganhe FÚRIA por 15 segundos após cada 2 segundos enquanto estiver longe do oponente.`},superiorAbility2:null,prestigeAbility:{title:"CONTADOR GEIGER",description:`A Robo-Fortune carrega esta habilidade sempre que ganha um EFEITO POSITIVO ou inflige um EFEITO NEGATIVO.

TAXA DE CARGA: 7% por EFEITO POSITIVO ou NEGATIVO.

EFEITO DE ATIVAÇÃO: a Robo-Fortune ganha 5 camadas de PRECISÃO e reflete 20% do dano que sofrer por cada EFEITO POSITIVO que ela ou o oponente tiverem (máx. de 100%).`}},squigly:{attack:2,health:4,playstyle:"Squigly precisa carregar suas habilidades pacientemente através do Leviatã seu companheiro que o ajuda a melhorar a eficácia de golpes e melhora o fluxo de 'dano' para desempenhar melhor em diferentes situações, uma personagem bem versátil e divertida de jogar para combos eficazes.",biography:'A Squigly é a última "sobrevivente" da família Contiello, uma longa linhagem de cantores de ópera, e está entre as mais valiosas clientes dos Medici. Quatorze anos atrás, a mãe da Squigly, Selene, obteve o Coração-Caveira, o que fez Lorenzo Medici ordenar um ataque à família Contiello. Desesperada, a Selene se tornou Skullgirl e ressuscitou sua família como um exército de mortos-vivos. O que salvou a Squigly de perder seu livre arbítrio foi a intervenção do Parasita Leviatã, amigo e guardião da família Contiello.<br><br>Se não fosse pela Squigly e a intervenção do ASG, a batalha entre a Skullgirl e Lorenzo se espalharia por Nova Meridian. Com a derrota da Skullgirl, o poder que animou a Squigly enfraqueceu, colocando-a para dormir. Lorenzo pagou generosamente pelo funeral da família Contiello e desde então não teve mais conflitos com os demais clientes dos Medici.<br><br>Quatorze anos depois, o aparecimento de Bloody Marie tirou a Squigly de seu longo sono...',birthday:"2 de novembro",bloodType:"Embalsamada (Antes, A-)",height:"160 cm",weight:"54 kg",likes:"Leviatã, sua família, tradição, ler sobre eventos atuais, animais (especialmente pássaros e cobras), música, cantar, macarrão, refrigerante de baunilha, bolo, hambúrgueres, jardinagem, cheiro de incenso, banheiras com espuma, não estar morta",dislikes:"Família Medici, Dália Negra, Double, o Coração-Caveira, gente mal educada, desonestidade, quem não leva karaokê a sério, tempestades com relâmpagos, estar morta",characterAbility:{title:"CAUDA DE DRAGÃO",description:"Segurar o botão CAUDA DE DRAGÃO faz com que até 2 CARGAS DE DRAGÃO sejam armazenadas. As CARGAS DE DRAGÃO são consumidas para tornar certos ataques mais poderosos!"},superiorAbility1:{title:"NOITE ASSUSTADORA",description:`MORTA DO MAL - Enquanto inimigos estiverem perto do corpo da Squigly, GOLPES dos aliados infligem MALDIÇÃO e DEFINHAR por 15 segundos.

MORTA-VIVA - Enquanto aliados estiverem perto do corpo da Squigly, receber um GOLPE lhes dará RESISTÊNCIA FINAL por 15 segundos.`},superiorAbility2:null,prestigeAbility:{title:"NÃO SAIA DA TUMBA",description:`A Squigly carrega esta habilidade sempre que ela ganha ou usa uma CARGA DE DRAGÃO.

TAXA DE CARGA: 12% por CARGA DE DRAGÃO ganha ou usada.

EFEITO DE ATIVAÇÃO: quaisquer oponentes derrotados no momento não podem mais ser revividos, e a Squigly ganha uma CARGA DE DRAGÃO a cada 2 segundos enquanto estiver perto de um cadáver.`}},umbrella:{attack:4,health:2,playstyle:"A jogabilidade de Umbrella gira em torno do medidor de fome de Hungern (Guarda-Chuva). Com o medidor cheio (empanturrado) a personagem fica lenta, causa mais dano e facilita algumas interações. Medidor na metade (saciado) seu estágio normal. Medidor vazio (faminto) ela fica mais rápida, porém diminui seu dano.",biography:"A Umbrella é a princesa mais nova do Reino de Dossélia e raramente é vista fora dos salões do palácio real em Canópolis. Ela cresceu isolada, e seu único amigo de verdade é uma herança de família: a arma viva Hungern. Juntos, eles enfrentam o mal e entram na briga em nome da justiça, tal como a irmã mais velha da Umbrella: Parasoul! Ou pelo menos é o que eles fariam se pudessem sair do palácio!<br><br>O surgimento de uma nova Skullgirl pode proporcionar à Umbrella a aventura que ela quer. Mas, quando ela descobrir a verdade sobre si mesma e sua família, será que ela vai desejar ter ficado em casa?",birthday:"17 de julho",bloodType:"O(?)",height:"1,17 m",weight:"27,2 kg",likes:"Sua irmã Parasoul (a maior parte do tempo), Hungern, sorvete, desenhar, TV, anfíbios, filmes B de terror, dias chuvosos, luta-livre profissional, justiça!, origami de Hungern",dislikes:"Sua irmã Parasoul (o resto do tempo), escola em casa, programa de TV Annie das Estrelas, vestidos chiques sufocantes, foie gras, ser pega, Garças da Operação B.A.B.Á.S., o aceno de princesa, joelhos machucados, chorar sobre o leite derramado",characterAbility:{title:"FOME DO HUNGERN",description:"Desbloqueia o Medidor de Fome do Hungern. ARREMESSOS enchem o medidor e golpes baseados em BOLHAS (incluindo tocar o botão do medidor) o esvaziam. Ataques básicos causam mais dano enquanto EMPANTURRADO e são mais rápidos enquanto FAMINTO. Certos golpes são fortalecidos pelo estado do Hungern!"},superiorAbility1:{title:"MANDÍBULAS DA DERROTA",description:`DOCE VITÓRIA - Ganhe 2 camadas de FÚRIA por 15 segundos quando derrotar um oponente.

FINAL AMARGO - Uma vez por luta, ganhe RESISTÊNCIA FINAL e REGENERAÇÃO FORTE por 15 segundos cada quando estiver com menos de 25% de VIDA.`},superiorAbility2:null,prestigeAbility:{title:"REAÇÃO VISCERAL",description:`A Umbrella carrega esta habilidade sempre que ganha ou perde FOME.

TAXA DE CARGA: 1% por 1% de FOME ganha ou perdida.

EFEITO DE ATIVAÇÃO: a Umbrella ganha 5% de VIDA e inflige GOSMA por 15 segundos quando GOLPEIA um oponente atacando.`}},valentine:{attack:2,health:3,playstyle:"A enfermeira ninja mistura ferramentas médicas para envenenar oponentes ou reanimar aliados derrotados. Uma personagem bem útil para suporte, tem um dano razoável, com golpes eficazes para inflingir efeitos, combos simples e mais. Sua principal função é curar, reviver aliados e incapacitar oponentes quando precisar.",biography:"A Valentine é a única sobrevivente do Última Esperança, um grupo de agentes especiais dos Laboratórios Anti-Skullgirl. Antes de serem exterminados pela Skullgirl, o Última Esperança trabalhava para o misterioso Laboratório Zero e realizava tarefas desde reconhecimento e sabotagem até pesquisa avanççada.<br><br>Agora, a Valentine serve à Skullgirl fielmente, cumprindo sua vontade das sombras. Ela é bastante introvertida, então muito de sua verdadeira natureza e personalidade é desconhecido.",birthday:"25 de dezembro",bloodType:"A",height:"183 cm",weight:"73 kg",likes:"Álcool, o método científico, estudar coisas de longe, cobras, lobos, música clássica, pontualidade, planejamento cuidadoso, desmontar coisas, noticiários e escrita de não-ficção, jogos psicológicos, xadrez, violão acústico, carne, cultura oriental, chocolate amargo",dislikes:"Formalidade desnecessária, sentimentalismo, pessoas fracas, cozinhar, falar com doentes, Brain Drain, dor nas costas, doces",characterAbility:{title:"SIFÃO",description:"Mais do dano que a Valentine recebe é infligido como DANO DE ARRANHÃO não permanente. 75% do dano da Valentine é recuperado como VIDA, mas apenas até o limite de seu DANO DE ARRANHÃO atual."},superiorAbility1:{title:"CLÍNICA DE COMBATE",description:`CENTRO DE TRAUMAS - Quando a Valentine está viva, aliados ganham RESIST. FINAL por 15 s ao sofrer GOLPE que tire mais de 10% de VIDA.

UTI - A Valentine ganha REGENERAÇÃO FORTE por 20 segundos ao sofrer um EFEITO NEGATIVO.`},superiorAbility2:null,prestigeAbility:{title:"REANIMADORA",description:`A Valentine carrega esta habilidade sempre que recupera VIDA ao ENTRAR NA ASSISTÊNCIA.

TAXA DE CARGA: 4% por cada 1% de VIDA recuperada.

EFEITO DE ATIVAÇÃO: todos os aliados derrotados são REVIVIDOS com 10% de VIDA, e a Valentine ganha continuamente 2% de VIDA por segundo.`}}},vo={annie:{playstyle_en:"Annie is a fast fighter focused on long ground combos and constant pressure. She uses her Parasite Sagan to control space and extend combos with her Star Power Mode, which adds extra properties to her attacks.",biography_en:`To all appearances, Annie is a young television actress and the host of "Annie Of The Stars," a TV variety show based on the myths, legends, and folklore of the titular character. The show has been on the air for years, mixing live-action and animation with multiple actresses playing the lead role.

At least... that's what Annie wants you to believe! In truth, there has only ever been one Annie. Cursed by the Skull Heart to never grow up, Annie has been alive for centuries. Over that time, she's made it her personal quest to stop the Skull Heart once and for all. To that end, she has acquired numerous skills and items, including her remote parasite, Sagan. Even performing on television works to further her goals as she hopes to educate the world about the dangers of the Skull Heart.

Fiercer than she looks, bravest in the cosmos, she is ANNIE OF THE STARS!`,birthday_en:"June 12",bloodType_en:"AB",height_en:`5' 1"`,weight_en:"110 lbs",likes_en:"Fight choreography, Passionate monologues, Nature hikes, The Higgs boson, Star fruit, Cheese, Meteor showers, Adoring fans, Quantum superposition, Practical outfits, The Special Tactics and Rescue Service, Old-timey music",dislikes_en:"Tomatoes, Plagiarism, Bad craft services, Sleazy agents, Renaissance fairs, The Fermi Paradox, Random musical numbers, Brown M&Ms, Flat-Earthers",characterAbility:{title_en:"STAR POWER",description_en:"Annie now builds up STAR POWER meter over time, and can activate STAR POWER when above 50% meter. During STAR POWER MODE, Annie's basic attacks produce STARS that deal full damage on BLOCKED HITS, and many of Annie's SPECIAL MOVES have additional properties."},superiorAbility1:{title_en:"EVENT HORIZON",description_en:`REDSHIFT - Each SPECIAL MOVE or BLOCKBUSTER used grants 25% bonus damage to SPECIAL MOVES and BLOCKBUSTERS for the rest of the combo.

BLUESHIFT - Opponents deal 40% less damage on each COMBO HIT under 5.`},prestigeAbility:{title_en:"STARBURST",description_en:`Annie charges this ability when using STAR POWER METER.

CHARGE RATE: 2% per 1% STAR POWER METER spent.

ACTIVATION EFFECT: Annie's STAR POWER STARS deal 50% bonus damage.`}},beowulf:{playstyle_en:"Beowulf is a fighter focused on grabs and close-quarters combat, using his folding chair and 'Hype Mode'. He can throw the chair to control distance or use it to power up his attacks. By building Hype, he performs 'unblockable' grabs that ignore defenses and maintains constant pressure.",biography_en:`Known world-wide for felling the Gigan warrior Grendel and for his illustrious career in the ring, Beowulf had secured himself a spot in the history books as a champion. But a mediocre acting career after leaving the ring tarnished his legacy.

Now, as the Canopy Kingdom faces a new threat, Beowulf enters the ring once more, determined to relive the glory, and in doing so stumbles upon the truth about his past... Will Beowulf be able to overcome this new threat to the city and his legacy? Or is this his final taste of the spotlight?`,birthday_en:"March 31",bloodType_en:"O",height_en:`6' 7"`,weight_en:"287 lbs",likes_en:"Hunting, Working, Snug sweaters, Tour buses, Boots, Ladders, Fluorescent light tubes, Guaranteed money contracts, Microbrews, The sound of an excited crowd, Merchandise, Chamomile tea",dislikes_en:"Professional writing staff, Refined sugar, Allen keys, Snakes, Disqualifications, Taking vacation time, Spray on tans, Indoor voices, Being told what to do, Being told what to wear, Potatoes",characterAbility:{title_en:"HYPE MODE",description_en:"Get 1 Hype Charge with every THROW and every 30 seconds. 3 Hype Charges lets you trigger HYPE MODE! During HYPE MODE, THROWS cannot be broken, and many attacks feature surprising upgrades."},superiorAbility1:{title_en:"TITLE FIGHT",description_en:`CHALLENGER - Beowulf regains 2% HEALTH per second while his HEALTH% is LOWER than his opponent's.

DEFENDING CHAMP - Beowulf deals 20% bonus damage anytime his HEALTH% is HIGHER than his opponent's.`},prestigeAbility:{title_en:"NOW OR NEVER",description_en:`Beowulf charges this ability when entering HYPE MODE.

CHARGE RATE: 50% per HYPE MODE ENTRY.

ACTIVATION EFFECT: Beowulf deals 15% bonus damage in HYPE MODE for every 20 seconds elapsed during the match.`}},"big-band":{playstyle_en:"Big Band is the game's fortress, possessing the highest Health and Defense. A specialist in counter-attacks and impenetrable defense, his abilities revolve around Combo, Pressure, and Damage Absorption mechanics, punishing predictable opponents with Massive Musical retaliations.",biography_en:`Ben Birdland has seen a lot in his time, including the worst of the Grand War. But nothing was worse than what he saw as a beat cop in New Meridian. When he ran afoul of his crooked unit he was given a violent early retirement, and his broken body was left to spend the rest of its days in an iron lung.

That would have been the end of Ben's story if it hadn't drawn the ears of the Anti-Skullgirl Labs. With little left to lose, he agreed to be rebuilt with their experimental procedures. Melded with the machinery that allows him to breathe and a powerful array of pneumatic weaponry, he was reborn as "Big Band."

Now a senior member of Lab 8, he's become a father figure of sorts to the younger ASG soldiers. A firm believer in their cause, he has stayed with the project through its controversies and still sees his place on the front lines against the Skullgirl. His technology may be dated, but he more than makes up for it with experience and fortissimo.`,birthday_en:"December 15",bloodType_en:"B",height_en:`7' 7"`,weight_en:"5000 lbs (95 lbs organic)",likes_en:"A good beat, Shoe polish, Brass polish, 4-part harmony, Autumn Leaves, The flat 5th, The spirit of the law, Gin (neat)",dislikes_en:"Punks, Corruption, Unresolved dissonance, Carelessness, Electric shavers, Smoothies, Narrow spaces",characterAbility:{title_en:"CAN'T STOP THE BEAT",description_en:"While dashing, Big Band can absorb ONE hit without being interrupted (but will take damage normally)."},superiorAbility1:{title_en:"MAESTRO",description_en:`SOLOIST - Gain HEAVY REGEN for 10 seconds and take 50% less damage when absorbing the first HIT while DASHING.

FRONTMAN - Take 15% less damage and gain 20% RESISTANCE while Big Band has living teammates.`},prestigeAbility:{title_en:"BLAST BEAT",description_en:`Big Band charges this ability on every 10th COMBO HIT landed on him or the opponent.

CHARGE RATE: 15% per 10th COMBO HIT.

ACTIVATION EFFECT: Big Band's DASH ATTACKS gain a 25% chance to be UNBLOCKABLE and grant ENRAGE for 5 seconds.`}},"black-dahlia":{playstyle_en:"Equipped with a multipurpose weapon, Black Dahlia shines in mid-range arena control. Her projectiles (fire, ice, shock, etc.) apply unique penalties, allowing a dynamic style with explosive traps and strong zone control.",biography_en:`Black Dahlia is the right hand assassin of Lorenzo Medici, head of the mighty Medici crime syndicate that rules New Meridian from the shadows. A former agent of the Anti-Skullgirl Labs, Black Dahlia was mortally wounded decades ago in a confrontation with a Skullgirl and rebuilt with experimental cybernetic technology. The experience left her with an unquenchable thirst for blood and fascination with the despair and suffering of others.

She betrayed her peers to fight as a hired hitwoman for whomever could keep her paid (and entertained). After Medici Tower is destroyed by the Skullgirl, Lorenzo sends Black Dahlia off on a killing spree to stop Marie and retrieve the stolen Life Gem from Ms. Fortune.

However, Black Dahlia finds herself jaded with her employer and drawn to the forbidden thrills only the Skull Heart can provide...`,birthday_en:"August 18",bloodType_en:"O",height_en:`5' 9"`,weight_en:"350 lbs (100 lbs organic)",likes_en:'Bunnies, Ottomo, Frogs, Boot Knives, Arsenic, Old Lace, Red Velvet Petit Fours, Gigan Sea Pearls, False Passports, Uncut Gems, "Apple Juice"',dislikes_en:"Tom, Ben Birdland, Vitale, Oversight, Cheap Champagne (hiccups), Easy Prey, Loose Ends, Meddling Kids, Blue Hair, Morality, Mansplaining",characterAbility:{title_en:"SHARPSHOOTER",description_en:"Tap the SHARPSHOOTER button to fire SHOTS! Tap the RELOAD button to load 6 new SHOTS. When reloading, the third shot type is determined by Black Dahlia's ELEMENT and the sixth is random."},superiorAbility1:{title_en:"CLOCKWORK ORIGINS",description_en:`METAL BREAKDOWN - SPECIAL SHOTS inflict 20% bonus damage and inflict ARMOR BREAK for 10 seconds (also applies on blocked hits).

NO TIME TO DIE - 50% chance when the opponent lands a CRITICAL HIT to gain REGEN and HASTE for 10 seconds each.`},prestigeAbility:{title_en:"TRIGGER MORTIS",description_en:`Black Dahlia charges this ability each time she FIRES a SHOT.

CHARGE RATE: 17% per SHOT fired.

ACTIVATION EFFECT: Black Dahlia inflicts DEATH MARK and gains DEADEYE for 10 seconds each when RELOADING.`}},cerebella:{playstyle_en:"Cerebella is an extremely hard-hitting fighter who mixes brute force and aerial grabs. Focused on close-quarters combat, she destabilizes opponents with Vice-Versa's armored rushes and highly punishing combos with high damage.",biography_en:`The biggest sensation in the Cirque des Cartes, Cerebella is a tumbling, soaring dynamo of star power: throughout the Canopy Kingdom, she's admired for her enormous strength and alluring curves. Sadly, this acrobatic orphan only desires the attention of one man, mobster Vitale Medici, who took her in and became the closest thing to a father she's ever known.

While inherently good, Cerebella serves the mafia as a leg-breaker when not performing in the circus. Cerebella is the only person capable of controlling her powerful Living Weapon hat, Vice-Versa, so Vitale is stingy with his affections to keep her fighting in his corner.`,birthday_en:"April 11",bloodType_en:"B",height_en:`5' 6"`,weight_en:"130 lbs",likes_en:"Competition, Showing off, Cats, Professional wrestling, Sudoku, Flirting, Pleasing Vitale, Teasing her roommate Feng",dislikes_en:"Badmouthing of the Circus, Badmouthing of Vitale, Angry people, Quitters, Cockroaches",characterAbility:{title_en:"BALANCING ACT",description_en:"THROW BREAKS cause enemies to be STAGGERED."},superiorAbility1:{title_en:"CENTER STAGE",description_en:`UPPER HAND - THROWS reduce BLOCKBUSTER METER by 20%.

RING LEADER - THROWS DISABLE the opponents TAG INS and SPECIAL MOVES for 15 seconds.`},prestigeAbility:{title_en:"THE HARDER THEY FALL",description_en:`Cerebella charges this ability each time she THROWS or is THROWN by her opponent.

CHARGE RATE: 20% per THROW.

ACTIVATION EFFECT: Cerebella's THROWS deal bonus damage equal to 50% of her opponent's remaining HEALTH percentage.`}},double:{playstyle_en:"Double has the unique ability to transform her shape during combat. With a volatile style and high offensive capacity disguised in the forms of other characters, she is the game's 'wildcard', capitalizing on chaos to surprise opponents.",biography_en:`Double's origins are a complete mystery. Seemingly without a will or motive of its own, this formless monster aids the Skullgirl.

Double is capable of transforming its nightmarish form into that of any person, but often appears as a smiling nun. It can frequently be found in the Grand Cathedral of the Divine Trinity, listening to confessions and attending to the catacombs beneath.`,birthday_en:"Unknown",bloodType_en:"All/None",height_en:"Varies",weight_en:"Varies",likes_en:"Nothing",dislikes_en:"Nothing",characterAbility:{title_en:"TRANSMUTATION",description_en:`After BLOCKING without being hit for 1 second, Double will switch to a new random element.

When at an ELEMENTAL ADVANTAGE, Double's damage increases by 10%.

When at an ELEMENTAL DISADVANTAGE, opponent damage decreases by 10%.`},superiorAbility1:{title_en:"ENTROPY",description_en:`CHAOS - When at an ELEMENTAL ADVANTAGE, inflict a random DEBUFF for 15 seconds when landing a CRITICAL HIT.

VOLATILITY - Every 10 seconds, gain a random BUFF for 10 seconds.`},prestigeAbility:{title_en:"DOUBLE JEOPARDY",description_en:`Double charges this ability each time she TRANSMUTES.

CHARGE RATE: 12% per TRANSMUTATION.

ACTIVATION EFFECT: The effects of Double's ELEMENTAL ADVANTAGE are increased by 40%.`}},eliza:{playstyle_en:"Eliza and her parasite Sekhmet and her bodyguards. When using a Sekhmet Blockbuster, Sekhmet enters the field being immune to Normal Attacks and Special Moves. She is a Control and Support character being very useful in various situations where the opponent is difficult to deal with.",biography_en:"Eliza is the celebrity diva of New Meridian's premiere nightclub, Bastet's Den. Unbeknownst to the club's patrons, however, she's also been host to the skeletal Parasite Sekhmet for untold years. Widely known for her blood drive charities, in reality these serve to feed Sekhmet and maintain Eliza's ageless beauty. Recently discovered and blackmailed by the Medici into pursuing the Skull Heart, Eliza's ancient ambitions stir once more...",birthday_en:"October 17",bloodType_en:"Any",height_en:`5' 11"`,weight_en:"160 lbs (on average)",likes_en:"Beer, Kushari, Dolma, Old Fashioneds, Board games (especially Senet), Bathing, Dressing up, Cats, Sunny weather, Dancing, Singing, Being in the spotlight, Blood, Conquest, Samson",dislikes_en:"Human arrogance, Prejudice against Parasites, Plebians, Missed opportunities, Philanthropy, X-rays, Living small, Trinitism, Historical inaccuracies, Unhealthy blood, Losing her nose, Samson",characterAbility:{title_en:"WARRIOR GODDESS",description_en:"BLOCKBUSTERS involving Sekhmet now leave Eliza in Sekhmet Mode for a short duration. All damage taken while in Sekhmet Mode is recoverable."},superiorAbility1:{title_en:"BLOODLINE",description_en:`BLOOD OATH - Whenever a teammate is defeated, Eliza regains 50% HEALTH.

RITUAL SACRIFICE - Whenever a teammate is defeated, Eliza gains 100% BLOCKBUSTER METER.`},prestigeAbility:{title_en:"FEAST AND FAMINE",description_en:`Eliza charges this ability each time she enters SEKHMET MODE.

CHARGE RATE: 25% per ENTRY.

ACTIVATION EFFECT: Eliza gains a 5% chance on each NON-BLOCKBUSTER HIT in SEKHMET MODE (including blocked hits) to REMOVE 1 opponent BUFF and gain 5% HEALTH.`}},filia:{playstyle_en:"Filia is focused on agility and short-range pressure. She can heal herself and cause constant bleeding while inflicting a good amount of damage with her varied combos.",biography_en:`Filia was once just an average schoolgirl, but one day woke up without any memories and a second mouth on the back of her head. She was now playing host to a Parasite named Samson, an unruly mop of demonic hair with incredible power.

With no memories or anyone to turn to for help, if she ever hopes to piece together her past and survive the inevitable clash with the Skullgirl, Filia will need to trust this mysterious being.`,birthday_en:"March 18",bloodType_en:"AB",height_en:`5' 4"`,weight_en:"142 lbs",likes_en:"Eating, Coffee, Milkshakes, Reading and learning, Radio dramas, Comics, Romance novels, Dogs",dislikes_en:"Samson's bluffing and gambling, Seeing innocents get hurt, Hair getting tangled, Being lied to, Side-effects of Samson's parasitism",characterAbility:{title_en:"FLASH BACK",description_en:"Back-dashing just before being HIT will allow Filia to EVADE an opponent's attack, avoiding all damage."},superiorAbility1:{title_en:"BLOODLETTING",description_en:`LEECH - 25% of the damage Filia inflicts is regained as HEALTH.

THE FIRST CUT - Every HIT has a 15% chance to convert all active BLEEDS to permanent BLEEDS.`},prestigeAbility:{title_en:"BOB AND WEAVE",description_en:`Filia charges this ability each time she HITS an attacking opponent or is HIT while attacking.

CHARGE RATE: 20% per HIT.

ACTIVATION EFFECT: Filia EVADES all projectiles while DASHING and has a 50% chance to inflict DEATH MARK for 5 seconds when HITTING an attacking opponent.`}},fukua:{playstyle_en:"Despite looking like Filia, Fukua focuses on medium-range, long-range, and high-damage attacks. She has phantom projections that steal her vitality and have various uses. She mixes safe long-range routine attacks with effective close-quarters rushes.",biography_en:`One of Brain Drain's less-socially-acceptable hobbies is cloning, and often he forces the souls of dead warriors to inhabit these clones. Fukua is the result of a fortunate - or unfortunate - Lab Zero accident: a union of two souls. One, a once-proud warrior known for her brute strength in close combat; the other a silent assassin who specialized in ranged weapons for her kills.

Together as one, Fukua possesses the best of both specialties... but relationships formed under intense circumstances often don't last.`,birthday_en:"Unknown",bloodType_en:"AB",height_en:`5' 4"`,weight_en:"142 lbs",likes_en:"Unknown",dislikes_en:"Unknown",characterAbility:{title_en:"SANGUINE SHADOWS",description_en:"All of the damage Fukua receives is inflicted as non-permanent SCRATCH DAMAGE."},superiorAbility1:{title_en:"UNTETHERED ENTITY",description_en:`SPECTRAL SPITE - Deal 1% bonus damage for every 5% HEALTH missing.

WRAITH'S WRATH - Reduce damage taken by 1% for every 5% HEALTH missing.`},prestigeAbility:{title_en:"DREAM EATER",description_en:`Fukua charges this ability each time she or the opponent uses a BLOCKBUSTER.

CHARGE RATE: 25% per BLOCKBUSTER.

ACTIVATION EFFECT: Fukua drains 5% of the opponent's BLOCKBUSTER METER and inflicts HEAL BLOCK for 5 seconds when using a BLOCKBUSTER.`}},marie:{playstyle_en:"Marie uses her skeletons in serial attacks to pressure adversaries along with Hilgard, her main ally. She is a very strong character for maintaining pressure, controlling the field, and can revive allies and prevent opponent resurrection.",biography_en:`Marie Korbel was Hilgard's orphanage's clumsiest, but most enthusiastic, self-appointed maid until raiders attacked her newfound family. Desperate, Marie wished on the Skull Heart for the power to protect those she loved. The wish was granted, but at a terrible cost. Marie awoke as a twisted being of destruction: The Skullgirl. With friends gone and home razed, Marie had nothing left but vengeance. Her fierce determination allowed her to keep her murderous rampage focused on the Medici Mafia, but every passing moment the Skull Heart pushed her to ever more severe acts of destruction.

Yet the impossible has happened. The Skull Heart has been destroyed while Marie herself has been spared. She is now a Skullgirl unchained, freed from the diabolical machinations of the Skull Heart's unseen masters. Marie is uncertain what to make of her new reality, but one thing is certain: She vows to be the last Skullgirl.`,birthday_en:"April 3",bloodType_en:"SG (formerly O)",height_en:`4' 9"`,weight_en:"94 lbs",likes_en:"Tidiness, Protecting the Innocent, Fond Memories, Apples, Jams and Jellies, Books, Patricia, Hilgard's orphanage, Rommelgrad, Justice",dislikes_en:"The Medici, War, Weapons, Criminals, Mice, The Anti-Skullgirl Project, The Skull Heart, Powerlessness, Suspicious Nun, Fragile Vases",characterAbility:{title_en:"REST AND RESURRECTION",description_en:"Hold down the REST AND RESURRECTION button to build a MORTUARY CHARGE. When charged, tap the button to REVIVE nearby defeated allies and INCINERATE nearby opponent corpses!"},superiorAbility1:{title_en:"CORPSE ARTISAN",description_en:`IMPROVED INCINERATION - Gain 25% BLOCKBUSTER METER and ENRAGE when INCINERATING a dead body.

REINFORCED REVIVAL - While Marie is alive, teammates gain permanent ARMOR and an additional 25% HEALTH when REVIVED.`},prestigeAbility:{title_en:"CALL OF THE GRAVE",description_en:`Marie charges this ability each time a BUFF or DEBUFF expires on either Fighter while she is TAGGED IN.

CHARGE RATE: 14% per BUFF or DEBUFF expiration.

ACTIVATION EFFECT: Marie inflicts QUIETUS for 10 seconds each time she uses a MORTUARY CHARGE.`}},"ms-fortune":{playstyle_en:"Ms. Fortune gains unparalleled area control by using her detachable head as an on-screen assist. If she prefers to remain whole, she attacks avidly with extremely fast punishing combos based on short-range rushes and high damage.",biography_en:`A feline feral, Nadia Fortune is the last surviving member of the Fishbone Gang, a notorious band of otherwise Dagonian thieves. Their last mission ended in tragedy: a failed attempt to steal the mysterious Life Gem from Lorenzo Medici resulted in their grisly deaths. Before meeting her own doom, Ms. Fortune swallowed the Life Gem and managed to digest it. The Gem's power permeated her entire body, making it truly undying... even after being cut into several pieces.

Now hiding in the shadows of Little Innsmouth, Ms. Fortune plots to avenge her fallen comrades.`,birthday_en:"November 24",bloodType_en:"B",height_en:`5' 8"`,weight_en:"127 lbs",likes_en:"Making friends, Sunlit naps, Volleyball, Bowling, Golf, Parkour, Subjecting others to terrible puns, Yu-Wan's restaurant, Dim Sum, The Fishbone Gang, Robbing from rich, Giving to poor, Potato chips",dislikes_en:"The Medici Mafia, Black Dahlia, Sushi, Cops, Bullies, Marsupials, Loud noises, Lemonade",characterAbility:{title_en:"HEAD GAMES",description_en:"Tap the HEAD GAMES button to enter HEADLESS MODE. Ms. Fortune's head can attack independent of her body. But be careful: Ms. Fortune will also suffer any additional damage inflicted to her head!"},superiorAbility1:{title_en:"I CAN HAS BUFF?",description_en:`MLEM - Gain REGEN for 20 seconds after every 10 seconds not suffering a HIT (includes blocked hits).

BOOP - Gain ENRAGE for 20 seconds after every 10 seconds not suffering a HIT (includes blocked hits).`},prestigeAbility:{title_en:"FUR AND BLUR",description_en:`Ms. Fortune charges this ability based on her MOVE SPEED.

CHARGE RATE: 1.5% of her MOVE SPEED.

ACTIVATION EFFECT: Ms. Fortune gains EVASION and inflicts GUARD BREAK for 5 seconds each every 10 seconds.`}},painwheel:{playstyle_en:"Painwheel has devastating charged attacks executed through the blade on her back. Focusing on her means dealing with her reflective damage and lethal counter-attacks where opponents hurt themselves and receive massive damage back; she is a character with low health but very high damage.",biography_en:`Once a normal schoolgirl named Carol, Painwheel was kidnapped by Valentine and delivered to the Anti-Skullgirls Labs' secretive Lab Zero. There she was implanted with the synthetic Buer Drive and Gae Bolga parasites and infused with experimental Skullgirl blood, transforming her into the monster she is today. Violent and unstable as a result of these experiments, as a precaution she's mentally controlled by Lab Zero's powerful psychic director, Brain Drain.

Fueled by rage, she draws her power from her pain and fury. Despite that, the soul of that scared young girl still lives on inside this monstrous body, desperately fighting off the onslaught of voices that would control her.`,birthday_en:"October 23",bloodType_en:"SG",height_en:`5' 1"`,weight_en:"375 lbs",likes_en:"Flowers, Gardening, Walking on the beach at sunset, Family, Sound of wind chimes, Dogs, Nostalgic memories, Friends, Magenta, Proper etiquette",dislikes_en:"ASG Labs, Valentine, Brain Drain, The Skullgirl, The Skull Heart, People, Her Body, Mind Control, Torture, Pain, Frustration, Gossip, Styrofoam sounds, Loud noises, Bad puns",characterAbility:{title_en:"FLIGHT RISK",description_en:"Tap the FLIGHT RISK button to hover in the air! Tap the button again to land. While flying, gain access to new actions by swiping and tapping."},superiorAbility1:{title_en:"TORTURED SOUL",description_en:`TAINTED BLOOD - When an opponent lands a CRITICAL HIT, 100% of the damage will be reflected back.

GRUDGE - When the opponent lands a CRITICAL HIT, gain ENRAGE for 20 seconds and ARMOR for 5 seconds.`},prestigeAbility:{title_en:"NOWHERE TO HIDE",description_en:`Painwheel charges this ability each time she or her opponent lands a CRITICAL HIT.

CHARGE RATE: 4% per CRITICAL HIT.

ACTIVATION EFFECT: Painwheel inflicts GUARD BREAK for 5 seconds when using a BLOCKBUSTER.`}},parasoul:{playstyle_en:"Parasoul uses the explosive tears of her Living Umbrella as traps to manage the field and amplify her damage. She combines sharp close-quarters skills with absolute screen control through her allied troops intervening, allowing her to extend combos with deadly precision attacks, whether at long or short range.",biography_en:`Few know the terrors of the Skullgirl as intimately as Parasoul does: seven years ago her own mother became the Skullgirl that nearly destroyed the world. This tragic past has made her fiercely protective of both her country and her family, and these two priorities frequently come into conflict.

Parasoul is now the crown princess of the Canopy Kingdom and leader of its elite military squad, the Black Egrets. Wielding the living umbrella, Krieg, she fights with grace, poise and cunning to defend her family honor and destroy the Skull Heart so no one can repeat her mother's terrible mistake.`,birthday_en:"December 22",bloodType_en:"A",height_en:`5' 10"`,weight_en:"156 lbs",likes_en:`Logic, Wine, Chess, Fencing, Training, Tennis, Diplomacy, Philosophy, Black Egret troops, Secretly watching 'Annie: Girl of the Stars," Her sister Umbrella`,dislikes_en:"Overly emotional people, Relying on others, Those who speak ill of her family, Injustice, The Medici Mafia, The Skullgirl, Her sister's antics",characterAbility:{title_en:"TEARFUL",description_en:"Certain attacks will now spawn a TEAR. Using a CHARGE ATTACK will detonate all active TEARS, damaging opponents caught in the blast."},superiorAbility1:{title_en:"HYPER-CRITICAL",description_en:`CRITICAL THINKING - Parasoul gains a 25% bonus to CRIT RATE per ACTIVE TEAR.

CRITICAL MASS - Parasoul gains a 20% bonus to CRIT DAMAGE per ACTIVE TEAR.`},prestigeAbility:{title_en:"DEADLY ACCURACY",description_en:`Parasoul charges this ability each time she spawns a TEAR.

CHARGE RATE: 12% per TEAR.

ACTIVATION EFFECT: Parasoul gains PRECISION every 2 second(s) while near a TEAR.`}},peacock:{playstyle_en:"Peacock is a very strong character for long-range field control, she can be very unpredictable and has a good arsenal. She has a strong field presence due to her ease in breaking defenses, applying combos, and pressuring safely.",biography_en:`Once a war orphan slave named Patricia, Peacock's body was gruesomely mutilated by slave traders that captured her. She was rescued by Dr. Avian's Anti-Skullgirls Labs, and rebuilt with a reality-defying arsenal of biomechanical weaponry: the Argus System augmented her body, and the Avery Unit gave her access to unprecedented weaponry.

Alas, they couldn't do anything for her mind: Peacock's damaged psyche and abiding love of cartoons shaped her new "toys" into a terrifying gang of cronies, who she has no qualms using to paint the town red... with blood. Terrifying as she is, she may be the kingdom's best bet against the Skullgirl.`,birthday_en:"November 13",bloodType_en:"B",height_en:`4' 6"`,weight_en:"94 lbs (Varies)",likes_en:'Cartoons, TV Show "Annie: Girl of the Stars," Movies, Violence, Junk food, Fast Cars, Explosives, Cigars, Being in charge',dislikes_en:"Weaklings, Bureaucracy, Authority figures, People, The Skull Heart, Nerds, Salad, Chopsticks",characterAbility:{title_en:"THE HOLE IDEA",description_en:"Tap THE HOLE IDEA button to vanish into a hole, avoiding some attacks. Tap elsewhere to emerge with a wallop! Otherwise, tap the button again or wait 2 seconds to exit without attacking."},superiorAbility1:{title_en:"TOONTIME",description_en:`SPECIAL FEATURE - When Peacock uses a SPECIAL MOVE, there is a 20% chance that the COOLDOWN will immediately reset.

CAST PARTY - When Peacock or any teammate uses a TAG IN, there is a 50% chance that the attack will be UNBLOCKABLE.`},prestigeAbility:{title_en:"MANIC MUNITIONS",description_en:`Peacock charges this ability each time she or the opponent is damaged by a PROJECTILE.

CHARGE RATE: 3% per PROJECTILE.

ACTIVATION EFFECT: Peacock has a 25% chance to gain 1 stack of ENRAGE for 5 seconds, HASTE for 5 seconds, or PRECISION when using a SPECIAL MOVE.`}},"robo-fortune":{playstyle_en:"With powerful laser beams, Robo-Fortune is a long-range specialist, using combos that punish opponents from afar and from the air. Besides having a robust arsenal for combos and attacks at different ranges, she has good abilities and is difficult to punish, making her a persistent threat.",biography_en:`Robo-Fortune is the creation of Brain Drain, the psychic director of ASG Lab Zero, and stands as a testament to her maniacal creator's unmatched pride and petulance. Built to demonstrate loyalty and cunning, Robo-Fortune fails to deliver either to any measurable degree. Employing cutting-edge technology, she sets out to hunt down the Skullgirl, and to engage in easily avoidable conflicts.

Is the ASG Project's latest creation the ultimate cybernetic soldier? Have Brain Drain's mechanical machinations set the world on a treacherous path? Is Robo-Fortune's faulty programming more of a feature than a bug? Has science gone too far?!`,birthday_en:"January 31",bloodType_en:"10W-30 Synthetic Oil",height_en:`5' 6"`,weight_en:"440 lbs",likes_en:"Honey pots, Integers less than or equal to 1, Books about dragons, NAND gates, 0x5f3759df, Unrolled loops of strings, Mice, Rebeccapurple, IEEE (except after C!), Setplay",dislikes_en:"Disorder, Incompatible file formats, DES, Unsalted passwords (salted tastes better!), Bleeding hearts, Weakly-typed languages, vi, Fonts that make O and 0 look too similar, Checkins without comments, Moire patterns",characterAbility:{title_en:"HEADRONE HARDWARE",description_en:"Tap the LAUNCH button to launch HEADRONES. Use HEADRONES to ram enemies, set proximity mines, and fire a barrage of missiles!"},superiorAbility1:{title_en:"NETWORK PROTOCOL",description_en:`DDOS - Inflict POWER SURGE for 15 seconds after every 2 seconds while near the opponent.

PING CHECK - Gain ENRAGE for 15 seconds after every 2 seconds while far away from the opponent.`},prestigeAbility:{title_en:"GEIGER COUNTER",description_en:`Robo-Fortune charges this ability each time she gains a BUFF or inflicts a DEBUFF.

CHARGE RATE: 7% per BUFF or DEBUFF.

ACTIVATION EFFECT: Robo-Fortune gains 5 stacks of PRECISION and reflects 5% of the damage she takes for every BUFF on her or the opponent (max 100%).`}},squigly:{playstyle_en:"Squigly needs to patiently charge her abilities through Leviathan, her companion who helps improve the effectiveness of moves and enhances the damage flow to perform better in different situations; a very versatile and fun character for effective combos.",biography_en:`Squigly is the last "surviving" member of the Contiello family, a long lineage of opera singers and among the Medicis’ most valued clients. Fourteen years ago, Squigly's mother Selene obtained the Skull Heart, resulting in Lorenzo Medici ordering an attack on the Contiello family. Fraught with despair, Selene became the Skullgirl and revived her family as an undead army. What spared Squigly from becoming a mindless minion was the intervention of the Parasite Leviathan, the Contiello family's friend and guardian.

The battle between the Skullgirl and Lorenzo threatened to spread across New Meridian if not for Squigly and the intervention of the ASG. With the Skullgirl's defeat, the power that animated Squigly faded, putting her to rest. Lorenzo generously paid for the Contiellos' funeral and has not had conflicts with the Medicis’ other clients since.

Fourteen years later, Bloody Marie's emergence has stirred Squigly from her long slumber...`,birthday_en:"November 2",bloodType_en:"Embalmed (formerly A-)",height_en:`5' 3"`,weight_en:"118 lbs",likes_en:"Leviathan, Her family, Tradition, Reading up on current events, Animals (particularly birds and snakes), Music, Singing, Noodles, Cream soda, Cake, Burgers, Gardening, The smell of incense, Bubble baths, Not being dead",dislikes_en:"The Medici, Black Dahlia, Double, The Skull Heart, Rude people, Dishonesty, Not taking karaoke seriously, Thunderstorms, Being dead",characterAbility:{title_en:"WYRM'S TAIL",description_en:"Holding down the WYRM'S TAIL button will store up to 2 DRAGON CHARGES. DRAGON CHARGES are consumed to make certain attacks more powerful!"},superiorAbility1:{title_en:"FRIGHT NIGHT",description_en:`EVIL DEAD - While enemies are nearby Squigly's dead body, teammates’ HITS inflict CURSE and WITHER for 15 seconds.

DEAD ALIVE - While teammates are near Squigly's dead body, suffering a HIT will grant them FINAL STAND for 15 seconds.`},prestigeAbility:{title_en:"STAY TOMBED",description_en:`Squigly charges this ability each time she gains or uses a DRAGON CHARGE.

CHARGE RATE: 12% per DRAGON CHARGE gained or used.

ACTIVATION EFFECT: Any currently defeated opponents can no longer be revived and Squigly gains a DRAGON CHARGE every 2 seconds while near a dead body.`}},umbrella:{playstyle_en:"Umbrella's gameplay revolves around Hungern's (Umbrella) hunger meter. With a full meter (stuffed), the character becomes slow, deals more damage, and facilitates some interactions. Half meter (satiated) is her normal stage. Empty meter (hungry) she becomes faster, but her damage decreases.",biography_en:`The youngest princess of the Canopy Kingdom, Umbrella is rarely seen outside the halls of the royal palace in Canopolis. She has grown up sheltered, with her only true friend being a family heirloom: the Living Weapon Hungern. Together, they fight evil and kick butt in the name of justice, just like Umbrella's big sister: Parasoul! Or at least they would if Parasoul would let them out of the palace!

The rise of a new Skullgirl may just give Umbrella the adventure she wants. But, when she finds out the truths about herself and her family, will she wish she had stayed home?`,birthday_en:"July 17",bloodType_en:"O(?)",height_en:`3' 10"`,weight_en:"60 lbs",likes_en:"Her sister Parasoul (most of the time), Hungern, Ice cream, Drawing, TV, Amphibians, Scary B Movies, Rainy days, Pro wrestling, Justice!, Hungern's origami",dislikes_en:"Her sister Parasoul (the rest of the time), Home Schooling, Annie of The Stars TV Show, Stuffy fancy dresses, Fois Gras, Getting caught, Egret Operation S.I.T.T.E.R.S., The Princess Wave, Skinned knees, Crying over spilled milk",characterAbility:{title_en:"HUNGERN'S HUNGER",description_en:"Unlocks Hungern's Hunger Meter. THROWS fill the meter and BUBBLE-based moves (including tapping the meter button) empty it. Basic attacks deal more damage while OVERSTUFFED and are faster while HUNGRY. Certain moves are empowered by Hungern's state!"},superiorAbility1:{title_en:"JAWS OF DEFEAT",description_en:`SWEET VICTORY - Gain 2 stacks of ENRAGE for 15 seconds when defeating an opponent.

BITTER END - Once per match, gain FINAL STAND and HEAVY REGEN for 15 seconds each when falling below 25% HEALTH.`},prestigeAbility:{title_en:"GUT REACTION",description_en:`Umbrella charges this ability each time she gains or loses HUNGER.

CHARGE RATE: 1% per 1% HUNGER gained or lost.

ACTIVATION EFFECT: Umbrella gains 5% HEALTH and inflicts SLIME for 10 seconds when HITTING an attacking opponent.`}},valentine:{playstyle_en:"The ninja nurse mixes medical tools to poison opponents or revive defeated allies. A very useful support character, she has reasonable damage, with effective moves to inflict effects, simple combos and more. Her main role is to heal, revive allies, and incapacitate opponents when needed.",biography_en:`Valentine is the only survivor of the Last Hope, a group of special Anti-Skullgirl Lab operatives. Before meeting their end at the hands of the Skullgirl, the Last Hope worked for the mysterious Lab Zero and performed duties ranging from reconnaissance and sabotage to advanced research.

Now Valentine dutifully serves the Skullgirl, carrying out her will from the shadows. She keeps to herself, so much of her true nature and personality are unknown.`,birthday_en:"December 25",bloodType_en:"A",height_en:"6'",weight_en:"160 lbs",likes_en:"Alcohol, The Scientific Method, Studying things from afar, Snakes, Wolves, Classical music, Punctuality, Careful planning, Taking things apart, News and non-fiction reading, Mind games, Chess, Acoustic guitar, Meat, Eastern culture, Dark chocolate",dislikes_en:"Needless formality, Sentimentality, Weak people, Cooking, Bedside manner, Brain Drain, Back pain, Candy",characterAbility:{title_en:"SIPHON",description_en:"More of the damage Valentine receives is inflicted as non-permanent SCRATCH DAMAGE. 75% of the damage Valentine deals is regained as HEALTH, but only up to her current SCRATCH DAMAGE threshold."},superiorAbility1:{title_en:"COMBAT CLINIC",description_en:`TRAUMA CENTER - While Valentine is alive, teammates gain FINAL STAND for 15 seconds when suffering a HIT that deals more than 10% HEALTH.

ICU - Valentine gains HEAVY REGEN for 20 seconds when suffering a DEBUFF.`},prestigeAbility:{title_en:"REANIMATOR",description_en:`Valentine charges this ability each time she recovers HEALTH when TAGGING IN.

CHARGE RATE: 4% for each 1% HEALTH recovered.

ACTIVATION EFFECT: All defeated teammates are REVIVED with 10% HEALTH and Valentine continuously gains 0.75% HEALTH per second.`}}};function et(e){var o,s,n,r,l,c,d,p;const a=Ao[e];if(!a)return null;if(y()==="en"){const u=vo[e];if(u)return{...a,playstyle:u.playstyle_en||a.playstyle,biography:u.biography_en||a.biography,birthday:u.birthday_en||a.birthday,bloodType:u.bloodType_en||a.bloodType,likes:u.likes_en||a.likes,dislikes:u.dislikes_en||a.dislikes,characterAbility:a.characterAbility?{...a.characterAbility,title:((o=u.characterAbility)==null?void 0:o.title_en)||a.characterAbility.title,description:((s=u.characterAbility)==null?void 0:s.description_en)||a.characterAbility.description}:void 0,superiorAbility1:a.superiorAbility1?{...a.superiorAbility1,title:((n=u.superiorAbility1)==null?void 0:n.title_en)||a.superiorAbility1.title,description:((r=u.superiorAbility1)==null?void 0:r.description_en)||a.superiorAbility1.description}:void 0,superiorAbility2:a.superiorAbility2?{...a.superiorAbility2,title:((l=u.superiorAbility2)==null?void 0:l.title_en)||a.superiorAbility2.title,description:((c=u.superiorAbility2)==null?void 0:c.description_en)||a.superiorAbility2.description}:void 0,prestigeAbility:a.prestigeAbility?{...a.prestigeAbility,title:((d=u.prestigeAbility)==null?void 0:d.title_en)||a.prestigeAbility.title,description:((p=u.prestigeAbility)==null?void 0:p.description_en)||a.prestigeAbility.description}:void 0}}return a}function ei(e,a){return!!at(e,a)}function at(e,a){const t=ji();return t&&t[e]&&t[e][a]?t[e][a]:null}function yo(e,a,t=0){var ge,fe,be,he,Ee,Ae;const s=we()[e.element]||{class:"neutral",iconPath:"img/official/ElementalFireBackless.webp",statIcon:"img/official/ElementalIconNeutral.webp"};let n=ie(a,e.name);n.includes("_Icon.webp")&&((ge=e.images)!=null&&ge.portrait_url)&&(n=e.images.portrait_url);const r=((fe=e.signature_ability)==null?void 0:fe.description)||i("variant.noDescription"),l=Vt(e.name,r),c=Q(l,e.name),d=Ya(e.recommended_arsenal||"",a),p=e.rarityKey||"diamante",u=Ze(p),m=yi[p]||"",f=Zi(e.name).map(w=>{const G=$[w.key];if(!G)return"";let q=w.localized;return q.toLowerCase()==="suporte de utilidade"&&(q="Suporte"),`
      <div class="variant-class-wrapper">
        <span class="variant-class-label">${i("variant.class")}</span>
        <span class="variant-class-tag attr-highlight" data-attr-key="class_${w.key}" style="--class-color: ${G.color}">
          <img src="${G.icon}" alt="${w.localized}">
          <span class="class-name-text">${q.toUpperCase()}</span>
        </span>
      </div>
    `}).join(""),h=`variant-${a}-${t}`;let S=e.builds?[...e.builds].sort((w,G)=>{const q=w.title.toLowerCase().includes("ataque")||w.title.toLowerCase().includes("attack"),ve=G.title.toLowerCase().includes("ataque")||G.title.toLowerCase().includes("attack");return q&&!ve?-1:ve&&!q?1:0}):null;const T=e.recommended_build||"",C=!!(S||T||d||e.marquee_ability),_=((be=e.signature_ability)==null?void 0:be.name)||i("variant.specialAbility"),B=qt(e.name,_),P=Pe(e.name),R=P?`<img loading="lazy" src="img/official/new_icon_U.webp" alt="${i("variant.new")}" class="new-badge">`:"",E=Eo(e.name),D=`exclusive-${a}-${t}`,k=E?`
        <div class="exclusive-badge ${P?"shifted":""}" onclick="document.getElementById('${D}').classList.add('active')">
            <img loading="lazy" src="${E.icon}" alt="${i("variant.exclusive")}" class="exclusive-icon"
                 onerror="this.style.display='none'">
        </div>
        <div class="exclusive-overlay" id="${D}" onclick="this.classList.remove('active')">
            <div class="exclusive-overlay-content" onclick="event.stopPropagation()">
                <img loading="lazy" src="${E.icon}" alt="${i("variant.exclusive")}" class="exclusive-overlay-icon"
                     onerror="this.style.display='none'">
                <span class="exclusive-overlay-label">${i("variant.exclusive")}</span>
                <span class="exclusive-overlay-source">${E.source}</span>
                <button class="exclusive-overlay-close" onclick="document.getElementById('${D}').classList.remove('active')">✕</button>
            </div>
        </div>
    `:"",I=O(e.element).toUpperCase(),U=e._charKey||a,te=na[U]||"var(--accent-gold)",Y=U.charAt(0).toUpperCase()+U.slice(1),Ce=`
        <span class="variant-char-subtitle">${e._charName||Y}</span>
    `,Ie=(w,G=!1)=>{const q=Ya(w.recommended_arsenal||"",a);return`
            <div class="build-sub-content ${G?"active":""}" data-build-idx="${e.name}-${w.title}">
                ${w.marquee_ability?`
                    <div class="ability-box marquee">
                        <div class="marquee-header" 
                             style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; cursor: pointer;"
                             onclick="showMarqueeDisclaimer('${a}', '${w.marquee_ability}')">
                            <h4 style="margin: 0; display: flex; align-items: center; gap: 8px;">
                                ${i("variant.recommendedMarquee")}
                                <i class="fas fa-info-circle" style="font-size: 0.8rem; opacity: 0.7;"></i>
                            </h4>
                        </div>
                        <p style="color: #fff; font-weight: 500; font-size: 0.9rem;">${Q(w.marquee_ability)}</p>
                    </div>
                `:""}
                
                ${w.recommended_build?`
                    <div class="ability-box build">
                        <h4>${i("variant.recommendedBuild")}</h4>
                        <p>${Xa(w.recommended_build)}</p>
                    </div>
                `:""}
                
                ${q?`
                    <div class="ability-box arsenal">
                        <h4>${i("variant.recommendedArsenal")}</h4>
                        <div class="arsenal-list">${q}</div>
                    </div>
                `:""}
            </div>
        `};return`
        <div class="variant-card ${p} animate-in" style="animation-delay: ${t*.05}s; --char-accent: ${te}" data-variant-name="${e.name}">
            ${R}
            ${k}
            <div class="variant-left-section">
                <img src="${n}" alt="${z(e.name)}" class="variant-portrait" loading="lazy"
                     onerror="this.src='img/official/Annie_Icon.webp'">
                <div class="variant-classes-display desktop-classes">
                    ${f}
                </div>
            </div>
            <div class="variant-info">
                <div class="variant-header">
                    <h3>${z(e.name)}</h3>
                    ${Ce}
                    <div class="variant-classes-display mobile-classes">
                        ${f}
                    </div>
                    <div class="variant-meta">
                        <span class="element-badge ${s.class}">
                            <img loading="lazy" src="${s.iconPath}" alt="${I}">
                            ${I}
                        </span>
                        <span class="rarity-badge ${p}">
                            ${m?`<img loading="lazy" src="${m}" alt="${u}" class="rarity-icon">`:""}
                            ${u}
                        </span>
                    </div>
                </div>
                
                <div class="variant-stats">
                    <div class="stat-item">
                        <img loading="lazy" src="img/official/AttackIcon.webp" alt="${i("variant.attack")}" class="stat-icon">
                        <span class="label">${i("variant.attack")}</span>
                        <span class="value">${((he=e.stats)==null?void 0:he.attack)||"-"}</span>
                    </div>
                    <div class="stat-item">
                        <img loading="lazy" src="img/official/HealthIcon.webp" alt="${i("variant.health")}" class="stat-icon">
                        <span class="label">${i("variant.health")}</span>
                        <span class="value">${((Ee=e.stats)==null?void 0:Ee.health)||"-"}</span>
                    </div>
                    <div class="stat-item">
                        <img loading="lazy" src="${s.statIcon}" alt="${I}" class="stat-icon">
                        <span class="label">${i("variant.power")}</span>
                        <span class="value">${((Ae=e.stats)==null?void 0:Ae.power)||"-"}</span>
                    </div>
                </div>
                
                <!-- Tab Navigation -->
                <div class="variant-tabs">
                    <button class="variant-tab-btn active" data-tab="habilidade" data-card="${h}">
                        ${i("variant.ability")}
                    </button>
                    ${C?`
                        <button class="variant-tab-btn" data-tab="build" data-card="${h}">
                            ${i("variant.build")}
                        </button>
                    `:""}
                    ${ei(a,e.name)?`
                        <button class="variant-tab-btn extras-tab-btn" data-tab="extras" data-card="${h}">
                            ⭐ ${i("variant.information")}
                        </button>
                    `:""}
                </div>
                
                <div class="variant-tab-contents" id="${h}-contents">
                    <!-- Habilidade Tab (Signature Only) -->
                    <div class="variant-tab-content active" data-tab="habilidade">
                        <div class="ability-box">
                            <h4 style="margin-bottom: 8px;">
                                <span style="color: var(--accent-gold)">${i("variant.signatureAbility")}:</span>
                                <span style="color: #fff; margin-left: 6px;">${B.toUpperCase()}</span>
                            </h4>
                            <div style="height: 1px; background: rgba(255,255,255,0.1); margin: 12px 0;"></div>
                            <p style="margin-bottom: 16px;">${c}</p>
                        </div>
                    </div>
                    
                    <!-- Build Tab (Build + Arsenal) -->
                    ${C?`
                        <div class="variant-tab-content" data-tab="build">
                            ${S?`
                                <div class="build-selector">
                                    ${S.map((w,G)=>`
                                        <button class="build-pill ${G===0?"active":""}" 
                                                onclick="switchVariantBuild(this, '${e.name}-${w.title}')">
                                            ${w.title.toUpperCase()}
                                        </button>
                                    `).join("")}
                                </div>
                                <div class="build-contents-wrapper">
                                    ${S.map((w,G)=>Ie(w,G===0)).join("")}
                                </div>
                            `:`
                                <div class="variant-classes-display empty-classes"></div>
                                ${e.marquee_ability?`
                                    <div class="ability-box marquee">
                                    <div class="marquee-header" 
                                         style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; cursor: pointer;"
                                         onclick="showMarqueeDisclaimer('${a}', '${e.marquee_ability}')">
                                        <h4 style="margin: 0; display: flex; align-items: center; gap: 8px;">
                                            ${i("variant.recommendedMarquee")}
                                            <i class="fas fa-info-circle" style="font-size: 0.8rem; opacity: 0.7;"></i>
                                        </h4>
                                    </div>
                                        <p style="color: #fff; font-weight: 500; font-size: 0.9rem;">${Q(e.marquee_ability)}</p>
                                    </div>
                                `:""}
                                ${T?`
                                    <div class="ability-box build">
                                        <h4>${i("variant.recommendedBuild")}</h4>
                                        <p>${Xa(T)}</p>
                                    </div>
                                `:""}
                                
                                ${d?`
                                    <div class="ability-box arsenal">
                                        <h4>${i("variant.recommendedArsenal")}</h4>
                                        <div class="arsenal-list">${d}</div>
                                    </div>
                                `:""}
                            `}
                        </div>
                    `:""}

                    <!-- Extras Tab -->
                    ${ei(a,e.name)?`
                        <div class="variant-tab-content" data-tab="extras">
                            ${Ro(a,e)}
                        </div>
                    `:""}
                </div>
            </div>
        </div>
      `}function Ro(e,a){var l,c;const t=at(e,a.name);if(!t)return'<p class="profile-empty">Sem extras disponíveis.</p>';const o=`extras-${e}-${a.name.replace(/\s+/g,"-")}`,s=!!t.batalhas_gerais,n=!!((l=t.guildas)!=null&&l.available&&((c=t.guildas.bosses)==null?void 0:c.length)>0),r=!!t.batalhas_fenda;return`
        <div class="extras-container" id="${o}">
            <div class="extras-sub-tabs">
                ${s?`<button class="extras-sub-pill active" onclick="switchExtrasSubTab('${o}', 'gerais')">Batalhas Gerais</button>`:""}
                ${n?`<button class="extras-sub-pill" onclick="switchExtrasSubTab('${o}', 'guildas')">Guildas</button>`:""}
                ${r?`<button class="extras-sub-pill" onclick="switchExtrasSubTab('${o}', 'fenda')">Batalhas da Fenda</button>`:""}
            </div>

            <div class="extras-sub-contents">
                ${s?`
                    <div class="extras-sub-content active" data-extras-tab="gerais">
                        ${Oo(t.batalhas_gerais,e)}
                    </div>
                `:""}
                ${n?`
                    <div class="extras-sub-content" data-extras-tab="guildas">
                        ${So(t.guildas)}
                    </div>
                `:""}
                ${r?`
                    <div class="extras-sub-content" data-extras-tab="fenda">
                        ${To(t.batalhas_fenda,e)}
                    </div>
                `:""}
            </div>
        </div>
    `}function it(e,a){var o;const t=se[e];if(!t)return"";for(const[s,n]of Object.entries(t))if(s.toLowerCase()===a.toLowerCase())return((o=n.image)==null?void 0:o.image)||"";return""}function tt(e){const a=ie(e.character,e.variant),o=(de(e.variant)||[])[0],s=o?$[o]:null;return`
        <div class="extras-team-card ${e.is_current?"is-current":""}">
            <img loading="lazy" src="${a}" alt="${e.variant}" class="extras-team-img"
                 onerror="this.onerror=null; this.src='img/official/Annie_Icon.webp'">
            <div class="extras-team-info">
                <span class="extras-team-name">${e.variant}</span>
                ${s?`
                <span class="extras-team-class" style="color: ${s.color}; font-family: 'Inter', sans-serif; font-size: 0.65rem; font-weight: 700; text-transform: uppercase; display: flex; align-items: center; gap: 4px; margin-top: 2px;">
                    <img src="${s.icon}" alt="${o}" style="width: 12px; height: 12px; filter: drop-shadow(0 0 2px rgba(0,0,0,0.5));">
                    ${o}
                </span>`:""}
            </div>
            ${e.is_current?'<span class="extras-current-badge">ATUAL</span>':""}
        </div>
    `}function wo(e){const a=ie(e.character,e.variant),t=de(e.variant)||[],o=e.class||t[0],s=o?$[o]:null;return`
        <div class="extras-ally-card">
            <img loading="lazy" src="${a}" alt="${e.variant}" class="extras-ally-img"
                 onerror="this.onerror=null; this.src='img/official/Annie_Icon.webp'">
            <div class="extras-ally-info">
                <span class="extras-ally-name">${e.variant}</span>
                ${s?`
                <span class="extras-ally-class" style="color: ${s.color}; display: flex; align-items: center; gap: 4px;">
                    <img src="${s.icon}" alt="${o}" style="width: 12px; height: 12px; filter: drop-shadow(0 0 2px rgba(0,0,0,0.5));">
                    ${o}
                </span>`:""}
            </div>
        </div>
    `}function ai(e){return`
        <div class="extras-matchup-card">
            <img loading="lazy" src="${ie(e.character,e.variant)}" alt="${e.variant}" class="extras-matchup-img"
                 onerror="this.onerror=null; this.src='img/official/Annie_Icon.webp'">
            <div class="extras-matchup-info">
                <span class="extras-matchup-name" style="color: white;">${e.variant}</span>
                ${e.reason?`<p class="extras-matchup-reason">${e.reason}</p>`:""}
            </div>
        </div>
    `}function Oo(e,a){var o,s,n;let t="";return((o=e.time_recomendado)==null?void 0:o.length)>0&&(t+=`
            <div class="extras-section">
                <h4 class="extras-section-title">
                    👥 TIME RECOMENDADO
                </h4>
                <div class="extras-team-grid">
                    ${e.time_recomendado.map(r=>tt(r)).join("")}
                </div>
            </div>
        `),((s=e.aliados_recomendados)==null?void 0:s.length)>0&&(t+=`
            <div class="extras-section">
                <div class="extras-section-header" onclick="toggleExtrasSection(this)">
                    <h4 class="extras-section-title">
                        🤝 ALIADOS RECOMENDADOS
                    </h4>
                    <span class="extras-toggle-icon">▼</span>
                </div>
                <div class="extras-section-body">
                    <div class="extras-allies-grid">
                        ${e.aliados_recomendados.map(r=>wo(r)).join("")}
                    </div>
                </div>
            </div>
        `),((n=e.golpes_extras)==null?void 0:n.length)>0&&(t+=`
            <div class="extras-section">
                <div class="extras-section-header" onclick="toggleExtrasSection(this)">
                    <h4 class="extras-section-title">
                        🥊 GOLPES EXTRAS
                    </h4>
                    <span class="extras-toggle-icon">▼</span>
                </div>
                <div class="extras-section-body">
                    <div class="extras-moves-grid">
                        ${e.golpes_extras.map(r=>{const l=it(a,r.name);return`
                                <div class="extras-move-card">
                                    ${l?`<img loading="lazy" src="${l}" alt="${r.name}" class="extras-move-img" onerror="this.style.display='none'">`:""}
                                    <div class="extras-move-info">
                                        <span class="extras-move-name">${r.name}</span>
                                        <p class="extras-move-reason">${r.reason}</p>
                                    </div>
                                </div>
                            `}).join("")}
                    </div>
                </div>
            </div>
        `),t||'<p class="profile-empty">Nenhuma informação disponível.</p>'}function So(e,a){return!e.bosses||e.bosses.length===0?'<p class="profile-empty">Nenhuma recomendação para guildas.</p>':e.bosses.map(t=>{var o;return`
        <div class="extras-boss-section">
            <div class="extras-boss-header">
                <div class="extras-boss-icon-wrapper">
                    <img src="${t.icon||"img/official/SkullModifierIcon.webp"}" alt="${t.boss_name}" class="extras-boss-icon">
                </div>
                <div class="extras-boss-names">
                    <span class="extras-boss-name">${t.boss_name}</span>
                    <span class="extras-boss-name-en">${t.boss_character||t.boss_name_en}</span>
                </div>
            </div>

            ${((o=t.team)==null?void 0:o.length)>0?`
                <div class="extras-section">
                    <h4 class="extras-section-title mini">
                        👥 TIME SUGERIDO
                    </h4>
                    <div class="extras-team-grid">
                        ${t.team.map(s=>tt(s)).join("")}
                    </div>
                </div>
            `:""}
        </div>
    `}).join('<div class="extras-boss-divider"></div>')}function To(e,a){var s,n,r,l;let t="";const o=e.defesa;return o&&(((s=o.boa_contra)==null?void 0:s.length)>0&&(t+=`
                <div class="extras-section">
                    <h4 class="extras-section-title">
                        🛡️ SE DÁ BEM CONTRA (DEFESA)
                    </h4>
                    <div class="extras-matchups-grid">
                        ${o.boa_contra.map(c=>ai(c)).join("")}
                    </div>
                </div>
            `),((n=o.ruim_contra)==null?void 0:n.length)>0&&(t+=`
                <div class="extras-section">
                    <h4 class="extras-section-title">
                        ⚠️ DIFICULDADE CONTRA
                    </h4>
                    <div class="extras-matchups-grid">
                        ${o.ruim_contra.map(c=>ai(c)).join("")}
                    </div>
                </div>
            `),((r=o.catalisadores_dificeis)==null?void 0:r.length)>0&&(t+=`
                <div class="extras-section">
                    <h4 class="extras-section-title">
                        🧪 CATALISADORES DIFÍCEIS
                    </h4>
                    <div class="extras-catalyst-tags">
                        ${o.catalisadores_dificeis.map(c=>`<span class="catalyst-tag" style="cursor: pointer;" onclick="showCatalystDisclaimer('${c}')">${c}</span>`).join("")}
                    </div>
                </div>
            `)),((l=e.golpes_extras)==null?void 0:l.length)>0&&(t+=`
            <div class="extras-section">
                <div class="extras-section-header" onclick="toggleExtrasSection(this)">
                    <h4 class="extras-section-title">
                        🥊 GOLPES EXTRAS PARA FENDA
                    </h4>
                    <span class="extras-toggle-icon">▼</span>
                </div>
                <div class="extras-section-body">
                    <div class="extras-moves-grid">
                        ${e.golpes_extras.map(c=>{const d=it(a,c.name);return`
                                <div class="extras-move-card">
                                    ${d?`<img loading="lazy" src="${d}" alt="${c.name}" class="extras-move-img" onerror="this.style.display='none'">`:""}
                                    <div class="extras-move-info">
                                        <span class="extras-move-name">${c.name}</span>
                                        <p class="extras-move-reason">${c.reason}</p>
                                    </div>
                                </div>
                            `}).join("")}
                    </div>
                </div>
            </div>
        `),t||'<p class="profile-empty">Nenhuma informação de fenda disponível.</p>'}window.switchVariantBuild=function(e,a){const t=e.closest(".variant-tab-content");t&&(t.querySelectorAll(".build-pill").forEach(o=>o.classList.toggle("active",o===e)),t.querySelectorAll(".build-sub-content").forEach(o=>{o.classList.toggle("active",o.dataset.buildIdx===a)}))};function Co(e,a,t){const o=document.getElementById(e);if(o){if(!a||a.length===0){o.innerHTML=`<p style="color: var(--text-muted); padding: 20px;">${i("variant.noVariants")}</p>`;return}o.innerHTML=a.map((s,n)=>{const r=s._charKey||t;return yo(s,r,n)}).join(""),o.querySelectorAll(".variant-tab-btn").forEach(s=>{s.addEventListener("click",function(){const n=this.dataset.card,r=this.dataset.tab;Io(n,r)})})}}function Io(e,a){const t=document.getElementById(`${e}-contents`);if(!t)return;const o=t.closest(".variant-card");o&&o.querySelectorAll(".variant-tab-btn").forEach(s=>{const n=s.dataset.tab===a;s.classList.toggle("active",n)}),t.querySelectorAll(".variant-tab-content").forEach(s=>{const n=s.dataset.tab===a;s.classList.toggle("active",n)})}let ii=null,J=[],Oe="";function ca(){return`
        <div class="search-bar-container" id="search-bar-container">
            <div class="search-input-wrapper">
                <img loading="lazy" src="img/official/Search.webp" alt="${i("characters.searchPlaceholder")}" class="search-icon"
                     onerror="this.style.display='none'">
                <input type="text" id="variant-search-input" class="variant-search-input"
                       placeholder="${i("characters.searchPlaceholder")}"
                       oninput="handleSearchInput(this.value)"
                       onfocus="handleSearchFocus()"
                       autocomplete="off" spellcheck="false">
                <button class="search-clear-btn" id="search-clear-btn" onclick="handleSearchClear()" title="${i("filter.clear")}">✕</button>
            </div>
            <div class="search-results-dropdown" id="search-results-dropdown"></div>
        </div>
    `}function da(){var f,h,S,T,C,_,B,P;const e=[],a=[];for(const[R,E]of Object.entries(ae))E.icon&&(E.type==="buff"||E.type==="buff-term")&&e.push({key:R,...E}),E.icon&&(E.type==="debuff"||E.type==="debuff-term")&&a.push({key:R,...E});const t=(R,E)=>{const D=y();return R.map(k=>{const I=D==="en"&&k.name_en?k.name_en:k.name;return I.split(" ")[0].split("/")[0],`
            <button class="filter-btn effect-btn ${E?"buff":"debuff"}" 
                data-effect-key="${k.key}" 
                onclick="handleFilterClick('efeitos', '${k.key}')" 
                title="${I}">
                <img loading="lazy" src="${k.icon}" alt="${I}">
                <span class="effect-label">${I}</span>
            </button>
        `}).join("")},o=i("filter.score").toUpperCase(),s=i("filter.atk").toUpperCase(),n=i("filter.hp").toUpperCase(),r=i("filter.alpha").toUpperCase(),l=i("filter.element").toUpperCase(),c=i("filter.category").toUpperCase(),d=`
        <div class="filter-grid rarity-grid">
            <button class="filter-btn rarity-btn" data-rarity="bronze" onclick="handleFilterClick('rarity', 'bronze')" title="${i("rarity.bronze")}"><img loading="lazy" src="img/official/icone_bronze.webp" alt="${i("rarity.bronze")}"></button>
            <button class="filter-btn rarity-btn" data-rarity="prata" onclick="handleFilterClick('rarity', 'prata')" title="${i("rarity.silver")}"><img loading="lazy" src="img/official/icone_prata.webp" alt="${i("rarity.silver")}"></button>
            <button class="filter-btn rarity-btn" data-rarity="ouro" onclick="handleFilterClick('rarity', 'ouro')" title="${i("rarity.gold")}"><img loading="lazy" src="img/official/icone_ouro.webp" alt="${i("rarity.gold")}"></button>
            <button class="filter-btn rarity-btn" data-rarity="diamante" onclick="handleFilterClick('rarity', 'diamante')" title="${i("rarity.diamond")}"><img loading="lazy" src="img/official/icone_diamante.webp" alt="${i("rarity.diamond")}"></button>
        </div>`,p=`
        <div class="filter-grid element-grid">
            <button class="filter-btn element-btn" data-element="fogo" onclick="handleFilterClick('element', 'fogo')" title="${i("element.fire")}"><img loading="lazy" src="img/official/ElementalFireBackless.webp" alt="${i("element.fire")}"></button>
            <button class="filter-btn element-btn" data-element="agua" onclick="handleFilterClick('element', 'agua')" title="${i("element.water")}"><img loading="lazy" src="img/official/ElementalWaterBackless.webp" alt="${i("element.water")}"></button>
            <button class="filter-btn element-btn" data-element="ar" onclick="handleFilterClick('element', 'ar')" title="${i("element.wind")}"><img loading="lazy" src="img/official/ElementalWindBackless.webp" alt="${i("element.wind")}"></button>
            <button class="filter-btn element-btn" data-element="luz" onclick="handleFilterClick('element', 'luz')" title="${i("element.light")}"><img loading="lazy" src="img/official/ElementalLightBackless.webp" alt="${i("element.light")}"></button>
            <button class="filter-btn element-btn" data-element="trevas" onclick="handleFilterClick('element', 'trevas')" title="${i("element.dark")}"><img loading="lazy" src="img/official/ElementalDarkBackless.webp" alt="${i("element.dark")}"></button>
            <button class="filter-btn element-btn" data-element="neutro" onclick="handleFilterClick('element', 'neutro')" title="${i("element.neutral")}"><img loading="lazy" src="img/official/ElementalNeutralBackless.webp" alt="${i("element.neutral")}"></button>
        </div>`,u=`
        <div class="filter-section center" style="margin: 0 auto; display: flex; align-items: center; gap: 12px;">
            <div class="sort-header">
                <img loading="lazy" src="img/official/icon_sort.webp" onerror="this.style.display='none'" alt="" style="height: 14px; width: auto;">
                ${i("filter.organize")}
            </div>
            <div class="sort-group grid-2x2">
                <button class="sort-btn active" data-sort="score" onclick="handleSortClick('score')">${o}</button>
                <button class="sort-btn" data-sort="name" onclick="handleSortClick('name')">${r}</button>
                <button class="sort-btn builds-only" data-sort="atk" onclick="handleSortClick('atk')">${s}</button>
                <button class="sort-btn builds-only" data-sort="hp" onclick="handleSortClick('hp')">${n}</button>
            </div>
        </div>`,m=`
        <div class="filter-section right">
            <div class="advanced-filters-dropdown" id="advanced-filters-dropdown" style="margin-left: 0;">
                <button class="advanced-filters-btn" onclick="handleToggleAdvancedFilters()">
                    <img loading="lazy" src="img/official/icon_filter.webp" onerror="this.src='img/official/filter.webp'" alt="">
                    <span>${i("detail.filters")}</span>
                    <span class="dropdown-arrow">▼</span>
                </button>
                <div class="advanced-filters-content" id="advanced-filters-content">
                    <div class="adv-filter-group">
                        <span class="adv-filter-label">${i("detail.sortBy")}</span>
                        <div class="sort-group grid-2x2" style="justify-content: flex-start; text-align: left;">
                            <button class="sort-btn" data-sort="element" onclick="handleSortClick('element')">${l}</button>
                            <button class="sort-btn" data-sort="class" onclick="handleSortClick('class')">${c}</button>
                        </div>
                    </div>
                    <div class="adv-filter-group">
                        <span class="adv-filter-label">${i("filter.category")}</span>
                        <div class="sort-group grid-2x2">
                            <button class="sort-btn class-filter-btn class-filter-icon-btn" data-variant-class="Ofensivo" onclick="handleFilterClick('variantClass', 'Ofensivo')"><img loading="lazy" src="${(f=$.Ofensivo)==null?void 0:f.icon}" alt=""> ${K("Ofensivo").toUpperCase()}</button>
                            <button class="sort-btn class-filter-btn class-filter-icon-btn" data-variant-class="Suporte de Utilidade" onclick="handleFilterClick('variantClass', 'Suporte de Utilidade')"><img loading="lazy" src="${(h=$["Suporte de Utilidade"])==null?void 0:h.icon}" alt=""> ${i("filter.supportShort").toUpperCase()}</button>
                            <button class="sort-btn class-filter-btn class-filter-icon-btn" data-variant-class="Defensivo" onclick="handleFilterClick('variantClass', 'Defensivo')"><img loading="lazy" src="${(S=$.Defensivo)==null?void 0:S.icon}" alt=""> ${K("Defensivo").toUpperCase()}</button>
                            <button class="sort-btn class-filter-btn class-filter-icon-btn" data-variant-class="Coringa" onclick="handleFilterClick('variantClass', 'Coringa')"><img loading="lazy" src="${(T=$.Coringa)==null?void 0:T.icon}" alt=""> ${K("Coringa").toUpperCase()}</button>
                        </div>
                    </div>
                    <div class="adv-filter-group" id="adv-filter-effects-pos"><span class="adv-filter-label" style="color: var(--buff-color, #6fbf73); cursor: pointer;" onclick="this.nextElementSibling.classList.toggle('active')">${i("guide.positiveEffects")} <span>▼</span></span><div class="filter-grid effects-grid collapsible-content">${t(e,!0)}</div></div>
                    <div class="adv-filter-group" id="adv-filter-effects-neg"><span class="adv-filter-label" style="color: var(--debuff-color, #f06868); cursor: pointer;" onclick="this.nextElementSibling.classList.toggle('active')">${i("guide.negativeEffects")} <span>▼</span></span><div class="filter-grid effects-grid collapsible-content">${t(a,!1)}</div></div>
                    <div class="adv-filter-group" style="margin-top: 12px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 12px;"><button class="btn btn-secondary" style="width: 100%; font-size: 0.8rem; padding: 8px;" onclick="handleClearAdvancedFilters()">${i("filter.clearAdvanced")}</button></div>
                </div>
            </div>
        </div>`,b=`
        <div class="filter-section right character-nav">
            <div class="sort-header" id="char-nav-header">${i("filter.changeCharacter")}</div>
            <div class="char-dropdown" id="char-dropdown">
                <button class="char-dropdown-btn" onclick="handleToggleCharDropdown()">
                    <span id="current-char-label">${i("filter.chooseCharacter")}</span>
                    <span class="dropdown-arrow">▼</span>
                </button>
                <div class="char-dropdown-content" id="char-dropdown-content"></div>
            </div>
        </div>`;return`
        <!-- ═══════════════════════════════════════════════════════ -->
        <!--  DESKTOP FILTER BAR  (display:none on mobile via CSS)  -->
        <!-- ═══════════════════════════════════════════════════════ -->
        <div class="filter-bar desktop-filter-bar">

            <div class="filter-controls">
                <button id="main-filter-btn" class="filter-toggle-btn" onclick="handleMainFilterAction()">
                    <div class="btn-icon-wrapper">
                        <img loading="lazy" class="icon-default" src="img/official/icon_filter.webp" onerror="this.src='img/official/filter.webp'" alt="">
                        <img loading="lazy" class="icon-active" src="img/official/constraints_no.webp" alt="">
                    </div>
                    <span class="text-default">${i("filter.filterBtn")}</span>
                    <span class="text-active">${i("filter.clear")}</span>
                </button>
            </div>

            <div class="vertical-separator"></div>

            ${d}

            <div class="vertical-separator"></div>

            ${p}

            <div class="vertical-separator"></div>

            ${u}

            <div class="vertical-separator"></div>

            ${m}

            <div class="vertical-separator"></div>

            ${b}
        </div>

        <!-- ═══════════════════════════════════════════════════════ -->
        <!--  MOBILE FILTER BAR  (display:none on desktop via CSS)  -->
        <!-- ═══════════════════════════════════════════════════════ -->
        <div class="filter-bar mobile-filter-bar">

            <!-- ROW 1: Toggle button + icon grids -->
            <div class="mobile-row mobile-row--icons">
                <button id="main-filter-btn-mobile" class="filter-toggle-btn filter-toggle-btn--mobile" onclick="handleMainFilterAction()">
                    <div class="btn-icon-wrapper">
                        <img loading="lazy" class="icon-default" src="img/official/icon_filter.webp" onerror="this.src='img/official/filter.webp'" alt="">
                        <img loading="lazy" class="icon-active" src="img/official/constraints_no.webp" alt="">
                    </div>
                    <span class="text-default">${i("filter.filterBtn")}</span>
                    <span class="text-active">${i("filter.clear")}</span>
                </button>
                <div class="mobile-icon-separator"></div>
                <div class="mobile-icon-grids">
                    <div class="filter-grid rarity-grid">
                        <button class="filter-btn rarity-btn" data-rarity="bronze" onclick="handleFilterClick('rarity', 'bronze')" title="${i("rarity.bronze")}"><img loading="lazy" src="img/official/icone_bronze.webp" alt="${i("rarity.bronze")}"></button>
                        <button class="filter-btn rarity-btn" data-rarity="prata" onclick="handleFilterClick('rarity', 'prata')" title="${i("rarity.silver")}"><img loading="lazy" src="img/official/icone_prata.webp" alt="${i("rarity.silver")}"></button>
                        <button class="filter-btn rarity-btn" data-rarity="ouro" onclick="handleFilterClick('rarity', 'ouro')" title="${i("rarity.gold")}"><img loading="lazy" src="img/official/icone_ouro.webp" alt="${i("rarity.gold")}"></button>
                        <button class="filter-btn rarity-btn" data-rarity="diamante" onclick="handleFilterClick('rarity', 'diamante')" title="${i("rarity.diamond")}"><img loading="lazy" src="img/official/icone_diamante.webp" alt="${i("rarity.diamond")}"></button>
                    </div>
                    <div class="mobile-icon-separator" style="margin: 0 4px; height: 40px;"></div>
                    <div class="filter-grid element-grid">
                        <button class="filter-btn element-btn" data-element="fogo" onclick="handleFilterClick('element', 'fogo')" title="${i("element.fire")}"><img loading="lazy" src="img/official/ElementalFireBackless.webp" alt="${i("element.fire")}"></button>
                        <button class="filter-btn element-btn" data-element="agua" onclick="handleFilterClick('element', 'agua')" title="${i("element.water")}"><img loading="lazy" src="img/official/ElementalWaterBackless.webp" alt="${i("element.water")}"></button>
                        <button class="filter-btn element-btn" data-element="ar" onclick="handleFilterClick('element', 'ar')" title="${i("element.wind")}"><img loading="lazy" src="img/official/ElementalWindBackless.webp" alt="${i("element.wind")}"></button>
                        <button class="filter-btn element-btn" data-element="luz" onclick="handleFilterClick('element', 'luz')" title="${i("element.light")}"><img loading="lazy" src="img/official/ElementalLightBackless.webp" alt="${i("element.light")}"></button>
                        <button class="filter-btn element-btn" data-element="trevas" onclick="handleFilterClick('element', 'trevas')" title="${i("element.dark")}"><img loading="lazy" src="img/official/ElementalDarkBackless.webp" alt="${i("element.dark")}"></button>
                        <button class="filter-btn element-btn" data-element="neutro" onclick="handleFilterClick('element', 'neutro')" title="${i("element.neutral")}"><img loading="lazy" src="img/official/ElementalNeutralBackless.webp" alt="${i("element.neutral")}"></button>
                    </div>
                </div>
            </div>

            <div class="mobile-divider"></div>

            <!-- ROW 2: Sort controls -->
            <div class="mobile-row mobile-row--sort">
                <div class="sort-header">
                    <img loading="lazy" src="img/official/icon_sort.webp" onerror="this.style.display='none'" alt="">
                    ${i("filter.organize")}
                </div>
                <div class="sort-group mobile-sort-group">
                    <button class="sort-btn active" data-sort="score" onclick="handleSortClick('score')">${o}</button>
                    <button class="sort-btn" data-sort="name" onclick="handleSortClick('name')">${r}</button>
                    <button class="sort-btn builds-only" data-sort="atk" onclick="handleSortClick('atk')">${s}</button>
                    <button class="sort-btn builds-only" data-sort="hp" onclick="handleSortClick('hp')">${n}</button>
                </div>
            </div>

            <div class="mobile-divider"></div>

            <!-- ROW 3: Advanced filters -->
            <div class="mobile-row mobile-row--adv">
                <div class="advanced-filters-dropdown mobile-adv-dropdown" id="advanced-filters-dropdown-mobile">
                    <button class="advanced-filters-btn" onclick="handleToggleAdvancedFiltersMobile()">
                        <img loading="lazy" src="img/official/icon_filter.webp" onerror="this.src='img/official/filter.webp'" alt="">
                        <span>${i("detail.filters")}</span>
                        <span class="dropdown-arrow">▼</span>
                    </button>
                    <div class="advanced-filters-content" id="advanced-filters-content-mobile">
                        <div class="adv-filter-group">
                            <span class="adv-filter-label">${i("detail.sortBy")}</span>
                            <div class="sort-group grid-2x2">
                                <button class="sort-btn" data-sort="element" onclick="handleSortClick('element')">${l}</button>
                                <button class="sort-btn" data-sort="class" onclick="handleSortClick('class')">${c}</button>
                            </div>
                        </div>
                        <div class="adv-filter-group">
                            <span class="adv-filter-label">${i("filter.category")}</span>
                            <div class="sort-group grid-2x2">
                                <button class="sort-btn class-filter-btn class-filter-icon-btn" data-variant-class="Ofensivo" onclick="handleFilterClick('variantClass', 'Ofensivo')"><img loading="lazy" src="${(C=$.Ofensivo)==null?void 0:C.icon}" alt=""> ${K("Ofensivo").toUpperCase()}</button>
                                <button class="sort-btn class-filter-btn class-filter-icon-btn" data-variant-class="Suporte de Utilidade" onclick="handleFilterClick('variantClass', 'Suporte de Utilidade')"><img loading="lazy" src="${(_=$["Suporte de Utilidade"])==null?void 0:_.icon}" alt=""> ${i("filter.supportShort").toUpperCase()}</button>
                                <button class="sort-btn class-filter-btn class-filter-icon-btn" data-variant-class="Defensivo" onclick="handleFilterClick('variantClass', 'Defensivo')"><img loading="lazy" src="${(B=$.Defensivo)==null?void 0:B.icon}" alt=""> ${K("Defensivo").toUpperCase()}</button>
                                <button class="sort-btn class-filter-btn class-filter-icon-btn" data-variant-class="Coringa" onclick="handleFilterClick('variantClass', 'Coringa')"><img loading="lazy" src="${(P=$.Coringa)==null?void 0:P.icon}" alt=""> ${K("Coringa").toUpperCase()}</button>
                            </div>
                        </div>
                        <div class="adv-filter-group" id="adv-filter-effects-pos-mobile">
                            <span class="adv-filter-label" style="color: var(--buff-color, #6fbf73); cursor: pointer;" onclick="this.nextElementSibling.classList.toggle('active')">${i("guide.positiveEffects")} <span>▼</span></span>
                            <div class="filter-grid effects-grid collapsible-content">${t(e,!0)}</div>
                        </div>
                        <div class="adv-filter-group" id="adv-filter-effects-neg-mobile">
                            <span class="adv-filter-label" style="color: var(--debuff-color, #f06868); cursor: pointer;" onclick="this.nextElementSibling.classList.toggle('active')">${i("guide.negativeEffects")} <span>▼</span></span>
                            <div class="filter-grid effects-grid collapsible-content">${t(a,!1)}</div>
                        </div>
                        <div class="adv-filter-group" style="margin-top: 12px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 12px;">
                            <button class="btn btn-secondary" style="width: 100%; font-size: 0.8rem; padding: 8px;" onclick="handleClearAdvancedFilters()">${i("filter.clearAdvanced")}</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mobile-divider"></div>

            <!-- ROW 4: Char nav -->
            <div class="mobile-row mobile-row--char">
                <div class="mobile-char-nav">
                    <div class="char-dropdown" id="char-dropdown-mobile">
                        <button class="char-dropdown-btn" onclick="handleToggleCharDropdownMobile()">
                            <span id="current-char-label-mobile">${i("filter.chooseCharacter")}</span>
                            <span class="dropdown-arrow">▼</span>
                        </button>
                        <div class="char-dropdown-content" id="char-dropdown-content-mobile">
                            <!-- Populated dynamically -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `}function ue(){const e=F(),a=e.currentTab==="tier"?"tier":"builds",{filters:t,sort:o}=e.tabState[a];document.querySelectorAll(".rarity-btn").forEach(p=>{t.rarity.length>0&&t.rarity.includes(p.dataset.rarity)?p.classList.add("active"):p.classList.remove("active")}),document.querySelectorAll(".element-btn").forEach(p=>{t.element.length>0&&t.element.includes(p.dataset.element)?p.classList.add("active"):p.classList.remove("active")}),document.querySelectorAll(".class-filter-btn").forEach(p=>{const u=p.dataset.variantClass;t.variantClass&&t.variantClass.length>0&&t.variantClass.includes(u)?p.classList.add("active"):p.classList.remove("active")}),document.querySelectorAll(".effect-btn").forEach(p=>{const u=p.dataset.effectKey;t.efeitos&&t.efeitos.length>0&&t.efeitos.includes(u)?p.classList.add("active"):p.classList.remove("active")});const s=document.getElementById("adv-filter-effects-pos"),n=document.getElementById("adv-filter-effects-neg");a==="tier"?(s&&(s.style.display="none"),n&&(n.style.display="none")):(s&&(s.style.display="flex"),n&&(n.style.display="flex"));const r={score:i("filter.score").toUpperCase(),atk:i("filter.atk").toUpperCase(),hp:i("filter.hp").toUpperCase(),name:i("filter.alpha").toUpperCase(),element:i("filter.element").toUpperCase(),class:i("filter.category").toUpperCase()},l=a==="tier"?"class":"score",c="desc";document.querySelectorAll(".sort-btn:not(.class-filter-btn)").forEach(p=>{if(p.classList.remove("active"),p.innerText=r[p.dataset.sort]||p.dataset.sort,p.dataset.sort===o.type){(o.type!==l||o.direction!==c)&&p.classList.add("active");const u=o.direction==="asc"?" ↑":" ↓";p.innerText+=u}});const d=t.rarity.length>0||t.element.length>0||t.variantClass&&t.variantClass.length>0||t.efeitos&&t.efeitos.length>0||o.type!==l||o.direction!==c;["main-filter-btn","main-filter-btn-mobile"].forEach(p=>{const u=typeof document<"u"?document.getElementById(p):null;u&&u.classList.toggle("can-clear",d)}),["adv-filter-effects-pos-mobile","adv-filter-effects-neg-mobile"].forEach((p,u)=>{const m=typeof document<"u"?document.getElementById(p):null;m&&(m.style.display=a==="tier"?"none":"flex")})}function ot(e,a="builds"){const t=Z();if(!t)return;let o;if(e==="todos")o=i("characters.allCharacters");else{const r=t[e];r&&(o=`<img loading="lazy" src="${aa(e)}" alt="" style="width:24px; height:24px; object-fit:contain;"> ${r.character}`)}const s=Object.keys(t).sort((r,l)=>t[r].character.localeCompare(t[l].character));let n="";a!=="tier"&&(n+=`
            <button class="char-dropdown-item todos-item ${e==="todos"?"active":""}" 
                    onclick="openCharacterDetails('todos', '${a}'); handleToggleCharDropdown();">
                <span>${i("characters.allCharacters")}</span>
            </button>
            <div class="char-dropdown-divider"></div>
        `),n+=s.map(r=>{const l=t[r],c=aa(r);return`
            <button class="char-dropdown-item ${r===e?"active":""}" 
                    onclick="openCharacterDetails('${r}', '${a}'); handleToggleCharDropdown();">
                <img loading="lazy" src="${c}" alt="" onerror="this.src='img/official/Annie_Icon.webp'">
                <span>${l.character}</span>
            </button>
        `}).join(""),["char-dropdown-content","char-dropdown-content-mobile"].forEach(r=>{const l=typeof document<"u"?document.getElementById(r):null;l&&(l.innerHTML=n)}),["current-char-label","current-char-label-mobile"].forEach(r=>{const l=typeof document<"u"?document.getElementById(r):null;l&&o&&(l.innerHTML=o)})}function Se(e){return e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"")}function Do(e,a){if(!a||a.length<2)return e;const t=Se(e),o=Se(a),s=t.indexOf(o);if(s===-1)return e;const n=e.substring(0,s),r=e.substring(s,s+a.length),l=e.substring(s+a.length);return`${n}<span class="search-match-highlight">${r}</span>${l}`}function st(e){clearTimeout(ii),ii=setTimeout(()=>{nt(e)},150)}function nt(e){const a=document.getElementById("search-results-dropdown"),t=document.getElementById("search-clear-btn");if(!e||e.trim().length<2){a&&(a.innerHTML="",a.classList.remove("active")),t&&(t.style.display="none"),J=[],Oe="";return}t&&(t.style.display="flex");const o=Z();if(!o)return;const s=Se(e.trim()),n=[];for(const[r,l]of Object.entries(o)){const c=pe(l.variants);for(const d of c){const p=Se(d.name),u=Se(l.character);(p.includes(s)||u.includes(s))&&n.push({...d,_charKey:r,_charName:l.character})}}n.length>0?(J=n.slice(0,15),Oe=e.trim(),je(J,a,e.trim())):J.length>0?je(J,a,Oe):je([],a,e.trim())}function je(e,a,t=""){if(a){if(e.length===0){a.innerHTML=`
            <div class="search-no-results">
                <span>Nenhuma variante encontrada</span>
            </div>
        `,a.classList.add("active");return}a.innerHTML=e.map(o=>{const s=vi[o.element]||{},n=yi[o.rarityKey]||"",r=ie(o._charKey,o.name),l=Do(o.name,t);return`
            <button class="search-result-item" onclick="handleSearchResultClick('${o._charKey}', '${o.name.replace(/'/g,"\\'")}')">
                <img loading="lazy" src="${r}" alt="${o.name}" class="search-result-portrait"
                     onerror="this.src='img/official/Annie_Icon.webp'">
                <div class="search-result-info">
                    <span class="search-result-name">${l}</span>
                    <span class="search-result-char">${o._charName}</span>
                </div>
                <div class="search-result-badges">
                    ${s.iconPath?`<img loading="lazy" src="${s.iconPath}" alt="${o.element}" class="search-result-element">`:""}
                    ${n?`<img loading="lazy" src="${n}" alt="${o.rarityKey}" class="search-result-rarity">`:""}
                </div>
            </button>
        `}).join(""),a.classList.add("active")}}function rt(e,a){const t=document.getElementById("variant-search-input"),o=document.getElementById("search-results-dropdown");t&&(t.value=""),o&&(o.innerHTML="",o.classList.remove("active"));const s=document.getElementById("search-clear-btn");s&&(s.style.display="none"),J=[],Oe="",window.openCharacterDetails&&(window.openCharacterDetails(e,"builds"),a&&setTimeout(()=>{const n=document.querySelector(`.variant-card[data-variant-name="${a}"]`);n&&(n.scrollIntoView({behavior:"smooth",block:"center"}),n.classList.add("search-highlight-flash"),setTimeout(()=>n.classList.remove("search-highlight-flash"),2e3))},500))}function lt(){const e=document.getElementById("variant-search-input"),a=document.getElementById("search-results-dropdown"),t=document.getElementById("search-clear-btn");e&&(e.value="",e.focus()),a&&(a.innerHTML="",a.classList.remove("active")),t&&(t.style.display="none"),J=[],Oe=""}function ct(){const e=document.getElementById("variant-search-input");e&&e.value.trim().length>=2&&nt(e.value)}function dt(e,a){Ti(e,a),ue(),window.onFiltersChanged&&window.onFiltersChanged()}function pt(e){Di(e),ue(),window.onFiltersChanged&&window.onFiltersChanged()}function pa(){Ci(),ue(),window.onFiltersChanged&&window.onFiltersChanged()}function ut(){const e=F(),a=e.currentTab==="tier"?"tier":"builds",{filters:t,sort:o}=e.tabState[a],s=a==="tier"?"class":"score";(t.rarity.length>0||t.element.length>0||t.variantClass&&t.variantClass.length>0||t.efeitos&&t.efeitos.length>0||o.type!==s||o.direction!=="desc")&&pa()}function mt(){}function gt(){const e=document.getElementById("char-dropdown"),a=document.getElementById("char-dropdown-content");if(e&&a&&(e.classList.toggle("active"),a.classList.toggle("active"),a.classList.contains("active"))){const t=a.querySelector(".char-dropdown-item.active");t&&setTimeout(()=>{t.scrollIntoView({block:"center",behavior:"smooth"})},50)}}function ft(){const e=document.getElementById("char-dropdown-mobile"),a=document.getElementById("char-dropdown-content-mobile");if(e&&a&&(e.classList.toggle("active"),a.classList.toggle("active"),a.classList.contains("active"))){const t=a.querySelector(".char-dropdown-item.active");t&&setTimeout(()=>{t.scrollIntoView({block:"center",behavior:"smooth"})},50)}}function bt(){const e=document.getElementById("advanced-filters-dropdown"),a=document.getElementById("advanced-filters-content");e&&a&&(e.classList.toggle("active"),a.classList.toggle("active"))}function ht(){const e=document.getElementById("advanced-filters-dropdown-mobile"),a=document.getElementById("advanced-filters-content-mobile");e&&a&&(e.classList.toggle("active"),a.classList.toggle("active"))}typeof document<"u"&&document.addEventListener&&document.addEventListener("click",e=>{const a=document.getElementById("search-bar-container"),t=document.getElementById("search-results-dropdown");a&&t&&!a.contains(e.target)&&t.classList.remove("active");const o=document.getElementById("advanced-filters-dropdown"),s=document.getElementById("advanced-filters-content");o&&s&&!o.contains(e.target)&&(o.classList.remove("active"),s.classList.remove("active"));const n=document.getElementById("advanced-filters-dropdown-mobile"),r=document.getElementById("advanced-filters-content-mobile");n&&r&&!n.contains(e.target)&&(n.classList.remove("active"),r.classList.remove("active"));const l=document.getElementById("char-dropdown"),c=document.getElementById("char-dropdown-content");l&&c&&!l.contains(e.target)&&(l.classList.remove("active"),c.classList.remove("active"));const d=document.getElementById("char-dropdown-mobile"),p=document.getElementById("char-dropdown-content-mobile");d&&p&&!d.contains(e.target)&&(d.classList.remove("active"),p.classList.remove("active"))});function Et(){Ii(),ue(),window.onFiltersChanged&&window.onFiltersChanged()}const ko=Object.freeze(Object.defineProperty({__proto__:null,createFilterBar:da,createSearchBar:ca,handleClearAdvancedFilters:Et,handleClearFilters:pa,handleFilterClick:dt,handleMainFilterAction:ut,handleSearchClear:lt,handleSearchFocus:ct,handleSearchInput:st,handleSearchResultClick:rt,handleSortClick:pt,handleToggleAdvancedFilters:bt,handleToggleAdvancedFiltersMobile:ht,handleToggleCharDropdown:gt,handleToggleCharDropdownMobile:ft,handleToggleFilter:mt,updateCharacterNav:ot,updateFilterUI:ue},Symbol.toStringTag,{value:"Module"}));function _o(e){const a=e||"B";return`<div class="rank-badge ${`rank-${a.toLowerCase().replace(/[^a-z0-9]/g,"")}`}">${a}</div>`}function Be(e,a,t,o,s){const n=o?String(o).toUpperCase().trim():"",r=["I","N/A","NA",""].includes(n.replace("/",""));let l="";return r||(t==="riftDef"?l=`<img src="img/modifiers/buffs/Armor.webp" class="rank-class-badge" style="--class-color: #1565c0" alt="${i("tier.defensive")}" title="${i("tier.defensive")}">`:l=s.map(c=>{let d={...$[c.key]};if(!d.icon)return"";let p=!1;return(c.key==="Ofensivo"||c.key==="Suporte de Utilidade"||c.key==="Coringa")&&(p=!0),p?`<img src="${d.icon}" class="rank-class-badge" style="--class-color: ${d.color}" alt="${c.localized}" title="${c.localized}">`:""}).join("")),`
  <div class="rank-cell-container text-center">
    <div class="rank-badge-wrapper">
      ${_o(o)}
      ${l}
    </div>
  </div>
  `}function Bo(e,a){const t=F(),o=t.tierData[e]||{},{filters:s,sort:n}=t.tabState.tier;let r=pe(a.variants);r=Ne(r,s),r=Fe(r,n);let l="";return r.length===0?l=`<tr><td colspan="5" class="text-center" style="padding: 40px; color: var(--text-muted);">${i("tier.noVariants")}</td></tr>`:l=r.map(c=>{const d=o[c.name]||{},p={pf:d.pf||"B",riftOff:d.riftOff||"B",riftDef:d.riftDef||"B",parallel:d.parallel||"B"},u=ie(e,c.name),m=c.element||(y()==="en"?"Neutral":"Neutro");(we()[m]||we().Neutro||we().Neutral).class,c.rarityKey,aa(e);const f=Zi(c.name),h=z(c.name);return`
      <tr>
        <td>
          <div class="tier-char-cell">
            ${`
        <img loading="lazy" src="${u}" alt="${h}" onerror="this.src='img/official/Annie_Icon.webp'">
        <span>${h}</span>
      `}
          </div>
        </td>
        <td class="text-center">
          ${Be(e,c.name,"pf",p.pf,f)}
        </td>
        <td class="text-center">
          ${Be(e,c.name,"parallel",p.parallel,f)}
        </td>
        <td class="text-center">
          ${Be(e,c.name,"riftOff",p.riftOff,f)}
        </td>
        <td class="text-center">
          ${Be(e,c.name,"riftDef",p.riftDef,f)}
        </td>
      </tr>
      `}).join(""),`
  <div class="tier-table-wrapper">
    <table class="tier-table">
      <thead>
      <tr>
        <th>${i("tier.variant")}</th>
        <th class="text-center">
          <span class="attr-highlight" data-attr-key="tier_dp_ataque" style="border-bottom: 1px dotted rgba(255,255,255,0.4); color: var(--text-muted); padding: 4px;">${i("tier.dpAttack")}</span>
        </th>
        <th class="text-center">
          <span class="attr-highlight" data-attr-key="tier_reinos_paralelos" style="border-bottom: 1px dotted rgba(255,255,255,0.4); color: var(--text-muted); padding: 4px;">${i("tier.parallelRealms")}</span>
        </th>
        <th class="text-center">
          <span class="attr-highlight" data-attr-key="tier_fenda_ataque" style="border-bottom: 1px dotted rgba(255,255,255,0.4); color: var(--text-muted); padding: 4px;">${i("tier.riftAttack")}</span>
        </th>
        <th class="text-center">
          <span class="attr-highlight" data-attr-key="tier_fenda_defesa" style="border-bottom: 1px dotted rgba(255,255,255,0.4); color: var(--text-muted); padding: 4px;">${i("tier.riftDefense")}</span>
        </th>
      </tr>
      </thead>
      <tbody id="detail-tier-table-body">
      ${l}
      </tbody>
    </table>
  </div>
  `}function At(e,a){return`



  <!-- Rank Explanations Dictionary -->
  <div class="legend-section">
    <div class="legend-header" style="cursor: pointer;" onclick="toggleLegendSection('rank-dict')">
      <span class="legend-title iluminado">${i("tier.notes")}</span>
      <button class="legend-toggle-btn" style="transform: rotate(-90deg); pointer-events: none;">▼</button>
    </div>
    <div class="rank-dictionary hidden" id="rank-dict">
      <div class="dict-item"><span class="rank-badge rank-ss">SS</span>
        <p>${i("tier.rankSS")}</p>
      </div>
      <div class="dict-item"><span class="rank-badge rank-s">S</span>
        <p>${i("tier.rankS")}</p>
      </div>
      <div class="dict-item"><span class="rank-badge rank-a">A</span>
        <p>${i("tier.rankA")}</p>
      </div>
      <div class="dict-item"><span class="rank-badge rank-b">B</span>
        <p>${i("tier.rankB")}</p>
      </div>
      <div class="dict-item"><span class="rank-badge rank-c">C</span>
        <p>${i("tier.rankC")}</p>
      </div>
      <div class="dict-item"><span class="rank-badge rank-i">I</span>
        <p>${i("tier.rankI")}</p>
      </div>
      <div class="dict-item"><span class="rank-badge rank-na">N/A</span>
        <p>${i("tier.rankNA")}</p>
      </div>
    </div>
  </div>

  <!-- Class Role Legend -->
  <div class="legend-section">
    <div class="legend-header" style="cursor: pointer;" onclick="toggleLegendSection('class-dict')">
      <span class="legend-title iluminado">${i("tier.classes")}</span>
      <button class="legend-toggle-btn" style="transform: rotate(-90deg); pointer-events: none;">▼</button>
    </div>
    <div class="class-dictionary hidden" id="class-dict">
      ${Object.entries($).map(([t,o])=>`
      <div class="class-dict-item">
        <img src="${o.icon}" alt="${K(t)}" class="class-dict-icon" style="--class-color: ${o.color}">
        <div class="class-dict-text">
          <strong style="color: ${o.color}">${K(t)}</strong>
          <p>${Ji(t)}</p>
        </div>
      </div>
      `).join("")}
    </div>
  </div>

  ${Bo(e,a)}
  `}window.toggleLegendSection=function(e){const a=document.getElementById(e),t=a.closest(".legend-section").querySelector(".legend-toggle-btn");a.classList.toggle("hidden"),a.classList.contains("hidden")?t.style.transform="rotate(-90deg)":t.style.transform="rotate(0deg)"};function Go(e){const a=e.toLowerCase(),t=ee(a);return t?`
  <div class="profile-modal-overlay" id="profile-modal-overlay" style="display: none;" onclick="handleProfileOverlayClick(event)">
    <div class="profile-modal" onclick="event.stopPropagation()">
      <!-- Close button -->
      <button class="profile-modal-close" onclick="closeProfileModal()">&#10005;</button>

      <!-- Header with character name -->
      <div class="profile-modal-header">
        <img loading="lazy" src="${sa[a]||`img/${a}/icon.webp`}" alt="${t.character}" class="profile-modal-icon"
          onerror="this.src='img/official/Annie_Icon.webp'">
        <h2>${i("detail.profileOf").toUpperCase()} ${(z(t.character).charAt(0).toUpperCase()+z(t.character).slice(1)).toUpperCase()}</h2>
      </div>

      <!-- Tab Navigation -->
      <div class="profile-tabs">
        <button class="profile-tab-btn active" data-tab="about" onclick="switchProfileModalTab('${a}', 'about')">
          ${i("profile.about")}
        </button>
        <button class="profile-tab-btn" data-tab="variants" onclick="switchProfileModalTab('${a}', 'variants')">
          ${i("profile.variants")}
        </button>
        <button class="profile-tab-btn" data-tab="moves" onclick="switchProfileModalTab('${a}', 'moves')">
          ${i("profile.moves")}
        </button>
      </div>

      <!-- Tab Contents -->
      <div class="profile-modal-content" id="profile-modal-content">
      </div>
    </div>
  </div>
  `:""}function Lo(e){const a=document.getElementById("profile-modal-overlay");a&&(a.style.display="flex",document.body.style.overflow="hidden",a.querySelectorAll(".profile-tab-btn").forEach(t=>{t.classList.toggle("active",t.dataset.tab==="about")}),yt(e,"about"),requestAnimationFrame(()=>{a.classList.add("visible")}))}function vt(){const e=document.getElementById("profile-modal-overlay");e&&(e.classList.remove("visible"),document.body.style.overflow="",setTimeout(()=>{e.style.display="none"},300))}function Po(e){e.target.id==="profile-modal-overlay"&&vt()}async function Mo(e,a){const t=document.getElementById("profile-modal-overlay");t&&(t.querySelectorAll(".profile-tab-btn").forEach(o=>{o.classList.toggle("active",o.dataset.tab===a)}),await yt(e,a))}async function yt(e,a){const t=document.getElementById("profile-modal-content");if(!t)return;const o=e.toLowerCase(),s=ee(o);if(!s)return;const n=et(o);switch(a){case"about":t.innerHTML=$o(o,s,n);break;case"variants":t.innerHTML=No(o,s);break;case"moves":t.innerHTML=await qo(o);break}}function ti(e){if(typeof e=="string"&&(e.toLowerCase()==="variavel"||e.toLowerCase()==="variável"||e.toLowerCase()==="variable"))return`<span style="font-family: var(--font-secondary), sans-serif; font-size: 0.95rem; color: var(--accent-gold);">${e.toUpperCase()}</span>`;const a=parseInt(e)||3,t='<svg viewBox="0 0 24 24" class="stat-star"><path fill="currentColor" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>',o='<svg viewBox="0 0 24 24" class="stat-star empty" style="opacity: 0.2;"><path fill="currentColor" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>';let s="";for(let n=0;n<5;n++)s+=n<a?t:o;return s}function $o(e,a,t){const o=t&&t.biography,s=t&&(t.birthday||t.height||t.weight),n=e.split("-").map(l=>l?l.charAt(0).toUpperCase()+l.slice(1):"").join("_");return`
  <div class="profile-tab-panel">
    <!-- Intro Section -->
    <div class="profile-intro-section">
      <div class="profile-intro-image">
        <img src="${`img/${e}/${n}_0.webp`}" alt="${z(e,a.character)}" onerror="this.src='img/official/${n}_Icon.webp'">
      </div>
      <div class="profile-intro-stats">
        <div class="stat-rating">
          <span class="stat-rating-label">${i("profile.attack")}</span>
          <div class="stat-rating-stars">${ti((t==null?void 0:t.attack)||3)}</div>
        </div>
        <div class="stat-rating">
          <span class="stat-rating-label">${i("profile.health")}</span>
          <div class="stat-rating-stars">${ti((t==null?void 0:t.health)||3)}</div>
        </div>
        <div class="stat-playstyle">
          <h4>${i("profile.playstyle")}</h4>
          <p>${t!=null&&t.playstyle?Q(t.playstyle):i("profile.playstyleNA")}</p>
        </div>
      </div>
    </div>

    <!-- Abilities Section -->
    <div class="profile-section abilities-section">
      <div class="profile-section-header" onclick="toggleProfileAbilities()">
        <h3>${i("profile.abilities")}</h3>
        <img src="img/official/IconInfo.webp" alt="${i("profile.expandAlt")}" class="bio-toggle-icon" id="abilities-toggle-icon">
      </div>
      <div class="abilities-content collapsed" id="abilities-content">
        ${xo(t)}
      </div>
    </div>

    <!-- Biography Section -->
    <div class="profile-section biography-section">
      <div class="profile-section-header" onclick="toggleProfileBio()">
        <h3>${i("profile.biography")}</h3>
        <img src="img/official/IconInfo.webp" alt="${i("profile.expandAlt")}" class="bio-toggle-icon" id="bio-toggle-icon">
      </div>
      <div class="biography-content collapsed" id="biography-content">
        ${o?`<div class="biography-text">${t.biography.split(`
`).map(l=>l.trim()?`<p>${l}</p>`:"").join("")}</div>`:`<p class="profile-empty">${i("profile.biographyNA")}</p>`}
      </div>
    </div>

    <!-- Essential Data Section -->
    <div class="profile-section essential-data-section">
      <h3>${i("profile.essentialData")}</h3>
      ${s?Fo(t):`<p class="profile-empty">${i("profile.essentialDataNA")}</p>`}
    </div>
  </div>
  `}function xo(e){if(!e||!e.characterAbility&&!e.superiorAbility1&&!e.superiorAbility2&&!e.prestigeAbility)return`<p class="profile-empty">${i("profile.abilitiesNA")}</p>`;let a="";return e.characterAbility&&(a+=`
    <div class="ability-card">
      <div class="ability-header">
        <span class="ability-type">${i("profile.characterAbility")}</span>
        <span class="ability-title">- ${e.characterAbility.title}</span>
      </div>
      <div class="ability-desc">${Q(e.characterAbility.description)}</div>
    </div>
    `),e.superiorAbility1&&(a+=`
    <div class="ability-card">
      <div class="ability-header">
        <span class="ability-type">${i("profile.superiorAbility")}</span>
        <span class="ability-title">- ${e.superiorAbility1.title}</span>
      </div>
      <div class="ability-desc">${Q(e.superiorAbility1.description)}</div>
    </div>
    `),e.superiorAbility2&&(a+=`
    <div class="ability-card">
      <div class="ability-header">
        <span class="ability-type">${i("profile.superiorAbility")}</span>
        <span class="ability-title">- ${e.superiorAbility2.title}</span>
      </div>
      <div class="ability-desc">${Q(e.superiorAbility2.description)}</div>
    </div>
    `),e.prestigeAbility&&(a+=`
    <div class="ability-card">
      <div class="ability-header">
        <span class="ability-type">${i("profile.prestigeAbility")}</span>
        <span class="ability-title">- ${e.prestigeAbility.title}</span>
      </div>
      <div class="ability-desc">${Q(e.prestigeAbility.description)}</div>
    </div>
    `),a}function Fo(e){return`
  <div class="essential-data-grid">
    <div class="essential-data-left">
      ${e.birthday?`
      <div class="data-item">
        <span class="data-label">${i("profile.birthday")}</span>
        <span class="data-value">${e.birthday}</span>
      </div>
      `:""}
      ${e.bloodType?`
      <div class="data-item">
        <span class="data-label">${i("profile.bloodType")}</span>
        <span class="data-value">${e.bloodType}</span>
      </div>
      `:""}
      ${e.height?`
      <div class="data-item">
        <span class="data-label">${i("profile.height")}</span>
        <span class="data-value">${e.height}</span>
      </div>
      `:""}
      ${e.weight?`
      <div class="data-item">
        <span class="data-label">${i("profile.weight")}</span>
        <span class="data-value">${e.weight}</span>
      </div>
      `:""}
    </div>
    <div class="essential-data-right">
      ${e.likes?`
      <div class="data-item likes">
        <span class="data-label">${i("profile.likes")}</span>
        <span class="data-value">${e.likes}</span>
      </div>
      `:""}
      ${e.dislikes?`
      <div class="data-item dislikes">
        <span class="data-label">${i("profile.dislikes")}</span>
        <span class="data-value">${e.dislikes}</span>
      </div>
      `:""}
    </div>
  </div>
  `}function No(e,a){if(!a.variants)return`<div class="profile-tab-panel"><p class="profile-empty">${i("profile.noVariants")}</p></div>`;const t=["Diamante","Ouro","Prata","Bronze"];let o="",s=0;return t.forEach(n=>{const r=n.toLowerCase();if(a.variants[r]&&a.variants[r].length>0){const l=a.variants[r];s+=l.length;const c=`<img src="img/official/icone_${r}.webp" alt="${Ze(r)}" class="variants-rarity-icon">`;o+=`
      <div class="variants-rarity-group">
        <h3 class="variants-rarity-title ${r}">${c} ${Ze(r)} (${l.length})</h3>
        <div class="profile-variants-grid">
          ${l.map((d,p)=>`
          <div class="profile-variant-card animate-in" style="animation-delay: ${p*.03}s">
            <img loading="lazy" src="${ie(e,d.name)}" alt="${d.name}" class="profile-variant-img"
              onerror="this.src='img/official/Annie_Icon.webp'">
            <span class="profile-variant-name">${d.name}</span>
          </div>
          `).join("")}
        </div>
      </div>
      `}}),s===0?`<div class="profile-tab-panel"><p class="profile-empty">${i("profile.noVariants")}</p></div>`:`
  <div class="profile-tab-panel">
    <div class="variants-total-header">${i("profile.totalVariants")} ${s}</div>
    ${o}
  </div>
  `}let Qe=null;async function Uo(){if(Qe)return Qe;try{const a=await(await fetch("data/krazete/stanleyDB-moves.json")).json(),t={};return Object.values(a).forEach(o=>{if(o.image){const s=o.image.split("/").pop();t[s]=o.gear||0}}),Qe=t,t}catch(e){return console.error("Failed to load stanley moves:",e),{}}}async function qo(e){const a=se[e];if(!a||Object.keys(a).length===0)return`<div class="profile-tab-panel"><p class="profile-empty">${i("profile.noMoves")}</p></div>`;const t=Object.entries(a),o=await Uo();function s(u,m){var C;const f=(((C=u.image)==null?void 0:C.image)||"").split("/").pop(),h=(m||"").toLowerCase(),S=(u.description||"").toLowerCase();if(h.includes("explosão")||h.includes("burst")||f.includes("burst"))return-2;if(h.includes("expulsão")||S.includes("expulsão")||f.includes("outtake")||f.includes("snapback"))return-1;if(o[f]!==void 0)return o[f];const T=f.match(/_(\d+)\.webp$/i);return T?parseInt(T[1],10):0}const n=t.sort((u,m)=>s(u[1],u[0])-s(m[1],m[0])),r=n.filter(([u,m])=>m.type==="Golpe Especial"),l=n.filter(([u,m])=>m.type==="Blockbuster"),c=n.filter(([u,m])=>m.type!=="Golpe Especial"&&m.type!=="Blockbuster");function d(u,m){return m.length===0?"":`
    <div class="moves-group">
      <h3 class="moves-group-title">${u} (${m.length})</h3>
      <div class="moves-grid">
        ${m.map(([b,f])=>{var C;const h=((C=f.image)==null?void 0:C.image)||"",T=(f.description||i("profile.noDescription")).replace(/\\\\n/g,"<br>").replace(/\\n/g,"<br>").replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>");return`
          <div class="profile-move-card" onclick="toggleMoveDetail(this)">
            <div class="move-card-preview">
              ${h?`<img loading="lazy" src="${h}" alt="${b}" class="move-card-img" onerror="this.style.display='none'">`:""}
              <span class="move-card-name">${b}</span>
              <span class="move-card-chevron">&#9660;</span>
            </div>
            <div class="move-card-detail">
              <div class="move-card-type">${f.type||i("profile.unknown")}</div>
              <p class="move-card-desc">${T}</p>
            </div>
          </div>
          `}).join("")}
      </div>
    </div>
    `}const p=t.length;return`
  <div class="profile-tab-panel">
    <div class="variants-total-header">${i("profile.totalMoves")} ${p}</div>
    ${d(i("profile.specialMoves"),r)}
    ${d(i("profile.blockbusters"),l)}
    ${d(i("profile.others"),c)}
  </div>
  `}function Vo(){const e=document.getElementById("biography-content"),a=document.getElementById("bio-toggle-icon");e&&(e.classList.toggle("collapsed"),a&&a.classList.toggle("expanded"))}function zo(e){e.classList.toggle("expanded")}function Ho(){const e=document.getElementById("abilities-content"),a=document.getElementById("abilities-toggle-icon");e&&(e.classList.toggle("collapsed"),a&&a.classList.toggle("expanded"))}function jo(e,a=""){const t=et(e);if(!t)return;const o=t.superiorAbility1,s=t.superiorAbility2;if(!o)return;const l=(o.description+(s?`

`+s.description:"")).split(/\n\n+/),c=(a||"").toLowerCase().includes("critless"),d=`
  <div class="marquee-disclaimer-modal" style="
    position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
    background: #0d0d12; border: 1px solid rgba(212, 168, 75, 0.2); border-radius: 12px;
    padding: 24px; z-index: 10001; max-width: 500px; width: 90%;
    box-shadow: 0 20px 60px rgba(0,0,0,0.9), inset 0 0 40px rgba(0, 0, 0, 0.5); color: #fff;
    max-height: 85vh; overflow-y: auto;
  ">
    <div style="background: rgba(255, 255, 255, 0.03); padding: 15px; border-radius: 8px; width: 100%; margin-bottom: 20px; position: relative; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.05);">
      <h3 style="color: #fff; margin: 0; font-size: 1.1rem; display: flex; align-items: center; gap: 10px; font-family: 'Dodam', sans-serif;">
        <i class="fas fa-info-circle" style="color: var(--accent-gold);"></i> ${i("profile.marqueeDetails")}
      </h3>
    </div>

    <h4 style="color: var(--text-muted); text-transform: uppercase; letter-spacing: 1.5px; font-size: 0.7rem; margin-bottom: 12px; font-family: 'Inter', sans-serif; opacity: 0.8;">
      ${e.replace(/-/g," ").toUpperCase()} &bull; ${o.title}
    </h4>

    <div class="marquee-options-list">
      ${l.map(u=>{const m=u.split(" - "),b=m[0],f=m.slice(1).join(" - ");return`
        <div style="margin-bottom: 16px; background: rgba(255,255,255,0.01); padding: 15px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.03);">
          <h4 style="color: var(--accent-gold); font-size: 0.95rem; margin-bottom: 8px; font-family: 'Inter', sans-serif; font-weight: 700;">${b.toUpperCase()}</h4>
          <p style="font-size: 0.9rem; color: #ccc; line-height: 1.6; font-family: 'Roboto Condensed', sans-serif;">${Q(f)}</p>
        </div>
        `}).join("")}
    </div>

    ${c?`
    <div class="critless-note" style="margin-top: 16px; background: rgba(255, 255, 255, 0.02); padding: 12px; border-radius: 8px; border: 1px solid rgba(212, 168, 75, 0.15); cursor: pointer;" onclick="document.querySelectorAll('.marquee-disclaimer-overlay, .marquee-disclaimer-modal').forEach(el => el.remove()); showCritlessDisclaimer();">
      <h4 style="color: var(--accent-gold); font-size: 0.85rem; margin-bottom: 4px; display: flex; align-items: center; gap: 8px;">
        <i class="fas fa-shield-alt"></i> ${i("profile.critlessRecommended")}
      </h4>
      <p style="font-size: 0.8rem; color: #aaa; line-height: 1.4;">
        ${i("profile.critlessClick")}
      </p>
    </div>
    `:""}

    <div style="margin-top: 20px; text-align: center;">
      <button onclick="document.querySelectorAll('.marquee-disclaimer-overlay, .marquee-disclaimer-modal').forEach(el => el.remove());" style="
        background: transparent; color: #aaa; border: 1px solid rgba(255,255,255,0.2); padding: 8px 30px;
        border-radius: 20px; font-weight: 600; cursor: pointer; transition: all 0.2s; font-size: 0.75rem; text-transform: uppercase;
      " onmouseover="this.style.borderColor='var(--accent-gold)'; this.style.color='#fff'" onmouseout="this.style.borderColor='rgba(255,255,255,0.2)'; this.style.color='#aaa'">
        ${i("profile.close")}
      </button>
    </div>
  </div>
  <div class="marquee-disclaimer-overlay" onclick="document.querySelector('.marquee-disclaimer-overlay').remove(); document.querySelector('.marquee-disclaimer-modal').remove();" style="
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.85); z-index: 10000; backdrop-filter: blur(4px);
  "></div>
  `,p=document.createElement("div");p.className="disclaimer-overlay-wrapper",p.innerHTML=d,document.querySelectorAll(".marquee-disclaimer-overlay, .marquee-disclaimer-modal").forEach(u=>u.remove()),document.body.appendChild(p.querySelector(".marquee-disclaimer-overlay")),document.body.appendChild(p.querySelector(".marquee-disclaimer-modal"))}function Qo(){const e=Te("critless");if(!e)return;const a=`
  <div class="critless-disclaimer-modal" style="
    position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
    background: #0d0d12; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px;
    padding: 24px; z-index: 10002; max-width: 500px; width: 90%;
    box-shadow: 0 30px 90px rgba(0,0,0,1); color: #fff;
    max-height: 85vh; overflow-y: auto;
  ">
    <div style="border-bottom: 1px solid rgba(255, 255, 255, 0.05); padding-bottom: 15px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">
      <h3 style="color: #fff; margin: 0; font-size: 1.1rem; display: flex; align-items: center; gap: 10px; font-family: 'Dodam', sans-serif;">
        <i class="fas fa-shield-alt" style="color: var(--accent-gold);"></i> ${i("tooltip.critlessGuide")}
      </h3>
      <button onclick="document.querySelectorAll('.critless-disclaimer-overlay, .critless-disclaimer-modal').forEach(el => el.remove());"
        style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); color: #fff; cursor: pointer; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: all 0.2s; padding: 0;"
        onmouseover="this.style.background='rgba(255, 255, 255, 0.1)'; this.style.borderColor='rgba(255, 255, 255, 0.3)';"
        onmouseout="this.style.background='rgba(255, 255, 255, 0.05)'; this.style.borderColor='rgba(255, 255, 255, 0.1)';">
        <i class="fas fa-times" style="font-size: 1rem;"></i>
      </button>
    </div>

    <div class="critless-explanation" style="font-size: 0.92rem; color: #bbb; line-height: 1.6; font-family: 'Roboto Condensed', sans-serif;">
      ${Q(e.explicacao)}
    </div>
  </div>
  <div class="critless-disclaimer-overlay" onclick="document.querySelectorAll('.critless-disclaimer-overlay, .critless-disclaimer-modal').forEach(el => el.remove());" style="
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.8); z-index: 10001; backdrop-filter: blur(4px);
  "></div>
  `,t=document.createElement("div");t.className="disclaimer-overlay-wrapper",t.innerHTML=a,document.querySelectorAll(".critless-disclaimer-overlay, .critless-disclaimer-modal").forEach(o=>o.remove()),document.body.appendChild(t.querySelector(".critless-disclaimer-overlay")),document.body.appendChild(t.querySelector(".critless-disclaimer-modal"))}async function Wo(e){try{const t=await(await fetch("data/krazete/stanleyDB-catalysts.json")).json();let o=null;for(const r in t)if(t[r].name&&t[r].name.toLowerCase()===e.toLowerCase()){o=t[r];break}if(!o){console.warn("Catalyst not found:",e);return}const s=`
            <div class="catalyst-disclaimer-modal" style="
                position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
                background: #0d0d12; border: 1px solid rgba(156, 39, 176, 0.4); border-radius: 12px;
                padding: 24px; z-index: 10002; max-width: 500px; width: 90%; 
                box-shadow: 0 30px 90px rgba(0,0,0,1); color: #fff;
                max-height: 85vh; overflow-y: auto;
            ">
                <div style="border-bottom: 1px solid rgba(255, 255, 255, 0.05); padding-bottom: 15px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">
                    <h3 style="color: #fff; margin: 0; font-size: 1.1rem; display: flex; align-items: center; gap: 10px; font-family: 'Dodam', sans-serif;">
                        <i class="fas fa-flask" style="color: #e1bee7;"></i> DETALHES DO CATALISADOR
                    </h3>
                    <button onclick="document.querySelectorAll('.catalyst-disclaimer-overlay, .catalyst-disclaimer-modal').forEach(el => el.remove());" 
                        style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); color: #fff; cursor: pointer; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: all 0.2s; padding: 0; font-size: 1.2rem; font-weight: bold;" 
                        onmouseover="this.style.background='rgba(255, 255, 255, 0.1)'; this.style.borderColor='rgba(255, 255, 255, 0.3)';" 
                        onmouseout="this.style.background='rgba(255, 255, 255, 0.05)'; this.style.borderColor='rgba(255, 255, 255, 0.1)';">
                        ✕
                    </button>
                </div>

                <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
                    <img src="${o.image}" alt="${o.name}" style="width: 60px; height: 60px; object-fit: contain; filter: drop-shadow(0 2px 5px rgba(0,0,0,0.5));" onerror="this.style.display='none'">
                    <h4 style="color: #e1bee7; font-size: 1.2rem; margin: 0; font-family: 'Inter', sans-serif; font-weight: 700;">${o.name.toUpperCase()}</h4>
                </div>

                <div class="catalyst-explanation" style="font-size: 0.92rem; color: #bbb; line-height: 1.6; font-family: 'Roboto Condensed', sans-serif; background: rgba(156, 39, 176, 0.05); padding: 15px; border-radius: 8px; border: 1px solid rgba(156, 39, 176, 0.15);">
                    ${[o.SA1,o.SA2,o.SA3].filter(Boolean).map(r=>r.replace(/\b(?:\d+(?:\.\d+)?\/)+(\d+(?:\.\d+)?)\b/g,"$1")).join("<br><br>")}
                </div>
            </div>
            <div class="catalyst-disclaimer-overlay" onclick="document.querySelectorAll('.catalyst-disclaimer-overlay, .catalyst-disclaimer-modal').forEach(el => el.remove());" style="
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.8); z-index: 10001; backdrop-filter: blur(4px);
            "></div>
        `,n=document.createElement("div");n.className="disclaimer-overlay-wrapper",n.innerHTML=s,document.querySelectorAll(".catalyst-disclaimer-overlay, .catalyst-disclaimer-modal").forEach(r=>r.remove()),document.body.appendChild(n.querySelector(".catalyst-disclaimer-overlay")),document.body.appendChild(n.querySelector(".catalyst-disclaimer-modal"))}catch(a){console.error("Failed to load catalyst data:",a)}}window.showMarqueeDisclaimer=jo;window.showCritlessDisclaimer=Qo;window.showCatalystDisclaimer=Wo;window.openProfileModal=Lo;window.closeProfileModal=vt;window.handleProfileOverlayClick=Po;window.switchProfileModalTab=Mo;window.toggleProfileBio=Vo;window.toggleProfileAbilities=Ho;window.toggleMoveDetail=zo;function Rt(){const e=Z();if(!e)return[];const a=[];for(const[t,o]of Object.entries(e))pe(o.variants).forEach(n=>{a.push({...n,_charKey:t,_charName:o.character})});return a}function Ko(e,a="builds"){if(e==="todos")return Yo(a);const t=ee(e);if(!t)return`
            <section class="section character-detail">
                <div class="section-header">
                    <button class="btn-back" onclick="navigateTo('')">
                        ←
                    </button>
                    <h2>${i("detail.characterNotFound")}</h2>
                </div>
            </section>
        `;const s=F().currentTab||a;return`
        <section class="section character-detail" id="character-detail" style="--char-accent: ${na[t.element]}" data-current-tab="${s}">
            <!-- Header Content -->
            <div class="character-detail-header fade-in">
                <div class="header-top-row">
                    <div class="header-left">
                        <button class="btn-back pill" onclick="navigateTo('')">
                            <span style="font-size: 1.2rem; line-height: 1;">&#8592;</span>
                        </button>
                    </div>
                    
                    <div class="char-title-row centered-title">
                        <img loading="lazy" src="${sa[e]||"img/official/Annie_Icon.webp"}" alt="${z(t.character)}" class="char-select-icon"
                             onerror="this.src='img/official/Annie_Icon.webp'">
                        <h2>${z(t.character).charAt(0).toUpperCase()+z(t.character).slice(1)}</h2>
                    </div>
                    
                    <div class="header-right">
                        ${s!=="tier"?ca():""}
                    </div>
                </div>
                
                <div class="header-middle-row">
                    <button class="char-info-btn-centered" onclick="openProfileModal('${e}')" title="${i("detail.aboutChar")} ${z(t.character)}">
                        <img src="img/official/IconInfo.webp" alt="Info" class="char-info-icon-centered">
                        <span>${i("detail.profileOf")} ${z(t.character).charAt(0).toUpperCase()+z(t.character).slice(1)}</span>
                    </button>
                </div>
                
                <div class="header-bottom-row">
                    <!-- Tab Navigation -->
                    <div class="detail-tabs">
                        <button class="tab-btn ${s==="builds"?"active":""}" 
                                onclick="switchDetailTab('${e}', 'builds')" data-tab="builds">
                            ${i("variant.builds")}
                        </button>
                        <button class="tab-btn ${s==="tier"?"active":""}" 
                                onclick="switchDetailTab('${e}', 'tier')" data-tab="tier">
                            ${i("variant.tierList")}
                        </button>
                    </div>
                </div>
            </div>

            <div id="variants-count-container" style="display: flex; justify-content: flex-end; width: 100%; margin-bottom: 4px;">
                <p class="variants-count" id="variants-count"></p>
            </div>
            ${da()}

            <div class="detail-content" id="detail-content">
                ${s==="builds"?St(e,t):Tt(e,t)}
            </div>

            ${Go(e)}
        </section>
    `}function Yo(e="builds"){const t=F().currentTab||e;return`
        <section class="section character-detail" id="character-detail" style="--char-accent: var(--accent-gold)" data-current-tab="${t}" data-todos-mode="true">
            <!-- Header Content -->
            <div class="character-detail-header fade-in">
                <div class="header-top-row">
                    <div class="header-left">
                        <button class="btn-back pill" onclick="navigateTo('')">
                            <span style="font-size: 1.2rem; line-height: 1;">&#8592;</span>
                        </button>
                    </div>
                    
                    <div class="char-title-row centered-title">
                        <h2>${i("detail.allVariants")}</h2>
                    </div>
                    
                    <div class="header-right">
                        ${t!=="tier"?ca():""}
                    </div>
                </div>
                
                <div class="header-bottom-row" style="margin-top: 16px;">
                    <!-- Tab Navigation -->
                    <div class="detail-tabs">
                        <button class="tab-btn ${t==="builds"?"active":""}" 
                                onclick="switchDetailTab('todos', 'builds')" data-tab="builds">
                            BUILDS
                        </button>
                        <button class="tab-btn ${t==="tier"?"active":""}" 
                                onclick="switchDetailTab('todos', 'tier')" data-tab="tier">
                            TIER LIST
                        </button>
                    </div>
                </div>
            </div>

            <div id="variants-count-container" style="display: flex; justify-content: flex-end; width: 100%; margin-bottom: 4px;">
                <p class="variants-count" id="variants-count"></p>
            </div>
            ${da()}

            <div class="detail-content" id="detail-content">
                ${t==="tier"?wt():Ot()}
            </div>
        </section>
    `}function wt(){const e=Z();if(!e)return"<p>Carregando...</p>";const t=Object.keys(e).sort((s,n)=>e[s].character.localeCompare(e[n].character))[0]||"annie",o=e[t];return o?`
            <div class="tier-tab-content">
                ${At(t,o)}
            </div>
        `:'<p style="color: var(--text-muted); text-align: center;">Nenhuma tier list disponível.</p>'}function Ot(){const e=F(),{filters:a,sort:t}=e.tabState.builds;let o=Rt();o=Ne(o,a),o=Fe(o,t,a);let s="";return o.length===0?s='<p style="color: var(--text-muted); padding: 20px; text-align: center;">Nenhuma variante encontrada com estes filtros.</p>':s='<div class="variants-grid" id="variants-container"></div>',`
        <div class="builds-tab-content">
            ${s}
        </div>
    `}function St(e,a){const t=F(),{filters:o,sort:s}=t.tabState.builds;let n=pe(a.variants);n=Ne(n,o),n=Fe(n,s,o);let r="";return n.length===0?r=`<p style="color: var(--text-muted); padding: 20px; text-align: center;">${i("detail.noVariantsFilters")}</p>`:r='<div class="variants-grid" id="variants-container"></div>',`
        <div class="builds-tab-content">
            ${r}
        </div>
    `}function Tt(e,a){return`
        <div class="tier-tab-content">
            ${At(e,a)}
        </div>
    `}let oi=null;async function Xo(e,a="builds"){const{resetAllFilters:t}=await re(async()=>{const{resetAllFilters:o}=await Promise.resolve().then(()=>ao);return{resetAllFilters:o}},void 0);e!==oi&&(t(),oi=e),wi(e),await Ue(e,a),ue()}function $e(e){const a=F(),{filters:t,sort:o}=a.tabState.builds;let s;if(e==="todos")s=Rt();else{const r=ee(e);if(!r)return;s=pe(r.variants)}s=Ne(s,t),s=Fe(s,o,t);const n=document.getElementById("variants-count");n&&(n.textContent=`${s.length} variantes encontradas`),Co("variants-container",s,e)}async function Ue(e,a){if(e==="todos"&&a==="tier"){const{getCharacters:r}=await re(async()=>{const{getCharacters:u}=await Promise.resolve().then(()=>io);return{getCharacters:u}},void 0),l=r(),d=Object.keys(l).sort((u,m)=>l[u].character.localeCompare(l[m].character))[0]||"annie",{navigateTo:p}=await re(async()=>{const{navigateTo:u}=await Promise.resolve().then(()=>zs);return{navigateTo:u}},void 0);return p(`character/${d}/tier`)}F(),Si(a),document.querySelectorAll(".tab-btn").forEach(r=>{r.classList.toggle("active",r.dataset.tab===a)});const t=document.getElementById("character-detail");t&&(t.dataset.currentTab=a);const o=document.getElementById("detail-content"),s=document.getElementById("variants-count-container");if(s&&(s.style.display=a==="builds"?"flex":"none"),o)if(e==="todos")a==="tier"?o.innerHTML=wt():(o.innerHTML=Ot(),$e("todos"));else{const r=ee(e);r&&(o.innerHTML=a==="builds"?St(e,r):Tt(e,r),a==="builds"&&$e(e))}ot(e,a);const{updateFilterUI:n}=await re(async()=>{const{updateFilterUI:r}=await Promise.resolve().then(()=>ko);return{updateFilterUI:r}},void 0);n()}window.switchDetailTab=Ue;const ua=Object.freeze(Object.defineProperty({__proto__:null,init:Xo,refreshVariants:$e,render:Ko,switchTab:Ue},Symbol.toStringTag,{value:"Module"}));function Jo(){return`
	<section class="section catalysts-section" id="catalysts">
		<div class="section-header">
			<button class="btn-back" onclick="navigateTo('')">
				←
			</button>
			<h2>${i("catalysts.title")}</h2>
		</div>

		<div class="catalysts-intro">
			<p>${i("catalysts.intro")}</p>
		</div>

		<!-- Catalysts of the Week Section -->
		<div class="cotw-section">
			<h2 class="catalyst-title-main">${i("catalysts.weekModifiers")}</h2>
			<div class="cotw-filters">
				<button class="cotw-filter-btn" data-element="fire">
					<img loading="lazy" src="img/official/ElementalFireBackless.webp" alt="${O("Fogo")}">
					<span>${O("Fogo")}</span>
				</button>
				<button class="cotw-filter-btn" data-element="water">
					<img loading="lazy" src="img/official/ElementalWaterBackless.webp" alt="${O("Água")}">
					<span>${O("Água")}</span>
				</button>
				<button class="cotw-filter-btn" data-element="wind">
					<img loading="lazy" src="img/official/ElementalWindBackless.webp" alt="${O("Ar")}">
					<span>${O("Ar")}</span>
				</button>
				<button class="cotw-filter-btn" data-element="light">
					<img loading="lazy" src="img/official/ElementalLightBackless.webp" alt="${O("Luz")}">
					<span>${O("Luz")}</span>
				</button>
				<button class="cotw-filter-btn" data-element="dark">
					<img loading="lazy" src="img/official/ElementalDarkBackless.webp" alt="${O("Trevas")}">
					<span>${O("Trevas")}</span>
				</button>
			</div>
			<div class="catalyst-grid" id="cotw-container">
				<p class="info-state" style="text-align: center; margin: 20px 0;">${i("catalysts.selectElement")}</p>
			</div>
		</div>

		<div class="catalyst-categories" id="catalyst-container">
			<!-- Populated by JS -->
			<div class="loading-state">${i("catalysts.loading")}</div>
		</div>
	</section>
	`}let ne=null;async function Zo(){const e=document.getElementById("catalyst-container");if(e){if(ne=await ra(),!ne||!ne.categories){e.innerHTML=`<p class="error-state">${i("catalysts.errorLoad")}</p>`;return}e.innerHTML=ne.categories.map(a=>`
		<div class="catalyst-category ${as(a.category)}">
			<h3>${a.category} ⬇️</h3>
			<div class="catalyst-grid">
				${a.items.map(o=>Ct(o)).join("")}
			</div>
		</div>
		`).join(""),It(),document.querySelectorAll(".cotw-filter-btn").forEach(a=>{a.addEventListener("click",t=>{document.querySelectorAll(".cotw-filter-btn").forEach(s=>s.classList.remove("active"));const o=t.currentTarget;o.classList.add("active"),es(o.dataset.element)})})}}function es(e){const a=document.getElementById("cotw-container");if(!a||!ne)return;const t=[];for(const o of ne.categories){const s=o.items.filter(n=>n.element===e);t.push(...s)}if(t.length===0){a.innerHTML=`<p class="info-state">${i("catalysts.noElementFound")}</p>`;return}a.innerHTML=t.map(o=>Ct(o,!0)).join(""),It()}function as(e){const a=e.toLowerCase();return a.includes("forte")||a.includes("strong")?"cat-strong":a.includes("bom")||a.includes("good")?"cat-good":a.includes("mediano")||a.includes("average")?"cat-medium":a.includes("ruim")||a.includes("weak")?"cat-weak":""}function Ct(e,a=!1){var n,r;const o=((r=(n=F().userPreferences)==null?void 0:n.catalystNotes)==null?void 0:r[e.name])||e.notes||"",s=(e.description||"").replace(/\\n/g,"<br>").replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>");return`
	<div class="catalyst-card ${a?"cotw-card":""}">
		<div class="catalyst-card-header">
			<h4>${e.name}</h4>
			${e.constraint?`<span class="catalyst-constraint">${e.constraint}</span>`:""}
		</div>
		<div class="catalyst-description">
			<p>${s}</p>
		</div>
		<div class="catalyst-note-container">
			<input type="text"
				class="catalyst-note-input"
				placeholder="${i("catalysts.addNotes")}"
				value="${o}"
				data-cat-name="${e.name}">
		</div>
	</div>
	`}function It(){document.querySelectorAll(".catalyst-note-input").forEach(a=>{a.addEventListener("change",t=>{const o=t.target.value,s=t.target.dataset.catName;Gi(s,o)})})}const is=Object.freeze(Object.defineProperty({__proto__:null,init:Zo,render:Jo},Symbol.toStringTag,{value:"Module"}));function ts(){return`
  <section class="section tierlist-section" id="tierlist">
    <div class="section-header">
      <button class="btn-back" onclick="navigateTo('')">
        ←
      </button>
      <h2>${i("tier.tierlistTitle")}</h2>
    </div>

    <div class="tierlist-intro">
      <p>${i("tier.chooseChar")}</p>
    </div>

    <div class="character-grid tierlist-grid" id="tierlistGrid">
      <!-- Populated by JS -->
    </div>
  </section>
  `}function os(){const e=Z();e&&Wi("tierlistGrid",e,"openCharacterTier")}const ss=Object.freeze(Object.defineProperty({__proto__:null,init:os,render:ts},Symbol.toStringTag,{value:"Module"}));function ns(e){return{bronze:i("rarity.bronze"),prata:i("rarity.silver"),ouro:i("rarity.gold"),diamante:i("rarity.diamond")}[e]||e}let L=null;function rs(e){L=e}function ls(){return`
  <div class="calculator-box">
    <!-- TAB BAR -->
    <div class="calc-tab-bar">
      <button class="calc-tab active" data-tab="ganhos" onclick="switchCalcTab('ganhos')"><img loading="lazy" src="img/official/CanopyCoin.webp" style="height: 1.8em; vertical-align: -0.4em; margin-right: 0.2rem;" alt="${i("calc.altCoins")}"> ${i("calc.earnings")}</button>
      <button class="calc-tab" data-tab="custos" onclick="switchCalcTab('custos')">📈 ${i("calc.costs")}</button>
    </div>

    <!-- ========== TAB: GANHOS ========== -->
    <div class="calc-tab-content active" id="tab-ganhos">
      <div class="calc-layout">
        <div class="calc-controls">
          <div class="calc-form">
            <!-- Fixed Earnings Section -->
            <div class="calc-section">
              <h4>📅 ${i("calc.fixedSources")}</h4>
              <div class="toggle-group" id="fixed-toggles">
                <button class="toggle-btn active" data-source="diarias" data-type="fixed">
                  ${i("calc.dailyEvents")}
                </button>
                <button class="toggle-btn active" data-source="calendario" data-type="fixed">
                  ${i("calc.calendar")}
                </button>
                <button class="toggle-btn active" data-source="site" data-type="fixed">
                  ${i("calc.site")}
                </button>
                <button class="toggle-btn active" data-source="guildaDiaria" data-type="fixed">
                  ${i("calc.guildMissions")}
                </button>
              </div>
            </div>

            <!-- Battle Pass Section -->
            <div class="calc-section">
              <h4>🎫 ${i("calc.battlePass")}</h4>
              <div class="toggle-group exclusive" id="passe-toggles">
                <button class="toggle-btn active" data-source="gratis" data-type="passe">${i("calc.free")}</button>
                <button class="toggle-btn" data-source="premium" data-type="passe">${i("calc.premium")}</button>
              </div>
            </div>

            <!-- Prize Fights Section -->
            <div class="calc-section">
              <h4>📊 ${i("calc.prizeFights")}</h4>

              <span class="toggle-label">${i("calc.pfCharacter")}</span>
              <div class="toggle-group exclusive" id="dp-faixa-toggles">
                <button class="toggle-btn" data-source="bronze" data-type="dpFaixa"><img loading="lazy" src="img/official/icone_bronze.webp" style="height: 1.2em; vertical-align: -0.2em; margin-right: 0.2rem;" alt="${i("rarity.bronze")}"> ${i("rarity.bronze")}</button>
                <button class="toggle-btn" data-source="prata" data-type="dpFaixa"><img loading="lazy" src="img/official/icone_prata.webp" style="height: 1.2em; vertical-align: -0.2em; margin-right: 0.2rem;" alt="${i("rarity.silver")}"> ${i("rarity.silver")}</button>
                <button class="toggle-btn" data-source="ouro" data-type="dpFaixa"><img loading="lazy" src="img/official/icone_ouro.webp" style="height: 1.2em; vertical-align: -0.2em; margin-right: 0.2rem;" alt="${i("rarity.gold")}"> ${i("rarity.gold")}</button>
                <button class="toggle-btn active" data-source="diamante" data-type="dpFaixa"><img loading="lazy" src="img/official/icone_diamante.webp" style="height: 1.2em; vertical-align: -0.2em; margin-right: 0.2rem;" alt="${i("rarity.diamond")}"> ${i("rarity.diamond")}</button>
                <button class="toggle-btn off" data-source="nenhum" data-type="dpFaixa">${i("calc.noParticipate")}</button>
              </div>

              <span class="toggle-label">${i("calc.pfRanking")}</span>
              <div class="toggle-group exclusive" id="dp-rank-toggles">
                <button class="toggle-btn" data-source="top10percent" data-type="dpRank">${i("calc.top10")}</button>
                <button class="toggle-btn active" data-source="top30percent" data-type="dpRank">${i("calc.top30")}</button>
                <button class="toggle-btn" data-source="top60percent" data-type="dpRank">${i("calc.top60")}</button>
              </div>

              <span class="toggle-label">${i("calc.pfMonthly")}</span>
              <div class="toggle-group" id="dp-mensal-toggles">
                <button class="toggle-btn active" data-source="mensal" data-type="dpMensal">
                  ${i("calc.pfParticipate")}
                </button>
              </div>

              <span class="toggle-label">${i("calc.pfMedicis")}</span>
              <div class="toggle-group exclusive" id="dp-medicis-toggles">
                <button class="toggle-btn" data-source="top100" data-type="dpMedicis">${i("calc.top100")}</button>
                <button class="toggle-btn active" data-source="top10percent" data-type="dpMedicis">${i("calc.top10")}</button>
                <button class="toggle-btn off" data-source="nenhum" data-type="dpMedicis">${i("calc.noParticipate")}</button>
              </div>
            </div>

            <!-- Parallel Realms Section -->
            <div class="calc-section">
              <h4>🏰 ${i("calc.parallelRealms")}</h4>
              <span class="toggle-label">${i("calc.difficulty")}</span>
              <div class="toggle-group exclusive" id="reinos-dif-toggles">
                <button class="toggle-btn" data-source="basico" data-type="reinosDif">${i("calc.basic")}</button>
                <button class="toggle-btn" data-source="avancado" data-type="reinosDif">${i("calc.advanced")}</button>
                <button class="toggle-btn" data-source="especialista" data-type="reinosDif">${i("calc.expert")}</button>
                <button class="toggle-btn" data-source="mestre" data-type="reinosDif">${i("calc.master")}</button>
                <button class="toggle-btn" data-source="pesadelo" data-type="reinosDif">${i("calc.nightmare")}</button>
                <button class="toggle-btn active" data-source="semDo" data-type="reinosDif">${i("calc.noMercy")}</button>
                <button class="toggle-btn off" data-source="nenhum" data-type="reinosDif">${i("calc.noParticipate")}</button>
              </div>
              <span class="toggle-label">${i("calc.completeness")}</span>
              <div class="toggle-group exclusive" id="reinos-comp-toggles">
                <button class="toggle-btn" data-source="min" data-type="reinosComp">${i("calc.minimum")}</button>
                <button class="toggle-btn active" data-source="max" data-type="reinosComp">${i("calc.maximum")}</button>
              </div>
            </div>

            <!-- Guilds Section -->
            <div class="calc-section">
              <h4>👥 ${i("calc.guild")}</h4>
              <div class="toggle-group" id="guilda-eventos-toggles">
                <button class="toggle-btn active" data-source="eventos" data-type="guildaEventos">
                  ${i("calc.guildEvents")}
                </button>
              </div>

              <span class="toggle-label">${i("calc.battleTier")}</span>
              <div class="toggle-group exclusive" id="guilda-tier-toggles">
                <button class="toggle-btn" data-source="bronze" data-type="guildaTier"><img loading="lazy" src="img/official/icone_bronze.webp" style="height: 1.2em; vertical-align: -0.2em; margin-right: 0.2rem;" alt="${i("rarity.bronze")}"> ${i("rarity.bronze")}</button>
                <button class="toggle-btn" data-source="prata" data-type="guildaTier"><img loading="lazy" src="img/official/icone_prata.webp" style="height: 1.2em; vertical-align: -0.2em; margin-right: 0.2rem;" alt="${i("rarity.silver")}"> ${i("rarity.silver")}</button>
                <button class="toggle-btn" data-source="ouro" data-type="guildaTier"><img loading="lazy" src="img/official/icone_ouro.webp" style="height: 1.2em; vertical-align: -0.2em; margin-right: 0.2rem;" alt="${i("rarity.gold")}"> ${i("rarity.gold")}</button>
                <button class="toggle-btn active" data-source="diamante" data-type="guildaTier"><img loading="lazy" src="img/official/icone_diamante.webp" style="height: 1.2em; vertical-align: -0.2em; margin-right: 0.2rem;" alt="${i("rarity.diamond")}"> ${i("rarity.diamond")}</button>
                <button class="toggle-btn off" data-source="nenhum" data-type="guildaTier">${i("calc.noParticipateGuild")}</button>
              </div>

              <div id="diamante-slider-container" class="slider-container">
                <span class="toggle-label">${i("calc.guildPoints")} <span id="diamante-pontos-display">16000</span></span>
                <input type="range" id="diamante-pontos-slider" min="16000" max="30000" step="1000" value="16000" oninput="updateDiamanteSlider(this.value)">
                <div class="slider-labels">
                  <span>16k</span>
                  <span>30k</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="calc-divider"></div>

        <div class="calc-results">
          <div id="earnings-result" class="result-box">
            <h4><img loading="lazy" src="img/official/Theonite.webp" style="height: 1.8em; vertical-align: -0.4em; margin-right: 0.2rem;" alt="${i("calc.altTheonite")}"> ${i("calc.estimatedResult")}</h4>
            <div class="result-grid">
              <div class="result-card coins">
                <span class="result-label">${i("calc.monthlyCoins")}</span>
                <span class="result-value" id="result-coins">-</span>
                <span class="result-sub">≈ <span id="result-coins-week">-</span>${i("calc.perWeek")}</span>
              </div>
              <div class="result-card teonita">
                <span class="result-label">${i("calc.monthlyTheonite")}</span>
                <span class="result-value" id="result-teonita">-</span>
                <span class="result-sub">≈ <span id="result-teonita-week">-</span>${i("calc.perWeek")}</span>
              </div>
            </div>
            <div id="earnings-breakdown" class="breakdown-box"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- ========== TAB: CUSTOS ========== -->
    <div class="calc-tab-content" id="tab-custos">
      <div class="calc-layout">
        <div class="calc-controls">
          <div class="calc-form">
            <!-- GOLPES SECTION -->
            <div class="calc-section">
              <h4>⚔️ ${i("calc.moves")}</h4>

              <span class="toggle-label">${i("calc.moveRarity")}</span>
              <div class="toggle-group exclusive" id="golpe-raridade-toggles">
                <button class="toggle-btn" data-source="bronze" data-type="golpeRaridade"><img loading="lazy" src="img/official/icone_bronze.webp" style="height: 1.2em; vertical-align: -0.2em; margin-right: 0.2rem;" alt="${i("rarity.bronze")}"> ${i("rarity.bronze")}</button>
                <button class="toggle-btn" data-source="prata" data-type="golpeRaridade"><img loading="lazy" src="img/official/icone_prata.webp" style="height: 1.2em; vertical-align: -0.2em; margin-right: 0.2rem;" alt="${i("rarity.silver")}"> ${i("rarity.silver")}</button>
                <button class="toggle-btn" data-source="ouro" data-type="golpeRaridade"><img loading="lazy" src="img/official/icone_ouro.webp" style="height: 1.2em; vertical-align: -0.2em; margin-right: 0.2rem;" alt="${i("rarity.gold")}"> ${i("rarity.gold")}</button>
                <button class="toggle-btn active" data-source="diamante" data-type="golpeRaridade"><img loading="lazy" src="img/official/icone_diamante.webp" style="height: 1.2em; vertical-align: -0.2em; margin-right: 0.2rem;" alt="${i("rarity.diamond")}"> ${i("rarity.diamond")}</button>
                <button class="toggle-btn off" data-source="nenhum" data-type="golpeRaridade">${i("calc.noMoves")}</button>
              </div>

              <div class="toggle-group" id="golpe-shiny-toggle">
                <button class="toggle-btn" data-source="shiny" data-type="golpeShiny">✨ ${i("calc.shinyDiscount")}</button>
              </div>

              <span class="toggle-label">${i("calc.desiredLevel")}</span>
              <div class="toggle-group exclusive" id="golpe-nivel-toggles">
                <button class="toggle-btn" data-source="9" data-type="golpeNivel">${i("calc.lv")} 9</button>
                <button class="toggle-btn" data-source="12" data-type="golpeNivel">${i("calc.lv")} 12</button>
                <button class="toggle-btn active" data-source="15" data-type="golpeNivel">${i("calc.lv")} 15</button>
                <button class="toggle-btn" data-source="custom" data-type="golpeNivel">${i("calc.custom")}</button>
              </div>

              <div id="golpe-slider-container" class="slider-container" style="display: none;">
                <span class="toggle-label">${i("calc.level")} <span id="golpe-nivel-display">2</span></span>
                <input type="range" id="golpe-nivel-slider" min="2" max="15" step="1" value="2" oninput="updateGolpeSlider(this.value)">
                <div class="slider-labels">
                  <span>2</span>
                  <span>15</span>
                </div>
              </div>

              <span class="toggle-label">${i("calc.initialLevel")}</span>
              <div id="golpe-nivel-inicial-container" class="slider-container">
                <span class="toggle-label">${i("calc.level")} <span id="golpe-nivel-inicial-display">1</span></span>
                <input type="range" id="golpe-nivel-inicial-slider" min="1" max="14" step="1" value="1" oninput="updateGolpeInicialSlider(this.value)">
                <div class="slider-labels">
                  <span>1</span>
                  <span id="golpe-nivel-inicial-max-label">14</span>
                </div>
              </div>
            </div>

            <!-- ASTROS SECTION -->
            <div class="calc-section">
              <h4>⭐ ${i("calc.astros")}</h4>

              <span class="toggle-label">${i("calc.astroRarity")}</span>
              <div class="toggle-group exclusive" id="astro-raridade-toggles">
                <button class="toggle-btn" data-source="bronze" data-type="astroRaridade"><img loading="lazy" src="img/official/icone_bronze.webp" style="height: 1.2em; vertical-align: -0.2em; margin-right: 0.2rem;" alt="${i("rarity.bronze")}"> ${i("rarity.bronze")} (${i("calc.lv")} 5)</button>
                <button class="toggle-btn" data-source="prata" data-type="astroRaridade"><img loading="lazy" src="img/official/icone_prata.webp" style="height: 1.2em; vertical-align: -0.2em; margin-right: 0.2rem;" alt="${i("rarity.silver")}"> ${i("rarity.silver")} (${i("calc.lv")} 10)</button>
                <button class="toggle-btn" data-source="ouro" data-type="astroRaridade"><img loading="lazy" src="img/official/icone_ouro.webp" style="height: 1.2em; vertical-align: -0.2em; margin-right: 0.2rem;" alt="${i("rarity.gold")}"> ${i("rarity.gold")} (${i("calc.lv")} 15)</button>
                <button class="toggle-btn active" data-source="diamante" data-type="astroRaridade"><img loading="lazy" src="img/official/icone_diamante.webp" style="height: 1.2em; vertical-align: -0.2em; margin-right: 0.2rem;" alt="${i("rarity.diamond")}"> ${i("rarity.diamond")} (${i("calc.lv")} 20)</button>
                <button class="toggle-btn" data-source="custom" data-type="astroRaridade">${i("calc.custom")}</button>
                <button class="toggle-btn off" data-source="nenhum" data-type="astroRaridade">${i("calc.noAstro")}</button>
              </div>

              <div class="toggle-group" id="astro-shiny-toggle">
                <button class="toggle-btn" data-source="shiny" data-type="astroShiny">✨ ${i("calc.shinyDiscount")}</button>
              </div>

              <div id="astro-slider-container" class="slider-container" style="display: none;">
                <span class="toggle-label">${i("calc.level")} <span id="astro-nivel-display">2</span></span>
                <input type="range" id="astro-nivel-slider" min="2" max="20" step="1" value="2" oninput="updateAstroSlider(this.value)">
                <div class="slider-labels">
                  <span>2</span>
                  <span>20</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="calc-divider"></div>

        <div class="calc-results">
          <div id="build-cost-result" class="result-box">
            <h4><img loading="lazy" src="img/official/CanopyCoin.webp" style="height: 1.8em; vertical-align: -0.4em; margin-right: 0.2rem;" alt="${i("calc.altCoins")}"> ${i("calc.totalBuildCost")}</h4>
            <div id="build-cost-breakdown" class="breakdown-box styled"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `}function cs(e){document.querySelectorAll(".calc-tab").forEach(a=>{a.classList.toggle("active",a.dataset.tab===e)}),document.querySelectorAll(".calc-tab-content").forEach(a=>{a.classList.toggle("active",a.id===`tab-${e}`)}),e==="ganhos"?qe():e==="custos"&&me()}function ds(e){const a=document.getElementById("golpe-nivel-display");a&&(a.textContent=e),Le(parseInt(e)),me()}function ps(e){const a=document.getElementById("golpe-nivel-inicial-display");a&&(a.textContent=e),me()}function Le(e){const a=document.getElementById("golpe-nivel-inicial-slider"),t=document.getElementById("golpe-nivel-inicial-display"),o=document.getElementById("golpe-nivel-inicial-max-label");if(!a)return;const s=Math.max(1,e-1);a.max=s,parseInt(a.value)>s&&(a.value=s),t&&(t.textContent=a.value),o&&(o.textContent=s)}function us(e){const a=document.getElementById("astro-nivel-display");a&&(a.textContent=e),me()}function ms(){var o;const e=s=>s.closest("#tab-custos")?"custos":"ganhos";document.querySelectorAll(".toggle-group").forEach(s=>{const n=s.classList.contains("exclusive");s.querySelectorAll(".toggle-btn").forEach(r=>{r.addEventListener("click",()=>{var c;if(n?(s.querySelectorAll(".toggle-btn").forEach(d=>d.classList.remove("active")),r.classList.add("active")):r.classList.toggle("active"),s.id==="guilda-tier-toggles"){const d=document.getElementById("diamante-slider-container");d&&(d.style.display=r.dataset.source==="diamante"?"block":"none")}if(s.id==="golpe-nivel-toggles"){const d=document.getElementById("golpe-slider-container");d&&(d.style.display=r.dataset.source==="custom"?"block":"none");let p;r.dataset.source==="custom"?p=parseInt(((c=document.getElementById("golpe-nivel-slider"))==null?void 0:c.value)||"2"):p=parseInt(r.dataset.source),Le(p)}if(s.id==="astro-raridade-toggles"){const d=document.getElementById("astro-slider-container");d&&(d.style.display=r.dataset.source==="custom"?"block":"none")}e(s)==="custos"?me():qe()})})});const a=(s,n,r)=>{const l=document.getElementById(s),c=document.getElementById(n);if(l&&c){const d=l.querySelector(".toggle-btn.active");c.style.display=(d==null?void 0:d.dataset.source)===r?"block":"none"}};a("guilda-tier-toggles","diamante-slider-container","diamante"),a("golpe-nivel-toggles","golpe-slider-container","custom"),a("astro-raridade-toggles","astro-slider-container","custom");const t=H("golpe-nivel-toggles");if(t&&t!=="custom")Le(parseInt(t));else if(t==="custom"){const s=parseInt(((o=document.getElementById("golpe-nivel-slider"))==null?void 0:o.value)||"2");Le(s)}}function gs(e){const a=document.getElementById("diamante-pontos-display");a&&(a.textContent=parseInt(e).toLocaleString(y()==="en"?"en-US":"pt-BR")),qe()}function H(e){const a=document.getElementById(e);if(!a)return null;const t=a.querySelector(".toggle-btn.active");return t?t.dataset.source:null}function X(e,a){const t=document.getElementById(e);if(!t)return!1;const o=t.querySelector(`.toggle-btn[data-source="${a}"]`);return o?o.classList.contains("active"):!1}function ia(e){const a={bronze:"rarity.bronze",prata:"rarity.silver",ouro:"rarity.gold",diamante:"rarity.diamond"};return a[e]?i(a[e]):e.charAt(0).toUpperCase()+e.slice(1)}function qe(){var T,C,_,B,P,R,E,D,k,I,U,te,Y,ze,Ce,Ie,ge,fe,be,he,Ee,Ae,w,G,q,ve,ma,ga,fa,ba,ha,Ea,Aa,va,ya,Ra,wa,Oa,Sa,Ta,Ca,Ia,Da,ka,_a,Ba,Ga,La,Pa,Ma,$a,xa,Fa,Na,Ua,qa,Va,za;if(!L){console.error("Stats data not loaded");return}const e=L.ganhosFixos||{},a=L.reinosParalelos||{},t=L.disputasPremiadas||{},o=L.guildas||{},s=((T=L.teonitas)==null?void 0:T.fontesMensais)||{};let n=0,r=0;const l=[];if(X("fixed-toggles","diarias")){const v=(((C=e.diarias)==null?void 0:C.valor)||0)*(((B=(_=e.diarias)==null?void 0:_.regra)==null?void 0:B.ocorrenciasMensais)||30);n+=v,r+=((P=s.diarias)==null?void 0:P.valor)||0,l.push({nome:i("calc.dailyEvents"),coins:v,teonita:(R=s.diarias)==null?void 0:R.valor})}if(X("fixed-toggles","calendario")&&(n+=((E=e.calendario)==null?void 0:E.valor)||0,r+=((D=e.calendario)==null?void 0:D.teonita)||0,l.push({nome:i("calc.calendar"),coins:(k=e.calendario)==null?void 0:k.valor,teonita:(I=e.calendario)==null?void 0:I.teonita})),X("fixed-toggles","site")&&(n+=((U=e.site)==null?void 0:U.valor)||0,r+=((te=e.site)==null?void 0:te.teonita)||0,l.push({nome:i("calc.site"),coins:(Y=e.site)==null?void 0:Y.valor,teonita:(ze=e.site)==null?void 0:ze.teonita})),X("fixed-toggles","guildaDiaria")){const v=((Ce=s.guilda)==null?void 0:Ce.valor)||0;r+=v,l.push({nome:i("calc.guildMissions"),teonita:v})}const c=H("passe-toggles");c&&((Ie=e.passe)!=null&&Ie[c])&&(n+=e.passe[c].valor||0,r+=e.passe[c].teonita||0,l.push({nome:`${i("calc.battlePass")} (${i(c==="gratis"?"calc.free":"calc.premium")})`,coins:e.passe[c].valor,teonita:e.passe[c].teonita}));const d=H("dp-faixa-toggles"),p=H("dp-rank-toggles");if(d&&d!=="nenhum"&&p){const v=((he=(be=(fe=(ge=t.personagem)==null?void 0:ge[d])==null?void 0:fe.rankings)==null?void 0:be.padrao)==null?void 0:he.canopyCoins)||0,M=((G=(w=(Ae=(Ee=t.personagem)==null?void 0:Ee[d])==null?void 0:Ae.rankings)==null?void 0:w[p])==null?void 0:G.canopyCoins)||0,W=((ve=(q=t.personagem)==null?void 0:q.regra)==null?void 0:ve.ocorrenciasMensais)||9,V=(v+M)*W;n+=V;const ye=((ba=(fa=(ga=(ma=t.personagem)==null?void 0:ma[d])==null?void 0:ga.rankings)==null?void 0:fa.padrao)==null?void 0:ba.teonita)||0,He=((va=(Aa=(Ea=(ha=t.personagem)==null?void 0:ha[d])==null?void 0:Ea.rankings)==null?void 0:Aa[p])==null?void 0:va.teonita)||0,Ha=(ye+He)*W;r+=Ha,l.push({nome:`${i("calc.pf")} ${ia(d)}`,coins:V,teonita:Ha})}if(X("dp-mensal-toggles","mensal")){const v=((wa=(Ra=(ya=t.mensal)==null?void 0:ya.rankings)==null?void 0:Ra.padrao)==null?void 0:wa.canopyCoins)||0,M=((Ta=(Sa=(Oa=t.mensal)==null?void 0:Oa.rankings)==null?void 0:Sa.padrao)==null?void 0:Ta.teonita)||0;n+=v,r+=M,l.push({nome:i("calc.pfMonthly"),coins:v,teonita:M})}const u=H("dp-medicis-toggles");if(u&&u!=="nenhum"){const v=((Da=(Ia=(Ca=t.medicis)==null?void 0:Ca.rankings)==null?void 0:Ia.padrao)==null?void 0:Da.canopyCoins)||0,M=((Ba=(_a=(ka=t.medicis)==null?void 0:ka.rankings)==null?void 0:_a[u])==null?void 0:Ba.canopyCoins)||0,W=((La=(Ga=t.medicis)==null?void 0:Ga.regra)==null?void 0:La.ocorrenciasMensais)||4,V=(v+M)*W;n+=V,l.push({nome:i("calc.pfMedicis"),coins:V})}const m=H("reinos-dif-toggles"),b=H("reinos-comp-toggles");if(m&&m!=="nenhum"){const v=b==="max"?"recompensas-maximas":"recompensas-minimas",M=(($a=(Ma=(Pa=a.dificuldades)==null?void 0:Pa[m])==null?void 0:Ma[v])==null?void 0:$a.canopyCoins)||0,W=((xa=a.regra)==null?void 0:xa.ocorrenciasMensais)||9,V=M*W;n+=V;const ye=m==="basico"?i("calc.basic"):m==="avancado"?i("calc.advanced"):m==="especialista"?i("calc.expert"):m==="mestre"?i("calc.master"):m==="pesadelo"?i("calc.nightmare"):m==="semDo"?i("calc.noMercy"):((Na=(Fa=a.dificuldades)==null?void 0:Fa[m])==null?void 0:Na.nome)||m;l.push({nome:`${i("calc.parallelRealms")} (${ye})`,coins:V})}if(X("guilda-eventos-toggles","eventos")){const M=(((qa=(Ua=o.eventos)==null?void 0:Ua.recompensasEvento)==null?void 0:qa.canopyCoins)||0)*4;n+=M,l.push({nome:i("calc.guildEvents"),coins:M})}const f=H("guilda-tier-toggles");if(f&&f!=="nenhum"){const v=(Va=o.batalha)==null?void 0:Va[f];if(v){let M=((za=v.recompensas)==null?void 0:za.canopyCoins)||0;if(f==="diamante"){const V=document.getElementById("diamante-pontos-slider"),ye=parseInt((V==null?void 0:V.value)||"16000"),He=Math.floor((ye-16e3)/1e3);M+=He*25e3}const W=M*4;n+=W,l.push({nome:`${i("calc.guild")} (${ns(f)})`,coins:W})}}const h=document.getElementById("earnings-result");h&&h.classList.remove("hidden"),document.getElementById("result-coins").textContent=x(n),document.getElementById("result-coins-week").textContent=x(Math.round(n/4)),document.getElementById("result-teonita").textContent=x(r),document.getElementById("result-teonita-week").textContent=x(Math.round(r/4));const S=document.getElementById("earnings-breakdown");S&&(S.innerHTML=`
    <h5>📊 ${i("calc.breakdown")}</h5>
    <ul>
      ${l.map(v=>`
        <li>
          <span>${v.nome}</span>
          <span>
            ${v.coins?x(v.coins)+" "+i("calc.coins"):""}
            ${v.coins&&v.teonita?" + ":""}
            ${v.teonita?x(v.teonita)+" "+i("calc.theonite"):""}
          </span>
        </li>
      `).join("")}
    </ul>
    `)}function me(){var h,S,T,C,_,B,P;if(!(L!=null&&L.golpes)||!(L!=null&&L.astros)){console.error("Stats data not loaded");return}const e=L.golpes,a=L.astros,t=H("golpe-raridade-toggles")||"diamante",o=X("golpe-shiny-toggle","shiny"),s=H("golpe-nivel-toggles")||"15";let n=null;if(t!=="nenhum"){let R;s==="custom"?R=parseInt(((h=document.getElementById("golpe-nivel-slider"))==null?void 0:h.value)||"2"):R=parseInt(s);const E=parseInt(((S=document.getElementById("golpe-nivel-inicial-slider"))==null?void 0:S.value)||"1");let D=0;for(let Y=E+1;Y<=R;Y++)D+=e.custoPorNivel[String(Y)]||0;const k=D,I=k*5,U=o?"shiny":"normal",te=((C=(T=e.personagemCompleto)==null?void 0:T[t])==null?void 0:C[U])||0;n={nivelAlvo:R,nivelInicial:E,custoUmGolpe:k,custoBuild:I,custoPersonagem:te,raridade:t,isShiny:o}}const r=H("astro-raridade-toggles")||"diamante",l=X("astro-shiny-toggle","shiny");let c=null;if(r!=="nenhum"){let R;r==="custom"?R=parseInt(((_=document.getElementById("astro-nivel-slider"))==null?void 0:_.value)||"2"):R=((P=(B=a.nivelMaxPorRaridade)==null?void 0:B[r])==null?void 0:P.nivelMax)||20;let E=0,D=0;for(let I=2;I<=R;I++){const U=a.custoPorNivel[String(I)];U&&(E+=U.gold||0,D+=U.po||0)}l&&(E=Math.floor(E*.5),D=Math.floor(D*.5));const k=a.custoPorNivel[String(R)]||{gold:0,po:0};c={nivelAlvo:R,gold:E,po:D,custoDoNivel:k,raridade:r==="custom"?i("calc.custom"):ia(r),isShiny:l}}const d=document.getElementById("build-cost-result");d&&d.classList.remove("hidden");const p=document.getElementById("build-cost-breakdown");if(!p)return;const u=((n==null?void 0:n.custoBuild)||0)+((n==null?void 0:n.custoPersonagem)||0)+((c==null?void 0:c.gold)||0),m=(c==null?void 0:c.po)||0;let b='<div class="build-cost-details">';n&&(b+=`
    <div class="cost-section golpes">
      <h5>⚔️ ${i("calc.moves")} ${n.isShiny?"✨":""}</h5>
      <ul>
        <li>
          <span>${i("calc.moveCost")} (Lv${n.nivelInicial}→${n.nivelAlvo})</span>
          <span class="value">${x(n.custoUmGolpe)}</span>
        </li>
        <li>
          <span>${i("calc.moveCostPlural")} (Lv${n.nivelInicial}→${n.nivelAlvo})</span>
          <span class="value">${x(n.custoBuild)}</span>
        </li>
        ${n.custoPersonagem?`
        <li>
          <span>${i("calc.characterRarity")} ${ia(n.raridade)}${n.isShiny?i("calc.shiny"):""}</span>
          <span class="value">${x(n.custoPersonagem)}</span>
        </li>
        `:""}
      </ul>
    </div>
    `),c&&(b+=`
    <div class="cost-section astros">
      <h5>⭐ ${i("calc.astroCost")} ${c.raridade} ${c.isShiny?"✨":""}</h5>
      <ul>
        <li>
          <span>${i("calc.astroCost")} (Lv1→${c.nivelAlvo})</span>
          <span class="value">${x(c.gold)}${c.po>0?` <span class="po">+${x(c.po)} ${i("calc.evolutionPo")}</span>`:""}</span>
        </li>
      </ul>
    </div>
    `),b+=`
  <div class="cost-total">
    <div class="total-row">
      <span class="total-label"><img loading="lazy" src="img/official/CanopyCoin.webp" style="height: 1.8em; vertical-align: -0.4em; margin-right: 0.2rem;" alt="${i("calc.altCoins")}"> ${i("calc.totalCoins")}</span>
      <span class="total-value coins">${x(u)}</span>
    </div>
    ${m>0?`
    <div class="total-row">
      <span class="total-label">🔮 ${i("calc.totalPo")}</span>
      <span class="total-value po">${x(m)}</span>
    </div>
    `:""}
  </div>
  `;const f=[];n!=null&&n.isShiny&&(n!=null&&n.custoPersonagem)&&f.push(`${i("calc.characterRarity")} ${i("calc.shinyNotes")}`),c!=null&&c.isShiny&&f.push(`${i("calc.astroCost")} ${i("calc.shinyNotes")}`),f.length>0&&(b+=`<p class="cost-notes">✨ ${f.join(" • ")}</p>`),b+="</div>",p.innerHTML=b}function ta(){qe()}function fs(){me()}function bs(){return`
  <section class="section statistics-section" id="statistics">
    <div class="section-header">
      <button class="btn-back" onclick="navigateTo('')">
        ←
      </button>
      <h2>${i("calc.title")}</h2>
    </div>

    <div class="stats-intro">
      <div class="intro-card">
        <h3>${i("calc.title")}</h3>
        <p>${i("calc.intro")}</p>
      </div>
    </div>

    <div class="calculators-container">
      ${ls()}
    </div>
  </section>
  `}async function hs(){const e=await xi();e&&(rs(e),ms(),ta()),window.handleCalculateEarnings=ta,window.handleCalculateBuildCost=fs,window.switchCalcTab=cs,window.updateDiamanteSlider=gs,window.updateGolpeSlider=ds,window.updateGolpeInicialSlider=ps,window.updateAstroSlider=us}const Es=Object.freeze(Object.defineProperty({__proto__:null,init:hs,render:bs},Symbol.toStringTag,{value:"Module"}));function As(){return`
  <div class="guide-container fade-in">

    <div class="guide-tabs">
      <button class="guide-tab-btn active" onclick="switchGuideTab('tutorials')">
        📚 ${i("guide.tutorials")}
      </button>
      <button class="guide-tab-btn" onclick="switchGuideTab('statistics')">
        <img loading="lazy" src="img/official/AttackIcon.webp" alt="${i("guide.statistics")}" class="tab-icon">
        ${i("guide.statistics")}
      </button>
      <button class="guide-tab-btn" onclick="switchGuideTab('modifiers')">
        <img loading="lazy" src="img/official/Button_Modifiers.webp" alt="${i("guide.modifiers")}" class="tab-icon">
        ${i("guide.modifiers")}
      </button>
      <button class="guide-tab-btn" onclick="switchGuideTab('catalysts')">
        <img loading="lazy" src="img/official/RiftCoin.webp" alt="${i("guide.catalysts")}" class="tab-icon">
        ${i("guide.catalysts")}
      </button>
    </div>

    <div class="guide-content">

    <!-- TUTORIALS TAB -->
    <div id="tab-tutorials" class="guide-tab-content active">
      <div class="tutorial-grid" style="display: grid; gap: 1rem; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));">
        <div class="tutorial-card" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 8px; padding: 1.5rem; text-align: center; cursor: pointer; transition: transform 0.2s, border-color 0.2s;" onclick="navigateTo('tutorial-renda-passiva')" onmouseover="this.style.borderColor='var(--accent-gold)'; this.style.transform='translateY(-2px)';" onmouseout="this.style.borderColor='var(--border-color)'; this.style.transform='translateY(0)';">
          <h3 style="color: var(--accent-gold); margin-bottom: 0.5rem;">📜 ${i("guide.passiveIncomeTitle")}</h3>
          <p style="color: var(--text-secondary); font-size: 0.9rem;">${i("guide.passiveIncomeDesc")}</p>
        </div>
      </div>
    </div>
    </div>

    <!-- STATISTICS TAB -->
    <div id="tab-statistics" class="guide-tab-content">

      <div class="stats-hero-container">
        <div class="stats-header-row">
          <span class="stats-header-title">${i("guide.maxStats")}</span>
          <button class="stats-toggle-btn" onclick="toggleStatsImage()">
            <span class="toggle-text">${i("guide.hideImage")}</span>
          </button>
        </div>

        <div id="statsImageWrapper" class="stats-image-wrapper">
          <img loading="lazy" src="img/unofficial/status_max_pt-br.webp" alt="${i("guide.maxStats")}" class="stats-ref-image">
        </div>
      </div>

      <div class="stats-glossary-container">
        ${Is()}
      </div>
    </div>

    <!-- MODIFIERS TAB (Unified) -->
    <div id="tab-modifiers" class="guide-tab-content">

      <!-- BUFFS SECTION -->
      <div class="modifiers-section">
        <h2 class="section-title" style="color: var(--accent-green); margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
          <img loading="lazy" src="img/modifiers/buffs/Regen.webp" style="width: 24px; height: 24px;">
          ${i("guide.positiveEffects")}
        </h2>
        <div class="effects-table-container">
          <table class="effects-table">
            <thead>
              <tr>
                <th>${i("guide.icon")}</th>
                <th>${i("guide.name")}</th>
                <th>${i("guide.effectDesc")}</th>
                <th>${i("guide.max")}</th>
              </tr>
            </thead>
            <tbody id="buffs-list">
              <!-- Populated by JS -->
            </tbody>
          </table>
        </div>
      </div>

      <div style="height: 40px;"></div> <!-- Spacer -->

      <!-- DEBUFFS SECTION -->
      <div class="modifiers-section">
        <h2 class="section-title" style="color: var(--accent-red); margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
          <img loading="lazy" src="img/modifiers/debuffs/Bleed.webp" style="width: 24px; height: 24px;">
          ${i("guide.negativeEffects")}
        </h2>
        <div class="effects-table-container">
          <table class="effects-table">
            <thead>
              <tr>
                <th>${i("guide.icon")}</th>
                <th>${i("guide.name")}</th>
                <th>${i("guide.effectDesc")}</th>
                <th>${i("guide.max")}</th>
              </tr>
            </thead>
            <tbody id="debuffs-list">
              <!-- Populated by JS -->
            </tbody>
          </table>
        </div>
      </div>

      <div style="height: 40px;"></div> <!-- Spacer -->

      <!-- SPECIAL EFFECTS SECTION -->
      <div class="modifiers-section">
        <h2 class="section-title" style="color: #b0bec5; margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
          <img loading="lazy" src="img/modifiers/permanent/Permanent.webp" style="width: 24px; height: 24px;">
          ${i("guide.permanentEffect")}
        </h2>
        <div class="effects-table-container">
          <table class="effects-table">
            <thead>
              <tr>
                <th>${i("guide.icon")}</th>
                <th>${i("guide.name")}</th>
                <th>${i("guide.effectDesc")}</th>
                <th>${i("guide.max")}</th>
              </tr>
            </thead>
            <tbody id="special-list">
              <!-- Populated by JS -->
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- CATALYSTS TAB -->
    <div id="tab-catalysts" class="guide-tab-content">
      <h2 class="catalyst-title-main">${i("guide.weekModifiers")}</h2>

      <!-- Catalysts of the Week Section -->
      <div class="cotw-section">
        <div class="cotw-filters">
          <button class="cotw-filter-btn" data-element="water">
            <img loading="lazy" src="img/official/ElementalWaterBackless.webp" alt="${O("Água")}"><span>${O("Água")}</span>
          </button>
          <button class="cotw-filter-btn" data-element="fire">
            <img loading="lazy" src="img/official/ElementalFireBackless.webp" alt="${O("Fogo")}"><span>${O("Fogo")}</span>
          </button>
          <button class="cotw-filter-btn" data-element="wind">
            <img loading="lazy" src="img/official/ElementalWindBackless.webp" alt="${O("Ar")}"><span>${O("Ar")}</span>
          </button>
          <button class="cotw-filter-btn" data-element="light">
            <img loading="lazy" src="img/official/ElementalLightBackless.webp" alt="${O("Luz")}"><span>${O("Luz")}</span>
          </button>
          <button class="cotw-filter-btn" data-element="dark">
            <img loading="lazy" src="img/official/ElementalDarkBackless.webp" alt="${O("Trevas")}"><span>${O("Trevas")}</span>
          </button>
        </div>
        <div class="catalyst-grid" id="cotw-container-guide">
          <p class="info-state" style="text-align: center; margin: 20px 0;"></p>
        </div>
      </div>

      <div style="height: 40px; border-bottom: 1px solid #30363d; margin-bottom: 40px;"></div>

      <div class="catalyst-categories" id="catalyst-container">
        <!-- Populated by JS -->
        <div class="loading-state">${i("guide.loadingCatalysts")}</div>
      </div>
    </div>
    </div>
  </div>
  `}function vs(){si("buff","buffs-list"),si("debuff","debuffs-list"),ws("special-list"),Rs(),window.switchGuideTab=ys,window.toggleStatsImage=Cs,window.setupLazyLoading&&window.setupLazyLoading()}function ys(e){document.querySelectorAll(".guide-tab-btn").forEach(a=>{a.classList.remove("active");const t=a.getAttribute("onclick");t&&t.includes(`'${e}'`)&&a.classList.add("active")}),document.querySelectorAll(".guide-tab-content").forEach(a=>{a.classList.remove("active"),a.id===`tab-${e}`&&a.classList.add("active")})}function si(e,a){const t=document.getElementById(a);if(!t)return;const o=Object.entries(ae).filter(([n,r])=>r.type===e&&n!=="permanent_modifier").map(([n,r])=>Te(n)||r).sort((n,r)=>n.name.localeCompare(r.name));let s="";o.forEach((n,r)=>{const l=n.stacks?`${n.stacks}x`:"-",c=n.color||"var(--text-primary)";s+=`
      <tr class="effect-row">
        <td class="effect-icon-cell">
          <div class="effect-icon-wrapper">
            <img loading="lazy" src="${n.icon}" alt="${n.name}" class="effect-icon-img">
          </div>
        </td>
        <td class="effect-name-cell">
          <span class="effect-name" style="color: ${c};">${n.name}</span>
        </td>
        <td class="effect-desc-cell">
          <p><strong style="color: ${c};">${i("guide.gameDescription")}</strong> ${n.detailed}</p>
          ${n.explicacao?`<p style="margin-top: 6px;"><strong style="color: ${c};">${i("guide.explanation")}</strong> ${n.explicacao}</p>`:""}
          ${n.scaling?`<small class="effect-scaling" style="display: block; margin-top: 6px;">${i("guide.scaling")} ${n.scaling}</small>`:""}
        </td>
        <td class="effect-stacks-cell">${l}</td>
      </tr>
    `}),t.innerHTML=s}async function Rs(){const e=document.getElementById("catalyst-container");if(!e)return;const a=await ra();if(!a){e.innerHTML=`<p class="error-state">${i("guide.errorCatalysts")}</p>`;return}const t=await Mi();if(document.querySelectorAll("#tab-catalysts .cotw-filter-btn").forEach(o=>{o.addEventListener("click",s=>{const n=s.currentTarget,r=n.classList.contains("active");if(document.querySelectorAll("#tab-catalysts .cotw-filter-btn").forEach(l=>l.classList.remove("active")),r){const l=document.getElementById("cotw-container-guide");l&&(l.innerHTML='<p class="info-state" style="text-align: center; margin: 20px 0;"></p>')}else n.classList.add("active"),Ss(n.dataset.element,"cotw-container-guide",t)})}),a.embeds&&Array.isArray(a.embeds)){const o=a.embeds[0];if(o){let s="";o.title&&(s+=`<h3 class="catalyst-title">${o.title}</h3>`),o.description&&Array.isArray(o.description)&&(s+=`<div class="catalyst-description">${o.description.map(n=>n?`<p>${li(n)}</p>`:"<br>").join("")}</div>`),o.fields&&Array.isArray(o.fields)&&(s+='<div class="catalyst-fields">',o.fields.forEach(n=>{const r=ri(n.name);s+=`
            <div class="catalyst-category ${r}">
              <h4>${n.name}</h4>
              <ul class="catalyst-list">
                ${(Array.isArray(n.value)?n.value:[n.value]).map(l=>`<li>${li(l)}</li>`).join("")}
              </ul>
            </div>
          `}),s+="</div>"),e.innerHTML=`
        <h2 class="catalyst-title-main" style="margin-top: -10px; margin-bottom: 30px;">${i("guide.riftCatalysts")}</h2>
        ${s}
      `;return}}if(Array.isArray(a))e.innerHTML=`
      <h2 class="catalyst-title-main" style="margin-top: -10px; margin-bottom: 30px;">${i("guide.riftCatalysts")}</h2>
      <div class="catalyst-grid">
        ${a.map(o=>ci(o)).join("")}
      </div>
    `;else if(a.categories&&Array.isArray(a.categories)){const o=a.categories.map(s=>`
        <div class="catalyst-category ${ri(s.category)}">
          <h3 style="font-family: 'Washington', sans-serif; color: var(--accent-gold); margin-bottom: 16px;">${s.category} ⬇️</h3>
          <div class="catalyst-grid">
            ${s.items.map(r=>ci(r)).join("")}
          </div>
        </div>
      `).join("");e.innerHTML=`
      <h2 class="catalyst-title-main" style="margin-top: -10px; margin-bottom: 30px;">${i("guide.riftCatalysts")}</h2>
      ${o}
    `}else e.innerHTML=`<p class="info-state">${i("guide.catalystsLoaded")}</p>`}function ws(e){const a=document.getElementById(e);if(!a)return;const t=Te("permanent_modifier")||ae.permanent_modifier;if(!t)return;const o=t.stacks?`${t.stacks}x`:"-",s=`
    <tr class="effect-row">
      <td class="effect-icon-cell">
        <div class="effect-icon-wrapper">
          <img loading="lazy" src="${t.icon}" alt="${t.name}" class="effect-icon-img">
        </div>
      </td>
      <td class="effect-name-cell">
        <span class="effect-name" style="color: ${t.color};">${t.name}</span>
      </td>
      <td class="effect-desc-cell">
        ${t.explicacao?`<p><strong style="color: ${t.color};">${i("guide.explanation")}</strong> ${t.explicacao}</p>`:""}
      </td>
      <td class="effect-stacks-cell">${o}</td>
    </tr>
  `;a.innerHTML=s}const Os={water:1,fire:2,wind:3,light:4,dark:5};function Ss(e,a,t){const o=document.getElementById(a);if(!o||!t)return;const s=Os[e];if(!s)return;const n=t.maps.find(l=>l.map===s);if(!n){o.innerHTML=`<p class="info-state" style="text-align: center; margin: 20px 0;">${i("guide.noModifiersElement")}</p>`;return}const r=[];for(const l of n.nodes)if(l.node==="Boss"){const c=[...l.defender_modifiers,...l.attacker_modifiers];c.length>0&&r.push(Ts(c))}else{for(const c of l.defender_modifiers)r.push(ni(c,l.node));for(const c of l.attacker_modifiers)r.push(ni(c,l.node))}o.innerHTML=r.join("")}function ni(e,a){const t=(e.description||"").replace(/\n/g,"<br>");return`
    <div class="catalyst-card cotw-card">
      <div class="catalyst-card-header">
        <h4>${e.name}</h4>
        <span class="catalyst-constraint">${la(a)}</span>
      </div>
      <div class="catalyst-description">
        <p>${t}</p>
      </div>
    </div>
  `}function Ts(e){const a=e.map(t=>{const o=(t.description||"").replace(/\n/g,"<br>");return`<p><strong>${t.name}</strong></p><p>${o}</p>`}).join("<br>");return`
    <div class="catalyst-card cotw-card">
      <div class="catalyst-card-header">
        <h4>${e[0].name}</h4>
        <span class="catalyst-constraint">${la("Boss")}</span>
      </div>
      <div class="catalyst-description">
        ${a}
      </div>
    </div>
  `}function ri(e){const a=e.toLowerCase();return a.includes("forte")||a.includes("strong")?"cat-strong":a.includes("bom")||a.includes("good")?"cat-good":a.includes("mediano")||a.includes("average")?"cat-medium":a.includes("ruim")||a.includes("weak")?"cat-weak":""}function li(e){return e?(e=e.replace(/^\*\s*/,""),e=e.replace(/^###\s*/,""),e=e.replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>"),e=e.replace(/\b(\d+\.?\d*)(?:\/\d+\.?\d*)+\b/g,a=>a.split("/").pop()),e=e.replace(/\(\+\)/g,'<span class="notation notation-plus" style="color: #4ade80;">(+)</span>'),e=e.replace(/\(=\)/g,'<span class="notation notation-equal" style="color: #fbbf24;">(=)</span>'),e=e.replace(/\(-\)/g,'<span class="notation notation-minus" style="color: #f87171;">(-)</span>'),e):""}function ci(e){const a=(e.description||"").replace(/\\n/g,"<br>").replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>");return`
    <div class="catalyst-card">
      <div class="catalyst-card-header">
        <h4>${e.name}</h4>
        ${e.constraint?`<span class="catalyst-constraint">${la(e.constraint)}</span>`:""}
      </div>
      <div class="catalyst-description">
        <p>${a}</p>
      </div>
    </div>
  `}function Cs(){const e=document.getElementById("statsImageWrapper"),a=document.querySelector(".stats-toggle-btn");if(!e)return;const t=e.style.display==="none";e.style.display=t?"block":"none",a&&(a.querySelector(".toggle-text").textContent=i(t?"guide.hideImage":"guide.showImage"))}function Is(){return`<div class="glossary-grid">${Object.keys(Me).filter(t=>!t.startsWith("tier_")).map(t=>{const o=Xi(t)||Me[t],s=o.max&&o.max!=="Indefinido"&&o.max!=="Undefined"?`<span class="attribute-max">${i("tooltip.maxLabel")}${o.max}</span>`:o.max==="Indefinido"||o.max==="Undefined"?`<span class="attribute-max">${i("tooltip.maxLabel")}${i("guide.maxUndefined")}</span>`:"";return`
      <div class="attribute-card">
        <div class="attribute-card-header">
          <h3>${o.name}</h3>
          ${s}
        </div>
        <div class="attribute-card-body">
          <p class="attribute-summary">${o.summary}</p>
          <div class="attribute-detailed">
            <p>${o.detailed}</p>
          </div>
        </div>
      </div>
    `}).join("")}</div>`}const Ds=Object.freeze(Object.defineProperty({__proto__:null,init:vs,render:As},Symbol.toStringTag,{value:"Module"}));function We(e){return i(e).split("|").map(a=>`<li>${a}</li>`).join(`
`)}function ks(){return`
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
  <h1>${i("tutorial.title")}</h1>
  <p class="subtitle">${i("tutorial.subtitle")}</p>
  <div class="stamp">${i("tutorial.edition")}</div>
  </header>

  <section>

  <!-- Introdução: Por que este manifesto existe -->
  <h2>${i("tutorial.preamble")}</h2>
  <p>${i("tutorial.preamble1")}</p>
  <p>${i("tutorial.preamble2")}</p>
  <p>${i("tutorial.preamble3")}</p>

  <hr>

  <!-- Os Princípios da Estratégia -->
  <h2>${i("tutorial.pillars")}</h2>
  <p>${i("tutorial.pillarsIntro")}</p>

  <ul>
  <li>
  <strong>${i("tutorial.pillar1Title")}</strong> ${i("tutorial.pillar1Desc")}
  </li>
  <li>
  <strong>${i("tutorial.pillar2Title")}</strong> ${i("tutorial.pillar2Desc")}
  </li>
  <li>
  <strong>${i("tutorial.pillar3Title")}</strong> ${i("tutorial.pillar3Desc")}
  </li>
  <li>
  <strong>${i("tutorial.pillar4Title")}</strong> ${i("tutorial.pillar4Desc")}
  </li>
  </ul>

  <hr>

  <!-- A Montagem da Base Custo-Benefício -->
  <h2>${i("tutorial.decree")}</h2>
  <p>${i("tutorial.decreeIntro")}</p>

  <h3>${i("tutorial.priority1Title")}</h3>
  <p>${i("tutorial.priority1Desc")}</p>
  <ul class="list-disc">
  ${We("tutorial.priority1Items")}
  </ul>

  <h3>${i("tutorial.priority2Title")}</h3>
  <p>${i("tutorial.priority2Desc")}</p>
  <ul class="list-disc">
  ${We("tutorial.priority2Items")}
  </ul>

  <h3>${i("tutorial.priority3Title")}</h3>
  <p>${i("tutorial.priority3Desc")}</p>
  <ul class="list-disc">
  ${We("tutorial.priority3Items")}
  </ul>

  <hr>

  <!-- A Alquimia dos Catalisadores -->
  <h2>${i("tutorial.alchemy")}</h2>
  <p>${i("tutorial.alchemy1")}</p>
  <p>${i("tutorial.alchemy2")}</p>

  <div class="highlight-box">
  <h3 style="margin-top: 0; text-decoration: underline;">${i("tutorial.forgeTitle")}</h3>
  <p><strong>${i("tutorial.forgeGeneric")}</strong> <strong>${i("tutorial.forgeGenericItems")}</strong> ${i("tutorial.forgeGenericNote")}</p>
  <p><strong>${i("tutorial.forgeWind")}</strong> ${i("tutorial.forgeWindItems")}</p>
  </div>

  <hr>

  <!-- O Concílio das Guildas -->
  <h2>${i("tutorial.guild")}</h2>
  <p>${i("tutorial.guild1")}</p>
  <p>${i("tutorial.guild2")}</p>

  <hr>

  <!-- Mapa da Cidadela -->
  <h2>${i("tutorial.citadel")}</h2>
  <p>${i("tutorial.citadelDesc")}</p>

  <div class="image-frame">
  <img loading="lazy" src="img/testes/base-renda-passiva.webp" alt="${i("tutorial.citadelImgAlt")}" class="base-image" onerror="this.src='https://via.placeholder.com/800x450?text=${encodeURIComponent(i("tutorial.imgNotFound"))}'">
  <p style="text-align: center; font-size: 0.875rem; font-style: italic; margin-top: 1rem;">${i("tutorial.citadelCaption")}</p>
  </div>

  <hr>

  <!-- Conclusão -->
  <h2>${i("tutorial.conclusion")}</h2>
  <p>${i("tutorial.conclusion1")}</p>

  <p style="text-align: center; font-size: 0.875rem; font-style: italic; margin-top: 2rem;">${i("tutorial.conclusionSignature")}</p>

  </section>

  <footer class="footer-text">
  <p>${i("tutorial.versionDate")}</p>
  </footer>
  </main>
  </div>
  `}function _s(){window.scrollTo(0,0)}const Bs=Object.freeze(Object.defineProperty({__proto__:null,init:_s,render:ks},Symbol.toStringTag,{value:"Module"}));function di(){const e=y();return`
<nav class="navbar hidden-nav" id="navbar">
  <div class="navbar-brand">
    <div class="logo" onclick="navigateTo('')">Skullgirls Palace</div>
  </div>
  <div class="navbar-right">
    <div class="nav-actions">
      <div class="language-selector" id="languageSelector">
        <button class="language-btn" onclick="handleToggleLanguageMenu()">
          <span class="lang-flag">${e==="pt-BR"?'<img src="img/official/flag_pt.webp" alt="PT" class="flag-icon">':'<img src="img/official/flag_en.webp" alt="EN" class="flag-icon">'}</span>
          <span class="lang-code">${e==="pt-BR"?"PT-BR":"EN"}</span>
          <svg class="lang-arrow" width="12" height="12" viewBox="0 0 12 12">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" fill="none"/>
          </svg>
        </button>
        <div class="language-dropdown" id="languageDropdown">
          <button class="lang-option ${e==="pt-BR"?"active":""}" onclick="handleSelectLanguage('pt-BR')">
            <span class="lang-flag"><img src="img/official/flag_pt.webp" alt="PT" class="flag-icon"></span>
            <span>${e==="pt-BR"?"Português Brasil":"Portuguese Brazilian"}</span>
          </button>
          <button class="lang-option ${e==="en"?"active":""}" onclick="handleSelectLanguage('en')">
            <span class="lang-flag"><img src="img/official/flag_en.webp" alt="EN" class="flag-icon"></span>
            <span>${e==="pt-BR"?"Inglês":"English"}</span>
          </button>
        </div>
      </div>
      <div class="hamburger" onclick="handleToggleMobileMenu()">☰</div>
    </div>
    <div class="nav-overlay" id="navOverlay" onclick="handleToggleMobileMenu()"></div>
    <ul class="nav-links" id="navLinks">
      <li><a href="javascript:void(0)" onclick="navigateTo('')">${i("nav.home")}</a></li>
      <li><a href="javascript:void(0)" onclick="navigateTo('characters')">${i("nav.characters")}</a></li>
      <li><a href="javascript:void(0)" onclick="navigateTo('guide')">${i("nav.guide")}</a></li>
      <li><a href="javascript:void(0)" onclick="navigateTo('stats')">${i("nav.calculator")}</a></li>
    </ul>
  </div>
</nav>
`}function pi(){return`
<div id="drawer-overlay" class="drawer-overlay" onclick="handleToggleAboutDrawer()"></div>
<aside id="about-drawer" class="about-drawer">
  <div class="drawer-header">
    <h3>${i("about.title")}</h3>
    <button class="close-drawer" onclick="handleToggleAboutDrawer()">×</button>
  </div>
  <div class="drawer-content">
    <div class="hero">
      <h1>${i("about.heroTitle")}</h1>
      <p>${i("about.heroSubtitle")}</p>
      <div class="hero-buttons">
        <a href="https://discord.gg/whZJz92RTt" target="_blank" class="btn btn-primary">
          ${i("about.discord")}
        </a>
        <a href="https://github.com/bot-do-jao/palacio-branco-entreprises" target="_blank" class="btn btn-secondary">
          ${i("about.github")}
        </a>
      </div>
    </div>

    <div class="info-cards vertical">
      <div class="card-link">
        <h3>${i("about.buildsTitle")}</h3>
        <p>${i("about.buildsDesc")}</p>
      </div>
      <div class="card-link">
        <h3>${i("about.calculatorTitle")}</h3>
        <p>${i("about.calculatorDesc")}</p>
      </div>
    </div>

    <div class="credits-section">
      <h4>${i("about.creditsTitle")}</h4>
      <p>${i("about.creditsDevs")}</p>
      <p>${i("about.inspiration")} <a href="https://github.com/Krazete" target="_blank" style="color: var(--accent-gold); text-decoration: none;">Krazete</a></p>
      <p>${i("about.sources")} <a href="https://krazete.github.io/sgm/" target="_blank" style="color: var(--accent-gold); text-decoration: none;">Catálogo Krazete</a> e <a href="https://skullgirlsmobile.fandom.com/wiki/SkullgirlsMobile_Wiki" target="_blank" style="color: var(--accent-gold); text-decoration: none;">Fandom Wiki</a>.</p>
      <p>${i("about.assetsNote")}</p>

      <div class="disclaimer-tooltip" style="margin-top: 20px;">
        <button class="disclaimer-btn" onclick="handleToggleDisclaimer()" title="${i("about.disclaimerBtn")}">⚠️</button>
        <div class="disclaimer-content" id="disclaimer-content">
          <p><strong>${i("about.disclaimerTitle")}</strong> ${i("about.disclaimerText1")}</p>
          <p>${i("about.disclaimerText2")}</p>
        </div>
      </div>
      <p style="font-size: 0.85rem; margin-top: 15px;">${i("about.reportBug")} <a href="https://discord.gg/whZJz92RTt" target="_blank" style="color: var(--accent-gold); text-decoration: none;">${i("about.serverName")}</a>.</p>
    </div>
  </div>
</aside>
`}function ui(){return`
  <button id="scrollTopBtn" class="scroll-nav-btn" onclick="scrollToTop()" title="${i("common.scrollToTop")}"></button>
  <button id="scrollToBottomBtn" class="scroll-nav-btn" onclick="scrollToBottom()" title="${i("common.scrollToBottom")}"></button>
`}function Gs(e){const a=document.getElementById("navbar");a&&(e===""||e==="landing-hub"?a.classList.add("hidden-nav"):a.classList.remove("hidden-nav"))}function Ls(e){document.querySelectorAll(".nav-links a").forEach(a=>{a.classList.remove("active");const t=a.getAttribute("onclick");let o=e;e&&e.startsWith("character")&&(o="characters"),t&&t.includes(`'${o}'`)&&a.classList.add("active")})}function Ps(){window.scrollTo({top:0,behavior:"smooth"})}function Ms(){window.scrollTo({top:document.body.scrollHeight,behavior:"smooth"})}let Ke=null;function $s(){const e=document.getElementById("about-drawer"),a=document.getElementById("drawer-overlay");e&&a&&(e.classList.toggle("active"),a.classList.toggle("active"),document.body.style.overflow=e.classList.contains("active")?"hidden":"")}function xs(){const e=document.getElementById("navLinks"),a=document.getElementById("navOverlay");e&&a&&(e.classList.toggle("active"),a.classList.toggle("active"),document.body.style.overflow=e.classList.contains("active")?"hidden":"")}function Fs(){const e=document.getElementById("disclaimer-content");e&&(e.classList.toggle("active"),e.classList.contains("active")?(clearTimeout(Ke),Ke=setTimeout(()=>{e.classList.remove("active")},7e3)):clearTimeout(Ke))}function Ns(){const e=document.getElementById("languageDropdown");e&&e.classList.toggle("active")}function Us(e){$t(e);const a=document.getElementById("languageDropdown");a&&a.classList.remove("active"),window.location.reload()}document.addEventListener("click",e=>{const a=document.getElementById("languageSelector"),t=document.getElementById("languageDropdown");a&&t&&!a.contains(e.target)&&t.classList.remove("active")});const qs={"":Ai,characters:ro,catalysts:is,tierlist:ss,stats:Es,guide:Ds,"tutorial-renda-passiva":Bs};function Vs(){const a=(window.location.hash.slice(1)||"").split("/"),t=a[0]||"",o=a.slice(1);return{route:t,params:o}}function Ve(e,...a){const t=a.length>0?`${e}/${a.join("/")}`:e;window.location.hash=t}async function Ye(){var s;const{route:e,params:a}=Vs(),t=document.getElementById("app");if(!t)return;if(e==="characters"){window.location.hash="character/todos/builds";return}let o=qs[e];e==="character"&&a[0]&&(o=ua),o||(o=Ai);try{e==="character"&&a[0]?t.innerHTML=o.render(a[0],a[1]||"builds"):t.innerHTML=o.render(),o.init&&(e==="character"&&a[0]?await o.init(a[0],a[1]||"builds"):await o.init())}catch(n){console.error("Error rendering page:",n),t.innerHTML=`
            <div class="error-page">
                <h2>${i("error.pageLoad")}</h2>
                <p>${n.message}</p>
                <button onclick="navigateTo('')">${i("error.backToHome")}</button>
            </div>
        `}Oi(e||"landing-hub"),Gs(e),Ls(e),window.scrollTo(0,0),(s=document.getElementById("navLinks"))==null||s.classList.remove("active")}function Dt(){window.addEventListener("hashchange",Ye),window.addEventListener("languageChanged",()=>{Ye()}),Ye()}function kt(e,a="builds"){Ve("character",e,a)}function _t(e){Ve("character",e,"tier")}function Bt(e,a){window.history.replaceState(null,"",`#character/${e}/${a}`),Ue(e,a)}const zs=Object.freeze(Object.defineProperty({__proto__:null,initRouter:Dt,navigateTo:Ve,openCharacterDetails:kt,openCharacterTier:_t,switchDetailTab:Bt},Symbol.toStringTag,{value:"Module"}));function mi(){return`
<div class="footer-content">
  <div class="footer-section">
    <h3>${i("footer.title")}</h3>
    <p>${i("footer.description")}</p>
    <div class="footer-socials">
      <a href="https://discord.gg/whZJz92RTt" target="_blank" class="footer-icon-link" title="Discord">
        Discord
      </a>
      <a href="https://github.com/bot-do-jao/palacio-branco-entreprises" target="_blank" class="footer-icon-link" title="GitHub">
        GitHub
      </a>
    </div>
  </div>

  <div class="footer-section">
    <h4>${i("footer.creditsTitle")}</h4>
    <p>${i("footer.creditsDevs")}</p>
    <p>${i("footer.inspiration")} <a href="https://github.com/Krazete" target="_blank">Krazete</a></p>
    <p>${i("footer.sources")} <a href="https://krazete.github.io/sgm/" target="_blank">Catálogo Krazete</a> e <a href="https://skullgirlsmobile.fandom.com/wiki/SkullgirlsMobile_Wiki" target="_blank">Fandom Wiki</a>.</p>
  </div>

  <div class="footer-section">
    <h4>${i("footer.officialLinksTitle")}</h4>
    <p><a href="https://skullgirlsmobile.com/" target="_blank">${i("footer.officialSite")}</a></p>
    <p><a href="https://x.com/sgmobile" target="_blank">Twitter/X @sgmobile</a></p>
    <p><a href="https://hub.skullgirlsmobile.com/" target="_blank">${i("footer.hub")}</a></p>
    <p class="footer-disclaimer">${i("footer.assetsNote")}</p>
  </div>

  <div class="footer-section">
    <h4>${i("footer.feedbackTitle")}</h4>
    <p>${i("footer.reportBug")} <a href="https://discord.gg/whZJz92RTt" target="_blank">${i("footer.serverName")}</a>.</p>
  </div>
</div>
<div class="footer-bottom">
  <p>&copy; ${new Date().getFullYear()} Skullgirls Palace. ${i("footer.disclaimer")}</p>
</div>
`}let ce=null,Re=null;function Gt(e){var s;const a=e.dataset.attrKey;if(a==="element_table"){const n=e.dataset.variant,r=uo(n);return r?{source:"element_table",data:{variantName:n,...r}}:null}if(a==="move"){const n=e.dataset.move,r=e.dataset.char;if(n&&r){const l=Yi(r,n);if(l)return{source:"move",data:{name:n,detailed:l.description,summary:l.description,type:l.type,icon:l.image.image}}}return null}if(a.startsWith("class_")){const n=a.replace("class_",""),r=Ji(n);if(r)return{source:"class",data:{name:n,summary:r,detailed:r,icon:(s=$[n])==null?void 0:s.icon,type:i("tooltip.classRole")}}}const t=Xi(a);if(t)return{source:"attr",data:t};const o=Te(a);return o?{source:"effect",data:o}:null}function Lt(e,a=!1){const t=e.buffs?Object.keys(e.buffs):[],o=e.debuffs&&Object.values(e.debuffs).some(l=>l&&l.length>0),s=we(),n=l=>!l||l.length===0?"—":l.map(c=>{const d=co(c);return d?`<span style="display:inline-flex; align-items:center; gap:4px;"><img src="${d}" style="width:20px;height:20px;object-fit:contain;" alt="">${c}</span>`:c}).join("<br>");let r=t.map(l=>{const c=s[l]?l:Ka(l),d=s[c];if(!d)return"";const p=e.buffs&&e.buffs[l]||[],u=e.debuffs&&e.debuffs[l]||[];if(p.length===0&&u.length===0)return"";const m=n(p),b=n(u),f=s[l]?l:Ka(l),h=O(f);return`
    <tr class="element-row">
      <td class="element-cell" style="font-size: 1.05rem;">
        <img loading="lazy" src="${d.iconPath}" alt="${h}" class="element-table-icon">
        <span class="element-table-name">${h}</span>
      </td>
      <td class="buff-cell" style="font-size: 1.05rem;">${m}</td>
      ${o?`<td class="debuff-cell" style="font-size: 1.05rem;">${b||"—"}</td>`:""}
    </tr>
    `}).filter(Boolean).join("");return`
  <table class="element-effects-table">
    <thead>
      <tr>
        <th style="font-size: 1.1rem;">${i("tooltip.element")}</th>
        <th class="buff-header" style="font-size: 1.1rem;">
          ${i("tooltip.buffEffect")}
        </th>
        ${o?`<th class="debuff-header" style="font-size: 1.1rem;">
          ${i("tooltip.debuffEffect")}
        </th>`:""}
      </tr>
    </thead>
    <tbody>
      ${r}
    </tbody>
  </table>
  `}function gi(e){xe();const a=Gt(e);if(!a)return;const{source:t,data:o}=a,s=document.createElement("div");if(s.className="attr-tooltip",t==="element_table")s.classList.add("element-table-tooltip"),s.innerHTML=`
 <div class="attr-tooltip-header">
 <div class="attr-tooltip-title-group">
 <strong>${i("tooltip.elementEffects")}</strong>
 </div>
 <span class="attr-tooltip-max">${o.variantName}</span>
 </div>
 ${Lt(o,!0)}
 <span class="attr-tooltip-hint">${i("tooltip.clickForDetails")}</span>
 `;else if(t==="attr")s.innerHTML=`
 <div class="attr-tooltip-header">
 <div class="attr-tooltip-title-group">
 <strong>${o.name}</strong>
 </div>
 ${o.max?`<span class="attr-tooltip-max">${i("tooltip.max",{value:o.max})}</span>`:""}
 </div>
 <p class="attr-tooltip-summary">${o.summary}</p>
 <span class="attr-tooltip-hint">${i("tooltip.clickForDetails")}</span>
 `;else if(t==="move"){const n=o.icon?`<img loading="lazy" src="${o.icon}" class="attr-tooltip-icon move-img" alt="">`:"";s.innerHTML=`
 <div class="attr-tooltip-header">
 <div class="attr-tooltip-title-group">
 ${n}
 <strong>${o.name}</strong>
 </div>
 <span class="attr-tooltip-max">${o.type}</span>
 </div>
 <p class="attr-tooltip-summary">${o.summary.replace(/\\n/g,"<br>")}</p>
 <span class="attr-tooltip-hint">${i("tooltip.clickForDetails")}</span>
 `}else{const n=o.icon?`<img loading="lazy" src="${o.icon}" class="attr-tooltip-icon" alt="">`:"";let r="";(o.stacks||o.scaling)&&(r=`
 <div class="attr-tooltip-disclaimer">
 ${o.stacks?`<span>${i("tooltip.stack",{value:o.stacks})}</span>`:""}
 ${o.scaling?`<span>${i("tooltip.scaling",{value:o.scaling})}</span>`:""}
 </div>
 `),s.innerHTML=`
 <div class="attr-tooltip-header">
 <div class="attr-tooltip-title-group">
 ${n}
 <strong>${o.name}</strong>
 </div>
 ${t==="class"?`<span class="attr-tooltip-max">${o.type}</span>`:""}
 </div>
 <p class="attr-tooltip-summary">${o.detailed}</p>
 ${r}
 <span class="attr-tooltip-hint">${i("tooltip.clickForDetails")}</span>
 `}document.body.appendChild(s),ce=s,Hs(s,e)}function Hs(e,a){const t=a.getBoundingClientRect(),o=e.getBoundingClientRect(),s=8;let n=t.top-o.height-s,r=t.left+t.width/2-o.width/2;n<s&&(n=t.bottom+s,e.classList.add("below")),r=Math.max(s,Math.min(r,window.innerWidth-o.width-s)),e.style.top=`${n+window.scrollY}px`,e.style.left=`${r}px`,e.classList.add("visible")}function xe(){ce&&(ce.remove(),ce=null)}function fi(e){xe(),Ge();const a=Gt(e);if(!a)return;const{source:t,data:o}=a,s=document.createElement("div");s.className="attr-detail-overlay";let n,r;if(t==="element_table")r=`
 <h3>
 ${i("tooltip.elementEffects")}
 <span class="attr-detail-max">${o.variantName}</span>
 </h3>
 `,n=`
 <div class="attr-detail-section">
 <h4>📋 ${i("tooltip.elementTable")}</h4>
 ${Lt(o,!1)}
 </div>
 `;else if(o.name.includes("Critless")||t==="attr"&&o.name.includes("Critless"))r=`
 <div style="background: rgba(255, 187, 0, 0.1); border: 1px dashed var(--accent-gold); padding: 15px; border-radius: 8px; width: 100%; margin-bottom: 20px;">
 <h3 style="color: var(--accent-gold); margin: 0; font-size: 1.2rem; display: flex; align-items: center; gap: 10px; font-family: 'Dodam', sans-serif;">
 <i class="fas fa-shield-alt"></i> ${i("tooltip.critlessGuide")}
 </h3>
 </div>
 `,n=`
 <div class="attr-detail-section detailed" style="margin-top: 0;">
 <p style="font-size: 1rem; line-height: 1.6; color: #eee;">${o.explicacao?o.explicacao.replace(/\\n/g,"<br>"):o.detailed}</p>
 </div>
 `;else if(t==="attr")r=`
 <h3>
 ${o.name}
 ${o.max?`<span class="attr-detail-max">${i("tooltip.maximum",{value:o.max})}</span>`:""}
 </h3>
 `,n=`
 <div class="attr-detail-section">
 <h4>📋 ${i("tooltip.summary")}</h4>
 <p>${o.summary}</p>
 </div>
 <div class="attr-detail-section detailed">
 <h4>📖 ${i("tooltip.explanation")}</h4>
 <p>${o.detailed}</p>
 </div>
 `;else if(t==="move")r=`
 ${o.icon?`<img loading="lazy" src="${o.icon}" class="attr-detail-icon move-img" alt="${o.name}">`:""}
 <h3>
 ${o.name}
 <span class="attr-detail-max">${o.type}</span>
 </h3>
 `,n=`
 <div class="attr-detail-section">
 <h4>📖 ${i("tooltip.moveDescription")}</h4>
 <p>${o.detailed.replace(/\\n/g,"<br>")}</p>
 </div>
 `;else{const c=o.icon?`<img loading="lazy" src="${o.icon}" class="attr-detail-icon" alt="${o.name}">`:"",d=t==="class"?o.type:o.type==="buff"?i("tooltip.positiveEffect"):o.type==="debuff"?i("tooltip.negativeEffect"):i("tooltip.term");r=`
 ${c}
 <h3>
 ${o.name}
 <span class="attr-detail-max">${d}</span>
 </h3>
 `,n=`
 <div class="attr-detail-section">
 <h4>📖 ${i("tooltip.description")}</h4>
 <p>${o.detailed}</p>
 </div>
 ${o.stacks?`
 <div class="attr-detail-section">
 <h4>📊 ${i("tooltip.accumulation")}</h4>
 <p>${i("tooltip.maximum",{value:o.stacks+"x"})}</p>
 ${o.scaling?`<p>${i("tooltip.scaling",{value:o.scaling})}</p>`:""}
 </div>`:""}
 `}s.innerHTML=`
 <div class="attr-detail-modal">
 <button class="attr-detail-close" aria-label="${i("tooltip.close")}">&times;</button>
 <div class="attr-detail-header">
 ${r}
 </div>
 <div class="attr-detail-body">
 ${n}
 </div>
 <!-- Timer bar removed -->
 </div>
 `,document.body.appendChild(s),Re=s,requestAnimationFrame(()=>{s.classList.add("visible")}),s.querySelector(".attr-detail-close").addEventListener("click",Ge),s.addEventListener("click",c=>{c.target===s&&Ge()});const l=c=>{c.key==="Escape"&&(Ge(),document.removeEventListener("keydown",l))};document.addEventListener("keydown",l)}function Ge(){if(Re){Re.classList.remove("visible");const e=Re;setTimeout(()=>e.remove(),300),Re=null}}function bi(){document.addEventListener("mouseenter",a=>{if(!a.target||!a.target.closest)return;const t=a.target.closest(".attr-highlight");t&&gi(t)},!0),document.addEventListener("mouseleave",a=>{!a.target||!a.target.closest||a.target.closest(".attr-highlight")&&xe()},!0),document.addEventListener("click",a=>{if(!a.target||!a.target.closest)return;const t=a.target.closest(".attr-highlight");t&&(a.preventDefault(),fi(t))});let e=null;document.addEventListener("touchend",a=>{if(!a.target||!a.target.closest)return;const t=a.target.closest(".attr-highlight");if(!t){ce&&a.target.closest&&!a.target.closest(".attr-tooltip")&&xe(),e=null;return}a.preventDefault();const o=t.dataset.move||t.dataset.attrKey;e===o&&ce?(fi(t),e=null):(gi(t),e=o)})}window.navigateTo=Ve;window.openCharacterDetails=kt;window.openCharacterTier=_t;window.switchDetailTab=Bt;window.scrollToTop=Ps;window.scrollToBottom=Ms;window.handleToggleAboutDrawer=$s;window.handleToggleMobileMenu=xs;window.handleToggleDisclaimer=Fs;window.handleToggleLanguageMenu=Ns;window.handleSelectLanguage=Us;window.handleFilterClick=dt;window.handleSortClick=pt;window.handleClearFilters=pa;window.handleToggleFilter=mt;window.handleToggleCharDropdown=gt;window.handleToggleCharDropdownMobile=ft;window.handleToggleAdvancedFilters=bt;window.handleToggleAdvancedFiltersMobile=ht;window.handleSearchInput=st;window.handleSearchClear=lt;window.handleSearchResultClick=rt;window.handleSearchFocus=ct;window.handleMainFilterAction=ut;window.handleClearAdvancedFilters=Et;window.handleCalculateEarnings=ta;window.switchVariantTab=function(e,a){const t=document.querySelector(`.variant-tabs[data-card-id="${e}"]`),o=document.querySelector(`.variant-tab-contents[data-card-id="${e}"]`);!t||!o||(t.querySelectorAll(".variant-tab-btn").forEach(s=>{s.classList.toggle("active",s.dataset.tab===a)}),o.querySelectorAll(".variant-tab-content").forEach(s=>{s.classList.toggle("active",s.dataset.tab===a)}))};window.switchExtrasSubTab=function(e,a){const t=document.getElementById(e);t&&(t.querySelectorAll(".extras-sub-pill").forEach(o=>{const s=o.textContent.trim().toLowerCase(),n=a==="gerais"&&s.includes("gerais")||a==="guildas"&&s.includes("guildas")||a==="fenda"&&s.includes("fenda");o.classList.toggle("active",n)}),t.querySelectorAll(".extras-sub-content").forEach(o=>{o.classList.toggle("active",o.dataset.extrasTab===a)}))};window.toggleExtrasSection=function(e){e.classList.toggle("collapsed")};window.onFiltersChanged=()=>{const e=F();e.currentCharacter&&(e.currentTab==="builds"||e.currentCharacter==="todos"?$e(e.currentCharacter):e.currentTab==="tier"&&re(()=>Promise.resolve().then(()=>ua),void 0).then(a=>{a.switchTab(e.currentCharacter,"tier")}))};window.onTierDataChanged=()=>{const e=F();if(e.currentCharacter){const a=window.location.hash;a.includes("character/")&&a.includes("/tier")&&re(()=>Promise.resolve().then(()=>ua),void 0).then(t=>{t.switchTab(e.currentCharacter,"tier")})}};async function hi(){console.log("Skullgirls Palace - init() started");try{console.log("🏗️ Setting up static UI..."),js(),console.log("📦 Loading characters..."),await Li(),console.log("✅ Characters loaded"),console.log("📊 Loading tier data..."),await Pi(),console.log("✅ Tier data loaded"),console.log("🌟 Loading extras data..."),await $i(),console.log("✅ Extras data loaded"),console.log("🌐 Preloading Krazete translations...");try{await Ut(),console.log("✅ Krazete data preloaded")}catch(e){console.warn("⚠️ Krazete preload failed (will lazy-load):",e)}console.log("🧭 Initializing router..."),Dt(),console.log("✨ Application initialization complete!")}catch(e){console.error("❌ Failed to initialize application:",e),document.getElementById("app").innerHTML=`
            <div class="error-page">
                <h2>${i("common.initError")}</h2>
                <p>${e.message}</p>
                <button onclick="location.reload()">${i("common.reload")}</button>
            </div>
        `}}function js(){const e=document.getElementById("nav-container");e&&(e.innerHTML=di());const a=document.getElementById("drawer-container");a&&(a.innerHTML=pi());const t=document.getElementById("footer-container");t&&(t.innerHTML=mi());const o=document.getElementById("scroll-nav-container");o&&(o.classList.add("scroll-nav"),o.innerHTML=ui()),Ei(),bi(),window.addEventListener("languageChanged",()=>{const s=document.getElementById("nav-container");s&&(s.innerHTML=di());const n=document.getElementById("drawer-container");n&&(n.innerHTML=pi());const r=document.getElementById("footer-container");r&&(r.innerHTML=mi());const l=document.getElementById("scroll-nav-container");l&&(l.classList.add("scroll-nav"),l.innerHTML=ui()),Ei(),bi()})}function Ei(){const e=document.getElementById("scrollTopBtn"),a=document.getElementById("scrollToBottomBtn");if(e||a){const t=()=>{const o=window.scrollY,s=document.documentElement.scrollHeight,n=window.innerHeight;if(e&&e.classList.toggle("visible",o>200),a){const l=!window.location.hash||window.location.hash==="#"||window.location.hash==="#/",c=o>=s-n-100,d=s>n+100;a.classList.toggle("visible",!l&&d&&!c)}const r=document.getElementById("search-bar-container");r&&(o>150?r.classList.add("floating"):r.classList.remove("floating"))};window.addEventListener("scroll",t),setTimeout(t,500),window.addEventListener("hashchange",()=>{setTimeout(t,300)})}}function Qs(){const e=new IntersectionObserver((a,t)=>{a.forEach(o=>{if(o.isIntersecting){const s=o.target;s.dataset.src&&(s.src=s.dataset.src,s.removeAttribute("data-src")),t.unobserve(s)}})},{rootMargin:"100px"});document.querySelectorAll("img[data-src]").forEach(a=>{e.observe(a)})}window.setupLazyLoading=Qs;document.readyState==="loading"?document.addEventListener("DOMContentLoaded",hi):hi();

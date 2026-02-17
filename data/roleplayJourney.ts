export const ROLEPLAY_JOURNEY = [
  // --- TIER 1: SOBREVIVÊNCIA (Níveis 1-8 + Novos) ---
  {
    id: 's01',
    title: 'O Café da Manhã',
    description: 'Domine a arte de fazer seu pedido de café específico em uma cafeteria movimentada.',
    level: 'Beginner',
    icon: 'Coffee',
    color: 'bg-orange-900/40 text-orange-400 border border-orange-500/30',
    hints: ["I'd like a medium latte.", "Can I get that to go?"],
    script: [
      { id: '1', original: "Hi, I'd like a medium latte, please.", translation: "Oi, eu gostaria de um latte médio, por favor.", context: "Fazendo o pedido" },
      { id: '2', original: "Could you make it with oat milk?", translation: "Você poderia fazer com leite de aveia?", context: "Personalizando" },
      { id: '3', original: "Can I get that to go?", translation: "Pode ser para viagem?", context: "Finalizando" },
      { id: '4', original: "Here is my card. Thank you.", translation: "Aqui está meu cartão. Obrigado.", context: "Pagando" }
    ]
  },
  {
    id: 's02',
    title: 'Portão de Embarque',
    description: 'Navegue pelo check-in do aeroporto, perguntas de segurança e embarque.',
    level: 'Beginner',
    icon: 'Plane',
    color: 'bg-blue-900/40 text-blue-400 border border-blue-500/30',
    hints: ["Here is my passport.", "I have one bag to check."],
    script: [
      { id: '1', original: "Hello, here is my passport.", translation: "Olá, aqui está meu passaporte.", context: "Check-in" },
      { id: '2', original: "I have one bag to check in.", translation: "Tenho uma mala para despachar.", context: "Bagagem" },
      { id: '3', original: "Can I have an aisle seat, please?", translation: "Pode me dar um assento no corredor, por favor?", context: "Assento" },
      { id: '4', original: "Which gate is my flight boarding at?", translation: "Em qual portão meu voo está embarcando?", context: "Informação" }
    ]
  },
  {
    id: 's31',
    title: 'Drive-Thru Rápido',
    description: 'Faça um pedido de fast-food sem travar na hora de falar no microfone.',
    level: 'Beginner',
    icon: 'CarFront',
    color: 'bg-red-900/40 text-red-400 border border-red-500/30',
    hints: ["I'll take the number 1.", "No pickles, please."],
    script: [
      { id: '1', original: "Hi, I'd like the Number 1 combo with a Coke.", translation: "Oi, quero o combo Número 1 com Coca.", context: "Pedido" },
      { id: '2', original: "Could you make that without pickles?", translation: "Pode fazer sem picles?", context: "Personalização" },
      { id: '3', original: "I'll also take a side of ranch dressing.", translation: "Também quero um molho ranch à parte.", context: "Adicional" },
      { id: '4', original: "That's everything, thank you.", translation: "É só isso, obrigado.", context: "Finalizando" }
    ]
  },
  {
    id: 's03',
    title: 'Check-in Chique',
    description: 'Lide com a recepção do hotel, solicite upgrades e tire dúvidas.',
    level: 'Beginner',
    icon: 'BedDouble',
    color: 'bg-purple-900/40 text-purple-400 border border-purple-500/30',
    hints: ["I have a reservation.", "Is breakfast included?"],
    script: [
      { id: '1', original: "Hi, I have a reservation under Silva.", translation: "Oi, tenho uma reserva em nome de Silva.", context: "Chegada" },
      { id: '2', original: "Is breakfast included in the rate?", translation: "O café da manhã está incluso na tarifa?", context: "Dúvida" },
      { id: '3', original: "Do you have a room with a view?", translation: "Você tem um quarto com vista?", context: "Upgrade" },
      { id: '4', original: "Could I have a late check-out?", translation: "Poderia fazer o check-out mais tarde?", context: "Solicitação" }
    ]
  },
  {
    id: 's04',
    title: 'Navegador Urbano',
    description: 'Peça orientações para pontos turísticos na rua.',
    level: 'Beginner',
    icon: 'MapPin',
    color: 'bg-emerald-900/40 text-emerald-400 border border-emerald-500/30',
    hints: ["Excuse me, where is...", "Is it far?"],
    script: [
      { id: '1', original: "Excuse me, how do I get to the museum?", translation: "Com licença, como chego ao museu?", context: "Abordagem" },
      { id: '2', original: "Is it within walking distance?", translation: "Dá para ir a pé?", context: "Distância" },
      { id: '3', original: "Should I take a taxi or the subway?", translation: "Devo pegar um táxi ou o metrô?", context: "Transporte" },
      { id: '4', original: "Thank you so much for your help.", translation: "Muito obrigado pela sua ajuda.", context: "Agradecimento" }
    ]
  },
  {
    id: 's05',
    title: 'Jantar ao Ar Livre',
    description: 'Reserve uma mesa, peça uma refeição e solicite a conta.',
    level: 'Beginner',
    icon: 'Utensils',
    color: 'bg-rose-900/40 text-rose-400 border border-rose-500/30',
    hints: ["Table for two.", "The check, please."],
    script: [
      { id: '1', original: "Good evening, a table for two, please.", translation: "Boa noite, uma mesa para dois, por favor.", context: "Chegada" },
      { id: '2', original: "Could we see the menu?", translation: "Poderíamos ver o cardápio?", context: "Pedido" },
      { id: '3', original: "I'll have the steak, medium rare.", translation: "Vou querer o filé, ao ponto para mal.", context: "Prato Principal" },
      { id: '4', original: "Could we get the check, please?", translation: "Pode trazer a conta, por favor?", context: "Pagamento" }
    ]
  },
  {
    id: 's32',
    title: 'Devolução na Loja',
    description: 'Devolva um item errado no supermercado ou loja de departamentos.',
    level: 'Beginner',
    icon: 'Receipt',
    color: 'bg-slate-700/40 text-slate-300 border border-slate-500/30',
    hints: ["I'd like to return this.", "I have the receipt."],
    script: [
      { id: '1', original: "Hi, I'd like to return this item.", translation: "Oi, gostaria de devolver este item.", context: "Início" },
      { id: '2', original: "It was damaged when I opened the box.", translation: "Estava danificado quando abri a caixa.", context: "Motivo" },
      { id: '3', original: "Yes, I have the receipt right here.", translation: "Sim, tenho o recibo bem aqui.", context: "Comprovante" },
      { id: '4', original: "Can I get a refund to my card?", translation: "Posso receber o reembolso no meu cartão?", context: "Reembolso" }
    ]
  },
  {
    id: 's06',
    title: 'Terapia de Compras',
    description: 'Pergunte por tamanhos, prove roupas e negocie.',
    level: 'Beginner',
    icon: 'ShoppingBag',
    color: 'bg-orange-900/40 text-orange-400 border border-orange-500/30',
    hints: ["Do you have this in medium?", "Fitting room?"],
    script: [
      { id: '1', original: "Do you have this shirt in a medium?", translation: "Você tem essa camisa no tamanho médio?", context: "Tamanho" },
      { id: '2', original: "Where are the fitting rooms?", translation: "Onde ficam os provadores?", context: "Provador" },
      { id: '3', original: "It fits perfectly. I'll take it.", translation: "Serviu perfeitamente. Vou levar.", context: "Decisão" },
      { id: '4', original: "Do you accept credit cards?", translation: "Vocês aceitam cartão de crédito?", context: "Pagamento" }
    ]
  },
  {
    id: 's07',
    title: 'Trânsito Urbano',
    description: 'Oriente um motorista e discuta rotas.',
    level: 'Beginner',
    icon: 'Car',
    color: 'bg-slate-800/50 text-slate-300 border border-slate-600/30',
    hints: ["Take me to...", "Keep the change."],
    script: [
      { id: '1', original: "Hi, please take me to Central Park.", translation: "Oi, por favor me leve ao Central Park.", context: "Destino" },
      { id: '2', original: "How long will it take to get there?", translation: "Quanto tempo vai levar para chegar lá?", context: "Tempo" },
      { id: '3', original: "Please pull over here on the right.", translation: "Por favor, encoste aqui na direita.", context: "Parada" },
      { id: '4', original: "Here is the cash. Keep the change.", translation: "Aqui está o dinheiro. Fique com o troco.", context: "Pagamento" }
    ]
  },
  {
    id: 's08',
    title: 'Cuidados Urgentes',
    description: 'Explique sintomas em uma farmácia.',
    level: 'Beginner',
    icon: 'Activity',
    color: 'bg-rose-900/40 text-rose-400 border border-rose-500/30',
    hints: ["I have a headache.", "I need medicine."],
    script: [
      { id: '1', original: "Hi, I have a really bad headache.", translation: "Oi, estou com uma dor de cabeça muito forte.", context: "Sintoma" },
      { id: '2', original: "Do you have anything for allergies?", translation: "Você tem algo para alergias?", context: "Pedido" },
      { id: '3', original: "How many pills should I take a day?", translation: "Quantos comprimidos devo tomar por dia?", context: "Dosagem" },
      { id: '4', original: "Thank you for your help.", translation: "Obrigado pela sua ajuda.", context: "Agradecimento" }
    ]
  },

  // --- TIER 2: CONEXÃO SOCIAL (Níveis 9-16 + Novos) ---
  {
    id: 's33',
    title: 'No Barbeiro/Salão',
    description: 'Explique exatamente como você quer seu corte de cabelo.',
    level: 'Intermediate',
    icon: 'Scissors',
    color: 'bg-blue-800/40 text-blue-300 border border-blue-600/30',
    hints: ["Just a trim.", "Keep the length."],
    script: [
      { id: '1', original: "I'd like just a trim today, please.", translation: "Gostaria apenas de aparar hoje, por favor.", context: "Pedido" },
      { id: '2', original: "Can you fade the sides but keep the top long?", translation: "Pode fazer um degradê nos lados mas manter o topo longo?", context: "Detalhe" },
      { id: '3', original: "Please don't cut too much off the front.", translation: "Por favor, não corte muito na frente.", context: "Cuidado" },
      { id: '4', original: "That looks great, thanks!", translation: "Ficou ótimo, obrigado!", context: "Resultado" }
    ]
  },
  {
    id: 's34',
    title: 'Conversa de Elevador',
    description: 'Domine a arte do "Small Talk" americano sobre o clima.',
    level: 'Intermediate',
    icon: 'CloudSun',
    color: 'bg-yellow-900/40 text-yellow-400 border border-yellow-500/30',
    hints: ["Nice weather.", "It's freezing."],
    script: [
      { id: '1', original: "It's freezing out there today, isn't it?", translation: "Está congelando lá fora hoje, não está?", context: "Clima" },
      { id: '2', original: "I heard it's supposed to snow later.", translation: "Ouvi dizer que vai nevar mais tarde.", context: "Previsão" },
      { id: '3', original: "Are you ready for the weekend?", translation: "Está pronto para o fim de semana?", context: "Fim de semana" },
      { id: '4', original: "Have a good one!", translation: "Tenha um bom dia/fim de semana!", context: "Despedida" }
    ]
  },
  {
    id: 's09',
    title: 'O Quebra-Gelo',
    description: 'Inicie uma conversa em uma festa.',
    level: 'Intermediate',
    icon: 'PartyPopper',
    color: 'bg-purple-900/40 text-purple-400 border border-purple-500/30',
    hints: ["Nice to meet you.", "Great party."],
    script: [
      { id: '1', original: "Hi, I don't think we've met. I'm Alex.", translation: "Oi, acho que não nos conhecemos. Sou Alex.", context: "Apresentação" },
      { id: '2', original: "How do you know the host?", translation: "De onde você conhece o anfitrião?", context: "Conexão" },
      { id: '3', original: "I love this song! Do you like rock?", translation: "Amo essa música! Você gosta de rock?", context: "Interesse" },
      { id: '4', original: "It was great chatting with you.", translation: "Foi ótimo conversar com você.", context: "Despedida" }
    ]
  },
  {
    id: 's10',
    title: 'Paixões e Hobbies',
    description: 'Fale sobre o que você ama fazer.',
    level: 'Intermediate',
    icon: 'Gamepad2',
    color: 'bg-blue-900/40 text-blue-400 border border-blue-500/30',
    hints: ["I like photography.", "How about you?"],
    script: [
      { id: '1', original: "So, what do you do for fun?", translation: "Então, o que você faz para se divertir?", context: "Pergunta" },
      { id: '2', original: "I'm really into photography and travel.", translation: "Eu gosto muito de fotografia e viagens.", context: "Resposta" },
      { id: '3', original: "How long have you been playing guitar?", translation: "Há quanto tempo você toca guitarra?", context: "Detalhe" },
      { id: '4', original: "We should do that together sometime.", translation: "Deveríamos fazer isso juntos qualquer dia.", context: "Convite" }
    ]
  },
  {
    id: 's11',
    title: 'Primeiras Impressões',
    description: 'Mantenha o fluxo em um primeiro encontro.',
    level: 'Intermediate',
    icon: 'Heart',
    color: 'bg-rose-900/40 text-rose-400 border border-rose-500/30',
    hints: ["You look nice.", "Tell me more."],
    script: [
      { id: '1', original: "You look great tonight.", translation: "Você está ótimo(a) hoje à noite.", context: "Elogio" },
      { id: '2', original: "I've been looking forward to meeting you.", translation: "Eu estava ansioso para te conhecer.", context: "Interesse" },
      { id: '3', original: "Tell me more about your work.", translation: "Me conte mais sobre o seu trabalho.", context: "Curiosidade" },
      { id: '4', original: "I'm having a really good time.", translation: "Estou me divertindo muito.", context: "Feedback" }
    ]
  },
  {
    id: 's35',
    title: 'No Dentista',
    description: 'Agende uma limpeza e explique onde dói.',
    level: 'Intermediate',
    icon: 'Stethoscope',
    color: 'bg-cyan-900/40 text-cyan-400 border border-cyan-500/30',
    hints: ["It hurts here.", "I need a cleaning."],
    script: [
      { id: '1', original: "I need to schedule a cleaning, please.", translation: "Preciso agendar uma limpeza, por favor.", context: "Agendamento" },
      { id: '2', original: "I have a sharp pain in my upper right molar.", translation: "Tenho uma dor aguda no meu molar superior direito.", context: "Sintoma" },
      { id: '3', original: "Do you accept my dental insurance?", translation: "Vocês aceitam meu seguro dental?", context: "Seguro" },
      { id: '4', original: "Is there anything I should avoid eating?", translation: "Tem algo que eu deva evitar comer?", context: "Pós-consulta" }
    ]
  },
  {
    id: 's12',
    title: 'Parceiro de Treino',
    description: 'Interaja na academia educadamente.',
    level: 'Intermediate',
    icon: 'Dumbbell',
    color: 'bg-emerald-900/40 text-emerald-400 border border-emerald-500/30',
    hints: ["Can I work in?", "How many sets?"],
    script: [
      { id: '1', original: "Excuse me, are you using this machine?", translation: "Com licença, você está usando esta máquina?", context: "Verificação" },
      { id: '2', original: "Do you mind if I work in with you?", translation: "Se importa se eu revezar com você?", context: "Pedido" },
      { id: '3', original: "How many sets do you have left?", translation: "Quantas séries ainda faltam?", context: "Logística" },
      { id: '4', original: "Thanks, nice workout!", translation: "Valeu, bom treino!", context: "Fim" }
    ]
  },
  {
    id: 's13',
    title: 'Esclarecendo Tudo',
    description: 'Resolva um mal-entendido educadamente.',
    level: 'Intermediate',
    icon: 'AlertTriangle',
    color: 'bg-orange-900/40 text-orange-400 border border-orange-500/30',
    hints: ["Sorry about that.", "I didn't mean to."],
    script: [
      { id: '1', original: "Hey, I think there's been a misunderstanding.", translation: "Ei, acho que houve um mal-entendido.", context: "Abertura" },
      { id: '2', original: "I didn't mean to upset you.", translation: "Não foi minha intenção te chatear.", context: "Desculpa" },
      { id: '3', original: "Let me explain what happened.", translation: "Deixe-me explicar o que aconteceu.", context: "Explicação" },
      { id: '4', original: "Are we good now?", translation: "Estamos bem agora?", context: "Resolução" }
    ]
  },
  {
    id: 's14',
    title: 'Críticos de Cinema',
    description: 'Discuta um filme após a sessão.',
    level: 'Intermediate',
    icon: 'Film',
    color: 'bg-purple-900/40 text-purple-400 border border-purple-500/30',
    hints: ["It was amazing.", "I liked the acting."],
    script: [
      { id: '1', original: "What did you think of the movie?", translation: "O que você achou do filme?", context: "Opinião" },
      { id: '2', original: "The plot twist at the end was crazy!", translation: "A reviravolta no final foi louca!", context: "Comentário" },
      { id: '3', original: "I thought the acting was superb.", translation: "Achei a atuação soberba.", context: "Crítica" },
      { id: '4', original: "It was a bit slow in the middle though.", translation: "Foi um pouco lento no meio, no entanto.", context: "Contraponto" }
    ]
  },
  {
    id: 's15',
    title: 'Pedido por Telefone',
    description: 'Peça comida via chamada de voz.',
    level: 'Intermediate',
    icon: 'Phone',
    color: 'bg-blue-900/40 text-blue-400 border border-blue-500/30',
    hints: ["I'd like to order.", "Delivery please."],
    script: [
      { id: '1', original: "Hi, I'd like to place an order for delivery.", translation: "Oi, gostaria de fazer um pedido para entrega.", context: "Início" },
      { id: '2', original: "I want a large pepperoni pizza.", translation: "Quero uma pizza grande de pepperoni.", context: "Pedido" },
      { id: '3', original: "Can you remove the onions, please?", translation: "Pode tirar a cebola, por favor?", context: "Modificação" },
      { id: '4', original: "How long will it take to arrive?", translation: "Quanto tempo vai levar para chegar?", context: "Tempo" }
    ]
  },
  {
    id: 's16',
    title: 'Regras da Casa',
    description: 'Fale com o proprietário sobre a casa.',
    level: 'Intermediate',
    icon: 'Home',
    color: 'bg-slate-800/50 text-slate-300 border border-slate-600/30',
    hints: ["The sink is broken.", "Can you fix it?"],
    script: [
      { id: '1', original: "Hi, I have an issue in the apartment.", translation: "Oi, estou com um problema no apartamento.", context: "Problema" },
      { id: '2', original: "The kitchen sink is leaking water.", translation: "A pia da cozinha está vazando água.", context: "Detalhe" },
      { id: '3', original: "When can you send someone to fix it?", translation: "Quando pode enviar alguém para consertar?", context: "Agendamento" },
      { id: '4', original: "Thank you for handling this quickly.", translation: "Obrigado por resolver isso rápido.", context: "Agradecimento" }
    ]
  },

  // --- TIER 3: ELITE PROFISSIONAL (Níveis 17-24 + Novos) ---
  {
    id: 's36',
    title: 'No Banco',
    description: 'Abra uma conta ou resolva uma cobrança indevida.',
    level: 'Advanced',
    icon: 'Landmark',
    color: 'bg-green-900/40 text-green-400 border border-green-500/30',
    hints: ["I want to open an account.", "What are the fees?"],
    script: [
      { id: '1', original: "I'd like to open a checking account.", translation: "Gostaria de abrir uma conta corrente.", context: "Serviço" },
      { id: '2', original: "Are there any monthly maintenance fees?", translation: "Existe alguma taxa de manutenção mensal?", context: "Taxas" },
      { id: '3', original: "I noticed a charge I don't recognize.", translation: "Notei uma cobrança que não reconheço.", context: "Problema" },
      { id: '4', original: "How do I set up overdraft protection?", translation: "Como configuro a proteção contra cheque especial?", context: "Configuração" }
    ]
  },
  {
    id: 's17',
    title: 'A Entrevista',
    description: 'Responda perguntas clássicas de entrevista.',
    level: 'Advanced',
    icon: 'Briefcase',
    color: 'bg-blue-900/40 text-blue-400 border border-blue-500/30',
    hints: ["I am adaptable.", "I work hard."],
    script: [
      { id: '1', original: "Good morning, thank you for inviting me.", translation: "Bom dia, obrigado pelo convite.", context: "Início" },
      { id: '2', original: "My greatest strength is my adaptability.", translation: "Meu maior ponto forte é minha adaptabilidade.", context: "Força" },
      { id: '3', original: "I have 5 years of experience in management.", translation: "Tenho 5 anos de experiência em gestão.", context: "Experiência" },
      { id: '4', original: "Do you have any questions for me?", translation: "Você tem alguma pergunta para mim?", context: "Fim" }
    ]
  },
  {
    id: 's37',
    title: 'Aluguel de Carro',
    description: 'Alugue um veículo, recuse seguros extras e entenda o contrato.',
    level: 'Advanced',
    icon: 'CarFront',
    color: 'bg-indigo-900/40 text-indigo-400 border border-indigo-500/30',
    hints: ["I have a reservation.", "Decline insurance."],
    script: [
      { id: '1', original: "Hi, I have a reservation for a compact car.", translation: "Oi, tenho uma reserva para um carro compacto.", context: "Reserva" },
      { id: '2', original: "I would like to decline the extra insurance.", translation: "Gostaria de recusar o seguro extra.", context: "Seguro" },
      { id: '3', original: "Is there a mileage limit on this rental?", translation: "Existe limite de quilometragem neste aluguel?", context: "Regras" },
      { id: '4', original: "Does it need to be returned with a full tank?", translation: "Precisa ser devolvido com o tanque cheio?", context: "Devolução" }
    ]
  },
  {
    id: 's18',
    title: 'O Aumento',
    description: 'Negocie seu salário profissionalmente.',
    level: 'Advanced',
    icon: 'DollarSign',
    color: 'bg-emerald-900/40 text-emerald-400 border border-emerald-500/30',
    hints: ["I want a raise.", "My performance is good."],
    script: [
      { id: '1', original: "I'd like to discuss my compensation.", translation: "Gostaria de discutir minha remuneração.", context: "Abertura" },
      { id: '2', original: "I've exceeded all my targets this year.", translation: "Superei todas as minhas metas este ano.", context: "Argumento" },
      { id: '3', original: "Based on market rates, I'm expecting a 10% raise.", translation: "Baseado no mercado, espero um aumento de 10%.", context: "Proposta" },
      { id: '4', original: "Thank you for considering my request.", translation: "Obrigado por considerar meu pedido.", context: "Fechamento" }
    ]
  },
  {
    id: 's19',
    title: 'Standup Ágil',
    description: 'Atualização diária de projeto.',
    level: 'Advanced',
    icon: 'Kanban',
    color: 'bg-purple-900/40 text-purple-400 border border-purple-500/30',
    hints: ["Yesterday I did...", "Today I will..."],
    script: [
      { id: '1', original: "Yesterday, I completed the login feature.", translation: "Ontem, completei a função de login.", context: "Passado" },
      { id: '2', original: "Today, I will focus on the database migration.", translation: "Hoje, vou focar na migração do banco de dados.", context: "Presente" },
      { id: '3', original: "I have no blockers at the moment.", translation: "Não tenho impedimentos no momento.", context: "Blockers" },
      { id: '4', original: "I might need help with the API testing later.", translation: "Talvez precise de ajuda com o teste da API mais tarde.", context: "Ajuda" }
    ]
  },
  {
    id: 's38',
    title: 'Suporte Técnico',
    description: 'Explique problemas no computador para o TI.',
    level: 'Advanced',
    icon: 'Laptop',
    color: 'bg-slate-800/50 text-slate-300 border border-slate-600/30',
    hints: ["My screen is black.", "It won't turn on."],
    script: [
      { id: '1', original: "Hi, my computer keeps freezing randomly.", translation: "Oi, meu computador continua travando aleatoriamente.", context: "Problema" },
      { id: '2', original: "I've already tried restarting it twice.", translation: "Já tentei reiniciar duas vezes.", context: "Tentativa" },
      { id: '3', original: "It happens when I open large spreadsheets.", translation: "Acontece quando abro planilhas grandes.", context: "Gatilho" },
      { id: '4', original: "Can you remote in to take a look?", translation: "Você pode acessar remotamente para dar uma olhada?", context: "Solução" }
    ]
  },
  {
    id: 's20',
    title: 'O Pitch',
    description: 'Apresente uma ideia de negócio.',
    level: 'Advanced',
    icon: 'Presentation',
    color: 'bg-orange-900/40 text-orange-400 border border-orange-500/30',
    hints: ["This product helps...", "The market is big."],
    script: [
      { id: '1', original: "I'd like to present our new strategy.", translation: "Gostaria de apresentar nossa nova estratégia.", context: "Abertura" },
      { id: '2', original: "This approach will increase revenue by 20%.", translation: "Essa abordagem aumentará a receita em 20%.", context: "Benefício" },
      { id: '3', original: "Here is the data that supports my claim.", translation: "Aqui estão os dados que apoiam minha afirmação.", context: "Dados" },
      { id: '4', original: "Does anyone have any questions?", translation: "Alguém tem alguma pergunta?", context: "Q&A" }
    ]
  },
  {
    id: 's21',
    title: 'Networking Poderoso',
    description: 'Faça contatos em um evento.',
    level: 'Advanced',
    icon: 'Users',
    color: 'bg-rose-900/40 text-rose-400 border border-rose-500/30',
    hints: ["What brings you here?", "Let's connect."],
    script: [
      { id: '1', original: "Hi, what brings you to this conference?", translation: "Oi, o que te traz a esta conferência?", context: "Abertura" },
      { id: '2', original: "I work in Fintech as a developer.", translation: "Trabalho em Fintech como desenvolvedor.", context: "Trabalho" },
      { id: '3', original: "I'd love to hear your thoughts on AI.", translation: "Adoraria ouvir sua opinião sobre IA.", context: "Tópico" },
      { id: '4', original: "Here's my card. Let's stay in touch.", translation: "Aqui meu cartão. Vamos manter contato.", context: "Fechamento" }
    ]
  },
  {
    id: 's22',
    title: 'Problema Técnico',
    description: 'Explique um bug para não-técnicos.',
    level: 'Advanced',
    icon: 'Laptop',
    color: 'bg-slate-800/50 text-slate-300 border border-slate-600/30',
    hints: ["The server is down.", "We are fixing it."],
    script: [
      { id: '1', original: "We are currently experiencing a server outage.", translation: "Estamos com uma queda no servidor.", context: "Situação" },
      { id: '2', original: "This is affecting the user login process.", translation: "Isso está afetando o login de usuários.", context: "Impacto" },
      { id: '3', original: "The team is working on a fix right now.", translation: "A equipe está trabalhando na correção agora.", context: "Ação" },
      { id: '4', original: "It should be back up in one hour.", translation: "Deve voltar em uma hora.", context: "Previsão" }
    ]
  },
  {
    id: 's23',
    title: 'Gestão de Crise',
    description: 'Acalme um cliente irritado.',
    level: 'Advanced',
    icon: 'ShieldAlert',
    color: 'bg-rose-900/40 text-rose-400 border border-rose-500/30',
    hints: ["I understand.", "I will fix this."],
    script: [
      { id: '1', original: "I completely understand your frustration.", translation: "Entendo completamente sua frustração.", context: "Empatia" },
      { id: '2', original: "I apologize for the inconvenience caused.", translation: "Peço desculpas pelo inconveniente causado.", context: "Desculpa" },
      { id: '3', original: "Here is how I am going to fix this for you.", translation: "Aqui está como vou consertar isso para você.", context: "Solução" },
      { id: '4', original: "Is there anything else I can help with?", translation: "Posso ajudar com mais alguma coisa?", context: "Fechamento" }
    ]
  },
  {
    id: 's24',
    title: 'Ciclo de Feedback',
    description: 'Dê feedback construtivo.',
    level: 'Advanced',
    icon: 'UserCheck',
    color: 'bg-emerald-900/40 text-emerald-400 border border-emerald-500/30',
    hints: ["Good job.", "Improve this."],
    script: [
      { id: '1', original: "I really appreciate your effort on this project.", translation: "Aprecio muito seu esforço neste projeto.", context: "Positivo" },
      { id: '2', original: "However, I think the design could be cleaner.", translation: "Porém, acho que o design poderia ser mais limpo.", context: "Crítica" },
      { id: '3', original: "Maybe we can simplify the navigation?", translation: "Talvez possamos simplificar a navegação?", context: "Sugestão" },
      { id: '4', original: "What do you think about that?", translation: "O que você acha disso?", context: "Colaboração" }
    ]
  },

  // --- TIER 4: MESTRE NATIVO (Níveis 25-30 + Novos) ---
  {
    id: 's39',
    title: 'Reunião de Pais',
    description: 'Converse com professores sobre o desempenho escolar de um filho.',
    level: 'Master',
    icon: 'GraduationCap',
    color: 'bg-yellow-800/40 text-yellow-300 border border-yellow-600/30',
    hints: ["How is he doing?", "Behavior."],
    script: [
      { id: '1', original: "How is he getting along with the other kids?", translation: "Como ele está se dando com as outras crianças?", context: "Social" },
      { id: '2', original: "Are there any areas where he's struggling?", translation: "Tem alguma área onde ele está com dificuldade?", context: "Desempenho" },
      { id: '3', original: "What can we do at home to support his reading?", translation: "O que podemos fazer em casa para apoiar a leitura dele?", context: "Apoio" },
      { id: '4', original: "Thank you for being so patient with him.", translation: "Obrigado por ser tão paciente com ele.", context: "Gratidão" }
    ]
  },
  {
    id: 's40',
    title: 'Seguro e Sinistros',
    description: 'Ligue para a seguradora para abrir um sinistro.',
    level: 'Master',
    icon: 'FileText',
    color: 'bg-red-900/40 text-red-400 border border-red-500/30',
    hints: ["I need to file a claim.", "Deductible."],
    script: [
      { id: '1', original: "I need to file a claim for water damage.", translation: "Preciso abrir um sinistro por danos causados pela água.", context: "Motivo" },
      { id: '2', original: "What is my deductible for this incident?", translation: "Qual é minha franquia para este incidente?", context: "Custo" },
      { id: '3', original: "Does my policy cover temporary housing?", translation: "Minha apólice cobre moradia temporária?", context: "Cobertura" },
      { id: '4', original: "When will an adjuster come to inspect it?", translation: "Quando um avaliador virá inspecionar?", context: "Processo" }
    ]
  },
  {
    id: 's25',
    title: 'O Debate',
    description: 'Argumente um tópico complexo.',
    level: 'Master',
    icon: 'Scale',
    color: 'bg-purple-900/40 text-purple-400 border border-purple-500/30',
    hints: ["I disagree.", "My point is..."],
    script: [
      { id: '1', original: "I see your point, but I have to disagree.", translation: "Entendo seu ponto, mas tenho que discordar.", context: "Discordância" },
      { id: '2', original: "The data suggests a completely different trend.", translation: "Os dados sugerem uma tendência totalmente diferente.", context: "Evidência" },
      { id: '3', original: "We must consider the ethical implications.", translation: "Devemos considerar as implicações éticas.", context: "Ética" },
      { id: '4', original: "Let's agree to disagree on this.", translation: "Vamos concordar em discordar nisso.", context: "Conclusão" }
    ]
  },
  {
    id: 's26',
    title: 'Papo Espirituoso',
    description: 'Use humor e sarcasmo.',
    level: 'Master',
    icon: 'Smile',
    color: 'bg-orange-900/40 text-orange-400 border border-orange-500/30',
    hints: ["You don't say?", "Whatever."],
    script: [
      { id: '1', original: "Oh, you don't say? That's shocking.", translation: "Ah, não me diga? Que chocante.", context: "Sarcasmo" },
      { id: '2', original: "It's not rocket science, is it?", translation: "Não é ciência de foguetes, né?", context: "Expressão" },
      { id: '3', original: "Better late than never, I guess.", translation: "Antes tarde do que nunca, eu acho.", context: "Ditado" },
      { id: '4', original: "You're pulling my leg, right?", translation: "Você está brincando comigo, né?", context: "Expressão" }
    ]
  },
  {
    id: 's41',
    title: 'Acordo de Aluguel',
    description: 'Negocie termos de aluguel ou quebra de contrato.',
    level: 'Master',
    icon: 'FileKey',
    color: 'bg-slate-800/50 text-slate-300 border border-slate-600/30',
    hints: ["Lease term.", "Security deposit."],
    script: [
      { id: '1', original: "I have a question about the lease renewal clause.", translation: "Tenho uma dúvida sobre a cláusula de renovação.", context: "Contrato" },
      { id: '2', original: "Can we switch to a month-to-month agreement?", translation: "Podemos mudar para um acordo mês a mês?", context: "Negociação" },
      { id: '3', original: "When will my security deposit be returned?", translation: "Quando meu depósito de segurança será devolvido?", context: "Depósito" },
      { id: '4', original: "I need to break my lease early due to work.", translation: "Preciso quebrar meu contrato cedo devido ao trabalho.", context: "Situação" }
    ]
  },
  {
    id: 's42',
    title: 'Serviços da Cidade',
    description: 'Ligue para a prefeitura para reclamar de barulho ou obras.',
    level: 'Master',
    icon: 'Cone',
    color: 'bg-orange-800/40 text-orange-400 border border-orange-600/30',
    hints: ["Noise complaint.", "Construction."],
    script: [
      { id: '1', original: "I'd like to report a noise complaint.", translation: "Gostaria de registrar uma reclamação de barulho.", context: "Reclamação" },
      { id: '2', original: "There is construction work after hours.", translation: "Há obras acontecendo fora do horário permitido.", context: "Detalhe" },
      { id: '3', original: "It has been going on for three nights.", translation: "Isso está acontecendo há três noites.", context: "Duração" },
      { id: '4', original: "Can you send someone to investigate?", translation: "Pode enviar alguém para investigar?", context: "Ação" }
    ]
  },
  {
    id: 's27',
    title: 'Alta Pressão',
    description: 'Chamada de emergência 911.',
    level: 'Master',
    icon: 'Siren',
    color: 'bg-rose-900/40 text-rose-400 border border-rose-500/30',
    hints: ["Help!", "Emergency."],
    script: [
      { id: '1', original: "I have an emergency. I need an ambulance.", translation: "Tenho uma emergência. Preciso de uma ambulância.", context: "Emergência" },
      { id: '2', original: "The location is 123 Main Street.", translation: "O local é Rua Principal, 123.", context: "Local" },
      { id: '3', original: "The person is not breathing.", translation: "A pessoa não está respirando.", context: "Estado" },
      { id: '4', original: "Please hurry!", translation: "Por favor, depressa!", context: "Urgência" }
    ]
  },
  {
    id: 's28',
    title: 'Questão Legal',
    description: 'Fale com a polícia ou advogado.',
    level: 'Master',
    icon: 'Shield',
    color: 'bg-slate-800/50 text-slate-300 border border-slate-600/30',
    hints: ["My lawyer.", "I invoke my rights."],
    script: [
      { id: '1', original: "Am I being detained or am I free to go?", translation: "Estou detido ou estou livre para ir?", context: "Direito" },
      { id: '2', original: "I will not answer any questions without my attorney.", translation: "Não responderei perguntas sem meu advogado.", context: "Proteção" },
      { id: '3', original: "I do not consent to any searches.", translation: "Não consinto com nenhuma revista.", context: "Recusa" },
      { id: '4', original: "I would like to make a phone call.", translation: "Gostaria de fazer uma ligação.", context: "Direito" }
    ]
  },
  {
    id: 's29',
    title: 'Mergulho Profundo',
    description: 'Conversa filosófica.',
    level: 'Master',
    icon: 'Brain',
    color: 'bg-blue-900/40 text-blue-400 border border-blue-500/30',
    hints: ["It's subjective.", "The meaning of life."],
    script: [
      { id: '1', original: "Do you believe free will is an illusion?", translation: "Você acredita que o livre-arbítrio é uma ilusão?", context: "Filosofia" },
      { id: '2', original: "It's somewhat of a paradox, isn't it?", translation: "É um tipo de paradoxo, não é?", context: "Reflexão" },
      { id: '3', original: "Art is subjective, beauty is in the eye of the beholder.", translation: "Arte é subjetiva, a beleza está nos olhos de quem vê.", context: "Arte" },
      { id: '4', original: "That's a profound way to look at it.", translation: "Essa é uma maneira profunda de ver isso.", context: "Concordância" }
    ]
  },
  {
    id: 's30',
    title: 'O Brinde',
    description: 'Discurso de casamento.',
    level: 'Master',
    icon: 'Wine',
    color: 'bg-orange-900/40 text-orange-400 border border-orange-500/30',
    hints: ["Cheers!", "To the couple."],
    script: [
      { id: '1', original: "I'd like to propose a toast to the happy couple.", translation: "Gostaria de propor um brinde ao casal feliz.", context: "Brinde" },
      { id: '2', original: "May your life be filled with joy and laughter.", translation: "Que a vida de vocês seja cheia de alegria e risos.", context: "Votos" },
      { id: '3', original: "Thank you for letting us share this day.", translation: "Obrigado por nos deixar compartilhar este dia.", context: "Gratidão" },
      { id: '4', original: "Cheers to the bride and groom!", translation: "Um brinde aos noivos!", context: "Fim" }
    ]
  }
];

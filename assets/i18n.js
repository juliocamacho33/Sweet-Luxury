/* =========================================================
   Sweet Luxury — Sistema de idiomas (ES / EN / FR / PT)
   ========================================================= */
(function(){

  var LANGS = {
    es: { code:'es', flagCountry:'co', name:'Español' },
    en: { code:'en', flagCountry:'us', name:'English' },
    fr: { code:'fr', flagCountry:'fr', name:'Français' },
    pt: { code:'pt', flagCountry:'br', name:'Português' }
  };

  function flagUrl(countryCode){
    return 'https://flagcdn.com/w80/' + countryCode + '.png';
  }

  /* ---------- Moneda por idioma ----------
     Tasas aproximadas frente al COP (peso colombiano), la moneda base de los
     precios del catálogo. Referencia: agosto 2026. Actualizar periódicamente. */
  var CURRENCY = {
    es: { code:'COP', symbol:'$',  locale:'es-CO', perCOP:1 },
    en: { code:'USD', symbol:'$',  locale:'en-US', perCOP:1/3200 },
    fr: { code:'EUR', symbol:'€',  locale:'fr-FR', perCOP:1/4300 },
    pt: { code:'BRL', symbol:'R$', locale:'pt-BR', perCOP:1/628 }
  };

  function formatPrice(cop, lang){
    lang = lang || getLang();
    var cur = CURRENCY[lang] || CURRENCY.es;
    var converted = Math.round(Number(cop) * cur.perCOP);
    var formatted;
    try{ formatted = converted.toLocaleString(cur.locale); }catch(e){ formatted = String(converted); }
    return cur.symbol + formatted + ' ' + cur.code;
  }

  /* ---------- Textos estáticos por clave ---------- */
  var T = {

    /* Navegación / header / footer (compartido en todas las páginas) */
    nav_home:        { es:"Inicio", en:"Home", fr:"Accueil", pt:"Início" },
    nav_collections: { es:"Colecciones", en:"Collections", fr:"Collections", pt:"Coleções" },
    nav_about:        { es:"Nosotros", en:"About", fr:"À propos", pt:"Sobre nós" },
    nav_contact:      { es:"Contacto", en:"Contact", fr:"Contact", pt:"Contato" },
    nav_toggle_aria:  { es:"Abrir menú", en:"Open menu", fr:"Ouvrir le menu", pt:"Abrir menu" },
    theme_toggle_aria:{ es:"Cambiar a modo oscuro", en:"Switch to dark mode", fr:"Passer en mode sombre", pt:"Mudar para modo escuro" },
    theme_toggle_aria_light:{ es:"Cambiar a modo claro", en:"Switch to light mode", fr:"Passer en mode clair", pt:"Mudar para modo claro" },
    lang_switcher_aria:{ es:"Cambiar idioma", en:"Change language", fr:"Changer de langue", pt:"Mudar idioma" },
    footer_legal:     { es:"© 2026 Sweet Luxury. Todos los derechos reservados.", en:"© 2026 Sweet Luxury. All rights reserved.", fr:"© 2026 Sweet Luxury. Tous droits réservés.", pt:"© 2026 Sweet Luxury. Todos os direitos reservados." },

    /* Reutilizables entre páginas */
    m_custom:  { es:"Joyería a la medida", en:"Custom-made jewelry", fr:"Bijouterie sur mesure", pt:"Joalheria sob medida" },
    m_unique:  { es:"Pieza única", en:"One-of-a-kind piece", fr:"Pièce unique", pt:"Peça única" },
    cta_whatsapp_write: { es:"Escribir por WhatsApp", en:"Message us on WhatsApp", fr:"Écrire sur WhatsApp", pt:"Escrever pelo WhatsApp" },
    cta_whatsapp_talk:  { es:"Hablar por WhatsApp", en:"Chat on WhatsApp", fr:"Discuter sur WhatsApp", pt:"Falar pelo WhatsApp" },

    /* ---------- index.html ---------- */
    hero_eyebrow: { es:"Sweet Luxury · 3 años seleccionando esmeraldas", en:"Sweet Luxury · 3 years selecting emeralds", fr:"Sweet Luxury · 3 ans à sélectionner des émeraudes", pt:"Sweet Luxury · 3 anos selecionando esmeraldas" },
    hero_title: { es:"Esmeraldas colombianas, elegidas una a una", en:"Colombian emeralds, chosen one by one", fr:"Émeraudes colombiennes, choisies une à une", pt:"Esmeraldas colombianas, escolhidas uma a uma" },
    hero_desc: { es:"Piedras de mina colombiana seleccionadas con criterio, desde piezas clásicas hasta piezas exclusivas. Origen verificado y asesoría cercana en cada compra.", en:"Stones from Colombian mines, carefully selected from classic to exclusive pieces. Verified origin and close guidance with every purchase.", fr:"Pierres de mines colombiennes sélectionnées avec exigence, des pièces classiques aux pièces exclusives. Origine vérifiée et accompagnement personnalisé à chaque achat.", pt:"Pedras de minas colombianas selecionadas com critério, de peças clássicas a peças exclusivas. Origem verificada e assessoria próxima em cada compra." },
    hero_cta_collection: { es:"Ver colección", en:"View collection", fr:"Voir la collection", pt:"Ver coleção" },

    m_emeralds: { es:"Esmeraldas colombianas", en:"Colombian emeralds", fr:"Émeraudes colombiennes", pt:"Esmeraldas colombianas" },
    m_origin:   { es:"Origen verificado", en:"Verified origin", fr:"Origine vérifiée", pt:"Origem verificada" },
    m_advice:   { es:"Asesoría cercana", en:"Close personal guidance", fr:"Accompagnement personnalisé", pt:"Assessoria próxima" },

    trust1_h: { es:"Origen colombiano", en:"Colombian origin", fr:"Origine colombienne", pt:"Origem colombiana" },
    trust1_p: { es:"Esmeraldas provenientes de minas colombianas, seleccionadas pieza por pieza.", en:"Emeralds from Colombian mines, selected piece by piece.", fr:"Émeraudes provenant de mines colombiennes, sélectionnées pièce par pièce.", pt:"Esmeraldas provenientes de minas colombianas, selecionadas peça por peça." },
    trust2_h: { es:"Transparencia total", en:"Full transparency", fr:"Transparence totale", pt:"Transparência total" },
    trust2_p: { es:"Quilates, medidas y tratamiento de cada piedra, sin letra pequeña.", en:"Carats, measurements and treatment of every stone, no fine print.", fr:"Carats, dimensions et traitement de chaque pierre, sans petites lignes.", pt:"Quilates, medidas e tratamento de cada pedra, sem letras miúdas." },
    trust3_p: { es:"Diseñamos y montamos la pieza en oro o plata según tu idea.", en:"We design and set the piece in gold or silver, based on your idea.", fr:"Nous créons et montons la pièce en or ou en argent selon votre idée.", pt:"Desenhamos e montamos a peça em ouro ou prata conforme sua ideia." },

    why_eyebrow: { es:"Por qué Sweet Luxury", en:"Why Sweet Luxury", fr:"Pourquoi Sweet Luxury", pt:"Por que Sweet Luxury" },
    why_title: { es:"Tres años eligiendo esmeraldas con criterio", en:"Three years choosing emeralds with care", fr:"Trois ans à choisir des émeraudes avec exigence", pt:"Três anos escolhendo esmeraldas com critério" },
    why1_h: { es:"Selección personal de cada piedra", en:"Personal selection of every stone", fr:"Sélection personnelle de chaque pierre", pt:"Seleção pessoal de cada pedra" },
    why1_p: { es:"Cada esmeralda pasa por una revisión individual de color, cristal y proporción antes de ofrecerse.", en:"Every emerald goes through an individual review of color, crystal and proportion before it's offered.", fr:"Chaque émeraude fait l'objet d'un examen individuel de couleur, de cristal et de proportion avant d'être proposée.", pt:"Cada esmeralda passa por uma revisão individual de cor, cristal e proporção antes de ser oferecida." },
    why2_h: { es:"Niveles claros", en:"Clear tiers", fr:"Niveaux clairs", pt:"Níveis claros" },
    why2_p: { es:"Colecciones Clásica, Premium y Exclusiva para distintos presupuestos y ocasiones, sin perder calidad.", en:"Classic, Premium and Exclusive collections for different budgets and occasions, without losing quality.", fr:"Collections Classique, Premium et Exclusive pour différents budgets et occasions, sans compromis sur la qualité.", pt:"Coleções Clássica, Premium e Exclusiva para diferentes orçamentos e ocasiões, sem perder qualidade." },
    why3_h: { es:"Información honesta", en:"Honest information", fr:"Information honnête", pt:"Informação honesta" },
    why3_p: { es:"Se indica siempre el tratamiento de cada piedra: Sin tratamiento, ACEITE o PERMA.", en:"The treatment of every stone is always disclosed: No treatment, OIL or PERMA.", fr:"Le traitement de chaque pierre est toujours indiqué : Sans traitement, HUILE ou PERMA.", pt:"O tratamento de cada pedra é sempre indicado: Sem tratamento, ÓLEO ou PERMA." },
    why4_h: { es:"Acompañamiento cercano", en:"Close support", fr:"Accompagnement personnalisé", pt:"Acompanhamento próximo" },
    why4_p: { es:"Asesoría directa por WhatsApp para elegir la piedra o diseñar la joya correcta.", en:"Direct guidance via WhatsApp to choose the right stone or design the right piece.", fr:"Conseils directs par WhatsApp pour choisir la bonne pierre ou concevoir le bon bijou.", pt:"Assessoria direta pelo WhatsApp para escolher a pedra ou desenhar a joia certa." },

    showcase_eyebrow: { es:"Vitrina", en:"Showcase", fr:"Vitrine", pt:"Vitrine" },
    showcase_title: { es:"Piezas destacadas", en:"Featured pieces", fr:"Pièces en vedette", pt:"Peças em destaque" },
    showcase_prev_aria: { es:"Ver piezas anteriores", en:"View previous pieces", fr:"Voir les pièces précédentes", pt:"Ver peças anteriores" },
    showcase_next_aria: { es:"Ver más piezas", en:"View more pieces", fr:"Voir plus de pièces", pt:"Ver mais peças" },
    showcase_hint: { es:"Desliza para ver más piezas", en:"Swipe to see more pieces", fr:"Faites glisser pour voir plus de pièces", pt:"Deslize para ver mais peças" },
    showcase_view_all: { es:"Ver toda la colección", en:"View full collection", fr:"Voir toute la collection", pt:"Ver toda a coleção" },

    process_eyebrow: { es:"Nuestro proceso", en:"Our process", fr:"Notre processus", pt:"Nosso processo" },
    process_title: { es:"De la mina a tus manos", en:"From the mine to your hands", fr:"De la mine à vos mains", pt:"Da mina às suas mãos" },
    process_desc: { es:"Cada esmeralda recorre el mismo camino antes de llegar a ti: así cuidamos cada paso.", en:"Every emerald follows the same journey before reaching you: this is how we care for each step.", fr:"Chaque émeraude suit le même parcours avant d'arriver jusqu'à vous : c'est ainsi que nous soignons chaque étape.", pt:"Cada esmeralda percorre o mesmo caminho antes de chegar até você: assim cuidamos de cada etapa." },
    step1_num: { es:"01 · Origen", en:"01 · Origin", fr:"01 · Origine", pt:"01 · Origem" },
    step1_h: { es:"En la mina", en:"At the mine", fr:"À la mine", pt:"Na mina" },
    step1_p: { es:"La piedra sale de las minas del cinturón esmeraldifero de Boyacá: Muzo, Chivor, Coscuez o La Pita, cada una con un carácter de color distinto.", en:"The stone comes from the mines of the Boyacá emerald belt: Muzo, Chivor, Coscuez or La Pita, each with a distinct color character.", fr:"La pierre provient des mines de la ceinture émeraudifère de Boyacá : Muzo, Chivor, Coscuez ou La Pita, chacune avec un caractère de couleur distinct.", pt:"A pedra sai das minas do cinturão esmeraldifero de Boyacá: Muzo, Chivor, Coscuez ou La Pita, cada uma com um caráter de cor distinto." },
    step2_num: { es:"02 · Selección", en:"02 · Selection", fr:"02 · Sélection", pt:"02 · Seleção" },
    step2_h: { es:"Revisión piedra por piedra", en:"Stone-by-stone review", fr:"Examen pierre par pierre", pt:"Revisão pedra por pedra" },
    step2_p: { es:"Evaluamos color, cristal y proporción de cada esmeralda de forma individual, antes de considerarla parte de la colección.", en:"We evaluate the color, crystal and proportion of every emerald individually, before it becomes part of the collection.", fr:"Nous évaluons individuellement la couleur, le cristal et la proportion de chaque émeraude, avant de l'intégrer à la collection.", pt:"Avaliamos cor, cristal e proporção de cada esmeralda de forma individual, antes de considerá-la parte da coleção." },
    step3_num: { es:"03 · Transparencia", en:"03 · Transparency", fr:"03 · Transparence", pt:"03 · Transparência" },
    step3_h: { es:"Se documenta todo", en:"Everything is documented", fr:"Tout est documenté", pt:"Tudo é documentado" },
    step3_p: { es:"Quilates, medidas y tratamiento —Sin tratamiento, ACEITE o PERMA— quedan indicados con claridad, sin letra pequeña.", en:"Carats, measurements and treatment —No treatment, OIL or PERMA— are clearly stated, no fine print.", fr:"Carats, dimensions et traitement —Sans traitement, HUILE ou PERMA— sont indiqués clairement, sans petites lignes.", pt:"Quilates, medidas e tratamento —Sem tratamento, ÓLEO ou PERMA— são indicados com clareza, sem letras miúdas." },
    step4_num: { es:"04 · A tus manos", en:"04 · In your hands", fr:"04 · Entre vos mains", pt:"04 · Em suas mãos" },
    step4_h: { es:"Asesoría y, si quieres, montaje", en:"Guidance and, if you like, setting", fr:"Conseils et, si vous le souhaitez, montage", pt:"Assessoria e, se quiser, montagem" },
    step4_p: { es:"Te acompañamos por WhatsApp para elegir la piedra correcta y, si lo deseas, la montamos en oro o plata a tu medida.", en:"We'll guide you on WhatsApp to choose the right stone and, if you'd like, set it in gold or silver to your measurements.", fr:"Nous vous accompagnons par WhatsApp pour choisir la bonne pierre et, si vous le souhaitez, la monter en or ou en argent à votre mesure.", pt:"Acompanhamos você pelo WhatsApp para escolher a pedra certa e, se quiser, montamos em ouro ou prata sob medida." },

    final_title_index: { es:"¿Lista para elegir tu esmeralda?", en:"Ready to choose your emerald?", fr:"Prête à choisir votre émeraude ?", pt:"Pronta para escolher sua esmeralda?" },
    final_desc_index: { es:"Escríbenos por WhatsApp y te asesoramos según presupuesto, quilates u ocasión.", en:"Message us on WhatsApp and we'll guide you based on budget, carats or occasion.", fr:"Écrivez-nous sur WhatsApp et nous vous conseillerons selon votre budget, vos carats ou l'occasion.", pt:"Escreva-nos pelo WhatsApp e te orientamos conforme orçamento, quilates ou ocasião." },

    vm1: { es:"Origen colombiano verificado", en:"Verified Colombian origin", fr:"Origine colombienne vérifiée", pt:"Origem colombiana verificada" },
    vm2: { es:"Quilates y medidas reales", en:"Real carats and measurements", fr:"Carats et dimensions réels", pt:"Quilates e medidas reais" },
    vm3: { es:"Tratamiento siempre declarado", en:"Treatment always disclosed", fr:"Traitement toujours déclaré", pt:"Tratamento sempre declarado" },
    vm4: { es:"Piezas únicas e irrepetibles", en:"One-of-a-kind, non-repeatable pieces", fr:"Pièces uniques et non reproductibles", pt:"Peças únicas e irrepetíveis" },
    vm5: { es:"Asesoría por WhatsApp", en:"Guidance via WhatsApp", fr:"Accompagnement via WhatsApp", pt:"Assessoria pelo WhatsApp" },
    vm6: { es:"Envíos nacionales e internacionales", en:"Domestic and international shipping", fr:"Livraisons nationales et internationales", pt:"Envios nacionais e internacionais" },

    /* ---------- colecciones.html ---------- */
    coll_h1: { es:"Clásica, Premium y Exclusiva", en:"Classic, Premium and Exclusive", fr:"Classique, Premium et Exclusive", pt:"Clássica, Premium e Exclusiva" },
    coll_desc: { es:"Cada piedra indica quilates, medidas, origen y tratamiento. Filtra por nivel, precio o quilates para encontrar la esmeralda correcta.", en:"Every stone lists carats, measurements, origin and treatment. Filter by level, price or carats to find the right emerald.", fr:"Chaque pierre indique carats, dimensions, origine et traitement. Filtrez par niveau, prix ou carats pour trouver la bonne émeraude.", pt:"Cada pedra indica quilates, medidas, origem e tratamento. Filtre por nível, preço ou quilates para encontrar a esmeralda certa." },

    lvl1_p: { es:"Piedras de entrada, ideales para primera compra o piezas sencillas.", en:"Entry-level stones, ideal for a first purchase or simple pieces.", fr:"Pierres d'entrée de gamme, idéales pour un premier achat ou des pièces simples.", pt:"Pedras de entrada, ideais para primeira compra ou peças simples." },
    lvl1_range: { es:"Desde $400.000", en:"From $400,000 COP", fr:"À partir de 400 000 $ COP", pt:"A partir de $400.000 COP" },
    lvl2_p: { es:"Mayor tamaño y calidad de cristal, para joyería de uso frecuente.", en:"Larger size and crystal quality, for everyday jewelry.", fr:"Plus grande taille et meilleure qualité de cristal, pour des bijoux du quotidien.", pt:"Maior tamanho e qualidade de cristal, para joalheria de uso frequente." },
    lvl3_p: { es:"Piezas de alta gama, tamaño y pureza excepcionales.", en:"High-end pieces, exceptional size and purity.", fr:"Pièces haut de gamme, taille et pureté exceptionnelles.", pt:"Peças de alta gama, tamanho e pureza excepcionais." },
    lvl3_range: { es:"Desde $10.000.000", en:"From $10,000,000 COP", fr:"À partir de 10 000 000 $ COP", pt:"A partir de $10.000.000 COP" },

    filter_level_label: { es:"Nivel", en:"Level", fr:"Niveau", pt:"Nível" },
    filter_all_m: { es:"Todos", en:"All", fr:"Tous", pt:"Todos" },
    filter_all_f: { es:"Todas", en:"All", fr:"Toutes", pt:"Todas" },
    filter_price_label: { es:"Precio máximo", en:"Maximum price", fr:"Prix maximum", pt:"Preço máximo" },
    filter_price_none: { es:"Sin límite", en:"No limit", fr:"Sans limite", pt:"Sem limite" },
    filter_price_1: { es:"Hasta $800.000", en:"Up to $800,000", fr:"Jusqu'à 800 000 $", pt:"Até $800.000" },
    filter_price_2: { es:"Hasta $2.000.000", en:"Up to $2,000,000", fr:"Jusqu'à 2 000 000 $", pt:"Até $2.000.000" },
    filter_price_3: { es:"Hasta $5.000.000", en:"Up to $5,000,000", fr:"Jusqu'à 5 000 000 $", pt:"Até $5.000.000" },
    filter_price_4: { es:"Hasta $10.000.000", en:"Up to $10,000,000", fr:"Jusqu'à 10 000 000 $", pt:"Até $10.000.000" },
    filter_ct_label: { es:"Quilates mínimos", en:"Minimum carats", fr:"Carats minimum", pt:"Quilates mínimos" },
    filter_origin_label: { es:"Origen", en:"Origin", fr:"Origine", pt:"Origem" },
    filter_mine_label: { es:"Mina", en:"Mine", fr:"Mine", pt:"Mina" },
    filter_sort_label: { es:"Ordenar por", en:"Sort by", fr:"Trier par", pt:"Ordenar por" },
    filter_sort_relevance: { es:"Relevancia", en:"Relevance", fr:"Pertinence", pt:"Relevância" },
    filter_sort_price_asc: { es:"Precio: menor a mayor", en:"Price: low to high", fr:"Prix : croissant", pt:"Preço: menor para maior" },
    filter_sort_price_desc: { es:"Precio: mayor a menor", en:"Price: high to low", fr:"Prix : décroissant", pt:"Preço: maior para menor" },
    filter_sort_ct_asc: { es:"Quilates: menor a mayor", en:"Carats: low to high", fr:"Carats : croissant", pt:"Quilates: menor para maior" },
    filter_sort_ct_desc: { es:"Quilates: mayor a menor", en:"Carats: high to low", fr:"Carats : décroissant", pt:"Quilates: maior para menor" },
    filter_fav_toggle: { es:"Solo favoritos", en:"Favorites only", fr:"Favoris uniquement", pt:"Somente favoritos" },
    filter_reset: { es:"Limpiar filtros", en:"Clear filters", fr:"Réinitialiser les filtres", pt:"Limpar filtros" },

    note1: { es:"Cada piedra es única e irrepetible: no hay dos iguales. Certificado gemológico disponible bajo pedido (costo adicional) — preguntános por WhatsApp.", en:"Every stone is one of a kind: no two are alike. Gemological certificate available on request (additional cost) — ask us on WhatsApp.", fr:"Chaque pierre est unique : il n'y en a pas deux identiques. Certificat gemmologique disponible sur demande (coût supplémentaire) — demandez-nous sur WhatsApp.", pt:"Cada pedra é única e irrepetível: não há duas iguais. Certificado gemológico disponível sob encomenda (custo adicional) — pergunte-nos pelo WhatsApp." },
    note2: { es:"La mina solo está identificada en algunas piezas por ahora; el resto figura como “sin especificar” hasta confirmarla.", en:"The mine is only identified for some pieces for now; the rest are listed as “unspecified” until confirmed.", fr:"La mine n'est identifiée que pour certaines pièces pour l'instant ; les autres figurent comme « non précisée » jusqu'à confirmation.", pt:"A mina só está identificada em algumas peças por enquanto; o restante consta como “não especificada” até ser confirmada." },

    empty_state: { es:"No hay piezas que coincidan con estos filtros. Escríbenos por WhatsApp y buscamos la piedra ideal para ti.", en:"No pieces match these filters. Message us on WhatsApp and we'll find the ideal stone for you.", fr:"Aucune pièce ne correspond à ces filtres. Écrivez-nous sur WhatsApp et nous trouverons la pierre idéale pour vous.", pt:"Nenhuma peça corresponde a estes filtros. Escreva-nos pelo WhatsApp e buscamos a pedra ideal para você." },

    coll_final_title: { es:"¿Buscas algo específico?", en:"Looking for something specific?", fr:"Vous cherchez quelque chose de précis ?", pt:"Está procurando algo específico?" },
    coll_final_desc: { es:"Cuéntanos quilates, presupuesto u ocasión y te mostramos opciones que no están publicadas aún.", en:"Tell us the carats, budget or occasion and we'll show you options that aren't published yet.", fr:"Indiquez-nous les carats, le budget ou l'occasion et nous vous montrerons des options pas encore publiées.", pt:"Conte-nos quilates, orçamento ou ocasião e mostramos opções que ainda não estão publicadas." },

    modal_close_aria: { es:"Cerrar", en:"Close", fr:"Fermer", pt:"Fechar" },
    modal_label_ct: { es:"Quilates", en:"Carats", fr:"Carats", pt:"Quilates" },
    modal_label_origin: { es:"Origen", en:"Origin", fr:"Origine", pt:"Origem" },
    modal_label_mine: { es:"Mina", en:"Mine", fr:"Mine", pt:"Mina" },
    modal_label_treatment: { es:"Tratamiento", en:"Treatment", fr:"Traitement", pt:"Tratamento" },
    modal_whatsapp_cta: { es:"Preguntar por esta pieza", en:"Ask about this piece", fr:"Demander cette pièce", pt:"Perguntar sobre esta peça" },

    compare_clear: { es:"Vaciar", en:"Clear", fr:"Vider", pt:"Esvaziar" },
    compare_go: { es:"Comparar", en:"Compare", fr:"Comparer", pt:"Comparar" },
    compare_eyebrow: { es:"Comparador", en:"Comparison", fr:"Comparateur", pt:"Comparador" },
    compare_ask: { es:"Preguntar", en:"Ask", fr:"Demander", pt:"Perguntar" },
    compare_alert_max3: { es:"Puedes comparar máximo 3 piezas a la vez.", en:"You can compare up to 3 pieces at a time.", fr:"Vous pouvez comparer 3 pièces maximum à la fois.", pt:"Você pode comparar no máximo 3 peças por vez." },
    compare_alert_min2: { es:"Selecciona al menos 2 piezas para comparar.", en:"Select at least 2 pieces to compare.", fr:"Sélectionnez au moins 2 pièces à comparer.", pt:"Selecione pelo menos 2 peças para comparar." },
    piece_compare_label: { es:"Comparar esta pieza", en:"Compare this piece", fr:"Comparer cette pièce", pt:"Comparar esta peça" },
    fav_aria: { es:"Guardar en favoritos", en:"Save to favorites", fr:"Ajouter aux favoris", pt:"Salvar nos favoritos" },
    label_price: { es:"Precio", en:"Price", fr:"Prix", pt:"Preço" },
    label_from: { es:"Desde", en:"From", fr:"À partir de", pt:"A partir de" },
    label_upto: { es:"Hasta", en:"Up to", fr:"Jusqu'à", pt:"Até" },
    label_no_limit: { es:"Sin límite", en:"No limit", fr:"Sans limite", pt:"Sem limite" },
    label_piece_found_singular: { es:"pieza encontrada", en:"piece found", fr:"pièce trouvée", pt:"peça encontrada" },
    label_piece_found_plural: { es:"piezas encontradas", en:"pieces found", fr:"pièces trouvées", pt:"peças encontradas" },
    label_piece_selected_singular: { es:"pieza seleccionada", en:"piece selected", fr:"pièce sélectionnée", pt:"peça selecionada" },
    label_piece_selected_plural: { es:"piezas seleccionadas", en:"pieces selected", fr:"pièces sélectionnées", pt:"peças selecionadas" },
    compare_modal_title_suffix: { es:"piezas lado a lado", en:"pieces side by side", fr:"pièces côte à côte", pt:"peças lado a lado" },
    fav_whatsapp_label: { es:"Enviar favoritos", en:"Send favorites", fr:"Envoyer les favoris", pt:"Enviar favoritos" },
    fav_whatsapp_msg_intro: { es:"Hola Sweet Luxury, me interesan estas piezas:", en:"Hi Sweet Luxury, I'm interested in these pieces:", fr:"Bonjour Sweet Luxury, ces pièces m'intéressent :", pt:"Olá Sweet Luxury, tenho interesse nestas peças:" },
    piece_whatsapp_msg_intro: { es:"Hola Sweet Luxury, me interesa esta pieza:", en:"Hi Sweet Luxury, I'm interested in this piece:", fr:"Bonjour Sweet Luxury, cette pièce m'intéresse :", pt:"Olá Sweet Luxury, tenho interesse nesta peça:" },

    /* ---------- colecciones.html: funciones nuevas (precio/ct, similares, rareza, ficha, gráfico) ---------- */
    filter_treatment_label: { es:"Tratamiento", en:"Treatment", fr:"Traitement", pt:"Tratamento" },
    filter_sort_value: { es:"Mejor precio por quilate", en:"Best price per carat", fr:"Meilleur prix au carat", pt:"Melhor preço por quilate" },
    label_price_per_ct: { es:"Precio por quilate", en:"Price per carat", fr:"Prix au carat", pt:"Preço por quilate" },
    value_range_label: { es:"Referencia de precio por quilate", en:"Price-per-carat reference", fr:"Référence de prix au carat", pt:"Referência de preço por quilate" },
    similar_pieces_title: { es:"También te puede interesar", en:"You may also like", fr:"Vous pourriez aussi aimer", pt:"Você também pode gostar" },
    compare_best_value: { es:"Mejor valor", en:"Best value", fr:"Meilleure valeur", pt:"Melhor valor" },
    share_piece_label: { es:"Compartir", en:"Share", fr:"Partager", pt:"Compartilhar" },
    share_copied_msg: { es:"Enlace copiado", en:"Link copied", fr:"Lien copié", pt:"Link copiado" },
    recently_viewed_title: { es:"Vistos recientemente", en:"Recently viewed", fr:"Vus récemment", pt:"Vistos recentemente" },
    rarity_note: { es:"Entre el {pct}% de piezas más grandes de nuestro catálogo actual, por quilates.", en:"Among the top {pct}% largest pieces in our current catalog, by carats.", fr:"Parmi les {pct}% de pièces les plus grandes de notre catalogue actuel, en carats.", pt:"Entre as {pct}% peças maiores de nosso catálogo atual, por quilates." },
    download_sheet_btn: { es:"Descargar ficha técnica", en:"Download spec sheet", fr:"Télécharger la fiche technique", pt:"Baixar ficha técnica" },
    sheet_title_label: { es:"Ficha técnica", en:"Spec sheet", fr:"Fiche technique", pt:"Ficha técnica" },
    sheet_print_btn: { es:"Imprimir / Guardar como PDF", en:"Print / Save as PDF", fr:"Imprimer / Enregistrer en PDF", pt:"Imprimir / Salvar como PDF" },
    sheet_footer_note: { es:"Pieza única — no hay dos esmeraldas iguales. Certificado gemológico disponible bajo pedido.", en:"One-of-a-kind piece — no two emeralds are alike. Gemological certificate available on request.", fr:"Pièce unique — il n'y a pas deux émeraudes identiques. Certificat gemmologique disponible sur demande.", pt:"Peça única — não há duas esmeraldas iguais. Certificado gemológico disponível sob encomenda." },
    chart_toggle_show: { es:"Ver gráfico de valor", en:"View value chart", fr:"Voir le graphique de valeur", pt:"Ver gráfico de valor" },
    chart_toggle_hide: { es:"Ocultar gráfico de valor", en:"Hide value chart", fr:"Masquer le graphique de valeur", pt:"Ocultar gráfico de valor" },
    chart_title: { es:"Quilates vs. precio de todo el catálogo", en:"Carats vs. price across the whole catalog", fr:"Carats vs. prix de tout le catalogue", pt:"Quilates vs. preço de todo o catálogo" },
    chart_axis_ct: { es:"Quilates →", en:"Carats →", fr:"Carats →", pt:"Quilates →" },
    chart_axis_price: { es:"Precio ↑", en:"Price ↑", fr:"Prix ↑", pt:"Preço ↑" },
    chart_hint: { es:"Toca un punto para ver la pieza", en:"Tap a dot to view the piece", fr:"Touchez un point pour voir la pièce", pt:"Toque em um ponto para ver a peça" },

    /* ---------- nosotros.html ---------- */
    about_h1: { es:"Nuestra historia", en:"Our story", fr:"Notre histoire", pt:"Nossa história" },
    about_since: { es:"Desde 2023", en:"Since 2023", fr:"Depuis 2023", pt:"Desde 2023" },
    about_story_h2: { es:"Tres años dedicados a la esmeralda colombiana", en:"Three years devoted to the Colombian emerald", fr:"Trois ans dédiés à l'émeraude colombienne", pt:"Três anos dedicados à esmeralda colombiana" },
    about_story_p1: { es:"Sweet Luxury nació en Bogotá de una pasión simple: la esmeralda colombiana, una de las piedras más apreciadas del mundo, merece ser elegida con el mismo cuidado con el que se extrae de la tierra.", en:"Sweet Luxury was born in Bogotá from a simple passion: the Colombian emerald, one of the world's most prized stones, deserves to be chosen with the same care with which it's drawn from the earth.", fr:"Sweet Luxury est née à Bogotá d'une passion simple : l'émeraude colombienne, l'une des pierres les plus appréciées au monde, mérite d'être choisie avec le même soin que celui mis à l'extraire de la terre.", pt:"A Sweet Luxury nasceu em Bogotá de uma paixão simples: a esmeralda colombiana, uma das pedras mais apreciadas do mundo, merece ser escolhida com o mesmo cuidado com que é extraída da terra." },
    about_story_p2: { es:"Durante estos tres años hemos revisado piedra por piedra, aprendiendo a distinguir color, cristal y tratamiento con el mismo criterio que exigimos para nuestra propia colección. Ese hábito de mirar de cerca cada esmeralda es lo que hoy define a Sweet Luxury.", en:"Over these three years we've reviewed stone by stone, learning to tell apart color, crystal and treatment with the same standards we demand for our own collection. That habit of looking closely at every emerald is what defines Sweet Luxury today.", fr:"Au cours de ces trois années, nous avons examiné pierre par pierre, apprenant à distinguer couleur, cristal et traitement avec la même exigence que celle que nous demandons pour notre propre collection. Cette habitude d'observer de près chaque émeraude est ce qui définit aujourd'hui Sweet Luxury.", pt:"Durante estes três anos revisamos pedra por pedra, aprendendo a distinguir cor, cristal e tratamento com o mesmo critério que exigimos para nossa própria coleção. Esse hábito de olhar de perto cada esmeralda é o que hoje define a Sweet Luxury." },
    about_story_p3: { es:"Hoy trabajamos con clientes que buscan desde su primera esmeralda hasta piezas exclusivas para joyería fina, siempre con la misma promesa: transparencia sobre el origen y el tratamiento de cada piedra.", en:"Today we work with clients looking for everything from their first emerald to exclusive pieces for fine jewelry, always with the same promise: transparency about the origin and treatment of every stone.", fr:"Aujourd'hui, nous travaillons avec des clients qui recherchent aussi bien leur première émeraude que des pièces exclusives pour la joaillerie fine, toujours avec la même promesse : la transparence sur l'origine et le traitement de chaque pierre.", pt:"Hoje trabalhamos com clientes que buscam desde sua primeira esmeralda até peças exclusivas para joalheria fina, sempre com a mesma promessa: transparência sobre a origem e o tratamento de cada pedra." },

    origin_eyebrow: { es:"Origen", en:"Origin", fr:"Origine", pt:"Origem" },
    origin_h2: { es:"Las minas que le dan carácter a cada esmeralda", en:"The mines that give each emerald its character", fr:"Les mines qui donnent son caractère à chaque émeraude", pt:"As minas que dão caráter a cada esmeralda" },
    origin_desc: { es:"Colombia concentra las minas de esmeralda más reconocidas del mundo, y cada una imprime un carácter distinto a la piedra. Esto es lo que distingue a las cuatro minas históricas del cinturón esmeraldifero de Boyacá.", en:"Colombia is home to the world's most renowned emerald mines, and each one gives the stone a distinct character. Here's what sets apart the four historic mines of the Boyacá emerald belt.", fr:"La Colombie concentre les mines d'émeraude les plus renommées au monde, et chacune donne un caractère distinct à la pierre. Voici ce qui distingue les quatre mines historiques de la ceinture émeraudifère de Boyacá.", pt:"A Colômbia concentra as minas de esmeralda mais reconhecidas do mundo, e cada uma imprime um caráter distinto à pedra. Isto é o que distingue as quatro minas históricas do cinturão esmeraldifero de Boyacá." },
    mine1_p: { es:"La mina más célebre de Colombia. Produce el clásico verde intenso y cálido, con un ligero matiz amarillento — el tono que la tradición joyera llama “gota de aceite”.", en:"Colombia's most famous mine. It produces the classic intense, warm green, with a slight yellowish hue — the tone the jewelry tradition calls “oil drop.”", fr:"La mine la plus célèbre de Colombie. Elle produit le vert intense et chaud classique, avec une légère teinte jaunâtre — la nuance que la tradition joaillière appelle « goutte d'huile ».", pt:"A mina mais célebre da Colômbia. Produz o clássico verde intenso e quente, com um leve matiz amarelado — o tom que a tradição joalheira chama de “gota de óleo”." },
    mine2_p: { es:"Al oriente de Boyacá, una de las minas históricas más antiguas. Da esmeraldas de verde más frío y azulado, con gran transparencia y pocas inclusiones.", en:"To the east of Boyacá, one of the oldest historic mines. It yields emeralds with a cooler, bluer green, with great transparency and few inclusions.", fr:"À l'est de Boyacá, l'une des mines historiques les plus anciennes. Elle donne des émeraudes d'un vert plus froid et bleuté, avec une grande transparence et peu d'inclusions.", pt:"A leste de Boyacá, uma das minas históricas mais antigas. Dá esmeraldas de verde mais frio e azulado, com grande transparência e poucas inclusões." },
    mine3_p: { es:"Vecina de Muzo y una de las minas más productivas del país. Ofrece el rango de tonos más amplio, desde verdes intensos hasta piedras más claras, para presupuestos muy distintos.", en:"Neighboring Muzo, and one of the country's most productive mines. It offers the widest range of tones, from intense greens to lighter stones, for very different budgets.", fr:"Voisine de Muzo, c'est l'une des mines les plus productives du pays. Elle offre la gamme de teintes la plus large, des verts intenses aux pierres plus claires, pour des budgets très différents.", pt:"Vizinha de Muzo e uma das minas mais produtivas do país. Oferece a gama de tons mais ampla, de verdes intensos a pedras mais claras, para orçamentos bem diferentes." },
    mine4_p: { es:"Ubicada entre Muzo y Coscuez, es de las productoras más importantes de las últimas décadas. De sus vetas salen algunos de los cristales más grandes y de mejor calidad que hoy se extraen en Colombia.", en:"Located between Muzo and Coscuez, it's been one of the most important producers of recent decades. Its veins yield some of the largest, highest-quality crystals mined in Colombia today.", fr:"Située entre Muzo et Coscuez, c'est l'une des productrices les plus importantes des dernières décennies. Ses veines livrent certains des plus grands cristaux et de la meilleure qualité extraits aujourd'hui en Colombie.", pt:"Localizada entre Muzo e Coscuez, é uma das produtoras mais importantes das últimas décadas. De seus veios saem alguns dos cristais maiores e de melhor qualidade hoje extraídos na Colômbia." },
    origin_note: { es:"La mina exacta de cada piedra no siempre se certifica sin un laboratorio gemológico; cuando la tengamos identificada por pieza, la indicamos en el catálogo.", en:"The exact mine of each stone can't always be certified without a gemological lab; once we have it identified per piece, we'll note it in the catalog.", fr:"La mine exacte de chaque pierre ne peut pas toujours être certifiée sans laboratoire gemmologique ; dès que nous l'aurons identifiée pour chaque pièce, nous l'indiquerons dans le catalogue.", pt:"A mina exata de cada pedra nem sempre pode ser certificada sem um laboratório gemológico; quando a tivermos identificada por peça, indicaremos no catálogo." },
    mine_map_hint: { es:"Toca una mina para conocer su carácter", en:"Tap a mine to learn its character", fr:"Touchez une mine pour découvrir son caractère", pt:"Toque em uma mina para conhecer seu caráter" },
    mine_map_cta: { es:"Ver piezas de esta mina", en:"View pieces from this mine", fr:"Voir les pièces de cette mine", pt:"Ver peças desta mina" },
    mine_map_none: { es:"Aún no tenemos piezas identificadas de esta mina en el catálogo — pregúntanos por WhatsApp.", en:"We don’t have pieces identified from this mine in the catalog yet — ask us on WhatsApp.", fr:"Nous n’avons pas encore de pièces identifiées de cette mine dans le catalogue — demandez-nous sur WhatsApp.", pt:"Ainda não temos peças identificadas desta mina no catálogo — pergunte-nos pelo WhatsApp." },

    commitment_eyebrow: { es:"Compromiso", en:"Commitment", fr:"Engagement", pt:"Compromisso" },
    commitment_h2: { es:"Lo que garantizamos en cada venta", en:"What we guarantee on every sale", fr:"Ce que nous garantissons à chaque vente", pt:"O que garantimos em cada venda" },
    commit1_h: { es:"Origen verificado", en:"Verified origin", fr:"Origine vérifiée", pt:"Origem verificada" },
    commit1_p: { es:"Cada esmeralda cuenta con información clara sobre su procedencia, colombiana o de otro origen cuando aplique.", en:"Every emerald comes with clear information about its origin, Colombian or otherwise when applicable.", fr:"Chaque émeraude dispose d'informations claires sur sa provenance, colombienne ou d'une autre origine le cas échéant.", pt:"Cada esmeralda conta com informação clara sobre sua procedência, colombiana ou de outra origem quando aplicável." },
    commit2_h: { es:"Transparencia", en:"Transparency", fr:"Transparence", pt:"Transparência" },
    commit2_p: { es:"Quilates, medidas y tratamiento se indican siempre antes de la compra, sin excepciones.", en:"Carats, measurements and treatment are always disclosed before purchase, no exceptions.", fr:"Carats, dimensions et traitement sont toujours indiqués avant l'achat, sans exception.", pt:"Quilates, medidas e tratamento são sempre indicados antes da compra, sem exceções." },
    commit3_h: { es:"Asesoría cercana", en:"Close guidance", fr:"Accompagnement personnalisé", pt:"Assessoria próxima" },
    commit3_p: { es:"Te acompañamos por WhatsApp en cada decisión, desde la elección de la piedra hasta el diseño final.", en:"We're with you on WhatsApp for every decision, from choosing the stone to the final design.", fr:"Nous vous accompagnons par WhatsApp à chaque étape, du choix de la pierre jusqu'au design final.", pt:"Acompanhamos você pelo WhatsApp em cada decisão, desde a escolha da pedra até o design final." },

    glossary_eyebrow: { es:"Glosario", en:"Glossary", fr:"Glossaire", pt:"Glossário" },
    glossary_h2: { es:"Tratamientos de la esmeralda", en:"Emerald treatments", fr:"Traitements de l'émeraude", pt:"Tratamentos da esmeralda" },
    treat1_h: { es:"Sin tratamiento", en:"No treatment", fr:"Sans traitement", pt:"Sem tratamento" },
    treat1_p: { es:"La esmeralda conserva su color y cristal naturales, sin ningún proceso adicional. Son las piezas más buscadas por coleccionistas.", en:"The emerald keeps its natural color and crystal, with no additional process. These are the pieces most sought after by collectors.", fr:"L'émeraude conserve sa couleur et son cristal naturels, sans aucun traitement supplémentaire. Ce sont les pièces les plus recherchées par les collectionneurs.", pt:"A esmeralda conserva sua cor e cristal naturais, sem nenhum processo adicional. São as peças mais procuradas por colecionadores." },
    treat2_h: { es:"ACEITE", en:"OIL", fr:"HUILE", pt:"ÓLEO" },
    treat2_p: { es:"Tratamiento tradicional y ampliamente aceptado en la industria, que mejora la claridad visual rellenando fracturas superficiales con aceite natural.", en:"A traditional treatment, widely accepted in the industry, that improves visual clarity by filling surface fractures with natural oil.", fr:"Traitement traditionnel et largement accepté dans l'industrie, qui améliore la clarté visuelle en comblant les fractures superficielles avec de l'huile naturelle.", pt:"Tratamento tradicional e amplamente aceito na indústria, que melhora a claridade visual preenchendo fraturas superficiais com óleo natural." },
    treat3_h: { es:"PERMA", en:"PERMA", fr:"PERMA", pt:"PERMA" },
    treat3_p: { es:"Tratamiento de relleno más permanente que el aceite, usado para estabilizar fracturas naturales de la piedra a largo plazo.", en:"A more permanent filling treatment than oil, used to stabilize the stone's natural fractures over the long term.", fr:"Traitement de comblement plus permanent que l'huile, utilisé pour stabiliser durablement les fractures naturelles de la pierre.", pt:"Tratamento de preenchimento mais permanente que o óleo, usado para estabilizar fraturas naturais da pedra a longo prazo." },

    before_buy_eyebrow: { es:"Antes de comprar", en:"Before you buy", fr:"Avant d'acheter", pt:"Antes de comprar" },
    before_buy_h2: { es:"Pagos, envíos y certificación", en:"Payments, shipping and certification", fr:"Paiements, livraison et certification", pt:"Pagamentos, envios e certificação" },
    policy1_h: { es:"Métodos de pago", en:"Payment methods", fr:"Moyens de paiement", pt:"Métodos de pagamento" },
    policy1_p: { es:"Transferencia o consignación bancaria, Nequi, Daviplata, o efectivo en nuestro punto físico con cita previa.", en:"Bank transfer or deposit, Nequi, Daviplata, or cash at our physical location by appointment.", fr:"Virement ou dépôt bancaire, Nequi, Daviplata, ou espèces à notre point de vente sur rendez-vous.", pt:"Transferência ou depósito bancário, Nequi, Daviplata, ou dinheiro em nosso ponto físico com hora marcada." },
    policy2_h: { es:"Envíos", en:"Shipping", fr:"Livraison", pt:"Envios" },
    policy2_p: { es:"Hacemos envíos a nivel nacional e internacional. Costo y tiempo de entrega se confirman por WhatsApp según tu ciudad o país.", en:"We ship nationally and internationally. Cost and delivery time are confirmed via WhatsApp based on your city or country.", fr:"Nous livrons à l'échelle nationale et internationale. Le coût et le délai de livraison sont confirmés par WhatsApp selon votre ville ou pays.", pt:"Fazemos envios nacionais e internacionais. Custo e prazo de entrega são confirmados pelo WhatsApp conforme sua cidade ou país." },
    policy3_h: { es:"Certificación", en:"Certification", fr:"Certification", pt:"Certificação" },
    policy3_p: { es:"Si necesitas certificado gemológico, lo tramitamos bajo pedido con un costo adicional a cargo del comprador.", en:"If you need a gemological certificate, we arrange it on request at an additional cost to the buyer.", fr:"Si vous avez besoin d'un certificat gemmologique, nous nous en occupons sur demande, avec un coût supplémentaire à la charge de l'acheteur.", pt:"Se você precisar de certificado gemológico, providenciamos sob encomenda com custo adicional a cargo do comprador." },
    policy4_h: { es:"Piezas únicas, venta final", en:"One-of-a-kind pieces, final sale", fr:"Pièces uniques, vente définitive", pt:"Peças únicas, venda final" },
    policy4_p: { es:"Cada esmeralda es natural e irrepetible, por lo que no se aceptan devoluciones. Resolvemos cualquier duda sobre la piedra antes de confirmar la compra.", en:"Every emerald is natural and one of a kind, so returns are not accepted. We resolve any questions about the stone before confirming the purchase.", fr:"Chaque émeraude est naturelle et unique, aucun retour n'est donc accepté. Nous répondons à toutes vos questions sur la pierre avant de confirmer l'achat.", pt:"Cada esmeralda é natural e irrepetível, por isso não são aceitas devoluções. Resolvemos qualquer dúvida sobre a pedra antes de confirmar a compra." },

    custom_service_eyebrow: { es:"Servicio", en:"Service", fr:"Service", pt:"Serviço" },
    custom_p1: { es:"Si ya tienes tu esmeralda o eliges una de nuestra colección, diseñamos y montamos la pieza en oro o plata según tu idea: anillos, aretes, dijes o piezas personalizadas.", en:"If you already have your emerald or choose one from our collection, we design and set the piece in gold or silver based on your idea: rings, earrings, pendants or custom pieces.", fr:"Si vous avez déjà votre émeraude ou si vous en choisissez une dans notre collection, nous créons et montons la pièce en or ou en argent selon votre idée : bagues, boucles d'oreilles, pendentifs ou pièces personnalisées.", pt:"Se você já tem sua esmeralda ou escolhe uma de nossa coleção, desenhamos e montamos a peça em ouro ou prata conforme sua ideia: anéis, brincos, pingentes ou peças personalizadas." },
    custom_p2: { es:"El proceso se acompaña de principio a fin por WhatsApp, con propuestas de diseño antes de fabricar.", en:"The whole process is guided via WhatsApp from start to finish, with design proposals before manufacturing.", fr:"Le processus est accompagné du début à la fin par WhatsApp, avec des propositions de design avant la fabrication.", pt:"O processo é acompanhado do início ao fim pelo WhatsApp, com propostas de design antes de fabricar." },
    custom_cta: { es:"Consultar joyería a la medida", en:"Ask about custom jewelry", fr:"Demander des informations sur la bijouterie sur mesure", pt:"Consultar joalheria sob medida" },

    final_title_about: { es:"Conversemos sobre tu próxima esmeralda", en:"Let's talk about your next emerald", fr:"Parlons de votre prochaine émeraude", pt:"Vamos conversar sobre sua próxima esmeralda" },
    final_desc_about: { es:"Escríbenos por WhatsApp, con gusto te asesoramos.", en:"Message us on WhatsApp, we're happy to help.", fr:"Écrivez-nous sur WhatsApp, nous serons ravis de vous conseiller.", pt:"Escreva-nos pelo WhatsApp, teremos prazer em te orientar." },

    /* ---------- contacto.html ---------- */
    contact_h1: { es:"Hablemos", en:"Let's talk", fr:"Discutons", pt:"Vamos conversar" },
    contact_sub: { es:"WhatsApp es nuestro canal principal de atención.", en:"WhatsApp is our main customer service channel.", fr:"WhatsApp est notre principal canal d'assistance.", pt:"O WhatsApp é nosso canal principal de atendimento." },
    card1_p: { es:"Canal principal para consultas, cotizaciones y pedidos.", en:"Main channel for questions, quotes and orders.", fr:"Canal principal pour les questions, devis et commandes.", pt:"Canal principal para dúvidas, orçamentos e pedidos." },
    card3_h: { es:"Horario de atención", en:"Business hours", fr:"Horaires d'ouverture", pt:"Horário de atendimento" },
    card3_p: { es:"Lunes a viernes, 10:00 a.m. – 7:00 p.m.", en:"Monday to Friday, 10:00 a.m. – 7:00 p.m.", fr:"Du lundi au vendredi, 10h00 – 19h00", pt:"Segunda a sexta, 10:00 – 19:00" },
    card4_h: { es:"Punto físico", en:"Physical location", fr:"Point de vente", pt:"Ponto físico" },
    card4_p2: { es:"Atención con cita previa por WhatsApp.", en:"By appointment only, via WhatsApp.", fr:"Sur rendez-vous, via WhatsApp.", pt:"Atendimento com hora marcada pelo WhatsApp." },
    card5_h: { es:"Pagos y envíos", en:"Payments and shipping", fr:"Paiements et livraison", pt:"Pagamentos e envios" },
    card5_p: { es:"Aceptamos transferencia bancaria, Nequi, Daviplata y efectivo. Hacemos envíos nacionales e internacionales; te confirmamos costo y tiempo por WhatsApp.", en:"We accept bank transfer, Nequi, Daviplata and cash. We ship nationally and internationally; we'll confirm cost and time via WhatsApp.", fr:"Nous acceptons le virement bancaire, Nequi, Daviplata et les espèces. Nous livrons à l'échelle nationale et internationale ; nous confirmons le coût et le délai par WhatsApp.", pt:"Aceitamos transferência bancária, Nequi, Daviplata e dinheiro. Fazemos envios nacionais e internacionais; confirmamos custo e prazo pelo WhatsApp." },
    map_title: { es:"Ubicación Sweet Luxury - Edificio Henry Faux P.H., Bogotá", en:"Sweet Luxury location - Edificio Henry Faux P.H., Bogotá", fr:"Emplacement Sweet Luxury - Edificio Henry Faux P.H., Bogotá", pt:"Localização Sweet Luxury - Edificio Henry Faux P.H., Bogotá" }
  };

  /* ---------- Palabras sueltas (piezas, niveles, origen, tratamientos) ---------- */
  var WORD_MAP = {
    /* formas / descriptores de piezas */
    "Cuadrada":   { en:"Square",  fr:"Carrée",  pt:"Quadrada" },
    "Cabujón":    { en:"Cabochon", fr:"Cabochon", pt:"Cabuchão" },
    "Ganga":      { en:"Rough",   fr:"Brut",    pt:"Bruta" },
    "Gangas":     { en:"Roughs",  fr:"Bruts",   pt:"Brutas" },
    "Redonda":    { en:"Round",   fr:"Ronde",   pt:"Redonda" },
    "Óvalo":     { en:"Oval",    fr:"Ovale",   pt:"Oval" },
    "Macla":      { en:"Twin",    fr:"Maclée",  pt:"Macla" },
    "Lote":       { en:"Lot",     fr:"Lot",     pt:"Lote" },
    "de":         { en:"of",      fr:"de",      pt:"de" },
    "lágrimas":  { en:"teardrops", fr:"larmes", pt:"lágrimas" },
    /* niveles */
    "Clásica":    { en:"Classic",   fr:"Classique", pt:"Clássica" },
    "Premium":    { en:"Premium",   fr:"Premium",   pt:"Premium" },
    "Exclusiva":  { en:"Exclusive", fr:"Exclusive", pt:"Exclusiva" },
    /* origen */
    "Brasil":     { en:"Brazil",  fr:"Brésil",  pt:"Brasil" }
  };

  var TREATMENT_LABELS = {
    "aceite":            { es:"ACEITE",           en:"OIL",             fr:"HUILE",              pt:"ÓLEO" },
    "perma":             { es:"PERMA",             en:"PERMA",           fr:"PERMA",              pt:"PERMA" },
    "aceite y perma":    { es:"ACEITE Y PERMA",    en:"OIL AND PERMA",   fr:"HUILE ET PERMA",     pt:"ÓLEO E PERMA" },
    "sin tratamiento":   { es:"Sin tratamiento",   en:"No treatment",    fr:"Sans traitement",    pt:"Sem tratamento" },
    "no especificado":   { es:"No especificado",   en:"Not specified",   fr:"Non spécifié",      pt:"Não especificado" }
  };

  var TREATMENT_INFO = {
    "sin tratamiento": {
      es:"Esmeralda sin ningún tipo de tratamiento. Su color y cristal son naturales.",
      en:"Emerald with no treatment of any kind. Its color and crystal are entirely natural.",
      fr:"Émeraude sans aucun traitement. Sa couleur et son cristal sont entièrement naturels.",
      pt:"Esmeralda sem nenhum tipo de tratamento. Sua cor e cristal são naturais."
    },
    "aceite": {
      es:"Tratamiento con aceite, un método tradicional y ampliamente aceptado para mejorar la claridad visual de la esmeralda.",
      en:"Oil treatment, a traditional and widely accepted method to improve the emerald's visual clarity.",
      fr:"Traitement à l'huile, une méthode traditionnelle et largement acceptée pour améliorer la clarté visuelle de l'émeraude.",
      pt:"Tratamento com óleo, um método tradicional e amplamente aceito para melhorar a claridade visual da esmeralda."
    },
    "perma": {
      es:"Tratamiento tipo 'perma', un relleno más permanente que el aceite para estabilizar fracturas naturales de la piedra.",
      en:"'Perma' treatment, a more permanent filler than oil used to stabilize the stone's natural fractures.",
      fr:"Traitement de type « perma », un remplissage plus permanent que l'huile pour stabiliser les fractures naturelles de la pierre.",
      pt:"Tratamento tipo 'perma', um preenchimento mais permanente que o óleo para estabilizar fraturas naturais da pedra."
    },
    "aceite y perma": {
      es:"Combinación de aceite y relleno tipo 'perma' para mejorar claridad y estabilizar fracturas naturales de la piedra.",
      en:"Combination of oil and 'perma' filler to improve clarity and stabilize the stone's natural fractures.",
      fr:"Combinaison d'huile et de remplissage « perma » pour améliorer la clarté et stabiliser les fractures naturelles de la pierre.",
      pt:"Combinação de óleo e preenchimento tipo 'perma' para melhorar a claridade e estabilizar fraturas naturais da pedra."
    },
    "no especificado": {
      es:"El tratamiento de esta pieza no está especificado; consúltalo directamente por WhatsApp.",
      en:"This piece's treatment is not specified; please ask us directly on WhatsApp.",
      fr:"Le traitement de cette pièce n'est pas précisé ; renseignez-vous directement par WhatsApp.",
      pt:"O tratamento desta peça não está especificado; consulte diretamente pelo WhatsApp."
    }
  };

  var PAGE_META = {
    index: {
      es:{ title:"Sweet Luxury | Esmeraldas colombianas", desc:"Esmeraldas colombianas elegidas una a una. Piedras desde piezas clásicas hasta exclusivas, con origen verificado y joyería a la medida." },
      en:{ title:"Sweet Luxury | Colombian Emeralds", desc:"Colombian emeralds chosen one by one. Stones from classic to exclusive, with verified origin and custom-made jewelry." },
      fr:{ title:"Sweet Luxury | Émeraudes colombiennes", desc:"Émeraudes colombiennes choisies une à une. Pierres du niveau classique au niveau exclusif, avec origine vérifiée et bijouterie sur mesure." },
      pt:{ title:"Sweet Luxury | Esmeraldas colombianas", desc:"Esmeraldas colombianas escolhidas uma a uma. Pedras de níveis clássicos a exclusivas, com origem verificada e joalheria sob medida." }
    },
    colecciones: {
      es:{ title:"Colecciones | Sweet Luxury", desc:"Colecciones Clásica, Premium y Exclusiva de esmeraldas colombianas. Filtra por nivel, precio, quilates y origen." },
      en:{ title:"Collections | Sweet Luxury", desc:"Classic, Premium and Exclusive collections of Colombian emeralds. Filter by level, price, carats and origin." },
      fr:{ title:"Collections | Sweet Luxury", desc:"Collections Classique, Premium et Exclusive d'émeraudes colombiennes. Filtrez par niveau, prix, carats et origine." },
      pt:{ title:"Coleções | Sweet Luxury", desc:"Coleções Clássica, Premium e Exclusiva de esmeraldas colombianas. Filtre por nível, preço, quilates e origem." }
    },
    nosotros: {
      es:{ title:"Nosotros | Sweet Luxury", desc:"La historia de Sweet Luxury: 3 años seleccionando esmeraldas colombianas con transparencia y asesoría cercana." },
      en:{ title:"About | Sweet Luxury", desc:"The Sweet Luxury story: 3 years selecting Colombian emeralds with transparency and close guidance." },
      fr:{ title:"À propos | Sweet Luxury", desc:"L'histoire de Sweet Luxury : 3 ans à sélectionner des émeraudes colombiennes avec transparence et accompagnement personnalisé." },
      pt:{ title:"Sobre nós | Sweet Luxury", desc:"A história da Sweet Luxury: 3 anos selecionando esmeraldas colombianas com transparência e assessoria próxima." }
    },
    contacto: {
      es:{ title:"Contacto | Sweet Luxury", desc:"Contacta a Sweet Luxury por WhatsApp o Instagram. Edificio Henry Faux P.H., Bogotá. Lunes a viernes, 10am - 7pm." },
      en:{ title:"Contact | Sweet Luxury", desc:"Contact Sweet Luxury via WhatsApp or Instagram. Edificio Henry Faux P.H., Bogotá. Monday to Friday, 10am - 7pm." },
      fr:{ title:"Contact | Sweet Luxury", desc:"Contactez Sweet Luxury par WhatsApp ou Instagram. Edificio Henry Faux P.H., Bogotá. Du lundi au vendredi, 10h - 19h." },
      pt:{ title:"Contato | Sweet Luxury", desc:"Contate a Sweet Luxury pelo WhatsApp ou Instagram. Edificio Henry Faux P.H., Bogotá. Segunda a sexta, 10h - 19h." }
    }
  };

  function getLang(){
    try{
      var saved = localStorage.getItem('sl-lang');
      if(saved && LANGS[saved]) return saved;
    }catch(e){}
    return 'es';
  }

  function t(key, lang){
    lang = lang || getLang();
    var entry = T[key];
    if(!entry) return key;
    return entry[lang] || entry.es || key;
  }

  function translateWord(word, lang){
    lang = lang || getLang();
    if(!word || lang === 'es') return word;
    var w = WORD_MAP[word];
    return (w && w[lang]) ? w[lang] : word;
  }

  function translatePieceName(nombre, lang){
    lang = lang || getLang();
    if(!nombre || lang === 'es') return nombre;
    return nombre.split(' ').map(function(tok){
      var w = WORD_MAP[tok];
      return (w && w[lang]) ? w[lang] : tok;
    }).join(' ');
  }

  function translateTreatmentLabel(key, lang){
    lang = lang || getLang();
    var e = TREATMENT_LABELS[key];
    if(!e) return key;
    return e[lang] || e.es;
  }

  function translateTreatmentInfo(key, lang){
    lang = lang || getLang();
    var e = TREATMENT_INFO[key];
    if(!e) return '';
    return e[lang] || e.es;
  }

  function applyStatic(lang){
    document.documentElement.setAttribute('lang', lang);

    document.querySelectorAll('[data-i18n]').forEach(function(el){
      el.textContent = t(el.getAttribute('data-i18n'), lang);
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function(el){
      el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria'), lang));
    });
    document.querySelectorAll('[data-i18n-title]').forEach(function(el){
      el.setAttribute('title', t(el.getAttribute('data-i18n-title'), lang));
    });
    document.querySelectorAll('[data-i18n-piece]').forEach(function(el){
      el.textContent = translatePieceName(el.getAttribute('data-i18n-piece'), lang);
    });
    document.querySelectorAll('[data-i18n-word]').forEach(function(el){
      el.textContent = translateWord(el.getAttribute('data-i18n-word'), lang);
    });
    document.querySelectorAll('[data-price-cop]').forEach(function(el){
      el.textContent = formatPrice(el.getAttribute('data-price-cop'), lang);
    });
    document.querySelectorAll('[data-price-from]').forEach(function(el){
      el.textContent = t('label_from', lang) + ' ' + formatPrice(el.getAttribute('data-price-from'), lang);
    });
    document.querySelectorAll('[data-price-upto]').forEach(function(el){
      el.textContent = t('label_upto', lang) + ' ' + formatPrice(el.getAttribute('data-price-upto'), lang);
    });
    document.querySelectorAll('[data-price-range]').forEach(function(el){
      var parts = el.getAttribute('data-price-range').split('|');
      el.textContent = formatPrice(parts[0], lang) + ' – ' + formatPrice(parts[1], lang);
    });

    var page = document.body.getAttribute('data-page');
    var meta = PAGE_META[page];
    if(meta && meta[lang]){
      document.title = meta[lang].title;
      var m = document.querySelector('meta[name="description"]');
      if(m) m.setAttribute('content', meta[lang].desc);
    }

    updateSwitcherUI(lang);
  }

  function updateSwitcherUI(lang){
    document.querySelectorAll('.lang-current-flag').forEach(function(el){
      el.src = flagUrl(LANGS[lang].flagCountry);
      el.alt = LANGS[lang].name;
    });
    document.querySelectorAll('.lang-current-code').forEach(function(el){ el.textContent = lang.toUpperCase(); });
    document.querySelectorAll('.lang-option').forEach(function(el){
      el.classList.toggle('active', el.getAttribute('data-lang') === lang);
    });
  }

  function setLang(lang){
    if(!LANGS[lang]) return;
    try{ localStorage.setItem('sl-lang', lang); }catch(e){}
    applyStatic(lang);
    document.dispatchEvent(new CustomEvent('sl-lang-changed', { detail:{ lang: lang } }));
  }

  function wireSwitcher(){
    document.querySelectorAll('.lang-switcher').forEach(function(sw){
      var btn = sw.querySelector('.lang-btn');
      if(btn){
        btn.addEventListener('click', function(e){
          e.stopPropagation();
          var willOpen = !sw.classList.contains('open');
          document.querySelectorAll('.lang-switcher.open').forEach(function(o){ o.classList.remove('open'); });
          if(willOpen) sw.classList.add('open');
        });
      }
      sw.querySelectorAll('.lang-option').forEach(function(opt){
        opt.addEventListener('click', function(){
          setLang(this.getAttribute('data-lang'));
          sw.classList.remove('open');
        });
      });
    });
    document.addEventListener('click', function(){
      document.querySelectorAll('.lang-switcher.open').forEach(function(sw){ sw.classList.remove('open'); });
    });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape'){
        document.querySelectorAll('.lang-switcher.open').forEach(function(sw){ sw.classList.remove('open'); });
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    wireSwitcher();
    applyStatic(getLang());
  });

  window.SLI18N = {
    LANGS: LANGS,
    getLang: getLang,
    setLang: setLang,
    t: t,
    translateWord: translateWord,
    translatePieceName: translatePieceName,
    translateTreatmentLabel: translateTreatmentLabel,
    translateTreatmentInfo: translateTreatmentInfo,
    formatPrice: formatPrice,
    applyStatic: applyStatic
  };

})();

import type { DayPlan } from "@/lib/types";

export const days: DayPlan[] = [
  {
    n: 1,
    dato: "2026-06-19",
    ugedag: "Fredag",
    titel: "Ankomst & Reykjavik",
    tema: "Land kl. 08.40 — hele dagen forude",
    beskrivelse:
      "I lander kl. 08.40, henter autocamperen hos Go Campers og kører ind til Reykjavik for at hente køletasken. Så går det løs: et 7-trins wellness-ritual i Sky Lagoon, hvalsafari i RIB-speedbåd, et bad i Reykjadalurs varme flod og smukke billeder af Sólfar i aftensolen. Pølser ved Hallgrímskirkja til aftensmad.",
    emoji: "🛬",
    arrival: "08:40",
    itinerary: [
      {
        tid: "Kl. 08.40",
        sted: "Fly ankomst i Keflavik",
        beskrivelse:
          "Hent bil + tilbehør kl. 10.00 (Go Campers). Hvis vi får tid, kan vi handle efter at have hentet bilen.",
        booket: true,
      },
      {
        tid: "Kl. 10.30",
        transport: "50 km · 41 min",
        sted: "Kør fra Keflavik til Reykjavik — hent køletaske",
        beskrivelse: "Vatnsmýrarvegur 10, 101 Reykjavik. Åbent 9–17.",
        booket: true,
      },
      {
        tid: "Kl. 11.30",
        transport: "6,8 km · 11 min",
        sted: "Sky Lagoon kl. 12.00",
        varighed: "2,5 timer",
        beskrivelse:
          "Ultimativ islandsk wellness — 7-trins ritual (Skjól): Laug, Kuldi, Ylur, Súld, Mýkt, Gufa, Sturt. Husk at afsætte 30 min. til bad og tøjskifte!",
        booket: true,
        pris: "30.582 ISK + gebyr",
      },
      {
        tid: "Kl. 15.00",
        transport: "9 km · 16 min",
        sted: "Hvalsafari med RIB-speedbåd kl. 16 (tjek ind kl. 15.30)",
        varighed: "2 timer (færdig ca. kl. 18)",
        beskrivelse:
          "RIB-speedbåd ud i Faxaflói-bugten — måske pukkelhval, spækhuggere, vågehval, delfiner eller marsvin. Old Harbour House, Ægisgarður 2, 101 Reykjavík. Scan QR-koden på billetten i selvbetjeningskiosken.",
        booket: true,
      },
      {
        sted: "Handle (morgenmad + aftensmad til i morgen)",
        beskrivelse: "Hotdogs til aftensmad ved siden af Hallgrímskirkja.",
      },
      {
        transport: "44 km · 1t 12 min",
        sted: "Reykjadalur hot spring (varm flod)",
        beskrivelse:
          "Lille gåtur på ca. 45 min. op til floden. Bad i den varme flod — jo længere op mod bjerget, jo varmere vand.",
        pris: "Gratis",
      },
      {
        tid: "Kl. 21.30",
        transport: "49 km · 49 min",
        sted: "Hegningarhúsið (tidligere fængsel)",
        beskrivelse:
          "Parkér evt. ved Sólfar (Sun Voyager) og gå til fængslet — en lille tur på ca. 700 m.",
      },
      {
        transport: "800 m · 5 min",
        sted: "Sólfar / Sun Voyager ved havnen",
        beskrivelse:
          "Tag et par smukke billeder i aftensolen af Sólfar-skulpturen.",
      },
      {
        transport: "3,1 km · 6 min",
        sted: "Camping i Reykjavik",
        beskrivelse: "Vi sover nær svømmehallen og stadion.",
      },
    ],
    routeIds: ["sky-lagoon", "hvalsafari-rib", "reykjadalur"],
    restaurantIds: ["vikinga-pylsur"],
    poiIds: ["solfar", "hallgrimskirkja", "camp-reykjavik"],
    tips: [
      "Henter bil + tilbehør kl. 10.00 — handl evt. bagefter",
      "Køletaske hentes på Vatnsmýrarvegur 10 (åbent 9-17)",
      "Sky Lagoon kl. 12.00 — afsæt 30 min ekstra til bad og tøjskifte",
      "Hvalsafari: tjek ind kl. 15.30 til afgang kl. 16",
    ],
  },
  {
    n: 2,
    dato: "2026-06-20",
    ugedag: "Lørdag",
    titel: "Højlandet — Kerlingarfjöll",
    tema: "Heldagstur til de farverige bjerge",
    beskrivelse:
      "En guidet heldagstur dybt ind i højlandet til Kerlingarfjölls farvede rhyolit-bjerge. Undervejs stopper vi ved Gullfoss, svømmer i en af højlandets varme kilder og kommer forbi de berømte gejsere. Frokost på Highland Base. Retur i Reykjavik ca. 20.30, så videre til camping i Selfoss.",
    emoji: "⛰️",
    itinerary: [
      {
        sted: "Pak et par snacks til turen",
      },
      {
        tid: "Kl. 8.00",
        transport: "4,7 km · 12 min",
        sted: "Kør til opsamlingssted — Skógarhlíð 10, 105 Reykjavik",
        beskrivelse: "Husk at sætte tid af til at finde parkering!",
      },
      {
        sted: "Heldagstur til Kerlingarfjöll kl. 8.30",
        varighed: "12 timer",
        beskrivelse:
          "Stop ved Gullfoss, svøm i en af højlandets varme kilder, og forbi gejserne. Frokost på Highland Base Restaurant. Retur i Reykjavik ca. 20.30. Hold øje med bussen med skiltet 'Highland Base — Kerlingarfjöll'.",
        booket: true,
      },
      {
        tid: "Kl. 20.30",
        transport: "71 km · 1t 5 min",
        sted: "Camping i Selfoss",
        beskrivelse: "Kør ad vej 34 ned langs sydkysten. gesthus.is",
      },
    ],
    routeIds: ["kerlingarfjoll-tour"],
    restaurantIds: ["highland-base"],
    poiIds: ["gullfoss", "geysir", "camp-selfoss"],
    tips: [
      "Opsamling Skógarhlíð 10 kl. 8.30 — find parkering i god tid",
      "Hold øje med bussen 'Highland Base — Kerlingarfjöll'",
      "Pak et par snacks til turen",
      "Kør ad vej 34 ned langs sydkysten til Selfoss",
    ],
    weatherDependent: true,
  },
  {
    n: 3,
    dato: "2026-06-21",
    ugedag: "Søndag",
    titel: "Landmannalaugar & Skógafoss",
    tema: "Super-Jeep i højlandet + sydkystens ikon",
    beskrivelse:
      "Super-Jeep safari til det farverige Landmannalaugar — forbi en varm kilde, et krater og Hekla-vulkanen. Retur ca. 16.30, en kort byvandring i Selfoss (Skyrland), og så mod sydkysten til det 60 m høje Skógafoss. Gå de 370 trin til toppen for udsigten.",
    emoji: "🚙",
    itinerary: [
      {
        sted: "Lav madpakker til dagens tur",
      },
      {
        tid: "Kl. 9.00",
        transport: "Få min.",
        sted: "Kør til opsamlingssted (N1 Selfoss gas station, Austurvegur 48)",
        varighed: "7 timer",
        beskrivelse:
          "Heldagstur til Landmannalaugar i super-Jeep kl. 9.30 — bl.a. forbi en varm kilde, et krater og Hekla-vulkanen. Retur ca. 16.30/17.00. (Arctic Adventures)",
        booket: true,
        pris: "800 ISK",
      },
      {
        tid: "Få min.",
        sted: "Selfoss byvandring",
        beskrivelse: "Skyrland · floden Ölfusá.",
      },
      {
        transport: "112 km · 3t 28 min",
        sted: "Kør til Skógafoss camping",
        beskrivelse:
          "På vejen: tag billeder af Skógafoss-vandfaldet fra vejen over de skønne lupin-enge. Se Skógafoss — gå til toppen (trappen har 370 trin). Keder vi os, ligger Kvernufoss ikke så langt derfra.",
      },
    ],
    routeIds: ["landmannalaugar-jeep", "skogafoss-trappen"],
    restaurantIds: ["skyrland"],
    poiIds: ["hekla", "skyrland", "camp-skogar"],
    alternativeRouteIds: [],
    tips: [
      "Lav madpakker til dagens tur",
      "Opsamling N1 Selfoss kl. 9.30 — badetøj med til den varme kilde",
      "Tag billeder af Skógafoss fra vejen over lupin-engene",
      "Keder I jer? Kvernufoss ligger ikke langt derfra",
    ],
  },
  {
    n: 4,
    dato: "2026-06-22",
    ugedag: "Mandag",
    titel: "Sydkysten — lunder, sort sand & gletsjere",
    tema: "Ægte natur og nuttede søpapegøjer",
    beskrivelse:
      "En dag i ægte islandsk natur. Start ved Dyrhólaey med det fotograferede fyrtårn, elefantklippen og søpapegøjer. Videre til den sorte strand Reynisfjara, frokost i Vík (Saga Museum + den fine kirke), og østpå forbi Rauðárfoss og Stjórnarfoss. Slut ved Diamond Beach / Jökulsárlón i midnatssolen og overnat ved Skaftafell.",
    emoji: "🐧",
    itinerary: [
      {
        transport: "35 km · 1t",
        sted: "Kør til Dyrhólaey",
        beskrivelse:
          "Ægte natur — søpapegøjer (lunder), det måske mest fotograferede fyrtårn på Island, elefantklippen og det sorte sand.",
      },
      {
        transport: "20 km · 22 min",
        sted: "Den sorte strand (Reynisfjara)",
        beskrivelse:
          "Oplev havets magt — de kæmpe basaltsøjler, de enorme bølger og det smukke sorte sand.",
      },
      {
        transport: "11 km · 12 min",
        sted: "Vík",
        beskrivelse:
          "Saga Museum (åbent 10.00–17.00). Den fine kirke omringet af lupiner, udsigt til havet og de enorme klipper. Frokost i byen — måske sort pizza eller kaffe i skolebussen. Find mineralbutikken (nær skolebus-caféen).",
      },
      {
        transport: "75 km · 1t",
        sted: "Rauðárfoss (det røde vandfald)",
      },
      {
        transport: "4 km · 11 min",
        sted: "Stjórnarfoss",
      },
      {
        transport: "54 km · 42 min",
        sted: "Diamond Beach / Jökulsárlón i midnatssolen",
        beskrivelse: "Overvej turen i midnatssolen. Gå op langs østsiden af gletsjeren.",
      },
      {
        transport: "70 km · 53 min",
        sted: "Skaftafell camping",
        beskrivelse:
          "Gå evt. en tur til Skaftafellsjökull (Göngeleið, ca. 2,6 km) og videre til Sjónarnípa Viewpoint — et betagende syn over gletsjeren.",
      },
    ],
    routeIds: ["skaftafell-sjonarnipa"],
    restaurantIds: [],
    poiIds: [
      "dyrholaey",
      "reynisfjara",
      "vik",
      "raudarfoss",
      "stjornarfoss",
      "diamond-beach",
      "camp-skaftafell",
    ],
    tips: [
      "Reynisfjara: hold god afstand til de farlige 'sneaker waves'",
      "Vík: snup en sort pizza, kaffe i skolebussen, og find mineralbutikken",
      "Saga Museum i Vík: åbent 10.00-17.00",
      "Skaftafell: gå evt. til Skaftafellsjökull og Sjónarnípa Viewpoint",
    ],
    weatherDependent: true,
  },
  {
    n: 5,
    dato: "2026-06-23",
    ugedag: "Tirsdag",
    titel: "Gletsjerlaguner & tomatfarm",
    tema: "Isbjerge, alfehuse og aftensmad i drivhuset",
    beskrivelse:
      "Morgenstart ved Diamond Beach, hvor klare isstykker glimter på det sorte sand. Så en zodiac-bådtur mellem de blå isbjerge på Jökulsárlón kl. 11.10, og et kig på den mindre Fjallsárlón og den hyggelige græstørvskirke Hofskirkja. Eftermiddag i Secret Lagoon med besøg ved de små alfehuse, og aftensmad i Friðheimars tomatdrivhus. Overnatning i Reykholt.",
    emoji: "🧊",
    itinerary: [
      {
        tid: "Kl. 9.00",
        transport: "54 km · 42 min",
        sted: "Diamond Beach / Jökulsárlón Glacier Lagoon",
        varighed: "1 time",
        beskrivelse: "Vil I gå op langs Jökulsárlón, så kør tidligere.",
      },
      {
        tid: "Kl. 11.00",
        sted: "Zodiac-bådtur kl. 11.10 (start 11.20)",
        varighed: "75 min (færdig ca. 12.40)",
        beskrivelse:
          "Mødested: den store blå Ice Lagoon-truck (Ice Lagoon Adventure Tours). Check ind når vi kommer, så vi undgår kø.",
        booket: true,
      },
      {
        tid: "Kl. 12.45 (ankomst 13.00)",
        transport: "11 km · 11 min",
        sted: "Fjallsárlón Glacier",
        varighed: "1 time",
      },
      {
        tid: "Kl. 14.00 (ankomst 14.25)",
        transport: "29 km · 23 min",
        sted: "Hofskirkja (Hof's Church)",
        varighed: "30 min + gåtid",
      },
      {
        tid: "Kl. 15.00 (ankomst 18.30)",
        transport: "301 km · 3t 33 min",
        sted: "Secret Lagoon + de små alfehuse",
        varighed: "1t 30 min",
        beskrivelse: "Åbningstider 10.00–20.00. Husk tid til bad og tøjskifte (30 min).",
      },
      {
        tid: "Ca. kl. 20.00",
        transport: "11 km · 12 min",
        sted: "Friðheimar tomatfarm — aftensmad i bistroen",
        beskrivelse: "Åbningstider 12.00–22.00.",
      },
      {
        transport: "100 m · 1 min",
        sted: "Reykholt Campingplads",
      },
    ],
    routeIds: ["jokulsarlon-zodiac", "secret-lagoon"],
    restaurantIds: ["fridheimar"],
    poiIds: ["diamond-beach", "jokulsarlon", "fjallsarlon", "hofskirkja", "camp-reykholt"],
    tips: [
      "Kør tidligt hvis I vil gå op langs Jökulsárlón før bådturen",
      "Check ind ved Ice Lagoon-trucken så I undgår kø",
      "Secret Lagoon åbent 10.00-20.00 — afsæt 30 min til bad",
      "Friðheimar: bord bookes — åbent 12.00-22.00",
    ],
  },
  {
    n: 6,
    dato: "2026-06-24",
    ugedag: "Onsdag",
    titel: "Den Gyldne Cirkel → Snæfellsnes",
    tema: "Rugbrød, snorkling og midnatssol ved Kirkjufell",
    beskrivelse:
      "En lang og fantastisk dag: rugbrød bagt i jorden ved Laugarvatn (vær der kl. 10.05), snorkling mellem kontinenterne i Silfra, champignon-frokost på Farmers Bistro, et bad i Hrunalaug, og vandfaldene Hraunfossar, Barnafoss og Glanni. Aften på Snæfellsnes med Búðakirkja og Kirkjufell under midnatssolen.",
    emoji: "🤿",
    itinerary: [
      {
        tid: "Kl. 9.35",
        transport: "24 km · 20 min",
        sted: "Laugarvatn — se rugbrød bages i jorden kl. 10.15",
        varighed: "30 min",
        beskrivelse:
          "Vær der kl. 10.05! Geotermisk rugbrødsoplevelse ved Fontana Spa med smagsprøver. Hverabraut, Laugarvatn.",
      },
      {
        tid: "Kl. 11.00",
        transport: "30 km · 27 min",
        sted: "Silfra — snorkling i Þingvellir Nationalpark kl. 12.00",
        varighed: "2t 30 min",
        beskrivelse:
          "Ankomst 15 min. før (11.45), færdig ca. 14.30. Snorkling mellem de tektoniske plader — Island bliver 2–3 cm bredere hvert år.",
      },
      {
        tid: "Kl. 14.45 (ankomst 15.30)",
        transport: "68 km · 58 min",
        sted: "Flúðasveppir Farmers Bistro (champignon)",
        beskrivelse:
          "Bord booket til kl. 16.00. Bemærk: bistroen lukker kl. 17, køkkenet kl. 16.40. Flúðir.",
        booket: true,
      },
      {
        tid: "Kl. 17.10 (ankomst 17.20)",
        transport: "6,3 km · 9 min",
        sted: "Hrunalaug Hot Spring",
        varighed: "1 time (kan kortes til 30 min)",
        beskrivelse: "Sólheimar, 846 Flúðir.",
        pris: "182 dkr",
      },
      {
        tid: "Kl. 18.15/18.30 (ankomst 20.30/20.45)",
        transport: "137 km · 2t 17 min",
        sted: "Hraunfossar / Barnafoss",
        varighed: "1 time (kan kortes lidt ned)",
        beskrivelse: "To smukke vandfald klædt i sommerfarver.",
      },
      {
        tid: "Kl. 21.45",
        transport: "52 km · 44 min",
        sted: "Glanni",
        varighed: "1 time (kan kortes lidt ned)",
        beskrivelse:
          "311 Borgarnes, Borgarbyggð, Vesturland. Udsigtspunktet ligger lige ved pladsen; stien følger kanten.",
      },
      {
        tid: "Kl. 23.30",
        transport: "131 km · 1t 37 min",
        sted: "Búðakirkja",
        varighed: "15 min",
        beskrivelse:
          "En af de mest fotograferede bygninger på Island. Der er kun plads til 50 mennesker i kirken.",
      },
      {
        tid: "Kl. 01.15",
        transport: "36 km · 52 min",
        sted: "Kirkjufell (ankomst ca. kl. 2)",
        varighed: "1 time",
        beskrivelse:
          "Det måske mest fotograferede bjerg på Island sammen med vandfaldene — og det under midnatssolen.",
      },
      {
        transport: "3,7 km · 7 min",
        sted: "Grundarfjörður camping",
        beskrivelse:
          "Overvej en gåtur til Kirkjufell (3,7 km fra campingpladsen) i midnatssolen, hvis vi kan nå det inden pladsen lukker.",
      },
    ],
    routeIds: ["silfra-snorkel"],
    restaurantIds: ["farmers-bistro", "lindin-laugarvatn"],
    poiIds: [
      "laugarvatn",
      "thingvellir",
      "hrunalaug",
      "hraunfossar",
      "barnafoss",
      "glanni",
      "budakirkja",
      "kirkjufell",
      "camp-grundarfjordur",
    ],
    tips: [
      "Silfra: vær der kl. 12.00, mød 15 min før (11.45)",
      "Farmers Bistro: bord kl. 16.00 — køkken lukker 16.40",
      "Hrunalaug kan kortes ned til 30 min hvis tiden er knap",
      "Overvej en aftengåtur (3,7 km) til Kirkjufell fra campingpladsen",
    ],
    weatherDependent: true,
  },
  {
    n: 7,
    dato: "2026-06-25",
    ugedag: "Torsdag",
    titel: "Snæfellsnes rundt (færgen aflyst)",
    tema: "Baldur er aflyst — vi udforsker halvøens perler",
    beskrivelse:
      "Færgen Baldur til Vestfjordene er aflyst, så i stedet bruger vi dagen på Snæfellsnes-halvøen og dens hidden gems: den gyldne strand Skarðsvík og fyret Svörtuloft yderst mod vest, Saxhóll-krateret, den sorte Djúpalónssandur, basalt-tinderne Lóndrangar, kystvandringen Arnarstapi–Hellnar, den skjulte kløft Rauðfeldsgjá, sælerne ved Ytri Tunga og de symmetriske basaltsøjler ved Gerðuberg. Overnatning på Snæfellsnes.",
    emoji: "🏔️",
    itinerary: [
      {
        sted: "Færgen Baldur er AFLYST",
        beskrivelse:
          "Dagens oprindelige sejltur til Vestfjordene (Stykkishólmur → Flatey → Brjánslækur) gennemføres ikke. Vi bliver på Snæfellsnes — se stoppene nedenfor.",
      },
      {
        transport: "ca. 45 km · 45 min",
        sted: "Skarðsvík + Svörtuloft-fyret (vesttippen)",
        varighed: "1–1,5 time",
        beskrivelse:
          "Gylden sandstrand og det orange fyrtårn på fugleklipperne yderst mod vest. Snæfellsjökull Nationalpark — droneforbud.",
      },
      {
        transport: "ca. 10 km · 12 min",
        sted: "Saxhóll-krater",
        varighed: "20–30 min",
        beskrivelse: "Bestig krateret på metaltrappen (~10 min) for udsigten.",
      },
      {
        transport: "ca. 13 km · 15 min",
        sted: "Djúpalónssandur (sort stenstrand)",
        varighed: "30–45 min",
        beskrivelse: "Kraftprøve-stenene og rustne rester af et skibsvrag fra 1948.",
      },
      {
        transport: "ca. 7 km · 8 min",
        sted: "Vatnshellir lavahule (valgfri guidet tur)",
        varighed: "45 min",
        beskrivelse:
          "8.000 år gammel lavatunnel — kun med guide. Book / tjek tider på forhånd.",
        pris: "ca. 350 kr",
      },
      {
        transport: "ca. 5 km · 6 min",
        sted: "Lóndrangar (basalt-tinder)",
        varighed: "20 min",
        beskrivelse: "To vulkanske basalt-tinder ved kysten. Kort sti fra Malarrif.",
      },
      {
        transport: "ca. 10 km · 12 min",
        sted: "Arnarstapi → Hellnar (kystvandring)",
        varighed: "1,5–2 timer t/r",
        beskrivelse:
          "~2,5 km langs basaltformationer, stenbuen Gatklettur og Bárður-statuen. Café Fjöruhúsið i Hellnar.",
      },
      {
        transport: "ca. 4 km · 6 min",
        sted: "Rauðfeldsgjá kløft",
        varighed: "30–45 min",
        beskrivelse:
          "Kravl ind i den smalle kløft til det skjulte vandfald (kæder på væggen). Bliver glat — pas på.",
      },
      {
        transport: "ca. 35 km · 35 min",
        sted: "Ytri Tunga (sælstrand)",
        varighed: "30–45 min",
        beskrivelse: "Pålidelig sæl-spotting i juni–juli. Tag kikkert med.",
      },
      {
        transport: "ca. 35 km · 35 min",
        sted: "Gerðuberg basaltsøjler",
        varighed: "20–30 min",
        beskrivelse: "Lang væg af sekskantede basaltsøjler lige ved vej 54.",
      },
      {
        sted: "Overnatning på Snæfellsnes",
        beskrivelse:
          "Fx tilbage i Grundarfjörður eller en plads ved Arnarstapi/Ólafsvík — vælg efter hvor I ender dagen.",
      },
    ],
    routeIds: [],
    restaurantIds: [],
    poiIds: [
      "skardsvik",
      "svortuloft",
      "saxholl",
      "djupalonssandur",
      "vatnshellir",
      "londrangar",
      "arnarstapi",
      "raudfeldsgja",
      "ytri-tunga",
      "gerduberg",
      "camp-grundarfjordur",
    ],
    ferryIds: ["baldur"],
    tips: [
      "Snæfellsjökull Nationalpark = droneforbud (vesttippen)",
      "Vatnshellir er kun med guidet tur — tjek tider/book",
      "Ytri Tunga: bedst sæl-spotting omkring lavvande — tag kikkert",
      "Rauðfeldsgjá kan være glat — godt fodtøj",
    ],
    weatherDependent: true,
  },
  {
    n: 8,
    dato: "2026-06-26",
    ugedag: "Fredag",
    titel: "Rauðasandur & tilbage mod Reykjavik",
    tema: "Den gyldne strand og et sidste varmt bad",
    beskrivelse:
      "Tidlig start til den gyldne strand Rauðasandur (kør forsigtigt på de stejle grusveje). Så den lange, smukke køretur øst om og ned mod Reykjavik med et badestop ved Hvammsvík Hot Springs. Undervejs et svingom til den hvide Reynivallakirkja og det lille Helgufoss-vandfald. Måske en aktiv vulkan ved Grindavík?",
    emoji: "🏖️",
    itinerary: [
      {
        tid: "Kl. 7.00",
        transport: "48 km · 1t 45 min",
        sted: "Rauðasandur Beach (den gyldne strand)",
        beskrivelse:
          "Vejen har ekstremt stejle hårnålesving uden autoværn — kør i 1.-2. gear. Glat grusvej i regn/tåge.",
      },
      {
        varighed: "1,5 timer",
        sted: "Overvej et stop ved Handverksfélagið Assa",
        beskrivelse: "Gårdbutik med alverdens hjemmelavede ting. Åbent fredag 10–18.",
      },
      {
        transport: "73 km · 1t",
        sted: "Hvammsvík Hot Spring",
        varighed: "1 time",
        beskrivelse:
          "Længere køretur øst om og ned mod Reykjavik. Bookes når vi nærmer os. Åbningstider 10.00–22.00.",
      },
      {
        transport: "12 km · 13 min",
        sted: "Reynivallakirkja",
        beskrivelse:
          "Hvid trækirke med grønne lister på en græsklædt bakke (kirkebakken) i Kjós. Dokumenteret tilbage til ca. år 1200; den nuværende kirke er fra 1859.",
      },
      {
        transport: "30 km · 30 min",
        sted: "Helgufoss vandfald",
        beskrivelse:
          "Lille (12 m) vandfald i Mosfellsdalur — perfekt til en picnic. Det eneste vandfald med det navn på Island.",
      },
      {
        sted: "Aften i Reykjavik — hvor skal vi sove?",
        beskrivelse:
          "Nyd byens bygninger og gavlmalerier; find et lækkert spisested væk fra de store gader. Evt. en aktiv vulkan (Grindavík-området). Kør til camping — hvor?",
      },
    ],
    routeIds: ["hvammsvik"],
    restaurantIds: [],
    poiIds: ["raudasandur", "reynivallakirkja", "helgufoss"],
    tips: [
      "Rauðasandur-vejen: stejle hårnålesving uden autoværn — kør i 1.-2. gear",
      "Overvej et stop ved gårdbutikken Handverksfélagið Assa (åbent fre 10-18)",
      "Hvammsvík bookes når I nærmer jer — åbent 10.00-22.00",
      "Helgufoss i Mosfellsdalur er perfekt til en picnic",
    ],
    weatherDependent: true,
    planB:
      "Hvis vejret er skidt på Rauðasandur, så drop stranden og brug tiden på Hvammsvík og et hyggeligt sted at spise i Reykjavik.",
  },
  {
    n: 9,
    dato: "2026-06-27",
    ugedag: "Lørdag",
    titel: "Lunder & farvel Island",
    tema: "Rejsens sidste tur — søpapegøjer fra havnen",
    beskrivelse:
      "Rejsens sidste oplevelse: en RIB-tur fra Reykjaviks gamle havn ud for at se søpapegøjer (lunder). Bagefter afleveres køletasken, og vi kører forbi Hvalsneskirkja vest for Keflavik, inden bilen afleveres kl. 13.30 (husk at tanke!) og flyet går kl. 16.30. Gå gensyn, Island!",
    emoji: "✈️",
    departure: "16:30",
    itinerary: [
      {
        sted: "Reykjaviks gamle havn — lunde-RIB kl. 9.00–10.00",
        varighed: "1 time",
        beskrivelse:
          "Rejsens sidste tur: ud at se søpapegøjer (lunder) på en RIB-båd. Vær der kl. 8.30. Mødested ved Whale Safari, Ægisgarður 7, 101 Reykjavik.",
      },
      {
        sted: "Aflever køletaske i Reykjavik",
        beskrivelse: "Vatnsmýrarvegur 10, 101 Reykjavik.",
      },
      {
        transport: "59 km · 51 min",
        sted: "Hvalsneskirkja (vest for Keflavik)",
      },
      {
        transport: "16 km · ca. 15–20 min",
        sted: "Aflever bil kl. 13.30",
        beskrivelse: "HUSK at tanke bilen!",
      },
      {
        tid: "Kl. 16.30",
        sted: "Fly afgang",
        beskrivelse: "Gå gensyn, Island!",
      },
    ],
    routeIds: ["puffin-rib"],
    restaurantIds: [],
    poiIds: ["hvalsneskirkja"],
    tips: [
      "Vær ved havnen kl. 8.30 (Ægisgarður 7)",
      "Aflever køletasken: Vatnsmýrarvegur 10",
      "Aflever bilen kl. 13.30 — HUSK at tanke først!",
      "Fly afgang kl. 16.30 — vær i god tid i lufthavnen",
    ],
  },
];

export const dayByN = (n: number) => days.find((d) => d.n === n);

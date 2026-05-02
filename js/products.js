const PRODUCTS = [
  // ── ПЕРЧАТКИ ──────────────────────────────────────────────────
  {
    id: 'gloves-itsnot-dg',
    name: "it's not D&G",
    type: "Перчатки",
    cat: "gloves",
    price: 999,
    color: "черный",
    images: ["images/it's not D&G.jpg", "images/it's not D&G2.jpg"],
    desc: [
      "Технология Touch — пользоваться гаджетами не снимая перчатку",
      "70% шерсть, 30% it's not freshness",
      "Выдержат до −22°",
      "Размер: OS (пойдут на любую руку)"
    ]
  },
  {
    id: 'gloves-smile',
    name: "Улыбнись!",
    type: "Перчатки",
    cat: "gloves",
    price: 999,
    color: "черный",
    images: ["images/Перчатки «Улыбнись!».jpg", "images/Перчатки «Улыбнись!»2.jpg"],
    desc: [
      "Технология Touch — пользоваться гаджетами не снимая перчатку",
      "70% шерсть, 30% freshness",
      "Выдержат до −22°",
      "Размер: OS (пойдут на любую руку)"
    ]
  },
  {
    id: 'gloves-over-rotators',
    name: "over-rotators",
    type: "Перчатки",
    cat: "gloves",
    price: 999,
    color: "черный",
    images: ["images/«over-rotators».jpg", "images/«over-rotators»2.jpg"],
    desc: [
      "Технология Touch — пользоваться гаджетами не снимая перчатку",
      "70% шерсть, 30% freshness",
      "Выдержат до −22°",
      "Размер: OS (пойдут на любую руку)"
    ]
  },
  {
    id: 'gloves-delicacy',
    name: "delicacy",
    type: "Перчатки",
    cat: "gloves",
    price: 999,
    color: "разноцветный",
    images: ["images/«delicacy».jpg", "images/«delicacy»2.jpg"],
    desc: [
      "Технология Touch — пользоваться гаджетами не снимая перчатку",
      "70% шерсть, 30% freshness",
      "Выдержат до −22°",
      "Размер: OS (пойдут на любую руку)"
    ]
  },
  {
    id: 'gloves-pleasant',
    name: "pleasant",
    type: "Перчатки",
    cat: "gloves",
    price: 999,
    color: "серый",
    images: ["images/«pleasant».jpg", "images/«pleasant»2.jpg"],
    desc: [
      "Технология Touch — пользоваться гаджетами не снимая перчатку",
      "70% шерсть, 30% freshness",
      "Выдержат до −22°",
      "Размер: OS (пойдут на любую руку)"
    ]
  },
  {
    id: 'gloves-nothing-extra',
    name: "nothing extra",
    type: "Перчатки",
    cat: "gloves",
    price: 999,
    color: "черный",
    images: ["images/nothing extra.jpg", "images/nothing extra2.jpg"],
    desc: [
      "Технология Touch — пользоваться гаджетами не снимая перчатку",
      "70% шерсть, 30% freshness",
      "Выдержат до −22°",
      "Размер: OS (пойдут на любую руку)"
    ]
  },
  {
    id: 'gloves-gloomy-snowfall',
    name: "gloomy snowfall",
    type: "Перчатки",
    cat: "gloves",
    price: 999,
    color: "белый",
    images: ["images/«gloomy snowfall».jpg", "images/«gloomy snowfall»2.jpg"],
    desc: [
      "Технология Touch — пользоваться гаджетами не снимая перчатку",
      "70% шерсть, 30% freshness",
      "Выдержат до −22°",
      "Размер: OS (пойдут на любую руку)"
    ]
  },

  // ── ФУТБОЛКИ ──────────────────────────────────────────────────
  {
    id: 'tee-gloom',
    name: "gloom",
    type: "Футболка",
    cat: "tops",
    price: 2333,
    color: "разноцветный",
    images: ["images/«gloom».jpg", "images/«gloom»2.jpg", "images/«gloom»3.jpg"],
    desc: [
      "100% хлопок, кроп фит",
      "DTF печать с лёгким нанесением чёрной краски",
      "Срок изготовления: 7–12 дней"
    ]
  },
  {
    id: 'tee-musical-decade-black',
    name: "музыкальная декада",
    type: "Футболка",
    cat: "tops",
    price: 3555,
    color: "черный",
    images: [
      "images/музыкальная декада черная.jpg",
      "images/музыкальная декада черная2.jpg",
      "images/музыкальная декада черная3.jpg",
      "images/музыкальная декада черная4.jpg"
    ],
    desc: [
      "Легендарная тишка, которая есть у рэп-исполнителя elyaplugg!",
      "100% хлопок, кроп фит",
      "Зип-молния с 2 бегунками",
      "DTF печать",
      "Срок изготовления: 7–12 дней"
    ]
  },
  {
    id: 'tee-musical-decade-grey',
    name: "музыкальная декада",
    type: "Футболка",
    cat: "tops",
    price: 3555,
    color: "серый",
    images: [
      "images/музыкальная декада.jpg",
      "images/музыкальная декада2.jpg",
      "images/музыкальная декада3.jpg"
    ],
    desc: [
      "100% хлопок, кроп фит",
      "Зип-молния с 2 бегунками",
      "DTF печать с изображением проводных наушников",
      "Срок изготовления: 7–12 дней"
    ]
  },
  {
    id: 'tee-smileV2',
    name: "Улыбнись! V2",
    type: "Футболка",
    cat: "tops",
    price: 3555,
    color: "черный",
    images: ["images/Улыбнись!V2.jpg", "images/Улыбнись!V22.jpg", "images/Улыбнись!V23.jpg"],
    desc: [
      "100% хлопок, кроп фит",
      "Зип-молния с 2 бегунками",
      "DTF печать с надписью «Улыбнись!»",
      "Срок изготовления: 7–12 дней"
    ]
  },
  {
    id: 'tee-smile',
    name: "Улыбнись!",
    type: "Футболка",
    cat: "tops",
    price: 3555,
    color: "серый",
    images: ["images/«Улыбнись.jpg", "images/«Улыбнись2.jpg", "images/«Улыбнись3.jpg"],
    desc: [
      "100% хлопок, кроп фит",
      "Зип-молния с 2 бегунками",
      "DTF печать с надписью «Улыбнись!»",
      "Срок изготовления: 7–12 дней"
    ]
  },

  // ── СВИТШОТЫ ──────────────────────────────────────────────────
  {
    id: 'sweat-musical-decade',
    name: "музыкальная декада",
    type: "Свитшот",
    cat: "sweatshirts",
    price: 3999,
    color: "серый",
    images: [
      "images/музыкальная декада.jpg",
      "images/музыкальная декада2.jpg",
      "images/музыкальная декада3.jpg"
    ],
    desc: [
      "100% хлопок, кроп фит",
      "Зип-молния с 2 бегунками",
      "DTF печать с изображением проводных наушников",
      "Срок изготовления: 7–12 дней"
    ]
  },
  {
    id: 'sweat-base',
    name: "base",
    type: "Свитшот",
    cat: "sweatshirts",
    price: 2999,
    color: "черный",
    images: [],
    desc: [
      "100% хлопок, кроп фит",
      "DTF печать с надписью «qust snert» — каст балдёж",
      "Срок изготовления: 7–12 дней"
    ]
  },

  // ── ЗИП-ХУДИ ──────────────────────────────────────────────────
  {
    id: 'zip-hofmannita',
    name: "Hofmannita",
    type: "Зип-худи",
    cat: "zip-hoodies",
    price: 3444,
    color: "серый",
    images: [],
    desc: [
      "100% хлопок, кроп фит",
      "DTF печать с изображением рэп-исполнительницы Хофманита",
      "Срок изготовления: 7–12 дней"
    ]
  },
  {
    id: 'zip-alaska',
    name: "Alaska",
    type: "Зип-худи",
    cat: "zip-hoodies",
    price: 3444,
    color: "серый",
    images: [],
    desc: [
      "100% хлопок, кроп фит",
      "DTF печать с изображением героини Аляска Янг",
      "Из романа Джона Грина «В поисках Аляски»",
      "Срок изготовления: 7–12 дней"
    ]
  },
  {
    id: 'zip-smiles',
    name: "smiles",
    type: "Зип-худи",
    cat: "zip-hoodies",
    price: 3444,
    color: "серый",
    images: ["images/«smiles».jpg", "images/«smiles»2.jpg", "images/«smiles»3.jpg"],
    desc: [
      "100% хлопок, кроп фит",
      "DTF печать со смайликами и надписью «qust snert» — каст балдёж",
      "Срок изготовления: 7–12 дней"
    ]
  },
  {
    id: 'zip-smileV2',
    name: "Улыбнись! V2",
    type: "Зип-худи",
    cat: "zip-hoodies",
    price: 3444,
    color: "черный",
    images: ["images/Улыбнись!V2.jpg", "images/Улыбнись!V22.jpg", "images/Улыбнись!V23.jpg"],
    desc: [
      "100% хлопок, кроп фит",
      "DTF печать с надписью «Улыбнись!»",
      "Срок изготовления: 7–12 дней"
    ]
  },
  {
    id: 'zip-smile',
    name: "Улыбнись!",
    type: "Зип-худи",
    cat: "zip-hoodies",
    price: 3444,
    color: "серый",
    images: ["images/«Улыбнись.jpg", "images/«Улыбнись2.jpg", "images/«Улыбнись3.jpg"],
    desc: [
      "100% хлопок, кроп фит",
      "DTF печать с надписью «Улыбнись!»",
      "Срок изготовления: 7–12 дней"
    ]
  },

  // ── ХУДИ ──────────────────────────────────────────────────────
  {
    id: 'hoodie-tangled',
    name: "tangled headphones",
    type: "Худи",
    cat: "hoodies",
    price: 3444,
    color: "черный",
    images: [
      "images/tangled headphones.jpg",
      "images/tangled headphones2.jpg",
      "images/tangled headphones3.jpg"
    ],
    desc: [
      "75% хлопок, 25% полиэстер, кроп фит",
      "DTF принт на передней стороне",
      "Срок изготовления: 7–12 дней"
    ]
  },

  // ── РУБАШКИ / ЗИП-РУБАШКИ ────────────────────────────────────
  {
    id: 'shirt-basis',
    name: "basis",
    type: "Рубашка",
    cat: "shirts",
    price: 4555,
    color: "белый",
    images: ["images/basis.jpg", "images/basis2.jpg", "images/basis3.jpg"],
    desc: [
      "Ткань «тиси», кроп фит",
      "На пуговицах, слегка расклешённый рукав",
      "Срок изготовления: 7–12 дней"
    ]
  },
  {
    id: 'shirt-sleeping-beauty',
    name: "sleeping beauty",
    type: "Рубашка",
    cat: "shirts",
    price: 5555,
    color: "белый",
    images: [
      "images/sleeping beauty.jpg",
      "images/sleeping beauty2.jpg",
      "images/sleeping beauty3.jpg"
    ],
    desc: [
      "Ткань «тиси», кроп фит",
      "На пуговицах, слегка расклешённый рукав",
      "DTF печать на передней стороне",
      "Срок изготовления: 7–12 дней"
    ]
  },
  {
    id: 'shirt-wayout-v2',
    name: "way-out V2",
    type: "Зип-рубашка",
    cat: "shirts",
    price: 4333,
    color: "черный",
    images: ["images/way-outV2.jpg", "images/way-outV22.jpg", "images/way-outV3.jpg"],
    desc: [
      "Ткань «тиси», кроп фит",
      "На зип-замке, короткий рукав",
      "Срок изготовления: 7–12 дней"
    ]
  },
  {
    id: 'shirt-wayout',
    name: "way-out",
    type: "Зип-рубашка",
    cat: "shirts",
    price: 4333,
    color: "белый",
    images: ["images/way-out.jpg", "images/way-out2.jpg", "images/way-out3.jpg"],
    desc: [
      "Ткань «тиси», кроп фит",
      "На зип-замке, слегка расклешённые рукава с заклёпками",
      "Срок изготовления: 7–12 дней"
    ]
  }
];

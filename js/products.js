const PRODUCTS = [
  // ── ПЕРЧАТКИ ──────────────────────────────────────────────────
  {
    id: 'gloves-itsnot-dg',
    name: "it's not D&G",
    type: "Перчатки",
    cat: "gloves",
    price: 999,
    color: "черный",
    images: ["images/gloves-itsnot-dg-1.jpg", "images/gloves-itsnot-dg-2.jpg"],
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
    images: ["images/gloves-smile-1.jpg", "images/gloves-smile-2.jpg"],
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
    images: ["images/gloves-over-rotators-1.jpg", "images/gloves-over-rotators-2.jpg"],
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
    images: ["images/gloves-delicacy-1.jpg", "images/gloves-delicacy-2.jpg"],
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
    images: ["images/gloves-pleasant-1.jpg", "images/gloves-pleasant-2.jpg"],
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
    images: ["images/gloves-nothing-extra-1.jpg", "images/gloves-nothing-extra-2.jpg"],
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
    images: ["images/gloves-gloomy-snowfall-1.jpg", "images/gloves-gloomy-snowfall-2.jpg"],
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
    images: ["images/tee-gloom-1.jpg", "images/tee-gloom-2.jpg", "images/tee-gloom-3.jpg"],
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
      "images/tee-musical-black-1.jpg",
      "images/tee-musical-black-2.jpg",
      "images/tee-musical-black-3.jpg",
      "images/tee-musical-black-4.jpg"
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
      "images/tee-musical-grey-1.jpg",
      "images/tee-musical-grey-2.jpg",
      "images/tee-musical-grey-3.jpg"
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
    images: ["images/smile-v2-1.jpg", "images/smile-v2-2.jpg", "images/smile-v2-3.jpg"],
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
    images: ["images/tee-smile-grey-1.jpg", "images/tee-smile-grey-2.jpg", "images/tee-smile-grey-3.jpg"],
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
      "images/tee-musical-grey-1.jpg",
      "images/tee-musical-grey-2.jpg",
      "images/tee-musical-grey-3.jpg"
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
    images: ["images/zip-smiles-1.jpg", "images/zip-smiles-2.jpg", "images/zip-smiles-3.jpg"],
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
    images: ["images/smile-v2-1.jpg", "images/smile-v2-2.jpg", "images/smile-v2-3.jpg"],
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
    images: ["images/tee-smile-grey-1.jpg", "images/tee-smile-grey-2.jpg", "images/tee-smile-grey-3.jpg"],
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
      "images/hoodie-tangled-1.jpg",
      "images/hoodie-tangled-2.jpg",
      "images/hoodie-tangled-3.jpg"
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
    images: ["images/shirt-basis-1.jpg", "images/shirt-basis-2.jpg", "images/shirt-basis-3.jpg"],
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
      "images/shirt-sleeping-beauty-1.jpg",
      "images/shirt-sleeping-beauty-2.jpg",
      "images/shirt-sleeping-beauty-3.jpg"
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
    images: [
      "images/shirt-wayout-v2-1.jpg",
      "images/shirt-wayout-v2-2.jpg",
      "images/shirt-wayout-v2-3.jpg"
    ],
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
    images: [
      "images/shirt-wayout-1.jpg",
      "images/shirt-wayout-2.jpg",
      "images/shirt-wayout-3.jpg"
    ],
    desc: [
      "Ткань «тиси», кроп фит",
      "На зип-замке, слегка расклешённые рукава с заклёпками",
      "Срок изготовления: 7–12 дней"
    ]
  }
];

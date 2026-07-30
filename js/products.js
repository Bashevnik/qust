const PRODUCTS = [
  // ── New Drop: "starfall 2026" ──────────────────────────────
  // добавляй новые товары дропа сюда, поставь newDrop: true
  {
    id: 'tops-nothing-superfluous',
    name: 'nothing superfluous',
    type: 'Футболка',
    cat: 'tops',
    price: 3535,
    color: 'разноцветный',
    newDrop: true,
    images: ['images/nothing-superfluous.jpg'],
    desc: [
      'Двойной принт  "qust everywhere"  на спине',
      'DTF печать',
      'Кроп фит',
      '95% хлопок, 5% эластан'
    ]
  },
  {
    id: 'tops-lightness-v3',
    name: 'lightness',
    type: 'Футболка',
    cat: 'tops',
    price: 4044,
    color: 'разноцветный',
    newDrop: true,
    images: ['images/lightness.jpg'],
    desc: [
      'Съёмный рукав на заклёпках',
      'Красивейшая розовая молния',
      'Серебристый, металлический бегунок в форме 2-ух звёзд',
      'Кроп фит',
      '95% хлопок, 5% эластан'
    ]
  },
  {
    id: 'tops-lightness-v2',
    name: 'lightness',
    type: 'Футболка',
    cat: 'tops',
    price: 4044,
    color: 'разноцветный',
    newDrop: true,
    images: ['images/lightness.jpg'],
    desc: [
      'Съёмный рукав на заклёпках',
      'Красивейшая розовая молния',
      'Серебристый, металлический бегунок в форме 2-ух звёзд',
      'Кроп фит',
      '95% хлопок, 5% эластан'
    ]
  },
  {
    id: 'tops-lightness',
    name: 'lightness',
    type: 'Футболка',
    cat: 'tops',
    price: 4044,
    color: 'разноцветный',
    newDrop: true,
    images: ['images/lightness.jpg', 'images/lightness2.jpg', 'images/lightness3.jpg', 'images/lightness4.jpg', 'images/lightness5.jpg', 'images/lightness6.jpg'],
    desc: [
      'Съёмный рукав на заклёпках',
      'Красивейшая розовая молния',
      'Серебристый, металлический бегунок в форме 2-ух звёзд',
      'Кроп фит',
      '95% хлопок, 5% эластан'
    ]
  },
  {
    id: 'tops-variegated',
    name: 'variegated',
    type: 'Футболка',
    cat: 'tops',
    price: 4044,
    color: 'разноцветный',
    newDrop: true,
    images: ['images/variegated.jpg', 'images/variegated2.jpg', 'images/variegated3.jpg', 'images/variegated4.jpg', 'images/variegated5.jpg', 'images/variegated6.jpg'],
    desc: [
      'Съёмный рукав на заклёпках',
      'Красивейшая розовая молния',
      'Серебристый, металлический бегунок в форме 2-ух звёзд',
      'Кроп фит',
      '95% хлопок, 5% эластан'
    ]
  },
  {
    id: 'shirt-way-out',
    name: 'way-out',
    type: 'Зип-рубашка',
    cat: 'shirts',
    price: 4333,
    color: 'белый',
    images: ['images/way-out.jpg', 'images/way-out2.jpg'],
    desc: [
      'Рубашка выполненна на зип-замке, с слегка расклешенными рукавами, которые можно застегнуть на заклепки.',
      'Шьется из ткани «тиси» и имеет кроп фит.',
      'Срок изготовления: 7-12 дней'
    ]
  },
  {
    id: 'shirt-way-out-v2',
    name: 'way-outV2',
    type: 'Зип-рубашка',
    cat: 'shirts',
    price: 4333,
    color: 'черный',
    images: ['images/way-outV2.jpg', 'images/way-outV22.jpg'],
    desc: [
      'Рубашка выполненна на зип-замке, имеет короткий рукав.',
      'Шьется из ткани «тиси» и имеет кроп фит.',
      'Срок изготовления: 7-12 дней'
    ]
  },
  {
    id: 'shirt-sleeping-beauty',
    name: 'sleeping beauty',
    type: 'Рубашка',
    cat: 'shirts',
    price: 5555,
    color: 'белый',
    images: ['images/sleeping beauty.jpg', 'images/sleeping beauty2.jpg'],
    desc: [
      'Рубашка выполнена на пуговицах, имеет слегка расклешенный рукав и DTF печать на передней стороне.',
      'Шьется из ткани «тиси» и имеет кроп фит.',
      'Срок изготовления: 7-12 дней'
    ]
  },
  {
    id: 'shirt-basis',
    name: 'basis',
    type: 'Рубашка',
    cat: 'shirts',
    price: 4555,
    color: 'белый',
    images: ['images/basis.jpg', 'images/basis2.jpg'],
    desc: [
      'Рубашка выполнена на пуговицах, имеет слегка расклешенный рукав.',
      'Шьется из ткани «тиси» и имеет кроп фит.',
      'Срок изготовления: 7-12 дней'
    ]
  },
  {
    id: 'hoodie-tangled-headphones',
    name: 'tangled headphones',
    type: 'Худи',
    cat: 'hoodies',
    price: 3444,
    color: 'черный',
    images: ['images/tangled headphones.jpg', 'images/tangled headphones2.jpg'],
    desc: [
      'Худак состоит из 75% хлопка и 25% полиэстера.',
      'Имеет кроп фит и DTF принт на передней стороне худака.',
      'Срок изготовления: 7-12 дней'
    ]
  },
  {
    id: 'zip-smile',
    name: 'Улыбнись!',
    type: 'Зип-худи',
    cat: 'zip-hoodies',
    price: 3444,
    color: 'серый',
    images: ['images/Улыбнись!.jpg', 'images/Улыбнись!2.jpg'],
    desc: [
      'Зипка состоит из 100% хлопка.',
      'Имеет кроп фит и DTF печать с надписью «Улыбнись!»',
      'Срок изготовления: 7-12 дней'
    ]
  },
  {
    id: 'zip-smile-v2',
    name: 'Улыбнись!V2',
    type: 'Зип-худи',
    cat: 'zip-hoodies',
    price: 3444,
    color: 'черный',
    images: ['images/Улыбнись!V2.jpg', 'images/Улыбнись!V22.jpg'],
    desc: [
      'Зипка состоит из 100% хлопка.',
      'Имеет кроп фит и DTF печать с надписью «Улыбнись!»',
      'Срок изготовления: 7-12 дней'
    ]
  },
  {
    id: 'zip-smiles',
    name: 'smiles',
    type: 'Зип-худи',
    cat: 'zip-hoodies',
    price: 3444,
    color: 'серый',
    images: ['images/smiles.jpg', 'images/smiles2.jpg'],
    desc: [
      'Зипка состоит из 100% хлопка.',
      'Имеет кроп фит и DTF печать со смайликами и надписью «qust snert», что в переводе означает: каст балдёж.',
      'Срок изготовления: 7-12 дней'
    ]
  },
  {
    id: 'zip-alaska',
    name: 'Alaska',
    type: 'Зип-худи',
    cat: 'zip-hoodies',
    price: 3444,
    color: 'серый',
    images: ['images/Alaska.jpg', 'images/Alaska2.jpg'],
    desc: [
      'Зипка состоит из 100% хлопка.',
      'Имеет кроп фит и DTF печать с изображением героини Аляска Янг, главной героини романа Джона Грина «В поисках Аляски» и одноимённого сериала.',
      'Срок изготовления: 7-12 дней'
    ]
  },
  {
    id: 'zip-hofmannita',
    name: 'Hofmannita',
    type: 'Зип-худи',
    cat: 'zip-hoodies',
    price: 3444,
    color: 'серый',
    images: ['images/Hofmannita.jpg', 'images/Hofmannita2.jpg'],
    desc: [
      'Зипка состоит из 100% хлопка.',
      'Имеет кроп фит и DTF печать с изображением рэп-исполнительницы Хофманита.',
      'Срок изготовления: 7-12 дней'
    ]
  },
  {
    id: 'sweat-base',
    name: 'base',
    type: 'Свитшот',
    cat: 'sweatshirts',
    price: 2999,
    color: 'черный',
    images: ['images/base.jpg', 'images/base2.jpg', 'images/base3.jpg'],
    desc: [
      'Свитшот состоит из 100% хлопка.',
      'Имеет кроп фит и DTF печать с надписью «qust snert», что в переводе означает: каст балдёж.',
      'Срок изготовления: 7-12 дней'
    ]
  },
  {
    id: 'sweat-musical-decade',
    name: 'музыкальная декада',
    type: 'Свитшот',
    cat: 'sweatshirts',
    price: 3999,
    color: 'серый',
    images: ['images/музыкальная декада.jpg', 'images/музыкальная декада2.jpg'],
    desc: [
      'Свитшот состоит из 100% хлопка.',
      'Имеет кроп фит, зип-молнию с 2 бегунками и DTF печать с изображением проводных наушников.',
      'Срок изготовления: 7-12 дней'
    ]
  },
  {
    id: 'tee-smile',
    name: 'Улыбнись!',
    type: 'Футболка',
    cat: 'tops',
    price: 3555,
    color: 'серый',
    images: ['images/Улыбнись!ФУТБОЛКА.jpg'],
    desc: [
      'Тишка состоит из 100% хлопка.',
      'Имеет кроп фит, зип-молнию с 2 бегунками и DTF печать с надписью «Улыбнись!»',
      'Срок изготовления: 7-12 дней'
    ]
  },
  {
    id: 'tee-smile-v2',
    name: 'Улыбнись!V2',
    type: 'Футболка',
    cat: 'tops',
    price: 3555,
    color: 'черный',
    images: ['images/Футболка«Улыбнись!V2».jpg', 'images/Футболка«Улыбнись!V2»2.jpg'],
    desc: [
      'Тишка состоит из 100% хлопка.',
      'Имеет кроп фит, зип-молнию с 2 бегунками и DTF печать с надписью «Улыбнись!»',
      'Срок изготовления: 7-12 дней'
    ]
  },
  {
    id: 'tee-musical-decade-grey',
    name: 'музыкальная декада',
    type: 'Футболка',
    cat: 'tops',
    price: 3555,
    color: 'серый',
    images: ['images/Футболка«музыкальная декада».jpg', 'images/Футболка«музыкальная декада»2.jpg'],
    desc: [
      'Тишка состоит из 100% хлопка.',
      'Имеет кроп фит, зип-молнию с 2 бегунками и DTF печать с изображением проводных наушников.',
      'Срок изготовления: 7-12 дней'
    ]
  },
  {
    id: 'tee-musical-decade-black',
    name: 'музыкальная декада',
    type: 'Футболка',
    cat: 'tops',
    price: 3555,
    color: 'черный',
    images: ['images/Футболка«музыкальная декада»черная.jpg'],
    desc: [
      'Тишка состоит из 100% хлопка.',
      'Имеет кроп фит, зип-молнию с 2 бегунками и DTF печать с изображением проводных наушников.',
      'Срок изготовления: 7-12 дней'
    ]
  },
  {
    id: 'tee-musical-decade-v2',
    name: 'музыкальная декада',
    type: 'Футболка',
    cat: 'tops',
    price: 3555,
    color: 'черный',
    images: ['images/Футболка«музыкальная декада»v2.jpg'],
    desc: [
      'Легендарная тишка, которая есть у рэп-исполнителя elyaplugg!',
      'Состоит из 100% хлопка, имеет кроп фит, зип-молнию с 2 бегунками и DTF печать.',
      'Срок изготовления: 7-12 дней'
    ]
  },
  {
    id: 'tee-gloom',
    name: 'gloom',
    type: 'Футболка',
    cat: 'tops',
    price: 2333,
    color: 'разноцветный',
    images: ['images/gloom.jpg', 'images/gloom2.jpg'],
    desc: [
      'Тишка состоит из 100% хлопка.',
      'Имеет кроп фит и DTF печать, на которую слегка нанесена чёрная краска.',
      'Срок изготовления: 7-12 дней'
    ]
  },
  {
    id: 'gloves-gloomy-snowfall',
    name: 'gloomy snowfall',
    type: 'Перчатки',
    cat: 'gloves',
    price: 999,
    color: 'белый',
    images: ['images/gloomy snowfall.jpg', 'images/gloomy snowfall2.jpg'],
    desc: [
      'Технология Touch позволяет пользоваться гаджетами не снимая перчатки.',
      '70% шерсть, 30% freshness.',
      'Выдержут до -22°.',
      'Размер: OS (пойдут на любую руку)'
    ]
  },
  {
    id: 'gloves-nothing-extra',
    name: 'nothing extra',
    type: 'Перчатки',
    cat: 'gloves',
    price: 999,
    color: 'черный',
    images: ['images/«nothing extra».jpg', 'images/«nothing extra»2.jpg'],
    desc: [
      'Технология Touch позволяет пользоваться гаджетами не снимая перчатки.',
      '70% шерсть, 30% freshness.',
      'Выдержут до -22°.',
      'Размер: OS (пойдут на любую руку)'
    ]
  },
  {
    id: 'gloves-pleasant',
    name: 'pleasant',
    type: 'Перчатки',
    cat: 'gloves',
    price: 999,
    color: 'серый',
    images: ['images/«pleasant».jpg', 'images/«pleasant»2.jpg'],
    desc: [
      'Технология Touch позволяет пользоваться гаджетами не снимая перчатки.',
      '70% шерсть, 30% freshness.',
      'Выдержут до -22°.',
      'Размер: OS (пойдут на любую руку)'
    ]
  },
  {
    id: 'gloves-delicacy',
    name: 'delicacy',
    type: 'Перчатки',
    cat: 'gloves',
    price: 999,
    color: 'разноцветный',
    images: ['images/«delicacy».jpg', 'images/«delicacy»2.jpg'],
    desc: [
      'Технология Touch позволяет пользоваться гаджетами не снимая перчатки.',
      '70% шерсть, 30% freshness.',
      'Выдержут до -22°.',
      'Размер: OS (пойдут на любую руку)'
    ]
  },
  {
    id: 'gloves-over-rotators',
    name: 'over-rotators',
    type: 'Перчатки',
    cat: 'gloves',
    price: 999,
    color: 'черный',
    images: ['images/«over-rotators».jpg', 'images/«over-rotators»2.jpg'],
    desc: [
      'Технология Touch позволяет пользоваться гаджетами не снимая перчатки.',
      '70% шерсть, 30% freshness.',
      'Выдержут до -22°.',
      'Размер: OS (пойдут на любую руку)'
    ]
  },
  {
    id: 'gloves-smile',
    name: 'Улыбнись!',
    type: 'Перчатки',
    cat: 'gloves',
    price: 999,
    color: 'черный',
    images: ['images/Перчатки «Улыбнись!».jpg', 'images/Перчатки «Улыбнись!»2.jpg'],
    desc: [
      'Технология Touch позволяет пользоваться гаджетами не снимая перчатки.',
      '70% шерсть, 30% freshness.',
      'Выдержут до -22°.',
      'Размер: OS (пойдут на любую руку)'
    ]
  },
  {
    id: 'gloves-its-not-dg',
    name: "it's not D&G",
    type: 'Перчатки',
    cat: 'gloves',
    price: 999,
    color: 'черный',
    images: ["images/«it's not D&G».jpg", "images/«it's not D&G»2.jpg"],
    desc: [
      'Технология Touch позволяет пользоваться гаджетами не снимая перчатки.',
      "70% шерсть, 30% it's not freshness.",
      'Выдержут до -22°.',
      'Размер: OS (пойдут на любую руку)'
    ]
  }
];

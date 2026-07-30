// Разбор подписи менеджера без ИИ — формат всегда один и тот же:
//
//   Название товара "подназвание"
//   – буллит – буллит – буллит
//   Цена: 3.535₽
//   Цвет: разноцветный

export const CATS = ['gloves', 'tops', 'sweatshirts', 'zip-hoodies', 'hoodies', 'shirts'];
export const COLORS = ['черный', 'серый', 'белый', 'разноцветный'];

const COLOR_ALIASES = {
  'чёрный': 'черный',
  'черный': 'черный',
  'серый': 'серый',
  'белый': 'белый',
  'разноцветный': 'разноцветный',
};

export function parseProductCaption(caption) {
  const lines = caption.split('\n').map(l => l.trim()).filter(Boolean);

  const priceMatch = caption.match(/цена[:\s]*([\d.\s]+)\s*₽/i);
  const colorMatch = caption.match(/цвет[:\s]*([^\n]+)/i);

  const price = priceMatch ? parseInt(priceMatch[1].replace(/\D/g, ''), 10) : 0;
  const rawColor = colorMatch ? colorMatch[1].trim().toLowerCase().replace(/[.,;].*$/, '').trim() : '';
  const color = COLOR_ALIASES[rawColor] || (COLORS.includes(rawColor) ? rawColor : 'разноцветный');

  const nameLine = lines.find(l => !l.startsWith('–') && !l.startsWith('-') && !/^цена/i.test(l) && !/^цвет/i.test(l));
  if (!nameLine) throw new Error('не нашёл строку с названием товара');

  const name = extractName(nameLine);
  const { cat, type } = detectCategory(nameLine);

  const bulletLines = lines.filter(l => l.includes('–') || /^-\s/.test(l));
  const desc = bulletLines
    .flatMap(l => l.split(/[–]/))
    .map(s => s.replace(/^-\s*/, '').trim())
    .filter(Boolean);

  if (!price) throw new Error('не нашёл цену (строка "Цена: ...₽")');
  if (!desc.length) throw new Error('не нашёл описание (строки через "–")');

  return { name, type, cat, price, color, desc };
}

function extractName(line) {
  const quoted = line.match(/["«]([^"»]+)["»]/);
  return quoted ? quoted[1].trim() : line.trim();
}

function detectCategory(line) {
  const l = line.toLowerCase();
  if (l.includes('glove') || l.includes('перчат')) return { cat: 'gloves', type: 'Перчатки' };
  if (l.includes('zip') && l.includes('hood')) return { cat: 'zip-hoodies', type: 'Зип-худи' };
  if (l.includes('hood') || l.includes('худи')) return { cat: 'hoodies', type: 'Худи' };
  if (l.includes('sweat') || l.includes('свитшот')) return { cat: 'sweatshirts', type: 'Свитшот' };
  if ((l.includes('shirt') && !l.includes('t-shirt') && !l.includes('undershirt') && !l.includes('tee'))
      || l.includes('рубаш')) return { cat: 'shirts', type: 'Рубашка' };
  return { cat: 'tops', type: 'Футболка' };
}

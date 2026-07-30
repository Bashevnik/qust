import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export const CATS = ['gloves', 'tops', 'sweatshirts', 'zip-hoodies', 'hoodies', 'shirts'];
export const COLORS = ['черный', 'серый', 'белый', 'разноцветный'];

export async function parseProductCaption(caption) {
  const msg = await anthropic.messages.create({
    model: 'claude-sonnet-5',
    max_tokens: 1024,
    messages: [{
      role: 'user',
      content: `Ты помогаешь добавлять товары на сайт бренда одежды qust. Разбери сообщение от менеджера ниже и верни СТРОГО ТОЛЬКО JSON (без markdown-обёртки, без комментариев) со следующими полями:

{
  "name": string,   // короткое название товара в нижнем регистре, как в сообщении (без кавычек-ёлочек)
  "type": string,   // человекочитаемый тип на русском: "Худи", "Свитшот", "Футболка", "Зип-худи", "Рубашка", "Перчатки" или похожее из сообщения
  "cat": string,    // ОДИН из: ${CATS.join(', ')} — выбери ближайший по смыслу к type
  "price": number,  // цена в рублях, целое число, без пробелов, точек и валюты (например "3.535₽" -> 3535)
  "color": string,  // ОДИН из: ${COLORS.join(', ')} — если явно не указано или смешанный принт, ставь "разноцветный"
  "desc": string[]  // 2-4 коротких пункта описания на русском (состав ткани, крой, детали, срок изготовления), как в исходном сообщении, без изменения смысла
}

Сообщение менеджера:
"""
${caption}
"""`,
    }],
  });

  const raw = msg.content[0].text.trim();
  const jsonStr = raw.replace(/^```(?:json)?\s*/, '').replace(/\s*```$/, '');
  const parsed = JSON.parse(jsonStr);

  if (!CATS.includes(parsed.cat)) parsed.cat = 'tops';
  if (!COLORS.includes(parsed.color)) parsed.color = 'разноцветный';
  parsed.price = Math.round(Number(parsed.price)) || 0;

  return parsed;
}

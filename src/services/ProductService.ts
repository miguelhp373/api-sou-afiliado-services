import puppeteer from "puppeteer";
import axios from "axios";
import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export class ProductService {

  public static async getProductData(url: string) {
    const productLink = await this.extractProductLink(url);

    if (!productLink) {
      throw new Error("Produto não encontrado.");
    }

    const productIdMatch = productLink.match(/MLB-\d+/);
    const productId = productIdMatch ? productIdMatch[0].replace("-", "") : null;

    if (!productId) {
      throw new Error("ID do produto não encontrado.");
    }

    return await this.fetchProductDetails(productId, productLink, url);
  }

  private static async extractProductLink(url: string) {
    const browser = await puppeteer.launch({ 
		headless: true ,
		//executablePath: puppeteer.executablePath(),
		args: ["--disable-setuid-sandbox", "--no-sandbox", "--single-process", "--no-zygote",],
	});
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });

    const productLink = await page.evaluate(() => {
      const container = document.querySelector(".ui-ms-polycard-container");
      if (!container) return null;
      const linkElement = container.querySelector("a");
      return linkElement ? linkElement.href : null;
    });

    await browser.close();
    return productLink;
  }

  private static async fetchProductDetails(productId: string, productLink: string, originalLink : string) {
    try {
      const response = await axios.get(`https://api.mercadolibre.com/items/${productId}`);
      const product = response.data;

      const descriptionResponse = await axios.get(`https://api.mercadolibre.com/items/${productId}/description`);
      const fullDescription = descriptionResponse.data.plain_text || "Descrição não disponível.";

      const summary = await this.summarizeDescription(product.title, product.price, product.currency_id, productLink, fullDescription, originalLink);

      return {
        title: product.title,
        price: `R$${product.price.toFixed(2)}`,
        currency: product.currency_id,
        productLink,
        originalLink,
        summary
      };
    } catch (error) {
      throw new Error("Erro ao buscar detalhes do produto.");
    }
  }

  private static async summarizeDescription(title: string, price: number, currency: string, productLink: string, description: string, afiiliateLink: string) {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Você é um especialista em criar descrições curtas e chamativas para produtos afiliados." },
          {
            role: "user",
            content: `Crie um resumo persuasivo para o produto abaixo, utilizando a mesma estrutura:

            - Título: ${title}
            - Preço: R$${price.toFixed(2)}
            - Moeda: ${currency}
            - Descrição: "${description}"

            Gere um texto curto, usando emojis e frases diretas, sem hashtags, mantenha o texto [MEU LINK], e pode usar negrito, italico, e riscar palavra, pois use o recurso do whatsapp.   
            Exemplo: "Monitor Samsung Viewfinity S5 34" WQHD, Ultrawide, 100Hz, 5ms, HDR10, HDMI, DP, FreeSync, Game Mode Preto 😱 De R$2735 ❌
            Por R$1799 + Frete Grátis! 🔥🔥🔥 Em até 10x sem juros Compre aqui: [MEU LINK] 🧡"`
          },
        ],
        max_tokens: 100,
      });

      return completion.choices[0].message.content?.replace('[MEU LINK]', afiiliateLink);
    } catch (error) {
      return "Resumo não disponível.";
    }
  }
}

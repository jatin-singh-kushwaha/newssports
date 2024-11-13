import axios from 'axios';
import * as cheerio from 'cheerio';

// Scrape sports news
export const fetchSportsNews = async () => {
  try {
    const response = await axios.get('https://indianexpress.com/section/sports/');
    const html = response.data;
    const $ = cheerio.load(html);

    const articles = [];
    
    // Assuming the class for articles is '.articles' and titles are within '.title'
    $('.articles .story').each((index, element) => {
      const title = $(element).find('.title').text().trim();
      const description = $(element).find('.description').text().trim();
      const img = $(element).find('img').attr('src');
      const link = $(element).find('a').attr('href');

      // If no image link, use a default
      const imageUrl = img ? img : 'https://default-image.com/no-image.jpg';

      // Push the extracted data into articles array
      articles.push({ title, description, imageUrl, link });
    });

    // Return the scraped articles
    return articles;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Call the function and log the results (for testing purposes)
fetchSportsNews().then((articles) => {
  console.log('Fetched articles:', articles);
}).catch((error) => {
  console.error('Error:', error);
});

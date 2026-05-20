import Parser from 'rss-parser';

interface NewsletterPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  creator: string;
}

export default defineEventHandler(async (): Promise<NewsletterPost[]> => {
  const config = useRuntimeConfig();
  const feedUrl = config.public?.substackFeedUrl || 'https://johnpaulwile.substack.com/feed';
  const parser = new Parser();

  try {
    const feed = await parser.parseURL(feedUrl);
    return feed.items.map((item) => ({
      title: item.title || '',
      link: item.link || '',
      pubDate: item.pubDate || item.isoDate || '',
      description: item.content || item.contentSnippet || '',
      creator: item.creator || item.author || '',
    }));
  } catch (error) {
    console.error('Failed to fetch Substack feed:', error);
    return [];
  }
});

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const rssUrl = 'https://medium.com/feed/@aziziegatrimuthi16_89459';
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
    
    // Fetch data, caching it for 1 hour to prevent hitting rate limits
    const response = await fetch(apiUrl, { next: { revalidate: 3600 } });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch RSS feed: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (!data.items) {
      return NextResponse.json({ articles: [] });
    }
    
    const articles = data.items.map((item: any) => {
      // Create an excerpt by stripping HTML tags from description
      // Medium's description often contains full HTML content in RSS
      let plainText = item.description.replace(/<[^>]+>/g, '').trim();
      
      // Remove "Continue reading on Medium »" if present
      plainText = plainText.replace(/Continue reading on Medium \u00bb/g, '').trim();
      
      const excerpt = plainText.length > 150 ? plainText.substring(0, 150) + '...' : plainText;
      
      // Calculate a rough read time (assuming 200 words per minute)
      const wordCount = plainText.split(/\s+/).length;
      const readTimeMins = Math.max(1, Math.ceil(wordCount / 200));
      
      // Format date nicely
      const dateObj = new Date(item.pubDate);
      const formattedDate = dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
      
      return {
        id: item.guid || item.link,
        title: item.title,
        excerpt,
        url: item.link,
        date: formattedDate,
        readTime: `${readTimeMins} min read`,
        platform: 'Medium',
        category: item.categories && item.categories.length > 0 ? item.categories[0] : 'Article',
      };
    });
    
    return NextResponse.json({ articles });
  } catch (error) {
    console.error('Error fetching Medium RSS:', error);
    return NextResponse.json({ articles: [] }, { status: 500 });
  }
}

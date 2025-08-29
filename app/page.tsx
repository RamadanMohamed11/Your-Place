import connectToDatabase, { Product } from '@/lib/database';
import HomePageClient from '@/components/ui/HomePageClient';

export default async function Home() {
  await connectToDatabase();
  const featuredProducts = await Product.find({}).sort({ createdAt: -1 }).limit(4).lean();

  return <HomePageClient featuredProducts={JSON.parse(JSON.stringify(featuredProducts))} />;
}
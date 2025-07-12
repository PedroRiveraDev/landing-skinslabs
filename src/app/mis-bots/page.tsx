import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import ClientMisBots from './ClientMisBots';

export default async function MisBotsPage() {
  const { userId } = await auth();
  if (!userId) {
    return redirect('/sign-in?redirect_url=/mis-bots');
  }
  return <ClientMisBots />;
}

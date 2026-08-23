'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    // If we wanted to detect language, we could do it here
    // For now, redirect to the default language 'fa'
    router.replace('./fa');
  }, [router]);
  
  return null;
}

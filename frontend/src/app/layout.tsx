import type { Metadata } from 'next';
import './globals.css';
import { LangProvider } from '@/components/providers/LangProvider';
import { AuthProvider } from '@/components/providers/AuthProvider';

export const metadata: Metadata = {
  title: 'MedWorx - The Capital of Medical Businesses | Baghdad, Iraq',
  description: "MedWorx – The Capital of Medical Businesses. The leading reference platform for medical sector work in Iraq and the primary incubator for promising healthcare projects and initiatives.",
  keywords: 'medworx, medical business, baghdad, iraq, coworking, meeting rooms, medical training, healthcare incubator, medical workspace',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen">
        <AuthProvider>
          <LangProvider>
            {children}
          </LangProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

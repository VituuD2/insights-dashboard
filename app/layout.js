import "./globals.css";
import { Inter } from 'next/font/google';

// Configura a fonte Inter para ser usada no projeto
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata = {
  title: "Insights | Dashboard",
  description: "Dashboard para análise de pedidos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={inter.variable}>
        {children}
      </body>
    </html>
  );
}
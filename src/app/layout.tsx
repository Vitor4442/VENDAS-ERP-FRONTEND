import { Metadata } from "next";
import 'bulma/css/bulma.css'
export const metadata: Metadata = {
  title: 'VENDAS', 
  description: 'Uma breve descrição do seu app de vendas', // Metadado recomendado
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
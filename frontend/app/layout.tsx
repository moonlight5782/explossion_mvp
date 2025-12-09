import './globals.css';


export const metadata = {
  title: 'Explossion MVP',
  description: 'Поиск компаний по профессии',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>
        {children}
      </body>
    </html>
  )
}

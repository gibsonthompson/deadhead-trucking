import './globals.css'

export const metadata = {
  title: 'Deadhead Trucking LLC | Interstate Freight Carrier | Aurora, IL',
  description: 'Deadhead Trucking LLC is a premier interstate freight carrier based in Aurora, IL. 82+ trucks, 102 drivers, 45M+ miles annually. General freight, motor vehicles, hazmat certified. MC-1286521 | USDOT 3689437',
  keywords: 'trucking company, freight carrier, Aurora IL, interstate trucking, general freight, motor vehicle transport, hazmat carrier, USDOT 3689437, MC-1286521',
  icons: {
    icon: '/favicon(1).svg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
import { Geist, Geist_Mono,Montserrat, Inknut_Antiqua} from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const inknut = Inknut_Antiqua({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-inknut-antiqua',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
})


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Truckit",
  description: "Move Anywhere Anytime",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inknut.variable}`}>
      <body
        className={`${inknut.variable} ${montserrat.variable} antialiased`}
      >
        {children}
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}

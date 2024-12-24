import 'react-tippy/dist/tippy.css';
import { Toaster } from "sonner";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import localFont from 'next/font/local'
import type { Metadata } from "next";

const RalewayRegular = localFont({
  src: '../assets/fonts/Raleway-Regular.ttf', //400
  display: 'swap',
  variable: '--font-Raleway-Regular', 
})
const RalewayLight = localFont({
  src: '../assets/fonts/Raleway-Light.ttf', 
  display: 'swap',
  variable: '--font-Raleway-Light', 
})
const RalewayExtraLight = localFont({
  src: '../assets/fonts/Raleway-ExtraLight.ttf', 
  display: 'swap',
  variable: '--font-Raleway-ExtraLight', 
})
const RalewayMedium = localFont({
  src: '../assets/fonts/Raleway-Medium.ttf', 
  display: 'swap',
  variable: '--font-Raleway-Medium', 
})
const RalewaySemiBold = localFont({
  src: '../assets/fonts/Raleway-SemiBold.ttf', 
  display: 'swap',
  variable: '--font-Raleway-SemiBold', 
})
const RalewayBold = localFont({
  src: '../assets/fonts/Raleway-Bold.ttf', 
  display: 'swap',
  variable: '--font-Raleway-Bold', 
})   

export const metadata: Metadata = {
  title: "Auspicious Soft",
  description: " ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <SessionProvider>
        <Toaster richColors />
        <body className={`${RalewayRegular.variable} ${RalewayLight.variable} ${RalewayExtraLight.variable} ${RalewayMedium.variable} ${RalewaySemiBold.variable} ${RalewayBold.variable}`}>
          {children}
        </body>
      </SessionProvider>
    </html>
  );
}

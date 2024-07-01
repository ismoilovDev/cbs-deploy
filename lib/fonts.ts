import localFont from 'next/font/local'

export const Times = localFont({
   src: [
      {
         path: "../assets/fonts/TimesNewRoman.ttf",
         weight: "400",
         style: "normal",
      },
      {
         path: "../assets/fonts/TimesNewRomanBold.ttf",
         weight: "700",
         style: "normal",
      },
      {
         path: "../assets/fonts/TimesNewRomanItalic.ttf",
         weight: "400",
         style: "italic",
      },
      {
         path: "../assets/fonts/TimesNewRomanBoldItalic.ttf",
         weight: "700",
         style: "italic",
      }
   ],
   variable: "--font-times-new-roman",
})
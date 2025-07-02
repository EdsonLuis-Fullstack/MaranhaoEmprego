import Header from "@/components/header/Header"
import Footer from "@/components/footer/Footer"
import './globals.css'
import ScrollToTopButton from './ScrollToTopButton'


export default function layout ({children}){
    return (
     <html>
    <body>
          <Header/>
          <main>{children}</main>
          <Footer />
          <ScrollToTopButton />
    </body>
     </html>
    )
}
import Header from "@/components/header/Header"
import Footer from "@/components/footer/Footer"
import './globals.css' 


export default function layout ({children}){
    return (
     <html>
    <body>
          <Header/>
          <main>{children}</main>
          <Footer />
    </body>
     </html>
    )
}
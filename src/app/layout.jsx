import Header from "@/components/header/Header"
import Footer from "@/components/footer/Footer"
import '@/styles/globals.css' 


export default function layout ({children}){
    return (
     <html>
    <body className="w-[100%] overflow-hidden">
          <Header/>
          <main>{children}</main>
          <Footer />
    </body>
     </html>
    )
}
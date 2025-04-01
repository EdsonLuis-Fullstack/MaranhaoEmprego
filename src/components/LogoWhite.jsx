import Image from 'next/image'


function LogoWhite(){
    return(
        <>
           <a href='/'><Image src='/logo/logobranca.png' alt="logo" width={200} height={50} /></a>
        </>
    )
}

export default LogoWhite
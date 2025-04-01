import Image from 'next/image'


function Logo(){
    return(
        <>
           <a href='/'><Image src='/logo/logoazul.png' alt="logo" width={200} height={50} /></a>
        </>
    )
}

export default Logo 
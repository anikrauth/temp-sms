import Head from "next/head";
import CustomBox from "../components/CustomBox";
import Container from '@mui/material/Container';

export default function Home({numbers, sms}) {

  
  return (
    <main>
      <Head>
        <title>Temp SMS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container fixed>
        <CustomBox numbers={numbers} sms={sms}/>
      </Container>
      </main>
  )
}


const APINumbers = "http://api.sms-activate.org/stubs/handler_api.php?api_key=82f8bfb8cffc647d795c9f90609399Ac&action=getRentList";
const APISms = "https://api.sms-activate.org/stubs/handler_api.php?api_key=82f8bfb8cffc647d795c9f90609399Ac&action=getRentStatus&id=5324037";


 export const getStaticProps  = async () =>{

   const res = await fetch(APINumbers)
   const resTwo = await fetch(APISms)

   const data = await res.json();
   const dataTwo = await resTwo.json();

   return {
     props: {
       numbers : data,
        sms : dataTwo
     },
     revalidate: 10, // In seconds
   }  

 }

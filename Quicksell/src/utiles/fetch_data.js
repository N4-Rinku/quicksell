
async function fetch_data(url)
{
   try{
    const response = await fetch(url);
    if(!response.ok)
    {
      throw new Error("Response is not Ok");
    }
    const data =await response.json();
    return data;
   }
   catch(error){
      console.log("Error",error);
   }
}

export default fetch_data;
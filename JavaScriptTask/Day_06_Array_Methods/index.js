export async function printHellowWord(req,res) {
  console.log('HelloWorld');
}

export async function getData(URL) {
  const res = await fetch(URL);
  const data = await res.json();
  return data;
}

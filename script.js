let input = document.getElementById('input')
let btn = document.getElementById('btn')
let list = document.getElementById('list')

async function getData() {
  const url = `https://api.nationalize.io/?name=${input.value}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    renderList(result.country)
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
}

btn.addEventListener('click', () => {
  console.log(getData());
})




function renderList(item) {
  list.innerHTML = "" 

  item.map((flag, index) => {
    let tr = document.createElement('tr')

    tr.classList.add('bg-base-200', 'flex', 'items-center', 'justify-center', )

    tr.innerHTML = `
      <th>${index + 1}</th>
      <img 
        src="https://flagcdn.com/16x12/${flag.country_id.toLowerCase()}.png"
        srcset="https://flagcdn.com/32x24/${flag.country_id.toLowerCase()}.png 2x,
                https://flagcdn.com/48x36/${flag.country_id.toLowerCase()}.png 3x"
        width="16"
        height="12"
        alt="${flag.country_id}">
      <td>${(flag.probability * 100).toFixed(2)} %</td>
    `

    list.append(tr)
  })
}

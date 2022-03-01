import {CensusRepo} from "./repository/census-repo.js";

const repo = new CensusRepo()
window.onload = async () => {
    await showCensusData();
}

const noOfRows = document.querySelector('#noOfRows')
const countriesTable = document.querySelector('#countries')
const form = document.querySelector('#form')

form.addEventListener('submit', handleSubmitCensus)
noOfRows.addEventListener('change', showCensusData)

async function handleSubmitCensus(e) {
    e.preventDefault();
    const census = formToObject(e.target)
    census.id = Date.now().toString()

    await repo.addCensus(census)
    await showCensusData();
}

function formToObject(form) {
    const formData = new FormData(form)
    const data = {}

    for (const [key, value] of formData) {
        data[key] = value
    }
    return data
}

async function showCensusData() {
    const censuses = await repo.getCensuses(parseInt(noOfRows.value));
    const htmlRows = censuses.map(census => censusToHTMLRow(census)).join(' ')
    countriesTable.innerHTML = `
        <tr>
            <th>Country</th>
            <th>Population</th>
            <th>Action</th>
        </tr>
        ${htmlRows}
    `
}

function censusToHTMLRow(census) {
    return `
        <tr>
            <td>${census.country}</td>
            <td>${census.population}</td>
            <td>
                <i class="fa fa-edit">Edit</i>
                <i class="fa fa-tash">Delete</i>
            </td>
        </tr>
    
    `;
}










const cards = document.getElementsByClassName("cards")[0]

const dataByCategory = {
    planets: {
        title: 'name',
        info: 'diameter'
    },
    people: {
        title: 'name',
        info: 'hair_color'
    }
}


let load

function loading() {
    load = document.createElement('img')
    load.src = "./photos/Spin-1s-200px.gif"
    cards.appendChild(load)
}

function createCards(data, category) {
    const categoryData = dataByCategory[category];
    data.forEach(d => {
        const card = document.createElement('div')
        card.classList.add("card")
        cards.appendChild(card)
        const title = document.createElement('h2')
        title.innerHTML = d[categoryData.title]
        card.appendChild(title)
        const info = document.createElement('p')
        info.innerHTML = d[categoryData.info]
        card.appendChild(info)
    });
}

function fetchData(category) {
    return fetch(`https://swapi.dev/api/${category}/`)
        .then((res) => res.json())
        .then((serverData) => {
            fetchedData = serverData
            return fetchedData
        })
}

const linkElement = document.getElementsByClassName('a_href')
for (let i = 0; i < linkElement.length; i++) {


    let a = linkElement[i]

    a.addEventListener('click', (event) => {
        cards.innerHTML = ''
        loading()
        event.preventDefault();
        const href = a.getAttribute('href');
        const category = href.split('/').pop();

        fetchData(category)
            .then((data) => {
                if (!data.results && load) {
                    cards.removeChild(load);
                    loading();
                } else {
                    load ? cards.removeChild(load) : null
                    createCards(data.results, category)
                    console.log(data.results)
                }
            })
            .catch((error) => {
                console.log(error)
            })

    })
}


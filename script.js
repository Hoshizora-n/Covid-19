const generic = document.querySelector(".generic");
const statistics = document.querySelector(".statistics");
const aboutMe = document.querySelector(".aboutMe");
const header = document.querySelector("header");
const main = document.querySelector(".main");
const footer = document.querySelector("footer");
let menuLi = header.querySelectorAll("li");

// Fungsi ketika klik menu
menuLi.forEach((li) => {
    li.addEventListener("click", (e) => {
        li.classList.add("active");
        for (let sibling of li.parentNode.children) {
            if (sibling !== li) sibling.classList.remove("active");
        }
        const { id } = e.target;
        if (id === "genericnav") {
            generic.style.display = "flex";
            statistics.style.display = "none";
            aboutMe.style.display = "none";
        } else if (id === "statisticsnav") {
            generic.style.display = "none";
            statistics.style.display = "block";
            aboutMe.style.display = "none";
        } else {
            generic.style.display = "none";
            statistics.style.display = "none";
            aboutMe.style.display = "block";
        }
    });
});

// Mengambil Data Vaksinasi se Indonesia
async function getVaksinData() {
    let url = "https://vaksincovid19-api.vercel.app/api/vaksin";
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

// Menerapkan data vaksinasi ke HTML
async function renderVaksinData() {
    let data = await getVaksinData();
    const angkaDosis1 = statistics.querySelector("#angkadosis1");
    const angkaDosis2 = statistics.querySelector("#angkadosis2");
    const angkaSasaranVaksinasi = statistics.querySelector("#angkasasaranvaksinasi");
    const lastUpdateVaksin = statistics.querySelector("#lastupdatevaksin");
    const getAngkaDosis1 = data.vaksinasi1;
    const getAngkaDosis2 = data.vaksinasi2;
    const getAngkaSasaranVaksinasi = data.totalsasaran;
    const getLastUpdateVaksin = "Last Update : " + data.lastUpdate.slice(0, 10);

    angkaDosis1.textContent = getAngkaDosis1;
    angkaDosis2.textContent = getAngkaDosis2;
    angkaSasaranVaksinasi.textContent = getAngkaSasaranVaksinasi;
    lastUpdateVaksin.textContent = getLastUpdateVaksin;
}
renderVaksinData();

// Mengambil Data Covid se Indonesia
async function getDefaultData() {
    let url = "https://apicovid19indonesia-v2.vercel.app/api/indonesia/more";
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

// Menerapkan Data Covid se Indonesia ke HTML
const containercase = document.querySelector(".containercase");
const confirmed = containercase.querySelector("#confirmed");
const recovered = containercase.querySelector("#recovered");
const death = containercase.querySelector("#death");
const activecase = containercase.querySelector("#activecase");
const plusConfirmed = containercase.querySelector("#plusconfirmed");
const plusRecovered = containercase.querySelector("#plusrecovered");
const plusDeath = containercase.querySelector("#plusdeath");
const plusActive = containercase.querySelector("#plusactive");
const lastUpdateElement = document.querySelector("#lastUpdate");
const wilayah = statistics.querySelector(".wilayah");
async function renderData() {
    let data = await getDefaultData();
    const totalConfirmed = data.total.positif;
    const totalRecovered = data.total.sembuh;
    const totalDeath = data.total.meninggal;
    const totalActive = data.total.dirawat;
    const angkaPlusConfirmed = data.penambahan.positif;
    const angkaPlusRecovered = data.penambahan.sembuh;
    const angkaPlusDeath = data.penambahan.meninggal;
    const angkaPlusActive = data.penambahan.dirawat;
    const lastUpdate = data.total.lastUpdate;

    confirmed.textContent = totalConfirmed;
    recovered.textContent = totalRecovered;
    death.textContent = totalDeath;
    activecase.textContent = totalActive;
    plusConfirmed.textContent = "+" + angkaPlusConfirmed;
    plusRecovered.textContent = "+" + angkaPlusRecovered;
    plusDeath.textContent = "+" + angkaPlusDeath;
    plusActive.textContent = "+" + angkaPlusActive;
    lastUpdateElement.textContent = "Last Update : " + lastUpdate.slice(0, 10);
}
renderData();

// Mengambil Data Covid Per Provinsi
async function getProvinsiData() {
    let url = "https://apicovid19indonesia-v2.vercel.app/api/indonesia/provinsi/more";
    try {
        let res = await fetch(url);
        return res.json();
    } catch (error) {
        console.log(error);
    }
}

const renderProvinsiData = async () => {
    let data = await getProvinsiData();
    const inputValue = statistics.querySelector(".searchInput").value.toUpperCase();
    let cariData = data.find((data) => data.provinsi == inputValue);
    if (cariData) {
        let getWilayah = cariData.provinsi;
        let wilayahSplit = getWilayah.toLowerCase().split(" ");
        const capitalizedWilayah = wilayahSplit
            .map((wilayahKata) => {
                return wilayahKata[0].toUpperCase() + wilayahKata.substring(1);
            })
            .join(" ");
        const totalConfirmed = cariData.kasus;
        const totalRecovered = cariData.sembuh;
        const totalDeath = cariData.meninggal;
        const totalActive = cariData.dirawat;
        const angkaPlusConfirmed = cariData.penambahan.positif;
        const angkaPlusRecovered = cariData.penambahan.sembuh;
        const angkaPlusDeath = cariData.penambahan.meninggal;
        const angkaPlusActive = cariData.penambahan.dirawat;
        const lastUpdate = cariData.last_date;

        confirmed.textContent = totalConfirmed;
        recovered.textContent = totalRecovered;
        death.textContent = totalDeath;
        activecase.textContent = totalActive;
        wilayah.textContent = capitalizedWilayah;
        plusConfirmed.textContent = "+" + angkaPlusConfirmed;
        plusRecovered.textContent = "+" + angkaPlusRecovered;
        plusDeath.textContent = "+" + angkaPlusDeath;
        plusActive.textContent = "+" + angkaPlusActive;
        lastUpdateElement.textContent = "Last Update : " + lastUpdate;
    } else {
        alert("Provinsi tidak ditemukan");
    }
};
// Fungsi ketika tombol search diklik
const searchIcon = statistics.querySelector(".searchIcon");
searchIcon.addEventListener("click", () => {
    renderProvinsiData();
    if (ul.hasChildNodes) {
        while (ul.firstChild) {
            ul.firstChild.remove();
        }
    }
});

// get nama-nama provinsi
async function renderProvinsiName() {
    let data = await getProvinsiData();
    let provinsi = [];
    data.forEach((data) => {
        provinsi.push(data.provinsi);
    });
    return provinsi;
}
// Mengeluarkan nama-nama provinsi dari bentuk Promise
let namaProvinsi = [];
renderProvinsiName().then((provinsi) => provinsi.forEach((provinsi) => namaProvinsi.push(provinsi))); // Foreach untuk mengubah array object ke array string

// Fungsi ketika input berubah
let inputElement = document.querySelector(".searchInput");
const autocomplete = document.querySelector(".autocomplete");
const ul = autocomplete.querySelector("ul");
inputElement.addEventListener("keyup", (e) => {
    let inputValue = e.target.value;
    let filteredProvinsi = [];
    if (inputValue) {
        if (ul.hasChildNodes) {
            while (ul.firstChild) {
                ul.firstChild.remove();
            }
        }
        filteredProvinsi = namaProvinsi.filter((provinsi) => provinsi.includes(inputValue.toUpperCase()));
        filteredProvinsi.sort();
        filteredProvinsi.forEach((provinsi) => {
            provinsi = provinsi.toLowerCase();
            provinsi = provinsi.split(" ");
            const provinsiJoin = provinsi
                .map((provinsiKata) => {
                    return provinsiKata[0].toUpperCase() + provinsiKata.substring(1);
                })
                .join(" ");
            let li = document.createElement("li");
            ul.appendChild(li);
            li.textContent = provinsiJoin;
            li.setAttribute("onclick", "clickAutoComplete(this)");
        });
    } else {
        // Ketika inputValue kosong
        while (ul.firstChild) {
            ul.firstChild.remove();
        }
    }
});

const clickAutoComplete = (element) => {
    const textLi = element.textContent;
    inputElement.value = textLi;
    while (ul.firstChild) {
        ul.firstChild.remove();
    }
};

// Dark Mode
const darkMode = document.querySelector(".dark-mode");
const activeMenu = header.querySelector(".active");
const checkBoxDarkMode = darkMode.querySelector("input");

checkBoxDarkMode.addEventListener("click", () => {
    localStorage.setItem("darkMode", checkBoxDarkMode.checked);
    if (localStorage.getItem("darkMode") == "true") {
        document.body.style.backgroundColor = "#222831";
        document.body.style.color = "white";
        header.style.backgroundColor = "#222831";
        footer.style.backgroundColor = "#222831";
        document.documentElement.style.setProperty("--colorDarkMode", "white");
        document.documentElement.style.setProperty("--colorBoxShadow", "rgba(255,255,255,0.1)");
        document.documentElement.style.setProperty("--colorBackgroundPlus", "#222831");
    } else {
        document.body.style.backgroundColor = "transparent";
        document.body.style.color = "black";
        header.style.backgroundColor = "white";
        footer.style.backgroundColor = "white";
        document.documentElement.style.setProperty("--colorDarkMode", "black");
        document.documentElement.style.setProperty("--colorBoxShadow", "rgba(0, 0, 0, 0.2)");
        document.documentElement.style.setProperty("--colorBackgroundPlus", "white");
    }
});

// Menu Responsive
const menuResponsiveClick = header.querySelector(".menuResponsiveClick");
const bar1 = menuResponsiveClick.querySelector(".bar1");
const bar2 = menuResponsiveClick.querySelector(".bar2");
const bar3 = menuResponsiveClick.querySelector(".bar3");
const menuUl = header.querySelector("ul");
menuResponsiveClick.addEventListener("click", () => {
    if (menuUl.style.display === "flex") {
        menuUl.style.display = "none";
        darkMode.style.display = "none";
        bar1.style.transform = "translateY(0)";
        bar2.style.opacity = "1";
        bar3.style.transform = "translateY(0)";
    } else {
        menuUl.style.display = "flex";
        darkMode.style.display = "block";
        bar1.style.transform = "translateY(10px)";
        bar2.style.opacity = "0";
        bar3.style.transform = "translateY(-10px)";
    }
});
// Mengembalikan style menu ke versi desktop ketika window width > 450
window.addEventListener("resize", () => {
    if (window.innerWidth > 450) {
        menuUl.style.display = "flex";
        darkMode.style.display = "block";
    } else {
        menuUl.style.display = "none";
        darkMode.style.display = "none";
    }
});

// window.addEventListener("scroll", () => {
//     header.classList.toggle("p-fixed", scrollY > 0);
// });

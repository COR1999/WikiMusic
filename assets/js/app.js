
let baseUrl = "https://ws.audioscrobbler.com"
let apiKey = "977e2d82b14fe34163d15b95f2c1ce55"
let dropdownValue;
let submit = document.getElementById('search'),
    myInput = document.getElementById("myInput");
let objJson;
// let chartData = apiUrl("chart")

$(document).ready(function () {

    window.onload = $(function () {
        if ($("body").is(".chart")) {
            getCharts()

            // buildTable(rows)
            // console.log(getCharts())
        }
    });
    window.onload = $(function () {
        if ($("body").is(".index")) {
            submit.addEventListener("click", function () {
                GetSelectedValue();
            });
            $(".artist-cards").html(`<h1>Be sure to check out are top 100 page <a href="/chart.html" id="here-Link">here</a></h1>`)
        }
    })

    let chart = document.getElementById("chart");
    // chart.addEventListener("click", function () { getCharts() })

    $('#myInput').keydown(function (event) {
        if (event.keyCode == '13') {
            $("#search").click();
        }
        else {
            //do nothing :)
        }
    });
    let date = new Date();

    $("#date").html(date.toLocaleString())
    console.log(date)

})



function GetSelectedValue() {
    let e = document.getElementById("option-menu");
    let result = e.options[e.selectedIndex].value;
    // $(e).focus();
    $(result).toggleClass('active');
    console.log(result);
    searchTheAPI(result);
}


function searchTheAPI(result) {

    let input;
    let searchType = result;
    console.log(searchType);

    input = $("#myInput").val();
    if (searchType === "album") {
        apiUrl(searchType, input)
            .then(function (response) {
                // console.log(response)
                let albumArray = response.results.albummatches.album;
                // let newAlbumArray = [];

                let rows = [];
                let cardRow = [];
                let NumberPerRow = 3;
                let trackOuter = [];
                albumArray.forEach(function (album, index) {
                    let imageIndex = 2;
                    let albumImage = `<img src="${album.image[imageIndex]["#text"]}">`
                    // console.log(album.artist)
                    if (album.image.length >= 2) {
                        if (album.image[imageIndex]["#text"] === "") {
                            // console.log("working" album.artist);
                            albumImage = `<img class="no-imagesizeing" src="assets/images/no-image-available.png">`
                        }
                    }
                    cardRow.push(`<div class="card col-sm-12 col-md-12 col-lg-4">${albumImage}<h1>${album.artist}</h1><p class="title">${album.name}</p><button class="viewAlbum-songs"id="view-songs${index}">View Songs For This album</button></div>`)
                    if ((index + 1) % NumberPerRow === 0 || (index + 1) === albumArray.length) {
                        // cardRow.push(`<div class="card">${albumImage}<h1>${album.artist}</h1><p class="title">${album.name}</p></div>`)
                        rows.push(`<div class="row">${cardRow.join("")}</div>`);

                        cardRow.length = 0;

                    }
                    getSongs(album, index);
                })
                // $(".artist-cards").html(`${rows.join("")}`.replace(/,/g, ""))
                $(".artist-cards").html(`${rows.join("")}`)



            })
    } else if (searchType === "song") {
        apiUrl(searchType, input)
            .then(function (response) {
                let trackArray = response.results.trackmatches.track;
                console.log(response)
                let newTrackArray = [];
                let NumberPerRow = 4;
                let newTrackArrayRow = [];
                trackArray.forEach(function (track, index) {
                    newTrackArray.push(`<div class="songs-search col-sm-6 col-md-4 col-lg-2"><h4>${track.name}</h4><p>Artist: ${track.artist}<br>Total listens: ${(numberWithCommas(track.listeners))}</p></div>`)
                    if ((index + 1) % NumberPerRow === 0 || (index + 1) === trackArray.length) {
                        // cardRow.push(`<div class="card">${albumImage}<h1>${album.artist}</h1><p class="title">${album.name}</p></div>`)
                        newTrackArrayRow.push(`<div class="row">${newTrackArray.join("")}</div>`);
                        newTrackArray.length = 0;
                        // console.log(newTrackArrayRow)
                    }

                })

                // $(".artist-cards").html(`<div class="song-search-outer">${newTrackArrayRow}</div>`.replace(/,/g, ""));
                $(".artist-cards").html(`<div class="song-search-outer">${newTrackArrayRow.join("")}</div>`);


                // console.log(response.results.trackmatches);
            })
    } else if (searchType === "chart") {
        getCharts(searchType)
    }
    dropdownValue = "";
}
function apiUrl(searchType, input) {
    let limit;
    let searchBy;
    switch (searchType) {
        case "artist":
            searchBy = "artist.search&artist=";
            break;
        case "album":
            searchBy = "album.search&album=";
            limit = "20"
            break;
        case "song":
            searchBy = "track.search&track=";
            limit = "20"
            break;
        case "chart":
            searchBy = "chart.gettoptracks";
            input = "";
            limit = "100"

            break;
        default:
            console.log("unkown Input", searchBy);
        // code block
    }
    // console.log("search ", searchType)

    return (
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": `${baseUrl}/2.0/?method=${searchBy}${input}&api_key=${apiKey}&limit=${limit}&format=json`,
            "method": "GET",
        }))
}


function getSongs(album, index) {
    let imageIndex = 2;
    let albumImage = `<img src="${album.image[imageIndex]["#text"]}">`

    $.ajax({
        "async": true,
        "crossDomain": true,
        "url": `${baseUrl}/2.0/?method=album.getinfo&api_key=${apiKey}&artist=${album.artist}&album=${album.name}&format=json`,
        "method": "GET",
    }).then(function (data) {
        let arrayOfTracks = data.album.tracks.track;

        // console.log(data.album.tracks.track)
        let trackArray = [];

        arrayOfTracks.forEach(function (track) {
            // console.log(track)
            // console.log(track.name)
            // console.log(album.name)
            $(`#view-songs${index}`).on("click", function () {
                // console.log("index", index)
                // console.log("track:", track.name)

                trackArray.push(`<h4>${track.name}</h4><br><p>Duration: ${turnSec(track.duration)}</p>`)

                // console.log(trackArray);
                // trackOuter.push(`<div  id="${index}"><p>${track.name}</p></div>`)
                // console.log(arrayOfTracks)

                $(".artist-cards").html(`<div class="album-songs">${albumImage}<div class="list-songs">${trackArray}</div></div>`.replace(/,/g, ""))
            })
            // if (track.name === arrayOfTracks) {
            //     console.log(track.name)
            // }
        })
    })
}
function getTableElement(el, value) {
    // if (index === 0) { return };

    let text = value;
    if (el) {
        text = el;
    }
    // console.log(el)
    // console.log(text)
    // console.log(value)
    let str = `<td>${text}</td>`
    return str
}
function chartHeaders() {
    let tableHeader = ""
    let tableNumber = `<th scope="col">Number</th>`,
        tableSong = `<th scope="col">Song</th>`,
        tableArtist = `<th scope="col">Artist</th>`,
        tablePlaycount = `<th scope="col" >Play count</th>`;


    tableHeader = tableNumber + tableSong + tableArtist + tablePlaycount

    return `<thead><tr>${tableHeader}</tr></thead>`;
}
function chartRows(obj) {
    let tableRows = [];
    obj.forEach(function (track, index) {
        let dataRow = [];

        let newIndex = (getTableElement(index + 1));
        let trackName = (getTableElement(track.name));
        let artistName = (getTableElement(track.artist.name));
        let playCount = (getTableElement(numberWithCommas(track.playcount)));
        // str = newIndex + trackName + artistName + playCount
        dataRow.push(newIndex)
        dataRow.push(trackName);
        dataRow.push(artistName);
        dataRow.push(playCount);

        // tableRows.push(`<tr>${str}</tr>`);

        tableRows.push(`<tr >${dataRow.join("")}</tr>`);

    });

    let setOfPages = [];
    // pageButtons(pageSize)
    //     .then(function (l) {
    //         console.log(l)
    //     })
    // console.log(tableRows.length)
    // let pageSize = 10;
    // let totalPages = Math.ceil(tableRows.length / pageSize)
    // while (setOfPages.length < totalPages) {
    //     setOfPages.push(tableRows.splice(0, pageSize))
    // }
    // console.log(setOfPages)
    console.log(setOfPages)
    // return tableRows.join("");
    // return setOfPages

    return tableRows
}

function getCharts() {
    let rows;
    let tableRows = [];
    // console.log()
    apiUrl("chart")
        .then(function (response) {
            // let objParsed = JSON.parse(response)
            let tracksArray = response.tracks.track;
            rows = chartRows(tracksArray);
            // pageButtons(rows.length, rows)
            // buildTable(rows, 1)
            // let tableRows = [];
            // let trackData = {
            //     index: index,
            //     name: name,

            // }
            console.log(tracksArray[0].name)
            tracksArray.forEach(function (track, index) {
                let dataRow = [];

                let newIndex = index + 1
                let trackName = track.name
                let artistName = track.artist.name
                let playCount = track.playcount
                dataRow.push(newIndex)
                dataRow.push(trackName);
                dataRow.push(artistName);
                dataRow.push(numberWithCommas(playCount));
                console.log(dataRow)
                tableRows.push(dataRow)
            })
            console.log(tableRows)
            // console.log(rows)
            $("#chart-table").DataTable({
                data: tableRows,
                lengthChange: false,
                responsive: true,
                columns: [
                    {
                        title: "Number",
                        width: "5%"
                    },
                    {
                        title: "Name",
                        width: "35%"
                    },
                    {
                        title: "Artist",
                        width: "25%",
                    },
                    {
                        title: "Play Count",
                        width: "20%",
                    }

                ]
            })
            // let buildTable = `<table id="chart-table">${chartHeaders()}${rows}</table> `
            // $(".top-charts").html(buildTable)

            // $(".top-charts").html(tracksArray)
            // return tableRows
        })

}

function buildTable(rows, page) {
    // let header = chartHeaders()
    // page = page - 1;
    // console.log(page)
    // pageSize = 10;
    // let table = `<table id="chart-table">${header}${rows[page].join("")}</table> `
    // $(".top-charts").html(table)
    // console.log(page)
    // $("#chart-table").DataTable();
}

function turnSec(s) {
    // let minutes = parseInt(s / 60) % 60;
    // let seconds = s % 60;
    var minutes = ("00" + Math.floor((s % 3600) / 60)).slice(-2);
    let seconds = ("00" + (s % 3600) % 60).slice(-2);
    return minutes + ":" + seconds;

}
function numberWithCommas(num) {
    let numParts = num.toString().split(".");
    numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return numParts.join(".");
}

// function pageButtons(pages, rows) {
//     rows = rows;
//     let value;
//     let wrapper = document.getElementById("buttons")
//     wrapper.innerHTML = ""
//     for (var page = 1; page <= pages; page++) {
//         wrapper.innerHTML += `<button value="${page}" class="page-button" >${page}</button> `
//     }
//     $(".page-button").on("click", function () {
//         $(".top-charts").empty()
//         value = $(this).val()
//         // console.log(value)
//         buildTable(rows, value)
//         console.log(rows)
//         // console.log(value)
//     })
// };
// class Chart {
//     constructor(index, song, name, playcount) {
//         this.index = index;
//         this.song = song;
//         this.name = name;
//         this.playcount = playcount;
//     }
// }


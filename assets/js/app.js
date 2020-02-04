let baseUrl = "https://ws.audioscrobbler.com"
let apiKey = "977e2d82b14fe34163d15b95f2c1ce55"
let dropdownValue;
let submit = document.getElementById('search'),
    myInput = document.getElementById("myInput");


$(document).ready(function () {
    $(function () {
        if ($("body").is(".chart")) {

            getCharts();
        }
    });

    let chart = document.getElementById("chart");
    chart.addEventListener("click", function () { getCharts() })
    $('#myInput').keydown(function (event) {
        if (event.keyCode == '13') {
            $("#search").click();
        }
        else {
            //do nothing :)
        }
    });
    // submit.addEventListener("click", function () {
    //     GetSelectedValue();
    // });

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
    // $("#artist-list").empty()
    // $("#album-list").empty()
    // $("#track-list").empty()
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
                        rows.push(`<div class="row">${cardRow}</div>`);

                        cardRow.length = 0;

                    }
                    getSongs(album, index);
                })
                $(".artist-cards").html(`${rows}`.replace(/,/g, ""))
            })
    } else if (searchType === "song") {
        apiUrl(searchType, input)
            .then(function (response) {
                let trackArray = response.results.trackmatches.track;

                let newTrackArray = [];
                let NumberPerRow = 4;
                let newTrackArrayRow = [];
                trackArray.forEach(function (track, index) {
                    newTrackArray.push(`<div class="songs-search col-sm-6 col-md-4 col-lg-2"><h4>${track.name}</h4><p>Artist: ${track.artist}<br>Total listens: ${track.listeners}</p></div>`)
                    if ((index + 1) % NumberPerRow === 0 || (index + 1) === trackArray.length) {
                        // cardRow.push(`<div class="card">${albumImage}<h1>${album.artist}</h1><p class="title">${album.name}</p></div>`)
                        newTrackArrayRow.push(`<div class="row">${newTrackArray}</div>`);
                        newTrackArray.length = 0;
                        console.log(newTrackArrayRow)
                    }

                })
                console.log(newTrackArrayRow)

                $(".artist-cards").html(`<div class="song-search-outer">${newTrackArrayRow}</div>`.replace(/,/g, ""));

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
            limit = "50"

            break;
        default:
            console.log("unkown Input", searchBy);
        // code block
    }
    console.log("search ", searchType)

    return (
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": `${baseUrl}/2.0/?method=${searchBy}${input}&api_key=${apiKey}&limit=${limit}&format=json`,
            "method": "GET",
        }))
}

//https://codepen.io/cristinaconacel/pen/ePVMME


// function albumAndArtist(album) {
//     $.ajax({
//         "async": true,
//         "crossDomain": true,
//         "url": `${baseUrl}/2.0/?method=album.getinfo&api_key=${apiKey}&artist=${album.artist}&album=${album.name}&format=json`,
//         "method": "GET",
//     }).then(function (data) {
//         console.log(data);
//     })
// }



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
            console.log(track)
            // console.log(track.name)
            // console.log(album.name)
            $(`#view-songs${index}`).on("click", function () {
                // console.log("index", index)
                // console.log("track:", track.name)

                trackArray.push(`<li>${track.name}<br>Duration: ${turnSec(track.duration)}</li>`)

                // console.log(trackArray);
                // trackOuter.push(`<div  id="${index}"><p>${track.name}</p></div>`)
                // console.log(arrayOfTracks)

                $(".artist-cards").html(`<div class="album-songs">${albumImage}<ul class="list-songs">${trackArray}</ul></div>`.replace(/,/g, ""))
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
    console.log(el)
    // console.log(text)
    // console.log(value)
    return `<td>${text}</td>`;
}
function chartHeaders() {
    var tableHeaders = [];
    tableHeaders.push(`<td>Number</td>`)
    tableHeaders.push(`<td>Song Name</td>`);
    tableHeaders.push(`<td>Artist Name</td>`);
    tableHeaders.push(`<td>Playcount</td>`);
    // tableHeaders.push(`<td>Description</td>`);

    return `<thead><tr>${tableHeaders}</tr></thead>`;
}
function chartRows(obj) {
    var tableRows = [];
    obj.forEach(function (track, index) {
        let dataRow = [];
        // let newTrack = track.replace(/,/g, "")
        // console.log(track);
        // let newTrack = (track.replace(/,/g, ''))
        let newIndex = getTableElement(index + 1);
        let trackName = getTableElement(track.name);
        let artistName = getTableElement(track.artist.name);
        let playCount = getTableElement(numberWithCommas(track.playcount));
        // console.log(newTrack)
        // console.log(track.image[1]["#text"])
        dataRow.push(newIndex)
        dataRow.push(trackName);
        dataRow.push(artistName);
        dataRow.push(playCount);

        // if ((index + 1) % NumberPerRow === 0 || (index + 1) === tracksArray.length) {
        //     // cardRow.push(`<div class="card">${albumImage}<h1>${album.artist}</h1><p class="title">${album.name}</p></div>`)
        //     trackTotal.push(`<div class="row">${trackRow}</div>`);
        //     trackRow.length = 0;
        // }
        tableRows.push(`<tr>${dataRow}</tr>`)
    });
    return tableRows;
}
function getCharts() {
    console.log()
    apiUrl("chart")
        .then(function (response) {
            let tracksArray = response.tracks.track;
            console.log(tracksArray)
            // let trackRow = [];
            // let trackTotal = [];
            // let NumberPerRow = 6;
            // // console.log(response.tracks.track);
            // tracksArray.forEach(function (track, index) {
            //     console.log(track);
            //     // console.log(track.image[1]["#text"])
            //     trackRow.push(`<div class="track-card col-sm-12 col-md-12 col-lg-4"><li>${track.name}: ${track.artist.name} Playcount:${track.playcount} </li></div>`)
            //     if ((index + 1) % NumberPerRow === 0 || (index + 1) === tracksArray.length) {
            //         // cardRow.push(`<div class="card">${albumImage}<h1>${album.artist}</h1><p class="title">${album.name}</p></div>`)
            //         trackTotal.push(`<div class="row">${trackRow}</div>`);
            //         trackRow.length = 0;
            //     }
            // })
            chartHeaders(tracksArray)
            chartRows(tracksArray)
            let table = `<table>${chartHeaders(tracksArray)}${chartRows(tracksArray)}</table>`;

            // $(".top-charts").html(`<div class="track-outer"><ul>${trackTotal}</ul></div>`.replace(/,/g, ""))
            $(".top-charts").html(table)

        })

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
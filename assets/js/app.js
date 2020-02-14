
let baseUrl = "https://ws.audioscrobbler.com"
let apiKey = "977e2d82b14fe34163d15b95f2c1ce55"
let dropdownValue;
// let submit = document.getElementById('search');
// let myInput = document.getElementById("myInput");
let myInput = $("#myInput");
let submit = $("#search")
// let chartData = apiUrl("chart")
let table;
let height = $(window).height();
$(document).ready(function () {
    $(window).on("resize", function () {
        resizedHeight = $(window).height();
        tableResize(resizedHeight);
    });

    // Only listens for the submit on the Home page
    window.onload = $(function () {
        getCharts()
        submit.on("click", function () {
            GetSelectedValue();
            $('html,body').animate({
                scrollTop: $("#animation-div").position().top,

            },
                1800);
            // console.log($("#animation-div").position().top)
        });

        // $(".artist-cards").html(`<div class="home-chart"><h1>Hello and Wellcome to brand Name</h1>
        // <p>If you have any questions about are content or anything to point out visit on social media</div>`)
    })
    // Checks if the enter key is pressed in the input
    $('#myInput').keydown(function (event) {
        if (event.keyCode == '13') {
            $("#search").click();
        }
        else {
            //do nothing :)
        }
    });
    // Gets a date to display on the chart's page
    let date = new Date();
    $("#date").html(date.toLocaleString())
    // console.log(date)
    // Scrolls down to the artist cards after clicking the search button
    $("#search").click(function () {

    });
})


// Get the selected value from the dropdown on the home page
function GetSelectedValue() {
    let e = document.getElementById("option-menu");
    let result = e.options[e.selectedIndex].value;
    // $(e).focus();
    $(result).toggleClass('active');
    // console.log(result);
    searchTheAPI(result);
}


function searchTheAPI(result) {

    let input;
    let searchType = result;
    // console.log(searchType);
    // Sets to input to equal the value in the input feild
    input = $("#myInput").val();
    if (input.length === 0) {
        $(".info-text").html("<h1>Invalid Input</h1>")
    }
    // if the Search Type equal album then searches the album endpoint and displays the data in cards
    if (searchType === "album") {
        apiUrl(searchType, input)
            .then(function (response) {
                // $(".artist-cards").fadeOut(1500);
                $(".song-search-div").fadeOut(1500)
                $(".list-songs-div").fadeOut(1500)

                // console.log(response)
                let albumArray = response.results.albummatches.album;
                // let newAlbumArray = [];

                let rows = [];
                let cardRow = [];
                let NumberPerRow = 12;
                let trackOuter = [];
                albumArray.forEach(function (album, index) {
                    let imageIndex = 2;
                    let albumImage = `<img src="${album.image[imageIndex]["#text"]}">`
                    // console.log(album.artist)
                    if (album.image.length >= 2) {
                        if (album.image[imageIndex]["#text"] === "") {
                            // console.log("working" album.artist);
                            albumImage = `<img class="no-imagesizeing"src="assets/images/no-image-available.png">`
                        }
                    }
                    cardRow.push(`<div class="card col-sm-12 col-md-6 col-lg-4">${albumImage}<h1>${album.artist}</h1><p class="title">${album.name}</p><button class="viewAlbum-songs"id="view-songs${index}">View Songs</button></div>`)
                    if ((index + 1) % NumberPerRow === 0 || (index + 1) === albumArray.length) {
                        // cardRow.push(`<div class="card">${albumImage}<h1>${album.artist}</h1><p class="title">${album.name}</p></div>`)
                        rows.push(`<div class="row">${cardRow.join("")}</div>`);

                        cardRow.length = 0;

                    }
                    // console.log(album)
                    getSongs(album, index);
                })

                // $(".artist-cards").html(`${rows.join("")}`.replace(/,/g, ""))
                $(".artist-cards").html(`<center><h2>Search Results</h2></center>${rows.join("")}`)
                $(".artist-cards").fadeIn(1500)


            })
    } else if (searchType === "song") { // Checks to see if the dropdown value is Song and if it is goes to the songs endpoint and displays the data
        apiUrl(searchType, input)
            .then(function (response) {
                $(".artist-cards").fadeOut(1500);
                $(".list-songs-div").fadeOut(1500)

                let trackArray = response.results.trackmatches.track;
                // console.log(response)
                let newTrackArray = [];
                let NumberPerRow = 4;
                let newTrackArrayRow = [];
                trackArray.forEach(function (track, index) {
                    newTrackArray.push(`<div class="card songs-search col-sm-6 col-md-3 col-lg-2"><h4>${track.name}</h4><p>Artist: ${track.artist}<br>Total listens: ${(numberWithCommas(track.listeners))}</p></div>`)
                    if ((index + 1) % NumberPerRow === 0 || (index + 1) === trackArray.length) {
                        newTrackArrayRow.push(`<div class="row">${newTrackArray.join("")}</div>`);
                        newTrackArray.length = 0;
                    }
                })
                // $(".list-songs-div").slideDown("fast");
                $(".song-search-div").html(`<div class="song-search-outer"><h2>Search Results</h2>${newTrackArrayRow.join("")}</div>`);

            })
        $(".song-search-div").fadeIn(1500)
        // Sets the drop down value to a empty string
        dropdownValue = "";
    }
}
// Switch statement that checks to see if the input is album or song, or if they are on the chart's page then its set to chart
function apiUrl(searchType, input) {
    let limit;
    let searchBy;
    switch (searchType) {
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
            console.log("unKnown Input", searchBy);

    }
    // if (input.length === 0) {
    //     console.log("unKnown Input", input)
    //     $(".info-text").html("<h1>Invalid Input</h1>")
    // }
    return (
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": `${baseUrl}/2.0/?method=${searchBy}${input}&api_key=${apiKey}&limit=${limit}&format=json`,
            "method": "GET",

        }))
}

// Gets the song when u click on the album/artist card
function getSongs(album, index) {
    let imageIndex = 2;
    let albumImage = `<img src="${album.image[imageIndex]["#text"]}">`
    // console.log(album.artist)
    if (album.image.length >= 2) {
        if (album.image[imageIndex]["#text"] === "") {
            // console.log("working" album.artist);
            albumImage = `<img class="no-imagesizeing" src="assets/images/no-image-available.png">`
        }
    }
    $.ajax({
        "async": true,
        "crossDomain": true,
        "url": `${baseUrl}/2.0/?method=album.getinfo&api_key=${apiKey}&artist=${album.artist}&album=${album.name}&format=json`,
        "method": "GET",
    }).then(function (data) {
        let arrayOfTracks = data.album.tracks.track;
        // console.log(arrayOfTracks)
        if (arrayOfTracks.length < 1 || arrayOfTracks === undefined) {
            $(`#view-songs${index}`).html(`<p class="mt-1">Sorry no song</p>`)
        }
        let trackArray = [];
        arrayOfTracks.forEach(function (track) {
            // console.log(track)

            $(`#view-songs${index}`).on("click", function () {

                // $("#animation-div").fadeOut(1500);
                $(".artist-cards").fadeOut(1500)
                // $(".search-songs-div").fadeOut(1500)

                trackArray.push(`<div class="card col-sm-6 col-md-4 col-lg-3 ml-auto mr-auto" style="height:100px"><div class="track-name"><h4>${track.name}</h4></div><div class="track-duration"><p>Duration: ${turnSec(track.duration)}</p></div></div>`)
                $(".list-songs-div").html(`<div class="album-songs">${albumImage}<div class="list-songs">${trackArray}</div></<div>`)
                $(".list-songs-div").fadeIn(2000);

            })
        })
        // console.log(data)

    })
}

// Searches the api for the top 100 songs(cause i set it to only give back 100), then turns this response into arrays of 4 items, gives this data to the dataTables
// and displays them nicely on the page for us
function getCharts() {
    let tableRows = [];
    apiUrl("chart")
        .then(function (response) {
            let tracksArray = response.tracks.track;
            // rows = chartRows(tracksArray);
            // console.log(tracksArray[0].name)
            tracksArray.forEach(function (track, index) {
                let dataRow = [];
                let newIndex = index + 1
                let trackName = track.name
                let artistName = track.artist.name
                let playCount = numberWithCommas(track.playcount)
                dataRow.push(newIndex)
                dataRow.push(trackName);
                dataRow.push(artistName);
                dataRow.push(playCount);
                // console.log(dataRow)
                tableRows.push(dataRow)
            })

            // console.log(window.resize);
            // console.log(tableRows)
            buildTable(tableRows)

        })

}

// turns the given intager into seconds
function turnSec(s) {
    var minutes = ("00" + Math.floor((s % 3600) / 60)).slice(-2);
    let seconds = ("00" + (s % 3600) % 60).slice(-2);
    return minutes + ":" + seconds;

}
// divides a digit with a comma eg:3,540,343 = 3,540,343
function numberWithCommas(num) {
    let numParts = num.toString().split(".");
    numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return numParts.join(".");
}
// Builds DataTable 
function buildTable(array) {
    table = $("#chart-table").DataTable({
        data: array,
        lengthChange: false,
        responsive: true,
        autoWidth: false,
        columns: [
            { title: "#", width: "5%" },
            { title: "Name", width: "15%" },
            { title: "Artist", width: "10%" },
            { title: "Play Count", width: "10%" }
        ]
    });
    tableResize(height);
}
// Sets the size of DataTable
function tableResize(height) {
    if (height > 620) {
        table.page.len(25).draw();
    } else {
        table.page.len(10).draw();
    }
}


// function getTableElement(el, value) {

//     let text = value;
//     if (el) {
//         text = el;
//     }
//     let str = `<td>${text}</td>`
//     return str
// }
// function chartHeaders() {
//     let tableHeader = ""
//     let tableNumber = `<th scope="col">Number</th>`,
//         tableSong = `<th scope="col">Song</th>`,
//         tableArtist = `<th scope="col">Artist</th>`,
//         tablePlaycount = `<th scope="col" >Play count</th>`;


//     tableHeader = tableNumber + tableSong + tableArtist + tablePlaycount

//     return `<thead><tr>${tableHeader}</tr></thead>`;
// }
// function chartRows(obj) {
//     let tableRows = [];
//     obj.forEach(function (track, index) {
//         let dataRow = [];

//         let newIndex = (getTableElement(index + 1));
//         let trackName = (getTableElement(track.name));
//         let artistName = (getTableElement(track.artist.name));
//         let playCount = (getTableElement(numberWithCommas(track.playcount)));
//         // str = newIndex + trackName + artistName + playCount
//         dataRow.push(newIndex)
//         dataRow.push(trackName);
//         dataRow.push(artistName);
//         dataRow.push(playCount);

//         // tableRows.push(`<tr>${str}</tr>`);

//         tableRows.push(`<tr >${dataRow.join("")}</tr>`);

//     });

//     let setOfPages = [];
//     // pageButtons(pageSize)
//     //     .then(function (l) {
//     //         console.log(l)
//     //     })
//     // console.log(tableRows.length)
//     // let pageSize = 10;
//     // let totalPages = Math.ceil(tableRows.length / pageSize)
//     // while (setOfPages.length < totalPages) {
//     //     setOfPages.push(tableRows.splice(0, pageSize))
//     // }
//     // console.log(setOfPages)
//     console.log(setOfPages)
//     // return tableRows.join("");
//     // return setOfPages

//     return tableRows
// }



let baseUrl = "https://ws.audioscrobbler.com"
let apiKey = "977e2d82b14fe34163d15b95f2c1ce55"
let dropdownValue;
let submit = document.getElementById('search'),
    myInput = document.getElementById("myInput");
let objJson;

$(document).ready(function () {
    getCharts()
    $(function () {
        if ($("body").is(".chart")) {
            getCharts()
            // buildTable(rows)
            // console.log(getCharts())
        }
    });
    $(function () {
        if ($("body").is(".index")) {
            submit.addEventListener("click", function () {
                GetSelectedValue();
            });
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
                console.log(newTrackArrayRow)

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
            limit = "125"

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
            // console.log(track)
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
    // console.log(el)
    // console.log(text)
    // console.log(value)
    let str = `<td>${text}</td>`
    return str
}
function chartHeaders() {
    let tableHeader = ""
    var tableHeaders = [];
    let tableNumber = `<th scope="col">Number</th>`,
        tableSong = `<th scope="col"> Song Name</th>`,
        tableArtist = `<th scope="col">Artist Name</th>`,
        tablePlaycount = `<th scope="col">Playcount</th>`;


    tableHeader = tableNumber + tableSong + tableArtist + tablePlaycount
    // tableHeaders.push(`<td>Number</td>`)
    // tableHeaders.push(`<td>Song Name</td>`);
    // tableHeaders.push(`<td>Artist Name</td>`);
    // tableHeaders.push(`<td>Playcount</td>`);
    // tableHeaders.push(`<td>Description</td>`);

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

        tableRows.push(`<tr>${dataRow.join("")}</tr>`);

    });

    let setOfPages = [];
    // pageButtons(pageSize)
    //     .then(function (l) {
    //         console.log(l)
    //     })
    // console.log(tableRows.length)
    let pageSize = 10;
    let totalPages = Math.ceil(tableRows.length / pageSize)

    while (setOfPages.length < totalPages) {
        setOfPages.push(tableRows.splice(0, pageSize))
    }
    // console.log(setOfPages)
    console.log(setOfPages)
    // return tableRows.join("");
    return setOfPages
    // console.log(paginate(tableRows))
    // if (tableRows.length === paginate(tableRows)) {
    //     console.log(this)
    // }
    // let test = `
    //     <h1>paginate(100)</h1>
    //     ${JSON.stringify(paginate(tableRows))}
    //     ${(this.name)}

    // `
    // let pagIn = paginate(tableRows)
    // let page = pagIn.setOfPages;
    // console.log((paginate(tableRows)))
    // console.log(page)
    // let finalPage = getButtons(pagIn);
    // console.log(finalPage)

    // document.getElementById("btn_next").addEventListener("click", function () {
    //     if (finalPage < 10) {
    //         finalPage++;
    //         return finalPage
    //         console.log(page[finalPage])
    //         // console.log(obj)

    //     }
    // });
    // document.getElementById("btn_prev").addEventListener("click", function () {
    //     if (finalPage > 0) {
    //         finalPage--;
    //         return finalPage;
    //         console.log(page[finalPage])
    //     }
    // });
    // return page[finalPage].join("")

}

function getCharts() {
    let rows;
    // console.log()
    apiUrl("chart")
        .then(function (response) {
            // let objParsed = JSON.parse(response)
            let tracksArray = response.tracks.track;
            rows = chartRows(tracksArray);
            // buildTable(rows)
            // let buttonClicked = pageButtons(rows.length)
            // console.log(buttonClicked)
            // console.log(rows.length)
            pageButtons(rows.length, rows)
            buildTable(rows, 1)
            console.log(rows)
            // buildTable(rows)
            // console.log(printRow)
            // let table = `<table>${chartHeaders()}${rows}</table>`
            // console.log(rows)
            // $(".top-charts").html(table)
        })

}

function buildTable(rows, page) {
    let header = chartHeaders()
    page = page - 1;
    // console.log(page)
    pageSize = 10;
    let table = `<table>${header}${rows[page].join("")}</table > `
    $(".top-charts").html(table)
    // console.log(page)

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

function pageButtons(pages, rows) {
    rows = rows;
    let value;
    let wrapper = document.getElementById("buttons")
    wrapper.innerHTML = ""
    for (var page = 1; page <= pages; page++) {
        wrapper.innerHTML += `<button value="${page}" class="page btn" > ${page}</button > `
    }

    $(".page").on("click", function () {
        $(".top-charts").empty()
        value = $(this).val()
        // console.log(value)
        buildTable(rows, value)
        console.log(rows)
        // console.log(value)
    })
};




https://jasonwatmore.com/post/2018/08/07/javascript-pure-pagination-logic-in-vanilla-js-typescript

function paginate(totalItems) {


    // console.log(setOfPages)
    // totalItems.forEach(function (item) {
    //     console.log(item)
    //     setOfPages.push(item)
    // })
    let currentPage = 0,
        pageSize = 10,
        maxPages = 10
    // calculate total pages
    let totalPages = Math.ceil(totalItems.length / pageSize);


    let setOfPages = [];
    while (setOfPages.length < totalItems.length) {
        setOfPages.push(totalItems.splice(0, pageSize))
    }
    // console.log(setOfPages)

    // ensure current page isn't out of range
    if (currentPage) {
        currentPage = 0;
    } else if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    let startPage = 1,
        endPage = totalItems / 10;
    if (totalPages <= maxPages) {
        // total pages less than max so show all pages
        startPage = 1;
        endPage = totalPages;
    } else {
        // total pages more than max so calculate start and end pages
        let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
        let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
        if (currentPage <= maxPagesBeforeCurrentPage) {
            // current page near the start
            startPage = 1;
            endPage = maxPages;
        } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
            // current page near the end
            startPage = totalPages - maxPages + 1;
            endPage = totalPages;
        } else {
            // current page somewhere in the middle
            startPage = currentPage - maxPagesBeforeCurrentPage;
            endPage = currentPage + maxPagesAfterCurrentPage;
        }
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    // let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    // return object with all pager properties required by the view
    return {
        totalItems: totalItems,
        currentPage: currentPage,
        pageSize: pageSize,
        totalPages: totalPages,
        startPage: startPage,
        endPage: endPage,
        startIndex: startIndex,
        endIndex: endIndex,
        // pages: pages
        setOfPages: setOfPages
    };
}

// let itemsPerPage;
// function getButtons(obj) {
//     console.log(obj.setOfPages)
//     let currentPage = obj.currentPage - 1;
//     console.log(currentPage)
//     let itemsPerPage = obj.pageSize;
//     // Can be obtained from another source, such as your objJson variable

//     document.getElementById("btn_next").addEventListener("click", function () {
//         if (currentPage < obj.totalPages) {
//             currentPage++;
//             changePage(currentPage);
//             console.log(currentPage)
//             // console.log(obj)
//             // return currentPage;

//         }
//     })
//     document.getElementById("btn_prev").addEventListener("click", function () {
//         if (currentPage) {
//             currentPage--;
//             changePage(currentPage);
//             console.log(currentPage)
//             // return currentPage;
//         }
//     })
//     function changePage(page) {
//         console.log(obj.setOfPages)
//         let btnNext = document.getElementById("btn_next");
//         let btnPrev = document.getElementById("btn_prev");
//         let listing_table = document.getElementById("listingTable");
//         let topCharts = document.getElementById("top-charts");
//         let pageSpan = document.getElementById("page");

//         // Validate page
//         if (page < 1) page = 1;
//         if (page > obj.totalPages) page = pageSize;

//         // listing_table.innerHTML = "";

//         // for (let i = (page - 1) * itemsPerPage; i < (page * itemsPerPage); i++) {
//         //write to document
//         // console.log(i)
//         topCharts.innerHTML += `< table > ${ obj.setOfPages[currentPage].join("") }</table > `;
//         // }
//         pageSpan.innerHTML = page;

//         if (page == 0) {
//             btnPrev.style.visibility = "hidden";
//         } else {
//             btnPrev.style.visibility = "visible";
//         }

//         if (page == obj.totalPages) {
//             btnNext.style.visibility = "hidden";
//         } else {
//             btnNext.style.visibility = "visible";
//         }
//     }




//     console.log(currentPage)
//     return currentPage;


// }


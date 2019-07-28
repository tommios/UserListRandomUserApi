var gend = {
    male: 0,
    female: 0
};

$.ajax({
    url: 'https://randomuser.me/api/?results=150&?nat=us,fr,gb',
    dataType: 'json',
    success: function (data) {
        console.log(data);

        for (let i = 0; i < data.results.length; i++) {
            (data.results[i].gender == 'male') ? gend.male += 1: gend.female += 1;
            createEl(data.results[i]);
            createDetails(data.results[i]);
        }
        console.log(gend.male);
        console.log(gend.female);
        
        //  Плюс/Минус
        $('div.row').on('click', function () {
            if ($(this).find('.circle-plus').hasClass('opened'))
                $(this).find('.circle-plus').toggleClass('opened');
            else {
                $('div').find('.opened').toggleClass('opened');
                $(this).find('.circle-plus').toggleClass('opened');
            };

            let $display = $(this).next().css("display");
            if ($display == 'none') {
                $('div #userDetails').css("display", "none");
                $(this).next().css("display", "flex");
            } else $(this).next().css("display", "none");
        });

        // Рисуем круговую диаграмму (библиотека Chart.js)
        var genderCanvas = document.getElementById("genderChart");
        Chart.defaults.global.defaultFontFamily = "Lato";
        Chart.defaults.global.defaultFontSize = 18;
        var genderData = {
            labels: [
                "Male",
                "Female",
            ],
            datasets: [{
                data: [gend.male, gend.female],
                backgroundColor: [
                    "#e9e3e3",
                    "#bbb"
                ]
            }]
        };

        var pieChart = new Chart(genderCanvas, {
            type: 'pie',
            data: genderData
        });



    }
});

const list = document.getElementById('list');

let rowAllUserData;

// Формирование строки одного пользователя
function createEl(json) {

    rowAllUserData = createHTMLElement({
        tag: 'div',
        classesToAdd: ['all_user_data', 'col-sm-12'],
        id: 'user_data'
    });

    let rowUser = createHTMLElement({
        tag: 'div',
        classesToAdd: ['row', 'user'],
        id: 'user'
    });

    let tdAvatar = createHTMLElement({
        tag: 'div',
        classList: 'col-sm-1',
        inner: "<img src='" + json.picture.thumbnail + "'>"
    });

    let tdLName = createHTMLElement({
        tag: 'div',
        classList: 'col-sm-2',
        inner: ucFirst(json.name.last)
    });

    let tdFName = createHTMLElement({
        tag: 'div',
        classList: 'col-sm-2',
        inner: ucFirst(json.name.first)
    });

    let tdUName = createHTMLElement({
        tag: 'div',
        classList: 'col-sm-2',
        inner: json.login.username
    });

    let tdPhone = createHTMLElement({
        tag: 'div',
        classList: 'col-sm-2',
        inner: json.phone
    });

    let tdLocation = createHTMLElement({
        tag: 'div',
        classList: 'col-sm-2',
        inner: json.location.state
    });

    let tdPlus = createHTMLElement({
        tag: 'div',
        classList: 'col-sm-1',
        id: 'plus'
    });

    let circlePlus = createHTMLElement({
        tag: 'div',
        classesToAdd: ['circle-plus', 'closed']
    });

    let horiz = createHTMLElement({
        tag: 'div',
        classList: 'horizontal'
    });

    let vert = createHTMLElement({
        tag: 'div',
        classList: 'vertical'
    });

    rowUser.appendChild(tdAvatar);
    rowUser.appendChild(tdLName);
    rowUser.appendChild(tdFName);
    rowUser.appendChild(tdUName);
    rowUser.appendChild(tdPhone);
    rowUser.appendChild(tdLocation);

    circlePlus.appendChild(horiz);
    circlePlus.appendChild(vert);
    tdPlus.appendChild(circlePlus);

    rowUser.appendChild(tdPlus);

    rowAllUserData.appendChild(rowUser);

}

// Формирование строки Детально одного пользователя
function createDetails(json) {

    let rowUserDetails = createHTMLElement({
        tag: 'div',
        classList: 'row',
        id: 'userDetails'
    });

    let tdGender = createHTMLElement({
        tag: 'div',
        classList: 'col-sm-4',
        inner: '<p id="name">' + ucFirst(json.name.first) + '</p>' +
            '<p><span>Username</span> ' + json.login.username + '</p>' +
            '<p><span>Registered</span> ' + json.registered.date + '</p>' +
            '<p><span>Email</span> ' + json.email + '</p>'
    });

    let tdAddress = createHTMLElement({
        tag: 'div',
        classList: 'col-sm-3',
        inner: '<p id="name"></p>' +
            '<p><span>Address</span> ' + json.location.street + '</p>' +
            '<p><span>City</span> ' + json.location.city + '</p>' +
            '<p><span>Zip Code</span> ' + json.location.postcode + '</p>'
    });

    let tdCell = createHTMLElement({
        tag: 'div',
        classList: 'col-sm-3',
        inner: '<p id="name"></p>' +
            '<p><span>Birthday</span> ' + json.dob.date + '</p>' +
            '<p><span>Phone</span> ' + json.phone + '</p>' +
            '<p><span>Cell</span> ' + json.cell + '</p>'

    });

    let tdAva = createHTMLElement({
        tag: 'div',
        classList: 'col-sm-2',
        inner: "<img src='" + json.picture.large + "'>"
    });

    rowUserDetails.appendChild(tdGender);
    rowUserDetails.appendChild(tdAddress);
    rowUserDetails.appendChild(tdCell);
    rowUserDetails.appendChild(tdAva);

    rowAllUserData.appendChild(rowUserDetails);

    list.appendChild(rowAllUserData);
}

function createHTMLElement(params) {
    let {
        tag,
        classList,
        classesToAdd,
        id,
        inner
    } = params;

    let elem = document.createElement(tag);

    if (id) elem.id = id;
    if (classList) elem.classList.add(classList);
    if (classesToAdd) elem.classList.add(...classesToAdd);
    if (inner) elem.innerHTML = inner;

    return elem;
}
 
function ucFirst(str) {
    if (!str) return str;
    return str[0].toUpperCase() + str.slice(1);
}
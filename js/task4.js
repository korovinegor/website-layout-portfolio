function msg() {
    // считывание значений
    var length = Number(document.getElementById("length").value);
    var is_mech = document.getElementById("is-mech").checked;

    // расчёт количества землекопов
    var num;
    if (is_mech) {
        num = Math.ceil(length / 4);
    }
    else {
        num = Math.ceil(length / 3);
    }

    // вывод
    var outputHTML = "";
    if (confirm("Показать результат?")) {
        let crew_type = is_mech ? "механизированная" : "без спец. техники";
        let img_name = is_mech ? "digger_mech.png" : "digger_labour.png";

        outputHTML = `
            <div>Длина канавы: ${length}м</div>
            <div>Тип бригады: ${crew_type}</div>
            <div>Кол-во землекопов: ${num}</div>
            <br />
            <img src="media\\${img_name}"></img>
        `;
    }
    else {
        outputHTML = `
            <div>Бригада в отпуске!</div>
            <br />
            <img src="media\\digger_holidays.png"></img>
        `;
    }
    document.getElementsByClassName("wrapper-form")[0].innerHTML = outputHTML;
}
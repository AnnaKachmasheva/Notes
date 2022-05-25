export const months = ['Leden',
                        'Únor',
                        'Březen',
                        'Duben',
                        'Květen',
                        'Červen',
                        'Červenec',
                        'Srpen',
                        'Září',
                        'Říjen',
                        'Listopad',
                        'Prosinec'
];

export const days = ['Pondělí',
                    'Úterý',
                    'Středa',
                    'Čtvrtek',
                    'Pátek',
                    'Sobota',
                    'Neděle'
];

export function getCountWeeksInMonth(year, month) {
    let firstOfMonth = new Date(year, month, 1);
    let day = firstOfMonth.getDay() || 6;
    day = day === 1 ? 0 : day;
    if (day)
        day--
    let diff = 7 - day;
    let lastOfMonth = new Date(year, month + 1, 0);
    let lastDate = lastOfMonth.getDate();
    if (lastOfMonth.getDay() === 1)
        diff--;
    let result = Math.ceil((lastDate - diff) / 7);
    return result + 1;
}

/* Returns the number of the first day of the week of the first day of the month, 1 being Monday */
export function getFirstDayInMonth(year, month) {
    return new Date(year, month, 1).getUTCDay();
}

/* Returns the number of the last day of the week of the first day of the month, 1 being Monday */
export function getLastDayInMonth(year, month) {
    return new Date(year, month + 1, 0).getUTCDay();
}

/* Converts String lines containing notes to format json */
export function convertStringNotes(itemsString) {
    let items = [];
    for (let i = 0; i < itemsString.length; i++) {
        if (itemsString[i] !== '' && itemsString[i] !== null)
            items[i] = JSON.parse(itemsString[i]);
    }
    return items;
}

/* When deleting a note from the local storage, a page reload is provided to receive updated data */
export function removeNote(key, noteToRemove) {
    let notes = localStorage.getItem(key).split(';');
    let note = JSON.stringify(noteToRemove, null, 2);

    for (let i = 0; i < notes.length; i++) {
        if (notes[i] === note)
            notes.splice(i, 1);
    }

    window.location.reload();
    localStorage.setItem(key, notes.join(";"));
}

export const allKeys = Object.keys(localStorage).sort();

/* Get notes from the local storage by key, which is the date of the note. Returns a list Strings. */
export function getListNotes(key) {
    let notesLS = localStorage.getItem(key)
    if (notesLS === null)
        return [];
    let notes = notesLS.split(';');
    return convertStringNotes(notes);
}

export function getCountMonthNotes(date) {
    let number = date.getMonth() + 1;
    let keys = allKeys.filter(key => key.includes(date.getFullYear() + '-' + dayAndMonthToString(number) + '-'));
    return getCountNotes(keys);
}

function getCountNotes(keys) {
    let count = 0;
    for (let key of keys)
        count += getListNotes(key).length;
    return count;
}

export function getCountWeekNotes(date) {
    let firstDayWeek = date.getDate() - date.getDay() + 1;

    let keys = [];
    for (let i = 0; i < 7; i++) {
        keys.push(date.getFullYear() + '-'
            + dayAndMonthToString(date.getMonth() + 1) + '-'
            + dayAndMonthToString(firstDayWeek))
        firstDayWeek++;
    }

    keys = allKeys.filter(function (obj) {
        return keys.indexOf(obj) >= 0;
    })

    return getCountNotes(keys);
}

export function dayAndMonthToString(number) {
    let numberStr;
    if (number.toString().length === 1)
        numberStr = '0' + number;
    else
        numberStr = number;
    return numberStr;
}

export function getCountYearNotes(date) {
    let keys = allKeys.filter(key => key.includes(date.getFullYear() + '-'));
    return getCountNotes(keys);
}

export function getCountDayNotes(date) {
    return getListNotes(date.toJSON().slice(0, 10)).length;
}

export function getCountAllNotes() {
    return getCountNotes(allKeys);
}
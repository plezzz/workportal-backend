//public IEnumerable<PublicHoliday> Get(int year)
//         {
//             var countryCode = CountryCode.BG;
//             var easterSunday = this._orthodoxProvider.EasterSunday(year);
//
//             var items = new List<PublicHoliday>();
//             items.Add(new PublicHoliday(year, 1, 1, "Нова година", "New Year's Day", countryCode, 1967));
//             items.Add(new PublicHoliday(year, 3, 3, "Ден на Освобождението на България от османско робство", "Liberation Day", countryCode));
//             items.Add(new PublicHoliday(easterSunday.AddDays(-2), "Разпети петък", "Good Friday", countryCode));
//             items.Add(new PublicHoliday(easterSunday, "Великден", "Easter Sunday", countryCode));
//             items.Add(new PublicHoliday(easterSunday.AddDays(1), "Велики понеделник", "Easter Monday", countryCode));
//             items.Add(new PublicHoliday(year, 5, 1, "Ден на труда и на международната работническа солидарност", "International Workers' Day", countryCode));
//             items.Add(new PublicHoliday(year, 5, 6, "Гергьовден, ден на храбростта и Българската армия", "Saint George's Day", countryCode));
//             items.Add(new PublicHoliday(year, 5, 24, "Ден на българската просвета и култура и на славянската писменост", "Saints Cyril and Methodius Day", countryCode));
//             items.Add(new PublicHoliday(year, 9, 6, "Ден на Съединението", "Unification Day", countryCode));
//             items.Add(new PublicHoliday(year, 9, 22, "Ден на независимостта на България", "Independence Day", countryCode));
//             items.Add(new PublicHoliday(year, 11, 1, "Ден на народните будители", "National Awakening Day", countryCode));
//             items.Add(new PublicHoliday(year, 12, 24, "Бъдни вечер", "Christmas Eve", countryCode));
//             items.Add(new PublicHoliday(year, 12, 25, "Рождество Христово", "Christmas Day", countryCode));
//             items.Add(new PublicHoliday(year, 12, 26, "Рождество Христово", "St. Stephen's Day", countryCode));
//
//             return items.OrderBy(o => o.Date);
//         }

module.exports = (year) => {
    console.log(year)

    let d = new Date(year,4,19);
    console.log('Дата','m',d.getMonth(),'d',d.getDate())
    let easterSunday = EasterSunday(year);
    let easterSunday2 = computus(year);
    let easterSunday3 = Easter(year);
    console.log('EasterSunday','m',easterSunday.getMonth(),'d',easterSunday.getDate())
    console.log('computus','m',easterSunday2.getMonth(),'d',easterSunday2.getDate())
    console.log('Easter','m',easterSunday3.getMonth(),'d',easterSunday3.getDate())
    return [
        {title: "Нова година", date: new Date(year, 1, 1)},
        {title: "Ден на Освобождението на България от османско робство", date: new Date(year, 3, 3)},
        {title: "Разпети петък", date: new Date(easterSunday.getDate()-2)},
        {title: "Великден", date: easterSunday},
        {title: "Велики понеделник", date: new Date(easterSunday.getDate()+1)},
        {title: "Ден на труда и на международната работническа солидарност", date: new Date(year, 5, 1)},
        {title: "Гергьовден, ден на храбростта и Българската армия", date: new Date(year, 5, 6)},
        {title: "Ден на българската просвета и култура и на славянската писменост", date: new Date(year, 5, 24)},
        {title: "Ден на Съединението", date: new Date(year, 9, 6)},
        {title: "Ден на независимостта на България", date: new Date(year, 9, 22)},
        {title: "Ден на народните будители", date: new Date(year, 11, 1)},
        {title: "Бъдни вечер", date: new Date(year, 12, 24)},
        {title: "Рождество Христово", date: new Date(year, 12, 25)},
        {title: "Рождество Христово", date: new Date(year, 12, 26)}
    ]
}

function EasterSunday(year) {
    let a = year % 19;
    let b = year % 7;
    let c = year % 4;

    let d = (19 * a + 16) % 30;
    let e = (2 * c + 4 * b + 6 * d) % 7;
    let f = (19 * a + 16) % 30;
    let key = f + e + 3;

    let month = (key > 30) ? 5 : 4;
    let day = (key > 30) ? key - 30 : key;
  //  console.log(new Date(year, month, day))
    return new Date(year, month, day);
}

function Easter(Y) {
    var C = Math.floor(Y/100);
    var N = Y - 19*Math.floor(Y/19);
    var K = Math.floor((C - 17)/25);
    var I = C - Math.floor(C/4) - Math.floor((C - K)/3) + 19*N + 15;
    I = I - 30*Math.floor((I/30));
    I = I - Math.floor(I/28)*(1 - Math.floor(I/28)*Math.floor(29/(I + 1))*Math.floor((21 - N)/11));
    var J = Y + Math.floor(Y/4) + I + 2 - C + Math.floor(C/4);
    J = J - 7*Math.floor(J/7);
    var L = I - J;
    var M = 3 + Math.floor((L + 40)/44);
    var D = L + 28 - 31*Math.floor(M/4);

    return new Date(Y,padout(M) , padout(D));
}

function padout(number) { return (number < 10) ? 0 + number : number; }
function computus( y ) {

    var date, a, b, c, m, d;

    // Instantiate the date object.
    date = new Date;

    // Set the timestamp to midnight.
    date.setHours( 0, 0, 0, 0 );

    // Set the year.
    date.setFullYear( y );

    // Find the golden number.
    a = y % 19;

    // Choose which version of the algorithm to use based on the given year.
    b = ( 2200 <= y && y <= 2299 ) ?
        ( ( 11 * a ) + 4 ) % 30 :
        ( ( 11 * a ) + 5 ) % 30;

    // Determine whether or not to compensate for the previous step.
    c = ( ( b === 0 ) || ( b === 1 && a > 10 ) ) ?
        ( b + 1 ) :
        b;

    // Use c first to find the month: April or March.
    m = ( 1 <= c && c <= 19 ) ? 3 : 2;

    // Then use c to find the full moon after the northward equinox.
    d = ( 50 - c ) % 31;

    // Mark the date of that full moon—the "Paschal" full moon.
    date.setMonth( m, d );

    // Count forward the number of days until the following Sunday (Easter).
    date.setMonth( m, d + ( 7 - date.getDay() ) );

    // Gregorian Western Easter Sunday
    return date;

}
`3 а4 май 5`
// Великден 2020г. - 19 4
// Великден 2021г. – 2 5
// Великден 2022г. – 24 4
// Великден 2023г. – 16 4
// Великден 2024г. – 5 5
// Великден 2025г. – 20 4
// Великден 2026г. – 12 4
// Великден 2027г. – 2 5
// Великден 2028г. – 16 4
// Великден 2029г. – 8 4
// Великден 2030г. – 30 4

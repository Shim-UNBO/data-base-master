export function dateFilter(date) {
    date = new Date(date);

    return `${date.getFullYear()}-${fillZero(date.getMonth() + 1)}-${fillZero(
        date.getDate()
    )}`;

    function fillZero(num) {
        return num < 10 ? '0' + num : num;
    }
}

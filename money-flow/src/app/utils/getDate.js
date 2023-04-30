export default function getDate(timestamp) {
    const date = new Date(timestamp).getDate();
    const month = new Date(timestamp).getMonth();
    const year = new Date(timestamp).getFullYear();
    const months = [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь"
    ];
    return `${date}.${months[month]}.${year}`;
}

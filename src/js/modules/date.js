export function getCurrentDateString() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return mm + '-' + dd + '-' + yyyy;
}
export function getCurrentDateStringFormatDefault() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return dd + '.' + mm + '.' + yyyy;
}

export function getTomorrowDay(currentDate) {
    const startDate = new Date(currentDate);
    const day = 60 * 60 * 24 * 1000;
    return new Date(startDate.getTime() + day);
}
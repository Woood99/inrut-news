// Получение хеша в адресе сайта
const getHash = () => {
	if (location.hash) { return location.hash.replace('#', ''); }
}
export default getHash;
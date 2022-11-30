/**
 * выполнение функции с задержкой + обрыв выполнения при повторном запросе
 * @param fn
 * @param delay
 */
export function debounce(func, timeout = 300){
	let timer;
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => { func.apply(this, args); }, timeout);
	};
}
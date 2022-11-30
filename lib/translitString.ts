import CyrillicToTranslit from "cyrillic-to-translit-js";

const cyrillicToTranslit = new CyrillicToTranslit();


export const translitString = (ruString: string) => {
	return cyrillicToTranslit.transform(ruString, '_').toLowerCase();
}
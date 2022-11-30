export const getSubString = (string: string, symCount: number) => {

	if (string.length > symCount){
		return string.slice(0, symCount) + "..."
	}
		return string
}
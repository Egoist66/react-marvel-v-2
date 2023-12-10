export const cutString = (str: string) => {
    if(str.length >= 120){
        return str.slice(0, 120) + '...'
    }
}
export type RandomID = number

export const randomId = () : RandomID => {
    let id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
    return id
}
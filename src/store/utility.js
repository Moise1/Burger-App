export const updateObject = (oldProps, updatedProps) =>{
    return {
        ...oldProps, 
        ...updatedProps
    }
}
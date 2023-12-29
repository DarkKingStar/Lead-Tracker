export const formatDate = (date : Date | undefined) => {
    if(date)
    return date.toLocaleDateString('en-GB');
};
export const formatTime = (date: Date | undefined) =>{
    if(date)
    return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
};
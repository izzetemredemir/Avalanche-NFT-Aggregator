export const epochToReadableDate = (date) => {
    let d = new Date(0);
    d.setUTCSeconds(date);
    return d.getUTCDate()+"/"+(d.getUTCMonth()+1)+"/"+d.getUTCFullYear();
}

export const epochToReadableTime = (date) => {
    let d = new Date(0);
    d.setUTCSeconds(date);
    return d.getHours()+":"+d.getMinutes();
}
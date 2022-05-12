export const timePassed = (data) => {
    const currDate = Date.now()
    const getPassed = currDate - data.createdAt  
    const years = (Math.floor(getPassed / (1000*60*60*24*31*365)))
    const months = (Math.floor(getPassed / (1000*60*60*24*31)))
    const weeks = (Math.floor(getPassed / (1000*60*60*24*7)))
    const days = (Math.floor(getPassed / (1000*60*60*24)))
    const hours = (Math.floor(getPassed / (1000*60*60)))
    const minutes = (Math.floor(getPassed / (1000*60)))
    if(years) return (`${years === 1 ? `${years} year ago` : `${years} years ago`}`)
    else if(months) return (`${months === 1 ? `${months} month ago` : `${months} months ago`}`)
    else if(weeks) return (`${ weeks === 1 ? `${weeks} week ago` : `${weeks} weeks ago`}`)
    else if(days) return (`${ days === 1 ? `${days} day ago` : `${days} days ago`}`)
    else if(hours) return (`${ hours === 1 ? `${hours} hour ago` : `${hours} hours ago`}`)
    else if(minutes) return (`${ minutes === 1 ? `${minutes} minute ago` : `${minutes} minutes ago`}`)
    else return 'a few seconds ago'
}
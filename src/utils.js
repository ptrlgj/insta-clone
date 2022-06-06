export const timePassed = (data) => {
    const SECOND = 1000;
    const MINUTE = 60 * SECOND;
    const HOUR = 60 * MINUTE;
    const DAY = 24 * HOUR;
    const WEEK = 7 * DAY;
    const MONTH = 31 * DAY;
    const YEAR = 365 * DAY;
    const currDate = Date.now()
    const getPassed = currDate - data.createdAt  
    const years = ( Math.floor( getPassed / YEAR ) )
    const months = ( Math.floor( getPassed / MONTH  ) )
    const weeks = ( Math.floor( getPassed / WEEK ) )
    const days = ( Math.floor( getPassed / DAY ) )
    const hours = ( Math.floor( getPassed / HOUR ) )
    const minutes = ( Math.floor( getPassed / MINUTE ) )
    if(years) return ( `${years === 1 ? `${years} year ago` : `${years} years ago`}` )
    else if(months) return ( `${months === 1 ? `${months} month ago` : `${months} months ago`}` )
    else if(weeks) return ( `${ weeks === 1 ? `${weeks} week ago` : `${weeks} weeks ago`}` )
    else if(days) return ( `${ days === 1 ? `${days} day ago` : `${days} days ago`}` )
    else if(hours) return ( `${ hours === 1 ? `${hours} hour ago` : `${hours} hours ago`}` )
    else if(minutes) return ( `${ minutes === 1 ? `${minutes} minute ago` : `${minutes} minutes ago`}` )
    else return 'a few seconds ago'
}

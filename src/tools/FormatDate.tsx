export function formatDate(dateString:Date) {
    const date = new Date(dateString);
  
    // Format date
    const formattedDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
  
    // Format time
    let hours = date.getHours();
    const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    const amPm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 0 to 12
    const formattedTime = `${hours}:${minutes} ${amPm}`;
  
    return `${formattedDate} ${formattedTime}`;
  }
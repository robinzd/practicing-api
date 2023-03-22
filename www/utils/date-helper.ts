import moment from 'moment'
export const GetDate = (request:"in"|"toIndianDate"|"toIndianDateTime"|"toStandardDate"|"toStandardDateTime", date_string:any=null) => {
    let date = new Date()
    if(request == "in"){
        return moment(date).add(5.5, 'hours').toDate()
    }
    else if(request == "toIndianDate"){
        if(date_string || typeof(date_string) == "string" || Date.parse(date_string) != NaN){
            let date = moment(date_string).add(-5.5, 'hours').toDate()
            let dd = String(date.getDate()).padStart(2, '0')
            let mm = String(date.getMonth() + 1).padStart(2, '0')
            let yyyy = String(date.getFullYear())
            return dd+"-"+mm+"-"+yyyy
        }
    }
    else if(request == "toIndianDateTime"){
        if(date_string || typeof(date_string) == "string" || Date.parse(date_string) != NaN){
            let date = moment(date_string).add(-5.5, 'hours').toDate()
            let dd = String(date.getDate()).padStart(2, '0')
            let mm = String(date.getMonth() + 1).padStart(2, '0')
            let yyyy = String(date.getFullYear())
            let hours = String(date.getHours()>12 ? date.getHours()-12 : date.getHours()).padStart(2, '0');
            let minutes = String(date.getMinutes()).padStart(2, '0');
            let ampm = date.getHours() >= 12 ? 'pm' : 'am';
            let time = " "+hours+":"+minutes+" "+ampm;
            return dd+"-"+mm+"-"+yyyy+time
        }
    }
    else if(request == "toStandardDate"){
        if(date_string || typeof(date_string) == "string" || Date.parse(date_string) != NaN){
            let date = moment(date_string).add(-5.5, 'hours').toDate()
            let dd = String(date.getDate()).padStart(2, '0')
            let mm = String(date.getMonth() + 1).padStart(2, '0')
            let yyyy = String(date.getFullYear())
            return yyyy+"-"+mm+"-"+dd
        }
    }
    else if(request == "toStandardDateTime"){
        if(date_string || typeof(date_string) == "string" || Date.parse(date_string) != NaN){
            let date = moment(date_string).add(-5.5, 'hours').toDate()
            let dd = String(date.getDate()).padStart(2, '0')
            let mm = String(date.getMonth() + 1).padStart(2, '0')
            let yyyy = String(date.getFullYear())
            let hours = String(date.getHours()>12 ? date.getHours()-12 : date.getHours()).padStart(2, '0');
            let minutes = String(date.getMinutes()).padStart(2, '0');
            let seconds = date.getSeconds();
            return yyyy+"-"+mm+"-"+dd+" "+hours+":"+minutes+":"+seconds
        }
    }
}
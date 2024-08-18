function htmlEncode(input) {
    return input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function ValidNotification(notification){
    if(notification.name === ""){
        document.getElementById('name').focus();
        return false;
    }
    if(notification.message === ""){
        document.getElementById('messageId').focus();
        return false;
    }
    const emailRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    if(notification.from === "" || !emailRegex.test(notification.from) ){
        document.getElementById('fromEmail').focus();
        return false;
    }
    return true;
}

async function postNotification(notification) {
    
    let serviceId = 'service_nvfsdog';
    let templateId = 'template_deslb6d';
    /
    let responseData = await emailjs.send(serviceId,templateId, notification);
    if(responseData.status !== 200) {
        console.log(responseData.status);
        alert('Something Went wrong');
        return
    }
    *
    alert('Email Sent Thank You');
}
let notificationButtonId = document.getElementById('notificationButtonId');

if(notificationButtonId){
    notificationButtonId.addEventListener('click',function(event){
        
        let fromName = document.getElementById('name').value;
        let fromEmail = document.getElementById('fromEmail').value;
        let message = document.getElementById('messageId').value;
        let subject = document.getElementById('subjectId').value;
        const notification = {
            name: htmlEncode(fromName),
            from: htmlEncode(fromEmail),
            reply_to: htmlEncode(fromEmail),
            message: htmlEncode(message),
            subject: htmlEncode(subject)
        }
        if(!ValidNotification(notification)){
            return;
        }
        postNotification(notification)
    });
}


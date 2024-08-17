let notificationButtonId = document.getElementById('notificationButtonId');

if(notificationButtonId){
    notificationButtonId.addEventListener('click',function(event){
        event.preventDefault();
        let fromName = document.getElementById('name').value;
        let fromEmail = document.getElementById('fromEmail').value;
        let message = document.getElementById('messageId').value;
        let subject = document.getElementById('subjectId').value;
        const notification = {
            name: fromName,
            from: fromEmail,
            reply_to: fromEmail,
            message: message,
            subject: subject
        }
        postNotification(notification)
    });
}
async function postNotification(notification) {
    let serviceId = 'service_nvfsdog';
    let templateId = 'template_deslb6d';
    let responseData = await emailjs.send(serviceId,templateId, notification);
    if(responseData.status !== 200) {
        console.log(responseData.status);
        alert('Something Went wrong');
        return
    }
    alert('Email Sent Thank You');
}
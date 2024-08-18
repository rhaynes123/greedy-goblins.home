function htmlEncode(input) {
    return input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}
function clearFormGroupFields() {
  // Select all elements with class 'form-group'
  const formGroups = document.querySelectorAll('.form-group');
  
  // Iterate through each form-group
  formGroups.forEach(group => {
    // Find input elements within the form-group
    const inputs = group.querySelectorAll('input[type="text"], input[type="email"], textarea');
    
    // Clear the value of each input
    inputs.forEach(input => {
      input.value = '';
    });
  });
  document.getElementById('notificationButtonId').setAttribute("disabled", true);
}



async function postNotification(notification) {
    document.getElementById('emailFailed').setAttribute("hidden", true);
    document.getElementById('emailSent').setAttribute("hidden", true);
    
    let serviceId = 'service_nvfsdog';
    let templateId = 'template_deslb6d';
    
    let responseData = await emailjs.send(serviceId,templateId, notification);
    if(responseData.status !== 200) {
        console.log(responseData.status);
        document.getElementById('emailFailed').removeAttribute("hidden");
        return
    }
    
    document.getElementById('emailSent').removeAttribute("hidden");
    clearFormGroupFields();
}

let formDocument = document.getElementById('notificationForm');
if(formDocument){
    formDocument.addEventListener('keyup', function(event) {
        var isValid = () => {
            const emailRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
            let email = document.getElementById('fromEmail').value
            return document.getElementById('name').value !== ""
                && email !== ""
                && document.getElementById('messageId').value !== ""
                && emailRegex.test(email);
        }
        if(isValid) {
            document.getElementById('notificationButtonId').removeAttribute("disabled");
        }
    });
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
       
        postNotification(notification)
        
    });
}


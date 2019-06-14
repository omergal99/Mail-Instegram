import utilService from '../../../services/util-service.js'
import storageService from '../../../services/storage-service.js'

export default {
    getMails,
    addMail,
    deletedMail,
    getMailById,
    changeReadMarkService,
    saveMail,
    changeSentMarkService
}

var gMails = [];
var MAILS_KEY = 'mails of honor'


function saveMail(UpdateMail){
    var mailIdx = gMails.findIndex(mail => UpdateMail.id === mail.id);
    // gMails.splice(mailIdx, 1, UpdateMail);
    // console.log(gMails[mailIdx])
    // gMails.unshift(gMails[mailIdx]);
    storageService.store(MAILS_KEY, gMails);
}

function addMail(newMail) {
    var mail = _createMail(newMail)
    gMails.push(mail);
    storageService.store(MAILS_KEY, gMails);
    return Promise.resolve(gMails);
}

function getMails() {
    var tempgMails = storageService.load(MAILS_KEY);
    if (tempgMails && tempgMails.length) {
        gMails = tempgMails;
    } else {
        _createMails();
    }
    storageService.store(MAILS_KEY, gMails);
    return Promise.resolve(gMails);
}

function getMailById(mailId) {
    getMails();
    var mail = gMails.find((mail) => {
        return mailId === mail.id
    })
    return Promise.resolve(mail)
}

function _createMails() {
    gMails = storageService.load(MAILS_KEY);
    if (gMails && gMails.length) return;

    var mails = []
    mails.push(_createMail({ 
        subject: 'Your free trial is over',
        sentTo: 'Omer@misterBit.com',
        sentFrom: 'hello@avocode.com',
        body: `Your Avocode free trial is over. The free trial for Itamar Ben-David's team has ended. But don't worry, your designs are still safe and you can easily come back. Just log in and purchase a subscription.`,
        isRead: false,
        sentAt: new Date().toLocaleString(),
        date: Date.now(),
     }))
    mails.push(_createMail({ 
        subject: 'Wassap with Vue?',
        sentTo: 'Omer@misterBit.co.il',
        sentFrom: 'yaronv@misterBit.co.il',
        body: '',
        isRead: false,
        sentAt: new Date().toLocaleString(),
        date: Date.now(),
     }))
    mails.push(_createMail({ 
        subject: 'How to Keep Learning Vue after the Free Weekend 🎁',
        sentTo: 'Omer@misterBit.com',
        sentFrom: 'team@vuemastery.com',
        body: `Don't Stop Learning
        We hope you've had a chance to try some of our content during our free weekend!  However, your learning doesn't have to end here, and we hope you see the value in becoming a subscriber.
        
        For the next 48 hours, enjoy 30% off an annual subscription exclusive to participants of our free weekend. Use code WEEKEND30 at checkout to redeem this offer!  
        
        $33 of your membership goes to support Vue.js itself.`,
        isRead: false,
        sentAt: new Date().toLocaleString(),
        date: Date.now(),
     }))
     mails.push(_createMail({ 
        subject: 'solutions for day 33',
        sentTo: 'Omer@misterBit.co.il',
        sentFrom: 'hagar@misterBit.co.il',
        body: '',
        isRead: false,
        sentAt: new Date().toLocaleString(),
        date: Date.now(),
     }))
     mails.push(_createMail({ 
        subject: 'Windows lisence',
        sentTo: 'Omer@misterBit.co.il',
        sentFrom: 'support@microsoft.com',
        body: '',
        isRead: false,
        sentAt: new Date().toLocaleString(),
        date: Date.now(),
     }))
     mails.push(_createMail({ 
        subject: 'חשבונית חודשית HOT net‎',
        sentTo: 'Omer@misterBit.co.il',
        sentFrom: 'HOTnet@printernet.co.il',
        body: '',
        isRead: false,
        sentAt: new Date().toLocaleString(),
        date: Date.now(),
     }))
     mails.push(_createMail({ 
        subject: '[GitHub] Please verify your email address.‎',
        sentTo: 'Omer@misterBit.co.il',
        sentFrom: 'noreply@github.com',
        body: '',
        isRead: false,
        sentAt: new Date().toLocaleString(),
        date: Date.now(),
     }))

    storageService.store(MAILS_KEY, mails);
    gMails = mails;
}

function _createMail(newMail) {
    var uniqueId = utilService.sureUniqueId(gMails);
    if (newMail.subject === '') newMail.subject = 'Empty subject'
    return {
        id: uniqueId,
        sentTo: newMail.sentTo,
        sentFrom: newMail.sentFrom,
        subject: newMail.subject,
        body: newMail.body,
        isRead: false,
        sentAt: new Date().toLocaleString(),
        date: Date.now(),
        isSent: false
    }
}

function deletedMail(mailId) {
    // console.log('on delete', mailId)
    var mailIdx = gMails.findIndex(mail => mailId === mail.id)
    gMails.splice(mailIdx, 1)
    storageService.store(MAILS_KEY, gMails)
    return Promise.resolve()
}

function changeReadMarkService(currMail) {
    // console.log('mail from service is:',currMail)
    var mail = gMails.find((mail) => currMail.id === mail.id )
    mail.isRead = currMail.isRead;
    storageService.store(MAILS_KEY, gMails)
}

function changeSentMarkService(currMail) {
    // console.log('change sent mark', currMail)
    var mail = gMails.find((mail) => currMail.id === mail.id )
    mail.isSent = currMail.isSent;
    storageService.store(MAILS_KEY, gMails)
}
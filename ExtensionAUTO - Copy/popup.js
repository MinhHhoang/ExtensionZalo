let api_key_value = document.getElementById('api_key_value')
let btnAdd = document.getElementById('btnAdd')

let btnStop = document.getElementById('btnStop')
let btnStart = document.getElementById('btnStart')


let phoneList = document.getElementById('phoneList')
let message_field = document.getElementById('message')



btnStart.addEventListener('click', setAction)
btnStop.addEventListener('click', setActionStop)
btnAdd.addEventListener('click', setActionGetKey)

chrome.storage.sync.get(['key', 'phones', 'message'], function (obj) {
  api_key_value.value = obj.key ? obj.key : ''
  phoneList.value = obj.phones ? obj.phones : ''
  message_field.value = obj.message ? obj.message : ''
});



function setAction() {
  let key = api_key_value.value.trim()
  let phones = phoneList.value.trim()
  let message = message_field.value
  if (phones.length < 10 || message.length < 1) {
    alert('Làm ơn nhập đầy đủ thông tin')
    return;
  }

  const payload = {
    key: key,
    phones: phones,
    message: message,
  }
  chrome.storage.sync.set(payload);

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (!tabs[0].url.includes('https://chat.zalo.me/')) {
      alert('please go to https://chat.zalo.me/')
      return
    }
    const payload = {
      key, phones, message
    }
    chrome.tabs.sendMessage(tabs[0].id, payload);
  });
}

function setActionStop() {

}

function setActionGetKey() {

}
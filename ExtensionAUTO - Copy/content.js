
chrome.runtime.onMessage.addListener(gotMessage)
function gotMessage(object, sender, sendResponse) {

  const listPhone = object.phones;
  const message_send = object.message;


  // Split the string by semicolon
  const phoneNumbers = listPhone.split(";");
  checkPhoneNumbers(phoneNumbers, message_send);

}


async function checkPhoneNumbers(phoneNumbers, message_send) {
  for (let i = 0; i < phoneNumbers.length; i++) {
    await processPhoneNumber(phoneNumbers[i], message_send);
  }
}

async function processPhoneNumber(phoneNumber, message_send) {
  const nameInput = document.getElementById('contact-search-input');
  if (nameInput) {
    nameInput.value = phoneNumber;
    nameInput.dispatchEvent(new Event("input", { bubbles: true }));

    // Wait for input to be processed
    await delay(2000);

    const element = [...document.querySelectorAll('span')].find(el => el.textContent.includes('Số điện thoại chưa đăng ký tài khoản hoặc không cho phép tìm kiếm.'));
    if (element) {
      console.log("Số điện thoại này chưa đăng ký");
    } else {
      const friendItem = document.querySelector('.flx.conv-item__avatar.grd-ava.lv-2.grid-item');
      if (friendItem) {
        friendItem.click();
        
        // Wait for click action to be processed
        await delay(500);
        
        const addFriendButton = [...document.querySelectorAll('.truncate')].find(el => el.textContent.trim() === 'Gửi kết bạn');
        if (addFriendButton) {
          addFriendButton.click();
          
          // Wait for the add friend action to be processed
          await delay(500);
          
          const messageToFriend = document.querySelector('textarea.friend-profile__addfriend__msg');
          if (messageToFriend) {
            messageToFriend.value = message_send;
            
            // Wait for message input to be processed
            await delay(500);
            
            const btnAdd = [...document.querySelectorAll('.truncate')].find(el => el.textContent.trim() === 'Kết bạn');
            if (btnAdd) {
              btnAdd.click();
            }
          }
        }
      }
    }
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Usage
checkPhoneNumbers(phoneNumbers);


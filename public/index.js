// const allCharacters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
// "/"];
const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const symbols = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];

function getPasswordConfiguration() {
    const passwordLength = document.getElementById('passwordLength').value;
    const allowNumbers = document.getElementById('allowNumbers').checked;
    const allowSymbols = document.getElementById('allowSymbols').checked;
    
    return { passwordLength, allowNumbers, allowSymbols };
}

async function copyToClipboard(copyValue) {
  try {
    await navigator.clipboard.writeText(copyValue);
    alert('Password copied to clipboard!');
  } catch (err) {
    alert('Unable to copy: ', err);
  }
}

function buildGeneratedPasswords(passwords) {
    let outHTML = '';
    passwords.forEach(password => {
       outHTML+= `
        <div class="basis-1/2 flex">
          <button onclick="copyToClipboard('${password}')" class="w-full m-1! cursor-pointer! flex justify-center py-2 bg-slate-700 rounded-sm text-emerald-300"><input class="text-center  cursor-pointer!" type="text" value="${password}" id="${password}" disabled/><i class="fa-solid fa-copy"></i></button>
        </div>
       ` 
    });
    document.getElementById('generatedPassword').innerHTML = outHTML;
}

function generatePasswords(passwordsToGenerate = 4) {
    const { allowSymbols, allowNumbers, passwordLength } = getPasswordConfiguration();
    if (Number(passwordLength) < 0) {
        passwordLength = 15; // brute force default if provided invalid password length
    }
    const allowedCharacters = [...characters, ...(allowNumbers ? numbers : []), ...(allowSymbols ? symbols : []) ];
    const generatedPasswords = [];
    while(passwordsToGenerate--) {
        let charactersToAdd = passwordLength;
        const generatedPassword = [];
        while(charactersToAdd--) generatedPassword.push(allowedCharacters[Math.floor(Math.random() * allowedCharacters.length)]);
        generatedPasswords.push(generatedPassword.join(''));
    }
    
    return buildGeneratedPasswords(generatedPasswords);
}

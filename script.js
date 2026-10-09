let btn=document.querySelector("#btn")
let content=document.querySelector("#content")
let voice=document.querySelector("#voice")
// btn and content ko select kiye 

// jarvis se kaise bulwaye :
function speak(text){
    let text_speak = new SpeechSynthesisUtterance(text)  //Jo text humne diya hai, usko speech/voice mein convert karne ke liye ek speech object banata hai aur text_speak mein store karta hai
    text_speak.rate=1
    text_speak.pitch=1
    text_speak.volume=1
    text_speak.lang="hi-GB" // isse mene lang change kr diye girls ki voice ayegi
    window.speechSynthesis.speak(text_speak)  // text_speak mein jo text hai, browser usko voice mein bolna start karta hai
}

 // ye humne wish krne ke liye banaye hai:
function wishMe(){
    let day = new Date()   // JavaScript mein current date aur time lene ke liye use hoti hai
    let hours = day.getHours()    // "Day/time object se current hour nikalo aur hours variable mein store karo.
    if(hours > 0 && hours < 12){  // &&: dono cond true honi chaiye
        // speak("Good morning sir")
    }
    else if(hours >= 12 && hours < 16){  // Agar hours 12 ya usse zyada hai AND 16 se kam hai, to ye condition chalegi
        speak("Good afternoon Sir")
    }else{
        speak("Good Evening Sir")
    }
}
window.addEventListener('load', ()=>{ // jab bhi window load hogi jarvis time ke acc wish karega
    wishMe()        
})


// Speech recognition:
let speechRecog = window.SpeechRecognition || window.webkitSpeechRecognition  // Browser ka jo speech recognition support karta hai, usko speechRecog mein store karta hai.
let recognition = new speechRecog()  // Speech recognition ka object banata hai, jisse hum voice sunenge
recognition.onresult = (event) => {  // Jab user ki voice successfully recognize ho jaati hai, ye function chalega
    let currentIndex = event.resultIndex  //Current voice result ka index leta hai
    let transcript = event.results[currentIndex][0].transcript  //User ne jo bola hai, usko text mein convert karke transcript mein rakhta hai
    content.innerText = transcript //Jo user ne bola, woh screen par dikhaata hai
    takeCommand(transcript.toLowerCase())  //Jo text mila hai, usko takeCommand() function mein bhej deta hai, taaki Jarvis us command par action le sake
}

btn.addEventListener("click",()=>{  //Jab button click hoga, Jarvis user ki voice sunna start karega. 
    recognition.start()    
    btn.style.display = "none"
    voice.style.display = "block"  // btn ko hide karo aur voice ko show karo.
})


// ab ise intelligent banate hai
function takeCommand(message){
    btn.style.display = "flex"
    voice.style.display = "none"

    if(message.includes("hello")||message.includes("hey")){
        speak("hello sir,what can i help you?")
    }
    else if(message.includes("who are you")){
       speak("i am virtual assistance , created by Sarwar sir")
    }else if(message.includes("open youtube")){
        speak("opening youtube...")
        window.open("https://www.youtube.com","_blank")
    }
    else if(message.includes("open google")){
        speak("opening google...")
        window.open("https://www.google.com","_blank")
    }
    else if(message.includes("open whatsapp")){
    speak("opening whatsapp...")
    window.open("https://www.whatsapp.com","_blank")
    }
    else if(message.includes("open calculator")){
    speak("opening calculator...")
    window.open("calculator://")
    }
    else if(message.includes("time")){
     let time = new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"})
     speak(time)
    }
    else if(message.includes("date")){
     let date = new Date().toLocaleString(undefined,{day:"numeric",month:"short"})
     speak(date)
    }



    else{
        let finalText = "this is what i found on internet regarding" + message.replace("jarvis","")|| message.replace("jarvis","")
        speak(finalText)
        window.open(`https://www.google.com/search?q=${message.replace("jarvis","")}`,"_blank")
    }                                  
    
}













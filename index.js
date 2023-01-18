$(document).ready(function () {
  if ('speechSynthesis' in window) {
    console.log("Web Speech API supported!")
  } else {
    console.log("Web Speech API not supported :-(")
  }

  console.log('working')

  var voiceSelect = document.querySelector('select')
  var synth = window.speechSynthesis

  let voices = [];
  function populateVoiceList(utterThis) {
    voices = synth.getVoices();
    console.log(voices)
    
    
    for (let i = 0; i < voices.length; i++) {
      const option = document.createElement('option');
      option.textContent = `${voices[i].name} (${voices[i].lang})`;
        console.log(voices[i].name)
      if (voices[i].default) {
        option.textContent += ' — DEFAULT';
      }
      option.setAttribute('data-lang', voices[i].lang);
      option.setAttribute('data-name', voices[i].name);
      voiceSelect.appendChild(option);

      utterThis.voice = voices[i];
      //           console.log(utterThis.voice)
      // console.log(option)
      // speechToText()

    }


  }

  populateVoiceList();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

  


  $("#text-to-speech").change(function () {
    var text = $(this).val()
    populateVoiceList(text)
    Charactercounter(text)
    speechToText(text)
  VRP()

  });



  // var utterThis = new SpeechSynthesisUtterance()
  function speechToText(text) {
    var utterThis = new SpeechSynthesisUtterance(text)
    console.log(utterThis.pitch = -2)
    populateVoiceList(utterThis)
    // console.log(utterThis.voice = -2)
VRP(utterThis)
// console.log(text)
    $('#voices').on('change',function() {
      var option = $(this).find('option:selected');
      var value = option.val();
      // console.log(value)

//   for (let i = 0; i < voices.length ; i++) {
//       console.log(voices[i].name)
//           // console.log(value)
//       if ( value = voices[i].name  ) {
//         utterThis.voice = voices[i];
//           console.log(utterThis.voice)

//   }
// }
     
  })
console.log(utterThis)
    synth.speak(utterThis)
  }


  function VRP(utterThis){

    $('#pitch').change(function(){
    
      var value = parseInt($(this).val())
      
      utterThis.pitch = value;
      console.log(value)
    
    })
  }
  // const synth = window.speechSynthesis;

  

  function Charactercounter(text) {

    var charLength = text.length;

    var spacesCount = 0;
    for (i = 1; i < text.length; i++) {
      if (text.charAt(i) == " ") {
        spacesCount++;
        console.log(spacesCount)
      }

    }
    var wordsArray = text.split(" ");
    var totalWordLen = 0;
    for (j = 0; j < wordsArray.length; j++) {
      totalWordLen = totalWordLen + wordsArray[j].length;

    }
    var wordCount = spacesCount + 1;
    var average = totalWordLen / wordsArray.length;
    var outputString = "Characters: " + charLength + " Words: " + wordCount + " Spaces: " + spacesCount + " Average: " + average;
    // alert(outputString)
    // console.log(totalWordLen);


  }

})
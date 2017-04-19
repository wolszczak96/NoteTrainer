let itemData;
$.getJSON('data/itemdata.json', (response) => {
  itemData = JSON.stringify(response);
  newNote();
});

// some global variables:
let midiNote; // midi value of current note
let answerText = ''; // human-readable definition of current note
let clefChoice = undefined; // user clef choice (undefined allows random)
let maxKeySign = 6; // user choice of max number of key signs
let accidentalsOption = true; // user choice of allowing accidentals
let keysBlock = false; // block events on keyboard

const newNote = () => {
  $('#staff').empty(); // clear staff from previous signs etc
  const signs = ['dblflat', 'flat', 'natural', 'sharp', 'dblsharp']; // all human-readable signs
  const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B']; // all human-readable notes
  const midiHalfsteps = [24, 26, 28, 29, 31, 33, 35]; // midi values of notes above (octave contra)
  const key = randomBetween(-maxKeySign, maxKeySign); // randomize key (0 = C-major; -1 = F-major; 1 = G-major etc)
  const modIndexes = addKeySign(key); // add key sign and get indexes of all modified notes
  const xPos = Math.abs(key) + 3; // x-index for adding a note after key signs
  const clef = clefChoice === undefined ? randomBetween(0, 1) : clefChoice; // 0 - violin; 1 - bass
  const index = clef === 1 ? randomBetween(-12, 1) : randomBetween(-1, 12); // random note-index in treble or bass clef
  const modifier = accidentalsOption ? randomBetween(-1, 1) : 0; // randomize accidental (-1 = lower; 1=higher)
  midiNote = midiHalfsteps[(index+21)%7] + 12*Math.floor((index+21)/7) + modifier; // compute current note' midi value

  // check if current note has to be altered
  if(modIndexes.includes((index+21)%7)) {
    // if so, choose proper sign and alter midi value
    var sign = key < 0 ? signs[1 + modifier] : signs[3 + modifier];
    key < 0 ? midiNote-- : midiNote++;
  }
  // else choose sign based only on accidental
  else var sign = signs[2 + modifier];

  // check if current note has accidental
  // if so, add note with sign
  if(modifier !== 0) addComponent('note', clef, xPos, index, sign);
  // else add note without sign
  else addComponent('note', clef, xPos, index);

  const octaves = ['contra', 'great', 'small', '1line', '2line', '3line']; // human-readable octaves
  const octave = octaves[Math.floor((index+21)/7)]; //compute current note' octave
  answerText = `${notes[(index+21)%7]} ${sign} ${octave}`; // update note definition in form: 'C sharp contra' (note sign octave)
}

const addLines = (clef, currentX, index, sign) => {
  let quantity; // number of additional lines
  let start; // starting index (first additional line)
  let dir; // direction for showing additional lines (-1 - down; 1 - up)
  // for treble clef:
  if(clef === 0) {
    // if current note is above the staff:
    if(index >= 12) {
      quantity = Math.floor((index - 10)/2); // compute how many additional lines do we need
      start = 12;
      dir = 1;
    }
    // if current note is below the staff:
    else if(index <= 0) {
      quantity = Math.floor((Math.abs(index) + 2)/2); // compute how many additional lines do we need
      start = 0; // set first additional line index;
      dir = -1; // set direction
    }
  }
  // for bass clef:
  else {
    // if current note is above the staff:
    if(index >= 0) {
      quantity = Math.floor((index + 2)/2); // compute how many additional lines do we need
      start = 0; // set first additional line index;
      dir = 1; // set direction
    }
    // if current note is below the staff:
    else if(index <= -12) {
      quantity = Math.floor((Math.abs(index) - 10)/2); // compute how many additional lines do we need
      start = -12; // set first additional line index;
      dir = -1; // set direction
    }
  }
  // create additional lines:
  for(let i=0; i<quantity; i++) {
    addComponent('line', clef, currentX-1, start+dir*i*2);
    // if current note has an accidental:
    if(sign) {
      const leftPadding = JSON.parse(itemData)[sign].width; // get accidental' width
      $('#staff div:last-child').css('padding-left', leftPadding); // add padding to the additional line
    }
  }
}

const addComponent = (id, clef, xIndex, yIndex, sign) => {
  const posX0 = 140; // position of x-index = 0 in pixels;
  let posY0;
  clef === 0 ? posY0 = 170 : posY0 = 270; // set position of y-index = 0 depending on clef
  const newItemData = JSON.parse(itemData)[id]; // get new component data
  // staff grid has 20px*10px cells
  newItemData.left = posX0 + xIndex * 20 + 'px'; // set x-position in pixels depending on x-index
  newItemData.top = posY0 - yIndex * 10 + 'px'; // set y-position in pixeld depending on y-index
  // create new component
  const handlebar = Handlebars.compile($('#component-template').html());
  $('#staff').append(handlebar(newItemData));
  // if new component (note) has accidental
  if(sign) {
    // prepend accidental image before fresh created component (last-child)
    const newItemData = JSON.parse(itemData)[sign];
    const handlebar = Handlebars.compile($('#sign-template').html());
    $('#staff div:last-child').prepend(handlebar(newItemData));
  }
  // if component is note, create additional lines if needed
  if(id === 'note') addLines(clef, xIndex, yIndex, sign);
}

const addKeySign = (key) => {
  // for flat keys:
  if(key < 0) {
    var sign = 'flat'; // set accidental sign
    var index = 6; // set first key sign' index (Bb)
    var jump = 3; // 3 steps up, which is the same as 4 steps down (perfect fifth down)
    var min = 3; // set minimum index of key signs (Fb)
  }
  // for sharp keys
  else {
    var sign = 'sharp'; // set accidental sign
    var index = 3; // set first key sign' index (F#)
    var jump = 4; // 4 steps up (perfect fifth up)
    var min = 5; // set minimum index of key signs (B#)
  }
  const keyData = []; // array holding indexes of all notes modified by key sign
  // create all key signs in both clefs
  for(var i=0; i<Math.abs(key); i++) {
    addComponent(sign, 0, i, index%7<min ? index%7+7 : index%7); // add key sign in treble clef in first octave above minimum index
    addComponent(sign, 1, i, index%7<min ? index%7+7-14 : index%7-14); // add key sign in bass clef in first octave above minimum index
    keyData.push(index%7); // push index of note modified by this key sign
    index += jump; // jump to the next index
  }
  return keyData; // return indexes of all notes modified by key sign
}

const randomBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min; // generate random integer between min and max values (both included)
}

const showKeyboard = () => {
  let index = 0; // current white key index
  // create white keys between 29 and 95 midi values
  for(let i=29; i<=95; i++) {
    const handlebar = Handlebars.compile($('#keywhite').html());
    $('#keyboard').append(handlebar({number: i, pos: 1+index*20+'px'}));
    // if current key is neither E or B, jump one additional midi note up
    if(i%12 !== 4 && i%12 !== 11) i+=1;
    index++; // go to the next index
  }
  //black keys
  let position = 13; // x-position of first black key in pixels
  // create black keys between 30 and 94 midi values
  for(let i=30; i<=94; i+=2) {
    const handlebar = Handlebars.compile($('#keyblack').html());
    $('#keyboard').append(handlebar({number: i, pos: position+'px'}));
    // if current key is D# or A#:
    if(i%12 === 3 || i%12 === 10){
      i++; // jump one additional midi note up
      position+=15; // increase x-position for the next key
    }
    position+=22; // regular x-position increase for the next key
  }
  // add event listeners
  $('.key img').on('mouseenter', activateKey);
  $('.key img').on('mouseleave', deactivateKey);
}

const activateKey = (e, selector) => {
  // if keyboard is blocked, don't do anything
  if(keysBlock) return;
  // if e is event, target is e.target, else target is jQuery <img> element passed in variable e
  const target = e.target ? $(e.target) : e;
  // if we are on the white key:
  if(/white/.test(target.attr('src'))) {
    // if there is an activating selector ('correct' or 'wrong')
    if(selector) target.attr('src', `media/keywhite${selector}.png`);
    else target.attr('src', 'media/keywhiteactive.png');
  }
  else if(/black/.test(target.attr('src'))) {
    if(selector) target.attr('src', `media/keyblack${selector}.png`);
    else target.attr('src', 'media/keyblackactive.png');
  }
}

const deactivateKey = (e) => {
  if(keysBlock) return;
  const target = e.target ? $(e.target) : e;
  if(/white/.test(target.attr('src'))) {
    target.attr('src', 'media/keywhite.png');
  }
  else if(/black/.test(target.attr('src'))) {
    target.attr('src', 'media/keyblack.png');
  }
}

const chooseClef = (e, clef) => {
  if($(e.target).hasClass('clef-chosen')) return;
  $('.clef-chosen').removeClass('clef-chosen');
  $(e.target).addClass('clef-chosen');
  clefChoice = clef;
  resetScore();
  newNote();
}

const setMaxKeySign = () => {
  maxKeySign = $('#key-sign').val();
  resetScore();
  newNote();
}

const answer = (number) => {
  if(keysBlock) return;
  userAnswer = number;
  if(midiNote === userAnswer) {
    const newscore = parseInt($('#score-good').text())+1;
    $('#score-good').text(newscore);
    newNote();
  }
  else {
    const newscore = parseInt($('#score-bad').text())+1;
    $('#score-bad').text(newscore);
    $('#controls').addClass('hidden');
    const handlebar = Handlebars.compile($('#bad-choice-template').html());
    $('#control').append(handlebar({answer: answerText}));
    activateKey($(`#key${userAnswer} img`), 'wrong');
    activateKey($(`#key${midiNote} img`), 'correct');
    keysBlock = true;
  }
}

const resetScore = () => {
  $('#score-good').text(0);
  $('#score-bad').text(0);
}

const closeWrong = () => {
  $('#bad-choice').remove();
  $('#controls').removeClass('hidden')
  keysBlock = false;
  deactivateKey($(`#key${midiNote} img`));
  deactivateKey($(`#key${userAnswer} img`));
  newNote();
}

const accidentalsChange = (e) => {
  accidentalsOption = e.target.checked ? true : false;
  resetScore();
  newNote();
}

showKeyboard();

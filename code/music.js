/*
* using cross platform MIDI library MIDI.js http://www.midijs.net/
*/

midifiles = {};

createMidiPlayerFromUrl("title", "/midi/title.mid", "audio/midi");
createMidiPlayerFromUrl("map", "/midi/map.mid", "audio/midi");
createMidiPlayerFromUrl("background", "/midi/background.mid", "audio/midi");
createMidiPlayerFromUrl("overground", "/midi/overground.mid", "audio/midi");
createMidiPlayerFromUrl("underground", "/midi/underground.mid", "audio/midi");
createMidiPlayerFromUrl("castle", "/midi/castle.mid", "audio/midi");

function createMidiPlayerFromUrl(id, url, mimeType) {
  return fetch(url)
  .then(response => response.blob())
  .then(blob => {
    blob.arrayBuffer().then(arrayBuffer => {
      console.info(arrayBuffer);
      file = new File([arrayBuffer], id, { type: mimeType });
      console.info(file);
      fileInput = document.createElement("input");
      fileInput.id = id;
      fileInput.type = "file";
      fileInput.style.display = "none";
      document.body.appendChild(fileInput);
      dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileInput.files = dataTransfer.files;
      player = new MIDIPlayer(id);
      player.handleExample(url);	// this will open and load midi file from URL
      midifiles[id] = player;
    });
  }).catch(error => {
    console.error(error);
  });
}

var currentPlayer = null;

Mario.PlayMusic = function (name) {
	console.info(">> play midi name: " + name);
	if (name in midifiles) {
	  // Currently we stop all playing tracks when playing a new one
	  // MIDIjs can't play multiple at one time
	  midiPlayer = midifiles[name];
	  // console.info(midiPlayer);
	  if (currentPlayer != null) {
		currentPlayer.stop();
		currentPlayer = midiPlayer;
	  } 
	  currentPlayer = midiPlayer;
	  // MIDIjs.stop();;
	  // MIDIjs.play(midifiles[name]);
	  // console.info(currentPlayer);
	  currentPlayer.play();
	} else {
	  console.error("Cannot play music track " + name + " as i have no data for it.");
	}
  };

Mario.PlayTitleMusic = function() {
	console.info("play title music");
	Mario.PlayMusic("title");
};

Mario.PlayMapMusic = function() {
	Mario.PlayMusic("map");
};

Mario.PlayOvergroundMusic = function() {
	Mario.PlayMusic("background");
};

Mario.PlayUndergroundMusic = function() {
	Mario.PlayMusic("underground");
};

Mario.PlayCastleMusic = function() {
	Mario.PlayMusic("castle");
};

Mario.StopMusic = function() {
	// MIDIjs.stop();
	if (currentPlayer != null) {
		currentPlayer.stop();
		currentPlayer = null;
	}
};

$(function() { 
  
  var TEMPLATE = '<div class="beat"><div class="notes-ct">{notes}</div><div class="marker"></div></div>',
      NOTES_TEMPLATE = '<span class="note {octave}">{note}</span>';
  
  var raaga = RAAGA_DEF;
  if (! raaga) {
  	return;
  }
  
  var taal = raaga.taal,
      gat = raaga.gat || [],
      startBeat = raaga.startBeat,
      maxBeatsPerLine = 8;
  
  if (taal === 'teentaal') {
  
    html = '';
  	gat.forEach(function(beatNotes, index){
  		console.log(index);
  		var notesHtml = '';
  		beatNotes.forEach(function(beatNoteDef){
  			var beatNote = '',
  			    octave = '';
  			
  			if (beatNoteDef === 'c') {
 	  			beatNote = 'C';
  			} else if (beatNoteDef.length) {
  				beatLetters = beatNoteDef.split('');
  				beatNote = beatLetters[1];
  				octave = beatLetters[0] === 'l' ? 'lower' : beatLetters[0] === 'm' ? 'middle' : 'upper';
  			}
				
  		    noteHtml = NOTES_TEMPLATE.replace('{note}', beatNote ? beatNote : '-');
  		    noteHtml = noteHtml.replace('{octave}', octave);
  			notesHtml += noteHtml;	  		
  		});
  			
  		html += TEMPLATE.replace('{notes}', notesHtml);	
  	
  	});
  	
  	$('.composition').html(html);
  	
  }
  
});
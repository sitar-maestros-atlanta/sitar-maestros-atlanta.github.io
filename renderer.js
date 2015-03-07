$(function() { 
  
  var TEMPLATE = '<div class="beat"><div class="notes-ct">{notes}</div><div class="marker"></div></div>',
      NOTES_TEMPLATE = '<span class="note {octave}">{note}</span>';
  
  function getHtmlForNotesDef(beatNoteDef) {
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
	return noteHtml;	  		
  
  }
  
  function writeCompositionPart(compositionDiv, notes, title) {
  	notes = notes || [];
  	
    var marginDiv = div = $('<div class="margin-col"></div>'),
        detailsDiv = $('<div class="details-col">'),
        ct = $('<div class="column-layout item"></div>');

	ct.append(marginDiv).append(detailsDiv);
	composition.append(ct);
  	notes.forEach(function(beatNotes, index){
  		var notesHtml = '';
  		beatNotes.forEach(function(beatNoteDef){
  			notesHtml += getHtmlForNotesDef(beatNoteDef);	  		
  		});
  			
  		html += TEMPLATE.replace('{notes}', notesHtml);	
  		
  		if ( (index+1) % maxBeatsPerLine === 0) {
  			line = $('<div class="line"></div>');
  			detailsDiv.append(line);
  			line.append(html);
  			html = '';
  		}
  	
  	});
  	marginDiv.html(title);
  }
  
  function setMetaDataNotes(notes, container, header) {
    var marginDiv = $('<div class="margin-col"></div>');
        detailsDiv = $('<div class="details-col">'),
        metaDataHtml = '';
  	notes.forEach(function(noteDef) {
  	  metaDataHtml += getHtmlForNotesDef(noteDef);		
    });
  
    container.append(marginDiv).append(detailsDiv);
    detailsDiv.html(metaDataHtml);
    marginDiv.html(header);
  }
  
  var raaga = RAAGA_DEF;
  if (! raaga) {
  	return;
  }
  
  var name = raaga.name,
      taal = raaga.taal,
      gat = raaga.gat || [],
      arohan = raaga.arohan || [],
      avarohan = raaga.avarohan || [],
	  pakad = raaga.pakad || [],
      startBeat = raaga.startBeat,
      maxBeatsPerLine = 8,
      line,
      composition = $('.composition'),
      html = '',
      marginDiv,
      detailsDiv;
  
  $('.raaga-name').html(name);
  
  setMetaDataNotes(arohan, $('.arohan-container'), 'Arohan');
  setMetaDataNotes(avarohan, $('.avarohan-container'), 'Avarohan');
  setMetaDataNotes(pakad, $('.pakad-container'), 'Pakar');

  if (taal === 'teentaal') {
  
  	writeCompositionPart(composition, raaga.gat , 'Gat');
    writeCompositionPart(composition,  raaga.manjha , 'Manjha');
    /*marginDiv = div = $('<div class="margin-col"></div>'),
    detailsDiv = $('<div class="details-col">');

	composition.append(marginDiv).append(detailsDiv);
  	gat.forEach(function(beatNotes, index){
  		var notesHtml = '';
  		beatNotes.forEach(function(beatNoteDef){
  			notesHtml += getHtmlForNotesDef(beatNoteDef);	  		
  		});
  			
  		html += TEMPLATE.replace('{notes}', notesHtml);	
  		
  		if ( (index+1) % maxBeatsPerLine === 0) {
  			line = $('<div class="line"></div>');
  			detailsDiv.append(line);
  			line.append(html);
  			html = '';
  		}
  	
  	});
  	marginDiv.html('Gat');*/
  
  }
  
});
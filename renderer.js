define(['jquery', 'bootstrap'], function ($) {
    function getRaagaDef(raagaName) {
        clearPage();
        $.getJSON(raagaName + '/raaga-def.json?' + new Date().getTime()).done(function (def) {
            showRaaga(def);
        }).fail(function () {
            console.log(arguments);
        });
    }

    function clearPage() {
        $('.raaga-name').html('');
        $('.arohan-container').html('');
        $('.avarohan-container').html('');
        $('.pakad-container').html('');
        $('.composition').html('');
    }

    function showRaaga(raagaDef) {

        var TEMPLATE = '<div class="beat"><div class="notes-ct">{notes}</div><div class="stroke-container">{strokes}</div><div class="marker"></div></div>',
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

        function writeCompositionPart(parent, notes, title, maxBeatsPerLine) {
            notes = notes || [];

            var marginDiv = div = $('<div class="margin-col"></div>'),
                detailsDiv = $('<div class="details-col">'),
                ct = $('<div class="column-layout item"></div>');

            ct.append(marginDiv).append(detailsDiv);
            parent.append(ct);
            notes.forEach(function (beatNotes, index) {
                var notesHtml = '',
                    strokeHtml = '';
                beatNotes.forEach(function (beatNoteDef) {
                    notesHtml += getHtmlForNotesDef(beatNoteDef);
                    strokeHtml += '<span class="stroke">';
                    if (beatNoteDef.length >= 3 ) {
                        strokeHtml += beatNoteDef.substring(2) === 'd' ? '&#8403;' : '&#8213;';
                    }
                    strokeHtml += '</span>';
                });

                html += TEMPLATE.replace('{notes}', notesHtml).replace('{strokes}', strokeHtml);

                if (maxBeatsPerLine && (index + 1) % maxBeatsPerLine === 0) {
                    line = $('<div class="line"></div>');
                    detailsDiv.append(line);
                    line.append(html);
                    html = '';
                }

            });

            if (! maxBeatsPerLine) {
                line = $('<div class="line"></div>');
                detailsDiv.append(line);
                line.append(html);
                html = '';
            }

            marginDiv.html(title);
            return ct;
        }

        function setMetaDataNotes(notes, container, header) {
            var marginDiv = $('<div class="margin-col"></div>');
            detailsDiv = $('<div class="details-col">'),
                metaDataHtml = '';
            notes.forEach(function (noteDef) {
                metaDataHtml += getHtmlForNotesDef(noteDef);
            });

            container.append(marginDiv).append(detailsDiv);
            detailsDiv.html(metaDataHtml);
            marginDiv.html(header);
        }

        function writeTihai(tihai, parentElement) {

            if (tihai) {
                var tihaiElement = writeCompositionPart(parentElement, tihai.notes, '');

                if (tihai.repeat > 1) {
                    tihaiElement.find('.line').append('<div class="tihai-repeat"><span>]</span> x ' + tihai.repeat + ' Times</div>')
                }
            }

        }

        var raaga = raagaDef;
        if (!raaga) {
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

            writeCompositionPart(composition, raaga.gat, 'Gat', maxBeatsPerLine);
            writeCompositionPart(composition, raaga.manjha, 'Manjha', maxBeatsPerLine);
            writeCompositionPart(composition, raaga.anthara, 'Anthara', maxBeatsPerLine);

            var taans = raaga.taan || [];
            taans.forEach(function(taan, i) {
                writeCompositionPart(composition, taan.notes, 'Taan ' + (i+1), maxBeatsPerLine);

                writeTihai(taan.tihai, composition);
            });

            if (raaga.jhala) {
                writeCompositionPart(composition, raaga.jhala.notes, 'Jhala', maxBeatsPerLine);
                writeTihai(raaga.jhala.tihai, composition);
            }
        }

    }

    function getNameFromHash() {
        var raaga = location.hash || '';
        return raaga.length > 1 ? raaga.substring(1) : '';
    }

    function loadFromHash() {
        var name = getNameFromHash();
        $('a[href=#' + name + ']').click();
        getRaagaDef(name);
    }

    $(window).on('hashchange', loadFromHash);

    $('.raaga-list a').on('click', function () {
        $('.selected-raaga').html($(this).html());
        location.hash = $(this).attr('href');
    });
    if (getNameFromHash()) {
        loadFromHash();
    } else {
        $('.raaga-list li:first-child a').click();
    }


});



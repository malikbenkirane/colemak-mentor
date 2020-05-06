function make_lesson(words_per_line, words) {
	const list = words.split(' ');
	console.log(list);
	const lines = [];
	while (list.length > 0) {
		lines.push([]);
		for (let i = 0; i < words_per_line; i++) {
			if (!list) {
				break;
			}
			lines[lines.length-1].push(list.pop());
		}
	}
	return (lines);
}

const all_lessons = [
	make_lesson(8, 'sets tens ten tnt sestet tenet seen nene testee tenets essen sent senses tenses teens stent sense tent nets tenseness net tense nests tennessee teen nest tents net tens teen tenets senses nests nest nets tenet sent sense tenses tennessee essen tnt tent teens tense nene stent seen'),
];

const lessons = [all_lessons[0]];

export default lessons; 

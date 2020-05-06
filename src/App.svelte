<script>
	import colemak from './colemak.js'
	import lessons from './lessons.js'
	import { onMount, tick } from 'svelte';

	/*
	const lessons = [
		[['abc', 'b'],
		['abc', 'c']],
	]
	*/

	const debug = false;

	let text = '';
	let control = false;
	let cursor = {
		lesson: 0,
		line: 0,
		word: 0,
		char: 0,
	};
	$: lineWord = lessons[cursor['lesson']][cursor['line']] 
	$: cw = cw ? (cursor['char'] === cw.length ? '<space>' : lineWord[cursor['word']]) : lineWord[cursor['word']]
	$: cc = cw ? cw.split('')[cursor['char']] : '<eos>'
	$: eol = lineWord && cursor['word'] === lineWord.length - 1 && cw === '<space>'

	const initTutor = () => {
		const t = lineWord.map(w => w.split('').map(_ => false));
		t.forEach(w => w.push(false))
		return t;
	}

	let tutor;

	onMount(() => {
		document.querySelector('[myautofocus]').focus();
		tutor = initTutor();
	});

	function handleKeyUp(event) {
		if (event.key == 'Control') {
			control = false;
		}
	}

	async function handleKeyDown(event) {
		const k = event.key;
		const t = colemak[k];
		event.preventDefault();
		if (lineWord && cursor['word'] === lineWord.length - 1 && cw === '<space>') {
			if (k === 'Enter') {
				if (cursor['line'] < lessons[cursor['lesson']].length) {
					cursor['line']++;
					resetTutor();
				}
			}
			else if (k === 'Backspace' || k === 'Escape') {
				resetTutor();
			}
			return;
		}
		if (k === 'Control') {
			control = true;
		}
		else if (
			(k == 'Escape') || 
			(k == 'Enter') || 
			(control && k === 'Backspace')
		) {
			resetTutor();
		}
		else if (k == 'Backspace') {
			text = text.substring(0, text.length - 1);
			backspaceTutor('backspace');
		}
		else if (t) {
			text += t;
			updateTutor(t);
		}
		else if (k.length == 1) {
			text += k;
			updateTutor(k);
		}
	}

	const info = () => {
		if (debug) {
			console.log(JSON.stringify(tutor), cursor, cc, cw)
			console.log(lineWord, tutor.length)
		}
	}

	async function updateTutor(char) {
		if (cw === '<space>') {
			let t = tutor[cursor['word']];
			t[t.length-1] = char !== ' ';
			cursor['word']++;
			cursor['char'] = 0;
		} else {
			tutor[cursor['word']][cursor['char']] = char !== cc;
			cursor['char']++;
 		}
		info();
	}

	async function backspaceTutor() {
		if (cursor['char'] > 0) {
			tutor[cursor['word']][cursor['char']] = false;
			cursor['char']--;
		}
		else if (cursor['word'] > 0) {
			cursor['word']--;
			await tick;
			cursor['char'] = cw.length;
		} else if (cursor['word'] === 0 ) {
			resetTutor();
		}
		info();
	}

	function resetTutor() {
		text = '';
		cursor['char'] = 0;
		cursor['word'] = 0;
		tutor = initTutor();
		info();
	}
</script>

<main>
	<h1>Colemak !</h1>
	<div class="flex column center">
		<img alt="colemak layout" src="/colemak.png"/>
		<input type="text"
		class="bigtext"
		value={text}
		on:keydown={handleKeyDown}
		on:keyup={handleKeyUp}
		myautofocus
		/>
		<div class="flex row center bigtext">
			{#each lineWord as word, iw}
				<span class="flex cursor" class:word="{
				cw !== '<space>' && cursor['word'] === iw
				}">
					{#each word.split('') as char, ic}
						<pre class="cursor" class:letter="{
						cw !== '<space>' && cursor['char'] === ic && cursor['word'] === iw
						}" class:error="{
						tutor !== undefined && tutor[iw] !== undefined ?
						tutor[iw][ic] : false
						}">{char}</pre>
					{/each}
				</span>
				<pre class="cursor" class:letter="{
				cw === '<space>' && iw === cursor['word']
				}" class:error="{
				tutor !== undefined && tutor[iw] !== undefined ?
				tutor[iw][lineWord[iw].length] : false
				}">{iw === lineWord.length -1 ? (eol ? '↵' : '') : '␣'}</pre>
			{/each}
		</div>
	</div>
</main>

<style>
	.bigtext {
		font-size: 2em;
	}
	input {
		margin-top: 2em;
		text-align: center;
		font-family: monospace;
		border: 0;
		background: #efefef;
		height: 2em;
	}
	.flex { display: flex; }
	.flex.column.center { align-content: center; }
	.flex.column { flex-direction: column; }
	.flex.row { flex-direction: row; }
	.flex.row.center { justify-content: center; }
	.cursor.word {
		font-weight: thin;
	}
	.cursor.error {
		color: red;
	}
	.cursor.letter {
		font-weight: bold;
		padding-left: .1em;
		padding-right: .1em;
		transform: scale(1.1);
		transition: all ease 200ms;
	}
	img {
		object-fit: contain;
	}
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>

# Colemak! mentor [wip] *[-> demo](https://colemak.now.sh)*

*WIP: see also roadmap section below*

Demo: [now.colemak.sh](https://colemak.now.sh)

Colemak! is a svelte app being developped with
the [svelte.dev](https://svelte.dev) framework.

Features are still very limited, I intend to improve it while learning
touch typing colemak us keyboard variant.

I started developping this app to try out the [colemak keyboard
layout](https://colemak.com) and I wanted not to have to change the
default us keyboard layout. Also I'm trying to make the experience of
learning the layout easy and effective.

If you don't know about the colemak layout yet, you may learn about it
on the [colemak wiki](https://colemak.com). I also have been inspired
by [this article](https://first20hours.com/typing/) that is worth to
read.


## Getting started

```
npm i # only the first time
npm run dev
```

Otherwise read `package.json` and see also
[sveltejs/template](https://github.com/sveltejs/template)


## Lessons

*Reference: lessons.js*

The feature is still not implemented yet. See `src/lessons.js` to get
the idea. And follow the following guidelines:

		- `lessons.js` exports a default constant value named `lessons`son
		- a lessons is an array of lessons
		- each lesson is an array of lines
		- each line is an array of words

The function `make_lesson(number_of_words_per_lines, raw)` will split a
sequence of words in a single string into the above structure.

What is supported now is loading the first lesson.  It's easy to hack
which lesson to load by updating the line `const lessons = ...` in
`lessons.js`.

 
## Alternative mappings

*Reference: mappings.js*

In case your keyboard is not a us keyboard or is not mapped to the us
keyboard layout, you can update `src/colemak.js` to update the mappings.

`src/colemak.js` exports `colemak`, that is a simple dictionary that
maps keystrokes of the keyboard to emulate colemak's keystrokes on the
keyboard layout.

It's very easy to write a script to generate this file.  As it is not
already written, you can find some tracks below to generate your
mapping.

Start by getting any colemak layout picture and start with writing
your custom mapping
![colemak layout](https://colemak.com/wiki/images/6/6c/Colemak2.png)
```
qwertyuiop[]\ -> qwfpgjluy;[]\
QWERTYUIOP{}\ -> QWFPGJLUY:{}\
asdfghjkl;' -> arstdhneio'
ASDFGHJKL:" -> ARSTDHNEIO"
zxcvbnm,./ -> zxcvbkm,./
ZXCVBNM<>? -> ZXCVBKM<>?
```

You could use javascript methods on strings like `String.prototype.split` to
split by line, by the character ` -> ` and by letter.  Do it with the
language of you preference and try to produce a file looking like
colemak.js.

## Roadmap

	- [ ] keyboard script to support any mapping
	- [ ] breakdown App.svelte into smaller components
		- [ ] store progress, show statistics ...
		- [ ] select lessons
		- [ ] tutor messages
	- [ ] share with colemak community
	- [ ] list and compare with alternatives
	- [ ] make this README.md better

# See also

- https://colemak.com/Learn
- https://colemak.com
- https://en.wikipedia.org/wiki/Colemak
- https://first20hours.com/typing/

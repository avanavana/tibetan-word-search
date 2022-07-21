const orientations = {
  fill: [
    (r, s, i) => s - i - i * r,
  	(r, s, i) => s - i * r,
  	(r, s, i) => s + i - i * r,
  	(_, s, i) => s + i,
  	(r, s, i) => s + i + i * r,
  	(r, s, i) => s + i * r,
  	(r, s, i) => s - i + i * r,
  	(_, s, i) => s - i
  ],
  checkBounds: [
    (r, l, s, i) => s - i - i * r >= 0,
    (r, _, s, i) => s - i * r >= 0,
    (r, l, s, i) => s + i - i * r >= 0,
    () => true,
    (r, l, s, i) => s + i + i * r < r ** 2,
    (r, _, s, i) => s + i * r < r ** 2,
    (r, l, s, i) => s - i + i * r < r ** 2,
    () => true
  ],
  checkWrap: [
    (r, l, s) => s % r >= l - 1,
    () => true,
    (r, l, s) => s % r <= r - l,
    (r, l, s) => s % r <= r - l,
    (r, l, s) => s % r <= r - l,
    () => true,
    (r, l, s) => s % r >= l - 1,
    (r, l, s) => s % r >= l - 1
  ]
}

const orderWords = (a, b) => a.length > b.length ? -1 : a.length === b.length ? a < b ? -1 : 1 : 1;

const chooseRandom = (a) => a.splice(Math.floor(Math.random() * a.length), 1)[0];

const placeWord = (puzzle, word, options) => {
	let temp = [], j = word.length - 1, size = Math.sqrt(puzzle.length), startsToTry = Array.from(Array(puzzle.length), (_, i) => i);

	while (startsToTry.length) {
		if (j <= 0) break;
		let start = chooseRandom(startsToTry), orientationsToTry = !options.reverse && !options.diagonals ? [ 3, 5 ] : options.reverse && !options.diagonals ? [ 1, 3, 5, 7 ] : !options.reverse && options.diagonals ? [ 2, 3, 4, 5 ] : [ 0, 1, 2, 3, 4, 5, 6, 7 ];

    while (orientationsToTry.length) {
      let orientation = chooseRandom(orientationsToTry);
      if ([ ...word ].map((_, i) => orientations.checkBounds[orientation](size, word.length, start, i)).some((x) => !x)) continue;
      if (!orientations.checkWrap[orientation](size, word.length, start)) continue;

  		for (const [i, letter] of [ ...word ].entries()) {
        const cell = orientations.fill[orientation](size, start, i);

  			if (!!puzzle[cell]) {
          if (puzzle[cell] === letter) { temp.push([cell, letter]); j--; continue }
          else { temp = []; j = word.length; break; }
        }

  			temp.push([cell, letter]); j--;
  		}

      if (j <= 0) break;
    }

    continue;
	}

	return j <= 0 ? temp : false;
}

const languages = new Map([
  [ 'bo', [ 'ཀ', 'ཁ', 'ག', 'ང', 'ཅ', 'ཆ', 'ཇ', 'ཉ', 'ཏ', 'ཐ', 'ད', 'ན', 'པ', 'ཕ', 'བ', 'མ', 'ཙ', 'ཚ', 'ཛ', 'ཝ', 'ཞ', 'ཟ', 'འ', 'ཡ', 'ར', 'ལ', 'ཤ', 'ས', 'ཧ', 'ཨ', 'རྐ', 'རྒ', 'རྔ', 'རྗ', 'རྙ', 'རྟ', 'རྡ', 'རྣ', 'རྦ', 'རྨ', 'རྩ', 'རྫ', 'ལྐ', 'ལྒ', 'ལྔ', 'ལྕ', 'ལྗ', 'ལྟ', 'ལྡ', 'ལྤ', 'ལྦ', 'ལྷ', 'སྐ', 'སྒ', 'སྔ', 'སྙ', 'སྟ', 'སྡ', 'སྙ', 'སྤ', 'སྦ', 'སྨ', 'སྩ', 'ཀྱ', 'ཁྱ', 'གྱ', 'པྱ', 'ཕྱ', 'བྱ', 'མྱ', 'ཀྲ', 'ཁྲ', 'གྲ', 'ཏྲ', 'ཐྲ', 'དྲ', 'པྲ', 'ཕྲ', 'བྲ', 'མྲ', 'ཤྲ', 'སྲ', 'ཧྲ', 'ཀླ', 'གླ', 'བླ', 'རླ', 'སླ', 'ཟླ', 'ཀྭ', 'ཁྭ', 'གྭ', 'ཅྭ', 'ཉྭ', 'ཏྭ', 'དྭ', 'ཙྭ', 'ཚྭ', 'ཞྭ', 'ཟྭ', 'རྭ', 'ལྭ', 'ཤྭ', 'སྭ', 'ཧྭ', 'རྐྱ', 'རྒྱ', 'རྨྱ', 'སྐྱ', 'སྒྱ', 'སྤྱ', 'སྦྱ', 'སྨྱ', 'སྐྲ', 'སྒྲ', 'སྣྲ', 'སྤྲ', 'སྦྲ', 'སྨྲ', 'གྲྭ', 'དྲྭ', 'ཕྱྭ', 'རྩྭ', 'རྒྭ', 'གྷ', 'དྷ', 'ཌྷ', 'བྷ', 'ཛྷ', 'ཊ', 'ཋ', 'ཌ', 'ཎ', 'ཥ', 'ཀྵ', 'ཀི', 'ཁི', 'གི', 'ངི', 'ཅི', 'ཆི', 'ཇི', 'ཉི', 'ཏི', 'ཐི', 'དི', 'ནི', 'པི', 'ཕི', 'བི', 'མི', 'ཙི', 'ཚི', 'ཛི', 'ཝི', 'ཞི', 'ཟི', 'འི', 'ཡི', 'རི', 'ལི', 'ཤི', 'སི', 'ཧི', 'ཨི', 'རྐི', 'རྒི', 'རྔི', 'རྗི', 'རྙི', 'རྟི', 'རྡི', 'རྣི', 'རྦི', 'རྨི', 'རྩི', 'རྫི', 'ལྐི', 'ལྒི', 'ལྔི', 'ལྕི', 'ལྗི', 'ལྟི', 'ལྡི', 'ལྤི', 'ལྦི', 'ལྷི', 'སྐི', 'སྒི', 'སྔི', 'སྙི', 'སྟི', 'སྡི', 'སྙི', 'སྤི', 'སྦི', 'སྨི', 'སྩི', 'ཀྱི', 'ཁྱི', 'གྱི', 'པྱི', 'ཕྱི', 'བྱི', 'མྱི', 'ཀྲི', 'ཁྲི', 'གྲི', 'ཏྲི', 'ཐྲི', 'དྲི', 'པྲི', 'ཕྲི', 'བྲི', 'མྲི', 'ཤྲི', 'སྲི', 'ཧྲི', 'ཀླི', 'གླི', 'བླི', 'རླི', 'སླི', 'ཟླི', 'ཀྭི', 'ཁྭི', 'གྭི', 'ཅྭི', 'ཉྭི', 'ཏྭི', 'དྭི', 'ཙྭི', 'ཚྭི', 'ཞྭི', 'ཟྭི', 'རྭི', 'ལྭི', 'ཤྭི', 'སྭི', 'ཧྭི', 'རྐྱི', 'རྒྱི', 'རྨྱི', 'སྐྱི', 'སྒྱི', 'སྤྱི', 'སྦྱི', 'སྨྱི', 'སྐྲི', 'སྒྲི', 'སྣྲི', 'སྤྲི', 'སྦྲི', 'སྨྲི', 'གྲྭི', 'དྲྭི', 'ཕྱྭི', 'རྩྭི', 'རྒྭི', 'གྷི', 'དྷི', 'ཌྷི', 'བྷི', 'ཛྷི', 'ཊི', 'ཋི', 'ཌི', 'ཎི', 'ཥི', 'ཀྵི', 'ཀུ', 'ཁུ', 'གུ', 'ངུ', 'ཅུ', 'ཆུ', 'ཇུ', 'ཉུ', 'ཏུ', 'ཐུ', 'དུ', 'ནུ', 'པུ', 'ཕུ', 'བུ', 'མུ', 'ཙུ', 'ཚུ', 'ཛུ', 'ཝུ', 'ཞུ', 'ཟུ', 'འུ', 'ཡུ', 'རུ', 'ལུ', 'ཤུ', 'སུ', 'ཧུ', 'ཨུ', 'རྐུ', 'རྒུ', 'རྔུ', 'རྗུ', 'རྙུ', 'རྟུ', 'རྡུ', 'རྣུ', 'རྦུ', 'རྨུ', 'རྩུ', 'རྫུ', 'ལྐུ', 'ལྒུ', 'ལྔུ', 'ལྕུ', 'ལྗུ', 'ལྟུ', 'ལྡུ', 'ལྤུ', 'ལྦུ', 'ལྷུ', 'སྐུ', 'སྒུ', 'སྔུ', 'སྙུ', 'སྟུ', 'སྡུ', 'སྙུ', 'སྤུ', 'སྦུ', 'སྨུ', 'སྩུ', 'ཀྱུ', 'ཁྱུ', 'གྱུ', 'པྱུ', 'ཕྱུ', 'བྱུ', 'མྱུ', 'ཀྲུ', 'ཁྲུ', 'གྲུ', 'ཏྲུ', 'ཐྲུ', 'དྲུ', 'པྲུ', 'ཕྲུ', 'བྲུ', 'མྲུ', 'ཤྲུ', 'སྲུ', 'ཧྲུ', 'ཀླུ', 'གླུ', 'བླུ', 'རླུ', 'སླུ', 'ཟླུ', 'རྐྱུ', 'རྒྱུ', 'རྨྱུ', 'སྐྱུ', 'སྒྱུ', 'སྤྱུ', 'སྦྱུ', 'སྨྱུ', 'སྐྲུ', 'སྒྲུ', 'སྣྲུ', 'སྤྲུ', 'སྦྲུ', 'སྨྲུ', 'གྷུ', 'དྷུ', 'ཌྷུ', 'བྷུ', 'ཛྷུ', 'ཊུ', 'ཋུ', 'ཌུ', 'ཎུ', 'ཥུ', 'ཀྵུ', 'ཀེ', 'ཁེ', 'གེ', 'ངེ', 'ཅེ', 'ཆེ', 'ཇེ', 'ཉེ', 'ཏེ', 'ཐེ', 'དེ', 'ནེ', 'པེ', 'ཕེ', 'བེ', 'མེ', 'ཙེ', 'ཚེ', 'ཛེ', 'ཝེ', 'ཞེ', 'ཟེ', 'འེ', 'ཡེ', 'རེ', 'ལེ', 'ཤེ', 'སེ', 'ཧེ', 'ཨེ', 'རྐེ', 'རྒེ', 'རྔེ', 'རྗེ', 'རྙེ', 'རྟེ', 'རྡེ', 'རྣེ', 'རྦེ', 'རྨེ', 'རྩེ', 'རྫེ', 'ལྐེ', 'ལྒེ', 'ལྔེ', 'ལྕེ', 'ལྗེ', 'ལྟེ', 'ལྡེ', 'ལྤེ', 'ལྦེ', 'ལྷེ', 'སྐེ', 'སྒེ', 'སྔེ', 'སྙེ', 'སྟེ', 'སྡེ', 'སྙེ', 'སྤེ', 'སྦེ', 'སྨེ', 'སྩེ', 'ཀྱེ', 'ཁྱེ', 'གྱེ', 'པྱེ', 'ཕྱེ', 'བྱེ', 'མྱེ', 'ཀྲེ', 'ཁྲེ', 'གྲེ', 'ཏྲེ', 'ཐྲེ', 'དྲེ', 'པྲེ', 'ཕྲེ', 'བྲེ', 'མྲེ', 'ཤྲེ', 'སྲེ', 'ཧྲེ', 'ཀླེ', 'གླེ', 'བླེ', 'རླེ', 'སླེ', 'ཟླེ', 'ཀྭེ', 'ཁྭེ', 'གྭེ', 'ཅྭེ', 'ཉྭེ', 'ཏྭེ', 'དྭེ', 'ཙྭེ', 'ཚྭེ', 'ཞྭེ', 'ཟྭེ', 'རྭེ', 'ལྭེ', 'ཤྭེ', 'སྭེ', 'ཧྭེ', 'རྐྱེ', 'རྒྱེ', 'རྨྱེ', 'སྐྱེ', 'སྒྱེ', 'སྤྱེ', 'སྦྱེ', 'སྨྱེ', 'སྐྲེ', 'སྒྲེ', 'སྣྲེ', 'སྤྲེ', 'སྦྲེ', 'སྨྲེ', 'གྲྭེ', 'དྲྭེ', 'ཕྱྭེ', 'རྩྭེ', 'རྒྭེ', 'གྷེ', 'དྷེ', 'ཌྷེ', 'བྷེ', 'ཛྷེ', 'ཊེ', 'ཋེ', 'ཌེ', 'ཎེ', 'ཥེ', 'ཀྵེ', 'ཀོ', 'ཁོ', 'གོ', 'ངོ', 'ཅོ', 'ཆོ', 'ཇོ', 'ཉོ', 'ཏོ', 'ཐོ', 'དོ', 'ནོ', 'པོ', 'ཕོ', 'བོ', 'མོ', 'ཙོ', 'ཚོ', 'ཛོ', 'ཝོ', 'ཞོ', 'ཟོ', 'འོ', 'ཡོ', 'རོ', 'ལོ', 'ཤོ', 'སོ', 'ཧོ', 'ཨོ', 'རྐོ', 'རྒོ', 'རྔོ', 'རྗོ', 'རྙོ', 'རྟོ', 'རྡོ', 'རྣོ', 'རྦོ', 'རྨོ', 'རྩོ', 'རྫོ', 'ལྐོ', 'ལྒོ', 'ལྔོ', 'ལྕོ', 'ལྗོ', 'ལྟོ', 'ལྡོ', 'ལྤོ', 'ལྦོ', 'ལྷོ', 'སྐོ', 'སྒོ', 'སྔོ', 'སྙོ', 'སྟོ', 'སྡོ', 'སྙོ', 'སྤོ', 'སྦོ', 'སྨོ', 'སྩོ', 'ཀྱོ', 'ཁྱོ', 'གྱོ', 'པྱོ', 'ཕྱོ', 'བྱོ', 'མྱོ', 'ཀྲོ', 'ཁྲོ', 'གྲོ', 'ཏྲོ', 'ཐྲོ', 'དྲོ', 'པྲོ', 'ཕྲོ', 'བྲོ', 'མྲོ', 'ཤྲོ', 'སྲོ', 'ཧྲོ', 'ཀློ', 'གློ', 'བློ', 'རློ', 'སློ', 'ཟློ', 'ཀྭོ', 'ཁྭོ', 'གྭོ', 'ཅྭོ', 'ཉྭོ', 'ཏྭོ', 'དྭོ', 'ཙྭོ', 'ཚྭོ', 'ཞྭོ', 'ཟྭོ', 'རྭོ', 'ལྭོ', 'ཤྭོ', 'སྭོ', 'ཧྭོ', 'རྐྱོ', 'རྒྱོ', 'རྨྱོ', 'སྐྱོ', 'སྒྱོ', 'སྤྱོ', 'སྦྱོ', 'སྨྱོ', 'སྐྲོ', 'སྒྲོ', 'སྣྲོ', 'སྤྲོ', 'སྦྲོ', 'སྨྲོ', 'གྲྭོ', 'དྲྭོ', 'ཕྱྭོ', 'རྩྭོ', 'རྒྭོ', 'གྷོ', 'དྷོ', 'ཌྷོ', 'བྷོ', 'ཛྷོ', 'ཊོ', 'ཋོ', 'ཌོ', 'ཎོ', 'ཥོ', 'ཀྵོ' ] ],
  [ 'en', [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ] ]
]);

const fillPuzzle = (puzzle, words, lang = 'bo') => {
  for (const [ i, cell ] of puzzle.entries()) {
    if (!puzzle[i]) puzzle[i] = chooseRandom([ ...languages.get(lang), ...words.flatMap((x) => typeof x === 'string' ? x.split('') : x)])
  }

  return puzzle;
}

const generatePuzzle = (input, { lang = 'bo', reverse = true, diagonals = true } = {} ) => {
  let max = 12, size = Math.max(input.sort(orderWords)[0].length, typeof input[0] === 'string' ? Math.ceil(Math.sqrt(input.map((word) => word.split('')).flat().length)) : Math.ceil(Math.sqrt(input.flat().length)));
  if ((typeof input[0] === 'string' ? input.map((word) => word.split('')).flat().length : input.flat().length) > max ** 2) throw new Error(`There are more letters in your chosen words combined than the maximum size puzzle (${max}x${max}) can accomodate.`);
  if (size > max) throw new Error(`At least one of your chosen words is longer than the maximum length of ${max}.`);

	while (size <= max) {
		const words = [ ...input.sort(orderWords).map((w) => typeof input[0] === 'string' ? w.toLowerCase() : w.map((l) => l.toLowerCase())) ], puzzle = new Array(size ** 2).fill(false);
		let remaining = words.length - 1;

		for (const word of words) {
			const placement = placeWord(puzzle, word, { reverse, diagonals });
			if (!placement) break;
			placement.forEach(([cell, letter]) => { puzzle[cell] = letter; }); remaining--;
		}

		if (remaining <= 0) {
      return fillPuzzle(puzzle, words, lang);
    } else {
      size++;
    }
	}

	throw new Error('Couldn\’t fit chosen words in puzzle.');
}

const displayPuzzle = (puzzle) => {
	let row = '', size = Math.sqrt(puzzle.length);

	for (let x of [ ...new Array(size).fill().map((_) => puzzle.splice(0, size)) ]) {
		for (let y of x) { row += y ? y : '-'; }
		console.log(row); row = '';
	}
}

const TibetanWordSearch = (list) => {
  const yiGe = 'ཀཁགངཅཆཇཉཏཐདནཔཕབམཙཚཛཝཞཟའཡརལཤསཧཨ';
  const isMingShi = (letter) => [ ...yiGe ].map((_, i) => yiGe.charCodeAt(i)).some((x) => x === letter.charCodeAt(0));

  return {
    toStacks: () => list.map((word) => {
      word = word.replace(/[\u0F0B-\u0F0D]/g, '');

      return [ ...word ]
        .map((char, i) => {
          let stack = char;

          if (isMingShi(char)) {
            let j = i;
            if (word[j + 1]) {
              while (!isMingShi(word[j + 1])) {
                stack += word[j + 1];
                j++;
              }
            }

            return stack;
          }
        })
        .filter((x) => x);
    })
  }
}

export { TibetanWordSearch, displayPuzzle, generatePuzzle };

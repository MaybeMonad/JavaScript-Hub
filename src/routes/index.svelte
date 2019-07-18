<script>
	import Prism from 'prismjs';
	import Normalizer from 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace.js';
	import questionData from './data/questions';
	import { onMount } from 'svelte';

	let storageQuestion;
	let storageStatistics;
	let questions = [];
	let statistics = {
				correct: [],
				wrong: [],
				last: 0,
			};
	let selected = -1;
	let current = 0;
	let modalVisible = false;

	onMount(() => {
		storageQuestion = localStorage.getItem('questions');
		storageStatistics = localStorage.getItem('statistics');
		questions = storageQuestion ? [...JSON.parse(storageQuestion), ...questionData.slice(JSON.parse(storageQuestion).length)] : questionData;
		storageStatistics ? statistics = JSON.parse(storageStatistics) : undefined;
		selected = statistics.last === questions.length - 1 ? questions[statistics.last].selected : questions[statistics.last + 1].selected ? questions[statistics.last + 1].selected : undefined;
		current = statistics.last === questions.length - 1 ? statistics.last : statistics.last === 0 ? 0 : statistics.last + 1;
	});

	$: done = statistics.correct.length + statistics.wrong.length;
	$: score = done ? parseInt((statistics.correct.length / done) * 100, 10) : 0;

	const nw = new Normalizer({
		'indent': 0,
		'tabs-to-spaces': 2,
		'remove-trailing': true,
		'remove-indent': true,
		'left-trim': true,
		'right-trim': true
	});
	
	$: code = questions.length > 0 ? Prism.highlight(nw.normalize(questions[current].code), Prism.languages.javascript, 'javascript') : undefined;

	const handleOnSelection = (correct, index) => {
		questions[current].selected = selected = index;
		questions[current].selections[index].correct ? statistics.correct = [...statistics.correct, current] : statistics.wrong = [...statistics.wrong, current];
		localStorage.setItem('questions', JSON.stringify(questions));
		localStorage.setItem('statistics', JSON.stringify(statistics));
		statistics.last = current;
	}

	const handleNavClick = type => {
		if (type !== 'next' && current === 0) return;
		current = type === 'next' ? ++current : --current;
		selected = questions[current].selected > -1 ? questions[current].selected : undefined;
		statistics.last = current;
	}

	const handleModalVisible = flag => modalVisible = !!flag;

	const exportJSON = () => {
		let dataStr = JSON.stringify({
			questions,
			statistics,
			dataSource: 'positive',
		});
    let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    let exportFileDefaultName = 'javascript-hub-questions.json';
    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
		handleModalVisible(false);
	}

	const importJSON = file => {
		const selectedfile = file.target.files[0];
		const fr = new FileReader();
		fr.onload = function(e) {
			const result = JSON.parse(e.target.result);
			const formatted = JSON.stringify(result, null, 2);
			const { dataSource: d, questions: q, statistics: s } = formatted;
			if (d !== 'positive') return alert('Wrong JSON Scource!');
			questions = q;
			statistics = s;
			handleModalVisible(false);
		}
		fr.readAsText(selectedfile);
	}
</script>

<style>
	.main {
		background-color: #f3f3f3;
		width: 100%;
		padding: 48px 0;
		margin-top: 120px;
		min-height: calc(100vh - 340px);
	}

	.question-panel {
		margin-top: -136px;
		width: 100%;
		max-width: calc(100% - 360px);
	}

	.focus-area {
		background: #FFFFFF;
		border: 1px solid #EFEFEF;
		box-shadow: 0 8px 24px 0 rgba(0,0,0,0.03);
		border-radius: 8px;
		padding: 48px;
	}

	.focus-area h3 {
		font-weight: 700;
	}

	.question-panel pre {
		margin-bottom: 36px;
		background-color: #000;
		border: 0;
		box-shadow: none;
		padding: 1.5em;
		border-radius: 6px;
	}

	.score {
		background-color: #000;
		border-radius: 6px;
		padding: 16px 24px;
		width: 270px;
	}

	.sider {
		margin-left: 42px;
		margin-top: -136px;
	}

	.selections {
		position: relative;
	}

	.selections.selected::before {
		content: '';
		/* background: rgba(0,0,0,0.03); */
		width: 100%;
		height: 100%;
		display: inline-block;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 9;
		cursor: not-allowed;
	}

	.selection {
		border-radius: 6px;
		padding: 20px 28px;
		background-color: transparent;
		border: 1px solid #efefef;
		cursor: pointer;
		margin-bottom: 20px;
		transition: background-color 0.3s ease-in-out;
	}

	.selection.selected.right {
		background-color: #C5FFC7;
		border-color: #C5FFC7;
	}

	.selection.selected.wrong {
		background-color: #FFA8A8;
		border-color: #FFA8A8;
	}

	.selection:hover {
		background-color: #efefef;
	}

	.selection span {
		font-size: 16px;
		font-weight: 700;
	}

	.selection .check {
		background-color: white;
		width: 32px;
		height: 32px;
		border-radius: 100%;
		border: 1px solid #efefef;
		transition: background-color 0.3s ease-in-out;
		position: relative;
		z-index: 8;
	}

	.selection.selected.wrong .check {
		border-color: white;
	}

	.selection.selected.right .check {
		border-color: #000;
		background-color: #000;
	}

	.selection.selected.right .check::before,
	.selection.selected.wrong .check::before {
		content: '';
		background-repeat: no-repeat;
		width: 15px;
    height: 15px;
    z-index: 99999;
    display: inline-block;
    position: absolute;
    top: 10px;
    left: 10px;
	}

	.selection.selected.right .check::before {
		background-image: url('/correct.svg');
    left: 9px;
	}

	.selection.selected.wrong .check::before {
		background-image: url('/wrong.svg');
	}

	.explanation {
		background-color: #E6E6E6;
		border: 1px solid #D5D5D5;
		border-radius: 8px;
		margin-top: 36px;
		padding: 48px;
		font-size: 14px;
		font-weight: 100;
	}

	.explanation h4 {
		font-size: 20px;
		font-weight: 700;
	}

	:global(.explanation code) {
		font-size: 14px;
		background-color: #f0f0f0;
		border-radius: 3px;
	}

	.explanation .origin {
		color: #999;
	}

	.explanation .origin a {
		word-break: break-all;
	}

	:global(.explanation pre) {
		background-color: #f0f0f0;
		border-radius: 5px;
		padding: 20px 24px;
	}

	.score {
		margin-top: 60px;
		cursor: pointer;
	}

	.score .current-score {
		background-color: #C5FFC7;
		border-radius: 100%;
		width: 74px;
		min-width: 74px;
		height: 74px;
		color: #000;
		font-weight: 700;
		font-size: 24px;
	}

	.score .current-score.poor {
		background-color: #FFA8A8;
	}

	.score .current-score.normal {
		background-color: #DCC5FF;
	}

	.score .score-detail {
		font-size: 20px;
		color: white;
		font-weight: 700;
		width: 100%;
		padding-left: 32px;
	}

	.score .score-detail span {
		font-size: 18px;
		color: #808080;
		font-weight: 400;
	}

	.score .score-detail > div {
		padding: 6px 0;
	}

	button, .import {
		background-color: #E6E6E6;
		border-radius: 6px;
		padding: 18px;
		width: 100%;
		border: 0;
		font-size: 20px;
		line-height: 24px;
		font-weight: 700;
		cursor: pointer;
		margin-top: 12px;
		transition: background-color 0.3s ease-in-out;
		text-align: center;
	}

	label.import {
		margin-right: 16px;
	}

	button:hover, .import:hover {
		background-color: #D5D5D5
	}

	.process-nav button, .import {
		width: calc(50% - 6px);
	}

	.progress p {
		font-weight: 700;
		font-size: 20px;
		margin: 12px 0;
	}

	.progress p span {
		font-weight: 100;
		color: #CCCCCC;
	}

	.progress-bar {
		width: 100%;
		height: 12px;
		border-radius: 12px;
		background-color: #efefef;
	}

	.current-progress {
		background-color: #000;
		height: 12px;
		border-radius: 12px;
		transition: width 0.3s ease-in;
	}

	.social-sharing {
		margin-top: 20px;
	}

	.social-sharing p {
		font-size: 16px;
		color: #CCCCCC;
	}

	.social-sharing .social-media > a {
		margin-left: 28px;
	}

	.social-sharing .social-media > a img {
		width: 18px;
	}

	.social-sharing .social-media > a.share-to-twitter img {
		width: 21px;
	}

	.modal-container {
		position: fixed;
		background-color: rgba(0,0,0,0.3);
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		top: 0;
		left: 0;
		z-index: 99999;
		visibility: hidden;
	}

	.modal-container.visible {
		visibility: visible;
	}

	.modal-body {
		border-radius: 6px;
		background-color: white;
		padding: 24px;
	}

	.modal-footer button {
		width: calc(50% - 8px);
	}

	button.export {
		background-color: #333;
		color: white;
	}

	button.export:hover {
		background-color: #000;
	}

	input[type="file"] {
    display: none;
	}

	@media (min-width: 480px) {
		/* h1 {
			font-size: 4em;
		} */
	}
</style>

<svelte:head>
	<title>JavaScript Hub - Product by Dezineleo.com</title>
</svelte:head>

<div class="container-fluid main">
	{#if questions.length > 0}
		<div class="container d-flex justify-between">
			<div class="question-panel">
				<div class="focus-area">
					<h3>{@html questions[current].question}</h3>
					<pre>
						<code class="language-javascript">
							{@html code}
						</code>
					</pre>
					<div class="selections {questions[current].selected > -1 ? 'selected' : ''}">
						{#each questions[current].selections as selection, index}
							<div disabled class="selection d-flex justify-between align-center {selected === index ? 'selected' : ''} {selected === index && questions[current].selections[index].correct ? 'right' : 'wrong'}" on:click={() => handleOnSelection(selection.correct, index)}>
								<span>{@html selection.des}</span>
								<div class="check"></div>
							</div>
						{/each}
					</div>
				</div>
				{#if questions[current].selected > -1}
					<div class="explanation">
						<h4>Explanation</h4>
						{@html questions[current].explanation.html}
						<p class="origin">Origin: <a href={questions[current].explanation.origin} target="_blank" rel="noopener">{questions[current].explanation.origin}</a></p>
					</div>
				{/if}
			</div>
			<div class="sider">
				<div class="progress">
					<p><span>Current: </span>#{current + 1}</p>
					<div class="progress-bar">
						<div class="current-progress" style="width: {(statistics.correct.length + statistics.wrong.length) * 100 / questions.length}%"></div>
					</div>
				</div>
				<div class="score d-flex justify-between align-center" on:click={() => handleModalVisible(true)}>
					<div class="current-score d-flex justify-center align-center {score < 60 ? 'poor' : score > 59 & score < 80 ? 'normal' : 'good'}">{score}</div>
					<div class="score-detail">
						<div class="correct d-flex justify-between align-center"><span>Correct:</span> {statistics.correct.length}</div>
						<div class="wrong d-flex justify-between align-center"><span>Wrong:</span> {statistics.wrong.length}</div>
					</div>
				</div>
				<div class="process-nav d-flex justify-between align-center">
					<button class="previous" on:click={() => handleNavClick('previous')} disabled={current === 0}>Previous</button>
					<button class="next" on:click={() => handleNavClick('next')} disabled={current + 1 === questions.length}>Next</button>
				</div>
				<div class="social-sharing d-flex justify-between align-center">
					<p>Social Media: </p>
					<div class="social-media">
						<a class="share-to-facebook" href="https://facebook.com/sharer/sharer.php?u=https%3A%2F%2Fjavascript-hub.dezineleo.com" target="_blank" rel="noopener" aria-label="">
							<img src="/icon-facebook.svg" alt="FaceBook">
						</a>
						<a class="share-to-twitter" href="https://twitter.com/intent/tweet/?text=JavaScript%20Hub%20-%20Another%20free%20JavaScript%20learning%20application.&amp;url=https%3A%2F%2Fjavascript-hub.dezineleo.com" target="_blank" rel="noopener" aria-label="">
							<img src="/icon-twitter.svg" alt="Twitter">
						</a>
						<a class="share-to-github" href="https://github.com/DezineLeo/javascript-hub/issues" target="_blank" rel="noopener" aria-label="">
							<img src="/icon-github.svg" alt="Instagram">
						</a>
					</div>
				</div>
			</div>
		</div>
	{/if}
	<div class="modal-container {modalVisible ? 'visible' : ''}" on:click={() => handleModalVisible(false)}>
		<div class="modal-body" on:click={e => e.stopPropagation()}>
			<img src="/share.svg" alt="Share JavaScript Hub">
			<div class="modal-footer d-flex justify-between align-center">
				<label for="file-upload" class="import">
					Import Questions
					<input type=file id="file-upload" on:change={importJSON} accept=".json" />
				</label>
				<button class="export" on:click={exportJSON}>Export Data</button>
			</div>
		</div>
	</div>
</div>
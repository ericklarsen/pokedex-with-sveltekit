<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let moveX = 0;
	let moveY = 0;
	let dragStart = {
		x: 0,
		y: 0
	};

	let selectedEl: any;
	let aliasCursor: any;
	let realCursor: any;
	let startPosition = {
		x: 0,
		y: 0
	};

	let obstacle: any;
	let myChar: any;
	onMount(() => {
		document.body.style.overflow = 'hidden';
		window.addEventListener('keypress', function (e) {
			var keyCode = e.keyCode;
			switch (keyCode) {
				case 100: //d
					moveX += 10;
					break;
				case 115: //s
					moveY += 10;
					break;
				case 97: //a
					moveX -= 10;
					break;
				case 119: //w
					moveY -= 10;
					break;
			}
		});
		realCursor.addEventListener('mousedown', (e: any) => onStart(e));
		window.addEventListener('mouseup', (e) => onLeave(e));
		window.addEventListener('mousemove', (e) => onMove(e));

		realCursor.addEventListener('touchstart', (e: any) => onStart(e));
		window.addEventListener('touchend', (e) => onLeave(e));
		window.addEventListener('touchmove', (e) => onMove(e));
	});

	const onStart = (e: any) => {
		if (e.target) {
			selectedEl = e.target;
			startPosition.x = e.clientX || e?.changedTouches[0].clientX;
			startPosition.y = e.clientY || e?.changedTouches[0].clientY;
		}
	};

	let prevX = 0;
	let prevY = 0;
	let cursorX = 0;
	let cursorY = 0;

	let intervalsX: any;
	let intervalsY: any;

	const onMove = (e: any) => {
		if (!selectedEl) return;
		clearInterval(intervalsX);
		clearInterval(intervalsY);
		let currX = e.clientX;
		let currY = e.clientY;

		if (e?.changedTouches?.length) {
			currX = e?.changedTouches[0].clientX;
			currY = e?.changedTouches[0].clientY;
		}

		if (currX > startPosition.x) {
			cursorX = currX - startPosition.x;
			moveX += 1;
		} else if (startPosition.x > currX) {
			cursorX = currX - startPosition.x;
			moveX -= 1;
		}

		if (currY > startPosition.y) {
			cursorY = currY - startPosition.y;
			moveY += 1;
		} else if (startPosition.y > currY) {
			cursorY = currY - startPosition.y;
			moveY -= 1;
		}

		const myCharPos = myChar.getBoundingClientRect();
		const obstaclePos = obstacle.getBoundingClientRect();
		// console.log(myChar.getBoundingClientRect());

		// Let's improve this behavior
		if (myCharPos.x >= obstaclePos.x - (obstaclePos.width * 50) / 100) {
			myChar.style.transform = 'scale(2)';
			obstacle.remove();
			console.log('colission');
			console.log(myChar.style);
		}
		myChar.style.top = `${moveY}px`;
		myChar.style.left = `${moveX}px`;

		// console.log('curr x: ', Math.floor(currX));
		// console.log('prev x: ', Math.floor(prevX));
		// console.log('------------------');

		prevX = currX;
		prevY = currY;
		// aliasCursor.style.transform = `translateX(${cursorX}px) translateY(${cursorY}px)`;
	};

	const onLeave = (e?: any) => {
		selectedEl = '';
		cursorX = 0;
		cursorY = 0;
		clearInterval(intervalsX);
		clearInterval(intervalsY);

		if (aliasCursor) {
			aliasCursor.style.transform = '';
		}
	};

	$: {
		// console.log(startPosition);
		// console.log('X: ', moveX);
		// console.log('Y: ', moveY);
	}
</script>

<div class="w-full h-[100vh] bg-black/10 relative overflow-hidden">
	<div
		bind:this={myChar}
		class="w-10 h-10 rounded-full  bg-red-500 flex items-center absolute justify-center "
	>
		<div class="w-[50%] h-[50%] bg-white rounded-full" />
	</div>

	<div
		bind:this={obstacle}
		class="w-10 h-10 rounded-full bg-blue-500 flex items-center absolute justify-center "
		style={`transform : translateX(130px) translateY(50px)`}
	>
		<div class="w-[50%] h-[50%] bg-white rounded-full" />
	</div>
</div>

<!-- ----- Analog --- -->
<div
	on:mousemove={(e) => onMove(e)}
	class="fixed z-50 w-[120px] h-[120px]  border-2 border-black/25 bottom-[140px] right-[80px] rounded-full flex items-center justify-center "
>
	<div
		bind:this={aliasCursor}
		style={`transform: translateX(${cursorX}px) translateY(${cursorY}px)`}
		class="w-[60px] h-[60px] rounded-full bg-gray-400 absolute z-[-1] origin-center pointer-events-none"
	/>
	<div bind:this={realCursor} class="w-[60px] h-[60px] rounded-full bg-black/25" />
</div>

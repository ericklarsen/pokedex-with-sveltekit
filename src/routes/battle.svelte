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
			startPosition.x = e.offsetX || e?.changedTouches[0].clientX;
			startPosition.y = e.offsetY || e?.changedTouches[0].clientY;
		}
	};

	let prevX = 0;
	let prevY = 0;
	let cursorX = 0;
	let cursorY = 0;

	const onMove = (e: any) => {
		if (!selectedEl) return;
		let currX = e.clientX;
		let currY = e.clientY;

		if (e?.changedTouches?.length) {
			currX = e?.changedTouches[0].clientX;
			currY = e?.changedTouches[0].clientY;
		}

		if (currX > prevX) {
			cursorX += 2;
		} else if (currX < prevX) {
			cursorX -= 2;
		}

		if (currY > prevY) {
			cursorY += 2;
		} else if (currY < prevY) {
			cursorY -= 2;
		}

		prevX = currX;
		prevY = currY;
		// console.log(e?.changedTouches[0].clientX);
		console.log('x: ', cursorX);
		console.log('y: ', cursorY);
		console.log('------------------');

		// moveX += currX;
		// moveY += currY;
		// cursorX += currX;
		// cursorY += currY;
		aliasCursor.style.transform = `translateX(${cursorX}px) translateY(${cursorY}px)`;
	};

	const onLeave = (e?: any) => {
		selectedEl = '';
		cursorX = 0;
		cursorY = 0;

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

<div class="w-full h-[100vh] bg-black/10 relative">
	<div
		class="w-10 h-10 rounded-full bg-red-500 flex items-center absolute justify-center transition"
		style={`transform : translateX(${moveX}px) translateY(${moveY}px)`}
	>
		<div class="w-[50%] h-[50%] bg-white rounded-full" />
	</div>
</div>

<!-- ----- Analog --- -->
<div
	on:mousemove={(e) => onMove(e)}
	class="fixed z-50 w-[120px] h-[120px] border border-black bottom-[100px] right-[40px] rounded-full flex items-center justify-center "
>
	<div
		bind:this={aliasCursor}
		class="w-[60px] h-[60px] rounded-full bg-black absolute z-[-1] origin-center pointer-events-none"
	/>
	<div bind:this={realCursor} class="w-[60px] h-[60px] rounded-full bg-black/25" />
</div>

import { writable } from 'svelte/store';

function createLoader() {
	const { subscribe, update } = writable(false);

	return {
		subscribe,
		show: () => update(() => true),
		unshow: () => update(() => false)
	};
}

export const isOpenTypes = writable(false);
export const isLoading = createLoader();

export const currentTypes = writable('');
export const allPokemons = writable({ results: [] });

export const currentComparison = writable([{ id: 0, name: "", sprites: { front_default: "" }, stats: [{ stat: { name: "" }, base_stat: 0 }] }]);

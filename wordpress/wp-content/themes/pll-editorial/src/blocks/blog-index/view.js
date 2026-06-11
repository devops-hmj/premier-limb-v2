/**
 * pll/blog-index — client controller. Port of BlogIndex.tsx behavior:
 * search over title+description+category label, category tabs, load-more
 * pagination (page size from data-page-size, default 9). Without JS, all
 * cards render and the toolbar is inert (progressive enhancement).
 */
const root = document.querySelector('.pll-blog-index');

if (root) {
	const PAGE_SIZE = Number(root.dataset.pageSize || 9);
	const cards = Array.from(root.querySelectorAll('.pll-blog-grid > article'));
	const search = root.querySelector('.pll-blog-search');
	const clearBtn = root.querySelector('.pll-blog-clear');
	const tabs = Array.from(root.querySelectorAll('.pll-blog-tab'));
	const countEl = root.querySelector('.pll-blog-count');
	const empty = root.querySelector('.pll-blog-empty');
	const emptyTerm = root.querySelector('.pll-blog-empty-term');
	const resetBtn = root.querySelector('.pll-blog-reset');
	const moreWrap = root.querySelector('.pll-blog-more');
	const moreBtn = root.querySelector('.pll-blog-more-btn');
	const showing = root.querySelector('.pll-blog-showing');
	const grid = root.querySelector('.pll-blog-grid');

	let query = '';
	let category = 'all';
	let visibleCount = PAGE_SIZE;

	const ACTIVE = ['text-spine', 'border-spine'];
	const INACTIVE = ['text-muted', 'border-transparent', 'hover:text-ink'];

	function apply() {
		const q = query.trim().toLowerCase();
		const matches = cards.filter((card) => {
			if (category !== 'all' && card.dataset.category !== category) return false;
			if (!q) return true;
			return (card.dataset.search || '').includes(q);
		});

		const visible = matches.slice(0, visibleCount);
		cards.forEach((card) => {
			card.hidden = !visible.includes(card);
		});

		countEl.textContent =
			`${matches.length} ${matches.length === 1 ? 'article' : 'articles'}` +
			(q ? ` for “${query}”` : '');

		const isEmpty = matches.length === 0;
		empty.hidden = !isEmpty;
		grid.style.display = isEmpty ? 'none' : '';
		if (isEmpty) emptyTerm.textContent = `“${query || category}”`;

		const hasMore = visible.length < matches.length;
		moreWrap.hidden = !hasMore;
		if (hasMore) showing.textContent = `Showing ${visible.length} of ${matches.length}`;

		clearBtn.hidden = !query;
	}

	search?.addEventListener('input', () => {
		query = search.value;
		visibleCount = PAGE_SIZE;
		apply();
	});

	clearBtn?.addEventListener('click', () => {
		query = '';
		search.value = '';
		visibleCount = PAGE_SIZE;
		apply();
	});

	tabs.forEach((tab) => {
		tab.addEventListener('click', () => {
			category = tab.dataset.category || 'all';
			visibleCount = PAGE_SIZE;
			tabs.forEach((t) => {
				const active = t === tab;
				t.setAttribute('aria-pressed', String(active));
				t.classList.remove(...ACTIVE, ...INACTIVE);
				t.classList.add(...(active ? ACTIVE : INACTIVE));
			});
			apply();
		});
	});

	resetBtn?.addEventListener('click', () => {
		query = '';
		if (search) search.value = '';
		category = 'all';
		visibleCount = PAGE_SIZE;
		tabs.forEach((t) => {
			const active = t.dataset.category === 'all';
			t.setAttribute('aria-pressed', String(active));
			t.classList.remove(...ACTIVE, ...INACTIVE);
			t.classList.add(...(active ? ACTIVE : INACTIVE));
		});
		apply();
	});

	moreBtn?.addEventListener('click', () => {
		visibleCount += PAGE_SIZE;
		apply();
	});

	apply();
}

export function renderCategories(posts, activeCategory) {
    const counts = posts.reduce((acc, post) => {
        acc[post.category] = (acc[post.category] || 0) + 1;
        return acc;
    }, {});

    const categories = Object.keys(counts).sort();

    return categories.map(category => `
        <li>
            <button type="button" data-category="${category}"
                class="category-btn w-full flex justify-between text-left transition-colors
                       ${category === activeCategory ? 'text-gold font-semibold' : 'text-gray-500 hover:text-gold'}">
                <span>${category}</span>
                <span>${counts[category]}</span>
            </button>
        </li>
    `).join('');
}

export function renderRecentPosts(posts, count = 5) {
    const recent = [...posts]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, count);

    return recent.map(post => `
        <li class="flex gap-4 items-center">
            <img src="${post.image}" alt="${post.title}" class="w-16 h-16 object-cover rounded-md bg-[#FAF3EA] shrink-0" />
            <div>
                <p class="text-sm text-gray-700 leading-snug hover:text-gold transition-colors cursor-pointer">${post.title}</p>
                <span class="text-xs text-gray-400">${new Date(post.date).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
            </div>
        </li>
    `).join('');
}
function formatDate(isoDate) {
    return new Date(isoDate).toLocaleDateString('en-US', {
        day: '2-digit', month: 'short', year: 'numeric',
    });
}

export function renderBlogPostCard(post) {
    const li = document.createElement('li');

    li.innerHTML = `
        <img src="${post.image}" alt="${post.title}"
            class="w-full h-[400px] object-cover rounded-md bg-[#FAF3EA] mb-6" />

        <div class="flex items-center gap-6 text-sm text-gray-500 mb-4">
            <span class="flex items-center gap-2"><i class="fa-solid fa-user"></i>${post.author}</span>
            <span class="flex items-center gap-2"><i class="fa-solid fa-calendar"></i>${formatDate(post.date)}</span>
            <span class="flex items-center gap-2"><i class="fa-solid fa-tag"></i>${post.category}</span>
        </div>

        <h2 class="text-2xl font-semibold text-dark mb-4">${post.title}</h2>
        <p class="text-gray-500 leading-relaxed mb-4">${post.excerpt}</p>

        <a href="#" class="inline-block font-semibold text-dark border-b-2 border-dark
                            hover:text-gold hover:border-gold transition-colors">
            Read more
        </a>
    `;

    return li;
}
const BLOG_POSTS = [

    {
        id: 1,

        title: "Going all-in with millennial design",

        slug: "going-all-in-with-millennial-design",

        author: "Admin",

        date: "14 Oct 2022",

        category: "Wood",

        image: "/assets/images/blog-1.svg",

        excerpt:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices.",

        featured: true,
    },

    {
        id: 2,

        title: "Exploring new ways of decorating",

        slug: "exploring-new-ways-of-decorating",

        author: "Admin",

        date: "14 Oct 2022",

        category: "Handmade",

        image: "/assets/images/blog-2.svg",

        excerpt:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices.",

        featured: false,
    },

    {
        id: 3,
        title: "Handmade pieces that took time to make",
        slug: "handmade-pieces-that-took-time-to-make",
        author: "Admin",
        date: "14 Oct 2022",
        category: "Wood",
        image: "/assets/images/blog-3.svg",
        excerpt:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices.",

        featured: false,
    },

];

export function getBlogPosts() {

    return structuredClone(BLOG_POSTS);

}
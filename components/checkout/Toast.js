const TOAST_ID = "app-toast";

const TOAST_TYPES = {
    success: {
        border: "border-green-500",
        title: "text-green-700",
    },

    error: {
        border: "border-red-500",
        title: "text-red-700",
    },

    warning: {
        border: "border-yellow-500",
        title: "text-yellow-700",
    },
};

function getToast() {

    let toast = document.getElementById(TOAST_ID);

    if (toast) return toast;

    toast = document.createElement("div");

    toast.id = TOAST_ID;
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    toast.setAttribute("aria-atomic", "true");

    toast.className = `
        fixed
        top-6
        right-6
        z-[9999]

        w-[380px]
        max-w-[calc(100vw-32px)]

        rounded-xl
        border-l-4
        bg-white
        shadow-xl

        p-5

        opacity-0
        -translate-y-5
        pointer-events-none

        transition-all
        duration-300
    `;

    document.body.appendChild(toast);

    return toast;

}

export function showToast({
    type = "success",
    title,
    message,
    duration = 3000,
} = {}) {

    if (!title || !message) {
        return;
    }
    const toast = getToast();

    const style = TOAST_TYPES[type] ?? TOAST_TYPES.success;

    toast.className = `
        fixed
        top-6
        right-6
        z-[9999]

        w-full
        max-w-[380px]

        rounded-xl
        border-l-4

        ${style.border}

        bg-white
        shadow-xl

        p-5

        transition-all
        duration-300
    `;

    toast.innerHTML = `
        <div class="flex flex-col gap-2">

            <h3 class="text-lg font-semibold ${style.title}">
                ${title}
            </h3>

            <p class="text-[15px] text-[#666666] leading-6">
                ${message}
            </p>

        </div>
    `;

    requestAnimationFrame(() => {

        toast.classList.remove(
            "opacity-0",
            "-translate-y-5",
            "pointer-events-none"
        );

        toast.classList.add(
            "opacity-100",
            "translate-y-0"
        );

    });

    clearTimeout(toast.hideTimeout);

    toast.hideTimeout = setTimeout(() => {

        toast.classList.remove(
            "opacity-100",
            "translate-y-0"
        );

        toast.classList.add(
            "opacity-0",
            "-translate-y-5",
            "pointer-events-none"
        );

        setTimeout(() => {
            toast.innerHTML = "";
        }, 300);

    }, duration);

}
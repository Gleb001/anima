export async function playAnimationCSS(
    element: HTMLElement, animation_css: string, duration: number,
) {
    element.style.animation = `${duration}ms ${animation_css}`;
    await new Promise(resolve => setTimeout(() => {
        element.style.animation = "";
        resolve(true);
    }, duration + 400));
}
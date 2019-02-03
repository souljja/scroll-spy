export function scrollTo(
  id: string,
  offset: number = 0,
  behavior: ScrollBehavior = "smooth"
) {
  const element = document.getElementById(id);
  if (element) {
    window.scrollTo({
      behavior,
      top: offset + element.offsetHeight,
      left: 0
    });
  }
}

export function scrollIntoView(
  id: string,
  behavior: ScrollBehavior = "smooth",
  block: ScrollLogicalPosition = "start"
) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior,
      block
    });
  }
}

export function isInView(id: string) {
  const element = document.getElementById(id);
  if (!element) {
    return false;
  } else {
    const rect = element.getBoundingClientRect();
    console.log(rect);
    const height = rect.height,
      viewPortHeight = window.innerHeight,
      top = rect.top,
      bottom = rect.bottom;
    console.log(
      id,
      Math.max(
        0,
        top > 0
          ? Math.min(height, viewPortHeight - top)
          : Math.min(bottom, viewPortHeight)
      )
    );
    return !(top + height - 120 < 0 || top > viewPortHeight);
  }
}

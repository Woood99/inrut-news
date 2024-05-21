function getRemainingScrollToBottom() {
    const scrollPosition = window.pageYOffset;
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const remainingScroll = documentHeight - (scrollPosition + windowHeight);
    return remainingScroll;
}

export default getRemainingScrollToBottom;
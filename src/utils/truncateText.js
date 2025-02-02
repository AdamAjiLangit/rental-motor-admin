const truncateText = (text, wordLimit) => {
    if (!text) return '';
    const words = text.split(' ');
    console.log('Original Text:', text);
    console.log('Word Limit:', wordLimit);
    console.log('Words:', words);

    if (words.length > wordLimit) {
        const truncated = words.slice(0, wordLimit).join(' ') + ' ......';
        console.log('Truncated Text:', truncated);
        return truncated;
    }
    return text;
};

export default truncateText;
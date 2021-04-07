const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) => {
    let likesSum = 0;
    for (const blog of blogs) {
        likesSum += blog["likes"];
    }
    return likesSum;
};

module.exports = {
    dummy,
    totalLikes,
};

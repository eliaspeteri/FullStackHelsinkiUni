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

const favoriteBlog = (blogs) => {
    let favoriteBlog = blogs[0];
    for (const blog of blogs) {
        if (blog["likes"] >= favoriteBlog["likes"]) favoriteBlog = blog;
    }
    return favoriteBlog;
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
};

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
    let favoriteBlog = {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0,
    };
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

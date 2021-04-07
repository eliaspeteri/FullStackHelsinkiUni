const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
});

describe("total likes", () => {
    test("of empty list is zero", () => {
        const result = listHelper.totalLikes([]);
        expect(result).toBe(0);
    });
});

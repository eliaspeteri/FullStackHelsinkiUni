import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";
import Blog from "./Blog";

test("renders content", () => {
    const blog = {
        title: "Component testing is done with react-testing-library",
        author: "Elias Peteri",
        url: "",
    };

    const component = render(<Blog blog={blog} />);

    const div = component.container.querySelector(".blog");
    expect(div).toHaveTextContent(
        "Component testing is done with react-testing-library"
    );
});

test("clicking the button calls event handler once", async () => {
    const blog = {
        title: "Component testing is done with react-testing-library",
        author: "Elias Peteri",
        url: "",
    };

    const mockHandler = jest.fn();

    const component = render(
        <Blog blog={blog} toggleVisibility={mockHandler} />
    );

    const button = component.container.querySelector(".showFullBlogButton");
    console.log(prettyDOM(button));
    fireEvent.click(button);

    console.log(mockHandler.mock.calls);
    expect(mockHandler.mock.calls).toHaveLength(1);
});

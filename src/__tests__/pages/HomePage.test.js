import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // For routing tests
import HomePage from "../../pages/HomePage";

describe("HomePage Tests", () => {
  test("renders homepage elements correctly", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    // Check for headings, buttons, and images
    expect(
      screen.getByRole("heading", { name: /welcome to sawmillgo/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /discover more/i })).toBeInTheDocument();
    expect(screen.getByAltText("SawmillGo Overview")).toBeInTheDocument();
  });

  

  test("renders the correct introductory text", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(
      screen.getByText(/data-driven forestry for a sustainable future/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/empowers forest owners, sawmills, and creators/i)
    ).toBeInTheDocument();
  });

  test("renders hero image with correct alt text and source", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const heroImage = screen.getByAltText("SawmillGo Overview");
    expect(heroImage).toHaveAttribute("src", "home_hero2.webp");
  });

  test("matches snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});

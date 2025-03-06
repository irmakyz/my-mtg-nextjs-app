import React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import { Provider } from "react-redux";
import Home from "@/app/page";
import { useSearchParams, useRouter } from "next/navigation";
import makeStore from "redux-mock-store";
import { useSelector } from "react-redux";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock("@/services/api", () => ({
  fetchCardList: jest.fn((page, searchTerm) => {
    const allCards = [
      { id: "1", name: "Test Card 1", type: "Creature", colors: ["W"] },
      { id: "2", name: "Test Card 2", type: "Sorcery", colors: ["U"] },
    ];

    const filteredCards = searchTerm
      ? allCards.filter((card) =>
          card.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : allCards;

    return Promise.resolve({
      cardsData: filteredCards,
      hasMorePage: false,
    });
  }),
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

const mockStore = makeStore([]);

beforeEach(() => {
  useSearchParams.mockReturnValue({
    get: jest.fn((param) => {
      if (param === "page") return "1";
      if (param === "search") return "";
      return null;
    }),
  });

  useRouter.mockReturnValue({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  });
});

describe("Home Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      favorites: {
        1: { id: "1", name: "Test Card 1", type: "Creature", colors: ["W"] },
      },
    });

    useSelector.mockImplementation((selector) => selector(store.getState()));
  });

  test("renders search input", async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <Home />
        </Provider>
      );
    });

    expect(
      screen.getByPlaceholderText("Search by card name...")
    ).toBeInTheDocument();
  });

  test("filters cards based on search input", async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <Home />
        </Provider>
      );
    });

    const searchInput = screen.getByPlaceholderText("Search by card name...");

    await act(async () => {
      fireEvent.change(searchInput, { target: { value: "Test Card 1" } });
      fireEvent.click(screen.getByRole("button", { name: /search/i }));
    });

    expect(screen.getByText("Test Card 1")).toBeInTheDocument();
    expect(screen.queryByText("Test Card 2")).not.toBeInTheDocument();

    await act(async () => {
      fireEvent.change(searchInput, { target: { value: "" } });
      fireEvent.click(screen.getByRole("button", { name: /search/i }));
    });

    expect(screen.getByText("Test Card 1")).toBeInTheDocument();
    expect(screen.getByText("Test Card 2")).toBeInTheDocument();
  });

  test("shows favorites when toggle button is clicked", async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <Home />
        </Provider>
      );
    });

    fireEvent.click(screen.getByText("Show Favorites"));

    expect(screen.getByText("Test Card 1")).toBeInTheDocument();
    expect(screen.queryByText("Test Card 2")).not.toBeInTheDocument();
  });
});

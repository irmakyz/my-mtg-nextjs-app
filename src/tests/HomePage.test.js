import React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import { Provider, useSelector } from "react-redux";
import Home from "@/app/page";
import { useSearchParams, useRouter } from "next/navigation";
import makeStore from "redux-mock-store";

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
      hasMore: false,
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
    });

    expect(screen.getByText("Test Card 1")).toBeInTheDocument();
    expect(screen.queryByText("Test Card 2")).not.toBeInTheDocument();

    await act(async () => {
      fireEvent.change(searchInput, { target: { value: "" } });
    });

    expect(screen.getByText("Test Card 1")).toBeInTheDocument();
    expect(screen.getByText("Test Card 2")).toBeInTheDocument();
  });

  test("updates URL when searching", async () => {
    const router = useRouter();

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
    });

    expect(router.push).toHaveBeenCalledWith("/?page=1&search=Test Card 1", {
      scroll: false,
    });
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

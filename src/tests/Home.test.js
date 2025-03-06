import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "@/components/Home";
import { Provider } from "react-redux";
import createMockStore from "redux-mock-store";

jest.mock("@/components/CardItem", () => {
  const MockCardItem = ({ card }) => <div>{card.name}</div>;
  MockCardItem.displayName = "CardItem";
  return MockCardItem;
});

jest.mock("@/components/Search", () => {
  const MockSearch = ({ searchTerm, setSearchTerm, setPage }) => (
    <input
      value={searchTerm}
      onChange={(e) => {
        setSearchTerm(e.target.value);
        setPage(1);
      }}
      data-testid='search-input'
    />
  );
  MockSearch.displayName = "Search";
  return MockSearch;
});

jest.mock("@/components/Pagination", () => {
  const MockPagination = ({ page, setPage, hasMore }) => (
    <button onClick={() => setPage(page + 1)} data-testid='pagination-button'>
      Next
    </button>
  );
  MockPagination.displayName = "Pagination";
  return MockPagination;
});

jest.mock("@/components/Spinner", () => {
  const MockSpinner = () => <div data-testid='spinner'>Loading...</div>;
  MockSpinner.displayName = "Spinner";
  return MockSpinner;
});

const mockStore = createMockStore();

const mockCards = [
  { id: "1", name: "Card 1", type: "Type 1", rarity: "Rare" },
  { id: "2", name: "Card 2", type: "Type 2", rarity: "Common" },
  { id: "3", name: "Card 3", type: "Type 3", rarity: "Uncommon" },
];

const mockFavorites = {
  1: { id: "1", name: "Card 1", type: "Type 1", rarity: "Rare" },
  2: { id: "2", name: "Card 2", type: "Type 2", rarity: "Common" },
};

const renderWithProvider = (component) => {
  const store = mockStore({
    favorites: mockFavorites,
  });

  return render(<Provider store={store}>{component}</Provider>);
};

describe("Home component", () => {
  it("renders the cards correctly", async () => {
    renderWithProvider(
      <Home
        cards={mockCards}
        initialPage={1}
        initialSearchTerm=''
        initialHasMore={true}
      />
    );

    await waitFor(() => {
      expect(screen.getByText("Card 1")).toBeInTheDocument();
      expect(screen.getByText("Card 2")).toBeInTheDocument();
      expect(screen.getByText("Card 3")).toBeInTheDocument();
    });
  });

  it('shows favorites when clicking the "Show Favorites" button', async () => {
    renderWithProvider(
      <Home
        cards={mockCards}
        initialPage={1}
        initialSearchTerm=''
        initialHasMore={true}
      />
    );

    await waitFor(() => {
      expect(screen.getByText("Card 1")).toBeInTheDocument();
      expect(screen.getByText("Card 2")).toBeInTheDocument();
      expect(screen.getByText("Card 3")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Show Favorites"));

    await waitFor(() => {
      expect(screen.getByText("Card 1")).toBeInTheDocument();
      expect(screen.getByText("Card 2")).toBeInTheDocument();
      expect(screen.queryByText("Card 3")).not.toBeInTheDocument();
    });
  });
});

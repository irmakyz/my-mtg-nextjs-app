import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "@/components/Home";
import { Provider } from "react-redux";
import createMockStore from "redux-mock-store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fetchCardList } from "@/services/api";
import { act } from "react";

jest.mock("@/services/api", () => ({
  fetchCardList: jest.fn((page, searchTerm) => {
    return Promise.resolve({
      cardsData: searchTerm
        ? mockCards.filter((card) => card.name.includes(searchTerm))
        : mockCards,
      hasMorePage: false,
    });
  }),
}));

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
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

  const queryClient = createTestQueryClient();

  return render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {component}
      </QueryClientProvider>
    </Provider>
  );
};

describe("Home component", () => {
  it("renders the cards correctly", async () => {
    renderWithProvider(
      <Home
        initialCards={mockCards}
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
        initialCards={mockCards}
        initialSearchTerm=''
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
  it("triggers fetch when search term changes", async () => {
    const { getByPlaceholderText } = renderWithProvider(
      <Home
        initialCards={mockCards}
        initialSearchTerm=''
      />
    );

    expect(await screen.findByText("Card 1")).toBeInTheDocument();

    const input = getByPlaceholderText("Search by card name...");
    await act(async () => {
      fireEvent.change(input, { target: { value: "Card 1" } });
      fireEvent.click(screen.getByRole("button", { name: /search/i }));
    });
    await waitFor(() => expect(fetchCardList).toHaveBeenCalledWith(1, "Card 1"));
    expect(await screen.findByText("Card 1")).toBeInTheDocument();
  });
});

import React from "react";
import { fetchCardList } from "@/services/api";

jest.mock("@/components/Home", () => {
  const Home = () => <div data-testid='home'></div>;
  Home.displayName = "Home";
  return Home;
});

jest.mock("@/services/api", () => ({
  fetchCardList: jest.fn(),
}));

describe("HomePage", () => {
  it("calls fetchCardList when searchParams change", async () => {
    const mockFetchCardList = fetchCardList;

    mockFetchCardList.mockResolvedValue({
      cardsData: [],
      hasMorePage: false,
    });

    const mockHomePage = async (searchParams) => {
      const params = searchParams;
      const page = Number(params?.page) || 1;
      const searchTerm = params?.search || "";

      const { cardsData, hasMorePage } = await fetchCardList(page, searchTerm);
      return {
        cardsData,
        hasMorePage,
        page,
        searchTerm,
      };
    };

    const result1 = await mockHomePage({ page: 1, search: "Test 1" });
    expect(mockFetchCardList).toHaveBeenCalledWith(1, "Test 1");
    expect(result1).toEqual({
      cardsData: [],
      hasMorePage: false,
      page: 1,
      searchTerm: "Test 1",
    });

    const result2 = await mockHomePage({ page: 1, search: "new term" });
    expect(mockFetchCardList).toHaveBeenCalledWith(1, "new term");
    expect(result2).toEqual({
      cardsData: [],
      hasMorePage: false,
      page: 1,
      searchTerm: "new term",
    });
  });
});

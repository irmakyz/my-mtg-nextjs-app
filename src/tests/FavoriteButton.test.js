import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider, useSelector } from "react-redux";
import { store } from "@/store";
import FavoriteButton from "@/components/FavoriteButton";
import { selectFavorites } from "@/features/favorites/favoritesSlice";

const card = {
  id: "1",
  name: "Test Card",
};

const TestComponent = ({ card }) => {
  const favorites = useSelector(selectFavorites);
  return (
    <div>
      <FavoriteButton card={card} />
      <div data-testid='favorites'>{JSON.stringify(favorites)}</div>
    </div>
  );
};

test("toggles favorite state and updates store", () => {
  const { getByRole, getByTestId } = render(
    <Provider store={store}>
      <TestComponent card={card} />
    </Provider>
  );

  const button = getByRole("button");
  const favoritesDiv = getByTestId("favorites");

  expect(favoritesDiv.textContent).toBe("{}");

  fireEvent.click(button);
  expect(button.querySelector("svg")).toHaveClass("text-red-500");
  expect(favoritesDiv.textContent).toBe(JSON.stringify({ [card.id]: card }));

  fireEvent.click(button);
  expect(button.querySelector("svg")).toHaveClass("text-gray-400");
  expect(favoritesDiv.textContent).toBe("{}");
});

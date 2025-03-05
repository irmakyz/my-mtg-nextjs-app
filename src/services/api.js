// api.js

// Function to fetch card detail data from Magic The Gathering API
export async function fetchCardDetail(cardId) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${cardId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data)
    return data;
  }
  
  // Function to fetch card list data from Magic The Gathering API
export async function fetchCardList(page, searchTerm) {
    try {
      const query = `${process.env.NEXT_PUBLIC_API_URL}?page=${page}&pageSize=20&name=${searchTerm}`;
      const res = await fetch(query);
      const data = await res.json();
      if (data.cards.length === 0) {
        return { cardsData: [], hasMore: false };
      }
      return { cardsData: data.cards, hasMore: true };
    } catch (err) {
      throw new Error("Failed to load cards");
    }
  }
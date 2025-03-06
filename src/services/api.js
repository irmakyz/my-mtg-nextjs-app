export async function fetchCardDetail(cardId) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${cardId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (err) {
      throw new Error("Failed to load card details");
    }
  }
  
  export async function fetchCardList(page, searchTerm) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}?page=${page}&pageSize=20&name=${searchTerm}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      const totalCount = response.headers.get("Total-Count");
      const hasMorePage = page * 20 < totalCount;
  
      return { cardsData: data.cards, hasMorePage, totalCount };
    } catch (err) {
      throw new Error("Failed to load cards");
    }
  }
  
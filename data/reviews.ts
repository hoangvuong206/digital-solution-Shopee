import { randomInt } from "crypto";

const positiveComments = [
    "Chất lượng tốt",
    "Rất đáng tiền",
    "Sẽ mua lại",
    "Shop tư vấn tốt",
    "Màu sắc đẹp",
  ];
  
  const negativeComments = [
    "Đóng gói kém",
    "Giao hàng chậm",
    "Size không đúng",
    "Không giống mô tả",
    "Hơi mỏng",
  ];
  
  export const reviews = Array.from({ length: 200 }, (_, i) => {
    const rating = Math.floor(Math.random() * 5) + 1;
  
    let comment = "";
  
    if (rating >= 4) {
      comment =
        positiveComments[
          Math.floor(Math.random() * positiveComments.length)
        ];
    } else if (rating <= 2) {
      comment =
        negativeComments[
          Math.floor(Math.random() * negativeComments.length)
        ];
    } else {
      comment =
        Math.random() > 0.5
          ? positiveComments[Math.floor(Math.random() * positiveComments.length)]
          : negativeComments[Math.floor(Math.random() * negativeComments.length)];
    }
  
    return {
      id: i + 1,
      productId: (i % 5) + 1,
      rating,
      comment,
      user: `User ${Math.floor(1000 + Math.random() * 9000)}`
    };
  });
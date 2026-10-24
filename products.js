export const fetchProducts = async () => {
  // 1. Aapke Local Products (Bags, Makeup, Watches, Clothes)
  const localWomenClothes = [
    { id: 'w1', title: 'Linen Blend Shirt', price: 3490, image: 'https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?q=80&w=400&auto=format&fit=crop' },
    { id: 'w2', title: 'Floral Summer Dress', price: 4200, image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=400&auto=format&fit=crop' },
    { id: 'w3', title: 'Oversized Trench Coat', price: 6800, image: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=400&auto=format&fit=crop' },
    { id: 'w4', title: 'Everyday Basic Tee', price: 1200, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400&auto=format&fit=crop' }
  ];

  const womenBags = [
    { id: 'wb1', title: 'Leather Shoulder Bag', price: 2890, image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=400&auto=format&fit=crop' },
    { id: 'wb2', title: 'Mini Crossbody Bag', price: 2100, image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=400&auto=format&fit=crop' },
    { id: 'wb3', title: 'Tote Bag', price: 3500, image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=400&auto=format&fit=crop' }
  ];

  const womenMakeup = [
    { id: 'wm1', title: 'Soft Matte Lipstick', price: 1190, image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=400&auto=format&fit=crop' },
    { id: 'wm2', title: 'Glow Foundation', price: 2450, image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=400&auto=format&fit=crop' },
    { id: 'wm3', title: 'Everyday Makeup Kit', price: 5200, image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=400&auto=format&fit=crop' }
  ];

  const localMenClothes = [
    { id: 'm1', title: 'Classic White Shirt', price: 2990, image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=400&auto=format&fit=crop' },
    { id: 'm2', title: 'Casual Denim Jacket', price: 5400, image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=400&auto=format&fit=crop' },
    { id: 'm3', title: 'Olive Green Sweater', price: 3200, image: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=400&auto=format&fit=crop' },
    { id: 'm4', title: 'Black Polo Shirt', price: 2500, image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80&w=400&auto=format&fit=crop' }
  ];

  const menWatches = [
    { id: 'mw1', title: 'Classic Leather Watch', price: 8900, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=400&auto=format&fit=crop' },
    { id: 'mw2', title: 'Minimalist Steel Watch', price: 7500, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400&auto=format&fit=crop' },
    { id: 'mw3', title: 'Sport Chronograph', price: 12000, image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=400&auto=format&fit=crop' },
    { id: 'mw4', title: 'Silver Chain Watch', price: 6500, image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=400&auto=format&fit=crop' }
  ];

  // 2. Local Array ko format karna
  let localProducts = [];

  localWomenClothes.forEach(p => localProducts.push({ ...p, gender: 'Women', subCategory: 'Clothes' }));
  womenBags.forEach(p => localProducts.push({ ...p, gender: 'Women', subCategory: 'Bags' }));
  womenMakeup.forEach(p => localProducts.push({ ...p, gender: 'Women', subCategory: 'Makeup' }));
  localMenClothes.forEach(p => localProducts.push({ ...p, gender: 'Men', subCategory: 'Clothes' }));
  menWatches.forEach(p => localProducts.push({ ...p, gender: 'Men', subCategory: 'Watches' }));

  // 3. REAL API FETCHING (FakeStoreAPI)
  let apiProducts = [];

  try {
    const response = await fetch('https://fakestoreapi.com/products');

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();

    // Map API data to your app's structure
    data.forEach((item) => {
      // Determine Gender and SubCategory based on API category
      let gender = 'Women';       
      let subCategory = 'Clothes';

      if (item.category === "men's clothing") {
        gender = 'Men';
        subCategory = 'Clothes';
      } else if (item.category === "women's clothing") {
        gender = 'Women';
        subCategory = 'Clothes';
      } else if (item.category === "jewelery") {
        gender = 'Women'; // Jewellery ko Women ke under daal rahe hain
        subCategory = 'Bags'; // Accessories ki tarah treat kar rahe hain
      } else if (item.category === "electronics") {
        gender = 'Men'; // Electronics ko Men ke under daal rahe hain
        subCategory = 'Watches'; // Watches ki tarah treat kar rahe hain
      }

      apiProducts.push({
        id: `api-${item.id}`,
        title: item.title,
        price: Math.round(item.price * 280), // USD to PKR conversion (approx)
        image: item.image,
        gender: gender,
        subCategory: subCategory,
        isFromAPI: true // Yeh flag batata hai ke yeh API se aya hai
      });
    });

  } catch (error) {
    console.log("API Fetch Error:", error.message);
    // Agar API fail ho jaye, toh app local products ke sath chalega
  }

  // 4. Merge API and Local Products
  return [...localProducts, ...apiProducts];
};
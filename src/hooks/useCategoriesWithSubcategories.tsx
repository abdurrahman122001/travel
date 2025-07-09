// hooks/useCategoriesWithSubcategories.ts
import { useEffect, useState } from "react";

export interface Category {
  _id: string;
  name: string;
}
export interface Subcategory {
  _id: string;
  name: string;
  category: string;
}

interface CategoryWithSubs extends Category {
  subcategories: Subcategory[];
}

export function useCategoriesWithSubcategories(apiBase: string) {
  const [categories, setCategories] = useState<CategoryWithSubs[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      // Fetch all categories
      const catRes = await fetch(`${apiBase}/package-categories`);
      const cats = await catRes.json();
      // For each category, fetch its subcategories
      const allCats = await Promise.all(
        cats.map(async (cat: Category) => {
          const subRes = await fetch(`${apiBase}/package-subcategories?category=${cat._id}`);
          const subs = await subRes.json();
          return { ...cat, subcategories: Array.isArray(subs) ? subs : [] };
        })
      );
      setCategories(allCats);
      setLoading(false);
    }
    fetchData();
  }, [apiBase]);

  return { categories, loading };
}

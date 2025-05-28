import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MenuItem from "./MenuItem";
import { labels } from "../../static/labels";
import { menuItems } from "../../static/menuItems";
import { memo } from "react";

const MenuCategory = memo(() => {
  const categorizedItems = menuItems.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {} as { [key: string]: typeof menuItems },
  );

  return (
    <Tabs defaultValue={labels.categories.categoryList[0]}>
      <TabsList className="mt-4">
        {labels.categories.categoryList.map((category) => (
          <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
        ))}
      </TabsList>
      {labels.categories.categoryList.map((category) => {
        return (
          <TabsContent
            key={category}
            value={category}
            className="p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {category === labels.categories.categoryList[0]
              ? menuItems.map((item) => (
                  <MenuItem key={item.name} item={item} />
                ))
              : categorizedItems[category]?.map((item) => (
                  <MenuItem key={item.name} item={item} />
                ))}
          </TabsContent>
        );
      })}
    </Tabs>
  );
});

export default MenuCategory;

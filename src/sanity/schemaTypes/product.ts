export default {
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    {
      name: "id",
      title: "ID",
      type: "string",
    },
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule: any) => Rule.required().positive(),
    },
    {
      name: "discount",
      title: "Discount",
      type: "number",
      validation: (Rule: any) => Rule.required().min(0).max(100),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Men's Wear", value: "Men's Wear" },
          { title: "Women's Wear", value: "Women's Wear" },
          { title: "Kid's Wear", value: "Kid's Wear" },
          { title: "Accessories", value: "Accessories" },
        ],
      },
    },
    {
      name: "rating",
      title: "Rating",
      type: "string",
    },
  ],
}




import Item from "../components/menu/Item";

export default function Home() {
  return (
    <>
    <section className = "p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">

    <Item item={{
        image: "https://cdn.donmai.us/sample/55/c1/__kikuchi_moa_mizuno_yui_and_nakamoto_suzuka_real_life_and_1_more_drawn_by_kazeno__sample-55c100fc45c0661f27ac90b5154fe576.jpg",
        name: "Classic Burger",
        category: "Burgers",
        price: 12.99,
        description: "A juicy beef patty, lettuce, tomato, and special sauce."
      }} />
           
    </section>
     
    </>
  );
}

import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IoIosAddCircle } from "react-icons/Io";
import { v4 as uuidv4, v5 as uuidv5 } from "uuid";
import toast, { Toaster } from "react-hot-toast";
import { BsTrash3Fill } from "react-icons/Bs";
import { FaEdit } from "react-icons/Fa";
function App() {
  // const [list, setList] = useState([]);

  const [list, setList] = useState(() => {
    const storedList = localStorage.getItem("list");
    return storedList ? JSON.parse(storedList) : [];
  });

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  // const [list, setList] = useState([{ id: 1, title: "hello" }]);
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState();

  const [isEditing, setIsEditing] = useState(false);
  const [itemToEdit, setItemToEdit] = useState({});
  // const errorNotify = () => toast.error("Error");
  const clickHandler = () => {
    if (title && quantity) {
      if (isEditing) {
        const updatedItems = list.map((item) => {
          if (item.id === itemToEdit.id) {
            const updatedItem = { ...item, title, quantity };
            return updatedItem;
          } else {
            return item;
          }
        });
        setList(updatedItems);
        setTitle("");
        setQuantity("");
        setIsEditing(false);
        setItemToEdit({});
        toast.success("Item Updated Successfully", { duration: 3000 });
      } else {
        const newItem = {
          id: uuidv4(),
          title,
          quantity,
        };
        setList([...list, newItem]);
        toast.success("Item Added Successfully", { duration: 3000 });
        setTitle("");
        setQuantity("");
      }
    } else {
      //if there is no title entered and clickHandler function activates(that is user clicks add button without title) then below function will execute
      // if (!title) {
      //   toast.error("Title is Required", { duration: 3000 });
      // } else if (!quantity) {
      //   toast.error("Quantity is Required", { duration: 3000 });
      // }
      !title
        ? toast.error("Title is Required", { duration: 3000 })
        : !quantity
        ? toast.error("Quantity is Required", { duration: 3000 })
        : null;
    }
  };

  const deleteItem = (id) => {
    const remainingItem = list.filter((item) => item.id !== id);
    setList(remainingItem);
    toast.error("Item Deleted");
  };

  const updateItem = (id) => {
    setIsEditing(true);
    // setItemToEdit(list.find((item) => item.id === id));
    const itemToUpdate = list.find((item) => item.id === id);
    setTitle(itemToEdit.title);
    setQuantity(itemToEdit.quantity);
    setItemToEdit(itemToUpdate);
    setTitle(itemToUpdate.title || "");
    setQuantity(itemToUpdate.quantity || "");
  };
  return (
    <>
      <Toaster />
      <main className="flex flex-col items-center justify-center w-screen h-screen">
        <section className="flex flex-col gap-4">
          <div className="forOutline w-[25rem] bg-bgclr rounded h-[10rem] flex flex-col justify-center items-center shadow-lg w-full p-4">
            <h1 className="text-2xl font-bold text-red-950">React CRUD App</h1>
            <br />
            <div className="flex flex-row justify-between gap-8">
              {/* <label htmlFor="title" className="p-2 font-bold">
                Title
              </label> */}
              <input
                type="text"
                id="title"
                className="p-2 rounded"
                value={title}
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
              />

              <input
                type="number"
                id="quantity"
                className="p-2 rounded w-[7rem]"
                value={quantity}
                placeholder="Quantity"
                onChange={(e) => setQuantity(e.target.value)}
              />
              {/* <IoIosAddCircle
                className="m-2 text-2xl cursor-pointer text-amber-950"
                onClick={clickHandler}
              /> */}
              {isEditing ? (
                <FaEdit
                  className="m-2 text-4xl cursor-pointer text-amber-950"
                  onClick={clickHandler}
                />
              ) : (
                <IoIosAddCircle
                  className="m-2 text-4xl cursor-pointer text-amber-950"
                  onClick={clickHandler}
                />
              )}
            </div>
          </div>
          <div className="foroutlineAnother flex flex-row w-[25rem] w-full bg-white h-auto rounded shadow-lg items-center justify-center p-2">
            <ul className="w-full">
              {/* <li className="text-2xl font-bold">one</li> */}
              {list.length ? (
                list.map((item) => (
                  <li
                    className="flex flex-row items-center justify-between w-full text-2xl font-bold text-red-950"
                    key={item.id}
                  >
                    <span className="w-[5rem]">{item.title}</span>
                    <span className="w-[5rem]">{item.quantity}</span>
                    <FaEdit
                      className="cursor-pointer text-bgborderLine"
                      onClick={() => updateItem(item.id)}
                    />
                    <BsTrash3Fill
                      className="text-red-600 cursor-pointer"
                      onClick={() => deleteItem(item.id)}
                    />
                  </li>
                )) //implicit (don't do this explicitly)
              ) : (
                <h2 className="text-center">No Item Exists</h2>
              )}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;

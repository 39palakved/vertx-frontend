import React, { useId, useState } from 'react';

const Items_left = ['React', 'JSP', 'Html', 'Typescript', 'Tailwind'];
const Items_right = ['Node', 'Spring', 'Express', 'Servlet', 'Bootstrap'];

const TransferList = () => {
  const generateitemsObject = (items) => {
    return items.reduce((acc, label) => {
      acc[label] = false;
      return acc;
    }, {});
  };

  // Transfer all items
  function TransferAllItems(itemSrc, setItemSrc, itemDest, setItemDest) {
    setItemDest((prevItems) => ({ ...prevItems, ...itemSrc }));
    setItemSrc({});
  }
  function TransferSelecteditems(itemSrc, setItemSrc, itemDest, setItemDest){
    setItemDest((prevItems)=>({
        ...prevItems, 
        ...Object.fromEntries(Object.entries(itemSrc).filter(([__dirname, value])=>value))

    }))
    setItemSrc((prevItems)=>(
       
        Object.fromEntries(Object.entries(prevItems).filter(([__dirname,value])=>!value))
))

     
  }

  // Check if no items are selected
  function hasNoselectedItems(items) {
    return Object.values(items).every((val) => !val);
  }

  function CheckboxItem({ label, onChange, checked }) {
    const id = useId();
    return (
      <div className="flex items-center mb-2">
        <input
          className="mr-2"
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
        />
        <label className="text-sm" htmlFor={id}>
          {label}
        </label>
      </div>
    );
  }

  function ItemsList({ items, setItems }) {
    return (
      <div className=" h-80 bg-gray-100 p-4 rounded-lg shadow-md">
        <ul>
          {Object.entries(items).map(([label, checked]) => (
            <li key={label}>
              <CheckboxItem
                label={label}
                checked={checked}
                onChange={() => {
                  setItems((prevItems) => ({
                    ...prevItems,
                    [label]: !prevItems[label],
                  }));
                }}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const [itemsLeft, setItemsLeft] = useState(generateitemsObject(Items_left));
  const [itemsRight, setItemsRight] = useState(generateitemsObject(Items_right));

  return (
    <div className="flex items-center justify-center space-x-8 p-8">
      {/* Left Box */}
      <div className="w-1/4">
        <ItemsList items={itemsLeft} setItems={setItemsLeft} />
      </div>

      {/* Buttons */}
      <div className="flex flex-col justify-between items-center space-y-4">
        <button
          className="w-8 h-8 bg-gray-300 hover:bg-gray-400 disabled:cursor-not-allowed"
          disabled={Object.keys(itemsRight).length === 0}
          onClick={() => TransferAllItems(itemsRight, setItemsRight, itemsLeft, setItemsLeft)}
        >
          &lt;&lt;
        </button>
        <button
          className="w-8 h-8 bg-gray-300 hover:bg-gray-400 disabled:cursor-not-allowed"
          disabled={hasNoselectedItems(itemsRight)}
          onClick={()=>TransferSelecteditems(itemsRight, setItemsRight, itemsLeft, setItemsLeft)}
        >
          &lt;
        </button>
        <button
          className="w-8 h-8 bg-gray-300 hover:bg-gray-400 disabled:cursor-not-allowed"
          disabled={hasNoselectedItems(itemsLeft)}
          onClick={()=>TransferSelecteditems(itemsLeft, setItemsLeft, itemsRight, setItemsRight)}
        >
          &gt;
        </button>
        <button
          className="w-8 h-8 bg-gray-300 hover:bg-gray-400 disabled:cursor-not-allowed"
          disabled={Object.keys(itemsLeft).length === 0}
          onClick={() => TransferAllItems(itemsLeft, setItemsLeft, itemsRight, setItemsRight)}
        >
          &gt;&gt;
        </button>
      </div>

      {/* Right Box */}
      <div className="w-1/4">
        <ItemsList items={itemsRight} setItems={setItemsRight} />
      </div>
    </div>
  );
};

export default TransferList;

import React, { useState } from 'react';
import Image from 'next/image';

interface Props {
  prop: {
    name: string;
    price: number;
  }[];

  setProp: React.Dispatch<React.SetStateAction<{ name: string; price: number }[]>>;
  type:string
}

const ExtraSize = ({ prop, setProp,type }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  function addMenu() {
    setProp((prevSizes) => {
      return [...prevSizes, { name: '', price: 0 }];
    });
  }

  const removeItem = (indexToRemove: number) => {
    const newList = prop.filter((_, index) => index !== indexToRemove);
    setProp(newList);
  };

  const editSize = (index: number, prop: string, value: string | number) => {
    setProp((prevSizes) => {
      const newSizes = [...prevSizes];
      newSizes[index] = { ...newSizes[index], [prop]: value };
      return newSizes;
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center">
        {isOpen ? (
          <Image
            src="/chevrondown.svg"
            width={20}
            height={20}
            className="object-contain"
            alt=""
            onClick={() => setIsOpen(!isOpen)}
          />
        ) : (
          <Image
            src="/chevronup.svg"
            width={20}
            height={20}
            className="object-contain"
            alt=""
            onClick={() => setIsOpen(!isOpen)}
          />
        )}

        <h1 className="text-[15px] font-bold">{type}</h1>
      </div>
      {isOpen && (
        <div className="flex h-fit w-full flex-col justify-between rounded-md bg-slate-200 p-3">
          {prop.length > 0 &&
            prop.map((item, index) => {
              return (
                <div key={index}>
                  <div className="flex grow items-start gap-1 px-2">
                    <div>
                      <label>Name:</label>
                      <input
                        type="text"
                        placeholder="Size name"
                        className="max-w-[150px] rounded-lg px-2"
                        value={item.name}
                        onChange={(e) => editSize(index, 'name', e.target.value)}
                      />
                    </div>
                    <div>
                      <label>Price:</label>
                      <input
                        type="number"
                        placeholder="Extra price"
                        className="max-w-[150px] rounded-lg px-2"
                        value={item.price}
                        onChange={(e) => editSize(index, 'price', e.target.value)}
                      />
                    </div>

                    <Image
                      src="/trash.svg"
                      width={20}
                      height={20}
                      alt=""
                      className="mt-[20px] object-contain py-1"
                      onClick={() => removeItem(index)}
                    />
                  </div>
                </div>
              );
            })}

          <button
            type="button"
            className="mt-3 w-full rounded-md bg-white px-3 py-2 font-serif"
            onClick={addMenu}
          >
            Add Item Size
          </button>
        </div>
      )}
    </div>
  );
};

export default ExtraSize;

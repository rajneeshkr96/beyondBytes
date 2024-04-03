import axios from 'axios';
import { useRouter } from 'next/navigation'; // Changed import from 'next/navigation' to 'next/router'
import React, { useEffect, useRef, useState } from 'react';
import { useDebounce } from 'use-debounce';

const Searchbar = () => {
    const inputRef = useRef<HTMLInputElement>(null); // Added type annotation for inputRef
    const [searchText, setSearchText] = useState<string>(""); // Added type annotation for searchText
    const [suggest, setSuggest] = useState<string[]>([]);
    const router = useRouter();
    const [keywords] = useDebounce(searchText, 500);
    const [selected, setSelected] = useState<number>(-1); // Added type annotation for selected

    const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => { // Added type annotation for e
        setSearchText(e.target.value);
        if (e.target.value === '') {
            setSuggest([]);
        }
    };

    const clear = () => {
        setSearchText("");
        setSuggest([]);
        setSelected(-1);
    };

    useEffect(() => {
        if (keywords) suggestion();
    }, [keywords]);

    const suggestion = async () => {
        let query = keywords.replaceAll(' ', '-');
        try {
            const res = await axios.get(`/api/blog/all?limit=3&sort=createdAt&fields=id,tags,title`);
            let result: string[] = [];
            let tags: string[] = [];
            console.log(res.data);
            if (res.data.success) {
                result = res.data.data.map((val: { title: string; tags: string[] }) => {
                    console.log(val.tags);
                    val.tags.forEach(tag => tags.push(tag)); // Changed map to forEach
                    return val.title;
                });
            }
            const uniqueSuggestions = Array.from(new Set([...tags, ...result])); // Filter out duplicates
            setSuggest(uniqueSuggestions);
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    };

    const onSearch = () => {
        if (inputRef.current !== null) { // Added null check for inputRef.current
            let query = inputRef.current.value.replaceAll(' ', '+');
            clear();
            router.push(`/category-filters?keyword=${query}`);
        }
    };

    const keyboardSearch = (e: React.KeyboardEvent<HTMLInputElement>) => { // Added type annotation for e
        if (suggest.length > 0 && e.key === ' ') {
            setSearchText(suggest[selected]);
        }

        if (e.key === 'ArrowDown' && selected < suggest.length - 1) {
            setSelected(selected + 1);
            e.currentTarget.value = suggest[selected + 1]; // Changed e.target to e.currentTarget
        }
        if (e.key === 'ArrowUp' && selected > 0) {
            setSelected(selected - 1);
            e.currentTarget.value = suggest[selected - 1]; // Changed e.target to e.currentTarget
        }
        if (e.key === 'Enter' && searchText !== "") {
            onSearch();
        }
    };

    return (
        <>
            <input
                ref={inputRef}
                name='search'
                onChange={onTextChange}
                onKeyDown={keyboardSearch}
                type="text"
                placeholder='Search...'
                className="w-full px-8 py-2 rounded-md font-medium border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
            />
            {suggest.length > 0 ? (
                <div className='bg-[#333] text-white mx-auto mt-1'>
                    {suggest.map((item, index) => (
                        <div
                            onClick={() => {
                                let query = item.replaceAll(' ', '-');
                                router.push(`/category-filters?keyword=${query}`);
                                clear();
                            }}
                            className={`p-2 cursor-pointer border-black border-solid hover:bg-white hover:border-y-2 hover:text-[#333]  ${index === selected ? "bg-white border-y-2 text-[#333]" : ""}`}
                            key={index}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            ) : null}
        </>
    );
};

export default Searchbar;
